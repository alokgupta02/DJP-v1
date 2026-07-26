import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Card } from "../../shared/components/cards";
import { Input } from "../../shared/components/inputs";
import { Button } from "../../shared/components/buttons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    setLoading(true);
    const loginEmail = email || "citizen@djp.org";
    try {
      const res = await fetch(`/djp/api/v1/auth/dev-login?email=${encodeURIComponent(loginEmail)}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("djp_token", data.token);
      }
      if (data.user) {
        localStorage.setItem("djp_user", JSON.stringify(data.user));
      } else {
        localStorage.setItem("djp_user", JSON.stringify({ email: loginEmail }));
      }
      navigate("/feed", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError("Could not connect to server. Check that the backend is running on port 8081.");
      // Fallback: allow local-only access
      localStorage.setItem("djp_user", JSON.stringify({ email: loginEmail }));
      navigate("/feed", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card noPadding className="w-full max-w-[420px] p-8 sm:p-10">
      <h1 className="text-[var(--text-display)] font-bold text-[var(--color-text-primary)] mb-2">
        Welcome Back
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">
        Login to continue
      </p>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4"
      >
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail size={18} />}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock size={18} />}
        />

        {error && (
          <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>
        )}

        <Button
          type="submit"
          fullWidth
          size="lg"
          rightIcon={<ArrowRight size={18} />}
          className="mt-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="relative flex items-center my-6">
        <div className="flex-1 border-t border-[var(--color-border)]" />
        <span className="px-4 text-sm text-[var(--color-text-secondary)] shrink-0">
          OR
        </span>
        <div className="flex-1 border-t border-[var(--color-border)]" />
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="secondary"
          fullWidth
          onClick={handleLogin}
          leftIcon={
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 15.04 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          }
        >
          Continue with Google
        </Button>

        <Button
          variant="secondary"
          fullWidth
          onClick={handleLogin}
          leftIcon={
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#181717" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.095-1.695-.375-.285-1.125-.98.015-.995 1.125-.015 1.935 1.035 2.205 1.47 1.29 2.175 3.345 1.56 4.155 1.185.135-.93.525-1.56.96-1.92-3.345-.375-6.855-1.665-6.855-7.395 0-1.635.585-2.97 1.545-4.02-.15-.375-.675-1.905.15-3.975 0 0 1.26-.405 4.125 1.53 1.2-.33 2.475-.495 3.75-.495s2.55.165 3.75.495c2.865-1.92 4.125-1.53 4.125-1.53.825 2.07.3 3.6.15 3.975.96 1.05 1.545 2.385 1.545 4.02 0 5.745-3.525 7.02-6.87 7.395.54.465.99 1.365.99 2.76 0 1.995-.015 3.6-.015 4.095 0 .42.225.915.825.72C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          }
        >
          Continue with GitHub
        </Button>
      </div>

      <p className="text-center text-sm text-[var(--color-text-secondary)] mt-8">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-[var(--color-brand)] font-medium hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </Card>
  );
}
