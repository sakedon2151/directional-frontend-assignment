import { AppSidebar } from '@/components/common/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/common/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar></AppSidebar>
      <main className="w-full">
        <SidebarTrigger className="m-2 size-8" />
        {children}
      </main>
    </SidebarProvider>
  );
}
