import { Download, Share, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "biggpocket_pwa_install_dismissed";

function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

function isInStandaloneMode(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator &&
      (window.navigator as { standalone?: boolean }).standalone === true)
  );
}

export function InstallPWA() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed, already installed, or running standalone
    if (localStorage.getItem(DISMISS_KEY) === "true") return;
    if (isInStandaloneMode()) return;

    if (isIOS()) {
      // Show iOS instructions banner after a small delay
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 2000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setShowBanner(false);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === "accepted") {
      setInstalled(true);
    }
    setShowBanner(false);
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem(DISMISS_KEY, "true");
  };

  if (!showBanner || installed) return null;

  const isIOSDevice = isIOS();

  return (
    <div
      data-ocid="pwa.install_banner"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none"
    >
      <div
        className="pointer-events-auto rounded-2xl shadow-2xl overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(135deg, #1E5FA8 0%, #164a87 100%)",
        }}
      >
        <div className="flex items-start gap-3 p-4">
          {/* Icon */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner"
            style={{ background: "#F47B30" }}
          >
            B
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">
              Install BiggPocket App
            </p>
            {isIOSDevice ? (
              <div>
                <p className="text-blue-100 text-xs mt-1 leading-relaxed">
                  Tap{" "}
                  <span className="inline-flex items-center gap-0.5 font-medium text-white">
                    <Share className="w-3 h-3" /> Share
                  </span>{" "}
                  then{" "}
                  <span className="font-medium text-white">
                    "Add to Home Screen"
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setShowIOSInstructions(!showIOSInstructions)}
                  className="text-xs text-blue-200 underline mt-1"
                >
                  {showIOSInstructions ? "Hide steps" : "Show steps"}
                </button>
                {showIOSInstructions && (
                  <ol className="text-blue-100 text-xs mt-2 space-y-1 list-decimal list-inside">
                    <li>
                      Tap the <Share className="inline w-3 h-3" /> icon in
                      Safari
                    </li>
                    <li>Scroll down and tap "Add to Home Screen"</li>
                    <li>Tap "Add" to confirm</li>
                  </ol>
                )}
              </div>
            ) : (
              <p className="text-blue-100 text-xs mt-0.5">
                Get instant access — no app store needed
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {!isIOSDevice && (
              <button
                type="button"
                data-ocid="pwa.install_button"
                onClick={handleInstall}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75"
                style={{ background: "#F47B30" }}
              >
                <Download className="w-3.5 h-3.5" />
                Install
              </button>
            )}
            <button
              type="button"
              data-ocid="pwa.dismiss_button"
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Dismiss install banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
