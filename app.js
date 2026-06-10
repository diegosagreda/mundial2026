const THESPORTSDB_EVENTS_URL = 'https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4429&s=2026';
const THESPORTSDB_PLAYERS_URL = 'https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php';
const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';

const TRUSTED_SOURCES = {
  fifa: {
    label: 'FIFA Ranking',
    url: 'https://www.fifa.com/en/world-rankings',
    weight: 0.28
  },
  localModel: {
    label: 'Modelo estadístico local',
    url: 'data/stats.json',
    weight: 0.24
  },
  marketOdds: {
    label: 'Mercado de cuotas',
    url: 'https://the-odds-api.com/liveapi/guides/v4/',
    weight: 0.24
  },
  apiFootball: {
    label: 'API-Football/Sportmonks',
    url: 'https://www.api-football.com/documentation-v3',
    weight: 0.14
  },
  weather: {
    label: 'Open-Meteo clima/sede',
    url: 'https://open-meteo.com/',
    weight: 0.06
  },
  squads: {
    label: 'TheSportsDB plantillas',
    url: 'https://www.thesportsdb.com/documentation',
    weight: 0.04
  }
};

const VENUES = {
  'bc place': {
    city: 'Vancouver',
    country: 'Canadá',
    latitude: 49.2767,
    longitude: -123.1119,
    capacity: 54000,
    fifaName: 'BC Place Vancouver'
  },
  'estadio akron': {
    city: 'Guadalajara',
    country: 'México',
    latitude: 20.6817,
    longitude: -103.4626,
    capacity: 48071,
    fifaName: 'Estadio Guadalajara'
  },
  'estadio azteca': {
    city: 'Ciudad de México',
    country: 'México',
    latitude: 19.3029,
    longitude: -99.1505,
    capacity: 83000,
    fifaName: 'Mexico City Stadium'
  },
  'estadio bbva': {
    city: 'Monterrey',
    country: 'México',
    latitude: 25.6682,
    longitude: -100.2447,
    capacity: 53500,
    fifaName: 'Estadio Monterrey'
  },
  'gillette stadium': {
    city: 'Boston',
    country: 'Estados Unidos',
    latitude: 42.0909,
    longitude: -71.2643,
    capacity: 65878,
    fifaName: 'Boston Stadium'
  },
  'hard rock stadium': {
    city: 'Miami',
    country: 'Estados Unidos',
    latitude: 25.958,
    longitude: -80.2389,
    capacity: 65000,
    fifaName: 'Miami Stadium'
  },
  'lumen field': {
    city: 'Seattle',
    country: 'Estados Unidos',
    latitude: 47.5952,
    longitude: -122.3316,
    capacity: 69000,
    fifaName: 'Seattle Stadium'
  },
  'levis stadium': {
    city: 'Santa Clara',
    country: 'Estados Unidos',
    latitude: 37.403,
    longitude: -121.9702,
    capacity: 71000,
    fifaName: 'San Francisco Bay Area Stadium'
  },
  'levi s stadium': {
    city: 'Santa Clara',
    country: 'Estados Unidos',
    latitude: 37.403,
    longitude: -121.9702,
    capacity: 71000,
    fifaName: 'San Francisco Bay Area Stadium'
  },
  'lincoln financial field': {
    city: 'Filadelfia',
    country: 'Estados Unidos',
    latitude: 39.9008,
    longitude: -75.1675,
    capacity: 69000,
    fifaName: 'Philadelphia Stadium'
  },
  'mercedes benz stadium': {
    city: 'Atlanta',
    country: 'Estados Unidos',
    latitude: 33.7554,
    longitude: -84.4008,
    capacity: 75000,
    fifaName: 'Atlanta Stadium'
  },
  'metlife stadium': {
    city: 'East Rutherford',
    country: 'Estados Unidos',
    latitude: 40.8135,
    longitude: -74.0745,
    capacity: 82500,
    fifaName: 'New York New Jersey Stadium'
  },
  'nrg stadium': {
    city: 'Houston',
    country: 'Estados Unidos',
    latitude: 29.6847,
    longitude: -95.4107,
    capacity: 72220,
    fifaName: 'Houston Stadium'
  },
  'reliant stadium': {
    city: 'Houston',
    country: 'Estados Unidos',
    latitude: 29.6847,
    longitude: -95.4107,
    capacity: 72220,
    fifaName: 'Houston Stadium'
  },
  'sofi stadium': {
    city: 'Los Ángeles',
    country: 'Estados Unidos',
    latitude: 33.9535,
    longitude: -118.3392,
    capacity: 70240,
    fifaName: 'Los Angeles Stadium'
  },
  'sporting park': {
    city: 'Kansas City',
    country: 'Estados Unidos',
    latitude: 39.1216,
    longitude: -94.8239,
    capacity: 18467,
    fifaName: 'Kansas City Stadium'
  },
  'bmo field': {
    city: 'Toronto',
    country: 'Canadá',
    latitude: 43.6332,
    longitude: -79.4186,
    capacity: 45000,
    fifaName: 'Toronto Stadium'
  },
  'at t stadium': {
    city: 'Dallas',
    country: 'Estados Unidos',
    latitude: 32.7473,
    longitude: -97.0945,
    capacity: 80000,
    fifaName: 'Dallas Stadium'
  }
};

const TEAM_NAMES = {
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
  'New Zealand': 'Nueva Zelanda',
  Paraguay: 'Paraguay',
  Qatar: 'Qatar',
  Scotland: 'Escocia',
  'South Africa': 'Sudáfrica',
  'South Korea': 'Corea del Sur',
  Switzerland: 'Suiza',
  Turkey: 'Turquía',
  'United States': 'Estados Unidos'
};

const WEATHER_LABELS = {
  0: 'Despejado',
  1: 'Mayormente despejado',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Niebla',
  48: 'Niebla helada',
  51: 'Llovizna ligera',
  53: 'Llovizna',
  55: 'Llovizna intensa',
  61: 'Lluvia ligera',
  63: 'Lluvia',
  65: 'Lluvia fuerte',
  71: 'Nieve ligera',
  73: 'Nieve',
  75: 'Nieve fuerte',
  80: 'Chubascos ligeros',
  81: 'Chubascos',
  82: 'Chubascos fuertes',
  95: 'Tormenta',
  96: 'Tormenta con granizo',
  99: 'Tormenta fuerte'
};

const state = {
  matches: [],
  stats: [],
  externalBetting: { matches: [] },
  teams: [],
  squads: {},
  selectedTeamId: '',
  expandedMatchId: '',
  squadLoading: false,
  filters: { search: '', group: 'all', market: 'all' },
  dataSource: 'local',
  sourceDetail: 'JSON local',
  weatherUpdatedAt: null
};

const $ = (selector) => document.querySelector(selector);
const fmt = new Intl.DateTimeFormat('es-CO', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'America/Bogota'
});
const localFmt = new Intl.DateTimeFormat('es-CO', {
  dateStyle: 'medium',
  timeStyle: 'short'
});

function normalizeKey(value = '') {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function translateTeam(name) {
  return TEAM_NAMES[name] || name || 'Por definir';
}

function highResFlag(url = '') {
  return String(url || '').replace('/w80/', '/w320/');
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} en ${url}`);
  }
  return response.json();
}

async function loadData() {
  setLoading(true);

  try {
    const [localMatches, localStats] = await Promise.all([
      fetchJson('data/matches.json'),
      loadLocalStats(),
      loadExternalBetting(),
      loadTeams()
    ]);

    state.matches = normalizeLocalMatches(localMatches);
    state.stats = localStats;
    state.dataSource = 'sync';
    state.sourceDetail = state.matches.length >= 100
      ? 'WorldCup26 sync + Open-Meteo'
      : 'JSON local + Open-Meteo';
    setLoading(false);
    render();
    await enrichWithWeather(state.matches);
  } catch (error) {
    console.warn('No se pudo cargar el JSON sincronizado, intentando TheSportsDB:', error);
    try {
      const [apiMatches, localStats] = await Promise.all([
        loadRemoteMatches(),
        loadLocalStats(),
        loadExternalBetting(),
        loadTeams()
      ]);
      state.matches = apiMatches;
      state.stats = localStats;
      state.dataSource = 'api';
      state.sourceDetail = 'TheSportsDB + Open-Meteo';
    } catch (apiError) {
      console.warn('No se pudieron cargar APIs reales:', apiError);
      state.matches = [];
      state.stats = [];
      state.dataSource = 'error';
      state.sourceDetail = 'Sin datos';
    }
  }

  setLoading(false);
  render();
}

async function loadRemoteMatches() {
  const payload = await fetchJson(THESPORTSDB_EVENTS_URL);
  if (!payload.events?.length) {
    throw new Error('TheSportsDB no devolvió eventos del Mundial 2026');
  }

  const matches = payload.events
    .map(normalizeSportsDbMatch)
    .sort((a, b) => new Date(a.kickoffUtc) - new Date(b.kickoffUtc));

  await enrichWithWeather(matches);
  return matches;
}

async function loadLocalStats() {
  return fetchJson('data/stats.json');
}

async function loadExternalBetting() {
  try {
    state.externalBetting = await fetchJson('data/external-betting.json');
  } catch (error) {
    console.warn('No se pudo cargar data/external-betting.json:', error);
    state.externalBetting = { matches: [] };
  }
}

async function loadTeams() {
  try {
    state.teams = await fetchJson('data/teams.json');
  } catch (error) {
    console.warn('No se pudo cargar data/teams.json:', error);
    state.teams = [];
  }
}

function normalizeSportsDbMatch(event, index) {
  const venue = getVenueMeta(event.strVenue);
  const kickoffUtc = event.strTimestamp?.endsWith('Z')
    ? event.strTimestamp
    : `${event.strTimestamp}Z`;

  return {
    id: `tsdb-${event.idEvent}`,
    externalId: event.idEvent,
    matchNumber: index + 1,
    group: event.intRound || 'Fase',
    round: event.intRound ? `Ronda ${event.intRound}` : event.strStatus || 'Programado',
    homeTeam: translateTeam(event.strHomeTeam),
    awayTeam: translateTeam(event.strAwayTeam),
    homeBadge: event.strHomeTeamBadge,
    awayBadge: event.strAwayTeamBadge,
    kickoffUtc,
    localKickoff: event.dateEventLocal && event.strTimeLocal
      ? `${event.dateEventLocal}T${event.strTimeLocal}`
      : null,
    stadium: venue.fifaName || event.strVenue || 'Estadio por confirmar',
    venueName: event.strVenue || venue.fifaName || 'Estadio por confirmar',
    city: venue.city || event.strVenue || 'Ciudad por confirmar',
    country: venue.country || event.strCountry || 'País por confirmar',
    capacity: venue.capacity || null,
    latitude: venue.latitude || null,
    longitude: venue.longitude || null,
    status: event.strStatus || 'NS',
    score: event.intHomeScore !== null && event.intAwayScore !== null
      ? `${event.intHomeScore}-${event.intAwayScore}`
      : null,
    thumb: event.strThumb || event.strPoster || '',
    dataSource: 'TheSportsDB'
  };
}

function normalizeLocalMatches(matches) {
  return matches.map(match => ({
    ...match,
    round: match.round || `Grupo ${match.group}`,
    venueName: match.venueName || match.stadium,
    status: match.status || 'NS',
    dataSource: match.dataSource || 'JSON local',
    ...getVenueMeta(match.stadium)
  }));
}

function getVenueMeta(venueName = '') {
  const key = normalizeKey(venueName);
  if (VENUES[key]) return VENUES[key];

  return Object.entries(VENUES).find(([knownVenue]) => {
    return key.includes(knownVenue) || knownVenue.includes(key);
  })?.[1] || {};
}

async function enrichWithWeather(matches) {
  const venueGroups = new Map();

  matches.forEach(match => {
    if (!match.latitude || !match.longitude) return;
    const key = `${match.latitude},${match.longitude}`;
    if (!venueGroups.has(key)) venueGroups.set(key, []);
    venueGroups.get(key).push(match);
  });

  await Promise.all([...venueGroups.entries()].map(async ([, venueMatches]) => {
    const [sample] = venueMatches;
    try {
      const weather = await loadWeather(sample.latitude, sample.longitude);
      venueMatches.forEach(match => {
        match.weather = pickWeatherForMatch(weather, match.localKickoff);
      });
      state.weatherUpdatedAt = new Date();
    } catch (error) {
      console.warn(`No se pudo cargar clima para ${sample.stadium}:`, error);
    }
  }));
}

async function loadWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code',
    hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m,weather_code',
    forecast_days: '16',
    timezone: 'auto'
  });

  return fetchJson(`${OPEN_METEO_URL}?${params}`);
}

function pickWeatherForMatch(weather, localKickoff) {
  const fallback = weather.current ? {
    label: WEATHER_LABELS[weather.current.weather_code] || 'Clima actual',
    temperature: weather.current.temperature_2m,
    humidity: weather.current.relative_humidity_2m,
    precipitation: weather.current.precipitation,
    wind: weather.current.wind_speed_10m,
    source: 'Clima actual',
    time: weather.current.time
  } : null;

  if (!weather.hourly || !localKickoff) return fallback;

  const kickoffHour = localKickoff.slice(0, 13);
  const index = weather.hourly.time.findIndex(time => time.startsWith(kickoffHour));
  if (index === -1) return fallback;

  return {
    label: WEATHER_LABELS[weather.hourly.weather_code[index]] || 'Pronóstico',
    temperature: weather.hourly.temperature_2m[index],
    humidity: weather.hourly.relative_humidity_2m[index],
    precipitationProbability: weather.hourly.precipitation_probability[index],
    wind: weather.hourly.wind_speed_10m[index],
    source: 'Pronóstico kickoff',
    time: weather.hourly.time[index]
  };
}

function getMatchStats(match) {
  const label = `${match.homeTeam} vs ${match.awayTeam}`;
  const normalizedLabel = normalizeKey(label);
  return state.stats.find(item => normalizeKey(item.matchLabel) === normalizedLabel) || null;
}

function teamPower(teamName = '') {
  const powers = {
    Francia: 96,
    España: 95,
    Argentina: 95,
    Inglaterra: 93,
    Portugal: 92,
    Brasil: 91,
    'Países Bajos': 88,
    Bélgica: 86,
    Alemania: 86,
    Italia: 85,
    Uruguay: 84,
    Colombia: 83,
    Croacia: 83,
    México: 80,
    'Estados Unidos': 80,
    Suiza: 80,
    Japón: 79,
    Marruecos: 78,
    Canadá: 75,
    Paraguay: 74,
    Australia: 73,
    Turquía: 78,
    Escocia: 74,
    Ecuador: 78,
    Senegal: 78,
    Ghana: 73,
    'Corea del Sur': 76,
    Qatar: 70,
    Sudáfrica: 69,
    Haití: 64,
    'Nueva Zelanda': 66
  };

  return powers[teamName] || 70;
}

function createBettingModel(match, stats) {
  const external = getExternalBetting(match);
  const homePower = teamPower(match.homeTeam);
  const awayPower = teamPower(match.awayTeam);
  const diff = homePower - awayPower;
  const fifaSignal = {
    source: 'fifa',
    active: !match.homeTeam.includes('Por definir') && !match.awayTeam.includes('Por definir'),
    homeWin: clamp(Math.round(38 + diff * 0.9), 20, 68),
    draw: clamp(25 - Math.abs(diff) * 0.05, 20, 30),
    awayWin: clamp(Math.round(32 - diff * 0.75), 16, 62),
    xgHome: clamp(1.18 + diff * 0.025, 0.65, 2.35),
    xgAway: clamp(1.05 - diff * 0.02, 0.55, 2.1),
    confidence: clamp(54 + Math.abs(diff) * 0.42, 52, 72),
    note: 'Fuerza relativa por ranking y nivel histórico reciente.'
  };

  const statsSignal = stats ? {
    source: 'localModel',
    active: true,
    homeWin: clamp(Math.round(stats.winnerProbability.team === match.homeTeam ? stats.winnerProbability.max : (100 - stats.winnerProbability.max) / 2), 18, 72),
    draw: 27,
    awayWin: clamp(Math.round(stats.winnerProbability.team === match.awayTeam ? stats.winnerProbability.max : (100 - stats.winnerProbability.max) / 2), 18, 72),
    xgHome: stats.expectedGoals.home,
    xgAway: stats.expectedGoals.away,
    corners: stats.corners.expected,
    shotsOnTarget: stats.shotsOnTarget.expected,
    confidence: stats.confidence,
    recommendation: stats.recommendation,
    fairOdd: stats.fairOdd,
    note: 'Modelo local de goles esperados, córners y tiros.'
  } : null;

  const weatherSignal = buildWeatherSignal(match);
  const squadSignal = buildSquadSignal(match);
  const oddsSignal = external?.odds ? buildOddsSignal(external.odds) : {
      source: 'marketOdds',
      active: false,
      note: 'Preparado para cuotas reales con THE_ODDS_API_KEY en backend.'
    };
  const apiPredictionSignal = external?.prediction ? buildApiPredictionSignal(external.prediction) : {
      source: 'apiFootball',
      active: false,
      note: 'Preparado para predicciones/forma avanzada con API-Football o Sportmonks.'
    };

  const signals = [fifaSignal, statsSignal, oddsSignal, apiPredictionSignal, weatherSignal, squadSignal].filter(Boolean);
  const activeSignals = signals.filter(signal => signal.active);
  const totalWeight = activeSignals.reduce((sum, signal) => sum + TRUSTED_SOURCES[signal.source].weight, 0) || 1;
  const weighted = (key, fallback = 0) => {
    const sum = activeSignals.reduce((acc, signal) => {
      return acc + (signal[key] ?? fallback) * TRUSTED_SOURCES[signal.source].weight;
    }, 0);
    return sum / totalWeight;
  };

  const homeWin = Math.round(weighted('homeWin', fifaSignal.homeWin));
  const awayWin = Math.round(weighted('awayWin', fifaSignal.awayWin));
  const draw = clamp(Math.round(weighted('draw', fifaSignal.draw)), 18, 33);
  const xgHome = weighted('xgHome', fifaSignal.xgHome);
  const xgAway = weighted('xgAway', fifaSignal.xgAway);
  const xgTotal = xgHome + xgAway;
  const corners = weighted('corners', clamp(8.6 + Math.abs(diff) * 0.035, 7.2, 11.4));
  const shotsOnTarget = weighted('shotsOnTarget', clamp(7.1 + xgTotal * 0.75, 6.2, 10.4));
  const confidence = clamp(
    Math.round(weighted('confidence', 56) * Math.min(1, 0.82 + activeSignals.length * 0.045)),
    50,
    activeSignals.length >= 4 ? 76 : 68
  );

  return {
    source: `${activeSignals.length} fuentes activas`,
    sources: signals,
    activeSourceCount: activeSignals.length,
    coverage: Math.round(totalWeight * 100),
    homeWin,
    draw,
    awayWin,
    xgHome,
    xgAway,
    xgTotal,
    corners,
    shotsOnTarget,
    recommendation: statsSignal?.recommendation || buildRecommendation(match, homeWin, awayWin, xgTotal),
    confidence,
    fairOdd: statsSignal?.fairOdd || (100 / clamp(Math.max(homeWin, awayWin), 35, 74)).toFixed(2),
    primaryMarket: xgTotal >= 2.55 ? 'goals' : 'winner'
  };
}

function getExternalBetting(match) {
  const label = normalizeKey(`${match.homeTeam} vs ${match.awayTeam}`);
  return state.externalBetting.matches?.find(item => {
    return item.matchId === match.id || normalizeKey(item.matchLabel || '') === label;
  }) || null;
}

function buildOddsSignal(odds) {
  const homeOdd = Number(odds.home);
  const drawOdd = Number(odds.draw);
  const awayOdd = Number(odds.away);
  if (!homeOdd || !drawOdd || !awayOdd) {
    return {
      source: 'marketOdds',
      active: false,
      note: 'Cuotas incompletas.'
    };
  }

  const rawHome = 1 / homeOdd;
  const rawDraw = 1 / drawOdd;
  const rawAway = 1 / awayOdd;
  const total = rawHome + rawDraw + rawAway;

  return {
    source: 'marketOdds',
    active: true,
    homeWin: Math.round(rawHome / total * 100),
    draw: Math.round(rawDraw / total * 100),
    awayWin: Math.round(rawAway / total * 100),
    confidence: clamp(Math.max(rawHome, rawAway) / total * 100 + 8, 52, 76),
    note: `Mercado 1X2 normalizado desde cuotas ${homeOdd}/${drawOdd}/${awayOdd}.`
  };
}

function buildApiPredictionSignal(prediction) {
  const numberOrUndefined = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
  };

  return {
    source: 'apiFootball',
    active: true,
    homeWin: numberOrUndefined(prediction.homeWin),
    draw: numberOrUndefined(prediction.draw),
    awayWin: numberOrUndefined(prediction.awayWin),
    xgHome: numberOrUndefined(prediction.xgHome),
    xgAway: numberOrUndefined(prediction.xgAway),
    corners: numberOrUndefined(prediction.corners),
    shotsOnTarget: numberOrUndefined(prediction.shotsOnTarget),
    confidence: numberOrUndefined(prediction.confidence) || 58,
    note: prediction.note || 'Predicción externa normalizada desde proveedor deportivo.'
  };
}

function buildWeatherSignal(match) {
  if (!match.weather) return null;

  const rainRisk = Number(match.weather.precipitationProbability ?? (match.weather.precipitation > 0 ? 55 : 10));
  const wind = Number(match.weather.wind || 0);
  const drag = rainRisk >= 55 || wind >= 24 ? 0.16 : rainRisk >= 35 || wind >= 18 ? 0.08 : 0;

  return {
    source: 'weather',
    active: true,
    xgHome: 1.12 - drag / 2,
    xgAway: 1.0 - drag / 2,
    corners: drag ? 9.4 : 8.8,
    shotsOnTarget: drag ? 6.8 : 7.7,
    confidence: drag ? 57 : 54,
    note: drag
      ? 'Clima con riesgo de bajar precisión de tiro y ritmo.'
      : 'Clima sin penalización fuerte para ritmo ofensivo.'
  };
}

function buildSquadSignal(match) {
  const homeSquad = state.squads[match.homeTeamId];
  const awaySquad = state.squads[match.awayTeamId];
  if (!homeSquad?.length && !awaySquad?.length) return null;

  const homeAttackers = countAttackers(homeSquad);
  const awayAttackers = countAttackers(awaySquad);
  const delta = homeAttackers - awayAttackers;

  return {
    source: 'squads',
    active: true,
    homeWin: clamp(40 + delta * 2, 25, 60),
    draw: 26,
    awayWin: clamp(34 - delta * 2, 22, 58),
    xgHome: clamp(1.12 + homeAttackers * 0.035, 0.9, 1.65),
    xgAway: clamp(1.06 + awayAttackers * 0.035, 0.85, 1.6),
    confidence: 56,
    note: 'Plantillas disponibles: señales de volumen ofensivo por perfiles cargados.'
  };
}

function countAttackers(squad) {
  if (!squad?.length) return 0;
  const attackingPositions = ['Forward', 'Centre-Forward', 'Left Winger', 'Right Winger', 'Attacking Midfield'];
  return squad.filter(player => attackingPositions.some(position => String(player.strPosition || '').includes(position))).length;
}

function clamp(value, min, max) {
  return Math.min(Math.max(Number(value), min), max);
}

function buildRecommendation(match, homeWin, awayWin, totalGoals) {
  const favorite = homeWin >= awayWin ? match.homeTeam : match.awayTeam;
  const protection = Math.max(homeWin, awayWin) >= 55 ? `${favorite} empate no acción` : `${favorite} doble oportunidad`;
  const goals = totalGoals >= 2.55 ? 'Over 1.5 goles' : 'Under 3.5 goles';
  return `${protection} + ${goals}`;
}

function likelyScore(model) {
  const homeGoals = Math.max(0, Math.round(model.xgHome));
  const awayGoals = Math.max(0, Math.round(model.xgAway));
  return `${homeGoals}-${awayGoals}`;
}

function setLoading(isLoading) {
  $('#refreshButton').disabled = isLoading;
  $('#refreshButton').textContent = isLoading ? 'Actualizando...' : 'Actualizar datos';
}

function renderGroupFilter() {
  const groups = [...new Set(state.matches.map(match => match.group))].sort((a, b) => String(a).localeCompare(String(b), 'es', { numeric: true }));
  $('#groupFilter').innerHTML = '<option value="all">Todos los grupos</option>' +
    groups.map(group => `<option value="${escapeHtml(group)}">Grupo ${escapeHtml(group)}</option>`).join('');
  $('#groupFilter').value = state.filters.group;
}

function renderTeamSelect() {
  const currentValue = state.selectedTeamId;
  const teams = [...state.teams].sort((a, b) => {
    return String(a.group).localeCompare(String(b.group), 'es', { numeric: true }) || a.name.localeCompare(b.name, 'es');
  });

  $('#teamSelect').innerHTML = '<option value="">Seleccionar equipo</option>' +
    teams.map(team => `<option value="${escapeHtml(team.id)}">Grupo ${escapeHtml(team.group)} · ${escapeHtml(team.name)}</option>`).join('');
  $('#teamSelect').value = currentValue;
}

function filteredMatches() {
  const term = state.filters.search.toLowerCase().trim();
  return state.matches.filter(match => {
    const haystack = `${match.homeTeam} ${match.awayTeam} ${match.stadium} ${match.venueName} ${match.city} ${match.country}`.toLowerCase();
    const matchesSearch = !term || haystack.includes(term);
    const matchesGroup = state.filters.group === 'all' || match.group === state.filters.group;
    return matchesSearch && matchesGroup;
  });
}

function renderSummary(matches) {
  const stats = matches.map(match => getMatchStats(match)).filter(Boolean);
  const avgXg = stats.length
    ? stats.reduce((acc, item) => acc + item.expectedGoals.total, 0) / stats.length
    : 0;
  const top = [...stats].sort((a, b) => b.winnerProbability.max - a.winnerProbability.max)[0];
  const signals = stats.filter(item => item.valueSignal).length;

  $('#totalMatches').textContent = matches.length;
  $('#avgXg').textContent = avgXg.toFixed(2);
  $('#topWinner').textContent = top ? `${top.winnerProbability.team} ${top.winnerProbability.max}%` : '--';
  $('#valueSignals').textContent = signals;
  $('#lastUpdate').textContent = `${new Date().toLocaleString('es-CO')} · ${state.sourceDetail}`;
}

function renderMatches() {
  const matches = filteredMatches();
  $('#matchesList').innerHTML = matches.map(match => {
    const stats = getMatchStats(match);
    const model = createBettingModel(match, stats);
    const date = fmt.format(new Date(match.kickoffUtc));
    const localDate = match.localKickoff ? localFmt.format(new Date(match.localKickoff)) : null;
    const weather = renderWeather(match.weather);
    const capacity = match.capacity ? ` · Cap. ${Number(match.capacity).toLocaleString('es-CO')}` : '';
    const score = match.score ? `<span class="score">${escapeHtml(match.score)}</span>` : '<span>Programado</span>';
    const isExpanded = state.expandedMatchId === match.id;

    return `
      <article class="match-card ${isExpanded ? 'is-expanded' : ''}" data-match-id="${escapeHtml(match.id)}">
        ${match.thumb ? `<img class="match-thumb" src="${escapeHtml(match.thumb)}" alt="" loading="lazy">` : ''}
        <div class="match-top">
          <span>${escapeHtml(match.round)} · Partido ${escapeHtml(match.matchNumber)}</span>
          ${score}
        </div>
        <div class="teams flag-showcase">
          <span>${renderTeam(match.homeTeam, match.homeFlag, match.homeBadge, match.homeTeamId, 'home')}</span>
          <span class="vs">VS</span>
          <span>${renderTeam(match.awayTeam, match.awayFlag, match.awayBadge, match.awayTeamId, 'away')}</span>
        </div>
        <p class="venue">${escapeHtml(match.stadium)} · ${escapeHtml(match.city)}, ${escapeHtml(match.country)}${capacity}</p>
        <div class="info-grid">
          <div class="info-pill"><span>Hora Colombia</span><strong>${escapeHtml(date)}</strong></div>
          ${localDate ? `<div class="info-pill"><span>Hora sede</span><strong>${escapeHtml(localDate)}</strong></div>` : ''}
          ${weather}
        </div>
        ${stats ? `
          <div class="market-grid">
            <div class="market"><span>Ganador probable</span><strong>${escapeHtml(stats.winnerProbability.team)} ${stats.winnerProbability.max}%</strong></div>
            <div class="market"><span>Corners esperados</span><strong>${escapeHtml(stats.corners.expected)}</strong></div>
            <div class="market"><span>Tiros a puerta</span><strong>${escapeHtml(stats.shotsOnTarget.expected)}</strong></div>
            <div class="market"><span>Over goles</span><strong>${escapeHtml(stats.goalsMarket.suggestion)}</strong></div>
          </div>
          <div class="probability-bar"><div class="probability-fill" style="width:${stats.winnerProbability.max}%"></div></div>
        ` : '<p class="venue warning">Sin modelo estadístico para este partido todavía.</p>'}
        ${isExpanded ? renderBettingDetails(match, model) : ''}
      </article>`;
  }).join('') || '<p class="venue">No hay partidos con esos filtros.</p>';

  renderSummary(matches);
}

function renderBettingDetails(match, model) {
  const winner = model.homeWin >= model.awayWin ? match.homeTeam : match.awayTeam;
  const confidenceClass = model.confidence >= 68 ? 'strong' : model.confidence >= 60 ? 'medium' : 'soft';
  const playerProps = renderPlayerProps(match, model);

  return `
    <section class="betting-details">
      <div class="betting-head">
        <div>
          <p class="eyebrow">Análisis de apuestas</p>
          <h3>${escapeHtml(match.homeTeam)} vs ${escapeHtml(match.awayTeam)}</h3>
        </div>
        <span class="confidence-pill ${confidenceClass}">${Math.round(model.confidence)}% confianza</span>
      </div>

      <div class="betting-grid">
        <div class="bet-card featured">
          <span>Marcador probable</span>
          <strong>${escapeHtml(likelyScore(model))}</strong>
          <small>xG ${model.xgHome.toFixed(2)} - ${model.xgAway.toFixed(2)}</small>
        </div>
        <div class="bet-card">
          <span>Ganador probable</span>
          <strong>${escapeHtml(winner)}</strong>
          <small>${model.homeWin}% local · ${model.draw}% empate · ${model.awayWin}% visita</small>
        </div>
        <div class="bet-card">
          <span>Remates a puerta</span>
          <strong>${model.shotsOnTarget.toFixed(1)}</strong>
          <small>Total estimado del partido</small>
        </div>
        <div class="bet-card">
          <span>Córners</span>
          <strong>${model.corners.toFixed(1)}</strong>
          <small>Línea sugerida: ${model.corners >= 9.2 ? 'Over 8.5' : 'Under 10.5'}</small>
        </div>
      </div>

      <div class="pick-strip">
        ${renderPick('Más firme', model.recommendation, model.confidence)}
        ${renderPick('Goles', model.xgTotal >= 2.55 ? 'Over 1.5 goles' : 'Under 3.5 goles', model.xgTotal >= 2.55 ? 66 : 68)}
        ${renderPick('Corners', model.corners >= 9.2 ? 'Over 8.5 córners' : 'Under 10.5 córners', 61)}
        ${renderPick('Cuota justa', String(model.fairOdd), model.confidence)}
      </div>

      <div class="player-props">
        <div class="mini-title">
          <span>Remates al arco de jugador</span>
          <small>${escapeHtml(model.source)}</small>
        </div>
        ${playerProps}
      </div>
      ${renderSourceConsensus(model)}
      <p class="risk-note">No hay apuestas garantizadas. Estas señales son estimaciones probabilísticas y deben compararse con cuotas reales antes de apostar.</p>
    </section>
  `;
}

function renderSourceConsensus(model) {
  return `
    <div class="source-consensus">
      <div class="mini-title">
        <span>Consenso de fuentes</span>
        <small>${model.activeSourceCount} activas · cobertura ${model.coverage}%</small>
      </div>
      <div class="source-list">
        ${model.sources.map(signal => {
          const source = TRUSTED_SOURCES[signal.source];
          return `
            <a class="source-item ${signal.active ? 'active' : 'inactive'}" href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">
              <span>${escapeHtml(source.label)}</span>
              <strong>${signal.active ? `Peso ${Math.round(source.weight * 100)}%` : 'Pendiente'}</strong>
              <small>${escapeHtml(signal.note)}</small>
            </a>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderPick(label, value, confidence) {
  return `
    <div class="pick">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${Math.round(confidence)}%</small>
    </div>
  `;
}

function renderPlayerProps(match, model) {
  const players = [
    ...getPropCandidates(match.homeTeamId, match.homeTeam, model.xgHome),
    ...getPropCandidates(match.awayTeamId, match.awayTeam, model.xgAway)
  ].slice(0, 6);

  if (!players.length) {
    return '<p class="venue">Abre la plantilla de una selección para cargar jugadores disponibles desde TheSportsDB.</p>';
  }

  return `
    <div class="prop-grid">
      ${players.map(player => `
        <div class="prop-card">
          ${player.photo ? `<img src="${escapeHtml(player.photo)}" alt="" loading="lazy">` : '<span class="player-placeholder"></span>'}
          <div>
            <strong>${escapeHtml(player.name)}</strong>
            <span>${escapeHtml(player.team)} · ${escapeHtml(player.position)}</span>
            <small>${player.line}</small>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function getPropCandidates(teamId, teamName, teamXg) {
  const squad = state.squads[teamId];
  if (!squad?.length) return [];

  const attackingPositions = ['Forward', 'Centre-Forward', 'Left Winger', 'Right Winger', 'Attacking Midfield', 'Midfielder'];
  return squad
    .filter(player => attackingPositions.some(position => String(player.strPosition || '').includes(position)))
    .slice(0, 3)
    .map((player, index) => ({
      name: player.strPlayer,
      team: teamName,
      position: player.strPosition || 'Ataque',
      photo: player.strCutout || player.strThumb,
      line: index === 0 && teamXg >= 1.35 ? '1+ remate a puerta' : '1+ remate total'
    }));
}

function renderTeam(team, flag, badge, teamId, side = 'home') {
  const crest = badge || null;
  const flagUrl = highResFlag(flag);
  const flagStyle = flagUrl ? ` style="--flag-image:url('${escapeHtml(flagUrl)}')"` : '';

  return `
    <button class="team-name team-button flag-team flag-team-${escapeHtml(side)}" type="button" data-team-id="${escapeHtml(teamId || '')}"${flagStyle}>
      <span class="flag-backdrop"></span>
      <span class="team-content">
        <span class="team-label">${escapeHtml(team)}</span>
        ${crest ? `<img class="team-crest" src="${escapeHtml(crest)}" alt="" loading="lazy">` : `<span class="flag-code">${escapeHtml(team.slice(0, 3).toUpperCase())}</span>`}
      </span>
    </button>
  `;
}

function renderWeather(weather) {
  if (!weather) {
    return '<div class="info-pill warning"><span>Clima</span><strong>No disponible</strong></div>';
  }

  const rain = weather.precipitationProbability !== undefined
    ? `${weather.precipitationProbability}% lluvia`
    : `${weather.precipitation ?? 0} mm`;

  return `
    <div class="info-pill weather-pill">
      <span>${escapeHtml(weather.source)}</span>
      <strong>${escapeHtml(weather.label)} · ${Math.round(weather.temperature)}°C</strong>
      <small>Humedad ${weather.humidity}% · Viento ${Math.round(weather.wind)} km/h · ${rain}</small>
    </div>
  `;
}

function renderPredictions() {
  const loadedMatchLabels = new Set(state.matches.map(match => normalizeKey(`${match.homeTeam} vs ${match.awayTeam}`)));
  const ordered = [...state.stats]
    .filter(item => loadedMatchLabels.has(normalizeKey(item.matchLabel)))
    .filter(item => state.filters.market === 'all' || item.primaryMarket === state.filters.market)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 8);

  $('#predictionsList').innerHTML = ordered.map(item => `
    <article class="prediction-card">
      <span class="badge">${escapeHtml(item.primaryMarket.toUpperCase())}</span>
      <h3>${escapeHtml(item.matchLabel)}</h3>
      <p class="venue">${escapeHtml(item.recommendation)}</p>
      <div class="market-grid">
        <div class="market"><span>Confianza</span><strong>${item.confidence}%</strong></div>
        <div class="market"><span>Cuota justa</span><strong>${escapeHtml(item.fairOdd)}</strong></div>
      </div>
      <div class="probability-bar"><div class="probability-fill" style="width:${item.confidence}%"></div></div>
    </article>
  `).join('') || '<p class="venue">No hay predicciones alineadas con el calendario real para este filtro.</p>';
}

function getSelectedTeam() {
  return state.teams.find(team => team.id === state.selectedTeamId) || null;
}

async function selectTeam(teamId) {
  state.selectedTeamId = teamId;
  renderTeamSelect();
  renderSquad();

  const team = getSelectedTeam();
  if (!team?.sportsDbTeamId || state.squads[team.id]) return;

  state.squadLoading = true;
  renderSquad();

  try {
    const params = new URLSearchParams({ id: team.sportsDbTeamId });
    const payload = await fetchJson(`${THESPORTSDB_PLAYERS_URL}?${params}`);
    state.squads[team.id] = payload.player || [];
  } catch (error) {
    console.warn(`No se pudo cargar plantilla de ${team.name}:`, error);
    state.squads[team.id] = null;
  } finally {
    state.squadLoading = false;
    renderSquad();
  }
}

async function ensureSquad(teamId) {
  const team = state.teams.find(item => item.id === teamId);
  if (!team?.sportsDbTeamId || state.squads[team.id] !== undefined) return;

  try {
    const params = new URLSearchParams({ id: team.sportsDbTeamId });
    const payload = await fetchJson(`${THESPORTSDB_PLAYERS_URL}?${params}`);
    state.squads[team.id] = payload.player || [];
  } catch (error) {
    console.warn(`No se pudo precargar plantilla de ${team.name}:`, error);
    state.squads[team.id] = null;
  }
}

async function toggleMatch(matchId) {
  const match = state.matches.find(item => item.id === matchId);
  if (!match) return;

  state.expandedMatchId = state.expandedMatchId === matchId ? '' : matchId;
  renderMatches();

  if (!state.expandedMatchId) return;

  await Promise.all([
    ensureSquad(match.homeTeamId),
    ensureSquad(match.awayTeamId)
  ]);

  renderMatches();
}

function renderSquad() {
  const team = getSelectedTeam();
  if (!team) {
    $('#squadPanel').innerHTML = '<p class="venue">Selecciona una selección desde el calendario o el selector.</p>';
    return;
  }

  const squad = state.squads[team.id];
  const teamMedia = team.banner
    ? `<img class="squad-banner" src="${escapeHtml(team.banner)}" alt="" loading="lazy">`
    : '';
  const badge = team.badge || team.flag;

  if (!team.sportsDbTeamId) {
    $('#squadPanel').innerHTML = `
      <article class="squad-card">
        ${teamMedia}
        <div class="squad-team-head">
          ${badge ? `<img src="${escapeHtml(badge)}" alt="" loading="lazy">` : ''}
          <div>
            <h3>${escapeHtml(team.name)}</h3>
            <p class="venue">Grupo ${escapeHtml(team.group)} · ${escapeHtml(team.fifaCode)}</p>
          </div>
        </div>
        <p class="venue warning">TheSportsDB todavía no tiene plantilla pública para esta selección.</p>
      </article>
    `;
    return;
  }

  if (state.squadLoading && squad === undefined) {
    $('#squadPanel').innerHTML = `
      <article class="squad-card">
        <div class="squad-team-head">
          ${badge ? `<img src="${escapeHtml(badge)}" alt="" loading="lazy">` : ''}
          <div>
            <h3>${escapeHtml(team.name)}</h3>
            <p class="venue">Cargando plantilla...</p>
          </div>
        </div>
      </article>
    `;
    return;
  }

  if (!squad?.length) {
    $('#squadPanel').innerHTML = `
      <article class="squad-card">
        ${teamMedia}
        <div class="squad-team-head">
          ${badge ? `<img src="${escapeHtml(badge)}" alt="" loading="lazy">` : ''}
          <div>
            <h3>${escapeHtml(team.name)}</h3>
            <p class="venue">Grupo ${escapeHtml(team.group)} · ${escapeHtml(team.fifaCode)}</p>
          </div>
        </div>
        <p class="venue warning">No hay jugadores disponibles desde la API en este momento.</p>
      </article>
    `;
    return;
  }

  const players = squad
    .slice(0, 28)
    .sort((a, b) => String(a.strPosition || '').localeCompare(String(b.strPosition || ''), 'es') || a.strPlayer.localeCompare(b.strPlayer, 'es'));

  $('#squadPanel').innerHTML = `
    <article class="squad-card">
      ${teamMedia}
      <div class="squad-team-head">
        ${badge ? `<img src="${escapeHtml(badge)}" alt="" loading="lazy">` : ''}
        <div>
          <h3>${escapeHtml(team.name)}</h3>
          <p class="venue">Grupo ${escapeHtml(team.group)} · ${escapeHtml(team.fifaCode)} · ${players.length} jugadores</p>
        </div>
      </div>
      <div class="players-list">
        ${players.map(player => renderPlayer(player)).join('')}
      </div>
    </article>
  `;
}

function renderPlayer(player) {
  const photo = player.strCutout || player.strThumb;
  return `
    <div class="player-row">
      ${photo ? `<img src="${escapeHtml(photo)}" alt="" loading="lazy">` : '<span class="player-placeholder"></span>'}
      <div>
        <strong>${escapeHtml(player.strPlayer)}</strong>
        <span>${escapeHtml(player.strPosition || 'Posición sin dato')} · ${escapeHtml(player.strTeam || player.strTeam2 || 'Club sin dato')}</span>
      </div>
    </div>
  `;
}

function render() {
  renderGroupFilter();
  renderTeamSelect();
  renderMatches();
  renderPredictions();
  renderSquad();
}

$('#searchInput').addEventListener('input', event => {
  state.filters.search = event.target.value;
  renderMatches();
});

$('#groupFilter').addEventListener('change', event => {
  state.filters.group = event.target.value;
  renderMatches();
});

$('#marketFilter').addEventListener('change', event => {
  state.filters.market = event.target.value;
  renderPredictions();
});

$('#refreshButton').addEventListener('click', loadData);

$('#teamSelect').addEventListener('change', event => {
  selectTeam(event.target.value);
});

$('#matchesList').addEventListener('click', event => {
  const button = event.target.closest('[data-team-id]');
  if (button?.dataset.teamId) {
    selectTeam(button.dataset.teamId);
    return;
  }

  if (event.target.closest('.betting-details')) return;

  const card = event.target.closest('[data-match-id]');
  if (!card?.dataset.matchId) return;
  toggleMatch(card.dataset.matchId);
});

loadData().catch(error => {
  console.error(error);
  $('#matchesList').innerHTML = '<p class="venue warning">No se pudieron cargar los datos.</p>';
});
