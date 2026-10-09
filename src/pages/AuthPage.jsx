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


  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4 md:px-12 bg-cover bg-center bg-no-repeat relative overflow-hidden bg-[#070A0C]" 
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/login_bg.jpg')` }}
    >
      {/* Subtle Overlay for text readability without washing out the art */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070A0C] via-[#070A0C]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[#070A0C]/30 pointer-events-none" />
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center animate-slide-up mt-8">
        
        {/* Title & Atmosphere */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F1E8] drop-shadow-lg tracking-wide mb-3">
            KALACHAKRA
          </h1>
          <p className="text-[#D9A441] font-serif italic text-lg tracking-widest drop-shadow-md">
            Play the Past. Build the Future.
          </p>
        </div>

        {/* The Premium Dark Authentication Panel */}
        <div className="w-full bg-[#101519]/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl rounded-3xl border border-[#34302A] relative overflow-hidden group">
          
          <div className="flex justify-center mb-8 relative z-10 border-b border-[#34302A]">
            <button
              type="button"
              className={`flex-1 pb-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                isLogin ? 'text-[#D9A441] border-b-2 border-[#D9A441]' : 'text-[#C5C9CC] hover:text-[#F5F1E8]'
              }`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex-1 pb-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                !isLogin ? 'text-[#D9A441] border-b-2 border-[#D9A441]' : 'text-[#C5C9CC] hover:text-[#F5F1E8]'
              }`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Sign Up
            </button>
          </div>
          
          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-[#D96B62]/20 border border-[#D96B62]/50 text-[#F5F1E8] px-4 py-3 rounded-lg text-sm text-center font-medium animate-pop-in">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="group/input">
                <label className="block text-xs font-bold text-[#C5C9CC] uppercase tracking-wider mb-2 group-focus-within/input:text-[#D9A441] transition-colors">{t('auth.fullName', 'Traveler Name')}</label>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full bg-[#151B20] border border-[#34302A] rounded-xl py-3 px-4 text-[#F5F1E8] font-medium focus:ring-1 focus:ring-[#D9A441] focus:border-[#D9A441] transition-all shadow-inner outline-none"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div className="group/input">
              <label className="block text-xs font-bold text-[#C5C9CC] uppercase tracking-wider mb-2 group-focus-within/input:text-[#D9A441] transition-colors">{t('auth.email', 'Email Address')}</label>
              <input
                type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full bg-[#151B20] border border-[#34302A] rounded-xl py-3 px-4 text-[#F5F1E8] font-medium focus:ring-1 focus:ring-[#D9A441] focus:border-[#D9A441] transition-all shadow-inner outline-none"
                placeholder="traveler@example.com"
              />
            </div>

            <div className="group/input">
              <label className="block text-xs font-bold text-[#C5C9CC] uppercase tracking-wider mb-2 group-focus-within/input:text-[#D9A441] transition-colors flex justify-between">
                <span>{t('auth.password', 'Secret Key')}</span>
                {isLogin && <button type="button" className="text-[10px] text-[#D9A441] hover:text-[#F5F1E8] transition-colors normal-case">Forgot Password?</button>}
              </label>
              <input
                type="password" name="password" required value={formData.password} onChange={handleChange}
                className="w-full bg-[#151B20] border border-[#34302A] rounded-xl py-3 px-4 text-[#F5F1E8] font-medium focus:ring-1 focus:ring-[#D9A441] focus:border-[#D9A441] transition-all shadow-inner outline-none"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <>
                <div className="group/input">
                  <label className="block text-xs font-bold text-[#C5C9CC] uppercase tracking-wider mb-2 group-focus-within/input:text-[#D9A441] transition-colors">{t('auth.confirmPassword', 'Confirm Key')}</label>
                  <input
                    type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}
                    className="w-full bg-[#151B20] border border-[#34302A] rounded-xl py-3 px-4 text-[#F5F1E8] font-medium focus:ring-1 focus:ring-[#D9A441] focus:border-[#D9A441] transition-all shadow-inner outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div className="group/input">
                  <label className="block text-xs font-bold text-[#C5C9CC] uppercase tracking-wider mb-2 group-focus-within/input:text-[#D9A441] transition-colors flex items-center justify-between">
                    <span>{t('auth.age', 'Age (Years)')}</span>
                    <span className="text-[10px] text-[#B77B2E] normal-case opacity-80">Sets complexity</span>
                  </label>
                  <input
                    type="number" name="age" required min="1" max="120" value={formData.age} onChange={handleChange}
                    className="w-full bg-[#151B20] border border-[#34302A] rounded-xl py-3 px-4 text-[#F5F1E8] font-medium focus:ring-1 focus:ring-[#D9A441] focus:border-[#D9A441] transition-all shadow-inner outline-none"
                    placeholder="14"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-4 px-4 mt-6 rounded-xl shadow-[0_5px_15px_rgba(217,164,65,0.15)] text-[15px] font-bold text-[#070A0C] bg-[#D9A441] hover:bg-[#D9A441]/90 transition-all duration-300 disabled:opacity-50 uppercase tracking-widest"
            >
              {loading ? 'Entering...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
