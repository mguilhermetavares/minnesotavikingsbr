require("./register.cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
// jsdom is already installed by Sanity; React and node:test provide the harness.
const { JSDOM } = require("jsdom");
const React = require("react");
const { createRoot } = require("react-dom/client");
const { useLiveSchedule } = require("../src/lib/use-live-schedule.ts");
const ScheduleSections =
  require("../src/components/ScheduleSections.tsx").default;
const schedule = require("./fixtures/schedule-2026.json");

async function mount(t, element, now) {
  const dom = new JSDOM('<div id="root"></div>', { url: "http://localhost/" });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  window.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  window.cancelAnimationFrame = clearTimeout;
  window.HTMLElement.prototype.scrollTo = () => {};
  t.mock.timers.enable({ apis: ["Date", "setTimeout"], now });
  const root = createRoot(document.getElementById("root"));
  await React.act(async () => root.render(element));
  t.after(async () => {
    await React.act(async () => root.unmount());
    dom.window.close();
    delete globalThis.window;
    delete globalThis.document;
    delete globalThis.IS_REACT_ACT_ENVIRONMENT;
  });
  return root;
}
async function tick(t, milliseconds) {
  await React.act(async () => {
    t.mock.timers.tick(milliseconds);
  });
}
function update(game, status = "final") {
  return {
    eventId: game.id,
    season: 2026,
    seasonType: game.seasonType,
    week: game.week,
    opponentCode: game.opponent.code,
    kickoffAt: game.kickoffAt,
    status,
    statusDetail: "",
    vikingsScore: 3,
    opponentScore: 13,
  };
}
function response(games) {
  return Response.json({ source: "espn", season: 2026, games });
}

test("historical results render from the server schedule without asking ESPN outside a game window", async (t) => {
  const settled = {
    ...schedule,
    games: schedule.games.map((g) =>
      g.seasonType === "preseason"
        ? { ...g, status: "final", vikingsScore: 3, opponentScore: 13 }
        : g,
    ),
  };
  t.mock.method(globalThis, "fetch", async () => response([]));
  await mount(
    t,
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(ScheduleSections, {
        schedule: settled,
        referenceTime: Date.parse("2026-09-12"),
      }),
    ),
    Date.parse("2026-09-12"),
  );
  await tick(t, 0);
  assert.equal(fetch.mock.calls.length, 0);
  assert.deepEqual(
    [...document.querySelectorAll("h2")].map((e) => e.textContent),
    ["TEMPORADA REGULAR", "PRÉ-TEMPORADA"],
  );
  assert.equal(
    document.querySelectorAll('[aria-labelledby="preseason-title"] article')
      .length,
    3,
  );
  for (const card of document.querySelectorAll(
    '[aria-labelledby="preseason-title"] article',
  ))
    assert.match(card.textContent, /FINAL/);
  await tick(t, 60_000);
  assert.equal(fetch.mock.calls.length, 0);
});

test("both calendar sections share one request inside a game window, including Strict Mode", async (t) => {
  const kickoff = Date.parse(schedule.games[3].kickoffAt);
  t.mock.method(globalThis, "fetch", async () => response([]));
  await mount(
    t,
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(ScheduleSections, {
        schedule,
        referenceTime: kickoff - 10 * 60_000,
      }),
    ),
    kickoff - 10 * 60_000,
  );
  await tick(t, 0);
  assert.equal(fetch.mock.calls.length, 1);
});

test("hook starts polling when window opens, preserves partial/error responses and stops on final without another fetch", async (t) => {
  const games = [schedule.games[1], schedule.games[3]];
  const kickoff = Date.parse(games[1].kickoffAt);
  const replies = [
    response([update(games[1], "live")]),
    response([]),
    new Response("", { status: 503 }),
    response([update(games[1])]),
  ];
  t.mock.method(globalThis, "fetch", async () => replies.shift());
  let displayed;
  function Probe() {
    displayed = useLiveSchedule(games, 2026);
    return null;
  }
  await mount(t, React.createElement(Probe), kickoff - 31 * 60_000);
  await tick(t, 0);
  assert.equal(fetch.mock.calls.length, 0);
  await tick(t, 60_000);
  assert.equal(fetch.mock.calls.length, 1);
  assert.equal(displayed[1].status, "live");
  await tick(t, 60_000);
  await tick(t, 60_000);
  assert.equal(displayed[0], games[0]);
  assert.equal(displayed[1].status, "live");
  await tick(t, 60_000);
  assert.equal(displayed[1].status, "final");
  assert.equal(fetch.mock.calls.length, 4);
  await tick(t, 60_000);
  assert.equal(fetch.mock.calls.length, 4);
});

test("failed requests stop at the end of the estimated game window", async (t) => {
  const games = [schedule.games[3]];
  const kickoff = Date.parse(games[0].kickoffAt);
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("offline");
  });
  function Probe() {
    useLiveSchedule(games, 2026);
    return null;
  }
  await mount(t, React.createElement(Probe), kickoff + 4 * 3600000 - 60_000);
  await tick(t, 0);
  assert.equal(fetch.mock.calls.length, 1);
  await tick(t, 60_000);
  assert.equal(fetch.mock.calls.length, 1);
});

test("client timeout aborts a stalled request while retaining the local schedule", async (t) => {
  const games = [schedule.games[3]];
  let signal, displayed;
  t.mock.method(globalThis, "fetch", (_url, options) => {
    signal = options.signal;
    return new Promise((_resolve, reject) =>
      signal.addEventListener("abort", () => reject(new Error("aborted"))),
    );
  });
  function Probe() {
    displayed = useLiveSchedule(games, 2026);
    return null;
  }
  const kickoff = Date.parse(games[0].kickoffAt);
  await mount(t, React.createElement(Probe), kickoff - 10 * 60_000);
  await tick(t, 0);
  assert.equal(signal.aborted, false);
  await tick(t, 10_000);
  assert.equal(signal.aborted, true);
  assert.equal(displayed, games);
});
