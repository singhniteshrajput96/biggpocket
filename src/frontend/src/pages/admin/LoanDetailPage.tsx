import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileText,
  FolderOpen,
  Loader2,
  Pencil,
  Printer,
  Save,
  Trash2,
  Upload,
  UserMinus,
  UserPlus,
  X,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import { LOAN_STAGES } from "../../constants/stages";
import {
  useAdminAddDocument,
  useAdminAddUserToLoan,
  useAdminDeleteDocument,
  useAdminDeleteLoan,
  useAdminGetAllUsers,
  useAdminGetLoanDocuments,
  useAdminRejectLoan,
  useAdminRemoveUserFromLoan,
  useAdminUnrejectLoan,
  useAdminUpdateLoan,
  useAdminUpdateStage,
  useGetLoanById,
} from "../../hooks/useQueries";
import { useStorageUpload } from "../../hooks/useStorageUpload";
import type {
  Document,
  LoanApplication,
  LoanStageHistory,
  PublicUser,
} from "../../types";

interface LoanDetailPageProps {
  loanId: number;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatTs(ts: number): string {
  return new Date(ts / 1_000_000).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
}

// ─── Stage Badge ──────────────────────────────────────────────────────────────

function StageBadge({
  stageIndex,
  size = "md",
}: { stageIndex: number; size?: "sm" | "md" }) {
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-indigo-100 text-indigo-700",
    "bg-violet-100 text-violet-700",
    "bg-purple-100 text-purple-700",
    "bg-amber-100 text-amber-700",
    "bg-orange-100 text-orange-700",
    "bg-green-100 text-green-700",
    "bg-teal-100 text-teal-700",
    "bg-cyan-100 text-cyan-700",
    "bg-emerald-100 text-emerald-700",
  ];
  const cls =
    size === "sm"
      ? "px-2 py-0.5 rounded-full text-xs font-semibold"
      : "px-3 py-1 rounded-full text-sm font-semibold";
  return (
    <span
      className={`inline-flex items-center ${cls} ${colors[stageIndex] ?? "bg-muted text-foreground"}`}
    >
      {LOAN_STAGES[stageIndex] ?? `Stage ${stageIndex + 1}`}
    </span>
  );
}

// ─── Reject Loan Modal ────────────────────────────────────────────────────────

function RejectLoanModal({
  loanId,
  onClose,
}: { loanId: number; onClose: () => void }) {
  const [reason, setReason] = useState("");
  const [err, setErr] = useState("");
  const rejectMutation = useAdminRejectLoan();

  async function handleReject() {
    if (!reason.trim()) {
      setErr("Rejection reason is required.");
      return;
    }
    setErr("");
    try {
      await rejectMutation.mutateAsync({
        loan_id: loanId,
        reason: reason.trim(),
      });
      onClose();
    } catch (e) {
      setErr((e as Error).message ?? "Failed to reject loan.");
    }
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-card rounded-xl shadow-elevated border border-border p-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <XCircle size={18} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Mark Loan #{loanId} as Rejected
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                This can be undone later. Provide a reason.
              </p>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Rejection Reason <span className="text-destructive">*</span>
            </Label>
            <Textarea
              placeholder="e.g. Credit score below threshold, incomplete documentation..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setErr("");
              }}
              rows={3}
              data-ocid="reject-reason-input"
            />
          </div>
          {err && (
            <p className="text-sm text-destructive flex items-center gap-1.5">
              <AlertTriangle size={13} />
              {err}
            </p>
          )}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={rejectMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 text-white bg-red-600 hover:bg-red-700 border-red-600"
              onClick={handleReject}
              disabled={rejectMutation.isPending}
              data-ocid="reject-confirm-btn"
            >
              {rejectMutation.isPending ? (
                <Loader2 size={14} className="animate-spin mr-1" />
              ) : (
                <XCircle size={14} className="mr-1" />
              )}
              Mark Rejected
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Add User to Loan Modal ───────────────────────────────────────────────────

function AddUserModal({
  loanId,
  existingUserIds,
  allUsers,
  onClose,
}: {
  loanId: number;
  existingUserIds: number[];
  allUsers: PublicUser[];
  onClose: () => void;
}) {
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const addMutation = useAdminAddUserToLoan();

  // Filter users not already assigned, and match mobile if typed
  const availableUsers = allUsers.filter(
    (u) => !existingUserIds.includes(u.id) && u.role !== "admin",
  );

  async function handleAdd(userId: number) {
    setErr("");
    try {
      await addMutation.mutateAsync({ loan_id: loanId, user_id: userId });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 800);
    } catch (e) {
      setErr((e as Error).message ?? "Failed to add user.");
    }
  }

  const filtered = mobile.trim()
    ? availableUsers.filter((u) =>
        u.name.toLowerCase().includes(mobile.toLowerCase()),
      )
    : availableUsers;

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-card rounded-xl shadow-elevated border border-border animate-fade-in">
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
            <h2 className="text-base font-display font-semibold text-foreground">
              Add User to Loan
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-md"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <div className="px-5 py-4 space-y-3">
            <Input
              placeholder="Search by name..."
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              data-ocid="add-user-search"
            />
            {success && (
              <p
                className="text-sm flex items-center gap-1.5"
                style={{ color: "#22c55e" }}
              >
                <CheckCircle size={13} />
                User added successfully
              </p>
            )}
            {err && (
              <p className="text-sm text-destructive flex items-center gap-1.5">
                <AlertTriangle size={13} />
                {err}
              </p>
            )}
            <div className="max-h-56 overflow-y-auto space-y-1">
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">
                  {availableUsers.length === 0
                    ? "All users are already assigned."
                    : "No users match your search."}
                </p>
              )}
              {filtered.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted transition-smooth text-left"
                  onClick={() => handleAdd(u.id)}
                  disabled={addMutation.isPending}
                  data-ocid={`add-user-${u.id}`}
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {u.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {u.role}
                    </p>
                  </div>
                  <UserPlus
                    size={14}
                    className="text-muted-foreground shrink-0"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Loan Info Card ───────────────────────────────────────────────────────────

interface LoanInfoProps {
  loan: LoanApplication;
  loanId: number;
}

function LoanInfoCard({ loan, loanId }: LoanInfoProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    applicantName: loan.applicantName,
    bankName: loan.bankName,
    loanType: loan.loanType,
    loanAmount: String(loan.loanAmount),
    coApplicantName: loan.coApplicantName ?? "",
    distributionPartner: loan.distributionPartner ?? "",
    employmentType: loan.employmentType ?? "",
    income: loan.income ? String(loan.income) : "",
    propertyType: loan.propertyType ?? "",
    propertyValue: loan.propertyValue ? String(loan.propertyValue) : "",
  });
  const [err, setErr] = useState("");
  const updateLoan = useAdminUpdateLoan();

  async function handleSave() {
    const amt = Number(form.loanAmount);
    if (
      !form.applicantName.trim() ||
      !form.bankName.trim() ||
      !form.loanType.trim()
    ) {
      setErr("Applicant name, bank name, and loan type are required.");
      return;
    }
    if (Number.isNaN(amt) || amt <= 0) {
      setErr("Enter a valid loan amount.");
      return;
    }
    setErr("");
    try {
      await updateLoan.mutateAsync({
        loanId,
        applicantName: form.applicantName.trim(),
        bankName: form.bankName.trim(),
        loanType: form.loanType.trim(),
        loanAmount: amt,
      });
      setEditing(false);
    } catch (e) {
      setErr((e as Error).message ?? "Failed to save changes.");
    }
  }

  type EditableKey = keyof typeof form;

  function textField(
    key: EditableKey,
    label: string,
    display: string,
    type = "text",
  ) {
    return (
      <div className="space-y-1" key={key}>
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </Label>
        {editing ? (
          <Input
            value={form[key]}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            type={type}
            data-ocid={`detail-edit-${key}`}
          />
        ) : (
          <p className="text-sm font-medium text-foreground">
            {display || "—"}
          </p>
        )}
      </div>
    );
  }

  return (
    <Card className="shadow-card border border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-display font-semibold">
            Loan Information
          </CardTitle>
          {editing ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  setErr("");
                }}
              >
                <X size={14} className="mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={updateLoan.isPending}
                className="text-white"
                style={{ backgroundColor: "#f97316" }}
                data-ocid="detail-save-btn"
              >
                {updateLoan.isPending ? (
                  <Loader2 size={14} className="animate-spin mr-1" />
                ) : (
                  <Save size={14} className="mr-1" />
                )}
                Save
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(true)}
              data-ocid="detail-edit-btn"
            >
              <Pencil size={14} className="mr-1" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Meta row */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Loan ID
            </p>
            <p className="text-sm font-mono font-semibold text-foreground">
              #{loan.id}
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Created
            </p>
            <p className="text-sm text-foreground">
              {formatTs(loan.createdAt)}
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Last Updated
            </p>
            <p className="text-sm text-foreground">
              {formatTs(loan.updatedAt)}
            </p>
          </div>
          {loan.rejectionStage !== undefined && (
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Rejected at Stage
              </p>
              <p className="text-sm text-foreground">
                {LOAN_STAGES[loan.rejectionStage] ??
                  `Stage ${loan.rejectionStage + 1}`}
              </p>
            </div>
          )}
        </div>

        {/* Core fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
          {textField("applicantName", "Applicant Name", loan.applicantName)}
          {textField(
            "coApplicantName",
            "Co-Applicant Name",
            loan.coApplicantName ?? "",
          )}
          {textField("bankName", "Bank Name", loan.bankName)}
          {textField("loanType", "Loan Type", loan.loanType)}
          {textField(
            "loanAmount",
            "Loan Amount (₹)",
            formatCurrency(loan.loanAmount),
            "number",
          )}
          {textField(
            "distributionPartner",
            "Distribution Partner",
            loan.distributionPartner ?? "",
          )}
        </div>

        {/* Applicant & property details */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Applicant Details
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Employment Type
              </Label>
              {editing ? (
                <select
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                  value={form.employmentType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, employmentType: e.target.value }))
                  }
                  data-ocid="detail-edit-employmentType"
                >
                  <option value="">Select type</option>
                  <option value="Salary">Salaried</option>
                  <option value="Business">Business / Self-Employed</option>
                </select>
              ) : (
                <p className="text-sm font-medium text-foreground">
                  {loan.employmentType || "—"}
                </p>
              )}
            </div>
            {textField(
              "income",
              "Monthly Income (₹)",
              loan.income ? formatCurrency(loan.income) : "—",
              "number",
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Property Details
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {textField(
              "propertyType",
              "Property Type",
              loan.propertyType ?? "",
            )}
            {textField(
              "propertyValue",
              "Market Value (₹)",
              loan.propertyValue ? formatCurrency(loan.propertyValue) : "—",
              "number",
            )}
          </div>
        </div>

        {err && (
          <p className="text-sm text-destructive flex items-center gap-1.5">
            <AlertTriangle size={13} />
            {err}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Assigned Users Card ──────────────────────────────────────────────────────

function AssignedUsersCard({
  loanId,
  assignedUserIds,
}: {
  loanId: number;
  assignedUserIds: number[];
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data: allUsers = [] } = useAdminGetAllUsers();
  const removeMutation = useAdminRemoveUserFromLoan();
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [err, setErr] = useState("");

  const userMap = new Map(allUsers.map((u) => [u.id, u]));

  async function handleRemove(userId: number) {
    setRemovingId(userId);
    setErr("");
    try {
      await removeMutation.mutateAsync({ loan_id: loanId, user_id: userId });
    } catch (e) {
      setErr((e as Error).message ?? "Failed to remove user.");
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <>
      {showAddModal && (
        <AddUserModal
          loanId={loanId}
          existingUserIds={assignedUserIds}
          allUsers={allUsers}
          onClose={() => setShowAddModal(false)}
        />
      )}
      <Card className="shadow-card border border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
              <UserPlus size={16} style={{ color: "#3b82f6" }} />
              Assigned Users
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAddModal(true)}
              data-ocid="detail-add-user-btn"
            >
              <UserPlus size={13} className="mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {assignedUserIds.length === 0 ? (
            <p className="text-sm text-muted-foreground italic py-2 text-center">
              No users assigned yet.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {assignedUserIds.map((uid) => {
                const user = userMap.get(uid);
                return (
                  <div
                    key={uid}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: "#eff6ff", color: "#1d4ed8" }}
                  >
                    <span>{user?.name ?? `User #${uid}`}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(uid)}
                      disabled={removingId === uid}
                      className="rounded-full hover:bg-blue-200 transition-smooth p-0.5 ml-0.5"
                      aria-label={`Remove ${user?.name ?? uid}`}
                      data-ocid={`remove-user-${uid}`}
                    >
                      {removingId === uid ? (
                        <Loader2 size={10} className="animate-spin" />
                      ) : (
                        <UserMinus size={10} />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {err && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertTriangle size={11} />
              {err}
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}

// ─── Reject / Unreject Card ───────────────────────────────────────────────────

function RejectActionCard({ loan }: { loan: LoanApplication }) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [err, setErr] = useState("");
  const unrejectMutation = useAdminUnrejectLoan();

  async function handleUnreject() {
    setErr("");
    try {
      await unrejectMutation.mutateAsync(loan.id);
    } catch (e) {
      setErr((e as Error).message ?? "Failed to remove rejection.");
    }
  }

  return (
    <>
      {showRejectModal && (
        <RejectLoanModal
          loanId={loan.id}
          onClose={() => setShowRejectModal(false)}
        />
      )}
      <Card className="shadow-card border border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
            <XCircle size={16} className="text-red-600" />
            Rejection Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loan.isRejected ? (
            <>
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 space-y-1">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider">
                  Loan Rejected
                </p>
                {loan.rejectionReason && (
                  <p className="text-sm text-red-800">{loan.rejectionReason}</p>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleUnreject}
                disabled={unrejectMutation.isPending}
                data-ocid="detail-unreject-btn"
              >
                {unrejectMutation.isPending ? (
                  <Loader2 size={13} className="animate-spin mr-1" />
                ) : (
                  <CheckCircle size={13} className="mr-1" />
                )}
                Remove Rejection
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              className="w-full text-white bg-red-600 hover:bg-red-700 border-red-600"
              onClick={() => setShowRejectModal(true)}
              data-ocid="detail-reject-btn"
            >
              <XCircle size={13} className="mr-1" />
              Mark as Rejected
            </Button>
          )}
          {err && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertTriangle size={11} />
              {err}
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}

// ─── Stage Update ─────────────────────────────────────────────────────────────

function StageUpdateCard({
  loanId,
  currentStage,
}: { loanId: number; currentStage: number }) {
  const [selectedStage, setSelectedStage] = useState(currentStage);
  const [remarks, setRemarks] = useState("");
  const [showToUser, setShowToUser] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const updateStage = useAdminUpdateStage();

  async function handleUpdate() {
    setErr("");
    setSuccess(false);
    try {
      await updateStage.mutateAsync({
        loanId,
        stageIndex: selectedStage,
        remarks,
        showRemarks: showToUser,
      });
      setSuccess(true);
      setRemarks("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setErr((e as Error).message ?? "Failed to update stage.");
    }
  }

  return (
    <Card className="shadow-card border border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
          <ChevronDown size={16} style={{ color: "#f97316" }} />
          Update Stage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Current Stage
          </Label>
          <StageBadge stageIndex={currentStage} />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Move to Stage
          </Label>
          <select
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
            value={selectedStage}
            onChange={(e) => setSelectedStage(Number(e.target.value))}
            data-ocid="detail-stage-select"
          >
            {LOAN_STAGES.map((name, idx) => (
              <option key={name} value={idx}>
                {idx + 1}. {name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Remarks
          </Label>
          <Textarea
            placeholder="Optional remarks about this stage update..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={3}
            data-ocid="detail-remarks"
          />
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <div
            className="w-9 h-5 rounded-full transition-smooth relative"
            style={{ backgroundColor: showToUser ? "#f97316" : "#e2e8f0" }}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-smooth ${showToUser ? "left-4" : "left-0.5"}`}
            />
            <input
              type="checkbox"
              className="sr-only"
              checked={showToUser}
              onChange={(e) => setShowToUser(e.target.checked)}
              data-ocid="detail-show-remarks-toggle"
            />
          </div>
          <div className="flex items-center gap-1.5 text-sm text-foreground">
            {showToUser ? (
              <Eye size={14} style={{ color: "#f97316" }} />
            ) : (
              <EyeOff size={14} className="text-muted-foreground" />
            )}
            Show remarks to user
          </div>
        </label>

        {err && (
          <p className="text-sm text-destructive flex items-center gap-1.5">
            <AlertTriangle size={13} />
            {err}
          </p>
        )}
        {success && (
          <p
            className="text-sm flex items-center gap-1.5"
            style={{ color: "#22c55e" }}
          >
            <CheckCircle size={13} />
            Stage updated successfully
          </p>
        )}

        <Button
          className="w-full text-white"
          onClick={handleUpdate}
          disabled={updateStage.isPending}
          style={{ backgroundColor: "#f97316", borderColor: "#f97316" }}
          data-ocid="detail-update-stage-btn"
        >
          {updateStage.isPending ? (
            <Loader2 size={14} className="animate-spin mr-1.5" />
          ) : (
            <ChevronDown size={14} className="mr-1.5" />
          )}
          Update Stage
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Stage Progress Bar ───────────────────────────────────────────────────────

function StageProgressBar({
  currentStage,
  isRejected,
}: { currentStage: number; isRejected?: boolean }) {
  return (
    <Card
      className={`shadow-card border bg-card print:shadow-none ${isRejected ? "border-red-300" : "border-border"}`}
    >
      <CardContent className="px-5 py-4">
        {isRejected && (
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-red-100 border border-red-200 px-3 py-2">
            <XCircle size={16} className="text-red-600 shrink-0" />
            <p className="text-sm font-semibold text-red-700">
              This loan has been rejected
            </p>
          </div>
        )}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {LOAN_STAGES.map((name, idx) => {
            const isDone = idx < currentStage;
            const isCurrent = idx === currentStage;
            return (
              <div key={name} className="flex items-center shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
                      isDone
                        ? "text-white"
                        : isCurrent
                          ? "text-white ring-2 ring-offset-1"
                          : "bg-muted text-muted-foreground"
                    }`}
                    style={
                      isDone
                        ? {
                            backgroundColor: isRejected ? "#ef4444" : "#22c55e",
                          }
                        : isCurrent
                          ? {
                              backgroundColor: isRejected
                                ? "#ef4444"
                                : "#f97316",
                            }
                          : {}
                    }
                  >
                    {isDone ? <CheckCircle size={12} /> : idx + 1}
                  </div>
                  <span
                    className={`text-[9px] font-medium text-center leading-tight max-w-[52px] truncate ${
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {name}
                  </span>
                </div>
                {idx < LOAN_STAGES.length - 1 && (
                  <div
                    className="w-4 h-0.5 mx-0.5 mb-4 shrink-0 rounded"
                    style={{
                      backgroundColor:
                        idx < currentStage
                          ? isRejected
                            ? "#fca5a5"
                            : "#22c55e"
                          : "#e2e8f0",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── History Timeline ─────────────────────────────────────────────────────────

function HistoryTimeline({ history }: { history: LoanStageHistory[] }) {
  return (
    <Card className="shadow-card border border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display font-semibold">
          Stage History
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        {history.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No stage history yet.
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-3.5 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-0">
              {[...history].reverse().map((item, i) => (
                <div
                  key={item.id}
                  className="relative flex gap-4 pl-10 pb-6 last:pb-0"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div
                    className="absolute left-2 top-0.5 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                    style={{
                      backgroundColor:
                        item.stageIndex >= 7 ? "#22c55e" : "#f97316",
                    }}
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">
                          {item.stageName}
                        </span>
                        {item.showRemarksToUser ? (
                          <Badge
                            variant="secondary"
                            className="text-xs h-4 px-1.5 gap-0.5"
                          >
                            <Eye size={9} />
                            Visible
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-xs h-4 px-1.5 gap-0.5 text-muted-foreground"
                          >
                            <EyeOff size={9} />
                            Internal
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTs(item.timestamp)}
                      </span>
                    </div>
                    {item.remarks && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.remarks}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Updated by Admin #{item.updatedByAdminId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Documents Section ────────────────────────────────────────────────────────

function DocumentRow({
  doc,
  onDelete,
  deleting,
}: {
  doc: Document;
  onDelete: (doc: Document) => void;
  deleting: boolean;
}) {
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
      className="flex items-center gap-3 py-3 px-4 rounded-lg border border-border bg-background hover:bg-muted/30 transition-colors group"
      data-ocid="doc-row"
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
          {formatFileSize(doc.file_size)} · {formatTs(doc.uploaded_at)}
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
          data-ocid="doc-view-btn"
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
          data-ocid="doc-download-btn"
        >
          <Download size={13} />
          Download
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onDelete(doc)}
          disabled={deleting}
          aria-label={`Delete ${doc.file_name}`}
          data-ocid="doc-delete-btn"
        >
          {deleting ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Trash2 size={13} />
          )}
        </Button>
      </div>
    </div>
  );
}

function DocumentsSection({ loanId }: { loanId: number }) {
  const { data: docs = [], isLoading } = useAdminGetLoanDocuments(loanId);
  const addDoc = useAdminAddDocument();
  const deleteDoc = useAdminDeleteDocument();
  const { uploadFile } = useStorageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadErr, setUploadErr] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Document | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadErr("");
    setUploadProgress(0);
    try {
      const url = await uploadFile(file, (pct) => setUploadProgress(pct));
      await addDoc.mutateAsync({
        loan_id: loanId,
        file_url: url,
        file_name: file.name,
        file_size: file.size,
      });
      setUploadProgress(null);
    } catch (err) {
      setUploadErr(
        (err as Error).message ?? "Upload failed. Please try again.",
      );
      setUploadProgress(null);
    }
  }

  async function handleConfirmDelete() {
    if (!confirmDelete) return;
    setDeletingId(confirmDelete.id);
    setConfirmDelete(null);
    try {
      await deleteDoc.mutateAsync({
        doc_id: confirmDelete.id,
        loan_id: loanId,
      });
    } catch {
      // user can retry
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <Card className="shadow-card border border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
              <FolderOpen size={16} style={{ color: "#f97316" }} />
              Documents
              {docs.length > 0 && (
                <Badge
                  variant="secondary"
                  className="text-xs h-5 px-1.5 font-normal"
                >
                  {docs.length}
                </Badge>
              )}
            </CardTitle>
            <Button
              size="sm"
              className="text-white gap-1.5 shrink-0"
              style={{ backgroundColor: "#f97316" }}
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadProgress !== null}
              data-ocid="doc-upload-btn"
            >
              {uploadProgress !== null ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Upload size={13} />
              )}
              Upload
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              aria-label="Upload document"
              data-ocid="doc-file-input"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {uploadProgress !== null && (
            <div className="space-y-1.5 p-3 rounded-lg bg-muted/40 border border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Loader2
                    size={12}
                    className="animate-spin"
                    style={{ color: "#f97316" }}
                  />
                  Uploading…
                </span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-1.5" />
            </div>
          )}
          {uploadErr && (
            <p className="text-sm text-destructive flex items-center gap-1.5">
              <AlertTriangle size={13} />
              {uploadErr}
            </p>
          )}
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2].map((n) => (
                <Skeleton key={n} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : docs.length === 0 ? (
            <button
              type="button"
              className="w-full py-8 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="doc-empty-state"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#fff7ed" }}
              >
                <FolderOpen size={18} style={{ color: "#f97316" }} />
              </div>
              <p className="text-sm font-medium text-foreground">
                No documents yet
              </p>
              <p className="text-xs text-muted-foreground">
                Click to upload the first document
              </p>
            </button>
          ) : (
            <div className="space-y-2">
              {docs.map((doc) => (
                <DocumentRow
                  key={doc.id}
                  doc={doc}
                  onDelete={(d) => setConfirmDelete(d)}
                  deleting={deletingId === doc.id}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
          <div className="w-full max-w-sm bg-card rounded-xl shadow-elevated border border-border p-6 space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <Trash2 size={18} className="text-destructive" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Delete "{confirmDelete.file_name}"?
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleConfirmDelete}
                data-ocid="doc-delete-confirm"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Delete Confirmation ──────────────────────────────────────────────────────

function DeleteConfirm({
  loanId,
  onCancel,
}: { loanId: number; onCancel: () => void }) {
  const deleteMutation = useAdminDeleteLoan();

  async function handleDelete() {
    try {
      await deleteMutation.mutateAsync(loanId);
      window.location.hash = "#/admin/loans";
    } catch {
      // user can retry
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="w-full max-w-sm bg-card rounded-xl shadow-elevated border border-border p-6 space-y-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-destructive" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Delete Loan #{loanId}?
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              This action cannot be undone. All history will be lost.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onCancel}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            data-ocid="detail-delete-confirm"
          >
            {deleteMutation.isPending ? (
              <Loader2 size={14} className="animate-spin mr-1" />
            ) : (
              <Trash2 size={14} className="mr-1" />
            )}
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-16 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 space-y-5">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
        </div>
        <div className="space-y-5">
          <Skeleton className="h-36 rounded-xl" />
          <Skeleton className="h-60 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LoanDetailPage({ loanId }: LoanDetailPageProps) {
  const { data, isLoading, isError } = useGetLoanById(loanId);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) return <DetailSkeleton />;

  if (isError || !data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <AlertTriangle
          size={40}
          className="text-destructive mx-auto mb-3 opacity-70"
        />
        <p className="text-foreground font-semibold">
          Failed to load loan details
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          The loan may not exist or you may not have access.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => {
            window.location.hash = "#/admin/loans";
          }}
        >
          <ArrowLeft size={14} className="mr-1" />
          Back to Loans
        </Button>
      </div>
    );
  }

  const { loan, history, assignedUserIds } = data;

  return (
    <>
      {showDeleteConfirm && (
        <DeleteConfirm
          loanId={loanId}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5 animate-fade-in print:px-0 print:py-0">
        {/* ── Breadcrumb ── */}
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground print:hidden"
          aria-label="Breadcrumb"
        >
          <button
            type="button"
            className="hover:text-primary transition-smooth font-medium"
            onClick={() => {
              window.location.hash = "#/admin/dashboard";
            }}
          >
            BiggPocket
          </button>
          <ChevronRight size={13} className="shrink-0" />
          <button
            type="button"
            className="hover:text-primary transition-smooth font-medium"
            onClick={() => {
              window.location.hash = "#/admin/loans";
            }}
          >
            Loans
          </button>
          <ChevronRight size={13} className="shrink-0" />
          <span className="text-foreground font-semibold truncate max-w-[200px]">
            {loan.applicantName}
          </span>
        </nav>

        {/* ── Rejection banner ── */}
        {loan.isRejected && (
          <div
            className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3"
            data-ocid="rejection-banner"
          >
            <XCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-red-700 uppercase tracking-wide">
                Loan Rejected
              </p>
              {loan.rejectionReason && (
                <p className="text-sm text-red-800 mt-0.5 break-words">
                  {loan.rejectionReason}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── Page header ── */}
        <div className="flex flex-wrap items-start justify-between gap-3 print:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                window.location.hash = "#/admin/loans";
              }}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Back to loans"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-display font-bold text-foreground leading-none">
                  Loan #{loanId}
                </h1>
                {loan.isRejected ? (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                    Rejected
                  </span>
                ) : (
                  <StageBadge stageIndex={loan.currentStage} size="sm" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {loan.applicantName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              data-ocid="detail-print-btn"
            >
              <Printer size={14} className="mr-1.5" />
              Print
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              data-ocid="detail-delete-btn"
            >
              <Trash2 size={14} className="mr-1.5" />
              Delete
            </Button>
          </div>
        </div>

        {/* ── Stage progress bar ── */}
        <StageProgressBar
          currentStage={loan.currentStage}
          isRejected={loan.isRejected}
        />

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-5">
            <LoanInfoCard loan={loan} loanId={loanId} />
            <DocumentsSection loanId={loanId} />
            <HistoryTimeline history={history} />
          </div>
          <div className="space-y-5">
            <AssignedUsersCard
              loanId={loanId}
              assignedUserIds={assignedUserIds ?? []}
            />
            <StageUpdateCard loanId={loanId} currentStage={loan.currentStage} />
            <RejectActionCard loan={loan} />
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </>
  );
}
