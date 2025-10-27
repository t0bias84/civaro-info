# Civaro Byggmodul Demo

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
