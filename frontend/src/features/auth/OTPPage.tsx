import { useState, useRef, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card } from "../../shared/components/cards";
import { Button } from "../../shared/components/buttons";

const INPUTS = Array.from({ length: 6 });

export default function OTPPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) refs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  }

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/djp/api/v1/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: code, email: localStorage.getItem("djp_otp_email") || "" }),
      });
      if (!res.ok) throw new Error("Verification failed");
      navigate("/feed", { replace: true });
    } catch {
      setError("Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card noPadding className="w-full max-w-[430px] p-8 sm:p-10 text-center">
      <h1 className="text-[var(--text-display)] font-bold text-[var(--color-text-primary)] mb-2">
        Verify OTP
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">
        Enter the 6-digit verification code sent to your email.
      </p>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 p-2 rounded mb-4">{error}</p>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); handleVerify(); }}
        className="flex flex-col items-center"
      >
        <div className="flex justify-center gap-3 mb-8">
          {INPUTS.map((_, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="h-14 w-14 text-center text-2xl font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        <Button type="submit" fullWidth size="lg" disabled={loading}>
          {loading ? <><Loader2 className="animate-spin inline" size={16} /> Verifying...</> : "Verify"}
        </Button>
      </form>

      <p className="text-sm text-[var(--color-text-secondary)] mt-6">
        Didn&apos;t receive the code?{" "}
        <Link
          to="#"
          className="text-[var(--color-brand)] font-medium hover:underline"
        >
          Resend OTP
        </Link>
      </p>
    </Card>
  );
}
