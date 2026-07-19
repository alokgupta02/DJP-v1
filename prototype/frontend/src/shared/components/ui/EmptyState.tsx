import { InboxIcon } from "lucide-react";
import clsx from "clsx";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center px-6 py-16",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] mb-4">
        {icon ?? <InboxIcon size={28} strokeWidth={1.5} />}
      </div>

      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-[var(--color-text-secondary)] max-w-xs leading-relaxed mb-5">
          {description}
        </p>
      )}

      {action && <div>{action}</div>}
    </div>
  );
}
