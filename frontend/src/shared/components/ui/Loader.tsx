import clsx from "clsx";

export type LoaderSize = "sm" | "md" | "lg";

export interface LoaderProps {
  size?: LoaderSize;
  className?: string;
  label?: string;
}

const sizeClasses: Record<LoaderSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export default function Loader({ size = "md", className, label = "Loading…" }: LoaderProps) {
  return (
    <div
      className={clsx("flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-label={label}
    >
      <div
        className={clsx(
          "rounded-full border-[var(--color-border)] border-t-[var(--color-brand)] animate-spin",
          sizeClasses[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

/** Full-page centered loader */
export function PageLoader() {
  return (
    <div className="flex h-full min-h-64 w-full items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}
