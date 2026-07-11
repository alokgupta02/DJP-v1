import { useSidebar } from "./SidebarContext";

export default function SidebarHeader() {
  const { collapsed } = useSidebar();

  return (
    <div className="flex items-center justify-start overflow-hidden">
      <div className="flex items-center">
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#A31621]
            text-lg
            font-bold
            text-white
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
          <h1 className="text-lg font-bold text-[#A31621] leading-tight">
            Digital Janta
          </h1>
          <p className="text-xs text-gray-500 leading-none mt-0.5">
            Political Platform
          </p>
        </div>
      </div>
    </div>
  );
}