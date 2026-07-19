import clsx from "clsx";

export interface SkeletonProps {
  /** "rect" = box, "circle" = round, "text" = thin rounded line */
  variant?: "rect" | "circle" | "text";
  className?: string;
  width?: string;
  height?: string;
}

export default function Skeleton({
  variant = "rect",
  className,
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-[var(--color-bg-subtle)]",
        variant === "circle" && "rounded-full",
        variant === "text" && "rounded h-4",
        variant === "rect" && "rounded-lg",
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

/** Pre-built skeleton for a content card */
export function CardSkeleton() {
  return (
    <div className="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width="40px" height="40px" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" height="12px" />
        </div>
      </div>
      <Skeleton variant="rect" height="16px" />
      <Skeleton variant="rect" height="16px" width="80%" />
      <Skeleton variant="rect" height="16px" width="60%" />
    </div>
  );
}
