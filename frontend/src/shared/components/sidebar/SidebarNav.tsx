import SidebarNavItem from "./SidebarNavItem";
import { sidebarItems } from "./sidebar.constants";

export default function SidebarNav() {
  return (
    <nav className="flex flex-col gap-2">
      {sidebarItems.map((item) => (
        <SidebarNavItem
          key={item.id}
          item={item}
        />
      ))}
    </nav>
  );
}