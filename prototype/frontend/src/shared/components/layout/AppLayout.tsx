import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar, { SidebarProvider } from "../sidebar";
import { Topbar } from "../navigation";
import { fetchUser } from "../../../features/profile/usersApi";

function getInitials(name?: string): string {
  if (!name) return "AG";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function AppLayoutContent() {
  const [user, setUser] = useState<any>(() => {
    const userStr = localStorage.getItem("djp_user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {}
    }
    return null;
  });

  // Simple auth guard via localStorage / fallback user
  const isAuthenticated = Boolean(localStorage.getItem("djp_user") || localStorage.getItem("djp_token"));

  useEffect(() => {
    let loggedInId = "1f4c2da8-eedd-4523-b541-7c818c237fff"; // Dev User ID (Alok Gupta)
    const userStr = localStorage.getItem("djp_user");
    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        if (parsed.id) loggedInId = parsed.id;
      } catch (e) {}
    }
    fetchUser(loggedInId)
      .then(data => {
        setUser(data);
        localStorage.setItem("djp_user", JSON.stringify(data));
      })
      .catch(err => console.warn("Could not fetch user profile for Topbar:", err));
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userInitials = getInitials(user?.fullName || user?.name);
  const userAvatar = user?.avatarUrl || undefined;
  const ward = user?.ward || "Ward 53, Bhopal";

  return (
    <div className="flex h-screen flex-col md:flex-row bg-[var(--color-bg-page)] overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Topbar userInitials={userInitials} userAvatar={userAvatar} ward={ward} />
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
