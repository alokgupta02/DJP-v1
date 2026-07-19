import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift effect — useful for clickable cards */
  hoverable?: boolean;
  /** Removes the default padding */
  noPadding?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Card({
  hoverable = false,
  noPadding = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl",
        "shadow-[var(--shadow-sm)]",
        !noPadding && "p-6 md:p-7",
        hoverable &&
          "cursor-pointer transition-shadow duration-200 hover:shadow-[var(--shadow-md)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SectionCardProps extends CardProps {
  title?: string;
  action?: React.ReactNode;
}

/** Card with a standard section header — title on left, action on right */
export function SectionCard({
  title,
  action,
  children,
  className,
  ...props
}: SectionCardProps) {
  return (
    <Card className={clsx("overflow-hidden", className)} {...props}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              {title}
            </h2>
          )}
          {action && (
            <div className="text-sm text-[var(--color-brand)] font-medium">
              {action}
            </div>
          )}
        </div>
      )}
      {children}
    </Card>
  );
}
