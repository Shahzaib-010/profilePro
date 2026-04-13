import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  ChevronsUpDown,
  FileText,
  Home,
  LogOut,
  LifeBuoy,
  Settings,
  Sparkles,
  UserCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

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

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase() || "U";
}

function resolveSidebarUser(user) {
  if (!user) {
    return {
      name: "User",
      email: "",
      avatar: "",
    };
  }

  const name =
    user.name ||
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.fullName ||
    "User";

  const email = user.email || "";
  const avatar =
    user.avatar ||
    user.profile_photo ||
    user.profilePhoto ||
    user.image ||
    user.photo ||
    "";

  return {
    name,
    email,
    avatar,
  };
}

function NavUser({ user, onLogout }) {
  const { isMobile } = useSidebar();
  const initials = getInitials(user.name);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-11 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
            >
              <Avatar className="h-9 w-9 rounded-lg shrink-0">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>

              <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive" onSelect={onLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const sidebarUser = resolveSidebarUser(user);

  const isActive = (path) => {
    const fullPath = `/dashboard/${path}`;
    return location.pathname === fullPath || location.pathname === "/dashboard" && path === "";
  };

  const handleLogout = () => {
    logout();
    navigate("/get-started", { replace: true });
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      {/* HEADER */}
      <SidebarHeader className="gap-3 border-b border-sidebar-border px-3 py-4 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <h1>P</h1>
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">ProfilePro</p>
            <p className="truncate text-xs text-sidebar-foreground/70">
              Creator workspace
            </p>
          </div>
        </div>
       
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-1 py-2 group-data-[collapsible=icon]:px-2">
        {/* WORKSPACE */}
        <SidebarGroup className="group-data-[collapsible=icon]:px-0">
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    size="lg"
                    tooltip={item.title}
                    className="h-10  group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto"
                  >
                    <Link
                      to={`/dashboard/${item.path}`}
                      className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center"
                    >
                      <item.icon />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* ACCOUNT */}
        <SidebarGroup className="group-data-[collapsible=icon]:px-0">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    size="lg"
                    tooltip={item.title}
                    className="h-10 group-data-[collapsible=icon]:!size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto"
                  >
                    <Link
                      to={`/dashboard/${item.path}`}
                      className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center"
                    >
                      <item.icon />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-sidebar-border p-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <NavUser user={sidebarUser} onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}
