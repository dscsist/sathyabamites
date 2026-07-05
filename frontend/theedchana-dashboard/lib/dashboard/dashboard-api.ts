"use client";

import {
  mockActivities,
  mockContributors,
  mockEvents,
  mockNotifications,
  mockProjects,
  mockResources,
  mockStats,
  mockUser
} from "./mock-data";
import type { Activity, DashboardData, EventItem, NotificationItem, Project } from "./types";

const storageKey = "sathyabamites-dashboard-session";

interface StoredDashboard {
  projects: Project[];
  events: EventItem[];
  activities: Activity[];
  notifications: NotificationItem[];
  loggedIn: boolean;
}

function delay<T>(value: T) {
  return new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(value), 140);
  });
}

function getStoredDashboard(): StoredDashboard {
  if (typeof window === "undefined") {
    return createInitialStore();
  }

  const stored = window.sessionStorage.getItem(storageKey);
  if (!stored) {
    const initialStore = createInitialStore();
    saveStoredDashboard(initialStore);
    return initialStore;
  }

  return JSON.parse(stored) as StoredDashboard;
}

function saveStoredDashboard(data: StoredDashboard) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(storageKey, JSON.stringify(data));
  }
}

function createInitialStore(): StoredDashboard {
  return {
    projects: mockProjects,
    events: mockEvents,
    activities: mockActivities,
    notifications: mockNotifications,
    loggedIn: true
  };
}

export async function getCurrentUser() {
  return delay(mockUser);
}

export async function getDashboardStats() {
  return delay(mockStats);
}

export async function getProjects() {
  return delay(getStoredDashboard().projects);
}

export async function getEvents() {
  return delay(getStoredDashboard().events);
}

export async function getResources() {
  return delay(mockResources);
}

export async function getActivities() {
  return delay(getStoredDashboard().activities);
}

export async function getContributors() {
  return delay(mockContributors);
}

export async function getNotifications() {
  return delay(getStoredDashboard().notifications);
}

export async function getDashboardData(): Promise<DashboardData> {
  const stored = getStoredDashboard();
  return delay({
    user: mockUser,
    stats: mockStats,
    projects: stored.projects,
    events: stored.events,
    resources: mockResources,
    activities: stored.activities,
    contributors: mockContributors,
    notifications: stored.notifications
  });
}

export async function likeProject(projectId: string) {
  const stored = getStoredDashboard();
  const project = stored.projects.find((item) => item.id === projectId);
  if (!project) {
    return delay(stored.projects);
  }

  const projects = stored.projects.map((item) => (item.id === projectId ? { ...item, likes: item.likes + 1 } : item));
  const activities = addActivity(stored.activities, {
    type: "project",
    actor: mockUser.name,
    title: `liked ${project.title}`
  });
  saveStoredDashboard({ ...stored, projects, activities });
  return delay(projects);
}

export async function incrementProjectView(projectId: string) {
  const stored = getStoredDashboard();
  const project = stored.projects.find((item) => item.id === projectId);
  if (!project) {
    return delay(stored.projects);
  }

  const projects = stored.projects.map((item) => (item.id === projectId ? { ...item, views: item.views + 1 } : item));
  const activities = addActivity(stored.activities, {
    type: "project",
    actor: mockUser.name,
    title: `viewed ${project.title}`
  });
  saveStoredDashboard({ ...stored, projects, activities });
  return delay(projects);
}

export async function registerEvent(eventId: string) {
  const stored = getStoredDashboard();
  const event = stored.events.find((item) => item.id === eventId);
  if (!event) {
    return delay(stored.events);
  }

  const events = stored.events.map((item) => (item.id === eventId ? { ...item, registered: true } : item));
  const activities = addActivity(stored.activities, {
    type: "event",
    actor: mockUser.name,
    title: `registered for ${event.title}`
  });
  saveStoredDashboard({ ...stored, events, activities });
  return delay(events);
}

export async function markNotificationsRead() {
  const stored = getStoredDashboard();
  const notifications = stored.notifications.map((item) => ({ ...item, unread: false }));
  saveStoredDashboard({ ...stored, notifications });
  return delay(notifications);
}

export async function logoutUser() {
  const stored = getStoredDashboard();
  saveStoredDashboard({ ...stored, loggedIn: false });
  window.localStorage.removeItem("sathyabamites-user");
  window.sessionStorage.removeItem(storageKey);
  document.cookie = "sathyabamites-session=; Max-Age=0; path=/";
  return delay(true);
}

function addActivity(
  activities: Activity[],
  activity: Pick<Activity, "type" | "actor" | "title">
) {
  return [
    {
      id: `activity-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...activity
    },
    ...activities
  ];
}
