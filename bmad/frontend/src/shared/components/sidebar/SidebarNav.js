import { jsx as _jsx } from "react/jsx-runtime";
import SidebarNavItem from "./SidebarNavItem";
import { sidebarItems } from "./sidebar.constants";
export default function SidebarNav() {
    return (_jsx("nav", { className: "flex flex-col gap-2", children: sidebarItems.map((item) => (_jsx(SidebarNavItem, { item: item }, item.id))) }));
}
