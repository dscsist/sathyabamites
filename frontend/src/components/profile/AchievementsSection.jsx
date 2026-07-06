export default function AchievementsSection({ achievements }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        🏆 Achievements
      </h2>

      <div className="space-y-4">
        {achievements.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition"
          >
            <div className="text-3xl">
              🏅
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}