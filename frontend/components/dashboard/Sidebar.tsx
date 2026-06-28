"use client";

import {
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Home,
  LogOut,
  Menu,
  Settings,
  SlidersHorizontal,
  Trophy,
  User,
  Users,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Projects", href: "/projects", icon: BriefcaseBusiness },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Resources", href: "/resources", icon: BookOpen },
  { label: "Community", href: "/community", icon: Users },
  { label: "Career Network", href: "/career-network", icon: SlidersHorizontal },
  { label: "Leaderboards", href: "/leaderboards", icon: Trophy },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings }
];

interface SidebarProps {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navigation = (
    <nav className="flex flex-1 flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`group flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition ${
              active
                ? "bg-violet-700/70 text-white shadow-glow ring-1 ring-violet-300/30"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className={`h-5 w-5 ${active ? "text-violet-100" : "text-slate-400 group-hover:text-violet-200"}`} />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-40 rounded-lg border border-violet-300/20 bg-slate-950/90 p-3 text-white shadow-glow backdrop-blur md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside className="glass-panel sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 rounded-[1.25rem] p-3 md:flex md:flex-col">
        <Brand />
        {navigation}
        <UniversityCard />
        <LogoutButton onLogout={onLogout} />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <aside className="glass-panel relative flex h-full w-[min(20rem,86vw)] flex-col rounded-r-[1.25rem] p-3">
            <div className="mb-3 flex items-center justify-between">
              <Brand compact />
              <button
                type="button"
                className="rounded-lg border border-white/10 p-2 text-slate-300"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {navigation}
            <UniversityCard />
            <LogoutButton onLogout={onLogout} />
          </aside>
        </div>
      ) : null}
    </>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${compact ? "" : "mb-5"} flex items-center gap-3 px-1 pt-1`}>
      <div className="brand-mark grid h-12 w-12 place-items-center rounded-xl text-sm font-black text-white">
        S
      </div>
      <div className="min-w-0">
        <p className="truncate text-base font-bold text-white">Sathyabamites</p>
        <p className="truncate text-xs text-slate-400">For Students, By Students</p>
      </div>
    </div>
  );
}

function UniversityCard() {
  return (
    <div className="mt-auto overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-sm font-medium text-white">Sathyabama University</p>
      <p className="mt-1 text-xs text-slate-400">Chennai, India</p>
      <div className="campus-art mt-4 h-36 rounded-lg border border-violet-300/20" />
    </div>
  );
}

function LogoutButton({ onLogout }: { onLogout: () => void }) {
  return (
    <button
      type="button"
      onClick={onLogout}
      className="mt-3 flex min-h-12 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-rose-300 transition hover:border-rose-300/40 hover:bg-rose-500/10 hover:text-rose-100"
    >
      <LogOut className="h-5 w-5" />
      Logout
    </button>
  );
}
