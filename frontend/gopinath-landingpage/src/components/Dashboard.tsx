import React, { useState } from 'react';
import { 
  Layers, 
  Calendar, 
  Database, 
  Briefcase, 
  Bell, 
  Search, 
  LogOut, 
  Plus, 
  MessageSquare, 
  Award, 
  CheckCircle,
  Clock,
  User,
  Settings as SettingsIcon,
  ChevronRight,
  Send,
  Zap,
  Flame
} from 'lucide-react';
import SubViews from './SubViews';

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

interface FeedItem {
  id: number;
  author: string;
  avatar: string;
  action: string;
  time: string;
}

interface Contributor {
  rank: number;
  name: string;
  points: number;
  avatar: string;
}

interface DashboardProps {
  username: string;
  onLogout: () => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  feed: FeedItem[];
  setFeed: React.Dispatch<React.SetStateAction<FeedItem[]>>;
}

export default function Dashboard({ 
  username, 
  onLogout,
  projects,
  setProjects,
  events,
  setEvents,
  feed,
  setFeed
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Arjun published a new roadmap: DSA Guide', read: false },
    { id: 2, text: 'Sathyabama Hackathon 2024 starts in 10 days!', read: false },
    { id: 3, text: 'Priya S gave your project a thumbs up!', read: true },
  ]);

  const [feedInput, setFeedInput] = useState('');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // New project form state
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjTags, setNewProjTags] = useState('');
  const [newProjImg, setNewProjImg] = useState('');

  const sidebarItems = [
    { name: 'Dashboard', icon: Layers },
    { name: 'Projects', icon: Layers },
    { name: 'Events', icon: Calendar },
    { name: 'Resources', icon: Database },
    { name: 'Community', icon: Flame },
    { name: 'Career Network', icon: Briefcase },
    { name: 'Leaderboards', icon: Award },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Profile', icon: User },
    { name: 'Settings', icon: SettingsIcon },
  ];

  const contributors: Contributor[] = [
    { rank: 1, name: 'Rahul R', points: 1200, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80' },
    { rank: 2, name: 'Priya S', points: 1150, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' },
    { rank: 3, name: 'Kavin Prakash', points: 1000, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
    { rank: 4, name: 'Nandhini V', points: 850, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80' },
    { rank: 5, name: 'Arjun R', points: 750, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80' },
  ];

  const handleRegisterEvent = (id: number) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        // Toggle registration
        const newStatus = !ev.registered;
        
        // Add a notification if registered
        if (newStatus) {
          setNotifications(prevNotif => [
            { id: Date.now(), text: `Successfully registered for: ${ev.title}`, read: false },
            ...prevNotif
          ]);
        }
        return { ...ev, registered: newStatus };
      }
      return ev;
    }));
  };

  const handlePostFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedInput.trim()) return;

    const newItem: FeedItem = {
      id: Date.now(),
      author: username,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      action: feedInput,
      time: 'Just now'
    };

    setFeed(prev => [newItem, ...prev]);
    setFeedInput('');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;

    const tagsArray = newProjTags ? newProjTags.split(',').map(t => t.trim()) : ['React', 'CSS'];
    const image = newProjImg.trim() || 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=400&q=80';

    const newProject: Project = {
      id: Date.now(),
      title: newProjTitle,
      author: username,
      tags: tagsArray,
      image
    };

    setProjects(prev => [newProject, ...prev]);
    setShowAddProjectModal(false);
    
    // Reset form
    setNewProjTitle('');
    setNewProjTags('');
    setNewProjImg('');

    // Trigger notification
    setNotifications(prevNotif => [
      { id: Date.now(), text: `Successfully uploaded project: ${newProjTitle}`, read: false },
      ...prevNotif
    ]);
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#07080e] flex relative overflow-hidden">
      
      {/* Background ambient orbs */}
      <div className="absolute top-[10%] left-[25%] w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-indigo-950/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-64 liquid-glass border-r border-white/5 flex flex-col justify-between shrink-0 relative z-30 select-none">
        <div className="p-6 space-y-8 flex-1 flex flex-col overflow-y-auto no-scrollbar">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-violet-500/10">
              <Zap size={18} className="text-white fill-white/10" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Sathyabamites</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 flex-1">
            {sidebarItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.name 
                    ? 'bg-violet-600/90 text-white shadow-md shadow-violet-500/10' 
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <item.icon size={18} className={activeTab === item.name ? 'text-white' : 'text-slate-400'} />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-white/5 bg-[#080912]/80">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-all"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative z-20">
        
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 liquid-glass px-8 flex items-center justify-between shrink-0">
          {/* Search bar */}
          <div className="relative w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search anything..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500/50 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 outline-none transition-all"
            />
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-6 relative">
            
            {/* Notification trigger */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markAllNotificationsRead();
                }}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all relative"
              >
                <Bell size={20} />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-[#07080e]">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {/* Dropdown notifications */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 liquid-glass border-white/10 rounded-2xl shadow-xl py-2 z-40 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-4 py-2 border-b border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Notifications</span>
                    <button 
                      onClick={() => setNotifications([])} 
                      className="text-[9px] font-bold text-rose-400 hover:text-rose-300"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-xs text-slate-600">No new alerts</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="px-4 py-2.5 hover:bg-white/[0.02] border-b border-white/5 last:border-0 flex items-start gap-2.5">
                          <CheckCircle size={14} className="text-violet-400 shrink-0 mt-0.5" />
                          <p className="text-slate-300 text-xs leading-relaxed">{n.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile badge */}
            <div className="flex items-center gap-3 border-l border-white/5 pl-6">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
                alt={username} 
                className="w-9 h-9 rounded-full object-cover border border-indigo-500/20"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-white">{username}</p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Student Member</p>
              </div>
            </div>

          </div>
        </header>

        {/* Dashboard Content Panel */}
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar text-left">
          {activeTab === 'Dashboard' ? (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Welcome text */}
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, {username}! 👋</h1>
                <p className="text-slate-400 text-sm">Here's what's happening in the community today.</p>
              </div>

              {/* Statistics strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  onClick={() => setActiveTab('Projects')}
                  className="liquid-glass rounded-2xl p-5 border-white/5 hover:border-violet-500/20 transition-all cursor-pointer flex justify-between items-center group"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projects</p>
                    <p className="text-2xl font-bold text-white tracking-tight">{projects.length}+</p>
                    <p className="text-[10px] font-medium text-slate-500 group-hover:text-indigo-400 transition-colors">View all projects</p>
                  </div>
                  <div className="p-3 bg-violet-500/15 text-violet-400 rounded-xl group-hover:scale-110 transition-transform">
                    <Layers size={20} />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('Events')}
                  className="liquid-glass rounded-2xl p-5 border-white/5 hover:border-emerald-500/20 transition-all cursor-pointer flex justify-between items-center group"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Events</p>
                    <p className="text-2xl font-bold text-white tracking-tight">{events.length}+</p>
                    <p className="text-[10px] font-medium text-slate-500 group-hover:text-emerald-400 transition-colors">View all events</p>
                  </div>
                  <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                    <Calendar size={20} />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('Resources')}
                  className="liquid-glass rounded-2xl p-5 border-white/5 hover:border-amber-500/20 transition-all cursor-pointer flex justify-between items-center group"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resources</p>
                    <p className="text-2xl font-bold text-white tracking-tight">300+</p>
                    <p className="text-[10px] font-medium text-slate-500 group-hover:text-amber-400 transition-colors">Explore resources</p>
                  </div>
                  <div className="p-3 bg-amber-500/15 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                    <Database size={20} />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('Career Network')}
                  className="liquid-glass rounded-2xl p-5 border-white/5 hover:border-pink-500/20 transition-all cursor-pointer flex justify-between items-center group"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Opportunities</p>
                    <p className="text-2xl font-bold text-white tracking-tight">40+</p>
                    <p className="text-[10px] font-medium text-slate-500 group-hover:text-pink-400 transition-colors">View opportunities</p>
                  </div>
                  <div className="p-3 bg-pink-500/15 text-pink-400 rounded-xl group-hover:scale-110 transition-transform">
                    <Briefcase size={20} />
                  </div>
                </div>
              </div>

              {/* Main Columns Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Columns (Span 2): Featured Projects + Community Feed */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Featured Projects Card */}
                  <div className="liquid-glass rounded-2xl border-white/5 p-6 space-y-5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-base font-bold text-white">Featured Projects</h2>
                      <div className="flex gap-4 items-center">
                        <button 
                          onClick={() => setShowAddProjectModal(true)}
                          className="bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center gap-1 transition-all"
                        >
                          <Plus size={14} />
                          <span>Add Project</span>
                        </button>
                        <button 
                          onClick={() => setActiveTab('Projects')}
                          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                        >
                          View All
                        </button>
                      </div>
                    </div>

                    {/* Project Listings */}
                    <div className="space-y-4">
                      {projects.slice(0, 3).map((proj) => (
                        <div 
                          key={proj.id} 
                          className="p-4 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 flex items-center justify-between group transition-all"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            {/* Project mock preview */}
                            <div className="w-16 h-12 rounded-lg bg-slate-900 border border-white/5 overflow-hidden shrink-0 flex items-center justify-center">
                              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-60" />
                            </div>
                            <div className="text-left min-w-0">
                              <h3 className="text-sm font-bold text-white truncate group-hover:text-indigo-400 transition-colors">{proj.title}</h3>
                              <p className="text-[10px] text-slate-500 font-semibold mb-1">By {proj.author}</p>
                              {/* Tags */}
                              <div className="flex flex-wrap gap-1">
                                {proj.tags.map((tag, idx) => (
                                  <span key={idx} className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] text-slate-400 font-semibold">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all cursor-pointer" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Community Feed */}
                  <div className="liquid-glass rounded-2xl border-white/5 p-6 space-y-5">
                    <h2 className="text-base font-bold text-white">Community Feed</h2>
                    
                    {/* Share Post box */}
                    <form onSubmit={handlePostFeed} className="flex gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
                        alt={username} 
                        className="w-8 h-8 rounded-full object-cover border border-white/5 shrink-0"
                      />
                      <div className="flex-1 flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Share something with the community..." 
                          value={feedInput}
                          onChange={(e) => setFeedInput(e.target.value)}
                          className="flex-1 bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500/50 rounded-xl px-4 py-2 text-xs text-white placeholder:text-slate-600 outline-none transition-all"
                        />
                        <button 
                          type="submit" 
                          className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-md shrink-0"
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    </form>

                    {/* Feed list */}
                    <div className="space-y-4 pt-1 max-h-72 overflow-y-auto custom-scrollbar pr-1">
                      {feed.map((item) => (
                        <div key={item.id} className="p-3 border border-white/5 rounded-xl bg-white/[0.005] hover:bg-white/[0.01] flex gap-3 text-left">
                          <img src={item.avatar} alt={item.author} className="w-8 h-8 rounded-full object-cover shrink-0 border border-white/5" />
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-white">{item.author}</span>
                              <span className="text-[9px] text-slate-500 flex items-center gap-1">
                                <Clock size={10} />
                                {item.time}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium break-words">{item.action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Columns: Upcoming Events + Top Contributors */}
                <div className="space-y-8">
                  
                  {/* Upcoming Events Card */}
                  <div className="liquid-glass rounded-2xl border-white/5 p-6 space-y-5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-base font-bold text-white">Upcoming Events</h2>
                      <button 
                        onClick={() => setActiveTab('Events')} 
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-4">
                      {events.map((ev) => (
                        <div key={ev.id} className="p-3.5 border border-white/5 rounded-xl bg-[#090b14]/30 hover:bg-white/[0.01] flex justify-between items-center transition-all">
                          <div className="text-left space-y-1">
                            <h4 className="text-xs font-bold text-white line-clamp-1">{ev.title}</h4>
                            <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                              <Calendar size={12} className="text-indigo-400" />
                              {ev.date} • {ev.time}
                            </p>
                          </div>
                          <button 
                            onClick={() => handleRegisterEvent(ev.id)}
                            className={`rounded-lg px-2.5 py-1 text-[10px] font-bold border transition-all ${
                              ev.registered 
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                                : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500 text-white'
                            }`}
                          >
                            {ev.registered ? 'Registered' : 'Register'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Contributors Card */}
                  <div className="liquid-glass rounded-2xl border-white/5 p-6 space-y-5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-base font-bold text-white">Top Contributors</h2>
                      <button 
                        onClick={() => setActiveTab('Leaderboards')}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {contributors.map((c) => (
                        <div key={c.rank} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className={`w-5 text-center font-bold text-xs ${c.rank === 1 ? 'text-amber-400' : c.rank === 2 ? 'text-slate-400' : 'text-slate-500'}`}>
                              {c.rank}
                            </span>
                            <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover border border-white/5" />
                            <span className="text-xs font-bold text-slate-300">{c.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{c.points}</span>
                            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">pts</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ) : (
            <SubViews 
              viewName={activeTab} 
              setViewName={setActiveTab}
              projects={projects}
              setProjects={setProjects}
              events={events}
              setEvents={setEvents}
              username={username}
              onAddProject={() => setShowAddProjectModal(true)}
            />
          )}
        </main>
      </div>

      {/* Add Project Modal Popover */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowAddProjectModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <div className="relative w-full max-w-md liquid-glass rounded-3xl border-white/10 p-8 shadow-2xl flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white">Add New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Project Title</label>
                <input 
                  type="text" 
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="e.g. Smart Agriculture System" 
                  className="w-full bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs text-white placeholder:text-slate-600 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Tags (comma-separated)</label>
                <input 
                  type="text" 
                  value={newProjTags}
                  onChange={(e) => setNewProjTags(e.target.value)}
                  placeholder="e.g. React, Node, IoT" 
                  className="w-full bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs text-white placeholder:text-slate-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Preview Image URL (optional)</label>
                <input 
                  type="text" 
                  value={newProjImg}
                  onChange={(e) => setNewProjImg(e.target.value)}
                  placeholder="Paste URL or leave empty for default" 
                  className="w-full bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs text-white placeholder:text-slate-600 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white rounded-xl py-2.5 text-xs font-bold border border-white/10"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-2.5 text-xs font-bold shadow-lg"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
