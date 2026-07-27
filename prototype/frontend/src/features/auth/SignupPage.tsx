import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { Card } from "../../shared/components/cards";
import { Input } from "../../shared/components/inputs";
import { Button } from "../../shared/components/buttons";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    if (password && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/djp/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || "Registration failed");
      }
      const responseJson = await res.json();
      const data = responseJson.data;
      if (data?.token) localStorage.setItem("djp_token", data.token);
      if (data?.user) localStorage.setItem("djp_user", JSON.stringify(data.user));
      navigate("/onboarding/basic-info", { replace: true });
    } catch (err) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card noPadding className="w-full max-w-[460px] p-8 sm:p-10">
      <h1 className="text-[var(--text-display)] font-bold text-[var(--color-text-primary)] mb-2">
        Create Account
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-7">
        Join the platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {error && (
          <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>
        )}

        <Input
          label="Full Name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User size={18} />}
        />

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

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          leftIcon={<Lock size={18} />}
        />

        <Button type="submit" fullWidth size="lg" className="mt-2" disabled={loading}>
          {loading ? "Creating Account..." : "Continue"}
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--color-text-secondary)] mt-8">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[var(--color-brand)] font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </Card>
  );
}
