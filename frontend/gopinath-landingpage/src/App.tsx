import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('Pavithra');

  // Shared state to allow dynamic synchronization between components
  const [projects, setProjects] = useState<Project[]>([
    { 
      id: 1, 
      title: 'Smart PPE Detection System', 
      author: 'Pavithra E', 
      tags: ['Python', 'YOLOv8', 'ML'], 
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 2, 
      title: 'GRN Automation System', 
      author: 'Kevin Prakash', 
      tags: ['Flask', 'OCR', 'Automation'], 
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 3, 
      title: 'Sathyabamites Platform', 
      author: 'Team Sathyabamites', 
      tags: ['React', 'Tailwind', 'MongoDB'], 
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80' 
    }
  ]);

  const [events, setEvents] = useState<EventItem[]>([
    { id: 1, title: 'Sathyabama Hackathon 2024', date: '15 Jul 2024', time: '10:00 AM', registered: false },
    { id: 2, title: 'AI/ML Workshop', date: '20 Jul 2024', time: '02:00 PM', registered: false },
    { id: 3, title: 'Web Development Bootcamp', date: '25 Jul 2024', time: '10:00 AM', registered: false },
    { id: 4, title: 'Tech Talk: Future of AI', date: '30 Jul 2024', time: '04:00 PM', registered: false },
  ]);

  const [feed, setFeed] = useState<FeedItem[]>([
    { 
      id: 1, 
      author: 'Rahul R', 
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', 
      action: 'uploaded a new project: E-Commerce website built using MERN stack', 
      time: '2h ago' 
    },
    { 
      id: 2, 
      author: 'Priya S', 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', 
      action: 'won 2nd place in CodeSprint 2024', 
      time: '5h ago' 
    },
    { 
      id: 3, 
      author: 'Arjun R', 
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80', 
      action: 'published a new resource: DSA Roadmap for Placements', 
      time: '1d ago' 
    }
  ]);

  const handleLoginSuccess = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard 
          username={username} 
          onLogout={handleLogout} 
          projects={projects}
          setProjects={setProjects}
          events={events}
          setEvents={setEvents}
          feed={feed}
          setFeed={setFeed}
        />
      ) : (
        <LandingPage 
          onLoginClick={() => setShowLoginModal(true)} 
        />
      )}

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default App;
