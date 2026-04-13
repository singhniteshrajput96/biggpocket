import { useActor } from "@caffeineai/core-infrastructure";
import { AlertCircle, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { createActor } from "../backend";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { sendOTP, verifyOTP } from "../lib/api";
import { setSession } from "../lib/auth";

const BRAND_ORANGE = "#F47B30";
const BRAND_BLUE = "#1E5FA8";
const BRAND_NAVY = "#0f172a";

type Step = "mobile" | "otp";

export default function LoginPage() {
  const { actor } = useActor(createActor);
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpDisplay, setOtpDisplay] = useState<string | null>(null);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  async function handleSendOTP(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[0-9]{10}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!actor) {
      setError("Connecting to server, please wait…");
      return;
    }
    setLoading(true);
    try {
      const returnedOtp = await sendOTP(actor, mobile);
      setOtpDisplay(returnedOtp.replace(/\D/g, ""));
      setStep("otp");
      setTimeout(() => otpRef.current?.focus(), 100);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send OTP. Try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOTP(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[0-9]{6}$/.test(otp)) {
      setError("Enter the 6-digit OTP.");
      return;
    }
    if (!actor) {
      setError("Connecting to server, please wait…");
      return;
    }
    setLoading(true);
    try {
      const session = await verifyOTP(actor, mobile, otp);
      setSession(session);
      if (session.role === "admin") {
        window.location.hash = "#/admin/dashboard";
      } else {
        window.location.hash = "#/tracker/loans";
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="h-14 flex items-center px-6 shadow-sm border-b border-white/10"
        style={{ backgroundColor: BRAND_NAVY }}
      >
        <div className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="BiggPocket"
            className="h-9 w-auto object-contain"
            style={{ maxWidth: 160 }}
          />
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo hero */}
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-elevated overflow-hidden"
              style={{ backgroundColor: BRAND_NAVY }}
            >
              <img
                src="/assets/logo.png"
                alt="BiggPocket"
                className="h-12 w-12 object-contain"
              />
            </div>
            <h2 className="font-display font-bold text-foreground text-2xl">
              BiggPocket
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Loan Application Tracker
            </p>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-xl shadow-elevated overflow-hidden animate-fade-in">
            {/* Card Header */}
            <div
              className="px-6 pt-5 pb-4 border-b border-border"
              style={{
                background: "linear-gradient(135deg, #fff7ed 0%, #eff6ff 100%)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor:
                      step === "mobile" ? BRAND_BLUE : BRAND_ORANGE,
                  }}
                >
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-foreground text-xl leading-none">
                    {step === "mobile" ? "Welcome Back" : "Verify OTP"}
                  </h1>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Secure login to your account
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {step === "mobile"
                  ? "Enter your registered mobile number to receive a one-time password."
                  : `OTP sent to +91 ${mobile}. Enter it below to sign in.`}
              </p>
            </div>

            {/* Card Body */}
            <div className="px-6 py-6">
              {/* OTP Display box */}
              {otpDisplay && (
                <div
                  className="mb-5 p-3 rounded-lg border text-sm flex items-center justify-between"
                  style={{ backgroundColor: "#fff7ed", borderColor: "#fed7aa" }}
                  data-ocid="otp-display"
                >
                  <div>
                    <p
                      className="text-xs font-medium mb-0.5"
                      style={{ color: "#c2410c" }}
                    >
                      Your OTP (simulation — no real SMS)
                    </p>
                    <p
                      className="font-mono font-bold text-2xl tracking-widest"
                      style={{ color: BRAND_ORANGE }}
                    >
                      {showOtp ? otpDisplay : "••••••"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowOtp(!showOtp)}
                    className="p-1.5 rounded-md hover:bg-orange-100 transition-smooth"
                    style={{ color: "#c2410c" }}
                    aria-label={showOtp ? "Hide OTP" : "Show OTP"}
                  >
                    {showOtp ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              )}

              {/* Error */}
              {error && (
                <div
                  className="mb-4 p-3 rounded-lg border text-sm flex items-start gap-2"
                  style={{
                    backgroundColor: "#fef2f2",
                    borderColor: "#fecaca",
                    color: "#dc2626",
                  }}
                  data-ocid="login-error"
                >
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {step === "mobile" ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="mobile"
                      className="text-sm font-medium text-foreground"
                    >
                      Mobile Number
                    </Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm font-medium">
                        +91
                      </span>
                      <Input
                        id="mobile"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="9999999999"
                        value={mobile}
                        onChange={(e) =>
                          setMobile(
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                        className="rounded-l-none"
                        autoFocus
                        data-ocid="mobile-input"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Admin demo:{" "}
                      <button
                        type="button"
                        className="font-mono font-semibold text-primary hover:underline"
                        onClick={() => setMobile("9999999999")}
                      >
                        9999999999
                      </button>
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full font-semibold text-white"
                    disabled={loading || !actor}
                    style={{
                      backgroundColor: BRAND_ORANGE,
                      borderColor: BRAND_ORANGE,
                    }}
                    data-ocid="send-otp-btn"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" /> Sending
                        OTP…
                      </span>
                    ) : !actor ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />{" "}
                        Connecting…
                      </span>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="otp"
                      className="text-sm font-medium text-foreground"
                    >
                      One-Time Password
                    </Label>
                    <Input
                      id="otp"
                      ref={otpRef}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      className="tracking-widest text-center text-xl font-mono"
                      data-ocid="otp-input"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full font-semibold text-white"
                    disabled={loading}
                    style={{
                      backgroundColor: BRAND_ORANGE,
                      borderColor: BRAND_ORANGE,
                    }}
                    data-ocid="verify-otp-btn"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />{" "}
                        Verifying…
                      </span>
                    ) : (
                      "Verify & Sign In"
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("mobile");
                      setOtp("");
                      setOtpDisplay(null);
                      setError(null);
                    }}
                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    data-ocid="back-to-mobile"
                  >
                    ← Change mobile number
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="mt-4 text-center space-y-1">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} BiggPocket. Secure loan tracking
              platform.
            </p>
            <div className="flex items-center justify-center gap-3 text-xs">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white font-medium"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                DSA Platform
              </span>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white font-medium"
                style={{ backgroundColor: BRAND_ORANGE }}
              >
                10-Stage Tracker
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
