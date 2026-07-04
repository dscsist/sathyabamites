export default function PortfolioStrength() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5">
        📈 Portfolio Strength
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full w-[85%]"></div>
      </div>

      <p className="mt-3 text-sm text-gray-600">
        <span className="font-bold text-blue-600">85%</span> Profile Completed
      </p>

      <div className="mt-5 space-y-2 text-sm text-gray-600">
        <p>✅ Personal Details</p>
        <p>✅ Skills Added</p>
        <p>✅ Projects Added</p>
        <p>✅ Achievements Added</p>
        <p>⬜ Certifications Pending</p>
      </div>
    </div>
  );
}