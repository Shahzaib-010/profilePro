import { Link, useLocation } from "react-router-dom";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  FileText,
  Home,
  LifeBuoy,
  Settings,
  Sparkles,
  UserCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const primaryItems = [
  { title: "Overview", icon: Home, path: "" }, // index route
  { title: "Profile", icon: UserCircle, path: "profile" },
  { title: "Resume", icon: FileText, path: "resumebuilder" },
  { title: "Billing", icon: CreditCard, path: "billing" },
];

const secondaryItems = [
  { title: "Notifications", icon: Bell, path: "notifications" },
  { title: "Settings", icon: Settings, path: "settings" },
  { title: "Support", icon: LifeBuoy, path: "support" },
];

export default function DashboardSidebar() {
  const location = useLocation();

  const isActive = (path) => {
    const fullPath = `/dashboard/${path}`;
    return location.pathname === fullPath || location.pathname === "/dashboard" && path === "";
  };

  return (
    <Sidebar variant="inset">
      {/* HEADER */}
      <SidebarHeader className="gap-3 border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground">
            <Sparkles className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">ProfilePro</p>
            <p className="truncate text-xs text-sidebar-foreground/70">
              Creator workspace
            </p>
          </div>
        </div>
        <SidebarInput placeholder="Search dashboard..." />
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-2 py-3">
        {/* WORKSPACE */}
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link
                      to={`/dashboard/${item.path}`}
                      className="flex items-center gap-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* ACCOUNT */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link
                      to={`/dashboard/${item.path}`}
                      className="flex items-center gap-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent px-3 py-3 text-sidebar-accent-foreground">
          <BadgeCheck className="size-5 shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Pro Plan</p>
            <p className="truncate text-xs opacity-80">
              All premium profile tools enabled
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}