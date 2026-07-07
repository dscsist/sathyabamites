"use client";

import {
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  FolderGit2
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CommunityFeed } from "@/components/dashboard/CommunityFeed";
import { EventDetailsModal, UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { FeaturedProjects, ProjectDetailsModal } from "@/components/dashboard/FeaturedProjects";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { TopContributors } from "@/components/dashboard/TopContributors";
import { Topbar } from "@/components/dashboard/Topbar";
import {
  getActivities,
  getContributors,
  getCurrentUser,
  getDashboardStats,
  getEvents,
  getNotifications,
  getProjects,
  getResources,
  incrementProjectView,
  likeProject,
  logoutUser,
  markNotificationsRead,
  registerEvent
} from "@/lib/dashboard/dashboard-api";
import type {
  Activity,
  Contributor,
  DashboardStat,
  EventItem,
  MockUser,
  NotificationItem,
  Project,
  Resource
} from "@/lib/dashboard/types";

const allCategory = "All";

const statIcons = {
  projects: FolderGit2,
  events: CalendarDays,
  resources: BookOpen,
  opportunities: BriefcaseBusiness
};

export function DashboardPage() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<MockUser | null>(null);
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [query, setQuery] = useState("");
  const [projectCategory, setProjectCategory] = useState(allCategory);
  const [eventCategory, setEventCategory] = useState(allCategory);
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      const [
        nextUser,
        nextStats,
        nextProjects,
        nextEvents,
        nextResources,
        nextActivities,
        nextContributors,
        nextNotifications
      ] = await Promise.all([
        getCurrentUser(),
        getDashboardStats(),
        getProjects(),
        getEvents(),
        getResources(),
        getActivities(),
        getContributors(),
        getNotifications()
      ]);

      if (!mounted) {
        return;
      }

      setUser(nextUser);
      setStats(nextStats);
      setProjects(nextProjects);
      setEvents(nextEvents);
      setResources(nextResources);
      setActivities(nextActivities);
      setContributors(nextContributors);
      setNotifications(nextNotifications);
      setLoading(false);
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setNotificationsOpen(false);
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const currentDate = useMemo(() => new Date(), []);

  const projectCategories = useMemo(
    () => [allCategory, "Web Development", "AI/ML", "Mobile Apps", "Research"],
    []
  );
  const eventCategories = useMemo(() => [allCategory, "Workshops", "Hackathons", "Clubs"], []);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => projectCategory === allCategory || project.category === projectCategory)
      .filter((project) =>
        matchesQuery(normalizedQuery, [
          project.title,
          project.summary,
          project.description,
          project.category,
          ...project.techStack,
          ...project.contributors
        ])
      )
      .map((project) => ({ ...project, featuredScore: getProjectScore(project, currentDate) }))
      .sort((a, b) => b.featuredScore - a.featuredScore);
  }, [currentDate, normalizedQuery, projectCategory, projects]);

  const featuredProjects = filteredProjects.slice(0, 3);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => eventCategory === allCategory || event.category === eventCategory)
      .filter((event) =>
        matchesQuery(normalizedQuery, [event.title, event.category, event.description, event.host, event.venue])
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [eventCategory, events, normalizedQuery]);

  const upcomingEvents = filteredEvents.filter((event) => new Date(`${event.date}T23:59:59+05:30`) >= currentDate);

  const filteredActivities = useMemo(() => {
    return activities
      .filter((activity) => matchesQuery(normalizedQuery, [activity.title, activity.actor, activity.type]))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [activities, normalizedQuery]);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) =>
      matchesQuery(normalizedQuery, [resource.title, resource.category, resource.sharedBy])
    );
  }, [normalizedQuery, resources]);

  const rankedContributors = useMemo(() => {
    return contributors
      .map((contributor) => ({
        ...contributor,
        points: contributor.projects * 50 + contributor.likes * 5 + contributor.events * 20 + contributor.resources * 30
      }))
      .sort((a, b) => b.points - a.points);
  }, [contributors]);

  const noSearchResults =
    Boolean(normalizedQuery) &&
    featuredProjects.length === 0 &&
    upcomingEvents.length === 0 &&
    filteredActivities.length === 0 &&
    filteredResources.length === 0;

  async function refreshActivities() {
    setActivities(await getActivities());
  }

  async function handleLikeProject(projectId: string) {
    const nextProjects = await likeProject(projectId);
    setProjects(nextProjects);
    setSelectedProject(nextProjects.find((project) => project.id === projectId) ?? null);
    await refreshActivities();
  }

  async function handleOpenProject(project: Project) {
    const nextProjects = await incrementProjectView(project.id);
    const nextProject = nextProjects.find((item) => item.id === project.id) ?? project;
    setProjects(nextProjects);
    setSelectedProject(nextProject);
    await refreshActivities();
  }

  async function handleRegisterEvent(eventId: string) {
    const nextEvents = await registerEvent(eventId);
    setEvents(nextEvents);
    setSelectedEvent((event) => (event ? nextEvents.find((item) => item.id === event.id) ?? event : null));
    await refreshActivities();
  }

  async function handleMarkNotificationsRead() {
    setNotifications(await markNotificationsRead());
  }

  async function handleLogout() {
    await logoutUser();
    router.push("/");
  }

  if (loading || !user) {
    return (
      <main className="dashboard-shell grid min-h-screen place-items-center p-4">
        <div className="glass-panel neon-border rounded-[1.5rem] px-6 py-5 text-sm text-slate-200">
          Loading Sathyabamites dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-shell min-h-screen overflow-x-hidden p-3 md:p-4">
      <div className="mx-auto flex max-w-[1540px] gap-4">
        <Sidebar onLogout={handleLogout} />
        <div className="min-w-0 flex-1 space-y-3 pt-16 md:pt-0">
          <div ref={menuRef}>
            <Topbar
              user={user}
              query={query}
              onQueryChange={setQuery}
              notifications={notifications}
              notificationsOpen={notificationsOpen}
              userMenuOpen={userMenuOpen}
              onToggleNotifications={() => {
                setNotificationsOpen((open) => !open);
                setUserMenuOpen(false);
              }}
              onToggleUserMenu={() => {
                setUserMenuOpen((open) => !open);
                setNotificationsOpen(false);
              }}
              onMarkNotificationsRead={handleMarkNotificationsRead}
              onLogout={handleLogout}
            />
          </div>

          <section className="hero-panel overflow-hidden rounded-[1.5rem] border border-violet-300/20 bg-slate-950/70 p-4 shadow-soft-glow md:p-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
              <div>
                <h1 className="text-2xl font-bold text-white md:text-3xl">
                  Welcome back, {user.name}! <span aria-hidden="true">👋</span>
                </h1>
                <p className="mt-2 text-sm text-slate-300">Here's what's happening in the community today.</p>
                <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {stats.map((stat) => (
                    <StatCard
                      key={stat.id}
                      label={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                      monthlyGrowth={stat.monthlyGrowth}
                      accent={stat.accent}
                      icon={statIcons[stat.id as keyof typeof statIcons]}
                    />
                  ))}
                </div>
              </div>
              <div className="campus-art hidden min-h-44 rounded-[1.25rem] border border-violet-300/20 lg:block" />
            </div>
          </section>

          {noSearchResults ? (
            <section className="glass-panel rounded-[1.5rem] p-8 text-center">
              <p className="text-lg font-bold text-white">No dashboard matches</p>
              <p className="mt-2 text-sm text-slate-400">
                Try another project, event, resource, contributor, or community keyword.
              </p>
            </section>
          ) : null}

          <div className="grid gap-3 xl:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)]">
            <FeaturedProjects
              projects={featuredProjects}
              categories={projectCategories}
              selectedCategory={projectCategory}
              onCategoryChange={setProjectCategory}
              onProjectOpen={handleOpenProject}
              onLike={handleLikeProject}
            />
            <UpcomingEvents
              upcomingEvents={upcomingEvents}
              categories={eventCategories}
              selectedCategory={eventCategory}
              onCategoryChange={setEventCategory}
              onRegister={handleRegisterEvent}
              onEventOpen={setSelectedEvent}
            />
          </div>

          {normalizedQuery ? <ResourceMatches resources={filteredResources} /> : null}

          <div className="grid gap-3 xl:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)]">
            <CommunityFeed activities={filteredActivities} />
            <TopContributors contributors={rankedContributors} />
          </div>
        </div>
      </div>

      <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} onLike={handleLikeProject} />
      <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onRegister={handleRegisterEvent} />
    </main>
  );
}

function ResourceMatches({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <section className="glass-panel rounded-[1.5rem] p-4">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-emerald-300" />
        <h2 className="text-base font-bold text-white">Resource Matches</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {resources.map((resource) => (
          <article key={resource.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <p className="truncate text-sm font-semibold text-white">{resource.title}</p>
            <p className="mt-1 truncate text-xs text-slate-400">
              {resource.category} by {resource.sharedBy}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function matchesQuery(query: string, values: string[]) {
  if (!query) {
    return true;
  }

  return values.some((value) => value.toLowerCase().includes(query));
}

function getProjectScore(project: Project, currentDate: Date) {
  const ageInDays = Math.max(1, Math.ceil((currentDate.getTime() - new Date(project.updatedAt).getTime()) / 86_400_000));
  const recencyBoost = Math.max(0, 40 - ageInDays * 4);
  return project.likes * 2 + project.views * 0.5 + recencyBoost;
}
