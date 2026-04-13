import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ChevronRight, FileText, PhoneCall } from "lucide-react";
import { LOAN_STAGES } from "../../constants/stages";
import { useGetMyLoans } from "../../hooks/useQueries";
import type { LoanWithHistory } from "../../types";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(timestamp: number): string {
  return new Date(timestamp / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Returns styling based on stage position: early (0-2) = blue, mid (3-6) = orange, late/done (7-9) = green */
function getStageBadgeStyle(stageIndex: number, isComplete: boolean) {
  if (isComplete || stageIndex >= 7) {
    return {
      backgroundColor: "#f0fdf4",
      color: "#15803d",
      border: "1px solid #bbf7d0",
    };
  }
  if (stageIndex >= 3) {
    return {
      backgroundColor: "#fff7ed",
      color: "#c2410c",
      border: "1px solid #fed7aa",
    };
  }
  return {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    border: "1px solid #bfdbfe",
  };
}

function getProgressColor(stageIndex: number, isComplete: boolean): string {
  if (isComplete || stageIndex >= 7) return "#22c55e";
  if (stageIndex >= 3) return "#f97316";
  return "#3b82f6";
}

function LoanCardSkeleton({ id }: { id: string }) {
  return (
    <Card key={id} className="shadow-card border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <div className="pt-1 space-y-1.5">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

function LoanCard({ item }: { item: LoanWithHistory }) {
  const { loan } = item;
  const isRejected = loan.isRejected === true;
  const stageIndex = loan.currentStage;
  const stageName = isRejected
    ? "Rejected"
    : (LOAN_STAGES[stageIndex] ?? "Unknown");
  const stageNum = Math.min(stageIndex + 1, 10);
  const isCompleted = !isRejected && stageIndex >= LOAN_STAGES.length - 1;
  const progressPct = Math.round((stageNum / 10) * 100);
  const badgeStyle = isRejected
    ? {
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        border: "1px solid #fecaca",
      }
    : getStageBadgeStyle(stageIndex, isCompleted);
  const progressColor = isRejected
    ? "#dc2626"
    : getProgressColor(stageIndex, isCompleted);

  function navigate() {
    window.location.hash = `#/tracker/loans/${loan.id}`;
  }

  return (
    <Card
      className="shadow-card hover:shadow-elevated transition-smooth group"
      style={{
        border: isRejected ? "1.5px solid #fca5a5" : undefined,
        backgroundColor: isRejected ? "#fff8f8" : undefined,
      }}
      data-ocid={`loan-card-${loan.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-xs text-muted-foreground font-mono">
                Loan #{loan.id}
              </p>
              {isRejected && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                  style={{ backgroundColor: "#dc262618", color: "#dc2626" }}
                  data-ocid={`loan-card-rejected-badge-${loan.id}`}
                >
                  ✕ Rejected
                </span>
              )}
            </div>
            <h3 className="font-display font-semibold text-foreground text-base leading-tight mt-0.5 truncate max-w-[200px]">
              {loan.applicantName}
            </h3>
          </div>
          <Badge
            className="shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={badgeStyle}
          >
            {isRejected ? "Rejected" : `Stage ${stageNum}/10`}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2.5">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground w-16 shrink-0 text-xs">
            Bank
          </span>
          <span className="text-foreground font-medium truncate min-w-0">
            {loan.bankName}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground w-16 shrink-0 text-xs">
            Type
          </span>
          <span className="text-foreground truncate min-w-0">
            {loan.loanType}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground w-16 shrink-0 text-xs">
            Amount
          </span>
          <span className="text-foreground font-semibold font-mono">
            {formatCurrency(loan.loanAmount)}
          </span>
        </div>

        {/* Rejection reason (if available) */}
        {isRejected && loan.rejectionReason && (
          <div
            className="rounded-lg px-3 py-2 text-xs"
            style={{ backgroundColor: "#dc262610", color: "#dc2626" }}
          >
            <span className="font-semibold">Reason: </span>
            {loan.rejectionReason}
          </div>
        )}

        {/* Stage progress bar */}
        <div className="pt-1.5">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-xs font-medium truncate max-w-[160px]"
              style={{ color: progressColor }}
            >
              {stageName}
            </span>
            {!isRejected && (
              <span className="text-xs text-muted-foreground ml-1 shrink-0">
                {progressPct}%
              </span>
            )}
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-smooth"
              style={{
                width: `${progressPct}%`,
                backgroundColor: progressColor,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1.5">
          <p className="text-xs text-muted-foreground">
            {formatDate(loan.updatedAt)}
          </p>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate();
            }}
            className="text-xs h-8 px-3 text-white flex items-center gap-1 group-hover:opacity-90"
            style={
              isRejected
                ? { backgroundColor: "#dc2626", borderColor: "#dc2626" }
                : { backgroundColor: "#f97316", borderColor: "#f97316" }
            }
            data-ocid={`loan-card-view-${loan.id}`}
          >
            {isRejected ? "View Details" : "Track Status"}
            <ChevronRight size={13} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const SKELETON_IDS = ["sk-a", "sk-b", "sk-c"];

export default function MyLoansPage() {
  const { data: loans, isLoading, isError, refetch } = useGetMyLoans();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-foreground">
          My Loan Applications
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track the progress of all your applications in real time
        </p>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKELETON_IDS.map((id) => (
            <LoanCardSkeleton key={id} id={id} />
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center"
          data-ocid="my-loans-error"
        >
          <AlertCircle className="mx-auto mb-3 text-destructive" size={32} />
          <p className="text-foreground font-medium">
            Unable to load your loans
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Please try refreshing the page.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && (!loans || loans.length === 0) && (
        <div
          className="rounded-xl border border-dashed border-border bg-card p-12 text-center"
          data-ocid="my-loans-empty"
        >
          <div
            className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#fff7ed" }}
          >
            <FileText size={30} style={{ color: "#f97316" }} />
          </div>
          <h2 className="font-display font-semibold text-foreground text-lg mb-2">
            No loan applications yet
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            Your loan applications will appear here once your BiggPocket agent
            sets them up for you.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <PhoneCall size={15} style={{ color: "#f97316" }} />
            <span>Contact your agent to get started</span>
          </div>
        </div>
      )}

      {/* Loan cards grid */}
      {!isLoading && !isError && loans && loans.length > 0 && (
        <>
          {/* Summary strip */}
          <div className="flex items-center gap-4 mb-5 text-sm text-muted-foreground">
            <span>
              <span className="font-semibold text-foreground">
                {loans.length}
              </span>{" "}
              application{loans.length !== 1 ? "s" : ""}
            </span>
            <span className="text-border">|</span>
            <span>
              <span className="font-semibold text-foreground">
                {loans.filter((l) => l.loan.isActive).length}
              </span>{" "}
              active
            </span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in"
            data-ocid="my-loans-grid"
          >
            {loans.map((item) => (
              <LoanCard key={item.loan.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
