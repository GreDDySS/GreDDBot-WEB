export interface LogFilters {
  query?: string;
  username?: string;
  date?: string;
}

export interface Channel {
  channelId: number;
  channelName: string;
}

export interface Log {
  id: number;
  username: string;
  message: string;
  badges: string;
  color: string;
  timestamp: string;
}

export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  email: string;
  profile_image_url: string;
  broadcaster_type: string;
  description: string;
  created_at: string;
  view_count: number;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}