import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { audioSynth } from '../services/audioSynthesizer';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    masterVolume: 0.7,
    sfxVolume: 1.0,
    ambienceVolume: 0.5,
    muted: false,
    uiSoundsEnabled: true
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kalachakra_audio_prefs');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Apply settings to synthesizer whenever they change
  useEffect(() => {
    audioSynth.setSettings({
      master: settings.masterVolume,
      sfx: settings.sfxVolume,
      ambience: settings.ambienceVolume,
      muted: settings.muted
    });
    localStorage.setItem('kalachakra_audio_prefs', JSON.stringify(settings));
  }, [settings]);

  // Global Interaction Listener to initialize Audio Context safely
  useEffect(() => {
    const initAudio = () => {
      audioSynth.init();
      audioSynth.resume();
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
      window.removeEventListener('keydown', initAudio);
    };

    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleMute = useCallback(() => {
    setSettings(prev => ({ ...prev, muted: !prev.muted }));
  }, []);

  // Safe wrapper functions
  const playSound = useCallback((soundId) => {
    if (settings.muted) return;
    
    // Attempt initialization if not already done
    audioSynth.init();
    
    switch (soundId) {
      case 'discovery': audioSynth.playDiscovery(); break;
      case 'achievement': audioSynth.playAchievement(); break;
      case 'quest': audioSynth.playQuest(); break;
      case 'building': audioSynth.playBuilding(); break;
      case 'level_complete': audioSynth.playLevelComplete(); break;
      case 'level_unlock': audioSynth.playAchievement(); break;
      case 'event': audioSynth.playEvent(); break;
      case 'investigation': audioSynth.playInvestigation(); break;
      case 'error': audioSynth.playError(); break;
      case 'ui': 
        if (settings.uiSoundsEnabled) audioSynth.playUI(); 
        break;
      default:
        audioSynth.playUI();
    }
  }, [settings.muted, settings.uiSoundsEnabled]);

  const startAmbience = useCallback((levelId) => {
    if (settings.muted) return;
    audioSynth.startAmbience(levelId);
  }, [settings.muted]);

  const stopAmbience = useCallback(() => {
    audioSynth.stopAmbience();
  }, []);

  const contextValue = {
    settings,
    updateSetting,
    toggleMute,
    playSound,
    startAmbience,
    stopAmbience
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};
