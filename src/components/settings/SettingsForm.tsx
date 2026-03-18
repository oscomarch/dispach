'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { updateTeamName, inviteTeamMember, signOut } from '@/app/actions';
import type { Profile, Team, TeamMember } from '@/types';

interface SettingsFormProps {
  user: Profile;
  team: Team;
  members: (TeamMember & { profile?: Profile })[];
}

export default function SettingsForm({ user, team, members }: SettingsFormProps) {
  const [teamNameValue, setTeamNameValue] = useState(team.name);
  const [inviteEmail, setInviteEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteError, setInviteError] = useState('');

  const handleSaveTeamName = async () => {
    setSaving(true);
    setSaveMessage('');
    try {
      await updateTeamName(team.id, teamNameValue);
      setSaveMessage('Saved');
    } catch (err) {
      setSaveMessage(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    setInviteMessage('');
    setInviteError('');
    try {
      const result = await inviteTeamMember(team.id, inviteEmail.trim());
      if (result.error) {
        setInviteError(result.error);
      } else {
        setInviteMessage('Member added!');
        setInviteEmail('');
      }
    } catch (err) {
      setInviteError(err instanceof Error ? err.message : 'Failed to invite');
    } finally {
      setInviting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const roleColor = (role: string) => {
    switch (role) {
      case 'owner': return '#E8612D';
      case 'admin': return '#2B6CB0';
      default: return undefined;
    }
  };

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
              value={teamNameValue}
              onChange={(e) => setTeamNameValue(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" onClick={handleSaveTeamName} loading={saving}>
                Save changes
              </Button>
              {saveMessage && (
                <span className="text-xs text-text-muted">{saveMessage}</span>
              )}
            </div>
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
            {members.map((member) => {
              const profile = member.profile;
              return (
                <div
                  key={member.id}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-bg-hover transition-all duration-150"
                >
                  <Avatar name={profile?.full_name || 'Unknown'} src={profile?.avatar_url} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{profile?.full_name || 'Unknown'}</p>
                    <p className="text-xs text-text-muted">{profile?.email || ''}</p>
                  </div>
                  <Badge color={roleColor(member.role)}>
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </Badge>
                </div>
              );
            })}
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
              <Button variant="secondary" className="shrink-0" onClick={handleInvite} loading={inviting}>
                Send invite
              </Button>
            </div>
            {inviteError && <p className="text-sm text-error mt-2">{inviteError}</p>}
            {inviteMessage && <p className="text-sm text-success mt-2">{inviteMessage}</p>}
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
            <Avatar name={user.full_name} src={user.avatar_url} size="lg" />
            <div>
              <p className="text-sm font-medium text-text-primary">{user.full_name}</p>
              <p className="text-xs text-text-muted">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-error hover:text-error" onClick={handleSignOut}>
            Sign out
          </Button>
        </Card>
      </div>
    </div>
  );
}
