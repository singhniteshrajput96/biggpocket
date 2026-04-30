import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Download,
  Eye,
  FileText,
  FolderOpen,
  IndianRupee,
  Printer,
  User,
} from "lucide-react";
import { StageTracker } from "../../components/StageTracker";
import { useGetLoanById, useGetLoanDocuments } from "../../hooks/useQueries";
import { getToken } from "../../lib/auth";
import type { Document } from "../../types";

interface LoanTrackerPageProps {
  loanId: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(ts: number): string {
  return new Date(ts / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
}

interface SummaryItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function SummaryItem({ icon: Icon, label, value }: SummaryItemProps) {
  return (
    <div className="flex items-start gap-3 min-w-0">
      <div
        className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: "#fff7ed" }}
      >
        <Icon size={15} style={{ color: "#f97316" }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Read-Only Document Row ───────────────────────────────────────────────────

function ReadOnlyDocumentRow({ doc }: { doc: Document }) {
  function handleDownload() {
    const a = document.createElement("a");
    a.href = doc.file_url;
    a.download = doc.file_name;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }

  return (
    <div
      className="flex items-center gap-3 py-3 px-4 rounded-lg border border-border bg-background hover:bg-muted/30 transition-colors"
      data-ocid="customer-doc-row"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: "#fff7ed" }}
      >
        <FileText size={16} style={{ color: "#f97316" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {doc.file_name}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(doc.file_size)} · {formatDate(doc.uploaded_at)}
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-xs gap-1.5"
          onClick={() =>
            window.open(doc.file_url, "_blank", "noopener,noreferrer")
          }
          aria-label={`View ${doc.file_name}`}
          data-ocid="customer-doc-view-btn"
        >
          <Eye size={13} />
          View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-xs gap-1.5"
          onClick={handleDownload}
          aria-label={`Download ${doc.file_name}`}
          data-ocid="customer-doc-download-btn"
        >
          <Download size={13} />
          Download
        </Button>
      </div>
    </div>
  );
}

// ─── Customer Documents Section ───────────────────────────────────────────────

function CustomerDocumentsSection({ loanId }: { loanId: number }) {
  const { data: docs = [], isLoading } = useGetLoanDocuments(loanId);

  return (
    <Card className="shadow-card border border-border print:shadow-none print:border print-card">
      <CardHeader className="pb-4 border-b border-border">
        <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
          <FolderOpen size={18} style={{ color: "#f97316" }} />
          Documents
          {docs.length > 0 && (
            <span className="text-xs font-normal bg-muted text-muted-foreground px-2 py-0.5 rounded-full ml-1">
              {docs.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-2">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-14 rounded-lg" />
            <Skeleton className="h-14 rounded-lg" />
          </div>
        ) : docs.length === 0 ? (
          <div
            className="py-10 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/20"
            data-ocid="customer-docs-empty"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#fff7ed" }}
            >
              <FolderOpen size={18} style={{ color: "#f97316" }} />
            </div>
            <p className="text-sm font-medium text-foreground">
              No documents uploaded yet
            </p>
            <p className="text-xs text-muted-foreground">
              Documents shared by BiggPocket will appear here
            </p>
          </div>
        ) : (
          docs.map((doc) => <ReadOnlyDocumentRow key={doc.id} doc={doc} />)
        )}
      </CardContent>
    </Card>
  );
}

const SKELETON_ROW_IDS = ["s1", "s2", "s3", "s4"];

function LoanSummarySkeleton() {
  return (
    <Card className="shadow-card border border-border mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {SKELETON_ROW_IDS.map((id) => (
          <div key={id} className="space-y-1.5 flex items-start gap-3">
            <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function LoanTrackerPage({ loanId }: LoanTrackerPageProps) {
  const token = getToken() ?? "";
  const { data, isLoading } = useGetLoanById(loanId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 print:px-8 print:py-4 animate-fade-in">
      {/* Top navigation */}
      <div className="flex items-center justify-between mb-6 no-print">
        <button
          type="button"
          onClick={() => {
            window.location.hash = "#/tracker/loans";
          }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          data-ocid="back-to-loans"
          aria-label="Back to my loans"
        >
          <ArrowLeft size={16} />
          <span>Back to My Loans</span>
        </button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 text-sm"
          data-ocid="print-loan-summary"
        >
          <Printer size={14} />
          Print Summary
        </Button>
      </div>

      {/* Print-only header */}
      <div className="hidden print:block mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ backgroundColor: "#f97316" }}
          >
            <FileText size={14} className="text-white" />
          </div>
          <span className="font-bold text-lg">BiggPocket</span>
        </div>
        <h1 className="text-xl font-bold">Loan Application Summary</h1>
        <p className="text-sm text-muted-foreground">
          Printed on {new Date().toLocaleDateString("en-IN")}
        </p>
      </div>

      {/* Loan summary card */}
      {isLoading ? (
        <LoanSummarySkeleton />
      ) : data ? (
        <Card className="shadow-card border border-border mb-6 print:shadow-none print:border print-card">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="min-w-0">
                <p className="text-xs font-mono text-muted-foreground">
                  Loan #{data.loan.id}
                </p>
                <CardTitle className="font-display text-xl text-foreground leading-tight mt-0.5">
                  {data.loan.applicantName}
                </CardTitle>
              </div>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full shrink-0"
                style={
                  data.loan.isActive
                    ? {
                        backgroundColor: "#fff7ed",
                        color: "#c2410c",
                        border: "1px solid #fed7aa",
                      }
                    : {
                        backgroundColor: "#f8fafc",
                        color: "#64748b",
                        border: "1px solid #e2e8f0",
                      }
                }
              >
                {data.loan.isActive ? "Active" : "Closed"}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <SummaryItem
                icon={Building2}
                label="Bank"
                value={data.loan.bankName}
              />
              <SummaryItem
                icon={FileText}
                label="Loan Type"
                value={data.loan.loanType}
              />
              <SummaryItem
                icon={IndianRupee}
                label="Loan Amount"
                value={formatCurrency(data.loan.loanAmount)}
              />
              <SummaryItem
                icon={User}
                label="Applicant"
                value={data.loan.applicantName}
              />
            </div>

            {/* Financial summary — shown only when values are set */}
            {((data.loan.requiredAmount ?? 0) > 0 ||
              (data.loan.sanctionAmount ?? 0) > 0 ||
              (data.loan.disbursedAmount ?? 0) > 0) && (
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(data.loan.requiredAmount ?? 0) > 0 && (
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#eff6ff" }}
                    >
                      <IndianRupee size={15} style={{ color: "#3b82f6" }} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Required Amount
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {formatCurrency(data.loan.requiredAmount!)}
                      </p>
                    </div>
                  </div>
                )}
                {(data.loan.sanctionAmount ?? 0) > 0 && (
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#fff7ed" }}
                    >
                      <IndianRupee size={15} style={{ color: "#f97316" }} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Sanctioned Amount
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {formatCurrency(data.loan.sanctionAmount!)}
                      </p>
                    </div>
                  </div>
                )}
                {(data.loan.disbursedAmount ?? 0) > 0 && (
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#f0fdf4" }}
                    >
                      <IndianRupee size={15} style={{ color: "#16a34a" }} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Disbursed Amount
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#16a34a" }}
                      >
                        {formatCurrency(data.loan.disbursedAmount!)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  Applied on {formatDate(data.loan.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  Last updated {formatDate(data.loan.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Stage tracker card — polls every 5 seconds */}
      <Card className="shadow-card border border-border print:shadow-none print:border print-card mb-6">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <CardTitle className="font-display text-lg text-foreground">
              Application Progress
            </CardTitle>
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full no-print">
              Auto-refreshing every 5s
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {token ? (
            <StageTracker loanId={loanId} token={token} />
          ) : (
            <div className="py-6 text-center">
              <p className="text-muted-foreground text-sm">
                Session expired. Please{" "}
                <a
                  href="#/login"
                  className="text-primary underline hover:opacity-80"
                >
                  log in again
                </a>
                .
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents section — read-only for customers */}
      <CustomerDocumentsSection loanId={loanId} />
    </div>
  );
}
