import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { authService } from '../services/authService';
import { useLanguage } from '../context/LanguageContext';

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
  
  const { loginUser, gameState } = useGame();
  const { t } = useLanguage();

  const navigate = useNavigate();

  // Redirect if already authenticated
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
    setError(''); // clear error on type
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
        // Validation for signup
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


  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center lg:justify-end px-4 md:px-12 lg:px-24 bg-cover bg-center relative overflow-hidden" 
      style={{ backgroundImage: "url('/assets/backgrounds/temple.jpg')" }}
    >
      {/* Cinematic Gradient Overlay for text readability (darker on right) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-[#080a08]/95 pointer-events-none" />
      
      {/* Sunlight/Atmosphere glow */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-amber-500/10 to-transparent mix-blend-overlay pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center lg:items-end lg:mr-8 xl:mr-24 animate-slide-up">
        
        {/* Title & Atmosphere */}
        <div className="text-center lg:text-right mb-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#E8D9B8] drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] tracking-wide mb-3">
            KALACHAKRA
          </h1>
          <p className="text-[#C49A45] font-serif italic text-lg tracking-widest drop-shadow-md">
            Play the Past. Build the Future.
          </p>
        </div>

        {/* The Premium Glassmorphic Login Card */}
        <div className="w-full bg-[#121714]/60 backdrop-blur-xl p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-3xl border border-[#A97932]/30 relative overflow-hidden group">
          
          {/* Subtle carved inner border effect */}
          <div className="absolute inset-2 border border-[#E8D9B8]/10 rounded-2xl pointer-events-none transition-colors duration-500 group-hover:border-[#C49A45]/20" />

          {/* Login / Sign Up Tabs */}
          <div className="flex justify-center gap-10 mb-8 border-b border-[#A97932]/20 pb-4 relative z-10">
            <button 
              type="button"
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`text-lg font-serif tracking-widest uppercase transition-all duration-300 pb-2 -mb-4 ${isLogin ? 'text-[#C49A45] border-b-2 border-[#C49A45]' : 'text-[#E8D9B8]/50 hover:text-[#E8D9B8]'}`}
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`text-lg font-serif tracking-widest uppercase transition-all duration-300 pb-2 -mb-4 ${!isLogin ? 'text-[#C49A45] border-b-2 border-[#C49A45]' : 'text-[#E8D9B8]/50 hover:text-[#E8D9B8]'}`}
            >
              Sign Up
            </button>
          </div>
          
          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/60 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg text-sm text-center font-medium animate-pop-in backdrop-blur-sm">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="group/input">
                <label className="block text-xs font-bold text-[#E8D9B8]/70 uppercase tracking-wider mb-2 group-focus-within/input:text-[#C49A45] transition-colors">{t('auth.fullName', 'Traveler Name')}</label>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full bg-[#0a0d0a]/60 backdrop-blur border border-[#A97932]/30 rounded-xl py-3 px-4 text-[#E8D9B8] font-medium focus:ring-1 focus:ring-[#C49A45] focus:border-[#C49A45] transition-all shadow-inner outline-none"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div className="group/input">
              <label className="block text-xs font-bold text-[#E8D9B8]/70 uppercase tracking-wider mb-2 group-focus-within/input:text-[#C49A45] transition-colors">{t('auth.email', 'Email Address')}</label>
              <input
                type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full bg-[#0a0d0a]/60 backdrop-blur border border-[#A97932]/30 rounded-xl py-3 px-4 text-[#E8D9B8] font-medium focus:ring-1 focus:ring-[#C49A45] focus:border-[#C49A45] transition-all shadow-inner outline-none"
                placeholder="traveler@example.com"
              />
            </div>

            <div className="group/input">
              <label className="block text-xs font-bold text-[#E8D9B8]/70 uppercase tracking-wider mb-2 group-focus-within/input:text-[#C49A45] transition-colors flex justify-between">
                <span>{t('auth.password', 'Secret Key')}</span>
                {isLogin && <button type="button" className="text-[10px] text-[#A97932] hover:text-[#E8D9B8] transition-colors normal-case">Forgot Password?</button>}
              </label>
              <input
                type="password" name="password" required value={formData.password} onChange={handleChange}
                className="w-full bg-[#0a0d0a]/60 backdrop-blur border border-[#A97932]/30 rounded-xl py-3 px-4 text-[#E8D9B8] font-medium focus:ring-1 focus:ring-[#C49A45] focus:border-[#C49A45] transition-all shadow-inner outline-none"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <>
                <div className="group/input">
                  <label className="block text-xs font-bold text-[#E8D9B8]/70 uppercase tracking-wider mb-2 group-focus-within/input:text-[#C49A45] transition-colors">{t('auth.confirmPassword', 'Confirm Key')}</label>
                  <input
                    type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}
                    className="w-full bg-[#0a0d0a]/60 backdrop-blur border border-[#A97932]/30 rounded-xl py-3 px-4 text-[#E8D9B8] font-medium focus:ring-1 focus:ring-[#C49A45] focus:border-[#C49A45] transition-all shadow-inner outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div className="group/input">
                  <label className="block text-xs font-bold text-[#E8D9B8]/70 uppercase tracking-wider mb-2 group-focus-within/input:text-[#C49A45] transition-colors flex items-center justify-between">
                    <span>{t('auth.age', 'Age (Years)')}</span>
                    <span className="text-[10px] text-[#A97932] normal-case opacity-80">Sets complexity</span>
                  </label>
                  <input
                    type="number" name="age" required min="1" max="120" value={formData.age} onChange={handleChange}
                    className="w-full bg-[#0a0d0a]/60 backdrop-blur border border-[#A97932]/30 rounded-xl py-3 px-4 text-[#E8D9B8] font-medium focus:ring-1 focus:ring-[#C49A45] focus:border-[#C49A45] transition-all shadow-inner outline-none"
                    placeholder="14"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-4 px-4 mt-6 rounded-xl shadow-[0_5px_20px_rgba(200,150,80,0.2)] text-sm font-bold text-[#121714] bg-gradient-to-r from-[#C49A45] to-[#A8794F] hover:from-[#d4b065] hover:to-[#C49A45] transition-all duration-300 disabled:opacity-50 uppercase tracking-widest transform hover:-translate-y-1"
            >
              {loading ? 'Entering...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
            
            {/* Social Logins - visual only for reference alignment */}
            {isLogin && (
              <div className="pt-4 pb-2">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-[#A97932]/20"></div>
                  <span className="flex-shrink-0 mx-4 text-[#E8D9B8]/40 text-xs font-bold uppercase">Or</span>
                  <div className="flex-grow border-t border-[#A97932]/20"></div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <button type="button" className="w-12 h-12 rounded-full border border-[#A97932]/30 bg-[#0a0d0a]/40 hover:bg-[#A97932]/20 flex items-center justify-center transition-colors">
                    <span className="font-serif font-bold text-[#E8D9B8]">G</span>
                  </button>
                  <button type="button" className="w-12 h-12 rounded-full border border-[#A97932]/30 bg-[#0a0d0a]/40 hover:bg-[#A97932]/20 flex items-center justify-center transition-colors">
                    <span className="font-serif font-bold text-[#E8D9B8]">GH</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
