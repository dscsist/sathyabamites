"use client";

import { Award, CalendarCheck, FolderGit2, Share2 } from "lucide-react";
import type { Activity } from "@/lib/dashboard/types";
import { EmptyState } from "./EmptyState";

interface CommunityFeedProps {
  activities: Activity[];
}

const activityIcons = {
  project: FolderGit2,
  event: CalendarCheck,
  resource: Share2,
  achievement: Award
};

export function CommunityFeed({ activities }: CommunityFeedProps) {
  return (
    <section className="glass-panel rounded-[1rem] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-white">Community Feed</h2>
        <button type="button" className="rounded-lg bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-200">
          View All
        </button>
      </div>
      {activities.length > 0 ? (
        <div className="space-y-2">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <article key={activity.id} className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
                <div className="flex gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-violet-500/15 text-violet-100 ring-1 ring-violet-300/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                    <p className="min-w-0 text-sm text-slate-300">
                      <span className="font-semibold text-white">{activity.actor}</span>{" "}
                      <span className="break-words">{activity.title}</span>
                    </p>
                    <span className="shrink-0 text-xs text-slate-400">{formatActivityTime(activity.createdAt)}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState title="No activity found" description="Search results did not match community updates." />
      )}
    </section>
  );
}

function formatActivityTime(date: string) {
  const diffMs = Date.now() - new Date(date).getTime();
  const minutes = Math.max(1, Math.round(diffMs / 60_000));
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  return `${Math.round(hours / 24)}d ago`;
}
