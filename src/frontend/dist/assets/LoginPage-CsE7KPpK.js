import { r as reactExports, j as jsxRuntimeExports, s as setSession } from "./index-Z0A2bhGv.js";
import { u as useActor, s as sendOTP, v as verifyOTP, c as createActor } from "./api-8PJoCqPW.js";
import { B as Button } from "./button-DWtlGXxF.js";
import { I as Input } from "./input-G0BE1fL_.js";
import { L as Label } from "./label-CKr0yFvu.js";
import { S as ShieldCheck } from "./shield-check-r77Y8xQg.js";
import { E as EyeOff } from "./eye-off-DeeDaVcG.js";
import { E as Eye } from "./eye-C-qXz6Rs.js";
import { C as CircleAlert } from "./circle-alert-CKMjACuR.js";
import { L as LoaderCircle } from "./loader-circle-ByZu3f7k.js";
import "./utils-DdB4LPY_.js";
const BRAND_ORANGE = "#F47B30";
const BRAND_BLUE = "#1E5FA8";
const BRAND_NAVY = "#0f172a";
function LoginPage() {
  const { actor } = useActor(createActor);
  const [step, setStep] = reactExports.useState("mobile");
  const [mobile, setMobile] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [otpDisplay, setOtpDisplay] = reactExports.useState(null);
  const [showOtp, setShowOtp] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const otpRef = reactExports.useRef(null);
  async function handleSendOTP(e) {
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
      setTimeout(() => {
        var _a;
        return (_a = otpRef.current) == null ? void 0 : _a.focus();
      }, 100);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  }
  async function handleVerifyOTP(e) {
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
        err instanceof Error ? err.message : "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: "h-14 flex items-center px-6 shadow-sm border-b border-white/10",
        style: { backgroundColor: BRAND_NAVY },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/logo.png",
            alt: "BiggPocket",
            className: "h-9 w-auto object-contain",
            style: { maxWidth: 160 }
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-elevated overflow-hidden",
            style: { backgroundColor: BRAND_NAVY },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/logo.png",
                alt: "BiggPocket",
                className: "h-12 w-12 object-contain"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-2xl", children: "BiggPocket" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Loan Application Tracker" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-elevated overflow-hidden animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-6 pt-5 pb-4 border-b border-border",
            style: {
              background: "linear-gradient(135deg, #fff7ed 0%, #eff6ff 100%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-xl flex items-center justify-center",
                    style: {
                      backgroundColor: step === "mobile" ? BRAND_BLUE : BRAND_ORANGE
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18, className: "text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-xl leading-none", children: step === "mobile" ? "Welcome Back" : "Verify OTP" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Secure login to your account" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: step === "mobile" ? "Enter your registered mobile number to receive a one-time password." : `OTP sent to +91 ${mobile}. Enter it below to sign in.` })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6", children: [
          otpDisplay && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mb-5 p-3 rounded-lg border text-sm flex items-center justify-between",
              style: { backgroundColor: "#fff7ed", borderColor: "#fed7aa" },
              "data-ocid": "otp-display",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-medium mb-0.5",
                      style: { color: "#c2410c" },
                      children: "Your OTP (simulation — no real SMS)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-mono font-bold text-2xl tracking-widest",
                      style: { color: BRAND_ORANGE },
                      children: showOtp ? otpDisplay : "••••••"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowOtp(!showOtp),
                    className: "p-1.5 rounded-md hover:bg-orange-100 transition-smooth",
                    style: { color: "#c2410c" },
                    "aria-label": showOtp ? "Hide OTP" : "Show OTP",
                    children: showOtp ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                  }
                )
              ]
            }
          ),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mb-4 p-3 rounded-lg border text-sm flex items-start gap-2",
              style: {
                backgroundColor: "#fef2f2",
                borderColor: "#fecaca",
                color: "#dc2626"
              },
              "data-ocid": "login-error",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 15, className: "mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
              ]
            }
          ),
          step === "mobile" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendOTP, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "mobile",
                  className: "text-sm font-medium text-foreground",
                  children: "Mobile Number"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm font-medium", children: "+91" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "mobile",
                    type: "tel",
                    inputMode: "numeric",
                    maxLength: 10,
                    placeholder: "10-digit mobile number",
                    value: mobile,
                    onChange: (e) => setMobile(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    ),
                    className: "rounded-l-none",
                    autoFocus: true,
                    "data-ocid": "mobile-input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full font-semibold text-white",
                disabled: loading || !actor,
                style: {
                  backgroundColor: BRAND_ORANGE,
                  borderColor: BRAND_ORANGE
                },
                "data-ocid": "send-otp-btn",
                children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                  " Sending OTP…"
                ] }) : !actor ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                  " ",
                  "Connecting…"
                ] }) : "Send OTP"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleVerifyOTP, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "otp",
                  className: "text-sm font-medium text-foreground",
                  children: "One-Time Password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "otp",
                  ref: otpRef,
                  type: "text",
                  inputMode: "numeric",
                  maxLength: 6,
                  placeholder: "Enter 6-digit OTP",
                  value: otp,
                  onChange: (e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)),
                  className: "tracking-widest text-center text-xl font-mono",
                  "data-ocid": "otp-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full font-semibold text-white",
                disabled: loading,
                style: {
                  backgroundColor: BRAND_ORANGE,
                  borderColor: BRAND_ORANGE
                },
                "data-ocid": "verify-otp-btn",
                children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                  " ",
                  "Verifying…"
                ] }) : "Verify & Sign In"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setStep("mobile");
                  setOtp("");
                  setOtpDisplay(null);
                  setError(null);
                },
                className: "w-full text-sm text-muted-foreground hover:text-foreground transition-smooth",
                "data-ocid": "back-to-mobile",
                children: "← Change mobile number"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-center space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " BiggPocket. Secure loan tracking platform."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white font-medium",
              style: { backgroundColor: BRAND_BLUE },
              children: "DSA Platform"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white font-medium",
              style: { backgroundColor: BRAND_ORANGE },
              children: "10-Stage Tracker"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  LoginPage as default
};
