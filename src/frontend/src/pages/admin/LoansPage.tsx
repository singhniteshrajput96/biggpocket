import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LOAN_STAGES } from "../../constants/stages";
import {
  useAdminCreateLoan,
  useAdminDeleteLoan,
  useAdminGetAllLoans,
  useAdminGetAllUsers,
  useAdminGetDeletedLoans,
  useAdminRestoreLoan,
} from "../../hooks/useQueries";
import type { LoanWithHistory } from "../../types";

const PAGE_SIZES = [10, 25, 50];
const SANCTIONED_MIN_STAGE = 6;
const DISBURSED_MIN_STAGE = 7;

type NamedFilter = "active" | "sanctioned" | "disbursed" | "rejected" | null;
type ActiveTab = "loans" | "deleted";

interface ParsedParams {
  stage: number | null;
  filter: NamedFilter;
  assignedUser: number | null;
}

function parseHashParams(): ParsedParams {
  const hash = window.location.hash;
  const qIdx = hash.indexOf("?");
  if (qIdx === -1) return { stage: null, filter: null, assignedUser: null };
  const params = new URLSearchParams(hash.slice(qIdx + 1));
  const stage = params.get("stage");
  const assignedUser = params.get("assigned_user");
  if (stage !== null)
    return { stage: Number(stage), filter: null, assignedUser: null };
  const filter = params.get("filter");
  const namedFilter =
    filter === "active" ||
    filter === "sanctioned" ||
    filter === "disbursed" ||
    filter === "rejected"
      ? filter
      : null;
  return {
    stage: null,
    filter: namedFilter,
    assignedUser: assignedUser !== null ? Number(assignedUser) : null,
  };
}

function namedFilterToStage(f: NamedFilter): number | null {
  if (f === "sanctioned") return SANCTIONED_MIN_STAGE;
  if (f === "disbursed") return DISBURSED_MIN_STAGE;
  return null;
}

function getFilterLabel(
  stage: number | null,
  namedFilter: NamedFilter,
  assignedUserName?: string,
): string | null {
  const parts: string[] = [];
  if (namedFilter === "active") parts.push("Active Files");
  else if (namedFilter === "sanctioned")
    parts.push(`Sanctioned (Stage ${SANCTIONED_MIN_STAGE + 1}+)`);
  else if (namedFilter === "disbursed")
    parts.push(`Disbursed (Stage ${DISBURSED_MIN_STAGE + 1}+)`);
  else if (namedFilter === "rejected") parts.push("Rejected Files");
  else if (stage !== null)
    parts.push(`Stage: ${LOAN_STAGES[stage] ?? `Stage ${stage + 1}`}`);
  if (assignedUserName) parts.push(`User: ${assignedUserName}`);
  return parts.length ? parts.join(" · ") : null;
}

function stageBadgeClass(stageIndex: number): string {
  if (stageIndex <= 2) return "bg-blue-100 text-blue-700";
  if (stageIndex <= 5) return "bg-orange-100 text-orange-700";
  return "bg-green-100 text-green-700";
}

function StageBadge({ stageIndex }: { stageIndex: number }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${stageBadgeClass(stageIndex)}`}
    >
      {LOAN_STAGES[stageIndex] ?? `Stage ${stageIndex + 1}`}
    </span>
  );
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(ts: number) {
  return new Date(ts / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Create Loan Modal ────────────────────────────────────────────────────────

interface CreateModalProps {
  onClose: () => void;
}

function CreateLoanModal({ onClose }: CreateModalProps) {
  const createMutation = useAdminCreateLoan();
  const [form, setForm] = useState({
    applicantName: "",
    bankName: "",
    loanType: "",
    loanAmount: "",
    mobile: "",
    distributionPartner: "",
    coApplicantName: "",
    employmentType: "",
    income: "",
    propertyType: "",
    propertyValue: "",
    requiredAmount: "",
    sanctionAmount: "",
    disbursedAmount: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.applicantName.trim())
      e.applicantName = "Applicant name is required";
    if (!form.bankName.trim()) e.bankName = "Bank name is required";
    if (!form.loanType.trim()) e.loanType = "Loan type is required";
    const amt = Number(form.loanAmount);
    if (!form.loanAmount || Number.isNaN(amt) || amt <= 0)
      e.loanAmount = "Enter a valid amount";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFormErrors(errs);
      return;
    }
    try {
      await createMutation.mutateAsync({
        applicantName: form.applicantName.trim(),
        bankName: form.bankName.trim(),
        loanType: form.loanType.trim(),
        loanAmount: Number(form.loanAmount),
        mobile: form.mobile.trim(),
        distributionPartner: form.distributionPartner.trim() || undefined,
        coApplicantName: form.coApplicantName.trim() || undefined,
        employmentType: form.employmentType || undefined,
        income: form.income ? Number(form.income) : undefined,
        propertyType: form.propertyType.trim() || undefined,
        propertyValue: form.propertyValue
          ? Number(form.propertyValue)
          : undefined,
        requiredAmount: form.requiredAmount
          ? Number(form.requiredAmount)
          : undefined,
        sanctionAmount: form.sanctionAmount
          ? Number(form.sanctionAmount)
          : undefined,
        disbursedAmount: form.disbursedAmount
          ? Number(form.disbursedAmount)
          : undefined,
      });
      onClose();
    } catch (err) {
      const msg = (err as Error).message ?? "Failed to create loan";
      // If session is invalid/expired, the backend returns a specific error — redirect to login
      if (
        msg.toLowerCase().includes("invalid") ||
        msg.toLowerCase().includes("expired") ||
        msg.toLowerCase().includes("not authenticated") ||
        msg.toLowerCase().includes("session")
      ) {
        window.location.hash = "#/login";
        return;
      }
      setFormErrors({
        submit: msg,
      });
    }
  }

  function field(
    id: keyof typeof form,
    label: string,
    placeholder: string,
    type = "text",
    required = false,
  ) {
    return (
      <div className="space-y-1" key={id}>
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </Label>
        <Input
          id={id}
          type={type}
          value={form[id]}
          placeholder={placeholder}
          onChange={(e) => {
            setForm((f) => ({ ...f, [id]: e.target.value }));
            if (formErrors[id])
              setFormErrors((prev) => ({ ...prev, [id]: "" }));
          }}
          className={formErrors[id] ? "border-destructive" : ""}
          data-ocid={`create-loan-${id}`}
        />
        {formErrors[id] && (
          <p className="text-xs text-destructive">{formErrors[id]}</p>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 animate-fade-in"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        aria-hidden="true"
      />
      <dialog
        open
        className="fixed inset-0 z-50 m-auto flex items-center justify-center bg-transparent border-0 p-4 w-full max-w-lg"
        aria-labelledby="create-loan-title"
      >
        <div className="w-full bg-card rounded-xl shadow-elevated border border-border animate-fade-in max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border shrink-0">
            <h2
              id="create-loan-title"
              className="text-base font-display font-semibold text-foreground"
            >
              New Loan Application
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-md"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="px-5 py-4 space-y-4 overflow-y-auto"
          >
            {/* Basic required fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field(
                "applicantName",
                "Applicant Name",
                "Full name",
                "text",
                true,
              )}
              {field("coApplicantName", "Co-Applicant Name", "Optional")}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("bankName", "Bank Name", "e.g. HDFC Bank", "text", true)}
              {field("loanType", "Loan Type", "e.g. Home Loan", "text", true)}
            </div>
            {field(
              "loanAmount",
              "Loan Amount (₹)",
              "e.g. 5000000",
              "number",
              true,
            )}

            {/* Distribution Partner */}
            {field(
              "distributionPartner",
              "Distribution Partner",
              "Referral source / DSA name",
            )}
            {field(
              "mobile",
              "Mobile Number (optional)",
              "10-digit mobile — assigns to user",
            )}

            {/* Applicant Details section */}
            <div className="pt-2 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Applicant Details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-foreground">
                    Employment Type
                  </Label>
                  <select
                    className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                    value={form.employmentType}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, employmentType: e.target.value }))
                    }
                    data-ocid="create-loan-employmentType"
                  >
                    <option value="">Select type</option>
                    <option value="Salary">Salaried</option>
                    <option value="Business">Business / Self-Employed</option>
                  </select>
                </div>
                {field("income", "Monthly Income (₹)", "e.g. 80000", "number")}
              </div>
            </div>

            {/* Property Details section */}
            <div className="pt-2 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Property Details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field(
                  "propertyType",
                  "Property Type",
                  "e.g. Residential, Commercial",
                )}
                {field(
                  "propertyValue",
                  "Market Value (₹)",
                  "e.g. 8000000",
                  "number",
                )}
              </div>
            </div>

            {/* Financial Details section */}
            <div className="pt-2 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Financial Details{" "}
                <span className="text-muted-foreground font-normal normal-case tracking-normal">
                  (optional)
                </span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {field(
                  "requiredAmount",
                  "Required Amount (₹)",
                  "e.g. 5000000",
                  "number",
                )}
                {field(
                  "sanctionAmount",
                  "Sanction Amount (₹)",
                  "e.g. 4800000",
                  "number",
                )}
                {field(
                  "disbursedAmount",
                  "Disbursed Amount (₹)",
                  "e.g. 4500000",
                  "number",
                )}
              </div>
            </div>

            {formErrors.submit && (
              <p className="text-sm text-destructive flex items-center gap-2">
                <AlertTriangle size={14} />
                {formErrors.submit}
              </p>
            )}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 text-white"
                disabled={createMutation.isPending}
                style={{ backgroundColor: "#f97316", borderColor: "#f97316" }}
                data-ocid="create-loan-submit"
              >
                {createMutation.isPending ? (
                  <Loader2 size={15} className="animate-spin mr-1.5" />
                ) : (
                  <Plus size={15} className="mr-1.5" />
                )}
                Create Loan
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onPage: (p: number) => void;
  onPageSize: (ps: number) => void;
}

function Pagination({
  page,
  total,
  pageSize,
  onPage,
  onPageSize,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else if (page <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", totalPages);
  } else if (page >= totalPages - 3) {
    pages.push(
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    );
  } else {
    pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
  }

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border"
      data-ocid="loans-pagination"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Rows per page:</span>
        <select
          className="border border-input rounded-md px-2 py-1 text-sm bg-background text-foreground"
          value={pageSize}
          onChange={(e) => {
            onPageSize(Number(e.target.value));
            onPage(1);
          }}
          data-ocid="loans-page-size"
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span>
          {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of{" "}
          {total}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
          className="p-1.5 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`dots-${i === 1 ? "start" : "end"}`}
              className="px-2 text-sm text-muted-foreground"
            >
              …
            </span>
          ) : (
            <button
              key={`page-${p}`}
              type="button"
              onClick={() => onPage(p as number)}
              className={`w-8 h-8 rounded-md text-sm font-medium transition-smooth ${
                p === page ? "text-white" : "text-foreground hover:bg-muted"
              }`}
              style={p === page ? { backgroundColor: "#f97316" } : undefined}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPage(page + 1)}
          className="p-1.5 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Assigned User Chips ──────────────────────────────────────────────────────

interface AssignedChipsProps {
  userIds: number[];
  userMap: Map<number, string>;
}

function AssignedChips({ userIds, userMap }: AssignedChipsProps) {
  const validIds = (userIds ?? []).filter(
    (id) => id != null && typeof id === "number",
  );
  if (validIds.length === 0)
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground">
        Unassigned
      </span>
    );
  const visible = validIds.slice(0, 2);
  const overflow = validIds.length - visible.length;
  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((id) => (
        <span
          key={id}
          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ backgroundColor: "#eff6ff", color: "#1d4ed8" }}
        >
          <Users size={9} />
          {userMap.get(id) ?? `#${id}`}
        </span>
      ))}
      {overflow > 0 && (
        <span className="text-[10px] text-muted-foreground">+{overflow}</span>
      )}
    </div>
  );
}

// ─── Loan Row ─────────────────────────────────────────────────────────────────

interface LoanRowProps {
  loanWithHistory: LoanWithHistory;
  onDelete: (id: number) => void;
  deleting: boolean;
  userMap: Map<number, string>;
}

function LoanRow({
  loanWithHistory,
  onDelete,
  deleting,
  userMap,
}: LoanRowProps) {
  const { loan, assignedUserIds } = loanWithHistory;
  const [confirmDelete, setConfirmDelete] = useState(false);

  function navigate() {
    window.location.hash = `#/admin/loans/${loan.id}`;
  }

  return (
    <tr
      className={`border-b border-border hover:bg-muted/40 transition-smooth cursor-pointer ${loan.isRejected ? "bg-red-50/50" : ""}`}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate();
      }}
      tabIndex={0}
      data-ocid={`loan-row-${loan.id}`}
    >
      <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
        #{loan.id}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-foreground truncate max-w-[140px]">
            {loan.applicantName}
          </p>
          {loan.isRejected ? (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 w-fit">
              ✕ REJECTED
            </span>
          ) : (
            <AssignedChips userIds={assignedUserIds ?? []} userMap={userMap} />
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-foreground hidden sm:table-cell">
        {loan.bankName}
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">
        {loan.loanType}
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        {loan.isRejected ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            Rejected
          </span>
        ) : (
          <StageBadge stageIndex={loan.currentStage} />
        )}
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-foreground text-right hidden md:table-cell tabular-nums">
        {formatCurrency(loan.loanAmount)}
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground hidden xl:table-cell whitespace-nowrap">
        {formatDate(loan.updatedAt)}
      </td>
      <td
        className="px-4 py-3"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1 justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate();
            }}
            className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
            aria-label="View loan"
            data-ocid={`loan-view-${loan.id}`}
          >
            <Eye size={15} />
          </button>
          {confirmDelete ? (
            <div className="flex items-center gap-1.5 bg-destructive/10 px-2 py-1 rounded-md">
              <span className="text-xs text-destructive font-semibold">
                Delete?
              </span>
              <button
                type="button"
                onClick={() => onDelete(loan.id)}
                disabled={deleting}
                className="text-xs text-destructive font-bold hover:underline"
                data-ocid={`loan-delete-confirm-${loan.id}`}
              >
                {deleting ? "…" : "Yes"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-muted-foreground hover:underline"
              >
                No
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
              aria-label="Delete loan"
              data-ocid={`loan-delete-${loan.id}`}
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Deleted Loans Table ──────────────────────────────────────────────────────

interface DeletedLoanRowProps {
  loanWithHistory: LoanWithHistory;
  onRestore: (id: number) => void;
  restoring: boolean;
}

function DeletedLoanRow({
  loanWithHistory,
  onRestore,
  restoring,
}: DeletedLoanRowProps) {
  const { loan } = loanWithHistory;
  const [confirmRestore, setConfirmRestore] = useState(false);

  return (
    <tr className="border-b border-border hover:bg-muted/40 transition-smooth">
      <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
        #{loan.id}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-foreground truncate max-w-[140px]">
            {loan.applicantName}
          </p>
          {loan.coApplicantName && (
            <p className="text-xs text-muted-foreground truncate max-w-[140px]">
              Co: {loan.coApplicantName}
            </p>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-foreground hidden sm:table-cell">
        {loan.bankName}
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        {loan.isRejected ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            Rejected
          </span>
        ) : (
          <StageBadge stageIndex={loan.currentStage} />
        )}
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-foreground text-right hidden md:table-cell tabular-nums">
        {formatCurrency(loan.loanAmount)}
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground hidden xl:table-cell whitespace-nowrap">
        {formatDate(loan.updatedAt)}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 justify-end">
          {confirmRestore ? (
            <div
              className="flex items-center gap-1.5 rounded-md px-2 py-1"
              style={{ backgroundColor: "#fff7ed" }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: "#f97316" }}
              >
                Restore?
              </span>
              <button
                type="button"
                onClick={() => onRestore(loan.id)}
                disabled={restoring}
                className="text-xs font-bold hover:underline"
                style={{ color: "#f97316" }}
                data-ocid={`deleted-loan-restore-confirm-${loan.id}`}
              >
                {restoring ? "…" : "Yes"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmRestore(false)}
                className="text-xs text-muted-foreground hover:underline"
              >
                No
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmRestore(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-white transition-smooth hover:opacity-90"
              style={{ backgroundColor: "#F47B30" }}
              aria-label="Restore loan"
              data-ocid={`deleted-loan-restore-${loan.id}`}
            >
              <RotateCcw size={13} />
              Restore
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LoansPage() {
  const parsed = parseHashParams();
  const [activeTab, setActiveTab] = useState<ActiveTab>("loans");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<number | null>(parsed.stage);
  const [namedFilter, setNamedFilter] = useState<NamedFilter>(parsed.filter);
  const [assignedUserFilter, setAssignedUserFilter] = useState<number | null>(
    parsed.assignedUser,
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: usersData } = useAdminGetAllUsers();
  const userMap = new Map<number, string>(
    (usersData ?? []).map((u) => [u.id, u.name]),
  );

  useEffect(() => {
    function onHashChange() {
      const p = parseHashParams();
      setStageFilter(p.stage);
      setNamedFilter(p.filter);
      setAssignedUserFilter(p.assignedUser);
      setPage(1);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // For named "rejected" filter we pass a special negative stage sentinel
  // that the backend understands, or we rely on client-side filter if not supported.
  // We pass stageFilter=null and let assignedUserFilter handle user filter.
  const apiStageFilter: number | null =
    stageFilter !== null ? stageFilter : namedFilterToStage(namedFilter);

  const { data, isLoading, isError } = useAdminGetAllLoans(
    page,
    pageSize,
    debouncedSearch,
    apiStageFilter,
    assignedUserFilter,
  );
  const deleteMutation = useAdminDeleteLoan();
  const {
    data: deletedLoans,
    isLoading: deletedLoading,
    isError: deletedError,
  } = useAdminGetDeletedLoans();
  const restoreMutation = useAdminRestoreLoan();
  const [restoringId, setRestoringId] = useState<number | null>(null);

  async function handleDelete(loanId: number) {
    setDeletingId(loanId);
    try {
      await deleteMutation.mutateAsync(loanId);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleRestore(loanId: number) {
    setRestoringId(loanId);
    try {
      await restoreMutation.mutateAsync(loanId);
    } finally {
      setRestoringId(null);
    }
  }

  function clearFilter() {
    setStageFilter(null);
    setNamedFilter(null);
    setAssignedUserFilter(null);
    window.location.hash = "#/admin/loans";
  }

  // Apply client-side rejected filter if named filter is "rejected"
  const displayedLoans =
    namedFilter === "rejected"
      ? (data?.loans ?? []).filter((lwh) => lwh.loan.isRejected)
      : (data?.loans ?? []);

  const assignedUserName = assignedUserFilter
    ? userMap.get(assignedUserFilter)
    : undefined;
  const activeLabel = getFilterLabel(
    stageFilter,
    namedFilter,
    assignedUserName,
  );
  const hasFilter =
    stageFilter !== null || namedFilter !== null || assignedUserFilter !== null;

  return (
    <>
      {showCreateModal && (
        <CreateLoanModal onClose={() => setShowCreateModal(false)} />
      )}

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Loan Applications
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage all loan applications in the pipeline
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="shrink-0 text-white"
            style={{ backgroundColor: "#f97316", borderColor: "#f97316" }}
            data-ocid="loans-create-btn"
          >
            <Plus size={16} className="mr-1.5" />
            New Loan
          </Button>
        </div>

        {/* Tab Switcher */}
        <div
          className="flex items-center gap-1 border-b border-border"
          data-ocid="loans-tabs"
        >
          <button
            type="button"
            onClick={() => setActiveTab("loans")}
            className={`px-4 py-2.5 text-sm font-medium transition-smooth border-b-2 -mb-px ${
              activeTab === "loans"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="loans-tab-active"
          >
            Active Loans
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("deleted")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-smooth border-b-2 -mb-px ${
              activeTab === "deleted"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="loans-tab-deleted"
          >
            <Trash2 size={13} />
            Deleted
            {(deletedLoans?.length ?? 0) > 0 && (
              <span
                className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full text-white"
                style={{ backgroundColor: "#F47B30" }}
              >
                {deletedLoans!.length > 9 ? "9+" : deletedLoans!.length}
              </span>
            )}
          </button>
        </div>

        {/* ── ACTIVE LOANS TAB ───────────────────────────────────────────── */}
        {activeTab === "loans" && (
          <>
            {/* Active filter badge */}
            {hasFilter && activeLabel && (
              <div
                className="flex items-center gap-2"
                data-ocid="loans-active-filter"
              >
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full"
                  style={{
                    backgroundColor: "#fff7ed",
                    color: "#f97316",
                    border: "1px solid #fed7aa",
                  }}
                >
                  <span>Showing: {activeLabel}</span>
                  <button
                    type="button"
                    onClick={clearFilter}
                    className="ml-1 rounded-full hover:bg-orange-200 transition-smooth p-0.5"
                    aria-label="Clear filter"
                    data-ocid="loans-clear-filter"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              </div>
            )}

            {/* Search + Stage filter + User filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  type="search"
                  placeholder="Search by applicant, mobile, bank..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9"
                  data-ocid="loans-search"
                />
              </div>
              <select
                className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground min-w-[160px]"
                value={stageFilter ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  const newStage = val === "" ? null : Number(val);
                  setStageFilter(newStage);
                  setNamedFilter(null);
                  setPage(1);
                  window.location.hash =
                    val === "" ? "#/admin/loans" : `#/admin/loans?stage=${val}`;
                }}
                data-ocid="loans-stage-filter"
              >
                <option value="">All Stages</option>
                {LOAN_STAGES.map((name, idx) => (
                  <option key={name} value={idx}>
                    {idx + 1}. {name}
                  </option>
                ))}
              </select>
              <select
                className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground min-w-[160px]"
                value={assignedUserFilter ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  const newUserId = val === "" ? null : Number(val);
                  setAssignedUserFilter(newUserId);
                  setPage(1);
                }}
                data-ocid="loans-user-filter"
              >
                <option value="">All Users</option>
                {(usersData ?? []).map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Table */}
            <Card className="shadow-card border border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-muted/60 border-b border-border">
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                        Bank
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                        Type
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                        Stage
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right hidden md:table-cell">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">
                        Updated
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading &&
                      [1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="border-b border-border">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                            <td key={j} className="px-4 py-3">
                              <Skeleton className="h-4 w-full" />
                            </td>
                          ))}
                        </tr>
                      ))}
                    {isError && (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center">
                          <AlertTriangle
                            size={28}
                            className="text-destructive mx-auto mb-2 opacity-70"
                          />
                          <p className="text-sm text-muted-foreground">
                            Failed to load loans. Please refresh.
                          </p>
                        </td>
                      </tr>
                    )}
                    {!isLoading && !isError && displayedLoans.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-16 text-center"
                          data-ocid="loans-empty-state"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                              <Search
                                size={24}
                                className="text-muted-foreground opacity-50"
                              />
                            </div>
                            <p className="text-foreground font-semibold">
                              No loans found
                            </p>
                            <p className="text-sm text-muted-foreground max-w-xs">
                              {debouncedSearch || hasFilter
                                ? "Try adjusting your search or clearing the filter."
                                : "Create your first loan application to get started."}
                            </p>
                            {!debouncedSearch && !hasFilter && (
                              <Button
                                size="sm"
                                onClick={() => setShowCreateModal(true)}
                                className="text-white"
                                style={{ backgroundColor: "#f97316" }}
                              >
                                <Plus size={14} className="mr-1" />
                                New Loan
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                    {!isLoading &&
                      !isError &&
                      displayedLoans.map((lwh) => (
                        <LoanRow
                          key={lwh.loan.id}
                          loanWithHistory={lwh}
                          onDelete={handleDelete}
                          deleting={deletingId === lwh.loan.id}
                          userMap={userMap}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
              {data && data.total > 0 && (
                <CardContent className="px-4 py-3">
                  <Pagination
                    page={page}
                    total={data.total}
                    pageSize={pageSize}
                    onPage={setPage}
                    onPageSize={setPageSize}
                  />
                </CardContent>
              )}
            </Card>
          </>
        )}

        {/* ── DELETED LOANS TAB ─────────────────────────────────────────── */}
        {activeTab === "deleted" && (
          <Card className="shadow-card border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
              <RotateCcw size={14} style={{ color: "#F47B30" }} />
              <p className="text-sm font-medium text-foreground">
                Deleted Loans
              </p>
              <span className="text-xs text-muted-foreground ml-auto">
                Restore a loan to bring it back to the active pipeline
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/60 border-b border-border">
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                      Bank
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                      Stage
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right hidden md:table-cell">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">
                      Deleted On
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deletedLoading &&
                    [1, 2, 3].map((i) => (
                      <tr key={i} className="border-b border-border">
                        {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                          <td key={j} className="px-4 py-3">
                            <Skeleton className="h-4 w-full" />
                          </td>
                        ))}
                      </tr>
                    ))}
                  {deletedError && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center">
                        <AlertTriangle
                          size={28}
                          className="text-destructive mx-auto mb-2 opacity-70"
                        />
                        <p className="text-sm text-muted-foreground">
                          Failed to load deleted loans. Please refresh.
                        </p>
                      </td>
                    </tr>
                  )}
                  {!deletedLoading &&
                    !deletedError &&
                    (deletedLoans ?? []).length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-16 text-center"
                          data-ocid="deleted-loans-empty-state"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                              <Trash2
                                size={24}
                                className="text-muted-foreground opacity-50"
                              />
                            </div>
                            <p className="text-foreground font-semibold">
                              No deleted loans
                            </p>
                            <p className="text-sm text-muted-foreground max-w-xs">
                              Loans you delete will appear here and can be
                              restored at any time.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  {!deletedLoading &&
                    !deletedError &&
                    (deletedLoans ?? []).map((lwh) => (
                      <DeletedLoanRow
                        key={lwh.loan.id}
                        loanWithHistory={lwh}
                        onRestore={handleRestore}
                        restoring={restoringId === lwh.loan.id}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
