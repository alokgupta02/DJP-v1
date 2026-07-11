import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { Card } from "../../shared/components/cards";
import { Input } from "../../shared/components/inputs";
import { Button } from "../../shared/components/buttons";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Card noPadding className="w-full max-w-[460px] p-8 sm:p-10">
      <h1 className="text-[var(--text-display)] font-bold text-[var(--color-text-primary)] mb-2">
        Create Account
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-7">
        Join the platform
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
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

        <Button type="submit" fullWidth size="lg" className="mt-2">
          Continue
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
