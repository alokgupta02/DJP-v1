import { ChevronLeft } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export default function SidebarHeader() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <div
      className={`flex w-full transition-all duration-300 ${
        collapsed
          ? "flex-col items-center gap-2.5"
          : "items-center justify-between"
      }`}
    >
      <div className="flex items-center">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--color-brand)]
            text-lg
            font-bold
            text-[var(--color-text-inverse)]
          "
        >
          DJ
        </div>

        <div
          className={`
            flex flex-col transition-all duration-300 overflow-hidden whitespace-nowrap
            ${collapsed ? "max-w-0 opacity-0 ml-0" : "max-w-40 opacity-100 ml-3"}
          `}
        >
          <h1 className="text-lg font-bold text-[var(--color-brand)] leading-tight">
            Digital Janta
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] leading-none mt-0.5">
            Political Platform
          </p>
        </div>
      </div>

      <button
        onClick={toggleCollapsed}
        className="
          hidden md:flex h-7 w-7 shrink-0 items-center justify-center
          rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] shadow-sm
          transition-all duration-300 hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] cursor-pointer
        "
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          size={14}
          className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}