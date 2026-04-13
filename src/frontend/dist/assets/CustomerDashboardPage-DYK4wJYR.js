import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, F as FileText } from "./index-DmlGt2ze.js";
import { S as Skeleton } from "./skeleton-Ba6rVojZ.js";
import { L as LOAN_STAGES, R as REJECTED_STAGE_LABEL } from "./stages-CnHug0GM.js";
import { q as useGetMyLoans } from "./useQueries-Cl2674ke.js";
import { T as TrendingUp } from "./trending-up-D0hNfnKO.js";
import { T as TriangleAlert } from "./triangle-alert-CpyxfpGx.js";
import { C as CircleCheck } from "./circle-check-B8z6gruQ.js";
import { R as ResponsiveContainer, P as PieChart, p as Pie, o as Cell, T as Tooltip, q as Legend, B as BarChart, m as CartesianGrid, X as XAxis, Y as YAxis, n as Bar } from "./PieChart-R2qh-y3w.js";
import "./utils-DdB4LPY_.js";
import "./api-BzzkbRdq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const ORANGE = "#F47B30";
const BLUE = "#1E5FA8";
const GREEN = "#22c55e";
const RED = "#dc2626";
const CHART_COLORS = [
  ORANGE,
  BLUE,
  GREEN,
  "#f59e0b",
  "#8b5cf6",
  RED,
  "#06b6d4",
  "#84cc16",
  "#ec4899",
  "#14b8a6"
];
function fmt(amount) {
  if (amount >= 1e6) return `₹${(amount / 1e6).toFixed(1)}L`;
  if (amount >= 1e3) return `₹${(amount / 1e3).toFixed(0)}K`;
  return `₹${amount}`;
}
function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-3",
      "data-ocid": `customer-stat-${label.toLowerCase().replace(/\s+/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              style: { backgroundColor: `${accent}18` },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, style: { color: accent } })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground leading-none", children: value }),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
        ] })
      ]
    }
  );
}
function DashboardSkeletons() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border rounded-xl p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16" })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" })
      ] })
    ] })
  ] });
}
function CustomerDashboardPage() {
  const { data: loanItems, isLoading } = useGetMyLoans();
  const loans = reactExports.useMemo(
    () => (loanItems ?? []).map((li) => li.loan),
    [loanItems]
  );
  const stats = reactExports.useMemo(() => {
    const total = loans.length;
    const totalValue = loans.reduce((s, l) => s + l.loanAmount, 0);
    const active = loans.filter(
      (l) => l.isActive && !l.isRejected && l.currentStage < LOAN_STAGES.length - 1
    ).length;
    const completed = loans.filter(
      (l) => !l.isRejected && l.currentStage >= LOAN_STAGES.length - 1
    ).length;
    const rejected = loans.filter((l) => l.isRejected).length;
    const stageMap = {};
    for (const l of loans) {
      if (!l.isRejected) {
        const name = LOAN_STAGES[l.currentStage] ?? "Unknown";
        stageMap[name] = (stageMap[name] ?? 0) + 1;
      }
    }
    const stageData = Object.entries(stageMap).map(([name, count]) => ({
      name,
      count
    }));
    const valueMap = {};
    for (const l of loans) {
      if (!l.isRejected) {
        const name = LOAN_STAGES[l.currentStage] ?? "Unknown";
        valueMap[name] = (valueMap[name] ?? 0) + l.loanAmount;
      }
    }
    const valueData = Object.entries(valueMap).map(([name, value]) => ({
      name: name.length > 10 ? `${name.slice(0, 10)}…` : name,
      fullName: name,
      value
    }));
    const recent = [...loans].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 5);
    return {
      total,
      totalValue,
      active,
      completed,
      rejected,
      stageData,
      valueData,
      recent
    };
  }, [loans]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-lg flex items-center justify-center",
            style: { backgroundColor: `${ORANGE}18` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18, style: { color: ORANGE } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "My Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Overview of your loan portfolio" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeletons, {})
    ] });
  }
  if (!loans.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-lg flex items-center justify-center",
            style: { backgroundColor: `${ORANGE}18` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18, style: { color: ORANGE } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "My Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Overview of your loan portfolio" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-dashed border-border rounded-xl p-12 text-center",
          "data-ocid": "customer-dashboard-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center",
                style: { backgroundColor: `${ORANGE}18` },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 30, style: { color: ORANGE } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-lg", children: "No loans assigned yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-xs mx-auto", children: "Your loan applications will appear here once your BiggPocket agent sets them up for you." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#/tracker/loans",
                className: "inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-smooth hover:opacity-90",
                style: { backgroundColor: ORANGE },
                "data-ocid": "customer-dashboard-view-loans",
                children: "View My Loans"
              }
            )
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
          style: { backgroundColor: `${ORANGE}18` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18, style: { color: ORANGE } })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "My Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Overview of your loan portfolio" })
      ] })
    ] }),
    stats.rejected > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 rounded-xl border p-4",
        style: { backgroundColor: `${RED}0c`, borderColor: `${RED}40` },
        "data-ocid": "customer-dashboard-rejected-warning",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              size: 18,
              style: { color: RED },
              className: "shrink-0 mt-0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", style: { color: RED }, children: `${stats.rejected} loan${stats.rejected !== 1 ? "s" : ""} ${stats.rejected !== 1 ? "have" : "has"} been rejected` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Contact your BiggPocket agent for more information." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#/tracker/loans",
              className: "ml-auto shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg text-white",
              style: { backgroundColor: RED },
              "data-ocid": "customer-dashboard-view-rejected",
              children: "View"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Loans",
          value: stats.total,
          icon: FileText,
          accent: BLUE,
          sub: "all files"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active Loans",
          value: stats.active,
          icon: TrendingUp,
          accent: ORANGE,
          sub: "in progress"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Completed",
          value: stats.completed,
          icon: CircleCheck,
          accent: GREEN,
          sub: "payout received"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Value",
          value: fmt(stats.totalValue),
          icon: Wallet,
          accent: BLUE,
          sub: "sum of all loans"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      stats.stageData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-4", children: "Stage Distribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: stats.stageData,
              dataKey: "count",
              nameKey: "name",
              cx: "50%",
              cy: "50%",
              outerRadius: 72,
              innerRadius: 30,
              children: stats.stageData.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: CHART_COLORS[i % CHART_COLORS.length]
                },
                entry.name
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12
              },
              formatter: (value) => [
                `${value} loan${value !== 1 ? "s" : ""}`,
                ""
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Legend,
            {
              iconSize: 8,
              iconType: "circle",
              wrapperStyle: { fontSize: 11 },
              formatter: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--muted-foreground)" }, children: v })
            }
          )
        ] }) }) })
      ] }),
      stats.valueData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-4", children: "Loan Value by Stage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: stats.valueData,
            margin: { top: 4, right: 8, left: 0, bottom: 4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "name",
                  tick: { fontSize: 10, fill: "var(--muted-foreground)" },
                  tickLine: false,
                  axisLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 10, fill: "var(--muted-foreground)" },
                  tickLine: false,
                  axisLine: false,
                  tickFormatter: (v) => fmt(v)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12
                  },
                  formatter: (value) => [fmt(value), "Loan Value"],
                  labelFormatter: (label) => {
                    const found = stats.valueData.find(
                      (d) => d.name === label
                    );
                    return (found == null ? void 0 : found.fullName) ?? label;
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [4, 4, 0, 0], children: stats.valueData.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: CHART_COLORS[i % CHART_COLORS.length]
                },
                entry.name
              )) })
            ]
          }
        ) }) })
      ] })
    ] }),
    stats.recent.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-4 py-3 border-b flex items-center justify-between",
          style: { borderColor: "var(--border)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Recent Loans" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#/tracker/loans",
                className: "text-xs font-medium hover:underline",
                style: { color: ORANGE },
                "data-ocid": "customer-dashboard-all-loans",
                children: "View all"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: stats.recent.map((loan) => {
        const isRej = loan.isRejected === true;
        const stage = isRej ? REJECTED_STAGE_LABEL : LOAN_STAGES[loan.currentStage] ?? "Unknown";
        const stageColor = isRej ? RED : loan.currentStage >= LOAN_STAGES.length - 1 ? GREEN : ORANGE;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `#/tracker/loans/${loan.id}`,
            className: "flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-smooth group",
            "data-ocid": `customer-recent-loan-${loan.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: loan.applicantName || `Loan #${loan.id}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: loan.bankName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right ml-3 shrink-0 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-mono", children: fmt(loan.loanAmount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block text-xs px-2 py-0.5 rounded-full font-medium",
                    style: {
                      backgroundColor: `${stageColor}18`,
                      color: stageColor
                    },
                    children: stage
                  }
                )
              ] })
            ]
          },
          loan.id
        );
      }) })
    ] })
  ] });
}
export {
  CustomerDashboardPage as default
};
