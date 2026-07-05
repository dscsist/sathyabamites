"use client";

import { use, useEffect,useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { events } from "@/data/events";
import RegisterModal from "@/components/RegisterModal";

type EventType = {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  status: string;
  image: string;
  description: string;
  organizer?: string;
  participants?: string;
  fee?: string;
  contact?: string;
};

export default function EventDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [showModal, setShowModal] = useState(false);
const [event, setEvent] = useState<EventType | null>(null);

useEffect(() => {
  const customEvents = JSON.parse(
    localStorage.getItem("customEvents") || "[]"
  );

  const allEvents = [...events, ...customEvents];

  const foundEvent = allEvents.find(
    (e) => e.id === Number(id)
  );

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setEvent(foundEvent || null);
}, [id]);

  

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">
          Event Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-6xl mx-auto px-6 py-10">

        <Link
          href="/events"
          className="text-violet-400 hover:text-violet-300"
        >
          ← Back to Events
        </Link>

        <div className="mt-8">

          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              width={1200}
              height={500}
              unoptimized
              className="w-full h-[420px] object-cover rounded-3xl"
            />
          ) : (
            <div className="w-full h-[420px] bg-slate-800 rounded-3xl flex items-center justify-center">
              No Image Available
            </div>
          )}

        </div>

        <div className="mt-10">

          <div className="flex justify-between items-center flex-wrap gap-4">

            <h1 className="text-5xl font-bold">
              {event.title}
            </h1>

            <span
              className={`px-5 py-2 rounded-full font-semibold ${
                event.status === "live"
                  ? "bg-red-600"
                  : event.status === "completed"
                  ? "bg-green-600"
                  : "bg-violet-600"
              }`}
            >
              {event.status.toUpperCase()}
            </span>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="bg-slate-900 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Event Information
              </h2>

              <div className="space-y-3 text-gray-300">

                <p>📅 {event.date}</p>

                <p>⏰ {event.time}</p>

                <p>📍 {event.venue}</p>

                <p>🏷️ {event.category}</p>

                <p>👤 {event.organizer || "N/A"}</p>

                <p>
                  👥 {event.participants || "N/A"}
                </p>

                <p>💰 {event.fee || "Free"}</p>

                <p>📞 {event.contact || "N/A"}</p>

              </div>

            </div>

            <div className="bg-slate-900 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Description
              </h2>

              <p className="text-gray-300 leading-8">
                {event.description ||
                  "No description available."}
              </p>

            </div>

          </div>

          <div className="mt-10">

            {event.status === "completed" ? (

              <button
                disabled
                className="bg-gray-600 text-gray-300 px-8 py-4 rounded-xl cursor-not-allowed"
              >
                ✓ Event Completed
              </button>

            ) : (

              <button
                onClick={() => setShowModal(true)}
                className={`px-8 py-4 rounded-xl font-semibold transition ${
                  event.status === "live"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-violet-600 hover:bg-violet-700"
                }`}
              >
                Register Now
              </button>

            )}
            {showModal && (
              <RegisterModal
                eventTitle={event.title}
                onClose={() => setShowModal(false)}
              />
            )}

          </div>

        </div>

      </div>

    </div>
  );
}