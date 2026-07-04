"use client";

import { useState, useEffect} from "react";
import Link from "next/link";
import { events } from "@/data/events";
import EventCard from "@/components/EventCard";
import CategoryFilter from "@/components/CategoryFilter";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [allEvents, setAllEvents] = useState(events);

  useEffect(() => {
    const customEvents = JSON.parse(
      localStorage.getItem("customEvents") || "[]"
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllEvents([...events, ...customEvents]);
  }, []);

  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory =
      selected === "All" || event.category === selected;

    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      event.status === statusFilter;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesStatus
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-extrabold">
            Event Dashboard🎉
          </h1>

          <p className="text-gray-400 mt-2">
            Discover, create and manage all campus events.
          </p>
        </div>

        <Link
          href="/events/create"
          className="mt-5 md:mt-0 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          + Create Event
        </Link>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <p className="text-gray-400">Total Events</p>
          <h2 className="text-4xl font-bold mt-2">
            {allEvents.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <p className="text-gray-400">Upcoming</p>
          <h2 className="text-4xl font-bold mt-2 text-violet-400">
            {
              allEvents.filter(
                (e) => e.status === "upcoming"
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <p className="text-gray-400">Live</p>
          <h2 className="text-4xl font-bold mt-2 text-red-400">
            {
              allEvents.filter(
                (e) => e.status === "live"
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <p className="text-gray-400">Completed</p>
          <h2 className="text-4xl font-bold mt-2 text-green-400">
            {
              allEvents.filter(
                (e) => e.status === "completed"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Category Filter */}
      <CategoryFilter
        selected={selected}
        setSelected={setSelected}
      />

      {/* Search */}
      <div className="my-8">

        <input
          type="text"
          placeholder="🔍 Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 focus:border-violet-500 outline-none"
        />

      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-3 mb-10">

        {[
          "All",
          "Upcoming",
          "Live",
          "Completed",
        ].map((status) => (

          <button
            key={status}
            onClick={() =>
              setStatusFilter(
                status.toLowerCase()
              )
            }
            className={`px-5 py-2 rounded-full transition font-medium ${
              statusFilter ===
              status.toLowerCase()
                ? "bg-violet-600 text-white"
                : "bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {status}
          </button>

        ))}

      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              venue={event.venue}
              image={event.image}
              status={event.status}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-400">
              No events found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing the search or filters.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}