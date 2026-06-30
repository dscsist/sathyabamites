import { FolderKanban, Trophy, Code2, Users } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      title: "Projects",
      value: "12",
      icon: <FolderKanban size={28} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Achievements",
      value: "8",
      icon: <Trophy size={28} />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Hackathons",
      value: "5",
      icon: <Code2 size={28} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Community",
      value: "980",
      icon: <Users size={28} />,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
        >
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.color} text-white flex items-center justify-center mb-4`}
          >
            {stat.icon}
          </div>

          <h2 className="text-3xl font-bold text-gray-900">{stat.value}</h2>

          <p className="text-gray-500 mt-1">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}