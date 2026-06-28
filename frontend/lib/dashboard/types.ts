export interface MockUser {
  name: string;
  role: string;
  department: string;
  avatar: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  imageTone: string;
  imageUrl?: string;
  contributors: string[];
  techStack: string[];
  likes: number;
  views: number;
  updatedAt: string;
  githubUrl: string;
  demoUrl: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  host: string;
  description: string;
  registered: boolean;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  sharedBy: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  monthlyGrowth: number;
  accent: string;
}

export interface Activity {
  id: string;
  type: "project" | "event" | "resource" | "achievement";
  title: string;
  actor: string;
  createdAt: string;
}

export interface Contributor {
  id: string;
  name: string;
  avatar: string;
  departmentYear: string;
  projects: number;
  likes: number;
  events: number;
  resources: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  unread: boolean;
  createdAt: string;
}

export interface DashboardData {
  user: MockUser;
  stats: DashboardStat[];
  projects: Project[];
  events: EventItem[];
  resources: Resource[];
  activities: Activity[];
  contributors: Contributor[];
  notifications: NotificationItem[];
}
