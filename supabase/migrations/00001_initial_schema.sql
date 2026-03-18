-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Users (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  email text not null,
  avatar_url text,
  created_at timestamptz default now()
);

-- Teams
create table public.teams (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  created_by uuid references public.profiles(id) not null,
  created_at timestamptz default now()
);

-- Team members
create table public.team_members (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references public.teams(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text default 'member' check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz default now(),
  unique(team_id, user_id)
);

-- Flow types enum
create type flow_type as enum ('status', 'decision', 'review', 'brainstorm', 'retro', 'standup');
create type flow_status as enum ('draft', 'active', 'completed', 'archived');

-- Flows (the core unit — replaces a meeting)
create table public.flows (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references public.teams(id) on delete cascade not null,
  author_id uuid references public.profiles(id) not null,
  type flow_type not null,
  title text not null,
  brief_content jsonb not null default '{}',
  deadline timestamptz,
  status flow_status default 'draft',
  participant_ids uuid[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Responses to flows
create table public.responses (
  id uuid default uuid_generate_v4() primary key,
  flow_id uuid references public.flows(id) on delete cascade not null,
  author_id uuid references public.profiles(id) not null,
  content text,
  vote text,
  sections jsonb,
  video_url text,
  attachments jsonb default '[]',
  created_at timestamptz default now(),
  unique(flow_id, author_id)
);

-- AI-generated synthesis
create table public.syntheses (
  id uuid default uuid_generate_v4() primary key,
  flow_id uuid references public.flows(id) on delete cascade not null unique,
  summary text not null,
  consensus text,
  disagreements text,
  open_questions text,
  action_items jsonb default '[]',
  created_at timestamptz default now()
);

-- Row Level Security policies
alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.flows enable row level security;
alter table public.responses enable row level security;
alter table public.syntheses enable row level security;

-- Profiles: users can read all profiles, update their own
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Teams: members can read their teams
create policy "Team members can view team" on public.teams for select
  using (id in (select team_id from public.team_members where user_id = auth.uid()));
create policy "Anyone can create a team" on public.teams for insert with check (auth.uid() = created_by);

-- Team members: members can view other members of their teams
create policy "Members can view team members" on public.team_members for select
  using (team_id in (select team_id from public.team_members where user_id = auth.uid()));
create policy "Team owners can add members" on public.team_members for insert
  with check (team_id in (select team_id from public.team_members where user_id = auth.uid() and role in ('owner', 'admin')));

-- Flows: team members can view, authors can create/update
create policy "Team members can view flows" on public.flows for select
  using (team_id in (select team_id from public.team_members where user_id = auth.uid()));
create policy "Team members can create flows" on public.flows for insert
  with check (team_id in (select team_id from public.team_members where user_id = auth.uid()));
create policy "Authors can update their flows" on public.flows for update
  using (author_id = auth.uid());

-- Responses: participants can view and create
create policy "Team members can view responses" on public.responses for select
  using (flow_id in (select id from public.flows where team_id in (select team_id from public.team_members where user_id = auth.uid())));
create policy "Users can create responses" on public.responses for insert
  with check (author_id = auth.uid());

-- Syntheses: team members can view
create policy "Team members can view syntheses" on public.syntheses for select
  using (flow_id in (select id from public.flows where team_id in (select team_id from public.team_members where user_id = auth.uid())));

-- Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
