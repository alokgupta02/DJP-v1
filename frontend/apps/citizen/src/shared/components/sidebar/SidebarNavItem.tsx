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
          "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]",
          isActive && "bg-[var(--color-brand)] text-[var(--color-text-inverse)] shadow-sm hover:bg-[var(--color-brand-hover)]"
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
                    ? "bg-[var(--color-bg-surface)] text-[var(--color-brand)]"
                    : "bg-[var(--color-brand)] text-[var(--color-text-inverse)] group-hover:opacity-90"
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
              <div className="w-2 h-2 bg-[var(--color-text-primary)] rotate-45 -mr-1 shadow-md" />
              {/* Tooltip Content */}
              <div className="bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                {item.label}
              </div>
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}