import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { authService } from '../services/authService';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Lock, EyeOff, User, Calendar, Globe, ChevronDown } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('English');
  
  const { loginUser, gameState } = useGame();
  const { t } = useLanguage();

  const navigate = useNavigate();

  useEffect(() => {
    if (gameState.isAuthenticated) {
      if (gameState.onboardingCompleted) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }
  }, [gameState.isAuthenticated, gameState.onboardingCompleted, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const user = await authService.login(formData.email, formData.password);
        loginUser(user);
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        if (!formData.age || parseInt(formData.age, 10) <= 0) {
          throw new Error("Please enter a valid age.");
        }
        if (!formData.name) {
          throw new Error("Please enter your name.");
        }
        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters.");
        }

        const user = await authService.signup(formData);
        loginUser(user);
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const DiamondIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
      <path d="M12 2L22 12L12 22L2 12L12 2Z" fill="#D9A441"/>
    </svg>
  );

  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-12 bg-cover bg-center bg-no-repeat relative overflow-y-auto" 
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/login_bg.jpg')` }}
    >
      {/* Subtle Overlay to make form readable against the bright sunset */}
      <div className="fixed inset-0 bg-gradient-to-t from-[#070A0C]/90 via-[#070A0C]/40 to-[#070A0C]/20 pointer-events-none" />
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center animate-slide-up my-8">
        
        {/* Title & Atmosphere */}
        <div className="text-center mb-8 relative">
          <div className="absolute left-1/2 -top-6 -translate-x-1/2 opacity-20 pointer-events-none">
             {/* Stub for the compass behind the logo */}
             <Compass size={80} className="text-[#D9A441]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#D9A441] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide mb-2 relative z-10" style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>
            KALACHAKRA
          </h1>
          <p className="text-[#F5F1E8] font-serif italic text-[13px] tracking-widest drop-shadow-md relative z-10">
            Play the Past. Build the Future.
          </p>
        </div>

        {/* The Premium Dark Authentication Panel */}
        <div className="w-full bg-[#090C0F]/95 backdrop-blur-md p-8 md:p-10 shadow-2xl relative">
          
          {/* Ornate corner borders */}
          <div className="absolute inset-0 border border-[#34302A] pointer-events-none" />
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D9A441] pointer-events-none" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D9A441] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D9A441] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D9A441] pointer-events-none" />
          
          {/* Content */}
          <div className="text-center mb-8 relative z-10">
            <DiamondIcon />
            <h2 className="text-xl font-serif font-bold text-[#F5F1E8] mb-2">
              {isLogin ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-[12px] text-[#C5C9CC] leading-relaxed max-w-[280px] mx-auto">
              {isLogin 
                ? "Log in to continue your journey through India's civilizations and heritage."
                : "Join KALACHAKRA and start your journey through India's rich heritage."}
            </p>
          </div>
          
          <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-[#D96B62]/10 border border-[#D96B62]/50 text-[#F5F1E8] px-4 py-2.5 rounded text-xs text-center font-medium animate-pop-in">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-[#C5C9CC]" />
                </div>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-transparent border border-[#34302A] rounded text-[13px] text-[#F5F1E8] placeholder-[#C5C9CC]/50 focus:outline-none focus:border-[#D9A441] transition-colors"
                  placeholder="Full Name"
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[#C5C9CC]" />
              </div>
              <input
                type="text" name="email" required value={formData.email} onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 bg-transparent border border-[#34302A] rounded text-[13px] text-[#F5F1E8] placeholder-[#C5C9CC]/50 focus:outline-none focus:border-[#D9A441] transition-colors"
                placeholder="Email or Username"
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-[#C5C9CC]" />
                </div>
                <input
                  type="number" name="age" required min="1" max="120" value={formData.age} onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 bg-transparent border border-[#34302A] rounded text-[13px] text-[#F5F1E8] placeholder-[#C5C9CC]/50 focus:outline-none focus:border-[#D9A441] transition-colors"
                  placeholder="Age"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-[#C5C9CC]" />
                </div>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#C5C9CC]" />
              </div>
              <input
                type="password" name="password" required value={formData.password} onChange={handleChange}
                className="block w-full pl-10 pr-10 py-3 bg-transparent border border-[#34302A] rounded text-[13px] text-[#F5F1E8] placeholder-[#C5C9CC]/50 focus:outline-none focus:border-[#D9A441] transition-colors"
                placeholder="Password"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#C5C9CC] hover:text-[#F5F1E8]">
                <EyeOff className="h-4 w-4" />
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-[#C5C9CC]" />
                </div>
                <input
                  type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 bg-transparent border border-[#34302A] rounded text-[13px] text-[#F5F1E8] placeholder-[#C5C9CC]/50 focus:outline-none focus:border-[#D9A441] transition-colors"
                  placeholder="Confirm Password"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#C5C9CC] hover:text-[#F5F1E8]">
                  <EyeOff className="h-4 w-4" />
                </button>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-[#34302A] rounded-sm group-hover:border-[#D9A441] flex items-center justify-center transition-colors"></div>
                  <span className="text-[11px] text-[#C5C9CC] group-hover:text-[#F5F1E8]">Remember me</span>
                </label>
                <button type="button" className="text-[11px] font-medium text-[#D9A441] hover:text-[#D9A441]/80 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {!isLogin && (
              <div className="pt-2 pb-1">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-3.5 w-3.5 text-[#C5C9CC]" />
                  <span className="text-[11px] font-bold text-[#F5F1E8]">Select Language</span>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setLang('English')} className={`flex-1 py-2 text-[11px] rounded-full border ${lang === 'English' ? 'border-[#D9A441] text-[#D9A441]' : 'border-[#34302A] text-[#F5F1E8]'}`}>English</button>
                  <button type="button" onClick={() => setLang('Hindi')} className={`flex-1 py-2 text-[11px] rounded-full border ${lang === 'Hindi' ? 'border-[#D9A441] text-[#D9A441]' : 'border-[#34302A] text-[#F5F1E8]'}`}>हिन्दी</button>
                  <button type="button" onClick={() => setLang('Telugu')} className={`flex-1 py-2 text-[11px] rounded-full border ${lang === 'Telugu' ? 'border-[#D9A441] text-[#D9A441]' : 'border-[#34302A] text-[#F5F1E8]'}`}>తెలుగు</button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 mt-4 rounded font-bold text-[#070A0C] bg-[#D9A441] hover:bg-[#D9A441]/90 transition-all duration-300 disabled:opacity-50 text-[14px]"
            >
              {loading ? 'Entering...' : (isLogin ? 'Login \u2192' : 'Create Account \u2192')}
            </button>
            
            {/* Divider */}
            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-[#34302A]"></div>
              <span className="flex-shrink-0 mx-4 text-[#C5C9CC] text-[10px] font-medium uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-[#34302A]"></div>
            </div>

            {/* Google Login */}
            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 rounded border border-[#34302A] hover:bg-[#151B20] transition-colors text-[13px] text-[#F5F1E8] font-medium">
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Toggle Login/Signup */}
            <div className="text-center pt-2">
              <span className="text-[11px] text-[#C5C9CC]">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                type="button" 
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-[11px] font-bold text-[#D9A441] hover:text-[#D9A441]/80 transition-colors"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

// Simple stub to resolve Compass without heavy lucide import mapping if it fails
const Compass = ({ size, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);

export default AuthPage;
