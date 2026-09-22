require("./register.cjs");
const { test, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
let getEspnVikingsScores;
const {
  mergeLiveScoreUpdates,
  isLiveGameUpdate,
} = require("../src/lib/live-scores.ts");
const {
  getScheduleSectionOrder,
  getScoreRefreshSeasonType,
  getRelevantGame,
} = require("../src/lib/game-selection.ts");
let GET;
function resetScores() {
  delete require.cache[require.resolve("../src/lib/espn.ts")];
  delete require.cache[
    require.resolve("../src/app/api/vikings-score/route.ts")
  ];
  ({ getEspnVikingsScores } = require("../src/lib/espn.ts"));
  ({ GET } = require("../src/app/api/vikings-score/route.ts"));
}
beforeEach(resetScores);
const { NextRequest } = require("next/server");
const schedule = require("./fixtures/schedule-2026.json");
const schedules = require("../src/data/schedules/index.ts");
// Stand in for Sanity: only the 2026 season is published.
schedules.getSchedule = async (season) => (season === 2026 ? schedule : null);
schedules.getCurrentSchedule = async () => schedule;

function event({
  season = 2026,
  phase = 1,
  week = 3,
  state = "post",
  timeValid = true,
  opponent = "BAL",
  date = "2026-08-22T17:00:00Z",
} = {}) {
  return {
    id: `${season}-${phase}-${week}`,
    date,
    season: { year: season, type: phase },
    week: { number: week },
    status: {
      type: { state, completed: state === "post", shortDetail: "Final" },
    },
    competitions: [
      {
        timeValid,
        competitors: [
          { team: { id: "16", abbreviation: "MIN" }, score: "3" },
          { team: { id: "33", abbreviation: opponent }, score: "13" },
        ],
      },
    ],
  };
}
async function scores(t, events, season = 2026) {
  t.mock.method(globalThis, "fetch", async () => Response.json({ events }));
  return getEspnVikingsScores(season);
}

test("current-week scoreboard filters team, season and playoffs without a browser User-Agent", async (t) => {
  const otherTeam = event();
  otherTeam.competitions[0].competitors[0].team.id = "1";
  const namedWrong = event();
  namedWrong.name = "Other teams";
  const result = await scores(t, [
    namedWrong,
    event({ season: 2025 }),
    otherTeam,
    event({ phase: 3 }),
    event({
      phase: 2,
      week: 17,
      date: "2027-01-03T18:00Z",
      state: "pre",
      opponent: "NYJ",
    }),
  ]);
  assert.equal(result.games.length, 2);
  assert.deepEqual(result.games[0], {
    eventId: "2026-1-3",
    season: 2026,
    seasonType: "preseason",
    status: "final",
    statusDetail: "Final",
    kickoffAt: "2026-08-22T17:00:00Z",
    week: 3,
    opponentCode: "BAL",
    vikingsScore: 3,
    opponentScore: 13,
  });
  assert.equal(result.games[1].vikingsScore, null);
  // ESPN answers 400 to season-long date ranges and 403 to Mozilla/5.0.
  assert.equal(
    fetch.mock.calls[0].arguments[0],
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
  );
  assert.equal(fetch.mock.calls.length, 1);
  assert.equal(fetch.mock.calls[0].arguments[1].cache, "no-store");
  assert.equal(
    new Headers(fetch.mock.calls[0].arguments[1].headers).has("User-Agent"),
    false,
  );
});

test("provisional ESPN dates, WSH and 0-0 do not become confirmed games/results", async (t) => {
  const result = await scores(t, [
    event({
      phase: 2,
      week: 16,
      timeValid: false,
      state: "pre",
      opponent: "WSH",
    }),
  ]);
  const update = result.games[0];
  assert.equal(update.kickoffAt, null);
  assert.equal(update.opponentCode, "WAS");
  assert.equal(update.vikingsScore, null);
  const local = schedule.games.find(
    (g) => g.seasonType === "regular" && g.week === 16,
  );
  const [merged] = mergeLiveScoreUpdates([local], result.games, 2026);
  assert.equal(merged.status, "tbd");
  assert.equal(merged.kickoffAt, null);
});

test("invalid events are omitted without losing valid events", async (t) => {
  const badStatus = event();
  badStatus.status = null;
  const badScore = event();
  badScore.competitions[0].competitors[0].score = "";
  const result = await scores(t, [null, {}, [], badStatus, badScore, event()]);
  assert.equal(result.games.length, 1);
  assert.ok(isLiveGameUpdate(result.games[0]));
  for (const bad of [
    null,
    {},
    { ...result.games[0], vikingsScore: -1 },
    { ...result.games[0], kickoffAt: "bad" },
  ])
    assert.equal(isLiveGameUpdate(bad), false);
});

test("HTTP errors, timeout and malformed payload fall back without leaking errors", async (t) => {
  for (const response of [
    () => new Response("private error", { status: 500 }),
    () => Response.json({ events: {} }),
    () => new Response("{bad"),
    () => {
      throw new DOMException("private details", "TimeoutError");
    },
  ]) {
    resetScores();
    t.mock.method(globalThis, "fetch", async () => response());
    const result = await getEspnVikingsScores(2026);
    assert.equal(result.source, "unavailable");
    assert.deepEqual(result.games, []);
    assert.ok(!JSON.stringify(result).includes("private"));
  }
});

test("partial updates retain historical results and never regress final to live or scheduled", async (t) => {
  const result = await scores(t, [event()]);
  const local = schedule.games.filter((g) => g.seasonType === "preseason");
  const merged = mergeLiveScoreUpdates(local, result.games, 2026);
  assert.equal(merged[1].status, "final");
  assert.equal(merged[1].vikingsScore, 3);
  assert.equal(merged[0].vikingsScore, 13);
  assert.deepEqual(mergeLiveScoreUpdates(merged, [], 2026), merged);
  for (const status of ["scheduled", "live"]) {
    assert.deepEqual(
      mergeLiveScoreUpdates(
        merged,
        [{ ...result.games[0], status, vikingsScore: 0 }],
        2026,
        Date.parse(result.games[0].kickoffAt),
      ),
      merged,
    );
  }
  const incomplete = { ...result.games[0], vikingsScore: null };
  assert.equal(
    mergeLiveScoreUpdates(merged, [incomplete], 2026)[1].vikingsScore,
    3,
  );
});

test("ordering uses status then bounded dates, including stale fallback and a simulated future season", () => {
  for (const season of [2026, 2027]) {
    const shift = (g) => ({
      ...g,
      status: "scheduled",
      vikingsScore: null,
      opponentScore: null,
      kickoffAt:
        g.kickoffAt
          ?.replace("2027", String(season + 1))
          .replace("2026", String(season)) ?? null,
    });
    const games = schedule.games.map(shift);
    const order = (date, list = games) =>
      getScheduleSectionOrder(list, season, Date.parse(date))[0];
    assert.equal(order(`${season}-07-01`), "preseason");
    assert.equal(order(`${season}-08-22T18:00Z`), "preseason");
    assert.equal(order(`${season}-08-29T04:59Z`), "preseason");
    assert.equal(order(`${season}-08-29T05:00Z`), "regular");
    assert.equal(order(`${season}-09-01`), "regular");
    assert.equal(order(`${season}-09-14`), "regular");
    const finals = games.map((g) =>
      g.seasonType === "preseason" ? { ...g, status: "final" } : g,
    );
    assert.equal(order(`${season}-08-29T02:00Z`, finals), "regular");
    const live = games.map((g) =>
      g.id.endsWith("pre-03") ? { ...g, status: "live" } : g,
    );
    assert.equal(order(`${season}-08-29T06:00Z`, live), "preseason");
    assert.equal(order(`${season}-08-29T07:00Z`, live), "regular");
    const unknown = games.map((g) => ({
      ...g,
      kickoffAt: null,
      status: "tbd",
    }));
    assert.equal(order(`${season}-07-01`, unknown), "preseason");
    assert.equal(order(`${season + 1}-03-01`, unknown), "regular");
    assert.equal(
      order(`${season}-09-14`, [
        ...unknown.filter((g) => g.seasonType === "preseason"),
        ...games.filter((g) => g.seasonType === "regular"),
      ]),
      "regular",
    );
  }
  assert.deepEqual(getScheduleSectionOrder([], 2026, Date.now()), [
    "regular",
    "preseason",
  ]);
  assert.equal(
    getRelevantGame(schedule.games, Date.parse("2026-09-12")).id,
    "2026-reg-01",
  );
});

test("polling window opens 30 minutes before kickoff, closes at four hours, or six if confirmed live", () => {
  const game = schedule.games[3];
  const kickoff = Date.parse(game.kickoffAt);
  const phase = (delta, status = "scheduled") =>
    getScoreRefreshSeasonType([{ ...game, status }], kickoff + delta);
  assert.equal(phase(-1800001), null);
  assert.equal(phase(-1800000), "regular");
  assert.equal(phase(4 * 3600000 - 1), "regular");
  assert.equal(phase(4 * 3600000), null);
  assert.equal(phase(5 * 3600000, "live"), "regular");
  assert.equal(phase(6 * 3600000, "live"), null);
  assert.equal(phase(3600000, "final"), null);
});

test("route rejects unsupported seasons and shares the freshness budget with CDN", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: Date.parse("2026-09-12") });
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({ events: [event()] }),
  );
  for (const season of ["2027", "bad", "", "2026.0"]) {
    const response = await GET(
      new NextRequest(`http://localhost/api/vikings-score?season=${season}`),
    );
    assert.equal(response.status, 400);
  }
  assert.equal(fetch.mock.calls.length, 0);
  const response = await GET(
    new NextRequest("http://localhost/api/vikings-score?season=2026"),
  );
  assert.equal(response.status, 200);
  assert.equal(
    response.headers.get("cache-control"),
    "public, max-age=0, s-maxage=30, stale-while-revalidate=30",
  );
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("", { status: 503 }),
  );
  resetScores();
  const failed = await GET(
    new NextRequest("http://localhost/api/vikings-score"),
  );
  assert.equal(failed.status, 503);
  assert.equal(failed.headers.get("cache-control"), "no-store");
});

test("game times preserve local zones and TBD dates never become midnight kickoffs", () => {
  const { formatGameDate, formatGameTime } = require("../src/lib/time-zone.ts");
  const game = schedule.games.find((game) => game.id === "2026-pre-03");
  assert.equal(formatGameTime(game, "America/Sao_Paulo"), "22:00");
  assert.match(formatGameDate(game, "America/Sao_Paulo"), /28 de agosto/);
  assert.equal(formatGameTime(game, "Asia/Tokyo"), "10:00");
  assert.match(formatGameDate(game, "Asia/Tokyo"), /29 de agosto/);
  assert.equal(
    formatGameTime({ ...game, kickoffAt: null }, "Asia/Tokyo"),
    "Data e horário a definir",
  );
});

test("200 simultaneous cold requests share one ESPN call; warm and expired cache keep the same freshness budget", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: Date.parse("2026-09-12") });
  t.mock.method(globalThis, "fetch", async () => {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return Response.json({ events: [event()] });
  });
  const request = () =>
    GET(new NextRequest("http://localhost/api/vikings-score?season=2026"));
  const start = performance.now();
  const results = await Promise.all(Array.from({ length: 200 }, request));
  assert.equal(fetch.mock.calls.length, 1);
  assert.ok(results.every((r) => r.status === 200));
  const payloads = await Promise.all(results.map((r) => r.json()));
  assert.ok(payloads.every((p) => p.games[0].vikingsScore === 3));
  t.diagnostic(
    `200 requests: ${Math.round(performance.now() - start)}ms, 1 upstream request (simulated ESPN)`,
  );
  t.mock.timers.tick(20_000);
  const warm = await request();
  assert.match(warm.headers.get("cache-control"), /s-maxage=10,/);
  assert.equal(fetch.mock.calls.length, 1);
  t.mock.timers.tick(10_000);
  await Promise.all(Array.from({ length: 200 }, request));
  assert.equal(fetch.mock.calls.length, 2);
});

test("server cache preserves final results through partial, regressive and failed refreshes; stale fallback is not CDN cached", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: Date.parse("2026-09-12") });
  let events = [event(), event({ week: 4, opponent: "DEN" })];
  t.mock.method(globalThis, "fetch", async () => Response.json({ events }));
  const initial = await getEspnVikingsScores(2026);
  t.mock.timers.tick(30_000);
  events = [event({ state: "pre" })];
  const partial = await getEspnVikingsScores(2026);
  assert.equal(partial.games.length, 2);
  assert.ok(partial.games.every((g) => g.status === "final"));
  t.mock.timers.tick(30_000);
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("private", { status: 503 }),
  );
  const response = await GET(
    new NextRequest("http://localhost/api/vikings-score?season=2026"),
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const stale = await response.json();
  assert.deepEqual(stale.games, initial.games);
  assert.equal(stale.fetchedAt, partial.fetchedAt);
  await Promise.all(
    Array.from({ length: 200 }, () => getEspnVikingsScores(2026)),
  );
  assert.equal(fetch.mock.calls.length, 1);
  t.mock.timers.tick(5_000);
  await getEspnVikingsScores(2026);
  assert.equal(fetch.mock.calls.length, 2);
});

test("bounded payloads and invalid seasons cannot trigger unbounded parsing or arbitrary upstream URLs", async (t) => {
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response(" ".repeat(8 * 1024 * 1024 + 1)),
  );
  assert.equal((await getEspnVikingsScores(2026)).source, "unavailable");
  assert.equal(fetch.mock.calls[0].arguments[1].redirect, "error");
  assert.ok(fetch.mock.calls[0].arguments[1].signal instanceof AbortSignal);
  for (const season of [NaN, 2027, 1, Infinity, "http://localhost/"]) {
    assert.equal((await getEspnVikingsScores(season)).source, "unavailable");
  }
  assert.equal(fetch.mock.calls.length, 1);
  resetScores();
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({ events: Array(1001).fill(event()) }),
  );
  assert.equal((await getEspnVikingsScores(2026)).source, "unavailable");
});

test("rescheduled regular games, expired TBD games and weekday capitalization", () => {
  const {
    getNextGame,
    getGameSelection,
  } = require("../src/lib/game-selection.ts");
  const { formatGameDate } = require("../src/lib/time-zone.ts");
  const game = schedule.games.find((g) => g.id === "2026-reg-01");
  assert.equal(formatGameDate(game), "Domingo, 13 de setembro de 2026");
  const [moved] = mergeLiveScoreUpdates(
    [game],
    [
      {
        eventId: "moved",
        season: 2026,
        seasonType: "regular",
        week: game.week,
        opponentCode: game.opponent.code,
        status: "scheduled",
        statusDetail: "",
        kickoffAt: "2026-09-16T20:25Z",
        vikingsScore: null,
        opponentScore: null,
      },
    ],
    2026,
  );
  assert.equal(moved.kickoffAt, "2026-09-16T20:25Z");
  assert.equal(
    getNextGame(schedule.games, Date.parse("2027-01-04"), 2026).week,
    18,
  );
  assert.equal(
    getGameSelection(schedule.games, Date.parse("2027-03-01"), 2026).nextGame,
    null,
  );
});
