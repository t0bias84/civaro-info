# Civaro Byggmodul Demo

En låst, mörk helskärmsdemo av Civaro Byggmodul byggd med React 18 utan bundler. All data är inbäddad i koden och hela upplevelsen renderas via `index.html` + `app.js` med CDN-laddade beroenden.

## Förhandsgranskning

1. Öppna `index.html` direkt i Codex-preview (högerklicka filen och välj **Open in Preview**), eller dubbelklicka filen lokalt för att öppna i valfri webbläsare.
2. Vill du hellre nå den via `http://localhost` kan du köra `python3 -m http.server 4173` i projektmappen och besöka `http://localhost:4173/index.html`.
3. Ingen installation krävs – alla bibliotek laddas via CDN.

## Struktur

- `index.html` – importmap för React, Tailwind-konfiguration i mörkt läge, globala stilar och inkludering av ECharts samt html2canvas.
- `app.js` – all React-logik: scroll-snap-sektioner, glasade kort, KPI-hero med exportknapp, ECharts-visualiseringar, citatkort och källsektion.

## Funktioner

- Helskärmslayout med sticky sidonavigation som markerar aktiv sektion och scroll-snap mellan vyerna.
- Glasade kort i mörkt läge (#0b1220 → #121a2b) med indigo/emerald-accenter och subtil fade-in/parallax.
- Låst innehåll: fyra KPI-brickor, fem ECharts-grafer (bar, linje+band, log-linje, heatmap, prognos), citat, effektblock och källista utan interaktiva reglage.
- “Boka demo”-CTA i heron samt “Exportera som PNG” som använder `html2canvas` för att spara dashboard-sektionen.
- Fotnoter med ⓘ-ikon under varje kort/graf samt sammanställd källista.

## CDN-beroenden

- React 18 & ReactDOM 18 via [esm.sh](https://esm.sh/)
- Tailwind CSS via [cdn.tailwindcss.com](https://cdn.tailwindcss.com)
- Apache ECharts via [cdn.jsdelivr.net](https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js)
- html2canvas via [cdn.jsdelivr.net](https://cdn.jsdelivr.net/npm/html2canvas)
En zero-install React-demo som visualiserar Civaro Byggmodul. All logik och data lever i två filer (`index.html` och `app.js`) med CDN-laddade beroenden.

## Så kör du

1. Öppna `index.html` direkt i Codex-preview (högerklicka i filträdet och välj **Open in Preview**) eller dubbelklicka filen lokalt för att ladda den i din webbläsare.
2. Om du föredrar att köra den via en liten lokal server kan du i katalogen köra `python3 -m http.server 4173` och sedan öppna `http://localhost:4173/index.html` i en webbläsare.
3. Ingen `npm install` behövs – alla bibliotek hämtas från CDN:er.

## Struktur

- `index.html` – importmap, Tailwind via CDN, Chart.js och html2canvas samt root-container.
- `app.js` – all React-logik: KPI-kort, modellpanel, tre Chart.js-grafer, heatmap, framtidssektion, källista och PNG-export.

## Funktioner

- KPI-kort med ⓘ-tooltip som visar källa och metod.
- Inställningspanel där antaganden styr tids- och kostnadsbesparingar i realtid.
- Tre Chart.js-grafer: dygnsrytm (linje/area), ärenden per vecka med ledtid (bar + linje) samt heatmap för kompletteringar.
- Framtidsnarrativ med nu-läge, citat, prognosdiagram, devis och call-to-action-knappar.
- Export-knapp som använder `html2canvas` för att spara dashboarden som PNG.
- Samlad källista längst ned samt individuella fotnoter.

## Beroenden via CDN

- React 18 & ReactDOM 18 (`https://esm.sh/`)
- Tailwind CSS (`https://cdn.tailwindcss.com`)
- Chart.js (`https://cdn.jsdelivr.net/npm/chart.js`)
- html2canvas (`https://cdn.jsdelivr.net/npm/html2canvas`)
