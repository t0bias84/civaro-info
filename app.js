import React from "react";
import { createRoot } from "react-dom/client";

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

const root = createRoot(document.getElementById("root"));
root.render(<App />);
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
