import { readFile, writeFile } from 'node:fs/promises';

const MATCHES_FILE = new URL('../data/matches.json', import.meta.url);
const OUTPUT_FILE = new URL('../data/external-betting.json', import.meta.url);
const ODDS_API_KEY = process.env.THE_ODDS_API_KEY;
const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP ${response.status} en ${url}`);
  return response.json();
}

function normalizeKey(value = '') {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function findMatch(matches, homeTeam, awayTeam) {
  const direct = normalizeKey(`${homeTeam} vs ${awayTeam}`);
  return matches.find(match => normalizeKey(`${match.homeTeam} vs ${match.awayTeam}`) === direct);
}

async function loadOdds(matches) {
  if (!ODDS_API_KEY) return [];

  const params = new URLSearchParams({
    apiKey: ODDS_API_KEY,
    regions: 'us,uk,eu',
    markets: 'h2h',
    oddsFormat: 'decimal'
  });
  const events = await fetchJson(`https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup/odds?${params}`);

  return events.flatMap(event => {
    const match = findMatch(matches, event.home_team, event.away_team);
    const market = event.bookmakers?.[0]?.markets?.find(item => item.key === 'h2h');
    if (!match || !market) return [];

    const home = market.outcomes.find(outcome => normalizeKey(outcome.name) === normalizeKey(event.home_team));
    const away = market.outcomes.find(outcome => normalizeKey(outcome.name) === normalizeKey(event.away_team));
    const draw = market.outcomes.find(outcome => normalizeKey(outcome.name) === 'draw');
    if (!home || !draw || !away) return [];

    return [{
      matchId: match.id,
      matchLabel: `${match.homeTeam} vs ${match.awayTeam}`,
      odds: {
        home: home.price,
        draw: draw.price,
        away: away.price,
        bookmaker: event.bookmakers[0].title,
        eventId: event.id
      }
    }];
  });
}

async function loadApiFootballPredictions() {
  if (!API_FOOTBALL_KEY) return [];

  return [];
}

function mergeRows(rows) {
  const merged = new Map();

  rows.flat().forEach(row => {
    const current = merged.get(row.matchId) || {
      matchId: row.matchId,
      matchLabel: row.matchLabel
    };
    merged.set(row.matchId, { ...current, ...row });
  });

  return [...merged.values()];
}

const matches = JSON.parse(await readFile(MATCHES_FILE, 'utf8'));
const [oddsRows, apiFootballRows] = await Promise.all([
  loadOdds(matches),
  loadApiFootballPredictions(matches)
]);

const output = {
  updatedAt: new Date().toISOString(),
  sources: {
    theOddsApi: {
      enabled: Boolean(ODDS_API_KEY),
      description: 'Cuotas reales de mercado 1X2 normalizadas.'
    },
    apiFootball: {
      enabled: Boolean(API_FOOTBALL_KEY),
      description: 'Predicciones avanzadas normalizadas. Pendiente de mapear fixtures del proveedor.'
    }
  },
  matches: mergeRows([oddsRows, apiFootballRows])
};

await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Sincronizadas ${output.matches.length} filas externas en ${OUTPUT_FILE.pathname}`);
