import { NavLink } from "react-router-dom";
import clsx from "clsx";

import type { SidebarItem } from "./sidebar.types";
import { useSidebar } from "./SidebarContext";

interface SidebarNavItemProps {
  item: SidebarItem;
}

export default function SidebarNavItem({ item }: SidebarNavItemProps) {
  const { collapsed, isMobile, closeMobile } = useSidebar();
  const isCollapsed = collapsed && !isMobile;
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={() => {
        if (isMobile) {
          closeMobile();
        }
      }}
      className={({ isActive }) =>
        clsx(
          "group relative flex items-center h-11 rounded-xl transition-all duration-200",
          isCollapsed ? "justify-center px-0" : "px-3 gap-3",
          "text-gray-700 hover:bg-gray-100",
          isActive && "bg-[#A31621] text-white shadow-sm hover:bg-[#A31621]"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={20}
            strokeWidth={2}
            className="shrink-0"
          />

          <div
            className={clsx(
              "flex items-center justify-between flex-1 transition-all duration-300 overflow-hidden whitespace-nowrap",
              isCollapsed ? "max-w-0 opacity-0 ml-0" : "max-w-48 opacity-100 ml-3"
            )}
          >
            <span className="text-sm font-medium">{item.label}</span>
            {item.badge && (
              <span
                className={clsx(
                  "flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold shrink-0 ml-2",
                  isActive
                    ? "bg-white text-[#A31621]"
                    : "bg-[#A31621] text-white group-hover:bg-[#A31621]/90"
                )}
              >
                {item.badge}
              </span>
            )}
          </div>

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
                {item.label}
              </div>
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}