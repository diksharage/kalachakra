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
    <div className="min-h-screen bg-[#121714] flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden atmospheric-bg">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#18352B]/40 via-[#211A15]/80 to-[#121714] z-0 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNENEE2NEEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] animate-drift" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C49A45]/15 rounded-full blur-[100px] pointer-events-none animate-flicker" />


      <div className="relative z-10 w-full max-w-md">
        {/* Title & Atmosphere */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#E8D9B8] drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] tracking-wide mb-3 animate-slide-up">
            KALACHAKRA
          </h1>
          <p className="text-[#C49A45] font-serif italic text-lg tracking-widest drop-shadow-md animate-fade-in stagger-2">
            Play the Past. Build the Future.
          </p>
        </div>

        {/* The Stone Login Card */}
        <div className="bg-[#211A15]/90 backdrop-blur-md p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl border border-[#A97932]/30 relative overflow-hidden animate-slide-up stagger-3">
          
          {/* Subtle carved inner border effect */}
          <div className="absolute inset-2 border border-[#E8D9B8]/5 rounded-2xl pointer-events-none" />

          <h2 className="text-xl text-center text-[#E8D9B8] font-bold tracking-widest uppercase mb-8 border-b border-[#A97932]/20 pb-4">
            {isLogin ? t('common.login', 'ENTER THE ADVENTURE') : t('auth.createAccount', 'BEGIN YOUR JOURNEY')}
          </h2>
          
          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm text-center font-medium animate-pop-in">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="group">
                <label className="block text-xs font-bold text-[#E8D9B8]/70 uppercase tracking-wider mb-2 group-focus-within:text-[#C49A45] transition-colors">{t('auth.fullName', 'Traveler Name')}</label>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full bg-[#121714] border-2 border-[#18352B] rounded-xl py-3 px-4 text-[#E8D9B8] font-medium focus:ring-0 focus:border-[#C49A45] transition-colors shadow-inner"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div className="group">
              <label className="block text-xs font-bold text-[#E8D9B8]/70 uppercase tracking-wider mb-2 group-focus-within:text-[#C49A45] transition-colors">{t('auth.email', 'Email Address')}</label>
              <input
                type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full bg-[#121714] border-2 border-[#18352B] rounded-xl py-3 px-4 text-[#E8D9B8] font-medium focus:ring-0 focus:border-[#C49A45] transition-colors shadow-inner"
                placeholder="traveler@example.com"
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-[#E8D9B8]/70 uppercase tracking-wider mb-2 group-focus-within:text-[#C49A45] transition-colors">{t('auth.password', 'Secret Key')}</label>
              <input
                type="password" name="password" required value={formData.password} onChange={handleChange}
                className="w-full bg-[#121714] border-2 border-[#18352B] rounded-xl py-3 px-4 text-[#E8D9B8] font-medium focus:ring-0 focus:border-[#C49A45] transition-colors shadow-inner"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <>
                <div className="group">
                  <label className="block text-xs font-bold text-[#E8D9B8]/70 uppercase tracking-wider mb-2 group-focus-within:text-[#C49A45] transition-colors">{t('auth.confirmPassword', 'Confirm Key')}</label>
                  <input
                    type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}
                    className="w-full bg-[#121714] border-2 border-[#18352B] rounded-xl py-3 px-4 text-[#E8D9B8] font-medium focus:ring-0 focus:border-[#C49A45] transition-colors shadow-inner"
                    placeholder="••••••••"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-[#E8D9B8]/70 uppercase tracking-wider mb-2 group-focus-within:text-[#C49A45] transition-colors">{t('auth.age', 'Age (Years)')}</label>
                  <p className="text-[10px] text-[#A97932] mb-2 uppercase tracking-wide">Determines historical complexity</p>
                  <input
                    type="number" name="age" required min="1" max="120" value={formData.age} onChange={handleChange}
                    className="w-full bg-[#121714] border-2 border-[#18352B] rounded-xl py-3 px-4 text-[#E8D9B8] font-medium focus:ring-0 focus:border-[#C49A45] transition-colors shadow-inner"
                    placeholder="14"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-4 px-4 mt-8 rounded-xl shadow-[0_5px_15px_rgba(200,150,80,0.3)] text-sm font-bold text-[#121714] bg-gradient-to-r from-[#A8794F] to-[#C49A45] hover:from-[#C49A45] hover:to-[#E8D9B8] transition-all duration-300 disabled:opacity-50 hover-card-fx uppercase tracking-widest"
            >
              {loading ? 'Entering...' : (isLogin ? 'Enter Kalachakra' : 'Begin Journey')}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-[#A97932]/20 pt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-[#A8794F] hover:text-[#E8D9B8] transition-colors uppercase tracking-wider"
            >
              {isLogin ? "New Traveler? Sign Up" : "Already Exploring? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
