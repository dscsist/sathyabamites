export default function ProfileHeader({ personal }) {
  return (
    <div className="rounded-3xl overflow-hidden bg-white shadow-lg border border-gray-200">

      {/* Banner */}
      <div className="h-44 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700"></div>

      {/* Content */}
      <div className="px-8 pb-8">

        {/* Avatar */}
        <img
          src={personal.avatar}
          alt={personal.name}
          className="w-36 h-36 rounded-full border-4 border-white -mt-20 shadow-lg"
        />

        <div className="mt-5">

          <h1 className="text-4xl font-bold text-gray-900">
            {personal.name}
          </h1>

          <p className="text-blue-600 text-lg font-semibold mt-2">
            {personal.role}
          </p>

          <p className="text-gray-600 mt-1">
            {personal.department} • {personal.year}
          </p>

          <p className="text-gray-500">
            {personal.university}
          </p>

          <p className="mt-5 text-gray-700 leading-7">
            {personal.bio}
          </p>

          {/* Contact */}
          <div className="mt-6 space-y-2">

            <p>
              📧 {personal.email}
            </p>

            <p>
              📞 {personal.phone}
            </p>

            <p>
              📍 {personal.location}
            </p>

          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 mt-8">

            <a
              href={personal.social.github}
              className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
            >
              GitHub
            </a>

            <a
              href={personal.social.linkedin}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              LinkedIn
            </a>

            <a
              href={personal.social.portfolio}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Portfolio
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}