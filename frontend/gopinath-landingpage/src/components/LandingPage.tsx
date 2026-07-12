import { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Layers, 
  Calendar, 
  Award, 
  Globe, 
  Code, 
  Database, 
  Briefcase, 
  ChevronRight, 
  Star,
  Zap,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

export default function LandingPage({ onLoginClick }: LandingPageProps) {
  const [activeAchievement, setActiveAchievement] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);

  // Smooth video looping control logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;

    const fadeVideo = (targetOpacity: number, duration: number, callback?: () => void) => {
      cancelAnimationFrame(frameId);
      const startOpacity = parseFloat(video.style.opacity || '0');
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
        
        video.style.opacity = currentOpacity.toString();

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else if (callback) {
          callback();
        }
      };

      frameId = requestAnimationFrame(animate);
    };

    const handleLoadedData = () => {
      fadeVideo(1, 500);
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const timeLeft = video.duration - video.currentTime;
      
      if (timeLeft <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeVideo(0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(e => console.error("Play failed", e));
        fadingOutRef.current = false;
        fadeVideo(1, 500);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Initial state - start visible to prevent race condition
    video.style.opacity = '1';

    return () => {
      cancelAnimationFrame(frameId);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const stats = [
    { label: 'Students', count: '5000+', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Projects', count: '300+', icon: Layers, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Events', count: '100+', icon: Calendar, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'Clubs', count: '50+', icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Partners', count: '25+', icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  const features = [
    { 
      title: 'Project Hub', 
      desc: 'Showcase your projects and get recognized across campus.', 
      icon: Code, 
      color: 'text-indigo-400', 
      border: 'hover:border-indigo-500/30' 
    },
    { 
      title: 'Events & Opportunities', 
      desc: 'Find and join exciting events, workshops and hackathons on campus.', 
      icon: Calendar, 
      color: 'text-emerald-400', 
      border: 'hover:border-emerald-500/30' 
    },
    { 
      title: 'Resource Vault', 
      desc: 'Access curated study materials, placement roadmaps, and tech cheat sheets.', 
      icon: Database, 
      color: 'text-amber-400', 
      border: 'hover:border-amber-500/30' 
    },
    { 
      title: 'Community', 
      desc: 'Connect, collaborate, and share knowledge with peer groups.', 
      icon: Users, 
      color: 'text-pink-400', 
      border: 'hover:border-pink-500/30' 
    },
    { 
      title: 'Career Network', 
      desc: 'Discover internships, job opportunities, and build industry connections.', 
      icon: Briefcase, 
      color: 'text-cyan-400', 
      border: 'hover:border-cyan-500/30' 
    },
  ];

  const achievements = [
    {
      title: 'Smart India Hackathon 2024',
      badge: 'Hackathon Winner',
      result: '1st Place',
      by: 'Team Sathyabamites',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
      tagline: 'Won India\'s biggest software development competition solving national problems.'
    },
    {
      title: 'AI in Medical Imaging',
      badge: 'Research Publication',
      result: 'Published in IEEE',
      by: 'By Arjun & Team',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
      tagline: 'Authored neural network research paper for diagnosing pulmonary anomalies.'
    },
    {
      title: 'CampusCart',
      badge: 'Startup Launch',
      result: 'Launched Successfully',
      by: 'Team Innovators',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80',
      tagline: 'Student marketplace app scaling up to 1,500+ active campus downloads.'
    },
    {
      title: '100+ Contributions',
      badge: 'Open Source',
      result: 'Google Summer of Code',
      by: 'By Nandhini',
      image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80',
      tagline: 'Accepted as developer for the Linux Foundation under GSoC 2024.'
    }
  ];

  // Auto scroll achievements carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAchievement(prev => (prev + 1) % achievements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col custom-scrollbar">
      {/* Background looping space video - Fixed layout */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover translate-y-[17%] pointer-events-none z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
      />
      
      {/* Fixed dark tint overlays & neon glows - lightened to let background video shine through */}
      <div className="fixed inset-0 bg-[#07080e]/30 z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] z-0 pointer-events-none" />
      
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-950/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Sticky Header Nav */}
      <nav className="relative border-b border-white/5 liquid-glass sticky top-0 px-6 py-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-violet-500/20">
              <Zap size={22} className="text-white fill-white/10" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Sathyabamites</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white font-medium hover:text-indigo-400 transition-colors text-sm">Home</a>
            <a href="#features" className="text-white/60 font-medium hover:text-white transition-colors text-sm">Features</a>
            <a href="#events" className="text-white/60 font-medium hover:text-white transition-colors text-sm">Events</a>
            <a href="#achievements" className="text-white/60 font-medium hover:text-white transition-colors text-sm">Achievements</a>
          </div>

          <div>
            <button 
              onClick={onLoginClick}
              className="bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
            >
              Join Now
            </button>
          </div>
        </div>
      </nav>

      {/* ======================================================== */}
      {/* SECTION 2: Sathyabamites Community Hero Section          */}
      {/* ======================================================== */}
      <section id="community-hero" className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20 md:py-32 flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-b from-transparent to-[#07080e]/40">
        {/* Left text column */}
        <div className="flex-1 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
            <Star size={12} className="fill-violet-400" />
            <span>Sathyabama University Student Hub</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Sathyabamites <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-fuchsia-400">
              For Students, By Students.
            </span>
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            The ultimate community hub to connect, empower, and showcase the talented student ecosystem of Sathyabama University. Explore projects, share resources, and grow together.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={onLoginClick}
              className="bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl px-6 py-3 shadow-lg shadow-violet-500/25 flex items-center gap-2 group transition-all"
            >
              <span>Join Community</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={scrollToFeatures}
              className="bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl px-6 py-3 border border-white/10 flex items-center gap-2 transition-all"
            >
              Explore More
            </button>
          </div>
        </div>

        {/* Right 3D/Visual Code graphic column */}
        <div className="flex-1 w-full relative">
          <div className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center">
            {/* Ambient purple orb backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-purple-600/20 rounded-full filter blur-3xl animate-pulse pointer-events-none" />

            {/* Glowing ring borders */}
            <div className="absolute w-[85%] h-[85%] border border-violet-500/20 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[70%] h-[70%] border border-dashed border-indigo-500/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />

            {/* Glassmorphic visual card replicating illustration */}
            <div className="liquid-glass rounded-3xl p-6 w-[80%] aspect-[4/3] relative flex flex-col justify-between shadow-2xl border-white/10 select-none transform hover:scale-[1.02] transition-transform duration-500 z-10">
              {/* Header dot buttons */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/60 block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/60 block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60 block" />
                </div>
                <span className="text-[10px] text-white/30 font-mono tracking-wider">sathyabamites.ts</span>
              </div>

              {/* Central Code Simulation */}
              <div className="font-mono text-xs text-indigo-200/90 py-4 flex-1 space-y-1.5 overflow-hidden text-left">
                <p className="text-purple-400">const <span className="text-cyan-300">community</span> = &#123;</p>
                <p className="pl-4 text-slate-400">name: <span className="text-amber-300">"Sathyabamites"</span>,</p>
                <p className="pl-4 text-slate-400">mission: <span className="text-amber-300">"Showcase Student Talent"</span>,</p>
                <p className="pl-4 text-slate-400">creators: <span className="text-amber-300">"Sathyabama Students"</span>,</p>
                <p className="pl-4 text-slate-400">features: [<span className="text-emerald-300">"Projects"</span>, <span className="text-emerald-300">"Events"</span>, <span className="text-emerald-300">"Hackathons"</span>],</p>
                <p className="pl-4 text-slate-400">codeLevel: <span className="text-amber-300">"100%"</span></p>
                <p className="text-purple-400">&#125;;</p>
              </div>

              {/* Footer status bar */}
              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                  <Code size={14} className="text-violet-400" />
                  <span>Interactive Editor</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px] uppercase tracking-wide">
                  Live Sync
                </div>
              </div>
            </div>

            {/* Floating floating action or tech bubbles */}
            <div className="absolute top-[8%] left-[10%] w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center text-indigo-400 shadow-lg border-white/10 animate-[bounce_4s_infinite] z-20">
              <Code size={20} />
            </div>
            
            <div className="absolute bottom-[12%] right-[5%] w-14 h-14 rounded-2xl liquid-glass flex items-center justify-center text-purple-400 shadow-lg border-white/10 animate-[bounce_5s_infinite_1.5s] z-20">
              <Globe size={22} />
            </div>

            <div className="absolute top-[30%] right-[0%] w-10 h-10 rounded-2xl liquid-glass flex items-center justify-center text-amber-400 shadow-lg border-white/10 animate-[bounce_3.5s_infinite_0.8s] z-20">
              <Award size={18} />
            </div>
            
            <div className="absolute bottom-[8%] left-[8%] w-14 h-14 rounded-2xl liquid-glass flex items-center justify-center text-pink-400 shadow-lg border-white/10 animate-[bounce_6s_infinite_2.2s] z-20">
              <Users size={22} />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: Stats Strip                                   */}
      {/* ======================================================== */}
      <section className="relative z-10 w-full px-6 py-8 border-y border-white/5 bg-[#090b14]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center space-y-2 p-3 hover:bg-white/[0.02] rounded-2xl transition-all group"
              >
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={22} />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{stat.count}</div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: Focus Features Grid                          */}
      {/* ======================================================== */}
      <section id="features" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold text-white">Unlock Community Power</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            A comprehensive network built with the core features needed to propel Sathyabama University students from academic learning to building real products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className={`liquid-glass rounded-2xl p-6 border-white/5 flex flex-col justify-between hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group ${feat.border}`}
            >
              <div className="space-y-4">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${feat.color} group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300`}>
                  <feat.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-white text-left">{feat.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed text-left">{feat.desc}</p>
              </div>
              
              <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-white cursor-pointer select-none">
                <span>Explore</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: Achievements Showcase Section                 */}
      {/* ======================================================== */}
      <section id="achievements" className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-4">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-white">Student Achievements</h2>
            <p className="text-slate-400 text-xs mt-1">Celebrating excellence and innovations from our student ranks</p>
          </div>
          <button 
            onClick={onLoginClick}
            className="text-xs font-semibold bg-white/5 hover:bg-white/10 text-white rounded-lg px-4 py-2 border border-white/5 flex items-center gap-1.5 transition-all"
          >
            <span>View All</span>
            <ExternalLink size={12} />
          </button>
        </div>

        {/* Achievements list */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {achievements.map((ach, idx) => (
            <div 
              key={idx} 
              className={`liquid-glass rounded-2xl border-white/5 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 ${activeAchievement === idx ? 'ring-1 ring-violet-500/50 bg-[#0d0f1c]/70' : ''}`}
            >
              {/* Image box */}
              <div className="h-44 w-full relative overflow-hidden bg-slate-950">
                <img 
                  src={ach.image} 
                  alt={ach.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1c] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 bg-violet-600/90 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                  {ach.badge}
                </div>
              </div>

              {/* Text box */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-2">
                  <span className="text-indigo-400 text-xs font-bold">{ach.result}</span>
                  <h4 className="text-base font-bold text-white line-clamp-1">{ach.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{ach.tagline}</p>
                </div>
                <div className="text-[10px] font-semibold text-slate-500">
                  {ach.by}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: Student Clubs Showcase                        */}
      {/* ======================================================== */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <h2 className="text-2xl font-bold text-white">Active Student Clubs</h2>
          <p className="text-slate-400 text-xs">Explore and join specialised tech cells inside Sathyabama University</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { name: 'Sathyabama Developers Club', count: '1200+ Members', icon: Code, color: 'text-violet-400', bg: 'bg-violet-500/10' },
            { name: 'AI & ML Research Group', count: '450+ Members', icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { name: 'GDSC Sathyabama', count: '820+ Members', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
            { name: 'Robotics & IoT Association', count: '310+ Members', icon: Layers, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { name: 'Web Dev Bootcamp Forum', count: '940+ Members', icon: Database, color: 'text-pink-400', bg: 'bg-pink-500/10' }
          ].map((club, idx) => (
            <div 
              key={idx} 
              className="liquid-glass border-white/5 rounded-2xl p-5 flex flex-col items-center justify-between text-center gap-4 hover:border-violet-500/20 hover:shadow-lg transition-all duration-300 group animate-in fade-in duration-300"
            >
              <div className={`p-3.5 rounded-2xl ${club.bg} ${club.color} group-hover:scale-115 transition-transform duration-300`}>
                <club.icon size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white line-clamp-1">{club.name}</h4>
                <p className="text-[10px] text-slate-500 font-semibold">{club.count}</p>
              </div>
              <button 
                onClick={onLoginClick}
                className="text-[10px] font-bold text-indigo-400 group-hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Join</span>
                <ChevronRight size={10} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 7: Frequently Asked Questions (FAQ)              */}
      {/* ======================================================== */}
      <section className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-24 text-left">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-xs">Got questions about Sathyabamites? We've got answers.</p>
        </div>

        <div className="space-y-4">
          {[
            { 
              q: 'Who can join the Sathyabamites community?', 
              a: 'All current students, research scholars, and alumni of Sathyabama University are welcome to join. You just need a valid student identifier to create an account.' 
            },
            { 
              q: 'How does the project hub showcase work?', 
              a: 'Once logged in, you can click "Add Project" to submit details, source code links, and tags. Approved projects appear on the global community page for everyone to see, collaborate on, and review.' 
            },
            { 
              q: 'What is the leaderboard points system?', 
              a: 'Points are awarded dynamically for contributions: 100 points for uploading projects, 50 points for registering/completing events, 30 points for sharing resources in the vault, and additional points for getting placed or winning hackathons!' 
            },
            { 
              q: 'How do I access materials in the Resource Vault?', 
              a: 'The resource vault is a curated space of DSA sheets, academic notes, and semester cheat sheets uploaded by seniors and placement coordinators. You can download any resource with a single click from the dashboard.' 
            }
          ].map((faq, idx) => (
            <div 
              key={idx} 
              className="liquid-glass border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.01] transition-all outline-none"
              >
                <span className="text-xs font-bold text-white pr-4">{faq.q}</span>
                <span className="text-slate-400 text-lg select-none">
                  {expandedFaq === idx ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedFaq === idx ? 'max-h-40 border-t border-white/5' : 'max-h-0'
                }`}
              >
                <p className="px-6 py-4 text-xs text-slate-400 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#04050a] py-8 px-6 text-center text-xs text-slate-500 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              <Zap size={12} className="text-white fill-white/10" />
            </div>
            <span className="font-semibold text-white">Sathyabamites Portal</span>
          </div>
          <p>© 2026 Sathyabamites. For Students, By Students. Built with React & Tailwind CSS.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
