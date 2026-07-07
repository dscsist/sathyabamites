"use client";

import { Bell, ChevronDown, LogOut, Search, Settings, User } from "lucide-react";
import Link from "next/link";
import type { MockUser, NotificationItem } from "@/lib/dashboard/types";

interface TopbarProps {
  user: MockUser;
  query: string;
  onQueryChange: (query: string) => void;
  notifications: NotificationItem[];
  notificationsOpen: boolean;
  userMenuOpen: boolean;
  onToggleNotifications: () => void;
  onToggleUserMenu: () => void;
  onMarkNotificationsRead: () => void;
  onLogout: () => void;
}

export function Topbar({
  user,
  query,
  onQueryChange,
  notifications,
  notificationsOpen,
  userMenuOpen,
  onToggleNotifications,
  onToggleUserMenu,
  onMarkNotificationsRead,
  onLogout
}: TopbarProps) {
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <header className="glass-panel neon-border sticky top-3 z-30 rounded-[1rem] px-3 py-3 md:top-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative min-w-0 flex-1 lg:max-w-[42rem]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search projects, events, resources..."
            className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] pl-12 pr-14 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300/50 focus:ring-2 focus:ring-violet-500/20"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/10 px-2 py-1 text-xs text-slate-500 sm:block">
            ⌘ K
          </span>
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={onToggleNotifications}
              className="relative grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-violet-300/40 hover:text-white"
              aria-label="Open notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-violet-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              ) : null}
            </button>
            {notificationsOpen ? (
              <NotificationDropdown notifications={notifications} onMarkRead={onMarkNotificationsRead} />
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={onToggleUserMenu}
              className="flex h-12 min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2 pr-3 text-left transition hover:border-violet-300/40 sm:min-w-64"
            >
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="" className="h-9 w-9 rounded-full object-cover ring-1 ring-violet-200/40" />
              ) : (
                <span className="grid h-9 w-9 place-items-center rounded-full bg-violet-500/30 text-xs font-bold text-violet-50">
                  {user.avatar}
                </span>
              )}
              <span className="hidden min-w-0 sm:block">
                <span className="block truncate text-sm font-semibold text-white">{user.name}</span>
                <span className="block truncate text-xs text-slate-400">{user.department}</span>
              </span>
              <ChevronDown className="ml-auto h-4 w-4 text-slate-500" />
            </button>
            {userMenuOpen ? <UserMenu onLogout={onLogout} /> : null}
          </div>
        </div>
      </div>
    </header>
  );
}

function NotificationDropdown({
  notifications,
  onMarkRead
}: {
  notifications: NotificationItem[];
  onMarkRead: () => void;
}) {
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <div className="absolute right-0 mt-3 w-[min(23rem,calc(100vw-2rem))] rounded-lg border border-violet-300/20 bg-slate-950/95 p-3 shadow-soft-glow backdrop-blur">
      <div className="mb-2 flex items-center justify-between gap-3 px-1">
        <p className="text-sm font-semibold text-white">Notifications</p>
        <button
          type="button"
          onClick={onMarkRead}
          className="rounded-md px-2 py-1 text-xs font-medium text-violet-200 transition hover:bg-violet-500/10 hover:text-white"
        >
          Mark all as read
        </button>
      </div>
      <p className="mb-3 px-1 text-xs text-slate-500">{unreadCount} unread</p>
      <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
        {notifications.map((item) => (
          <div key={item.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <div className="flex gap-2">
              <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${item.unread ? "bg-pink-400" : "bg-slate-600"}`} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserMenu({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="absolute right-0 mt-3 w-52 rounded-lg border border-violet-300/20 bg-slate-950/95 p-2 shadow-soft-glow backdrop-blur">
      <Link
        href="/profile"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
      >
        <User className="h-4 w-4 text-violet-200" />
        View Profile
      </Link>
      <Link
        href="/settings"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
      >
        <Settings className="h-4 w-4 text-violet-200" />
        Settings
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-100"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
}
