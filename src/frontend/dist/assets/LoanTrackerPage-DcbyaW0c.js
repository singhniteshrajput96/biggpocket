import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as getToken, F as FileText, D as Download } from "./index-Z0A2bhGv.js";
import { B as Button } from "./button-DWtlGXxF.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BdbFX_7A.js";
import { S as Skeleton } from "./skeleton-CxBnDwkK.js";
import { u as useActor, g as getLoanById, c as createActor } from "./api-8PJoCqPW.js";
import { L as LOAN_STAGES } from "./stages-CnHug0GM.js";
import { L as LoaderCircle } from "./loader-circle-ByZu3f7k.js";
import { C as CircleX } from "./circle-x-CozHGL82.js";
import { g as useGetLoanById, w as useGetLoanDocuments } from "./useQueries-Bvv08CbZ.js";
import { A as ArrowLeft, P as Printer, F as FolderOpen } from "./printer-EUrUkerH.js";
import { I as IndianRupee } from "./indian-rupee-DbHc7sws.js";
import { E as Eye } from "./eye-C-qXz6Rs.js";
import "./utils-DdB4LPY_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function formatTimestamp(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
function formatTimeAgo(epochMs) {
  const seconds = Math.floor((Date.now() - epochMs) / 1e3);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
function CheckIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M2.5 7L5.5 10L11.5 4",
          stroke: "white",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
}
function MobileStageNode({
  index,
  name,
  status,
  historyEntry,
  isRejected
}) {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isUpcoming = status === "upcoming";
  const isLast = index === LOAN_STAGES.length - 1;
  const completedColor = isRejected ? "#ef4444" : "#22c55e";
  const currentColor = isRejected ? "#ef4444" : "#f97316";
  const circleBg = isCompleted ? completedColor : isCurrent ? currentColor : "#e5e7eb";
  const connectorColor = isCompleted ? completedColor : "#e5e7eb";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center shrink-0",
        style: { width: 36 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 ${isCurrent && !isRejected ? "pulse-accent" : ""}`,
              style: { backgroundColor: circleBg },
              role: "img",
              "aria-label": `Stage ${index + 1}: ${name} — ${status}`,
              children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-bold",
                  style: { color: isUpcoming ? "#9ca3af" : "#fff" },
                  children: index + 1
                }
              )
            }
          ),
          !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-0.5 flex-1 min-h-[28px] mt-0.5",
              style: { backgroundColor: connectorColor }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${isLast ? "pb-0" : "pb-5"} min-w-0 flex-1`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: `text-sm leading-tight ${isCurrent ? "font-semibold text-foreground" : isCompleted ? "text-foreground font-medium" : "text-muted-foreground"}`,
          children: [
            name,
            isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "ml-2 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                style: isRejected ? {
                  backgroundColor: "#fee2e2",
                  color: "#ef4444",
                  verticalAlign: "middle"
                } : {
                  backgroundColor: "#fff7ed",
                  color: "#f97316",
                  verticalAlign: "middle"
                },
                children: isRejected ? "Rejected" : "Current"
              }
            )
          ]
        }
      ),
      (isCompleted || isCurrent) && historyEntry && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatTimestamp(historyEntry.timestamp) }),
      (isCompleted || isCurrent) && (historyEntry == null ? void 0 : historyEntry.showRemarksToUser) && historyEntry.remarks && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5 italic bg-muted/60 rounded-md px-2.5 py-1.5 border border-border max-w-xs break-words", children: [
        "“",
        historyEntry.remarks,
        "”"
      ] })
    ] })
  ] });
}
function DesktopStageNode({
  index,
  name,
  status,
  historyEntry,
  isRejected
}) {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isUpcoming = status === "upcoming";
  const isFirst = index === 0;
  const isLast = index === LOAN_STAGES.length - 1;
  const totalStages = LOAN_STAGES.length;
  const completedColor = isRejected ? "#ef4444" : "#22c55e";
  const currentColor = isRejected ? "#ef4444" : "#f97316";
  const circleBg = isCompleted ? completedColor : isCurrent ? currentColor : "#e5e7eb";
  const leftLineColor = isCompleted || isCurrent ? completedColor : "#e5e7eb";
  const rightLineColor = isCompleted ? completedColor : "#e5e7eb";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center",
      style: { width: `${100 / totalStages}%` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 h-0.5",
              style: { backgroundColor: isFirst ? "transparent" : leftLineColor }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${isCurrent && !isRejected ? "pulse-accent" : ""}`,
              style: { backgroundColor: circleBg },
              role: "img",
              "aria-label": `Stage ${index + 1}: ${name}`,
              children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-bold",
                  style: { color: isUpcoming ? "#9ca3af" : "#fff" },
                  children: index + 1
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 h-0.5",
              style: { backgroundColor: isLast ? "transparent" : rightLineColor }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-center px-0.5 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-[11px] leading-tight w-full ${isCurrent ? "font-semibold text-foreground" : isCompleted ? "text-foreground" : "text-muted-foreground"}`,
              title: name,
              style: {
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical"
              },
              children: name
            }
          ),
          (isCompleted || isCurrent) && historyEntry && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground mt-0.5 leading-tight", children: new Date(
            Number(historyEntry.timestamp) / 1e6
          ).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) })
        ] })
      ]
    }
  );
}
function StageTracker({ loanId, token }) {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [lastUpdated, setLastUpdated] = reactExports.useState(null);
  const [isUpdating, setIsUpdating] = reactExports.useState(false);
  const intervalRef = reactExports.useRef(null);
  const fetchingRef = reactExports.useRef(false);
  const fetchData = reactExports.useCallback(
    async (silent = false) => {
      if (!actor || !token) return;
      if (fetchingRef.current) return;
      fetchingRef.current = true;
      if (silent) setIsUpdating(true);
      try {
        const result = await getLoanById(actor, token, loanId);
        setData(result);
        setLastUpdated(Date.now());
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load loan");
      } finally {
        setLoading(false);
        setIsUpdating(false);
        fetchingRef.current = false;
      }
    },
    [actor, token, loanId]
  );
  const fetchDataRef = reactExports.useRef(fetchData);
  reactExports.useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);
  reactExports.useEffect(() => {
    if (!actor || actorLoading) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    void fetchDataRef.current(false);
    intervalRef.current = setInterval(() => {
      void fetchDataRef.current(true);
    }, 5e3);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [actor, actorLoading]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-14",
        "data-ocid": "stage-tracker-loading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          LoaderCircle,
          {
            className: "animate-spin",
            size: 28,
            style: { color: "#f97316" }
          }
        )
      }
    );
  }
  if (error || !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive",
        "data-ocid": "stage-tracker-error",
        children: error ?? "Unable to load loan details."
      }
    );
  }
  const { loan, history } = data;
  const currentStageIndex = loan.currentStage;
  const isRejected = loan.isRejected ?? false;
  const historyMap = /* @__PURE__ */ new Map();
  for (const h of history) {
    const existing = historyMap.get(h.stageIndex);
    if (!existing || h.timestamp > existing.timestamp) {
      historyMap.set(h.stageIndex, h);
    }
  }
  function getStatus(index) {
    if (index < currentStageIndex) return "completed";
    if (index === currentStageIndex) return "current";
    return "upcoming";
  }
  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "stage-tracker", children: [
    isRejected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3",
        "data-ocid": "tracker-rejection-banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 20, className: "text-red-600 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-red-700 uppercase tracking-wide", children: "Loan Application Rejected" }),
            loan.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-800 mt-0.5 break-words", children: loan.rejectionReason })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5 flex-wrap gap-2", children: [
      isRejected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-red-600", children: [
        "Rejected at stage:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#ef4444" }, children: LOAN_STAGES[currentStageIndex] ?? `Stage ${currentStageIndex + 1}` })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        "Stage",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: currentStageIndex + 1 }),
        " ",
        "of ",
        LOAN_STAGES.length,
        ":",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "#f97316" }, children: LOAN_STAGES[currentStageIndex] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "flex items-center gap-1.5 text-xs text-muted-foreground",
          "data-ocid": "last-updated-label",
          children: [
            isUpdating && /* @__PURE__ */ jsxRuntimeExports.jsx(
              LoaderCircle,
              {
                className: "animate-spin",
                size: 11,
                style: { color: "#f97316" },
                "aria-label": "Refreshing..."
              }
            ),
            lastUpdated && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTimeAgo(lastUpdated) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden", "aria-label": "Loan stage progress — vertical", children: LOAN_STAGES.map((name, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      MobileStageNode,
      {
        index: idx,
        name,
        status: getStatus(idx),
        historyEntry: historyMap.get(idx),
        isRejected
      },
      name
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "hidden md:flex items-start overflow-x-auto pb-2",
        "aria-label": "Loan stage progress — horizontal",
        children: LOAN_STAGES.map((name, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DesktopStageNode,
          {
            index: idx,
            name,
            status: getStatus(idx),
            historyEntry: historyMap.get(idx),
            isRejected
          },
          name
        ))
      }
    ),
    history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mt-8 pt-6 border-t border-border",
        "data-ocid": "stage-history",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base mb-5", children: "Stage History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: sortedHistory.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-4 min-w-0 animate-fade-in",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center shrink-0",
                    style: { width: 20 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-2.5 h-2.5 rounded-full mt-1 shrink-0",
                          style: {
                            backgroundColor: idx === 0 ? "#f97316" : "#d1d5db"
                          }
                        }
                      ),
                      idx < sortedHistory.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px flex-1 min-h-[24px] bg-border mt-1" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-5 min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-tight", children: entry.stageName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatTimestamp(entry.timestamp) }),
                  entry.showRemarksToUser && entry.remarks && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5 italic bg-muted/50 rounded-md px-2.5 py-1.5 border border-border max-w-sm break-words", children: [
                    "“",
                    entry.remarks,
                    "”"
                  ] })
                ] })
              ]
            },
            `${entry.stageIndex}-${entry.timestamp}`
          )) })
        ]
      }
    )
  ] });
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function formatDate(ts) {
  return new Date(ts / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
}
function SummaryItem({ icon: Icon, label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
        style: { backgroundColor: "#fff7ed" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, style: { color: "#f97316" } })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground break-words", children: value })
    ] })
  ] });
}
function ReadOnlyDocumentRow({ doc }) {
  function handleDownload() {
    const a = document.createElement("a");
    a.href = doc.file_url;
    a.download = doc.file_name;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 py-3 px-4 rounded-lg border border-border bg-background hover:bg-muted/30 transition-colors",
      "data-ocid": "customer-doc-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
            style: { backgroundColor: "#fff7ed" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16, style: { color: "#f97316" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: doc.file_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            formatFileSize(doc.file_size),
            " · ",
            formatDate(doc.uploaded_at)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-8 px-2.5 text-xs gap-1.5",
              onClick: () => window.open(doc.file_url, "_blank", "noopener,noreferrer"),
              "aria-label": `View ${doc.file_name}`,
              "data-ocid": "customer-doc-view-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 13 }),
                "View"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-8 px-2.5 text-xs gap-1.5",
              onClick: handleDownload,
              "aria-label": `Download ${doc.file_name}`,
              "data-ocid": "customer-doc-download-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                "Download"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function CustomerDocumentsSection({ loanId }) {
  const { data: docs = [], isLoading } = useGetLoanDocuments(loanId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border print:shadow-none print:border print-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 18, style: { color: "#f97316" } }),
      "Documents",
      docs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal bg-muted text-muted-foreground px-2 py-0.5 rounded-full ml-1", children: docs.length })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 space-y-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" })
    ] }) : docs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-10 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/20",
        "data-ocid": "customer-docs-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-full flex items-center justify-center",
              style: { backgroundColor: "#fff7ed" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 18, style: { color: "#f97316" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No documents uploaded yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Documents shared by BiggPocket will appear here" })
        ]
      }
    ) : docs.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReadOnlyDocumentRow, { doc }, doc.id)) })
  ] });
}
const SKELETON_ROW_IDS = ["s1", "s2", "s3", "s4"];
function LoanSummarySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 rounded-full" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid grid-cols-2 sm:grid-cols-4 gap-5", children: SKELETON_ROW_IDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-lg shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-12" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" })
      ] })
    ] }, id)) })
  ] });
}
function LoanTrackerPage({ loanId }) {
  const token = getToken() ?? "";
  const { data, isLoading } = useGetLoanById(loanId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8 print:px-8 print:py-4 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 no-print", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            window.location.hash = "#/tracker/loans";
          },
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
          "data-ocid": "back-to-loans",
          "aria-label": "Back to my loans",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back to My Loans" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => window.print(),
          className: "flex items-center gap-1.5 text-sm",
          "data-ocid": "print-loan-summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 14 }),
            "Print Summary"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden print:block mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-7 h-7 rounded-md flex items-center justify-center",
            style: { backgroundColor: "#f97316" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14, className: "text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lg", children: "BiggPocket" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Loan Application Summary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Printed on ",
        (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN")
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoanSummarySkeleton, {}) : data ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border mb-6 print:shadow-none print:border print-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: [
            "Loan #",
            data.loan.id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-xl text-foreground leading-tight mt-0.5", children: data.loan.applicantName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-semibold px-3 py-1 rounded-full shrink-0",
            style: data.loan.isActive ? {
              backgroundColor: "#fff7ed",
              color: "#c2410c",
              border: "1px solid #fed7aa"
            } : {
              backgroundColor: "#f8fafc",
              color: "#64748b",
              border: "1px solid #e2e8f0"
            },
            children: data.loan.isActive ? "Active" : "Closed"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryItem,
            {
              icon: Building2,
              label: "Bank",
              value: data.loan.bankName
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryItem,
            {
              icon: FileText,
              label: "Loan Type",
              value: data.loan.loanType
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryItem,
            {
              icon: IndianRupee,
              label: "Loan Amount",
              value: formatCurrency(data.loan.loanAmount)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryItem,
            {
              icon: User,
              label: "Applicant",
              value: data.loan.applicantName
            }
          )
        ] }),
        ((data.loan.requiredAmount ?? 0) > 0 || (data.loan.sanctionAmount ?? 0) > 0 || (data.loan.disbursedAmount ?? 0) > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          (data.loan.requiredAmount ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                style: { backgroundColor: "#eff6ff" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 15, style: { color: "#3b82f6" } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Required Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: formatCurrency(data.loan.requiredAmount) })
            ] })
          ] }),
          (data.loan.sanctionAmount ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                style: { backgroundColor: "#fff7ed" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 15, style: { color: "#f97316" } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sanctioned Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: formatCurrency(data.loan.sanctionAmount) })
            ] })
          ] }),
          (data.loan.disbursedAmount ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                style: { backgroundColor: "#f0fdf4" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 15, style: { color: "#16a34a" } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disbursed Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm font-semibold",
                  style: { color: "#16a34a" },
                  children: formatCurrency(data.loan.disbursedAmount)
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
            "Applied on ",
            formatDate(data.loan.createdAt)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
            "Last updated ",
            formatDate(data.loan.updatedAt)
          ] })
        ] }) })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border print:shadow-none print:border print-card mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg text-foreground", children: "Application Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full no-print", children: "Auto-refreshing every 5s" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: token ? /* @__PURE__ */ jsxRuntimeExports.jsx(StageTracker, { loanId, token }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
        "Session expired. Please",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#/login",
            className: "text-primary underline hover:opacity-80",
            children: "log in again"
          }
        ),
        "."
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerDocumentsSection, { loanId })
  ] });
}
export {
  LoanTrackerPage as default
};
