export default function ClubsSection({ clubs }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5">
        👥 Clubs & Organizations
      </h2>

      <div className="flex flex-wrap gap-3">
        {clubs.map((club) => (
          <span
            key={club}
            className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-600 hover:text-white transition duration-300"
          >
            {club}
          </span>
        ))}
      </div>
    </div>
  );
}