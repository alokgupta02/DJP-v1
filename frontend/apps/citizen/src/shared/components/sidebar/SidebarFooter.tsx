import { Plus } from "lucide-react";
import clsx from "clsx";
import { useSidebar } from "./SidebarContext";

export default function SidebarFooter() {
  const { collapsed, isMobile } = useSidebar();
  const isCollapsed = collapsed && !isMobile;

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex justify-center relative">
        <button
          className={clsx(
            "group relative flex items-center justify-center rounded-xl bg-[#A31621] text-white transition-all duration-300 hover:opacity-95 shadow-sm cursor-pointer",
            isCollapsed ? "h-11 w-11" : "h-11 w-full px-4"
          )}
        >
          <Plus size={20} className="shrink-0" />
          <span
            className={clsx(
              "font-semibold text-sm transition-all duration-300 overflow-hidden whitespace-nowrap",
              isCollapsed ? "max-w-0 opacity-0 ml-0" : "max-w-24 opacity-100 ml-2"
            )}
          >
            Create
          </span>

          {isCollapsed && (
            <div
              className="
                absolute left-full ml-4 z-50
                hidden group-hover:flex items-center
                pointer-events-none transition-all duration-300
              "
            >
              {/* Tooltip arrow */}
              <div className="w-2 h-2 bg-gray-900 rotate-45 -mr-1 shadow-md" />
              {/* Tooltip Content */}
              <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                Create
              </div>
            </div>
          )}
        </button>
      </div>

      <div
        className={clsx(
          "text-center text-xs text-gray-500 transition-all duration-300 overflow-hidden whitespace-nowrap",
          isCollapsed ? "max-w-0 opacity-0 h-0 mt-0" : "max-w-full opacity-100 h-10 mt-6"
        )}
      >
        <p className="font-semibold text-gray-700">Digital Janta Platform</p>
        <p className="text-gray-400">Version 1.0</p>
      </div>
    </div>
  );
}