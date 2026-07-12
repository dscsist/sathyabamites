import { useState, Dispatch, SetStateAction } from 'react';
import { 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  ExternalLink,
  MessageSquare,
  FileText,
  Github,
  Mail,
  Phone
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  author: string;
  tags: string[];
  image: string;
}

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  registered: boolean;
}

interface SubViewsProps {
  viewName: string;
  setViewName: (name: string) => void;
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  events: EventItem[];
  setEvents: Dispatch<SetStateAction<EventItem[]>>;
  username: string;
  onAddProject: () => void;
}

export default function SubViews({ 
  viewName, 
  projects, 
  events, 
  setEvents, 
  username,
  onAddProject 
}: SubViewsProps) {
  const [searchFilter, setSearchFilter] = useState('');
  
  // Profile settings state
  const [profileName, setProfileName] = useState(username);
  const [profileDept, setProfileDept] = useState('Computer Science & Engineering');
  const [profileYear, setProfileYear] = useState('3rd Year');
  const [isSaved, setIsSaved] = useState(false);

  // Resource vaults
  const resources = [
    { title: 'DSA Placement Roadmap 2026', size: '2.4 MB', category: 'Placements', downloads: 1400 },
    { title: 'Operating Systems Cheat Sheet', size: '1.1 MB', category: 'Academics', downloads: 850 },
    { title: 'Full-Stack Developer Path Guide', size: '3.8 MB', category: 'Web Development', downloads: 2200 },
    { title: 'Introduction to GitHub & Git CLI', size: '1.7 MB', category: 'Open Source', downloads: 1050 },
    { title: 'Computer Networks Lecture Notes', size: '4.2 MB', category: 'Academics', downloads: 640 },
    { title: 'Machine Learning algorithms in Python', size: '5.1 MB', category: 'Artificial Intelligence', downloads: 1800 }
  ];

  // Career opportunities
  const careers = [
    { title: 'Associate Software Engineer Intern', company: 'Zoho Corporation', loc: 'Chennai, India', type: 'Full-time Intern', salary: '₹25,000 / month' },
    { title: 'Frontend Developer Co-op', company: 'Cognizant', loc: 'Chennai (OMR), India', type: '6 Months Intern', salary: '₹18,000 / month' },
    { title: 'QA & Automation Intern', company: 'Freshworks', loc: 'Chennai, India', type: 'Part-time Intern', salary: '₹22,000 / month' },
    { title: 'DevOps Intern', company: 'Virtusa', loc: 'Remote, India', type: 'Remote', salary: '₹15,000 / month' }
  ];

  const handleRegisterEvent = (id: number) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        return { ...ev, registered: !ev.registered };
      }
      return ev;
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const registeredEvents = events.filter(e => e.registered);
  const myProjects = projects.filter(p => p.author === username);

  switch (viewName) {
    case 'Projects': {
      const filtered = projects.filter(p => 
        p.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
        p.tags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()))
      );

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">Project Hub</h2>
              <p className="text-slate-400 text-xs">Browse and search through student innovations</p>
            </div>
            
            <button 
              onClick={onAddProject}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-center transition-all"
            >
              <Plus size={16} />
              <span>Share Project</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search projects by title, language or framework..." 
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 outline-none transition-all"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="liquid-glass border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl hover:border-indigo-500/20 transition-all duration-300">
                {/* Visual frame */}
                <div className="h-44 w-full relative bg-slate-900 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080e] via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">{p.title}</h3>
                    <p className="text-[10px] text-slate-500 font-semibold">By {p.author}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-slate-400 font-semibold">{t}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[10px] text-slate-500 font-bold">Active Project</span>
                    <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                      <span>Preview</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 text-xs">
                No projects matched your search criteria.
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'Events': {
      return (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Events & Hackathons</h2>
            <p className="text-slate-400 text-xs">Find upcoming bootcamps, tech talks, and project competitions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(ev => (
              <div key={ev.id} className="liquid-glass border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-6 hover:shadow-xl hover:border-indigo-500/20 transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${ev.registered ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                      {ev.registered ? 'Enrolled' : 'Open Registration'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{ev.title}</h3>
                  <p className="text-slate-400 text-xs">Join Sathyabama's tech community to learn, build projects, and compete for exciting prize pools.</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="grid grid-cols-2 gap-3 text-slate-400 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-indigo-400 shrink-0" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-indigo-400 shrink-0" />
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-indigo-400 shrink-0" />
                      <span>Academic Campus</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleRegisterEvent(ev.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      ev.registered 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                        : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                    }`}
                  >
                    {ev.registered ? 'Registered ✔' : 'Register Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'Resources': {
      return (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Resource Vault</h2>
            <p className="text-slate-400 text-xs">Curated notes, semester cheat sheets, and placement guidelines</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((res, i) => (
              <div key={i} className="liquid-glass border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-4 hover:shadow-lg transition-all">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                    <FileText size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{res.title}</h3>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-semibold">{res.category}</span>
                    <span>{res.size}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-[9px] text-slate-500 font-semibold">{res.downloads} downloads</span>
                  <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer">
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'Leaderboards': {
      const topUsers = [
        { rank: 1, name: 'Rahul R', dept: 'CSE', projects: 12, events: 8, points: 1200, badge: 'Gold Contributor' },
        { rank: 2, name: 'Priya S', dept: 'IT', projects: 9, events: 11, points: 1150, badge: 'Hackathon Champion' },
        { rank: 3, name: 'Kavin Prakash', dept: 'CSE', projects: 8, events: 7, points: 1000, badge: 'Code Master' },
        { rank: 4, name: 'Nandhini V', dept: 'ECE', projects: 6, events: 9, points: 850, badge: 'Open Source Guru' },
        { rank: 5, name: 'Arjun R', dept: 'CSE', projects: 5, events: 10, points: 750, badge: 'Resource Star' },
        { rank: 6, name: 'Pavithra E', dept: 'CSE', projects: 4, events: 6, points: 620, badge: 'Active Member' },
      ];

      return (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Community Leaderboards</h2>
            <p className="text-slate-400 text-xs">Showcasing the top active students contributing to the ecosystem</p>
          </div>

          <div className="liquid-glass border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">Rank</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">Student Name</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">Department</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">Projects</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">Events Joined</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">Points</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">Achievements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {topUsers.map((user, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-all">
                      <td className="py-4 px-6 text-sm font-bold">
                        <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-xs ${user.rank === 1 ? 'bg-amber-500/10 text-amber-400' : user.rank === 2 ? 'bg-slate-400/10 text-slate-400' : 'text-slate-500'}`}>
                          #{user.rank}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-white">{user.name}</td>
                      <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{user.dept}</td>
                      <td className="py-4 px-6 text-sm text-slate-300 font-semibold">{user.projects}</td>
                      <td className="py-4 px-6 text-sm text-slate-300 font-semibold">{user.events}</td>
                      <td className="py-4 px-6 text-sm text-violet-400 font-bold">{user.points} pts</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold">
                          {user.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    case 'Profile': {
      return (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Student Profile</h2>
            <p className="text-slate-400 text-xs">Manage your academic and community information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Box: Profile Info card */}
            <div className="liquid-glass border-white/5 rounded-2xl p-6 flex flex-col items-center text-center gap-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                  alt={profileName} 
                  className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500/40"
                />
                <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-[#07080e] rounded-full" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">{profileName}</h3>
                <p className="text-xs text-slate-400">{profileDept}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{profileYear}</p>
              </div>

              {/* Quick stats */}
              <div className="w-full grid grid-cols-3 gap-2 py-4 border-y border-white/5 text-center">
                <div>
                  <p className="text-sm font-bold text-white">{myProjects.length}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Projects</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{registeredEvents.length}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Events</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">620</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Points</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-all"><Github size={18} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-all"><Mail size={18} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-all"><Phone size={18} /></a>
              </div>
            </div>

            {/* Right Box: Edit Info */}
            <div className="lg:col-span-2 liquid-glass border-white/5 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-6">Edit Profile Details</h3>
              
              {isSaved && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl text-center mb-6">
                  Profile updated successfully!
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Full Name</label>
                    <input 
                      type="text" 
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Department</label>
                    <input 
                      type="text" 
                      value={profileDept}
                      onChange={(e) => setProfileDept(e.target.value)}
                      className="w-full bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Year of Study</label>
                    <select 
                      value={profileYear}
                      onChange={(e) => setProfileYear(e.target.value)}
                      className="w-full bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs text-white outline-none"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Student ID / Roll No</label>
                    <input 
                      type="text" 
                      defaultValue="39110684" 
                      disabled
                      className="w-full bg-[#05060a]/80 border border-white/5 cursor-not-allowed rounded-xl py-2.5 px-4 text-xs text-slate-500 outline-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-5 py-2.5 text-xs font-semibold transition-all shadow-md mt-4"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    case 'Settings': {
      return (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Portal Settings</h2>
            <p className="text-slate-400 text-xs">Configure notifications, security, and interface settings</p>
          </div>

          <div className="liquid-glass border-white/5 rounded-2xl p-6 max-w-2xl text-left space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">Notifications</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Event Reminders</p>
                  <p className="text-[10px] text-slate-500">Get notified 24 hours before registered events start</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 border-slate-700 bg-slate-900 rounded focus:ring-indigo-500" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Community Posts</p>
                  <p className="text-[10px] text-slate-500">Notify me when someone uploads a new project or resource</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 border-slate-700 bg-slate-900 rounded focus:ring-indigo-500" />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">Privacy & Visibility</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Public Profile</p>
                  <p className="text-[10px] text-slate-500">Allow other university students to see my projects and rank</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 border-slate-700 bg-slate-900 rounded focus:ring-indigo-500" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Leaderboard Exemption</p>
                  <p className="text-[10px] text-slate-500">Do not display my name in top contributors rankings</p>
                </div>
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-700 bg-slate-900 rounded focus:ring-indigo-500" />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-3">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-5 py-2.5 text-xs font-semibold transition-all">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'Messages': {
      return (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Student Chat Messages</h2>
            <p className="text-slate-400 text-xs">Direct messaging channel for Sathyabama students</p>
          </div>
          
          <div className="liquid-glass border-white/5 rounded-2xl p-8 text-center max-w-lg mx-auto py-16 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mx-auto">
              <MessageSquare size={22} />
            </div>
            <h3 className="text-sm font-bold text-white">No active conversations</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Start chatting with teammates, project mentors, or coordinators. Open a member's profile and click message to begin.
            </p>
          </div>
        </div>
      );
    }

    case 'Community': {
      return (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Clubs & Forums</h2>
            <p className="text-slate-400 text-xs">Connect with student-run clubs and developer forum categories</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 border border-white/5 rounded-2xl liquid-glass flex items-center justify-between group">
              <div className="text-left space-y-1">
                <h4 className="text-sm font-bold text-white">Sathyabama Developers Club</h4>
                <p className="text-[10px] text-slate-500 font-semibold">1,200 Active Members</p>
              </div>
              <button className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white transition-all">Join Club</button>
            </div>
            <div className="p-5 border border-white/5 rounded-2xl liquid-glass flex items-center justify-between group">
              <div className="text-left space-y-1">
                <h4 className="text-sm font-bold text-white">AI & ML Research Group</h4>
                <p className="text-[10px] text-slate-500 font-semibold">450 Active Members</p>
              </div>
              <button className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white transition-all">Join Club</button>
            </div>
            <div className="p-5 border border-white/5 rounded-2xl liquid-glass flex items-center justify-between group">
              <div className="text-left space-y-1">
                <h4 className="text-sm font-bold text-white">Google Developer Student Clubs (GDSC)</h4>
                <p className="text-[10px] text-slate-500 font-semibold">820 Active Members</p>
              </div>
              <button className="rounded-lg bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30 px-3 py-1.5 text-xs font-bold cursor-default">Member</button>
            </div>
            <div className="p-5 border border-white/5 rounded-2xl liquid-glass flex items-center justify-between group">
              <div className="text-left space-y-1">
                <h4 className="text-sm font-bold text-white">Robotics & IoT Association</h4>
                <p className="text-[10px] text-slate-500 font-semibold">310 Active Members</p>
              </div>
              <button className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white transition-all">Join Club</button>
            </div>
          </div>
        </div>
      );
    }

    case 'Career Network': {
      return (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Career Network</h2>
            <p className="text-slate-400 text-xs">Exclusively sourced internship and job positions for Sathyabama students</p>
          </div>

          <div className="space-y-4">
            {careers.map((job, idx) => (
              <div key={idx} className="liquid-glass border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/20 transition-all duration-300">
                <div className="text-left space-y-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[9px] font-bold uppercase tracking-wider">
                    {job.type}
                  </span>
                  <h3 className="text-base font-bold text-white">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 text-xs font-semibold">
                    <span className="text-slate-300">{job.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.loc}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{job.salary}</span>
                  </div>
                </div>

                <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 text-xs font-semibold transition-all shadow-md self-start sm:self-center">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    default:
      return <div className="text-white">View not found</div>;
  }
}
