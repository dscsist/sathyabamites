"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Workshop");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [status, setStatus] = useState("upcoming");
  const [description, setDescription] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [participants, setParticipants] = useState("");
  const [fee, setFee] = useState("Free");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      title,
      category,
      date,
      time,
      venue,
      status,
      description,
      organizer,
      participants,
      fee,
      contact,
      image,
    };

    const existing = JSON.parse(
      localStorage.getItem("customEvents") || "[]"
    );

    existing.push(newEvent);

    localStorage.setItem(
      "customEvents",
      JSON.stringify(existing)
    );

    alert("🎉 Event Created Successfully!");

    router.push("/events");
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-5 flex justify-center">
      <div className="w-full max-w-5xl bg-slate-900 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-white">
          Create New Event
        </h1>
       

        <p className="text-center text-gray-400 mt-2 mb-10">
          Fill in all the event details.
        </p>
        <p className="text-sm text-gray-400 mt-2">
  <span className="text-red-700">*</span> (indicates required fields.)
</p>

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >

          <div>
            <label className="block text-white mb-2 font-semibold">
              Event Title<span className="text-red-500">*</span>
            </label>

            <input
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
              placeholder="Hackathon"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-white mb-2 font-semibold">
                Category<span className="text-red-500">*</span>
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <option>Workshop</option>
                <option>Hackathon</option>
                <option>Seminar</option>
                <option>Talk</option>
                <option>Competition</option>
                <option>Cultural</option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-2 font-semibold">
                Status<span className="text-red-500">*</span>
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="completed">
                  Completed
                </option>
              </select>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-white mb-2 font-semibold">
                Date<span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                required
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-semibold">
                Time<span className="text-red-500">*</span>
              </label>

              <input
                type="time"
                required
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">
              Venue<span className="text-red-500">*</span>
            </label>

            <input
              required
              value={venue}
              onChange={(e) =>
                setVenue(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-white mb-2 font-semibold">
                Organizer<span className="text-red-500">*</span>
              </label>

              <input
                value={organizer}
                onChange={(e) =>
                  setOrganizer(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-semibold">
                Maximum Participants<span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                value={participants}
                onChange={(e) =>
                  setParticipants(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-white mb-2 font-semibold">
                Registration Fee<span className="text-red-500">*</span>
              </label>

              <input
                value={fee}
                onChange={(e) =>
                  setFee(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-semibold">
                Contact Number<span className="text-red-500">*</span>
              </label>

              <input
                value={contact}
                onChange={(e) =>
                  setContact(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

          </div>

          <div>

            <label className="block text-white mb-3 font-semibold">
              Event Image<span className="text-red-500">*</span>
            </label>

            <label className="flex items-center justify-center h-44 rounded-2xl border-2 border-dashed border-slate-600 bg-slate-800 hover:border-violet-500 cursor-pointer">

              <div className="text-center">
                <p className="text-5xl">📷</p>

                <p className="mt-3 text-white">
                  Click to Upload
                </p>

                <p className="text-sm text-gray-400">
                  PNG, JPG, JPEG
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />

            </label>

            {image && (
  <Image
    src={image}
    alt="Preview"
    width={800}
    height={400}
    unoptimized
    className="mt-5 rounded-xl h-72 w-full object-cover"
  />
)}

          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 py-4 rounded-xl text-lg font-bold"
          >
            🚀 Create Event
          </button>

        </form>

      </div>
    </div>
  );
}