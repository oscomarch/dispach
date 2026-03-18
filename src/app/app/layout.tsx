import Sidebar from '@/components/layout/Sidebar';
import { mockFlows, currentUser } from '@/lib/mock-data';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar flows={mockFlows} user={currentUser} />
      <main className="flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
