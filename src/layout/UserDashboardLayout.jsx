import { Outlet } from "react-router-dom";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function UserDashboardLayout() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}