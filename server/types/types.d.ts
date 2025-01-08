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