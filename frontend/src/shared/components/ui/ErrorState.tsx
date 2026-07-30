import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
import clsx from "clsx";
import Button from "../buttons/Button";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "An error occurred while loading this content. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center px-6 py-16",
        className
      )}
      role="alert"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-error-bg)] text-[var(--color-error)] mb-4">
        <AlertTriangleIcon size={28} strokeWidth={1.5} />
      </div>

      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
        {title}
      </h3>

      <p className="text-sm text-[var(--color-text-secondary)] max-w-xs leading-relaxed mb-5">
        {description}
      </p>

      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCwIcon size={14} />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
