import { Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAdminUpdateAdminMobile } from "../../hooks/useQueries";

export default function AdminSettingsPage() {
  const [newMobile, setNewMobile] = useState("");
  const [confirmMobile, setConfirmMobile] = useState("");
  const updateMobile = useAdminUpdateAdminMobile();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newMobile.length !== 10 || !/^\d{10}$/.test(newMobile)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    if (newMobile !== confirmMobile) {
      toast.error("Mobile numbers do not match");
      return;
    }
    const result = await updateMobile.mutateAsync(newMobile);
    if (result.ok) {
      toast.success("Admin mobile number updated successfully");
      setNewMobile("");
      setConfirmMobile("");
    } else {
      toast.error(result.err ?? "Failed to update mobile");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "#F47B3022" }}
        >
          <Settings size={18} style={{ color: "#F47B30" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage admin account settings
          </p>
        </div>
      </div>

      {/* Update Mobile Card */}
      <div className="bg-card border rounded-xl p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-foreground">
            Update Admin Mobile Number
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Use this to update your login mobile number. Your current number is
            hidden for security.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="new-mobile"
              className="text-sm font-medium text-foreground"
            >
              New Mobile Number
            </label>
            <input
              id="new-mobile"
              type="tel"
              inputMode="numeric"
              value={newMobile}
              onChange={(e) =>
                setNewMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Enter 10-digit mobile"
              className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="settings-new-mobile"
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="confirm-mobile"
              className="text-sm font-medium text-foreground"
            >
              Confirm Mobile Number
            </label>
            <input
              id="confirm-mobile"
              type="tel"
              inputMode="numeric"
              value={confirmMobile}
              onChange={(e) =>
                setConfirmMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Re-enter mobile number"
              className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2"
              data-ocid="settings-confirm-mobile"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updateMobile.isPending}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-smooth disabled:opacity-60"
            style={{ backgroundColor: "#F47B30" }}
            data-ocid="settings-save-mobile"
          >
            {updateMobile.isPending ? "Updating…" : "Update Mobile Number"}
          </button>
        </form>
      </div>

      {/* Security note */}
      <div className="bg-muted/40 border rounded-xl p-4 flex gap-3 items-start">
        <span className="text-lg">🔐</span>
        <div>
          <p className="text-sm font-medium text-foreground">Security Note</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Admin mobile number is never displayed in the UI or returned in any
            API response. After updating, use your new mobile number to log in.
          </p>
        </div>
      </div>
    </div>
  );
}
