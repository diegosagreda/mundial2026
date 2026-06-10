import { writeFile } from 'node:fs/promises';

const GAMES_URL = 'https://worldcup26.ir/get/games';
const STADIUMS_URL = 'https://worldcup26.ir/get/stadiums';
const TEAMS_URL = 'https://worldcup26.ir/get/teams';
const SPORTSDDB_TEAM_SEARCH_URL = 'https://www.thesportsdb.com/api/v1/json/3/searchteams.php';
const MATCHES_OUTPUT_FILE = new URL('../data/matches.json', import.meta.url);
const TEAMS_OUTPUT_FILE = new URL('../data/teams.json', import.meta.url);

const STADIUM_META = {
  '1': { latitude: 19.3029, longitude: -99.1505, timezone: 'America/Mexico_City' },
  '2': { latitude: 20.6817, longitude: -103.4626, timezone: 'America/Mexico_City' },
  '3': { latitude: 25.6682, longitude: -100.2447, timezone: 'America/Mexico_City' },
  '4': { latitude: 33.7554, longitude: -84.4008, timezone: 'America/New_York' },
  '5': { latitude: 42.0909, longitude: -71.2643, timezone: 'America/New_York' },
  '6': { latitude: 32.7473, longitude: -97.0945, timezone: 'America/Chicago' },
  '7': { latitude: 29.6847, longitude: -95.4107, timezone: 'America/Chicago' },
  '8': { latitude: 25.958, longitude: -80.2389, timezone: 'America/New_York' },
  '9': { latitude: 39.1216, longitude: -94.8239, timezone: 'America/Chicago' },
  '10': { latitude: 33.9535, longitude: -118.3392, timezone: 'America/Los_Angeles' },
  '11': { latitude: 40.8135, longitude: -74.0745, timezone: 'America/New_York' },
  '12': { latitude: 43.6332, longitude: -79.4186, timezone: 'America/Toronto' },
  '13': { latitude: 49.2767, longitude: -123.1119, timezone: 'America/Vancouver' },
  '14': { latitude: 47.5952, longitude: -122.3316, timezone: 'America/Los_Angeles' },
  '15': { latitude: 37.403, longitude: -121.9702, timezone: 'America/Los_Angeles' },
  '16': { latitude: 39.9008, longitude: -75.1675, timezone: 'America/New_York' }
};

const COUNTRY_ES = {
  Canada: 'Canadá',
  Mexico: 'México',
  'United States': 'Estados Unidos'
};

const TEAM_ES = {
  Australia: 'Australia',
  Brazil: 'Brasil',
  Canada: 'Canadá',
  'Czech Republic': 'República Checa',
  Germany: 'Alemania',
  Haiti: 'Haití',
  Japan: 'Japón',
  Mexico: 'México',
  Morocco: 'Marruecos',
  Netherlands: 'Países Bajos',
  Paraguay: 'Paraguay',
  Scotland: 'Escocia',
  'South Africa': 'Sudáfrica',
  'South Korea': 'Corea del Sur',
  Switzerland: 'Suiza',
  Turkey: 'Turquía',
  'United States': 'Estados Unidos'
};

const TEAM_SEARCH_NAMES = {
  'United States': 'USA',
  Turkey: 'Turkey',
  'Czech Republic': 'Czech Republic',
  'Ivory Coast': 'Ivory Coast'
};

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} en ${url}`);
  return response.json();
}

function parseLocalDate(value) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/);
  if (!match) throw new Error(`Fecha local invalida: ${value}`);
  const [, month, day, year, hour, minute] = match.map(Number);
  return { year, month, day, hour, minute };
}

function getZonedParts(date, timezone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date);

  return Object.fromEntries(parts.filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)]));
}

function localTimeToUtc(parts, timezone) {
  const utcGuess = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);

  for (let offsetHours = -12; offsetHours <= 14; offsetHours += 1) {
    const candidate = new Date(utcGuess - offsetHours * 60 * 60 * 1000);
    const zoned = getZonedParts(candidate, timezone);
    const matches =
      zoned.year === parts.year &&
      zoned.month === parts.month &&
      zoned.day === parts.day &&
      zoned.hour === parts.hour &&
      zoned.minute === parts.minute;

    if (matches) return candidate.toISOString();
  }

  throw new Error(`No se pudo convertir ${JSON.stringify(parts)} en ${timezone}`);
}

function translateTeam(name) {
  return TEAM_ES[name] || name || 'Por definir';
}

function highResFlag(url = '') {
  return url.replace('/w80/', '/w320/');
}

function translateCountry(name) {
  return COUNTRY_ES[name] || name || 'País por confirmar';
}

function localIso(parts) {
  return `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}T${String(parts.hour).padStart(2, '0')}:${String(parts.minute).padStart(2, '0')}:00`;
}

const [gamesPayload, stadiumsPayload] = await Promise.all([
  fetchJson(GAMES_URL),
  fetchJson(STADIUMS_URL)
]);

const stadiums = new Map(stadiumsPayload.stadiums.map(stadium => [String(stadium.id), stadium]));

async function enrichTeam(team) {
  const searchName = TEAM_SEARCH_NAMES[team.name_en] || team.name_en;
  const params = new URLSearchParams({ t: searchName });

  try {
    const payload = await fetchJson(`${SPORTSDDB_TEAM_SEARCH_URL}?${params}`);
    const sportsDbTeam = payload.teams?.find(candidate => {
      return candidate.strSport === 'Soccer' &&
        ['FIFA World Cup', 'International Friendlies'].includes(candidate.strLeague);
    }) || payload.teams?.find(candidate => candidate.strSport === 'Soccer') || null;

    return {
      id: String(team.id),
      name: translateTeam(team.name_en),
      nameEn: team.name_en,
      group: team.groups,
      fifaCode: team.fifa_code,
      iso2: team.iso2,
      flag: highResFlag(team.flag),
      sportsDbTeamId: sportsDbTeam?.idTeam || null,
      badge: sportsDbTeam?.strBadge || sportsDbTeam?.strLogo || null,
      banner: sportsDbTeam?.strBanner || null,
      stadium: sportsDbTeam?.strStadium || null,
      website: sportsDbTeam?.strWebsite || null
    };
  } catch (error) {
    console.warn(`No se pudo enriquecer ${team.name_en} con TheSportsDB: ${error.message}`);
    return {
      id: String(team.id),
      name: translateTeam(team.name_en),
      nameEn: team.name_en,
      group: team.groups,
      fifaCode: team.fifa_code,
      iso2: team.iso2,
      flag: highResFlag(team.flag),
      sportsDbTeamId: null,
      badge: null,
      banner: null,
      stadium: null,
      website: null
    };
  }
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const teamsPayload = await fetchJson(TEAMS_URL);
const teams = await mapWithConcurrency(teamsPayload.teams, 1, async team => {
  const enrichedTeam = await enrichTeam(team);
  await wait(450);
  return enrichedTeam;
});
const teamsByExternalId = new Map(teams.map(team => [team.id, team]));

const matches = gamesPayload.games
  .map(game => {
    const stadium = stadiums.get(String(game.stadium_id)) || {};
    const meta = STADIUM_META[String(game.stadium_id)] || {};
    const localParts = parseLocalDate(game.local_date);
    const timezone = meta.timezone || 'UTC';
    const homeTeam = teamsByExternalId.get(String(game.home_team_id));
    const awayTeam = teamsByExternalId.get(String(game.away_team_id));

    return {
      id: `m${String(game.id).padStart(3, '0')}`,
      externalId: String(game.id),
      matchNumber: Number(game.id),
      group: game.group || game.type,
      round: game.type === 'group' ? `Grupo ${game.group}` : game.type,
      matchday: Number(game.matchday),
      type: game.type,
      homeTeam: homeTeam?.name || translateTeam(game.home_team_name_en),
      awayTeam: awayTeam?.name || translateTeam(game.away_team_name_en),
      homeTeamId: homeTeam?.id || String(game.home_team_id),
      awayTeamId: awayTeam?.id || String(game.away_team_id),
      homeFlag: homeTeam?.flag || null,
      awayFlag: awayTeam?.flag || null,
      homeBadge: homeTeam?.badge || null,
      awayBadge: awayTeam?.badge || null,
      kickoffUtc: localTimeToUtc(localParts, timezone),
      localKickoff: localIso(localParts),
      timezone,
      stadium: stadium.fifa_name || stadium.name_en || 'Estadio por confirmar',
      venueName: stadium.name_en || stadium.fifa_name || 'Estadio por confirmar',
      city: stadium.city_en || 'Ciudad por confirmar',
      country: translateCountry(stadium.country_en),
      capacity: stadium.capacity || null,
      latitude: meta.latitude || null,
      longitude: meta.longitude || null,
      status: game.finished === 'TRUE' ? 'FT' : 'NS',
      score: game.finished === 'TRUE' ? `${game.home_score}-${game.away_score}` : null,
      dataSource: 'worldcup26.ir'
    };
  })
  .sort((a, b) => a.matchNumber - b.matchNumber);

await Promise.all([
  writeFile(MATCHES_OUTPUT_FILE, `${JSON.stringify(matches, null, 2)}\n`),
  writeFile(TEAMS_OUTPUT_FILE, `${JSON.stringify(teams.sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name)), null, 2)}\n`)
]);

console.log(`Sincronizados ${matches.length} partidos en ${MATCHES_OUTPUT_FILE.pathname}`);
console.log(`Sincronizadas ${teams.length} selecciones en ${TEAMS_OUTPUT_FILE.pathname}`);
