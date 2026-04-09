import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  FileText,
  Home,
  LifeBuoy,
  Search,
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
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const primaryItems = [
  { title: "Overview", icon: Home, href: "/dashboard", active: true },
  { title: "Profile", icon: UserCircle, href: "/profile", active: true },
  { title: "Resume", icon: FileText, href: "/resumebuilder", active: true },
  { title: "Billing", icon: CreditCard, href: "/billing", active: true },
];

const secondaryItems = [
  { title: "Notifications", icon: Bell, href: "/notifications", active: true },
  { title: "Settings", icon: Settings, href: "/settings", active: true },
  { title: "Support", icon: LifeBuoy, href: "/support", active: true },
];

function DashboardSidebar() {
  return (
    <Sidebar variant="inset">
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

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.active} tooltip={item.title}>
                    <Link className="flex items-center gap-2" to={item.href}>
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

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

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

export default function DashboardShell() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="min-h-svh bg-app-bg">
        <header className="flex items-center h-[4rem] gap-3 border-b border-border bg-background/80 px-4 py-4 backdrop-blur md:px-6">
          <SidebarTrigger />
          <div>
            <p className="text-sm text-muted-foreground">Dashboard</p>
            
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
