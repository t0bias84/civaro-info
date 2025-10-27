import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

const SOURCED = {
  productivity_gap: { construction: 1.0, world_economy: 2.8, manufacturing: 3.6, source: "McKinsey 2017" },
  digital_gain: { productivity_pct: [14, 15], cost_pct: [4, 6], source: "McKinsey 2019" },
  eu_digital_intensity: { very_low_construction_pct: 39, source: "Eurostat Digital Decade" },
  genai_productivity_pp: { combined_min: 0.5, combined_max: 3.4, source: "MGI 2023" },
  stockholm_permit_weeks_usual: 10,
  sweden_permit_months_range: [1, 6],
  ai_sectors_growth: { ai_intensive: 4.3, other_sectors: 0.9, source: "PwC/Reuters 2024" }
};

const ASSUMPTIONS = {
  baseline_days: 29,
  new_days: 21,
  cases_per_week: 180,
  hours_per_day: 6,
  cost_per_hour: 650,
  baseline_complements_pct: 45,
  current_complements_pct: 27
};

const SOURCE_LIBRARY = [
  {
    id: "MGI2017",
    title: "McKinsey Global Institute (2017) – Reinventing Construction",
    description:
      "Jämför global byggproduktivitet (~1 % årlig tillväxt) med världsekonomin (~2,8 %) och tillverkningsindustrin (~3,6 %).",
    url: "https://www.mckinsey.com/industries/capital-projects-and-infrastructure/our-insights/reinventing-construction-a-route-to-higher-productivity"
  },
  {
    id: "McKinsey2019",
    title: "McKinsey & Company (2019) – Capital Projects & Infrastructure",
    description: "Digital transformation kan lyfta produktivitet med 14–15 % och sänka kostnader med 4–6 % i bygg.",
    url: "https://www.mckinsey.com/industries/capital-projects-and-infrastructure/our-insights/the-next-normal-in-construction-how-disruption-is-reshaping-the-worlds-largest-ecosystem"
  },
  {
    id: "Eurostat2023",
    title: "European Commission – Digital Intensity (Digital Decade)",
    description: "Byggbranschen har den högsta andelen företag med mycket låg digital intensitet (~39 %).",
    url: "https://digital-strategy.ec.europa.eu/en/library/digital-decades-key-indicators-desi-2023"
  },
  {
    id: "MGI2023",
    title: "McKinsey Global Institute (2023) – Generative AI and Productivity",
    description: "GenAI och automation kan driva 0,5–3,4 procentenheters årlig produktivitetsökning globalt.",
    url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier"
  },
  {
    id: "Stockholm",
    title: "Stockholms stad – Handläggningstider bygglov",
    description: "Kommunen anger att ett normalt bygglovsärende ofta tar omkring 10 veckor till beslut.",
    url: "https://bygglov.stockholm/att-soka-bygglov/sa-gar-det-till/"
  },
  {
    id: "DLAPiper",
    title: "DLA Piper Realworld – Sweden Planning Overview",
    description: "Praktiskt kan bygglovsprocessen ta mellan 1–6 månader beroende på kommun och ärendetyp.",
    url: "https://www.dlapiperrealworld.com/law/index.html?t=construction&s=planning&c=SE"
  },
  {
    id: "PwCReuters2024",
    title: "PwC / Reuters (2024) – Global AI Jobs and Productivity",
    description: "AI-intensiva sektorer ökade produktiviteten med cirka 4,3 % 2018–2022 jämfört med ~0,9 % i bygg/tillverkning/retail.",
    url: "https://www.reuters.com/technology/artificial-intelligence/ai-intensive-industries-see-higher-productivity-growth-than-others-pwc-says-2024-01-16/"
  },
  {
    id: "Illustrativ",
    title: "Illustrativ modell",
    description: "Simulerade data för flöden, kompletteringar och prognoser – byt mot er kommuns egna siffror vid skarp leverans.",
    url: null
  }
];

const KPI_CARDS = [
  {
    title: "Global bygg-produktivitet",
    value: "~1 % / år",
    description: "Världsekonomin växer ~2,8 % och tillverkning ~3,6 % per år – bygg hamnar långt efter.",
    source: "[MGI2017]",
    tooltip: () =>
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "font-semibold text-slate-800" }, "Årlig produktivitetsökning"),
        React.createElement(
          "ul",
          { className: "mt-2 list-disc space-y-1 pl-4 text-slate-700" },
          React.createElement(
            "li",
            null,
            "Bygg: ",
            SOURCED.productivity_gap.construction,
            "%"
          ),
          React.createElement(
            "li",
            null,
            "Världsekonomi: ",
            SOURCED.productivity_gap.world_economy,
            "%"
          ),
          React.createElement(
            "li",
            null,
            "Tillverkningsindustri: ",
            SOURCED.productivity_gap.manufacturing,
            "%"
          )
        )
      )
  },
  {
    title: "Digital transformationens effekt",
    value: "+14–15 %",
    description: "Potentiell produktivitetsökning; kostnader kan minska med 4–6 % genom digitalisering.",
    source: "[McKinsey2019]",
    tooltip: () =>
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "font-semibold text-slate-800" }, "Intervall från McKinsey (2019)"),
        React.createElement(
          "p",
          { className: "mt-2 text-slate-700" },
          "Produktivitet: +",
          SOURCED.digital_gain.productivity_pct[0],
          "–",
          SOURCED.digital_gain.productivity_pct[1],
          " %. Kostnad: −",
          SOURCED.digital_gain.cost_pct[0],
          "–",
          SOURCED.digital_gain.cost_pct[1],
          " %."
        )
      )
  },
  {
    title: "EU: låg digital intensitet",
    value: "39 %",
    description: "Andel europeiska byggbolag med mycket låg digital intensitet enligt Digital Decade-index.",
    source: "[Eurostat2023]",
    tooltip: () =>
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "font-semibold text-slate-800" }, "Digital intensitet"),
        React.createElement(
          "p",
          { className: "mt-2 text-slate-700" },
          "Bygg ligger sist – 39 % av företagen klassas som \u201cmycket låg\u201d digital nivå."
        )
      )
  },
  {
    title: "GenAI + automation",
    value: "+0,5–3,4 pp",
    description: "Årlig produktivitetsökning möjlig i kombination med automatisering och generativ AI.",
    source: "[MGI2023]",
    tooltip: () =>
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "font-semibold text-slate-800" }, "Produktivitetspotential"),
        React.createElement(
          "p",
          { className: "mt-2 text-slate-700" },
          "GenAI bidrar 0,1–0,6 pp på egen hand; tillsammans med automation 0,5–3,4 pp."
        )
      )
  },
  {
    title: "Bygglovstider i Sverige",
    value: "10 veckor",
    description: "Stockholm anger cirka 10 veckor; i landet tar beslut ofta 1–6 månader.",
    source: "[Stockholm] [DLAPiper]",
    tooltip: () =>
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "font-semibold text-slate-800" }, "Handläggningsvariation"),
        React.createElement(
          "p",
          { className: "mt-2 text-slate-700" },
          "Lokala förutsättningar ger stor spridning i väntetid för beslut."
        )
      )
  },
  {
    title: "AI-intensiva sektorer",
    value: "+4,3 %",
    description: "Produktivitetstillväxt 2018–2022; bygg/tillverkning/retail stannade vid ~0,9 %.",
    source: "[PwCReuters2024]",
    tooltip: () =>
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "font-semibold text-slate-800" }, "Produktivitetsskillnad"),
        React.createElement(
          "p",
          { className: "mt-2 text-slate-700" },
          "AI-intensiva sektorer drog ifrån övriga med nära fyra gånger så hög tillväxt."
        )
      )
  }
];

const DAILY_RHYTHM = [
  { hour: "06", cases: 8 },
  { hour: "07", cases: 12 },
  { hour: "08", cases: 20 },
  { hour: "09", cases: 28 },
  { hour: "10", cases: 35 },
  { hour: "11", cases: 32 },
  { hour: "12", cases: 24 },
  { hour: "13", cases: 30 },
  { hour: "14", cases: 34 },
  { hour: "15", cases: 26 },
  { hour: "16", cases: 18 },
  { hour: "17", cases: 12 }
];

const CASES_PER_WEEK = [
  { week: "v.1", cases: 162, leadTime: 28 },
  { week: "v.2", cases: 175, leadTime: 27 },
  { week: "v.3", cases: 181, leadTime: 25 },
  { week: "v.4", cases: 169, leadTime: 26 },
  { week: "v.5", cases: 188, leadTime: 24 },
  { week: "v.6", cases: 193, leadTime: 23 },
  { week: "v.7", cases: 205, leadTime: 22 },
  { week: "v.8", cases: 210, leadTime: 21 }
];

const HEATMAP_DATA = [
  { cause: "Situationsplan", values: [2, 4, 8, 10, 9, 7, 5, 3, 2, 1, 0, 0] },
  { cause: "Fasad", values: [1, 2, 5, 7, 8, 6, 5, 3, 3, 2, 1, 0] },
  { cause: "Kontrollplan", values: [0, 1, 3, 6, 7, 8, 6, 4, 2, 2, 1, 0] },
  { cause: "K-intyg", values: [0, 1, 2, 4, 5, 6, 6, 5, 3, 2, 1, 0] },
  { cause: "Brandskydd", values: [0, 1, 2, 4, 6, 6, 5, 4, 3, 2, 1, 0] }
];

const HEATMAP_HOURS = ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17"];

const PROGNOSIS = [
  { year: 2025, aiPermits: 5, automatedReviews: 3, timeReduction: 10 },
  { year: 2027, aiPermits: 30, automatedReviews: 25, timeReduction: 40 },
  { year: 2030, aiPermits: 60, automatedReviews: 55, timeReduction: 65 }
];

const InfoTooltip = ({ content, source }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (event) => {
      if (!event.target.closest("[data-tooltip]") && !event.target.closest("[data-tooltip-panel]")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [isOpen]);

  return React.createElement(
    "div",
    { className: "relative" },
    React.createElement(
      "button",
      {
        type: "button",
        "aria-label": "Visa källa",
        className:
          "flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-sm font-semibold text-brand-600 shadow-soft transition hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        onClick: toggle,
        "data-tooltip": true
      },
      "i"
    ),
    isOpen &&
      React.createElement(
        "div",
        {
          className:
            "absolute right-0 top-9 z-30 w-64 rounded-2xl bg-white p-4 text-left text-sm text-slate-700 shadow-2xl ring-1 ring-black/5",
          role: "dialog",
          "data-tooltip-panel": true
        },
        React.createElement("div", { className: "font-semibold text-slate-900" }, "Källa"),
        React.createElement("div", { className: "mt-2 text-slate-600" }, content),
        source &&
          React.createElement(
            "p",
            { className: "mt-2 text-xs text-slate-400" },
            source
          ),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: close,
            className:
              "mt-3 inline-flex items-center rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          },
          "Stäng"
        )
      )
  );
};

const StatCard = ({ title, value, description, source, tooltip }) =>
  React.createElement(
    "div",
    {
      className:
        "relative rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-white/60 backdrop-blur card-gradient"
    },
    React.createElement(
      "div",
      { className: "flex items-start justify-between gap-4" },
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "text-sm font-medium uppercase tracking-wide text-brand-600" }, title),
        React.createElement("p", { className: "mt-3 text-3xl font-bold text-slate-900" }, value)
      ),
      React.createElement(InfoTooltip, { content: tooltip(), source })
    ),
    React.createElement(
      "p",
      { className: "mt-4 text-sm text-slate-600" },
      description
    ),
    React.createElement(
      "p",
      { className: "mt-4 text-xs font-medium uppercase tracking-wide text-slate-400" },
      source
    )
  );

const SettingsPanel = ({ assumptions, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(true);

  const makeHandler = (key) => (event) => {
    const value = Number(event.target.value);
    onUpdate((prev) => ({ ...prev, [key]: value }));
  };

  return React.createElement(
    "div",
    { className: "rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200/60" },
    React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen((prev) => !prev),
        className:
          "flex w-full items-center justify-between gap-4 text-left text-lg font-semibold text-slate-900",
        "aria-expanded": isOpen
      },
      "Inställningar",
      React.createElement(
        "span",
        { className: "text-sm font-medium text-brand-600" },
        isOpen ? "Dölj" : "Visa"
      )
    ),
    isOpen &&
      React.createElement(
        "div",
        { className: "mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3" },
        renderInput("Baselinetid (dagar)", "baseline_days", assumptions.baseline_days, 10, 60, 1, makeHandler),
        renderInput("Ny tid med Civaro (dagar)", "new_days", assumptions.new_days, 5, 45, 1, makeHandler),
        renderInput("Ärenden per vecka", "cases_per_week", assumptions.cases_per_week, 60, 280, 5, makeHandler),
        renderInput("Timmar per dag", "hours_per_day", assumptions.hours_per_day, 4, 10, 0.5, makeHandler),
        renderInput("Kostnad per timme (SEK)", "cost_per_hour", assumptions.cost_per_hour, 300, 1200, 50, makeHandler),
        renderInput(
          "Kompletteringsgrad (före)",
          "baseline_complements_pct",
          assumptions.baseline_complements_pct,
          0,
          100,
          1,
          makeHandler
        ),
        renderInput(
          "Kompletteringsgrad (med Civaro)",
          "current_complements_pct",
          assumptions.current_complements_pct,
          0,
          100,
          1,
          makeHandler
        )
      )
  );
};

const renderInput = (label, key, value, min, max, step, handlerFactory) =>
  React.createElement(
    "label",
    { key, className: "flex flex-col gap-2 text-sm text-slate-600" },
    React.createElement(
      "span",
      { className: "font-semibold text-slate-800" },
      label,
      " ",
      React.createElement(
        "span",
        { className: "text-xs text-slate-400" },
        typeof value === "number" ? value.toLocaleString("sv-SE") : value
      )
    ),
    React.createElement("input", {
      type: "range",
      min,
      max,
      step,
      value,
      onChange: handlerFactory(key),
      className: "h-2 w-full cursor-pointer rounded-full bg-brand-100"
    }),
    React.createElement("input", {
      type: "number",
      min,
      max,
      step,
      value,
      onChange: handlerFactory(key),
      className:
        "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
    })
  );

const DailyRhythmChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasRef.current.height);
    gradient.addColorStop(0, "rgba(56, 189, 248, 0.65)");
    gradient.addColorStop(1, "rgba(56, 189, 248, 0.05)");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: DAILY_RHYTHM.map((item) => item.hour),
        datasets: [
          {
            label: "Ärenden",
            data: DAILY_RHYTHM.map((item) => item.cases),
            tension: 0.4,
            fill: true,
            backgroundColor: gradient,
            borderColor: "#0ea5e9",
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: "#0284c7"
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.formattedValue} ärenden`
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: "Timme", color: "#1e293b" },
            ticks: { color: "#1e293b" },
            grid: { color: "rgba(148, 163, 184, 0.25)" }
          },
          y: {
            title: { display: true, text: "Ärenden", color: "#1e293b" },
            ticks: { color: "#1e293b" },
            grid: { color: "rgba(148, 163, 184, 0.2)" }
          }
        }
      }
    });

    return () => chart.destroy();
  }, []);

  return React.createElement("canvas", { ref: canvasRef, className: "h-72 w-full" });
};

const WeeklyComboChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: CASES_PER_WEEK.map((d) => d.week),
        datasets: [
          {
            label: "Ärenden",
            data: CASES_PER_WEEK.map((d) => d.cases),
            backgroundColor: "rgba(37, 99, 235, 0.65)",
            borderRadius: 12,
            yAxisID: "y"
          },
          {
            label: "Ledtid (dagar)",
            type: "line",
            data: CASES_PER_WEEK.map((d) => d.leadTime),
            borderColor: "#22c55e",
            borderWidth: 3,
            tension: 0.3,
            pointBackgroundColor: "#16a34a",
            yAxisID: "y1"
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) =>
                context.datasetIndex === 0
                  ? `${context.formattedValue} ärenden`
                  : `${context.formattedValue} dagar`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Ärenden", color: "#1e293b" },
            ticks: { color: "#1e293b" },
            grid: { color: "rgba(148, 163, 184, 0.15)" }
          },
          y1: {
            beginAtZero: false,
            position: "right",
            title: { display: true, text: "Ledtid (dagar)", color: "#1e293b" },
            ticks: { color: "#1e293b" },
            grid: { drawOnChartArea: false }
          },
          x: {
            ticks: { color: "#1e293b" },
            grid: { color: "rgba(148, 163, 184, 0.15)" }
          }
        }
      }
    });

    return () => chart.destroy();
  }, []);

  return React.createElement("canvas", { ref: canvasRef, className: "h-72 w-full" });
};

const HeatmapChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const dataset = [];

    HEATMAP_DATA.forEach((row) => {
      row.values.forEach((value, hourIndex) => {
        dataset.push({ x: HEATMAP_HOURS[hourIndex], y: row.cause, v: value });
      });
    });

    const chart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Kompletteringar",
            data: dataset,
            pointStyle: "rectRounded",
            borderRadius: 6,
            borderWidth: 0,
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
            pointHoverRadius: 18,
            pointRadius: 18,
            backgroundColor: (context) => heatColor(context.raw.v)
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => `Kl: ${items[0].raw.x}`,
              label: (context) => `${context.raw.y}: ${context.raw.v} kompletteringar`
            }
          }
        },
        scales: {
          x: {
            type: "category",
            labels: HEATMAP_HOURS,
            offset: true,
            ticks: { color: "#1e293b" },
            grid: { color: "rgba(148, 163, 184, 0.1)" }
          },
          y: {
            type: "category",
            labels: HEATMAP_DATA.map((item) => item.cause),
            offset: true,
            reverse: true,
            ticks: { color: "#1e293b" },
            grid: { color: "rgba(148, 163, 184, 0.1)" }
          }
        }
      }
    });

    return () => chart.destroy();
  }, []);

  return React.createElement("canvas", { ref: canvasRef, className: "h-80 w-full" });
};

const heatColor = (value) => {
  const max = 10;
  const intensity = Math.min(1, value / max);
  const r = Math.round(248 + (15 - 248) * intensity);
  const g = Math.round(250 + (82 - 250) * intensity);
  const b = Math.round(252 + (105 - 252) * intensity);
  return `rgba(${r}, ${g}, ${b}, ${0.9})`;
};

const PrognosisChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: PROGNOSIS.map((item) => item.year),
        datasets: [
          {
            label: "AI-stödda bygglov",
            data: PROGNOSIS.map((item) => item.aiPermits),
            borderColor: "#0ea5e9",
            borderWidth: 3,
            tension: 0.35,
            pointBackgroundColor: "#0ea5e9",
            fill: false
          },
          {
            label: "Automatiserad ritningsgranskning",
            data: PROGNOSIS.map((item) => item.automatedReviews),
            borderColor: "#6366f1",
            borderWidth: 3,
            tension: 0.35,
            pointBackgroundColor: "#6366f1",
            fill: false
          },
          {
            label: "Minskad handläggningstid",
            data: PROGNOSIS.map((item) => item.timeReduction),
            borderColor: "#22c55e",
            borderWidth: 3,
            tension: 0.35,
            pointBackgroundColor: "#22c55e",
            fill: false
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) =>
                context.datasetIndex === 2
                  ? `-${context.formattedValue}%`
                  : `${context.formattedValue}%`
            }
          }
        },
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 70,
            ticks: {
              color: "#1e293b",
              callback: (value) => `${value}%`
            },
            grid: { color: "rgba(148, 163, 184, 0.15)" }
          },
          x: {
            ticks: { color: "#1e293b" },
            grid: { color: "rgba(148, 163, 184, 0.1)" }
          }
        }
      }
    });

    return () => chart.destroy();
  }, []);

  return React.createElement("canvas", { ref: canvasRef, className: "h-64 w-full" });
};

const SourcesList = ({ sources }) =>
  React.createElement(
    "section",
    { className: "rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200/60" },
    React.createElement("h2", { className: "text-2xl font-semibold text-slate-900" }, "Källor"),
    React.createElement(
      "p",
      { className: "mt-2 text-sm text-slate-600" },
      "Alla datapunkter ovan är hårdkodade för demo. Byt till era egna siffror när ni tar appen i skarpt bruk."
    ),
    React.createElement(
      "ul",
      { className: "mt-4 space-y-3 text-sm text-slate-600" },
      sources.map((source) =>
        React.createElement(
          "li",
          { key: source.id, className: "rounded-2xl bg-slate-50 p-4" },
          React.createElement(
            "p",
            { className: "font-semibold text-slate-800" },
            `[${source.id}] `,
            source.title
          ),
          React.createElement("p", { className: "mt-1" }, source.description),
          source.url &&
            React.createElement(
              "a",
              {
                href: source.url,
                target: "_blank",
                rel: "noreferrer",
                className: "mt-2 inline-flex items-center text-xs font-semibold text-brand-600 hover:text-brand-700"
              },
              "Öppna källa"
            )
        )
      )
    )
  );

const App = () => {
  const [assumptions, setAssumptions] = useState(ASSUMPTIONS);
  const dashboardRef = useRef(null);
  const kpiRef = useRef(null);
  const futureRef = useRef(null);

  const results = useMemo(() => {
    const deltaDays = Math.max(0, assumptions.baseline_days - assumptions.new_days);
    const casesPerYear = assumptions.cases_per_week * 52;
    const timeSavingsHours = deltaDays * casesPerYear * assumptions.hours_per_day;
    const costSavings = timeSavingsHours * assumptions.cost_per_hour;
    const complementReduction = Math.max(
      0,
      assumptions.baseline_complements_pct - assumptions.current_complements_pct
    );
    const firstTimeHit = Math.min(100, Math.max(0, 100 - assumptions.current_complements_pct));

    return {
      deltaDays,
      timeSavingsHours,
      costSavings,
      complementReduction,
      firstTimeHit
    };
  }, [assumptions]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleExport = async () => {
    if (!dashboardRef.current) return;
    const canvas = await html2canvas(dashboardRef.current, {
      backgroundColor: "#f8fafc",
      scale: 2
    });
    const link = document.createElement("a");
    link.download = "civaro-byggmodul.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return React.createElement(
    "div",
    {
      ref: dashboardRef,
      id: "dashboard",
      className: "min-h-screen bg-slate-100"
    },
    React.createElement(
      "header",
      { className: "sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur" },
      React.createElement(
        "div",
        { className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "span",
            { className: "text-xs font-semibold uppercase tracking-[0.2em] text-brand-600" },
            "Civaro Byggmodul"
          ),
          React.createElement(
            "h1",
            { className: "mt-2 text-2xl font-bold text-slate-900" },
            "Datadrivet beslutsstöd för bygglov"
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-wrap items-center gap-3" },
          React.createElement(
            "button",
            {
              type: "button",
              onClick: handleExport,
              className:
                "rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
              "aria-label": "Spara dashboarden som PNG"
            },
            "Spara som PNG"
          ),
          React.createElement(
            "button",
            {
              type: "button",
              onClick: () => scrollToRef(futureRef),
              className:
                "rounded-full border border-brand-600 px-5 py-2 text-sm font-semibold text-brand-600 transition hover:bg-brand-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
              "aria-label": "Visa framtidsberättelsen"
            },
            "Sidbrytning"
          )
        )
      )
    ),
    React.createElement(
      "main",
      {
        ref: kpiRef,
        id: "kpi-sektion",
        className: "mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-20 pt-12"
      },
      React.createElement(
        "section",
        { className: "space-y-8" },
        React.createElement(
          "div",
          { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              { className: "text-3xl font-semibold text-slate-900" },
              "Varför Civaro accelererar bygglovsprocessen"
            ),
            React.createElement(
              "p",
              { className: "mt-2 max-w-2xl text-slate-600" },
              "Alla siffror är hårdkodade exempel för demo. Varje kort har sin källa i en tooltip och en fotnot så att ni enkelt kan byta till era egna data."
            )
          ),
          React.createElement(
            "button",
            {
              type: "button",
              onClick: () => scrollToRef(futureRef),
              className:
                "inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
              "aria-label": "Gå till framtidsnarrativet"
            },
            "Läs framtidsnarrativet"
          )
        ),
        React.createElement(
          "div",
          { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3" },
          KPI_CARDS.map((card) =>
            React.createElement(
              "div",
              {
                key: card.title,
                "data-animate": true,
                className: "opacity-0 transform translate-y-6 transition duration-700"
              },
              React.createElement(StatCard, card)
            )
          )
        )
      ),
      React.createElement(
        "section",
        { className: "space-y-6" },
        React.createElement(
          "div",
          { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              { className: "text-3xl font-semibold text-slate-900" },
              "Beräknade Civaro-effekter (modellkort)"
            ),
            React.createElement(
              "p",
              { className: "mt-2 max-w-2xl text-slate-600" },
              "Justera antaganden i panelen. Modellen räknar automatiskt på tids- och kostnadsbesparing samt hur mycket kompletteringar minskar när dokumentkontroll och guidning används före inlämning."
            )
          )
        ),
        React.createElement(SettingsPanel, {
          assumptions,
          onUpdate: setAssumptions
        }),
        React.createElement(
          "div",
          { className: "grid gap-6 lg:grid-cols-3" },
          React.createElement(
            "div",
            { className: "opacity-0 transform translate-y-6 transition duration-700", "data-animate": true },
            React.createElement(
              "div",
              { className: "rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200/60" },
              React.createElement("h3", { className: "text-lg font-semibold text-slate-900" }, "Tidsbesparing"),
              React.createElement(
                "p",
                { className: "mt-2 text-sm text-slate-600" },
                `${results.deltaDays} dagar kortare per ärende.`
              ),
              React.createElement(
                "p",
                { className: "mt-4 text-3xl font-bold text-brand-600" },
                `${Math.round(results.timeSavingsHours).toLocaleString("sv-SE")} h / år`
              ),
              React.createElement("p", { className: "mt-2 text-xs text-slate-500" }, "Källa: [Illustrativ]")
            )
          ),
          React.createElement(
            "div",
            { className: "opacity-0 transform translate-y-6 transition duration-700", "data-animate": true },
            React.createElement(
              "div",
              { className: "rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200/60" },
              React.createElement("h3", { className: "text-lg font-semibold text-slate-900" }, "Kostnadsbesparing"),
              React.createElement(
                "p",
                { className: "mt-2 text-sm text-slate-600" },
                `Baseras på ${assumptions.cost_per_hour.toLocaleString("sv-SE") } SEK per timme.`
              ),
              React.createElement(
                "p",
                { className: "mt-4 text-3xl font-bold text-emerald-500" },
                `${Math.round(results.costSavings).toLocaleString("sv-SE")} SEK / år`
              ),
              React.createElement("p", { className: "mt-2 text-xs text-slate-500" }, "Källa: [Illustrativ]")
            )
          ),
          React.createElement(
            "div",
            { className: "opacity-0 transform translate-y-6 transition duration-700", "data-animate": true },
            React.createElement(
              "div",
              { className: "rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200/60" },
              React.createElement("h3", { className: "text-lg font-semibold text-slate-900" }, "Kompletteringar"),
              React.createElement(
                "p",
                { className: "mt-2 text-sm text-slate-600" },
                `Förstainlämning träffar ${results.firstTimeHit.toFixed(0)} %.`
              ),
              React.createElement(
                "p",
                { className: "mt-4 text-3xl font-bold text-purple-500" },
                `−${results.complementReduction.toFixed(1)} p-enheter`
              ),
              React.createElement("p", { className: "mt-2 text-xs text-slate-500" }, "Källa: [Illustrativ]")
            )
          )
        )
      ),
      React.createElement(
        "section",
        { className: "space-y-6" },
        React.createElement(
          "div",
          { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              { className: "text-3xl font-semibold text-slate-900" },
              "Flöden och belastning"
            ),
            React.createElement(
              "p",
              { className: "mt-2 max-w-2xl text-slate-600" },
              "Syntetiska men rimliga datapunkter visar hur Civaro hjälper till att styra resurser där trycket är som störst."
            )
          )
        ),
        React.createElement(
          "div",
          { className: "grid gap-6 xl:grid-cols-2" },
          React.createElement(
            "div",
            { className: "opacity-0 transform translate-y-6 transition duration-700", "data-animate": true },
            React.createElement(
              "div",
              { className: "rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200/60" },
              React.createElement(
                "div",
                { className: "mb-4 flex items-center justify-between gap-4" },
                React.createElement(
                  "div",
                  null,
                  React.createElement("h3", { className: "text-lg font-semibold text-slate-900" }, "Dygnsrytm inkommande ärenden"),
                  React.createElement(
                    "p",
                    { className: "text-sm text-slate-600" },
                    "Visualiserar när ärenden anländer över ett vardagsdygn."
                  )
                ),
                React.createElement(InfoTooltip, {
                  content: React.createElement(
                    "p",
                    { className: "text-slate-700" },
                    "Illustrativ modell baserad på typisk trafik hos bygglovsavdelningar."
                  ),
                  source: "[Illustrativ]"
                })
              ),
              React.createElement(DailyRhythmChart, null),
              React.createElement("p", { className: "mt-4 text-xs text-slate-500" }, "Källa: [Illustrativ]")
            )
          ),
          React.createElement(
            "div",
            { className: "opacity-0 transform translate-y-6 transition duration-700", "data-animate": true },
            React.createElement(
              "div",
              { className: "rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200/60" },
              React.createElement(
                "div",
                { className: "mb-4 flex items-center justify-between gap-4" },
                React.createElement(
                  "div",
                  null,
                  React.createElement("h3", { className: "text-lg font-semibold text-slate-900" }, "Ärenden per vecka och ledtid"),
                  React.createElement(
                    "p",
                    { className: "text-sm text-slate-600" },
                    "Volymer och genomsnittlig ledtid i samma vy."
                  )
                ),
                React.createElement(InfoTooltip, {
                  content: React.createElement(
                    "p",
                    { className: "text-slate-700" },
                    "Illustrativ modell – byt till era rapportdata."
                  ),
                  source: "[Illustrativ]"
                })
              ),
              React.createElement(WeeklyComboChart, null),
              React.createElement("p", { className: "mt-4 text-xs text-slate-500" }, "Källa: [Illustrativ]")
            )
          )
        ),
        React.createElement(
          "div",
          { className: "opacity-0 transform translate-y-6 transition duration-700", "data-animate": true },
          React.createElement(
            "div",
            { className: "rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200/60" },
            React.createElement(
              "div",
              { className: "mb-4 flex items-center justify-between gap-4" },
              React.createElement(
                "div",
                null,
                React.createElement("h3", { className: "text-lg font-semibold text-slate-900" }, "Vanligaste kompletteringsorsaker"),
                React.createElement(
                  "p",
                  { className: "text-sm text-slate-600" },
                  "Heatmap över när kompletteringsfrågor uppstår under dagen."
                )
              ),
              React.createElement(InfoTooltip, {
                content: React.createElement(
                  "p",
                  { className: "text-slate-700" },
                  "Syntetisk data för demo."
                ),
                source: "[Illustrativ]"
              })
            ),
            React.createElement(HeatmapChart, null),
            React.createElement("p", { className: "mt-4 text-xs text-slate-500" }, "Källa: [Illustrativ]")
          )
        )
      ),
      React.createElement(
        "section",
        {
          ref: futureRef,
          className: "-mx-6 rounded-[48px] bg-slate-900/95 px-6 py-16 text-white"
        },
        React.createElement(
          "div",
          { className: "mx-auto max-w-5xl space-y-12" },
          React.createElement(
            "div",
            { className: "space-y-3" },
            React.createElement(
              "span",
              { className: "text-sm font-semibold uppercase tracking-[0.2em] text-brand-200" },
              "Sidbrytning – framtidsdel"
            ),
            React.createElement(
              "h2",
              { className: "text-4xl font-bold" },
              "Så förändras bygglovsresan med Civaro"
            )
          ),
          React.createElement(
            "div",
            { className: "grid gap-8 lg:grid-cols-2" },
            React.createElement(
              "div",
              { className: "space-y-4" },
              React.createElement(
                "h3",
                { className: "text-2xl font-semibold" },
                "Nu-läget (Sverige, bygg/småhus)"
              ),
              React.createElement(
                "p",
                { className: "text-slate-200" },
                "Byggsektorn i Sverige räknas fortsatt bland de minst digitaliserade. Småhus- och trähusprojektörer brottas med manuella PDF-granskningar, mailtrådar och kompletteringar innan något når myndigheten."
              ),
              React.createElement(
                "ul",
                { className: "list-disc space-y-2 pl-5 text-slate-200" },
                React.createElement("li", null, "Ritningskontroll sker manuellt och tar tid."),
                React.createElement(
                  "li",
                  null,
                  "Tolkning av detaljplaner och planbestämmelser skapar osäkerhet."
                ),
                React.createElement("li", null, "Otydliga krav leder till hög kompletteringsgrad."),
                React.createElement(
                  "li",
                  null,
                  "Lång svarstid när handläggare måste återkomma flera gånger."
                )
              ),
              React.createElement(
                "div",
                { className: "rounded-3xl bg-white/10 p-6 shadow-soft ring-1 ring-white/20" },
                React.createElement(
                  "h4",
                  { className: "text-xl font-semibold text-white" },
                  "Varför Civaro gör skillnad"
                ),
                React.createElement(
                  "ul",
                  { className: "mt-3 list-disc space-y-2 pl-5 text-slate-200" },
                  React.createElement("li", null, "Automatisk dokument- och ritningskontroll."),
                  React.createElement(
                    "li",
                    null,
                    "RAG på beslutspraxis och planbestämmelser för tydlig vägledning."
                  ),
                  React.createElement("li", null, "Guidning före inlämning ger kompletta ärenden."),
                  React.createElement("li", null, "Färdiga beslutsunderlag accelererar myndighetens arbete.")
                )
              )
            ),
            React.createElement(
              "div",
              { className: "space-y-6" },
              React.createElement(
                "div",
                { className: "rounded-3xl bg-white/10 p-6 shadow-soft ring-1 ring-white/15" },
                React.createElement(
                  "p",
                  { className: "text-xs font-semibold uppercase tracking-[0.2em] text-brand-200" },
                  "Publika uttalanden (parafraser)"
                ),
                React.createElement(
                  "div",
                  { className: "mt-4 space-y-4" },
                  React.createElement(
                    "figure",
                    { className: "rounded-2xl bg-white/5 p-4" },
                    React.createElement(
                      "blockquote",
                      { className: "text-lg font-medium text-white" },
                      "\u201cAGI förändrar yrkesroller — uppgiften är att omsätta tekniken i verklig nytta.\u201d"
                    ),
                    React.createElement(
                      "figcaption",
                      { className: "mt-2 text-sm text-slate-200" },
                      "Sam Altman (parafras)"
                    )
                  ),
                  React.createElement(
                    "figure",
                    { className: "rounded-2xl bg-white/5 p-4" },
                    React.createElement(
                      "blockquote",
                      { className: "text-lg font-medium text-white" },
                      "\u201cAutomatisering slår snabbast igenom i standardiserade processer; husproduktion ligger nära till hands.\u201d"
                    ),
                    React.createElement(
                      "figcaption",
                      { className: "mt-2 text-sm text-slate-200" },
                      "Elon Musk (parafras)"
                    )
                  )
                ),
                React.createElement(
                  "p",
                  { className: "mt-4 text-sm text-slate-200" },
                  "Trähus/småhus har hög upprepning och ritningslogik — bra för AI-stöd."
                )
              ),
              React.createElement(
                "div",
                { className: "rounded-3xl bg-white/10 p-6 shadow-soft ring-1 ring-white/15" },
                React.createElement(
                  "h3",
                  { className: "text-xl font-semibold text-white" },
                  "Prognos 5 år"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-slate-200" },
                  "Illustrativ prognos – byt till era källor när ni har kommundata."
                ),
                React.createElement(PrognosisChart, null)
              )
            )
          ),
          React.createElement(
            "div",
            { className: "rounded-3xl bg-white/10 p-10 text-center shadow-soft ring-1 ring-white/15" },
            React.createElement(
              "p",
              { className: "text-3xl font-bold text-white" },
              "\u201cMänniskor ersätts inte av AI – utan av människor som använder AI.\u201d"
            ),
            React.createElement(
              "p",
              { className: "mt-4 text-base text-slate-200" },
              "För byggförvaltningar och trähusprojektörer handlar det om att ge teamen smarta verktyg som stärker bedömningsförmågan, frigör tid till dialog med sökande och skapar transparens genom hela resan."
            )
          ),
          React.createElement(
            "div",
            { className: "flex flex-wrap items-center justify-center gap-4" },
            React.createElement(
              "button",
              {
                type: "button",
                onClick: () => alert("Kontakta Civaro-teamet för en demo!"),
                className:
                  "rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-2 focus:ring-offset-slate-900",
                "aria-label": "Boka en demo med Civaro"
              },
              "Boka demo"
            ),
            React.createElement(
              "button",
              {
                type: "button",
                onClick: () => scrollToRef(kpiRef),
                className:
                  "rounded-full border border-white/60 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white",
                "aria-label": "Till toppen"
              },
              "Till toppen"
            ),
            React.createElement(
              "button",
              {
                type: "button",
                onClick: () => scrollToRef(kpiRef),
                className:
                  "rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-soft transition hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-white",
                "aria-label": "Se hur Civaro gör detta idag"
              },
              "Se hur Civaro gör detta idag"
            )
          )
        )
      ),
      React.createElement(SourcesList, { sources: SOURCE_LIBRARY })
    ),
    React.createElement(
      "footer",
      { className: "border-t border-slate-200/70 bg-white/90 py-6 text-center text-sm text-slate-500" },
      `© ${new Date().getFullYear()} Civaro. All rights reserved.`
    )
  );
};

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));
