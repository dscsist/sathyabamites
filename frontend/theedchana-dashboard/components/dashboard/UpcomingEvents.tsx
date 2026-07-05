"use client";

import { Check, X } from "lucide-react";
import type { EventItem } from "@/lib/dashboard/types";
import { EmptyState } from "./EmptyState";

interface UpcomingEventsProps {
  upcomingEvents: EventItem[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onRegister: (eventId: string) => void;
  onEventOpen: (event: EventItem) => void;
}

export function UpcomingEvents({
  upcomingEvents,
  categories,
  selectedCategory,
  onCategoryChange,
  onRegister,
  onEventOpen
}: UpcomingEventsProps) {
  return (
    <section className="glass-panel rounded-[1rem] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
        <button type="button" className="rounded-lg bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-200">
          View All
        </button>
      </div>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
              selectedCategory === category
                ? "border-violet-300/60 bg-violet-600 text-white shadow-glow"
                : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {upcomingEvents.length > 0 ? (
        <div className="space-y-2">
          {upcomingEvents.map((event) => (
            <EventListItem key={event.id} event={event} onRegister={onRegister} onOpen={onEventOpen} />
          ))}
        </div>
      ) : (
        <EmptyState title="No upcoming events" description="Try a different event category or search." />
      )}
    </section>
  );
}

function EventListItem({
  event,
  onRegister,
  onOpen
}: {
  event: EventItem;
  onRegister: (eventId: string) => void;
  onOpen: (event: EventItem) => void;
}) {
  const eventDate = new Date(`${event.date}T00:00:00+05:30`);

  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.025] p-3 transition hover:border-violet-300/40 hover:bg-white/[0.045]">
      <div className="grid gap-3 sm:grid-cols-[4rem_minmax(0,1fr)_7.5rem] sm:items-center">
        <button
          type="button"
          onClick={() => onOpen(event)}
          className="grid h-16 w-16 place-items-center rounded-lg bg-gradient-to-br from-violet-700 to-blue-700 text-center"
          aria-label={`Open ${event.title}`}
        >
          <span>
            <span className="block text-xl font-bold text-white">{eventDate.getDate()}</span>
            <span className="block text-xs uppercase text-violet-100">
              {eventDate.toLocaleDateString("en-IN", { month: "short" })}
            </span>
          </span>
        </button>
        <button type="button" onClick={() => onOpen(event)} className="min-w-0 text-left">
          <h3 className="truncate text-base font-bold text-white">{event.title}</h3>
          <p className="mt-2 truncate text-sm text-slate-400">
            {event.time} <span className="mx-2 text-slate-600">•</span> {event.venue}
          </p>
        </button>
        <button
          type="button"
          onClick={() => onRegister(event.id)}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition ${
            event.registered
              ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
              : "bg-violet-600 text-white shadow-glow hover:bg-violet-500"
          }`}
        >
          {event.registered ? <Check className="h-4 w-4" /> : null}
          {event.registered ? "Registered" : "Register"}
        </button>
      </div>
    </article>
  );
}

export function EventDetailsModal({
  event,
  onClose,
  onRegister
}: {
  event: EventItem | null;
  onClose: () => void;
  onRegister: (eventId: string) => void;
}) {
  if (!event) {
    return null;
  }

  const isPast = new Date(`${event.date}T23:59:59+05:30`) < new Date();

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/70 p-3 backdrop-blur-sm sm:place-items-center">
      <button type="button" className="absolute inset-0" aria-label="Close event details" onClick={onClose} />
      <div className="glass-panel relative w-full max-w-xl rounded-[1.25rem] p-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/30 text-slate-200"
          aria-label="Close event details"
        >
          <X className="h-5 w-5" />
        </button>
        <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-100">{event.category}</span>
        <h2 className="mt-4 pr-10 text-2xl font-bold text-white">{event.title}</h2>
        <p className="mt-3 leading-7 text-slate-300">{event.description}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Detail label="Date" value={formatEventDate(event.date)} />
          <Detail label="Time" value={event.time} />
          <Detail label="Venue" value={event.venue} />
          <Detail label="Status" value={isPast ? "Past event" : event.registered ? "Registered" : "Open"} />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {!isPast ? (
            <button
              type="button"
              onClick={() => onRegister(event.id)}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${
                event.registered
                  ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                  : "bg-violet-600 text-white shadow-glow"
              }`}
            >
              {event.registered ? <Check className="h-4 w-4" /> : null}
              {event.registered ? "Registered" : "Register"}
            </button>
          ) : null}
          <button type="button" onClick={onClose} className="rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm text-white">{value}</p>
    </div>
  );
}

function formatEventDate(date: string) {
  return new Date(`${date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
