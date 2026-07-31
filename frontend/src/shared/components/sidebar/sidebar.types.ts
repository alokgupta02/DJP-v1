import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;

  badge?: number;

  disabled?: boolean;

  children?: SidebarItem[];
}