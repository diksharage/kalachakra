import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AchievementProvider } from './context/AchievementContext';
import { AudioProvider } from './context/AudioContext';
import GameLayout from './components/layout/GameLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import ArtifactsPage from './pages/ArtifactsPage';
import AIGuidePage from './pages/AIGuidePage';
import ChallengesPage from './pages/ChallengesPage';
import BuildPage from './pages/BuildPage';
import AchievementsPage from './pages/AchievementsPage';
import InventoryPage from './pages/InventoryPage';
import LibraryPage from './pages/LibraryPage';
import InvestigationsPage from './pages/InvestigationsPage';
import QuestsPage from './pages/QuestsPage';
import BuilderPage from './pages/BuilderPage';
import EventPage from './pages/EventPage';
import InvestigationDetail from './pages/InvestigationDetail';
import ProfilePage from './pages/ProfilePage';
import HeritageLibraryPage from './pages/HeritageLibraryPage';
import BookPage from './pages/BookPage';
import JourneyPage from './pages/JourneyPage';
import LevelIntroPage from './pages/LevelIntroPage';
import LevelPlayPage from './pages/LevelPlayPage';

const AppContent = () => {
  const { language } = useLanguage();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          
          <Route element={<GameLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/journey/level/:id" element={<LevelIntroPage />} />
            <Route path="/journey/level/:id/play" element={<LevelPlayPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/artifacts" element={<ArtifactsPage />} />
            <Route path="/ai-guide" element={<AIGuidePage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/build" element={<BuildPage />} />
            <Route path="/library" element={<HeritageLibraryPage />} />
            <Route path="/library/:categoryId/:bookId" element={<BookPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/investigations" element={<InvestigationsPage />} />
            <Route path="/quests" element={<QuestsPage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/events/:id" element={<EventPage />} />
            <Route path="/investigations/:id" element={<InvestigationDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AudioProvider>
      <GameProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AchievementProvider>
            <AppContent />
          </AchievementProvider>
        </LanguageProvider>
      </ThemeProvider>
    </GameProvider>
    </AudioProvider>
  );
}

export default App;












