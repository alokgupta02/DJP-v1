import clsx from "clsx";

export type BadgeVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "brand";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
  success: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  error:   "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  info:    "bg-[var(--color-info-bg)] text-[var(--color-info)]",
  brand:   "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "text-[11px] font-semibold px-2 py-0.5",
  md: "text-xs font-semibold px-2.5 py-1",
};

export default function Badge({
  variant = "default",
  size = "md",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full leading-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
