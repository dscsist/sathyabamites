import { useState } from 'react';
import { X, Lock, User, Key, CheckCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState('Pavithra');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    setIsLoading(true);
    setError('');

    // Simulate login server delay
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(username);
    }, 1200);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('Pavithra');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md liquid-glass rounded-3xl border-white/10 p-8 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Floating purple glow inside modal */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/5 p-2 rounded-xl transition-all"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold mx-auto shadow-lg shadow-violet-500/25">
            <Lock size={22} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Sathyabamites Portal</h2>
          <p className="text-slate-400 text-xs">Unlock your dashboard & connect with the student body</p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Username or Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <User size={16} />
              </span>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username" 
                className="w-full bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400">Password</label>
              <a href="#" className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium">Forgot Password?</a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <Key size={16} />
              </span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" 
                className="w-full bg-[#0a0c16]/80 border border-white/5 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700/50 text-white font-semibold rounded-xl py-3.5 text-sm transition-all shadow-lg shadow-indigo-500/20 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging In...</span>
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-[10px] font-bold uppercase tracking-wider">or</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        {/* Demo Fast Track Login */}
        <button 
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="w-full bg-white/5 hover:bg-white/10 disabled:bg-white/5 text-white font-medium rounded-xl py-3 border border-white/10 text-xs transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle size={16} className="text-emerald-400" />
          <span>Quick Demo Login (as Pavithra)</span>
        </button>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">Contact Coordinator</a>
        </div>
      </div>
    </div>
  );
}
