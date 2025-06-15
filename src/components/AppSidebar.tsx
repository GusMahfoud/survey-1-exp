
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, Link } from 'react-router-dom';

const menuItems = [
  { title: "Dashboard", url: "/", icon: "📊" },
  { title: "Surveys", url: "/surveys", icon: "📝" },
  { title: "Analytics", url: "/analytics", icon: "📈" },
  { title: "Settings", url: "/settings", icon: "⚙️" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url || (item.url !== "/" && location.pathname.startsWith(item.url))}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
