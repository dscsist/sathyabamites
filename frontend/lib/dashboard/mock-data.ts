import type {
  Activity,
  Contributor,
  DashboardStat,
  EventItem,
  MockUser,
  NotificationItem,
  Project,
  Resource
} from "./types";

export const mockUser: MockUser = {
  name: "Theedchana",
  role: "Student Builder",
  department: "2nd Year B.E. CSE AIR",
  avatar: "TH",
  imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
};

export const mockStats: DashboardStat[] = [
  { id: "projects", label: "Projects", value: 150, suffix: "+", monthlyGrowth: 12, accent: "from-violet-500 to-purple-700" },
  { id: "events", label: "Events", value: 25, suffix: "+", monthlyGrowth: 5, accent: "from-orange-500 to-amber-700" },
  { id: "resources", label: "Resources", value: 300, suffix: "+", monthlyGrowth: 18, accent: "from-emerald-400 to-green-700" },
  { id: "opportunities", label: "Opportunities", value: 40, suffix: "+", monthlyGrowth: 7, accent: "from-pink-500 to-rose-700" }
];

export const mockProjects: Project[] = [
  {
    id: "smart-ppe",
    title: "Smart PPE Detection System",
    category: "AI/ML",
    summary: "Computer vision system that detects safety equipment compliance in lab and industrial footage.",
    description: "A real-time safety monitoring project using object detection, alert logs, and role-based review dashboards for campus labs.",
    imageTone: "from-blue-700 via-cyan-500 to-violet-700",
    imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=420&q=80",
    contributors: ["Theedchana", "Rahul R", "Priya S", "Kavin Prakash"],
    techStack: ["Python", "YOLOv8", "ML"],
    likes: 128,
    views: 1200,
    updatedAt: "2026-06-24",
    githubUrl: "https://github.com/sathyabamites/smart-ppe",
    demoUrl: "https://smart-ppe.example.com"
  },
  {
    id: "sathyabamites-platform",
    title: "Sathyabamites Platform",
    category: "Web Development",
    summary: "Community platform for projects, resources, events, and student discovery.",
    description: "A premium student-community dashboard that helps Sathyabama students showcase work, join events, and discover opportunities.",
    imageTone: "from-violet-700 via-indigo-600 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=420&q=80",
    contributors: ["Kavin Prakash", "Theedchana", "Nandhini V", "Arjun R", "Priya S", "Rahul R"],
    techStack: ["Next.js", "Tailwind", "MongoDB"],
    likes: 96,
    views: 980,
    updatedAt: "2026-06-22",
    githubUrl: "https://github.com/sathyabamites/platform",
    demoUrl: "https://sathyabamites.example.com"
  },
  {
    id: "drone-surveillance",
    title: "Drone Surveillance System",
    category: "Research",
    summary: "Autonomous drone monitoring prototype for campus safety and research inspection routes.",
    description: "A route-aware drone surveillance project with live telemetry, anomaly tagging, and research data export.",
    imageTone: "from-sky-600 via-slate-700 to-orange-400",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=420&q=80",
    contributors: ["Arjun R", "Theedchana", "Nandhini V"],
    techStack: ["React", "Node.js", "AI"],
    likes: 74,
    views: 740,
    updatedAt: "2026-06-20",
    githubUrl: "https://github.com/sathyabamites/drone-surveillance",
    demoUrl: "https://drone-surveillance.example.com"
  },
  {
    id: "campus-wallet",
    title: "Campus Wallet",
    category: "Mobile Apps",
    summary: "Mobile app prototype for student payments, club dues, and event passes.",
    description: "A secure mobile wallet concept for student clubs, event tickets, and campus store payments.",
    imageTone: "from-emerald-500 via-blue-500 to-violet-700",
    imageUrl: "https://images.unsplash.com/photo-1551650992-ee4fd47df41f?auto=format&fit=crop&w=420&q=80",
    contributors: ["Priya S", "Rahul R", "Arjun R"],
    techStack: ["React Native", "Node.js", "UPI"],
    likes: 65,
    views: 620,
    updatedAt: "2026-06-16",
    githubUrl: "https://github.com/sathyabamites/campus-wallet",
    demoUrl: "https://campus-wallet.example.com"
  }
];

export const mockEvents: EventItem[] = [
  {
    id: "hackathon-2026",
    title: "Sathyabama Hackathon 2026",
    category: "Hackathons",
    date: "2026-07-15",
    time: "10:00 AM - 6:00 PM",
    venue: "Seminar Hall",
    host: "Innovation Cell",
    description: "A full-day build sprint for campus products, AI prototypes, and student startup ideas.",
    registered: false
  },
  {
    id: "ai-ml-workshop",
    title: "AI/ML Workshop",
    category: "Workshops",
    date: "2026-07-20",
    time: "02:00 PM - 05:00 PM",
    venue: "Lab 101",
    host: "AI Society",
    description: "Hands-on model training, deployment basics, and project review for AI/ML beginners.",
    registered: false
  },
  {
    id: "web-bootcamp",
    title: "Web Development Bootcamp",
    category: "Workshops",
    date: "2026-07-25",
    time: "10:00 AM - 01:00 PM",
    venue: "Online",
    host: "Web Guild",
    description: "Build a production-ready landing page with React, Tailwind CSS, and deployment basics.",
    registered: true
  },
  {
    id: "future-ai-talk",
    title: "AI Paper Jam",
    category: "Clubs",
    date: "2026-07-30",
    time: "04:00 PM - 06:00 PM",
    venue: "Auditorium",
    host: "AI Society",
    description: "Club talk on future AI systems, responsible deployment, and campus research pathways.",
    registered: false
  }
];

export const mockResources: Resource[] = [
  { id: "react-roadmap", title: "React Project Roadmap", category: "Development", sharedBy: "Meera K" },
  { id: "dsa-kit", title: "DSA Revision Kit", category: "Interview", sharedBy: "Rahul B" },
  { id: "design-systems", title: "Design Systems Starter", category: "Design", sharedBy: "Janani V" },
  { id: "ml-notes", title: "Machine Learning Notes", category: "AI", sharedBy: "Keerthana J" }
];

export const mockActivities: Activity[] = [
  {
    id: "a1",
    type: "project",
    title: "uploaded a new project Smart Waste Management System",
    actor: "Rahul R",
    createdAt: "2026-06-26T14:20:00+05:30"
  },
  {
    id: "a2",
    type: "event",
    title: "registered for AI/ML Workshop",
    actor: "Priya S",
    createdAt: "2026-06-26T13:20:00+05:30"
  },
  {
    id: "a3",
    type: "resource",
    title: "shared a resource React Roadmap for 2024",
    actor: "Kavin Prakash",
    createdAt: "2026-06-26T11:20:00+05:30"
  },
  {
    id: "a4",
    type: "achievement",
    title: "earned 2nd place in CodeSprint 2024",
    actor: "Arjun R",
    createdAt: "2026-06-25T14:20:00+05:30"
  }
];

export const mockContributors: Contributor[] = [
  { id: "c1", name: "Rahul R", avatar: "RR", departmentYear: "Final Year CSE", projects: 6, likes: 170, events: 5, resources: 1 },
  { id: "c2", name: "Priya S", avatar: "PS", departmentYear: "3rd Year IT", projects: 5, likes: 150, events: 4, resources: 2 },
  { id: "c3", name: "Kavin Prakash", avatar: "KP", departmentYear: "Final Year ECE", projects: 5, likes: 130, events: 3, resources: 2 },
  { id: "c4", name: "Nandhini V", avatar: "NV", departmentYear: "3rd Year CSE", projects: 4, likes: 105, events: 3, resources: 2 },
  { id: "c5", name: "Arjun R", avatar: "AR", departmentYear: "Final Year CSE", projects: 3, likes: 96, events: 3, resources: 1 }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Project liked",
    body: "Campus Connect received 12 new likes today.",
    unread: true,
    createdAt: "2026-06-26T08:30:00+05:30"
  },
  {
    id: "n2",
    title: "Event reminder",
    body: "Portfolio Clinic starts on June 29 at 4:30 PM.",
    unread: true,
    createdAt: "2026-06-25T20:00:00+05:30"
  },
  {
    id: "n3",
    title: "New resource",
    body: "A Design Systems Starter pack was added.",
    unread: false,
    createdAt: "2026-06-24T10:15:00+05:30"
  }
];
