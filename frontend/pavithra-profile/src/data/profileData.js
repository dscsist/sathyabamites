const profileData = {
  personal: {
    name: "Pavithra E",
    role: "Computer Science Engineering Student",
    year: "III Year",
    department: "Computer Science and Engineering",
    university: "Sathyabama Institute of Science and Technology",

    bio:
      "Passionate Full Stack Developer with an interest in AI, Full Stack Development, and building impactful solutions for real-world problems.",

    email: "pavithra@sathyabama.ac.in",
    phone: "+91 9876543210",
    location: "Chennai, Tamil Nadu",

    avatar:
      "https://ui-avatars.com/api/?name=Pavithra+E&background=2563eb&color=fff&size=256",

    social: {
      github: "#",
      linkedin: "#",
      portfolio: "#",
    },
  },

  stats: [
    {
      title: "Projects",
      value: 12,
    },
    {
      title: "Achievements",
      value: 8,
    },
    {
      title: "Hackathons",
      value: 5,
    },
    {
      title: "Community Points",
      value: 980,
    },
  ],

  skills: [
    { name: "C", category: "Programming" },
    { name: "C++", category: "Programming" },
    { name: "Java", category: "Programming" },
    { name: "Python", category: "Programming" },

    { name: "HTML", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },

    { name: "Node.js", category: "Backend" },

    { name: "MongoDB", category: "Database" },
    { name: "MySQL", category: "Database" },

    { name: "Git", category: "Tools" },
    { name: "GitHub", category: "Tools" },
    { name: "VS Code", category: "Tools" },
    { name: "Tailwind CSS", category: "Tools" },
  ],

  projects: [
    {
      title: "PPE Safety Monitoring System",
      description:
        "AI-powered industrial safety monitoring system using YOLOv8 for helmet and safety vest detection.",
      tech: ["Python", "YOLOv8", "OpenCV"],
      featured: true,
    },

    {
      title: "Sathyabamites Student Dashboard",
      description:
        "Modern student portfolio dashboard built using Next.js, React, and Tailwind CSS.",
      tech: ["Next.js", "React", "Tailwind CSS"],
      featured: true,
    },

    {
      title: "GRN Automation",
      description:
        "Automated Goods Receipt Note workflow for manufacturing industries.",
      tech: ["React", "Node.js", "MongoDB"],
      featured: false,
    },
  ],

  achievements: [
    {
      title: "Hackathon Finalist",
      year: "2025",
    },
    {
      title: "Paper Presentation Winner",
      year: "2025",
    },
    {
      title: "NCC Volunteer",
      year: "2024",
    },
    {
      title: "IEEE Student Member",
      year: "2024",
    },
  ],

  certifications: [
    {
      title: "AWS Cloud Foundation",
    },
    {
      title: "Python Programming",
    },
    {
      title: "Frontend Development",
    },
  ],

  clubs: [
    "NCC",
    "IEEE",
    "CSI",
    "Google Developer Student Club",
  ],
};

export default profileData;