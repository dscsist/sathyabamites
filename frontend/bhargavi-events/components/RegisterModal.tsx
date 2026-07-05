"use client";

import { useState } from "react";

type Props = {
  eventTitle: string;
  onClose: () => void;
};
type Registration = {
  id: number;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  reason: string;
};

export default function RegisterModal({
  eventTitle,
  onClose,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [reason, setReason] = useState("");

  const handleRegister = () => {
    if (!name || !email || !phone || !department || !year) {
      alert("Please fill all required fields.");
      return;
    }

    const registration = {
      id: Date.now(),
      eventTitle,
      name,
      email,
      phone,
      department,
      year,
      reason,
    };

const registrations: Registration[] = JSON.parse(
  localStorage.getItem("registrations") || "[]"
);

const alreadyRegistered = registrations.some(
  (r) =>
    r.email === email &&
    r.eventTitle === eventTitle
);

    if (alreadyRegistered) {
      alert("You have already registered for this event.");
      return;
    }

    registrations.push(registration);

    localStorage.setItem(
      "registrations",
      JSON.stringify(registrations)
    );

    alert("🎉 Registration Successful!");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-5">

      <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 w-full max-w-2xl p-8 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-white">
          Event Registration
        </h2>

        <p className="text-gray-400 mt-2 mb-8">
          Complete the form below to reserve your seat.
        </p>

        <div className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-base font-semibold mb-2 text-gray-100">
              Full Name <span className="text-red-400">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-violet-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-base font-semibold mb-2 text-gray-100">
              Email Address <span className="text-red-400">*</span>
            </label>

            <input
              type="email"
              placeholder="example@email.com"
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-violet-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-base font-semibold mb-2 text-gray-100">
              Phone Number <span className="text-red-400">*</span>
            </label>

            <input
              type="tel"
              placeholder="Enter phone number"
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-violet-500 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-base font-semibold mb-2 text-gray-100">
              Department <span className="text-red-400">*</span>
            </label>

            <input
              type="text"
              placeholder="CSE / AIML / ECE..."
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-violet-500 outline-none"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-base font-semibold mb-2 text-gray-100">
              Year of Study <span className="text-red-400">*</span>
            </label>

            <select
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-violet-500 outline-none"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-base font-semibold mb-2 text-gray-100">
              Why do you want to attend?
            </label>

            <textarea
              rows={4}
              placeholder="Tell us why you're interested..."
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-violet-500 resize-none outline-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-3">

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleRegister}
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition font-semibold"
            >
              Register
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}