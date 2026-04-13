import { c as createLucideIcon, j as jsxRuntimeExports, F as FileText } from "./index-DmlGt2ze.js";
import { B as Badge } from "./badge-DJ6ESDy9.js";
import { B as Button } from "./button-BNrAkQWu.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-UU8wv2cG.js";
import { S as Skeleton } from "./skeleton-Ba6rVojZ.js";
import { L as LOAN_STAGES } from "./stages-CnHug0GM.js";
import { q as useGetMyLoans } from "./useQueries-Cl2674ke.js";
import { C as CircleAlert } from "./circle-alert-CF5_zaRA.js";
import { C as ChevronRight } from "./chevron-right-Ds-ykgmq.js";
import "./utils-DdB4LPY_.js";
import "./api-BzzkbRdq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M13 2a9 9 0 0 1 9 9", key: "1itnx2" }],
  ["path", { d: "M13 6a5 5 0 0 1 5 5", key: "11nki7" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const PhoneCall = createLucideIcon("phone-call", __iconNode);
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function formatDate(timestamp) {
  return new Date(timestamp / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function getStageBadgeStyle(stageIndex, isComplete) {
  if (isComplete || stageIndex >= 7) {
    return {
      backgroundColor: "#f0fdf4",
      color: "#15803d",
      border: "1px solid #bbf7d0"
    };
  }
  if (stageIndex >= 3) {
    return {
      backgroundColor: "#fff7ed",
      color: "#c2410c",
      border: "1px solid #fed7aa"
    };
  }
  return {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    border: "1px solid #bfdbfe"
  };
}
function getProgressColor(stageIndex, isComplete) {
  if (isComplete || stageIndex >= 7) return "#22c55e";
  if (stageIndex >= 3) return "#f97316";
  return "#3b82f6";
}
function LoanCardSkeleton({ id }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-8" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-1.5 w-full rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-md" })
      ] })
    ] })
  ] }, id);
}
function LoanCard({ item }) {
  const { loan } = item;
  const isRejected = loan.isRejected === true;
  const stageIndex = loan.currentStage;
  const stageName = isRejected ? "Rejected" : LOAN_STAGES[stageIndex] ?? "Unknown";
  const stageNum = Math.min(stageIndex + 1, 10);
  const isCompleted = !isRejected && stageIndex >= LOAN_STAGES.length - 1;
  const progressPct = Math.round(stageNum / 10 * 100);
  const badgeStyle = isRejected ? {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fecaca"
  } : getStageBadgeStyle(stageIndex, isCompleted);
  const progressColor = isRejected ? "#dc2626" : getProgressColor(stageIndex, isCompleted);
  function navigate() {
    window.location.hash = `#/tracker/loans/${loan.id}`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "shadow-card hover:shadow-elevated transition-smooth group",
      style: {
        border: isRejected ? "1.5px solid #fca5a5" : void 0,
        backgroundColor: isRejected ? "#fff8f8" : void 0
      },
      "data-ocid": `loan-card-${loan.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                "Loan #",
                loan.id
              ] }),
              isRejected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
                  style: { backgroundColor: "#dc262618", color: "#dc2626" },
                  "data-ocid": `loan-card-rejected-badge-${loan.id}`,
                  children: "✕ Rejected"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight mt-0.5 truncate max-w-[200px]", children: loan.applicantName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full",
              style: badgeStyle,
              children: isRejected ? "Rejected" : `Stage ${stageNum}/10`
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-16 shrink-0 text-xs", children: "Bank" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate min-w-0", children: loan.bankName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-16 shrink-0 text-xs", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate min-w-0", children: loan.loanType })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-16 shrink-0 text-xs", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold font-mono", children: formatCurrency(loan.loanAmount) })
          ] }),
          isRejected && loan.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg px-3 py-2 text-xs",
              style: { backgroundColor: "#dc262610", color: "#dc2626" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Reason: " }),
                loan.rejectionReason
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-medium truncate max-w-[160px]",
                  style: { color: progressColor },
                  children: stageName
                }
              ),
              !isRejected && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1 shrink-0", children: [
                progressPct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-smooth",
                style: {
                  width: `${progressPct}%`,
                  backgroundColor: progressColor
                }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(loan.updatedAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: (e) => {
                  e.stopPropagation();
                  navigate();
                },
                className: "text-xs h-8 px-3 text-white flex items-center gap-1 group-hover:opacity-90",
                style: isRejected ? { backgroundColor: "#dc2626", borderColor: "#dc2626" } : { backgroundColor: "#f97316", borderColor: "#f97316" },
                "data-ocid": `loan-card-view-${loan.id}`,
                children: [
                  isRejected ? "View Details" : "Track Status",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13 })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const SKELETON_IDS = ["sk-a", "sk-b", "sk-c"];
function MyLoansPage() {
  const { data: loans, isLoading, isError, refetch } = useGetMyLoans();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Loan Applications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Track the progress of all your applications in real time" })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: SKELETON_IDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(LoanCardSkeleton, { id }, id)) }),
    isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center",
        "data-ocid": "my-loans-error",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mx-auto mb-3 text-destructive", size: 32 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Unable to load your loans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Please try refreshing the page." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => void refetch(),
              className: "mt-4",
              children: "Try Again"
            }
          )
        ]
      }
    ),
    !isLoading && !isError && (!loans || loans.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-dashed border-border bg-card p-12 text-center",
        "data-ocid": "my-loans-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center",
              style: { backgroundColor: "#fff7ed" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 30, style: { color: "#f97316" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg mb-2", children: "No loan applications yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mx-auto", children: "Your loan applications will appear here once your BiggPocket agent sets them up for you." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { size: 15, style: { color: "#f97316" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Contact your agent to get started" })
          ] })
        ]
      }
    ),
    !isLoading && !isError && loans && loans.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-5 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: loans.length }),
          " ",
          "application",
          loans.length !== 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: loans.filter((l) => l.loan.isActive).length }),
          " ",
          "active"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in",
          "data-ocid": "my-loans-grid",
          children: loans.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(LoanCard, { item }, item.loan.id))
        }
      )
    ] })
  ] });
}
export {
  MyLoansPage as default
};
