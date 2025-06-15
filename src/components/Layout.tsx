
import React from 'react';
import { SidebarProvider, SidebarEdgeToggle } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50 relative">
        <header className="absolute top-0 left-0 right-0 h-16 px-4 flex items-center bg-gradient-to-br from-slate-50/80 to-blue-50/80 backdrop-blur-sm z-10 border-b border-border/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              AI
            </div>
            <span className="font-bold text-lg text-foreground">Survey Pro</span>
          </div>
        </header>

        <AppSidebar />
        <SidebarEdgeToggle />
        <main className="flex-1 px-6 pb-6 pt-20">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
