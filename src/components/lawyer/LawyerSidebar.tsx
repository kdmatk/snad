import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FileText,
  Calendar,
  Users,
  DollarSign,
  User,
  Gavel,
  MessageCircle,
  TrendingUp,
  Settings,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "الطلبات", value: "requests", icon: FileText },
  { title: "المواعيد", value: "appointments", icon: Calendar },
  { title: "العملاء", value: "clients", icon: Users },
  { title: "الأرباح", value: "earnings", icon: DollarSign },
];

const quickItems = [
  { title: "المزادات", value: "auctions", icon: Gavel },
  { title: "الرسائل", value: "messages", icon: MessageCircle },
  { title: "الإحصائيات", value: "stats", icon: TrendingUp },
];

const settingsItems = [
  { title: "الملف الشخصي", value: "profile", icon: User },
  { title: "الإعدادات", value: "settings", icon: Settings },
];

interface LawyerSidebarProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function LawyerSidebar({ activeTab, onTabChange }: LawyerSidebarProps) {
  const { state, open, setOpen } = useSidebar();
  const collapsed = state === "collapsed";

  const getItemClass = (value: string) => {
    const isActive = activeTab === value;
    return `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
      isActive
        ? "bg-primary text-primary-foreground font-medium shadow-sm"
        : "hover:bg-muted text-muted-foreground hover:text-foreground"
    }`;
  };

  return (
    <Sidebar
      className={`border-l transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      collapsible="icon"
    >
      <SidebarContent className="bg-card">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-bold text-primary">لوحة التحكم</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(!open)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-4 mb-2">
              القائمة الرئيسية
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <div
                    onClick={() => onTabChange(item.value)}
                    className={getItemClass(item.value)}
                  >
                    <item.icon className={`h-5 w-5 flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
                    {!collapsed && <span className="flex-1">{item.title}</span>}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup className="mt-4">
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-4 mb-2">
              وصول سريع
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {quickItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <div
                    onClick={() => onTabChange(item.value)}
                    className={getItemClass(item.value)}
                  >
                    <item.icon className={`h-5 w-5 flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
                    {!collapsed && <span className="flex-1">{item.title}</span>}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup className="mt-auto border-t pt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <div
                    onClick={() => onTabChange(item.value)}
                    className={getItemClass(item.value)}
                  >
                    <item.icon className={`h-5 w-5 flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
                    {!collapsed && <span className="flex-1">{item.title}</span>}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
