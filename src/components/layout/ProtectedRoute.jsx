import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGame } from '../../context/GameContext';

const ProtectedRoute = () => {
  const { gameState } = useGame();
  const location = useLocation();

  if (!gameState.isAuthenticated) {
    // Redirect unauthenticated users to the auth page
    return <Navigate to="/auth" replace />;
  }

  // If user is authenticated but hasn't completed onboarding, force them to /onboarding
  if (!gameState.onboardingCompleted && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  // If user HAS completed onboarding and tries to access /onboarding, push them to dashboard
  if (gameState.onboardingCompleted && location.pathname === '/onboarding') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;



