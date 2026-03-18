'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { FLOW_TYPES } from '@/lib/config/flow-types';
import type { Flow, Profile } from '@/types';

interface SidebarProps {
  flows: Flow[];
  user: Profile;
}

export default function Sidebar({ flows, user }: SidebarProps) {
  const pathname = usePathname();

  const activeFlows = flows.filter((f) => f.status === 'active');
  const draftFlows = flows.filter((f) => f.status === 'draft');

  return (
    <aside className="w-[260px] h-screen bg-bg-secondary border-r border-border-default flex flex-col sticky top-0">
      {/* Logo */}
      <div className="px-5 pt-6 pb-2">
        <Link href="/app">
          <h1
            className="text-lg font-bold tracking-tight text-text-primary"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            dispach
          </h1>
        </Link>
        <p
          className="text-[10px] uppercase tracking-widest text-text-muted mt-0.5"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Kill the meeting
        </p>
      </div>

      {/* New flow button */}
      <div className="px-4 py-4">
        <Link
          href="/app/new"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all duration-150"
        >
          <span className="text-lg leading-none">+</span>
          New async flow
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-6">
        <div>
          <Link
            href="/app"
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150',
              pathname === '/app'
                ? 'bg-bg-card text-text-primary font-medium'
                : 'text-text-secondary hover:bg-bg-hover'
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Dashboard
          </Link>
        </div>

        {/* Active flows */}
        {activeFlows.length > 0 && (
          <div>
            <p
              className="px-3 text-[10px] uppercase tracking-widest text-text-muted mb-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Active flows
            </p>
            <div className="space-y-0.5">
              {activeFlows.map((flow) => {
                const config = FLOW_TYPES[flow.type];
                return (
                  <Link
                    key={flow.id}
                    href={`/app/flow/${flow.id}`}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                      pathname === `/app/flow/${flow.id}`
                        ? 'bg-bg-card text-text-primary font-medium'
                        : 'text-text-secondary hover:bg-bg-hover'
                    )}
                  >
                    <span className="text-sm shrink-0">{config.icon}</span>
                    <span className="truncate">{flow.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Drafts */}
        {draftFlows.length > 0 && (
          <div>
            <p
              className="px-3 text-[10px] uppercase tracking-widest text-text-muted mb-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Drafts
            </p>
            <div className="space-y-0.5">
              {draftFlows.map((flow) => (
                <Link
                  key={flow.id}
                  href={`/app/flow/${flow.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-muted hover:bg-bg-hover transition-all duration-150"
                >
                  <span className="truncate">{flow.title}</span>
                  <Badge className="ml-auto shrink-0">Draft</Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-border-light">
        <Link
          href="/app/settings"
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-bg-hover transition-all duration-150"
        >
          <Avatar name={user.full_name} src={user.avatar_url} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{user.full_name}</p>
            <p className="text-xs text-text-muted truncate">{user.email}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
