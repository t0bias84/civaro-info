import React from "react";
import { createRoot } from "react-dom/client";

// echarts finns globalt: window.echarts
console.log("app.js loaded");
const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element not found");
}
rootEl.innerHTML = "";
const root = createRoot(rootEl);

const DATA = {
  // 1) KPI – “låst” demo
  KPI: {
    handlaggning_dagar: 21,
    kompletteringar_pct: 27,
    automationsgrad_pct: 62,
    nki: 4.3,
    footnote:
      "Kombinerad modell baserad på kommunlogik + branschdata (illustrativ demo)."
  },

  // 2) Svenskarna & AI (Svenskarna och internet 2025 – sammanfattande punkter)
  SWEDEN: {
    usage_pct: 40, // 4 av 10 använder AI-verktyg
    chatgpt_pct: 33, // ~var tredje svensk använder ChatGPT
    copilot_pct: 10, // ~var tionde använder Copilot
    ai_instead_of_google: 21, // >1 av 5 går till AI istället för Google
    ai_users_google_replace: 50, // bland AI-användare >50 %
    youth_8_19_pct: 57, // 8–19 år som använder AI
    work_use_any_pct: 26, // >1 av 4 i arbete
    white_collar_pct: 40, // >4 av 10 tjänstemän
    worry_unemployment_pct: 33, // var tredje tror på stor arbetslöshet
    gender_gap_pct: 7, // män–kvinnor gap i användning
    footnote: "Källa: Svenskarna och internet 2025 (sammanfattning)."
  },

  // 3) LLM-kapacitet (MMLU %) – toppmodeller per år (kurva)
  LLM_CAPABILITY_TIMELINE: [
    { year: 2020, model: "GPT-3 (175B)", mmlu: 43.9 },
    { year: 2023, model: "GPT-4", mmlu: 86.0 },
    {
      year: 2024,
      model: "Top 2024 (Claude 3.5/GPT-4o/Llama 3.1 405B)",
      mmlu: 88.0
    }
  ],
  HUMAN_REFERENCE: [
    { label: "5-åring (illustration)", mmlu: 40 },
    { label: "15-åring (illustration)", mmlu: 70 },
    { label: "20-åring (illustration)", mmlu: 80 },
    { label: "Expertmänniska ≈", mmlu: 89.8 }
  ],
  LLM_footnote:
    "MMLU ≈ kunskaps-/resonemangstest (Hendrycks m.fl.). Åldersband = pedagogisk analogi, ej IQ.",

  // 4) Token-kostnad (USD/M tokens) – loggraf (in/out)
  TOKEN_COST_TREND: [
    { date: "2023-01", label: "GPT-4 start", inUSDperM: 30, outUSDperM: 60 },
    { date: "2024-02", label: "3.5 turbo cut", inUSDperM: 15, outUSDperM: 45 },
    { date: "2024-05", label: "4o-mini nivå", inUSDperM: 0.15, outUSDperM: 0.6 },
    { date: "2025-03", label: "trend (mix)", inUSDperM: 0.1, outUSDperM: 0.4 },
    { date: "2025-08", label: "flash-lite nivå", inUSDperM: 0.075, outUSDperM: 0.3 }
  ],
  TOKEN_footnote:
    "Översiktlig trend baserad på publika prisändringar och marknadsjämförelser (illustrativ).",

  // 5) Heatmap – vanligaste kompletteringar per timme
  HEATMAP_COMPLEMENTS: {
    hours: ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17"],
    reasons: [
      "Situationsplan",
      "Fasadritning",
      "K-intyg",
      "Kontrollplan",
      "Brandskydd"
    ],
    values: {
      Situationsplan: {
        "08": 12,
        "09": 20,
        "10": 26,
        "11": 18,
        "12": 15,
        "13": 19,
        "14": 23,
        "15": 21,
        "16": 14,
        "17": 9
      },
      Fasadritning: {
        "08": 8,
        "09": 16,
        "10": 22,
        "11": 24,
        "12": 20,
        "13": 18,
        "14": 16,
        "15": 17,
        "16": 12,
        "17": 7
      },
      "K-intyg": {
        "08": 5,
        "09": 9,
        "10": 14,
        "11": 16,
        "12": 15,
        "13": 12,
        "14": 11,
        "15": 10,
        "16": 8,
        "17": 5
      },
      Kontrollplan: {
        "08": 7,
        "09": 10,
        "10": 12,
        "11": 15,
        "12": 16,
        "13": 17,
        "14": 18,
        "15": 18,
        "16": 13,
        "17": 8
      },
      Brandskydd: {
        "08": 3,
        "09": 6,
        "10": 9,
        "11": 12,
        "12": 13,
        "13": 13,
        "14": 12,
        "15": 11,
        "16": 9,
        "17": 6
      }
    },
    footnote:
      "Intern kategorisering – illustrativ för var guidning/dok-kontroll gör mest nytta under dagen."
  },

  // 6) Prognos 5 år – tre kurvor
  PROGNOSIS: [
    { year: 2025, ai_permit_pct: 5, auto_draw_pct: 3, leadtime_reduction_pct: 10 },
    { year: 2027, ai_permit_pct: 30, auto_draw_pct: 25, leadtime_reduction_pct: 40 },
    { year: 2030, ai_permit_pct: 60, auto_draw_pct: 55, leadtime_reduction_pct: 65 }
  ],
  PROGNOSIS_footnote: "Illustrativ prognos – byt mot kommunkällor när tillgängligt.",

  // 7) Citat (parafraser – ingen falsk attribuering)
  QUOTES: [
    {
      author: "Sam Altman (parafras)",
      text: "AGI förändrar yrkesroller; utmaningen är att omsätta tekniken till verklig nytta.",
      note: "Publika uttalanden om snabb utveckling"
    },
    {
      author: "Elon Musk (parafras)",
      text: "Automatisering slår igenom snabbast i standardiserade processer; husproduktion ligger nära till hands.",
      note: "Publika uttalanden om AI/automation"
    }
  ],

  // 8) Källsammanställning (renderas i källsektionen)
  SOURCES: [
    "Svenskarna och internet 2025 – AI-kapitlet (svenskarnaochinternet.se)",
    "Hendrycks et al., MMLU – mänsklig expert ≈ 89.8 %",
    "Publika modellpriser/press (OpenAI, Google m.fl.) – tokenkostnader 2023–2025",
    "McKinsey/Eurostat – branschdigitalisering/produktivitetsgap (för bakgrund i muntlig pitch)"
  ]
};

const SECTION_LIST = [
  { id: "hero", label: "Översikt" },
  { id: "sweden", label: "Svenskar & AI" },
  { id: "llm", label: "LLM-kapacitet" },
  { id: "tokens", label: "Tokenkostnader" },
  { id: "heatmap", label: "Kompletteringar" },
  { id: "prognosis", label: "5-årsprognos" },
  { id: "quotes", label: "Citat" },
  { id: "sources", label: "Källor" }
];

const InfoFootnote = ({ text }) => (
  <div className="mt-6 text-sm text-slate-400 flex items-start gap-2">
    <span aria-hidden="true" className="text-accent font-semibold">
      ⓘ
    </span>
    <span>{text}</span>
  </div>
);

const Section = React.forwardRef(
  (
    { id, title, eyebrow, description, children, className = "", scrollRoot },
    forwardedRef
  ) => {
    const localRef = React.useRef(null);
    const [visible, setVisible] = React.useState(false);

    React.useImperativeHandle(forwardedRef, () => localRef.current);

    React.useEffect(() => {
      const node = localRef.current;
      if (!node) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
            }
          });
        },
        {
          threshold: 0.3,
          root: scrollRoot?.current ?? null
        }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }, [scrollRoot]);

    return (
      <section
        id={id}
        ref={localRef}
        className={`snap-start min-h-screen flex items-center ${className}`}
      >
        <div
          className={`w-full mx-auto max-w-6xl px-6 md:px-12 py-20 transition-all duration-700 ease-out [transform-style:preserve-3d] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.35em] text-accent mb-6">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-['Space Grotesk'] text-3xl md:text-5xl font-semibold text-slate-100 mb-6">
              {title}
            </h2>
          )}
          {description && (
            <p className="max-w-2xl text-lg text-slate-300/90 mb-10">{description}</p>
          )}
          {children}
        </div>
      </section>
    );
  }
);
Section.displayName = "Section";

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`relative bg-panel/90 border border-outline/40 backdrop-blur-xl shadow-glass shadow-inner rounded-2xl p-6 md:p-8 transition transform hover:-translate-y-1 hover:shadow-[0_35px_80px_-40px_rgba(30,64,175,0.45)] ${
      className
    }`}
  >
    {children}
  </div>
);

const KPIGrid = () => {
  const { KPI } = DATA;
  const cards = [
    {
      label: "Handläggningstid",
      value: `${KPI.handlaggning_dagar} dagar`,
      detail: "Snabbare svar med dokumentlogik, triagering och automatiserade beslutsunderlag."
    },
    {
      label: "Kompletteringar",
      value: `${KPI.kompletteringar_pct}%",
      detail: "Guidning före inlämning minskar kompletteringar och säkrar rätt första version."
    },
    {
      label: "Automationsgrad",
      value: `${KPI.automationsgrad_pct}%",
      detail: "Reglerade kontroller och ritningsanalys hanteras maskinellt – handläggare fokuserar på beslut."
    },
    {
      label: "NKI (betyg)",
      value: KPI.nki.toFixed(1),
      detail: "Tydliga krav och snabbare svar ökar nöjdheten hos sökande och entreprenörer."
    }
  ];

  return (
    <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4" id="dashboard">
      {cards.map((card) => (
        <GlassCard key={card.label} className="flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400 mb-4">
              {card.label}
            </p>
            <p className="font-['Space_Grotesk'] text-4xl md:text-5xl font-semibold text-slate-100">
              {card.value}
            </p>
            <p className="mt-6 text-base text-slate-300 leading-relaxed">
              {card.detail}
            </p>
          </div>
          <InfoFootnote text={DATA.KPI.footnote} />
        </GlassCard>
      ))}
    </div>
  );
};

const EChart = ({ option, height = 360, className = "", footnote }) => {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    if (!chartRef.current || typeof echarts === "undefined") return;
    const chart = echarts.init(chartRef.current);
    chart.setOption(option);

    const resize = () => chart.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [option]);

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={chartRef}
        style={{ width: "100%", height }}
        className="rounded-2xl overflow-hidden"
      />
      {footnote && <InfoFootnote text={footnote} />}
    </div>
  );
};

const QuoteCard = ({ quote }) => (
  <GlassCard className="space-y-6">
    <p className="text-xl text-slate-100 leading-relaxed">“{quote.text}”</p>
    <div>
      <p className="text-sm font-semibold text-slate-200">{quote.author}</p>
      <p className="text-sm text-slate-400">{quote.note} · Parafras</p>
    </div>
  </GlassCard>
);

const SourcesList = () => (
  <div className="grid gap-4">
    {DATA.SOURCES.map((source) => (
      <GlassCard key={source} className="text-base text-slate-200/80">
        {source}
      </GlassCard>
    ))}
  </div>
);

function App() {
  const sectionRefs = React.useRef({});
  const mainRef = React.useRef(null);
  const [activeSection, setActiveSection] = React.useState(SECTION_LIST[0].id);

  SECTION_LIST.forEach((section) => {
    if (!sectionRefs.current[section.id]) {
      sectionRefs.current[section.id] = React.createRef();
    }
  });

  React.useEffect(() => {
    if (!mainRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: mainRef.current,
        threshold: 0.6
      }
    );

    SECTION_LIST.forEach((section) => {
      const node = sectionRefs.current[section.id]?.current;
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const handleExport = React.useCallback(() => {
    const target = document.querySelector("#dashboard");
    if (!target || typeof html2canvas === "undefined") return;
    html2canvas(target, { backgroundColor: "#0b1220" }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "civaro-dashboard.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }, []);

  const swedenMetrics = React.useMemo(
    () => [
      { label: "Använder AI-verktyg", value: DATA.SWEDEN.usage_pct },
      { label: "ChatGPT", value: DATA.SWEDEN.chatgpt_pct },
      { label: "Copilot", value: DATA.SWEDEN.copilot_pct },
      { label: "AI före Google", value: DATA.SWEDEN.ai_instead_of_google },
      {
        label: "AI-användare som ersätter Google",
        value: DATA.SWEDEN.ai_users_google_replace
      },
      { label: "Ungdomar 8–19 år", value: DATA.SWEDEN.youth_8_19_pct },
      { label: "I arbete", value: DATA.SWEDEN.work_use_any_pct },
      { label: "Tjänstemän", value: DATA.SWEDEN.white_collar_pct },
      { label: "Oro för arbetslöshet", value: DATA.SWEDEN.worry_unemployment_pct },
      { label: "Könsgap", value: DATA.SWEDEN.gender_gap_pct }
    ],
    []
  );

  const swedenOption = React.useMemo(() => {
    const gradient =
      typeof echarts !== "undefined"
        ? new echarts.graphic.LinearGradient(1, 0, 0, 1, [
            { offset: 0, color: "rgba(99,102,241,0.95)" },
            { offset: 1, color: "rgba(16,185,129,0.75)" }
          ])
        : undefined;

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (params) => {
          const point = params[0];
          return `${point.name}: ${point.value}%`;
        }
      },
      grid: { left: 140, right: 20, top: 20, bottom: 40 },
      xAxis: {
        type: "value",
        axisLabel: {
          color: "#94a3b8",
          formatter: (value) => `${value}%`
        },
        splitLine: {
          show: true,
          lineStyle: { color: "rgba(148,163,184,0.15)" }
        }
      },
      yAxis: {
        type: "category",
        inverse: true,
        data: swedenMetrics.map((item) => item.label),
        axisLabel: { color: "#e5e7eb", lineHeight: 16 },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          type: "bar",
          barWidth: 14,
          itemStyle: {
            borderRadius: 8,
            color: gradient || "#6366f1"
          },
          showBackground: true,
          backgroundStyle: { color: "rgba(148,163,184,0.1)" },
          data: swedenMetrics.map((item) => item.value)
        }
      ]
    };
  }, [swedenMetrics]);

  const llmYears = DATA.LLM_CAPABILITY_TIMELINE.map((point) => point.year);
  const llmScores = DATA.LLM_CAPABILITY_TIMELINE.map((point) => point.mmlu);
  const llmLabels = DATA.LLM_CAPABILITY_TIMELINE.map((point) => point.model);

  const llmMarkAreas = React.useMemo(() => {
    let previous = 0;
    return DATA.HUMAN_REFERENCE.map((ref, index) => {
      const color = index % 2 === 0 ? "rgba(99,102,241,0.08)" : "rgba(16,185,129,0.08)";
      const area = [
        {
          yAxis: previous,
          itemStyle: { color },
          label: {
            show: true,
            color: "#cbd5f5",
            fontSize: 12,
            formatter: `${ref.label}`,
            position: "insideTop"
          }
        },
        {
          yAxis: ref.mmlu
        }
      ];
      previous = ref.mmlu;
      return area;
    });
  }, []);

  const llmOption = React.useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          const item = params[0];
          const label = llmLabels[item.dataIndex];
          return `${item.axisValue}: ${item.data}%<br/>${label}`;
        }
      },
      grid: { left: 60, right: 20, top: 40, bottom: 40 },
      xAxis: {
        type: "category",
        data: llmYears,
        boundaryGap: false,
        axisLine: { lineStyle: { color: "#1f2a44" } },
        axisLabel: { color: "#e5e7eb" }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        axisLabel: { color: "#94a3b8", formatter: (value) => `${value}%` },
        splitLine: {
          show: true,
          lineStyle: { color: "rgba(148,163,184,0.12)" }
        }
      },
      series: [
        {
          name: "LLM-kapacitet (MMLU)",
          type: "line",
          data: llmScores,
          smooth: true,
          symbol: "circle",
          symbolSize: 10,
          lineStyle: { width: 3, color: "#6366f1" },
          itemStyle: { color: "#a5b4fc", borderWidth: 2, borderColor: "#0b1220" },
          areaStyle: {
            color: "rgba(99,102,241,0.25)"
          },
          markArea: {
            silent: true,
            data: llmMarkAreas
          }
        }
      ]
    }),
    [llmLabels, llmMarkAreas, llmScores, llmYears]
  );

  const tokenDates = DATA.TOKEN_COST_TREND.map((entry) => entry.date);

  const tokenOption = React.useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        formatter: (params) =>
          params
            .map((item) => {
              const value = Number(item.value);
              const formatted = value >= 1 ? value.toFixed(0) : value.toFixed(3);
              return `${item.marker} ${item.seriesName}: $${formatted}`;
            })
            .join("<br/>")
      },
      legend: {
        data: ["Inmatning", "Utsvar"],
        textStyle: { color: "#e2e8f0" },
        top: 0
      },
      grid: { left: 70, right: 20, top: 40, bottom: 40 },
      xAxis: {
        type: "category",
        data: tokenDates,
        axisLabel: { color: "#94a3b8" },
        axisLine: { lineStyle: { color: "#1f2a44" } }
      },
      yAxis: {
        type: "log",
        logBase: 10,
        axisLabel: {
          color: "#94a3b8",
          formatter: (value) => `$${value}`
        },
        splitLine: {
          show: true,
          lineStyle: { color: "rgba(148,163,184,0.12)" }
        }
      },
      series: [
        {
          name: "Inmatning",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 10,
          data: DATA.TOKEN_COST_TREND.map((entry) => entry.inUSDperM),
          lineStyle: { width: 3, color: "#10b981" },
          itemStyle: { color: "#34d399", borderColor: "#0b1220", borderWidth: 2 }
        },
        {
          name: "Utsvar",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 10,
          data: DATA.TOKEN_COST_TREND.map((entry) => entry.outUSDperM),
          lineStyle: { width: 3, color: "#6366f1" },
          itemStyle: { color: "#818cf8", borderColor: "#0b1220", borderWidth: 2 }
        }
      ]
    }),
    [tokenDates]
  );

  const heatmapHours = DATA.HEATMAP_COMPLEMENTS.hours;
  const heatmapReasons = DATA.HEATMAP_COMPLEMENTS.reasons;

  const heatmapData = React.useMemo(() => {
    const entries = [];
    heatmapReasons.forEach((reason, yIndex) => {
      heatmapHours.forEach((hour, xIndex) => {
        const value = DATA.HEATMAP_COMPLEMENTS.values[reason][hour] ?? 0;
        entries.push([xIndex, yIndex, value]);
      });
    });
    return entries;
  }, [heatmapHours, heatmapReasons]);

  const maxHeatValue = React.useMemo(
    () => Math.max(...heatmapData.map(([, , value]) => value)),
    [heatmapData]
  );

  const heatmapOption = React.useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        position: "top",
        formatter: (params) => {
          const [x, y, value] = params.value;
          return `${heatmapReasons[y]} kl. ${heatmapHours[x]}: ${value} kompletteringar`;
        }
      },
      grid: { left: 160, right: 40, top: 20, bottom: 80 },
      xAxis: {
        type: "category",
        data: heatmapHours,
        splitArea: { show: false },
        axisLabel: { color: "#94a3b8" },
        axisLine: { lineStyle: { color: "#1f2a44" } }
      },
      yAxis: {
        type: "category",
        data: heatmapReasons,
        splitArea: { show: false },
        axisLabel: { color: "#e2e8f0" },
        axisLine: { lineStyle: { color: "#1f2a44" } }
      },
      visualMap: {
        min: 0,
        max: maxHeatValue,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: 20,
        textStyle: { color: "#cbd5f5" },
        inRange: {
          color: ["#0d0887", "#7e03a8", "#cc4778", "#f89540", "#f0f921"]
        }
      },
      series: [
        {
          name: "Kompletteringar",
          type: "heatmap",
          data: heatmapData,
          label: { show: false },
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(255,255,255,0.35)"
            }
          }
        }
      ]
    }),
    [heatmapData, heatmapHours, heatmapReasons, maxHeatValue]
  );

  const prognosisYears = DATA.PROGNOSIS.map((entry) => entry.year);

  const prognosisOption = React.useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        formatter: (params) =>
          params
            .map((item) => `${item.marker} ${item.seriesName}: ${item.value}%`)
            .join("<br/>")
      },
      legend: {
        data: [
          "AI-stött bygglov",
          "Automatiserad ritningsgranskning",
          "Minskad ledtid"
        ],
        top: 0,
        textStyle: { color: "#cbd5f5" }
      },
      grid: { left: 70, right: 20, top: 40, bottom: 40 },
      xAxis: {
        type: "category",
        data: prognosisYears,
        axisLabel: { color: "#94a3b8" },
        axisLine: { lineStyle: { color: "#1f2a44" } }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        axisLabel: { color: "#94a3b8", formatter: (value) => `${value}%` },
        splitLine: {
          show: true,
          lineStyle: { color: "rgba(148,163,184,0.12)" }
        }
      },
      series: [
        {
          name: "AI-stött bygglov",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 10,
          data: DATA.PROGNOSIS.map((entry) => entry.ai_permit_pct),
          lineStyle: { width: 3, color: "#6366f1" },
          itemStyle: { color: "#818cf8", borderColor: "#0b1220", borderWidth: 2 },
          areaStyle: { opacity: 0.12, color: "#6366f1" }
        },
        {
          name: "Automatiserad ritningsgranskning",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 10,
          data: DATA.PROGNOSIS.map((entry) => entry.auto_draw_pct),
          lineStyle: { width: 3, color: "#10b981" },
          itemStyle: { color: "#34d399", borderColor: "#0b1220", borderWidth: 2 },
          areaStyle: { opacity: 0.12, color: "#10b981" }
        },
        {
          name: "Minskad ledtid",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 10,
          data: DATA.PROGNOSIS.map((entry) => entry.leadtime_reduction_pct),
          lineStyle: { width: 3, color: "#fbbf24" },
          itemStyle: { color: "#facc15", borderColor: "#0b1220", borderWidth: 2 },
          areaStyle: { opacity: 0.08, color: "#fbbf24" }
        }
      ]
    }),
    [prognosisYears]
  );

  const heroIntro = (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
      <div className="space-y-8">
        <h1 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-semibold text-slate-100 leading-tight">
          Civaro Byggmodul – låst demo i mörkt läge
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
          Helautomatiserad dokumentkontroll, guidning och beslutsunderlag för kommunal bygglovshandläggning.
          Den här förhandsvisningen visar hur en fast konfiguration kan upplevas i möte eller pitch.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:hello@civaro.se?subject=Boka%20demo"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-slate-100 font-semibold shadow-lg shadow-indigo-900/40 hover:bg-indigo-400 transition"
            aria-label="Boka demo med Civaro"
          >
            Boka demo
          </a>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-outline/60 text-slate-200 hover:border-accent/80 hover:text-accent transition"
            aria-label="Exportera dashboarden som PNG"
          >
            <span>Exportera som PNG</span>
          </button>
        </div>
      </div>
      <GlassCard className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Framtidssäker pitch
        </p>
        <p className="text-xl text-slate-100 leading-relaxed">
          Lås upp visuella berättelser utan att exponera känsliga datapipelines. Scroll-snap och glasade kort skapar ett
          ledningsvänligt format för styrgrupper och kommunledningar.
        </p>
        <p className="text-sm text-slate-400">
          Ingen interaktion krävs – allt innehåll är fast, kuraterat och redo för storskärm.
        </p>
      </GlassCard>
    </div>
  );

  return (
    <div className="h-full flex bg-base text-slate-200 overflow-hidden">
      <aside className="hidden lg:flex w-64 flex-col gap-6 px-8 py-16 border-r border-outline/60 bg-base/70 backdrop-blur-xl sticky top-0 h-screen">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Navigering</p>
        </div>
        <nav className="flex flex-col gap-3" aria-label="Sektioner">
          {SECTION_LIST.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                const node = sectionRefs.current[section.id]?.current;
                node?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-left text-sm font-medium px-3 py-2 rounded-xl transition border border-transparent ${
                activeSection === section.id
                  ? "bg-accent/20 text-slate-100 border-accent/40"
                  : "text-slate-400 hover:text-slate-200 hover:border-outline/40"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </aside>
      <main
        ref={mainRef}
        className="flex-1 h-full overflow-y-scroll snap-y snap-mandatory"
      >
        <Section
          id="hero"
          ref={sectionRefs.current.hero}
          scrollRoot={mainRef}
          className="bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_55%)]"
        >
          {heroIntro}
          <div className="mt-16">
            <KPIGrid />
          </div>
        </Section>

        <Section
          id="sweden"
          ref={sectionRefs.current.sweden}
          scrollRoot={mainRef}
          eyebrow="INSIKT"
          title="Svenskarna & AI 2025"
          description="Adoptionen accelererar – redan i dag väljer fyra av tio svenskar att använda generativa verktyg, och unga målgrupper leder utvecklingen."
        >
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <GlassCard>
              <EChart option={swedenOption} height={420} footnote={DATA.SWEDEN.footnote} />
            </GlassCard>
            <div className="space-y-6">
              <GlassCard>
                <h3 className="text-xl font-semibold text-slate-100 mb-4">Vad betyder siffrorna?</h3>
                <ul className="space-y-3 text-slate-300 text-base">
                  <li>
                    <span className="text-slate-100 font-medium">Bred adoption:</span> AI-verktyg blir vardag på arbetsplatser och i skolan – Civaro möter förväntan om digitalt stöd.
                  </li>
                  <li>
                    <span className="text-slate-100 font-medium">Sökbeteende skiftar:</span> En av fem går direkt till AI istället för Google – kommuner behöver svara med smartare portaler.
                  </li>
                  <li>
                    <span className="text-slate-100 font-medium">Kompetensgap:</span> Oro för arbetslöshet och könsskillnader pekar på behovet av guidning, utbildning och trygg hantering.
                  </li>
                </ul>
                <InfoFootnote text={DATA.SWEDEN.footnote} />
              </GlassCard>
              <GlassCard className="bg-panel/60">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-4">
                  Fokus i mötet
                </p>
                <p className="text-lg text-slate-200">
                  Visa hur Civaro samlar kunskap och praxis i ett nav – från guidning på webben till automatiserade kompletteringsfria handlingar.
                </p>
              </GlassCard>
            </div>
          </div>
        </Section>

        <Section
          id="llm"
          ref={sectionRefs.current.llm}
          scrollRoot={mainRef}
          eyebrow="MODELLKAPACITET"
          title="LLM-kapacitet 2020–2025"
          description="På fem år har toppmodeller gått från gymnasienivå till expertliknande resultat på MMLU. Bandet illustrerar hur vi översätter detta till mänskliga referenser."
        >
          <GlassCard>
            <EChart option={llmOption} height={420} footnote={DATA.LLM_footnote} />
          </GlassCard>
        </Section>

        <Section
          id="tokens"
          ref={sectionRefs.current.tokens}
          scrollRoot={mainRef}
          eyebrow="EKONOMI"
          title="Tokenkostnad i femårsperspektiv"
          description="Prisfallet öppnar för storskalig automation även i kommuner. Med logaritmisk skala ser vi hur in- och utdata sjunker exponentiellt."
        >
          <GlassCard>
            <EChart option={tokenOption} height={420} footnote={DATA.TOKEN_footnote} />
          </GlassCard>
        </Section>

        <Section
          id="heatmap"
          ref={sectionRefs.current.heatmap}
          scrollRoot={mainRef}
          eyebrow="VERKSAMHET"
          title="Kompletteringsmönster per timme"
          description="Identifiera när dokumentstödet bör vara som starkast. ECharts-heatmap visar när Civaro avlastar mest."
        >
          <GlassCard>
            <EChart option={heatmapOption} height={480} footnote={DATA.HEATMAP_COMPLEMENTS.footnote} />
          </GlassCard>
        </Section>

        <Section
          id="prognosis"
          ref={sectionRefs.current.prognosis}
          scrollRoot={mainRef}
          eyebrow="FRAMTID"
          title="Illustrativ femårsresa"
          description="Vi modellerar hur AI-stödd handläggning växer från pilot till norm. Kurvorna visar både nyttjandegrad och effekt på ledtid."
        >
          <GlassCard>
            <EChart option={prognosisOption} height={420} footnote={DATA.PROGNOSIS_footnote} />
          </GlassCard>
          <div className="mt-10">
            <GlassCard>
              <p className="text-3xl md:text-4xl font-['Space_Grotesk'] text-slate-100 mb-4">
                “Människor ersätts inte av AI – utan av människor som använder AI.”
              </p>
              <p className="text-lg text-slate-300">
                Budskapet mot byggförvaltningar och trähusprojektörer: kompetens lyfts, arbetet blir mer rådgivande och kunden möter tydlighet redan innan inlämning.
              </p>
            </GlassCard>
          </div>
        </Section>

        <Section
          id="quotes"
          ref={sectionRefs.current.quotes}
          scrollRoot={mainRef}
          eyebrow="RÖSTER"
          title="Parafraserade citat"
          description="Ledande röster pekar på varför automation och AI-stöd inte är en fråga om om – utan när."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {DATA.QUOTES.map((quote) => (
              <QuoteCard key={quote.author} quote={quote} />
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-400 max-w-2xl">
            I småhus och trähus, där ritningslogik och upprepning är stor, accelererar AI-stödet tidigt – Civaro gör att
            handläggningen kan följa med i tempot.
          </p>
          <InfoFootnote text="Parafraserade citat – använd originalkällor vid extern publicering." />
        </Section>

        <Section
          id="sources"
          ref={sectionRefs.current.sources}
          scrollRoot={mainRef}
          eyebrow="KÄLLOR"
          title="Underlag och referenser"
        >
          <SourcesList />
        </Section>
      </main>
    </div>
  );
}

root.render(<App />);
