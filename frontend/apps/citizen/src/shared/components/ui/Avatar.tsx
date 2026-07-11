import clsx from "clsx";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  /** Displayed initials (e.g. "AK"). Shown when no src. */
  initials?: string;
  /** Image URL. Takes priority over initials. */
  src?: string;
  alt?: string;
  size?: AvatarSize;
  /** Custom gradient class (Tailwind). Falls back to brand gradient. */
  gradient?: string;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export default function Avatar({
  initials,
  src,
  alt = "",
  size = "md",
  gradient = "from-[#667eea] to-[#764ba2]",
  className,
}: AvatarProps) {
  const base = clsx(
    "relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white overflow-hidden",
    sizeClasses[size],
    className
  );

  if (src) {
    return (
      <span className={base}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </span>
    );
  }

  return (
    <span className={clsx(base, `bg-gradient-to-br ${gradient}`)}>
      {initials ?? "?"}
    </span>
  );
}
