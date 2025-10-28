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
