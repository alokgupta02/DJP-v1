import { forwardRef } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import clsx from "clsx";

export interface SearchBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ value, onChange, onClear, placeholder = "Search…", className, ...props }, ref) => {
    return (
      <div className={clsx("relative flex items-center", className)}>
        <SearchIcon
          size={16}
          className="pointer-events-none absolute left-3 text-[var(--color-text-secondary)]"
          aria-hidden="true"
        />

        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            "h-9 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)]",
            "pl-9 pr-8 text-sm text-[var(--color-text-primary)]",
            "placeholder:text-[var(--color-text-secondary)]",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-[var(--color-brand)]"
          )}
          aria-label={placeholder}
          {...props}
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              onClear?.();
            }}
            className="absolute right-0 w-11 h-11 flex items-center justify-center rounded text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Clear search"
          >
            <XIcon size={14} />
          </button>
        )}
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";
export default SearchBox;
