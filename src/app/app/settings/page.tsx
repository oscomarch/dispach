'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { currentUser, mockProfiles } from '@/lib/mock-data';

export default function SettingsPage() {
  const [teamName, setTeamName] = useState('Acme Inc');
  const [inviteEmail, setInviteEmail] = useState('');

  const members = mockProfiles;

  return (
    <div className="max-w-[880px] mx-auto px-8 py-8">
      <div className="mb-8">
        <p
          className="text-xs font-medium uppercase tracking-wider text-text-muted mb-2"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Settings
        </p>
        <h1
          className="text-[28px] text-text-primary"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Team settings
        </h1>
      </div>

      <div className="space-y-8">
        {/* Team info */}
        <Card>
          <h2
            className="text-xs font-medium uppercase tracking-wider text-text-muted mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Team information
          </h2>
          <div className="max-w-[400px] space-y-4">
            <Input
              id="teamName"
              label="Team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <Button variant="secondary" size="sm">
              Save changes
            </Button>
          </div>
        </Card>

        {/* Members */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xs font-medium uppercase tracking-wider text-text-muted"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Members ({members.length})
            </h2>
          </div>

          <div className="space-y-2 mb-6">
            {members.map((member, i) => (
              <div
                key={member.id}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-bg-hover transition-all duration-150"
              >
                <Avatar name={member.full_name} src={member.avatar_url} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{member.full_name}</p>
                  <p className="text-xs text-text-muted">{member.email}</p>
                </div>
                <Badge color={i === 0 ? '#E8612D' : undefined}>
                  {i === 0 ? 'Owner' : 'Member'}
                </Badge>
              </div>
            ))}
          </div>

          <div className="border-t border-border-light pt-4">
            <p
              className="text-xs font-medium uppercase tracking-wider text-text-muted mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Invite new member
            </p>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="inviteEmail"
                  placeholder="colleague@company.com"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <Button variant="secondary" className="shrink-0">
                Send invite
              </Button>
            </div>
          </div>
        </Card>

        {/* Profile */}
        <Card>
          <h2
            className="text-xs font-medium uppercase tracking-wider text-text-muted mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Your profile
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <Avatar name={currentUser.full_name} src={currentUser.avatar_url} size="lg" />
            <div>
              <p className="text-sm font-medium text-text-primary">{currentUser.full_name}</p>
              <p className="text-xs text-text-muted">{currentUser.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-error hover:text-error">
            Sign out
          </Button>
        </Card>
      </div>
    </div>
  );
}
