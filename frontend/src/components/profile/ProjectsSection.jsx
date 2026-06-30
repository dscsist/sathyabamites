export default function ProjectsSection() {
  const projects = [
    {
      title: "PPE Safety Monitoring System",
      description:
        "AI-powered system that detects safety equipment like helmets and vests using YOLOv8.",
      tech: ["Python", "YOLOv8", "OpenCV"],
    },
    {
      title: "GRN Automation",
      description:
        "Automated Goods Receipt Note generation with OCR and document verification.",
      tech: ["Python", "OCR", "Flask"],
    },
    {
      title: "Sathyabamites",
      description:
        "Student community platform for profiles, clubs, projects, achievements, and events.",
      tech: ["Next.js", "React", "Tailwind"],
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🚀 Featured Projects</h2>

        <button className="text-blue-600 font-semibold hover:underline">
          View All →
        </button>
      </div>

      <div className="space-y-5">

        {projects.map((project) => (

          <div
            key={project.title}
            className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition duration-300"
          >

            <h3 className="text-xl font-semibold text-gray-800">
              {project.title}
            </h3>

            <p className="text-gray-500 mt-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-5">

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                GitHub
              </button>

              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                Live Demo
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}