# Mundial 2026 | Estadísticas y apuestas deportivas

Proyecto base en HTML, CSS y JavaScript puro.

## Cómo ejecutarlo

Usa un servidor local simple, porque `fetch()` no suele cargar JSON desde `file://`.

```bash
cd mundial-2026-stats-apuestas
python3 -m http.server 8080
```

Abre:

```text
http://localhost:8080
```

## APIs integradas

- Calendario completo: `scripts/sync-worldcup-data.mjs` consume `https://worldcup26.ir/get/games` y `https://worldcup26.ir/get/stadiums`, normaliza los 104 partidos y actualiza `data/matches.json`.
- Selecciones: el mismo script consume `https://worldcup26.ir/get/teams`, guarda banderas/códigos FIFA en `data/teams.json` y, cuando TheSportsDB lo permite, agrega escudos e IDs de equipo.
- Clima por sede: el frontend consulta Open-Meteo en vivo para cada estadio con coordenadas conocidas. Si el partido está dentro de la ventana de pronóstico, muestra clima de kickoff; si no, muestra clima actual de referencia.
- Plantillas: el apartado lateral carga jugadores bajo demanda desde TheSportsDB usando `lookup_all_players.php`. Si la API no tiene plantilla pública para una selección, la UI lo indica sin inventar datos.
- Pronósticos por consenso: el panel de partido cruza señales de FIFA/ranking, modelo local, clima Open-Meteo, plantillas TheSportsDB y fuentes externas normalizadas en `data/external-betting.json`.
- Cuotas externas: `scripts/sync-betting-sources.mjs` puede consumir The Odds API si defines `THE_ODDS_API_KEY` en el entorno. El archivo queda listo para sumar API-Football/Sportmonks desde backend sin exponer keys.
- Respaldo online: si el JSON sincronizado no carga, `app.js` intenta TheSportsDB (`eventsseason.php?id=4429&s=2026`) y luego muestra lo disponible.

Para refrescar el calendario completo:

```bash
node scripts/sync-worldcup-data.mjs
```

Para refrescar fuentes externas de apuestas:

```bash
THE_ODDS_API_KEY=tu_key node scripts/sync-betting-sources.mjs
```

## Estructura

```text
index.html
styles.css
app.js
scripts/sync-worldcup-data.mjs
scripts/sync-betting-sources.mjs
data/matches.json
data/teams.json
data/stats.json
data/external-betting.json
```

## Próximo paso recomendado

Para cuotas, eventos en vivo profundos y estadísticas de jugadores, no conviene exponer API keys desde el frontend. La arquitectura correcta sigue siendo:

Frontend HTML/CSS/JS -> Backend Node.js/Cron diario -> APIs deportivas -> JSON/DB -> Frontend

Fuentes candidatas:

- Sportmonks: fixtures, livescore, estadísticas, jugadores, odds y predicciones.
- API-Football/API-SPORTS: fixtures, equipos, eventos, standings y estadísticas.
- The Odds API: cuotas por casas de apuestas y mercados.

## Pendiente

- Reemplazar `stats.json` por datos calculados diariamente.
- Agregar backend Node.js para normalizar fuentes.
- Guardar histórico de cuotas para detectar value bets.
