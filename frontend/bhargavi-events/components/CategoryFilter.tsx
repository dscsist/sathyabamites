"use client";

type Props = {
  selected: string;
  setSelected: (category: string) => void;
};

const categories = [
  "All",
  "Workshop",
  "Hackathon",
  "Talk",
  "Seminar",
  "Competition",
  "Cultural",
];

export default function CategoryFilter({
  selected,
  setSelected,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-5 py-2 rounded-full font-medium transition ${
            selected === category
              ? "bg-violet-600 text-white"
              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}