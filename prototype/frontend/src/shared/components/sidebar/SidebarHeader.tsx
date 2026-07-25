import { useSidebar } from "./SidebarContext";

export default function SidebarHeader() {
  const { collapsed } = useSidebar();

  return (
    <div
      className={`flex w-full transition-all duration-300 ${
        collapsed
          ? "flex-col items-center gap-2.5"
          : "items-center"
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
    </div>
  );
}