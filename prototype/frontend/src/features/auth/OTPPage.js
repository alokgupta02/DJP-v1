import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../shared/components/cards";
import { Button } from "../../shared/components/buttons";
const INPUTS = Array.from({ length: 6 });
export default function OTPPage() {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const refs = useRef([]);
    function handleChange(index, value) {
        if (!/^\d*$/.test(value))
            return;
        const next = [...otp];
        next[index] = value.slice(-1);
        setOtp(next);
        if (value && index < 5)
            refs.current[index + 1]?.focus();
    }
    function handleKeyDown(index, e) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            refs.current[index - 1]?.focus();
        }
    }
    return (_jsxs(Card, { noPadding: true, className: "w-full max-w-[430px] p-8 sm:p-10 text-center", children: [_jsx("h1", { className: "text-[var(--text-display)] font-bold text-[var(--color-text-primary)] mb-2", children: "Verify OTP" }), _jsx("p", { className: "text-sm text-[var(--color-text-secondary)] mb-8", children: "Enter the 6-digit verification code sent to your email." }), _jsxs("form", { onSubmit: (e) => e.preventDefault(), className: "flex flex-col items-center", children: [_jsx("div", { className: "flex justify-center gap-3 mb-8", children: INPUTS.map((_, i) => (_jsx("input", { ref: (el) => { refs.current[i] = el; }, type: "text", inputMode: "numeric", maxLength: 1, value: otp[i], onChange: (e) => handleChange(i, e.target.value), onKeyDown: (e) => handleKeyDown(i, e), className: "h-14 w-14 text-center text-2xl font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors", "aria-label": `Digit ${i + 1}` }, i))) }), _jsx(Button, { type: "submit", fullWidth: true, size: "lg", children: "Verify" })] }), _jsxs("p", { className: "text-sm text-[var(--color-text-secondary)] mt-6", children: ["Didn't receive the code?", " ", _jsx(Link, { to: "#", className: "text-[var(--color-brand)] font-medium hover:underline", children: "Resend OTP" })] })] }));
}
