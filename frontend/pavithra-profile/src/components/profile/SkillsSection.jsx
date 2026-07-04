export default function SkillsSection({ skills }) {
  // Group skills by category
  const groupedSkills = skills.reduce((groups, skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = [];
    }
    groups[skill.category].push(skill.name);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        💻 Skills
      </h2>

      <div className="space-y-5">
        {Object.entries(groupedSkills).map(([category, skillList]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              {category}
            </h3>

            <div className="flex flex-wrap gap-2">
              {skillList.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}