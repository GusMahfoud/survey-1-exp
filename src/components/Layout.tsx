
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { PanelLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4 md:hidden">
            <SidebarTrigger>
              <PanelLeft className="h-5 w-5" />
            </SidebarTrigger>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
