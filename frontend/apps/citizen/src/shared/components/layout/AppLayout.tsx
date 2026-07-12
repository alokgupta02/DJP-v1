import { Outlet, Navigate } from "react-router-dom";
import Sidebar, { SidebarProvider } from "../sidebar";
import { Topbar } from "../navigation";

function AppLayoutContent() {
  // Ponytail: Simple auth guard via localStorage
  const isAuthenticated = Boolean(localStorage.getItem("djp_user"));
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row bg-[var(--color-bg-page)] overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppLayoutContent />
    </SidebarProvider>
  );
}
