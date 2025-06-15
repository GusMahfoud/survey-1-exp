
```typescript
import React from 'react';
import { SidebarProvider, SidebarEdgeToggle, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const MainContent = ({ children }: LayoutProps) => {
  const { state, isMobile } = useSidebar();

  // On mobile, the sidebar is an overlay, so we don't need to adjust the margin.
  if (isMobile) {
    return <main className="flex-1 p-6">{children}</main>;
  }

  return (
    <main
      className={cn(
        "p-6 transition-[margin-left] duration-200 ease-in-out",
        {
          "ml-[16rem]": state === 'expanded',
          "ml-[3rem]": state === 'collapsed'
        }
      )}
    >
      {children}
    </main>
  );
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <SidebarEdgeToggle />
        <MainContent>
          {children}
        </MainContent>
      </div>
    </SidebarProvider>
  );
};
```
