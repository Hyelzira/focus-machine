import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginVideo from '../assets/sunset.mp4'; 

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', 'member'); 
    navigate('/');
  };

  const handleGuest = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', 'guest'); 
    navigate('/');
  };

  return (
    // 1. Added font-['Times_New_Roman',_Times,_serif] to the main wrapper
    <div className="relative min-h-screen w-full flex items-center justify-center py-12 px-4 overflow-hidden bg-[#F5F2EB] dark:bg-gray-900 transition-colors duration-500 font-['Times_New_Roman',_Times,_serif]">
      
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={loginVideo} type="video/mp4" />
      </video>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 z-0 bg-black/20 dark:bg-black/40"></div>

      {/* FROSTED GLASS CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/20 dark:bg-black/30 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
        
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-center drop-shadow-sm">
            {isLogin ? 'Welcome back.' : 'Create an account.'}
          </h1>
          <p className="text-base text-white/90 mt-1 text-center italic drop-shadow-sm">
            {isLogin ? 'Log in to sync your progress.' : 'Start your journey to a calmer mind.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-base font-bold text-white mb-1.5 ml-1 drop-shadow-sm">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              // Added font-serif to the input so typed text matches
              className="w-full px-4 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all backdrop-blur-md font-['Times_New_Roman',_Times,_serif]"
            />
          </div>
          <div>
            <label className="block text-base font-bold text-white mb-1.5 ml-1 drop-shadow-sm">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all backdrop-blur-md font-['Times_New_Roman',_Times,_serif]"
            />
          </div>

          {/* Kept buttons in font-sans so they stay clean and modern */}
          <button 
            type="submit"
            className="mt-4 w-full bg-[#4A7C59] hover:bg-[#3D664A] text-white font-sans font-extrabold py-4 rounded-xl shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 border border-white/10"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/90 drop-shadow-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="font-bold text-white hover:underline font-sans"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-white/20 flex-1"></div>
          <span className="text-xs font-bold text-white/60 uppercase tracking-wider font-sans">or</span>
          <div className="h-px bg-white/20 flex-1"></div>
        </div>

        <button 
          onClick={handleGuest}
          className="w-full bg-transparent border-2 border-white/60 text-white hover:bg-white/10 font-sans font-bold py-3.5 rounded-xl transition-all backdrop-blur-sm"
        >
          Continue as Guest
        </button>

      </div>
    </div>
  );
};

export default Login;