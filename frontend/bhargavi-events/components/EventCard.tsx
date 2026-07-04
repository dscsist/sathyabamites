"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RegisterModal from "./RegisterModal";

type EventProps = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  status: string;
};

export default function EventCard({
  id,
  title,
  date,
  time,
  venue,
  image,
  status,
}: EventProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-violet-500/20 hover:-translate-y-2 transition duration-300">

        <Link href={`/events/${id}`}>

          <div className="relative">

            {image ? (
              <Image
                src={image}
                alt={title}
                width={400}
                height={220}
                className="w-full h-52 object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-52 bg-slate-700 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            <span
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${
                status === "live"
                  ? "bg-red-600"
                  : status === "completed"
                  ? "bg-gray-700"
                  : "bg-violet-600"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>

          </div>

          <div className="p-5">

            <h2 className="text-xl font-bold text-white">
              {title}
            </h2>

            <div className="mt-4 space-y-2 text-gray-300 text-sm">

              <p>📅 {date}</p>
              <p>⏰ {time}</p>
              <p>📍 {venue}</p>

            </div>

          </div>

        </Link>

        <div className="px-5 pb-5">

          {status === "completed" ? (

            <button
              disabled
              className="w-full py-3 rounded-xl bg-gray-600 text-gray-300 cursor-not-allowed font-semibold"
            >
              ✓ Event Completed
            </button>

          ) : (

            <button
              onClick={() => setShowModal(true)}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                status === "live"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-violet-600 hover:bg-violet-700"
              }`}
            >
              {status === "live"
                ? "🔴 Register Now"
                : "Register"}
            </button>

          )}

        </div>

      </div>

      {showModal && (
        <RegisterModal
          eventTitle={title}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}