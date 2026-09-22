require("./register.cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");
const React = require("react");
const { createRoot } = require("react-dom/client");
const { NextRequest } = require("next/server");
const schedule = require("./fixtures/schedule-2026.json");
const schedules = require("../src/data/schedules/index.ts");
// Stand in for Sanity: only the 2026 season is published.
schedules.getSchedule = async (season) => (season === 2026 ? schedule : null);
schedules.getCurrentSchedule = async () => schedule;
const { GET } = require("../src/app/api/vikings-score/route.ts");
const ScheduleSections =
  require("../src/components/ScheduleSections.tsx").default;

const espnScoreboard =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";
const game = schedule.games.find((g) => g.id === "2026-reg-03");
const kickoff = Date.parse(game.kickoffAt);

// Shape of a Vikings game in ESPN's current-week scoreboard.
function espnEvent({ state, completed, detail, vikings, opponent }) {
  return {
    id: "401872950",
    date: "2026-09-27T20:05Z",
    season: { year: 2026, type: 2 },
    week: { number: 3 },
    status: { type: { state, completed, shortDetail: detail } },
    competitions: [
      {
        timeValid: true,
        status: { isTBDFlex: false },
        competitors: [
          { homeAway: "home", team: { id: "27", abbreviation: "TB" }, score: String(opponent) },
          { homeAway: "away", team: { id: "16", abbreviation: "MIN" }, score: String(vikings) },
        ],
      },
    ],
  };
}

async function flush() {
  // The route reads ESPN's body as a stream; let those callbacks settle.
  for (let i = 0; i < 20; i++) {
    await React.act(() => new Promise((resolve) => setImmediate(resolve)));
  }
}

test("a live ESPN game flows through the API route into the calendar card until it ends", async (t) => {
  let scoreboard = espnEvent({ state: "in", completed: false, detail: "7:32 - 3rd", vikings: 14, opponent: 10 });
  const espnCalls = [];
  const realFetch = globalThis.fetch;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    if (String(url).startsWith("/api/vikings-score")) {
      return GET(new NextRequest(`http://localhost${url}`));
    }
    assert.equal(url, espnScoreboard);
    espnCalls.push(options);
    return Response.json({ events: [scoreboard] });
  });
  t.after(() => (globalThis.fetch = realFetch));

  const dom = new JSDOM('<div id="root"></div>', { url: "http://localhost/" });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  window.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  window.cancelAnimationFrame = clearTimeout;
  window.HTMLElement.prototype.scrollTo = () => {};
  t.mock.timers.enable({ apis: ["Date", "setTimeout"], now: kickoff + 40 * 60_000 });
  const root = createRoot(document.getElementById("root"));
  await React.act(async () =>
    root.render(React.createElement(ScheduleSections, { schedule, referenceTime: Date.now() })),
  );
  t.after(async () => {
    await React.act(async () => root.unmount());
    dom.window.close();
    delete globalThis.window;
    delete globalThis.document;
    delete globalThis.IS_REACT_ACT_ENVIRONMENT;
  });
  const card = () => document.querySelector(`[data-game-id="${game.id}"]`);
  const tick = async (ms) => {
    await React.act(async () => t.mock.timers.tick(ms));
    await flush();
  };

  assert.match(card().textContent, /AGENDADO|JOGO ATUAL/);

  await tick(0);
  assert.equal(espnCalls.length, 1);
  assert.equal(new Headers(espnCalls[0].headers).has("User-Agent"), false);
  assert.match(card().textContent, /AO VIVO/);
  assert.match(card().textContent, /JOGO EM ANDAMENTO/);
  assert.match(card().textContent, /14×10/);

  scoreboard = espnEvent({ state: "in", completed: false, detail: "2:10 - 4th", vikings: 21, opponent: 17 });
  await tick(60_000);
  assert.equal(espnCalls.length, 2);
  assert.match(card().textContent, /21×17/);

  scoreboard = espnEvent({ state: "post", completed: true, detail: "Final", vikings: 24, opponent: 17 });
  await tick(60_000);
  assert.equal(espnCalls.length, 3);
  assert.doesNotMatch(card().textContent, /AO VIVO/);
  assert.match(card().textContent, /VITÓRIA DOS VIKINGS/);
  assert.match(card().textContent, /24×17/);

  // A final result closes the polling window for this game.
  await tick(60_000);
  assert.equal(espnCalls.length, 3);
});
