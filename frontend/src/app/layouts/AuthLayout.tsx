import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-page)] px-4 py-8">
      <Outlet />
    </div>
  );
}
