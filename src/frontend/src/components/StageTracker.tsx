import { useActor } from "@caffeineai/core-infrastructure";
import { Loader2, XCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import { LOAN_STAGES } from "../constants/stages";
import { getLoanById } from "../lib/api";
import type { LoanStageHistory, LoanWithHistory } from "../types";

interface StageTrackerProps {
  loanId: number;
  token: string;
}

function formatTimestamp(ts: number): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatTimeAgo(epochMs: number): string {
  const seconds = Math.floor((Date.now() - epochMs) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

type StageStatus = "completed" | "current" | "upcoming";

interface StageNodeProps {
  index: number;
  name: string;
  status: StageStatus;
  historyEntry?: LoanStageHistory;
  isRejected?: boolean;
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 7L5.5 10L11.5 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Mobile vertical node ─────────────────────────────────────────
function MobileStageNode({
  index,
  name,
  status,
  historyEntry,
  isRejected,
}: StageNodeProps) {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isUpcoming = status === "upcoming";
  const isLast = index === LOAN_STAGES.length - 1;

  const completedColor = isRejected ? "#ef4444" : "#22c55e";
  const currentColor = isRejected ? "#ef4444" : "#f97316";
  const circleBg = isCompleted
    ? completedColor
    : isCurrent
      ? currentColor
      : "#e5e7eb";
  const connectorColor = isCompleted ? completedColor : "#e5e7eb";

  return (
    <div className="flex gap-4 min-w-0">
      <div
        className="flex flex-col items-center shrink-0"
        style={{ width: 36 }}
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 ${isCurrent && !isRejected ? "pulse-accent" : ""}`}
          style={{ backgroundColor: circleBg }}
          role="img"
          aria-label={`Stage ${index + 1}: ${name} — ${status}`}
        >
          {isCompleted ? (
            <CheckIcon />
          ) : (
            <span
              className="text-xs font-bold"
              style={{ color: isUpcoming ? "#9ca3af" : "#fff" }}
            >
              {index + 1}
            </span>
          )}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 min-h-[28px] mt-0.5"
            style={{ backgroundColor: connectorColor }}
          />
        )}
      </div>

      <div className={`${isLast ? "pb-0" : "pb-5"} min-w-0 flex-1`}>
        <p
          className={`text-sm leading-tight ${
            isCurrent
              ? "font-semibold text-foreground"
              : isCompleted
                ? "text-foreground font-medium"
                : "text-muted-foreground"
          }`}
        >
          {name}
          {isCurrent && (
            <span
              className="ml-2 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={
                isRejected
                  ? {
                      backgroundColor: "#fee2e2",
                      color: "#ef4444",
                      verticalAlign: "middle",
                    }
                  : {
                      backgroundColor: "#fff7ed",
                      color: "#f97316",
                      verticalAlign: "middle",
                    }
              }
            >
              {isRejected ? "Rejected" : "Current"}
            </span>
          )}
        </p>

        {(isCompleted || isCurrent) && historyEntry && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatTimestamp(historyEntry.timestamp)}
          </p>
        )}

        {(isCompleted || isCurrent) &&
          historyEntry?.showRemarksToUser &&
          historyEntry.remarks && (
            <p className="text-xs text-muted-foreground mt-1.5 italic bg-muted/60 rounded-md px-2.5 py-1.5 border border-border max-w-xs break-words">
              &ldquo;{historyEntry.remarks}&rdquo;
            </p>
          )}
      </div>
    </div>
  );
}

// ─── Desktop horizontal node ──────────────────────────────────────
function DesktopStageNode({
  index,
  name,
  status,
  historyEntry,
  isRejected,
}: StageNodeProps) {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isUpcoming = status === "upcoming";
  const isFirst = index === 0;
  const isLast = index === LOAN_STAGES.length - 1;
  const totalStages = LOAN_STAGES.length;

  const completedColor = isRejected ? "#ef4444" : "#22c55e";
  const currentColor = isRejected ? "#ef4444" : "#f97316";
  const circleBg = isCompleted
    ? completedColor
    : isCurrent
      ? currentColor
      : "#e5e7eb";
  const leftLineColor = isCompleted || isCurrent ? completedColor : "#e5e7eb";
  const rightLineColor = isCompleted ? completedColor : "#e5e7eb";

  return (
    <div
      className="flex flex-col items-center"
      style={{ width: `${100 / totalStages}%` }}
    >
      <div className="flex items-center w-full">
        <div
          className="flex-1 h-0.5"
          style={{ backgroundColor: isFirst ? "transparent" : leftLineColor }}
        />
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${isCurrent && !isRejected ? "pulse-accent" : ""}`}
          style={{ backgroundColor: circleBg }}
          role="img"
          aria-label={`Stage ${index + 1}: ${name}`}
        >
          {isCompleted ? (
            <CheckIcon />
          ) : (
            <span
              className="text-xs font-bold"
              style={{ color: isUpcoming ? "#9ca3af" : "#fff" }}
            >
              {index + 1}
            </span>
          )}
        </div>
        <div
          className="flex-1 h-0.5"
          style={{ backgroundColor: isLast ? "transparent" : rightLineColor }}
        />
      </div>

      <div className="mt-2 text-center px-0.5 w-full">
        <p
          className={`text-[11px] leading-tight w-full ${
            isCurrent
              ? "font-semibold text-foreground"
              : isCompleted
                ? "text-foreground"
                : "text-muted-foreground"
          }`}
          title={name}
          style={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {name}
        </p>
        {(isCompleted || isCurrent) && historyEntry && (
          <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">
            {new Date(
              Number(historyEntry.timestamp) / 1_000_000,
            ).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main StageTracker ────────────────────────────────────────────
export function StageTracker({ loanId, token }: StageTrackerProps) {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const [data, setData] = useState<LoanWithHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Guard: prevent concurrent fetches from stacking
  const fetchingRef = useRef(false);

  const fetchData = useCallback(
    async (silent = false) => {
      if (!actor || !token) return;
      // Skip if a fetch is already in progress (prevents stacking)
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
    [actor, token, loanId],
  );

  // Store fetchData in a ref so the polling interval always calls the latest
  // version without needing to be in the effect's dependency array.
  const fetchDataRef = useRef(fetchData);
  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  useEffect(() => {
    if (!actor || actorLoading) return;

    // Clear any existing interval before creating a new one (prevents stacking
    // when actor reference changes or component re-mounts in Strict Mode)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    void fetchDataRef.current(false);

    intervalRef.current = setInterval(() => {
      void fetchDataRef.current(true);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actor, actorLoading]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center py-14"
        data-ocid="stage-tracker-loading"
      >
        <Loader2
          className="animate-spin"
          size={28}
          style={{ color: "#f97316" }}
        />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        data-ocid="stage-tracker-error"
      >
        {error ?? "Unable to load loan details."}
      </div>
    );
  }

  const { loan, history } = data;
  const currentStageIndex = loan.currentStage;
  const isRejected = loan.isRejected ?? false;

  // Build map: stageIndex → latest history entry
  const historyMap = new Map<number, LoanStageHistory>();
  for (const h of history) {
    const existing = historyMap.get(h.stageIndex);
    if (!existing || h.timestamp > existing.timestamp) {
      historyMap.set(h.stageIndex, h);
    }
  }

  function getStatus(index: number): StageStatus {
    if (index < currentStageIndex) return "completed";
    if (index === currentStageIndex) return "current";
    return "upcoming";
  }

  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div data-ocid="stage-tracker">
      {/* Rejection banner */}
      {isRejected && (
        <div
          className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          data-ocid="tracker-rejection-banner"
        >
          <XCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-red-700 uppercase tracking-wide">
              Loan Application Rejected
            </p>
            {loan.rejectionReason && (
              <p className="text-sm text-red-800 mt-0.5 break-words">
                {loan.rejectionReason}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        {isRejected ? (
          <span className="text-sm font-semibold text-red-600">
            Rejected at stage:{" "}
            <span style={{ color: "#ef4444" }}>
              {LOAN_STAGES[currentStageIndex] ??
                `Stage ${currentStageIndex + 1}`}
            </span>
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">
            Stage{" "}
            <span className="font-semibold text-foreground">
              {currentStageIndex + 1}
            </span>{" "}
            of {LOAN_STAGES.length}:{" "}
            <span className="font-semibold" style={{ color: "#f97316" }}>
              {LOAN_STAGES[currentStageIndex]}
            </span>
          </span>
        )}
        <span
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
          data-ocid="last-updated-label"
        >
          {isUpdating && (
            <Loader2
              className="animate-spin"
              size={11}
              style={{ color: "#f97316" }}
              aria-label="Refreshing..."
            />
          )}
          {lastUpdated && <span>{formatTimeAgo(lastUpdated)}</span>}
        </span>
      </div>

      {/* Mobile: vertical tracker */}
      <div className="md:hidden" aria-label="Loan stage progress — vertical">
        {LOAN_STAGES.map((name, idx) => (
          <MobileStageNode
            key={name}
            index={idx}
            name={name}
            status={getStatus(idx)}
            historyEntry={historyMap.get(idx)}
            isRejected={isRejected}
          />
        ))}
      </div>

      {/* Desktop: horizontal scrollable tracker */}
      <div
        className="hidden md:flex items-start overflow-x-auto pb-2"
        aria-label="Loan stage progress — horizontal"
      >
        {LOAN_STAGES.map((name, idx) => (
          <DesktopStageNode
            key={name}
            index={idx}
            name={name}
            status={getStatus(idx)}
            historyEntry={historyMap.get(idx)}
            isRejected={isRejected}
          />
        ))}
      </div>

      {/* Stage History Timeline */}
      {history.length > 0 && (
        <div
          className="mt-8 pt-6 border-t border-border"
          data-ocid="stage-history"
        >
          <h3 className="font-display font-semibold text-foreground text-base mb-5">
            Stage History
          </h3>
          <div className="space-y-0">
            {sortedHistory.map((entry, idx) => (
              <div
                key={`${entry.stageIndex}-${entry.timestamp}`}
                className="flex gap-4 min-w-0 animate-fade-in"
              >
                <div
                  className="flex flex-col items-center shrink-0"
                  style={{ width: 20 }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                    style={{
                      backgroundColor: idx === 0 ? "#f97316" : "#d1d5db",
                    }}
                  />
                  {idx < sortedHistory.length - 1 && (
                    <div className="w-px flex-1 min-h-[24px] bg-border mt-1" />
                  )}
                </div>

                <div className="pb-5 min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground leading-tight">
                    {entry.stageName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatTimestamp(entry.timestamp)}
                  </p>
                  {entry.showRemarksToUser && entry.remarks && (
                    <p className="text-xs text-muted-foreground mt-1.5 italic bg-muted/50 rounded-md px-2.5 py-1.5 border border-border max-w-sm break-words">
                      &ldquo;{entry.remarks}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
