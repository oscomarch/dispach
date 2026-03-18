export type FlowType = 'status' | 'decision' | 'review' | 'brainstorm' | 'retro' | 'standup';
export type FlowStatus = 'draft' | 'active' | 'completed' | 'archived';
export type TeamRole = 'owner' | 'admin' | 'member';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  created_by: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: TeamRole;
  joined_at: string;
  profile?: Profile;
}

export interface Flow {
  id: string;
  team_id: string;
  author_id: string;
  type: FlowType;
  title: string;
  brief_content: Record<string, string>;
  deadline: string | null;
  status: FlowStatus;
  participant_ids: string[];
  created_at: string;
  updated_at: string;
  author?: Profile;
  responses?: Response[];
  synthesis?: Synthesis | null;
}

export interface Response {
  id: string;
  flow_id: string;
  author_id: string;
  content: string | null;
  vote: string | null;
  sections: Record<string, string> | null;
  video_url: string | null;
  attachments: Attachment[];
  created_at: string;
  author?: Profile;
}

export interface Attachment {
  name: string;
  url: string;
  type: string;
}

export interface ActionItem {
  task: string;
  owner_id: string | null;
  due_date: string | null;
}

export interface Synthesis {
  id: string;
  flow_id: string;
  summary: string;
  consensus: string | null;
  disagreements: string | null;
  open_questions: string | null;
  action_items: ActionItem[];
  created_at: string;
}
