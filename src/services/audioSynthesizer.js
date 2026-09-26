// Highly optimized, lightweight Web Audio API synthesizer for KALACHAKRA
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.ambienceGain = null;
    
    this.isInitialized = false;
    this.masterVolume = 1.0;
    this.sfxVolume = 1.0;
    this.ambienceVolume = 1.0;
    this.muted = false;

    this.activeAmbienceNodes = [];
    this.currentAmbienceLevel = null;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      
      this.masterGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.ambienceGain = this.ctx.createGain();

      this.sfxGain.connect(this.masterGain);
      this.ambienceGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.updateVolumes();
      this.isInitialized = true;
      if (this.currentAmbienceLevel !== null) {
        this.startAmbience(this.currentAmbienceLevel);
      }
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  updateVolumes() {
    if (!this.masterGain) return;
    
    // Safely ramp volume to avoid clipping/pops
    const now = this.ctx.currentTime;
    this.masterGain.gain.setTargetAtTime(this.muted ? 0 : this.masterVolume, now, 0.1);
    this.sfxGain.gain.setTargetAtTime(this.sfxVolume, now, 0.1);
    this.ambienceGain.gain.setTargetAtTime(this.ambienceVolume, now, 0.1);
  }

  setSettings({ master, sfx, ambience, muted }) {
    if (master !== undefined) this.masterVolume = master;
    if (sfx !== undefined) this.sfxVolume = sfx;
    if (ambience !== undefined) this.ambienceVolume = ambience;
    if (muted !== undefined) this.muted = muted;
    this.updateVolumes();
  }

  // --- Sound Effects ---

  playTone(freq, type = 'sine', duration = 0.1, vol = 0.5) {
    if (!this.isInitialized || this.muted || this.sfxVolume === 0) return;
    this.resume();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.sfxGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playUI() {
    this.playTone(600, 'sine', 0.1, 0.2);
  }

  playDiscovery() {
    if (!this.isInitialized || this.muted) return;
    this.resume();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now); // A4
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.2); // A5
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.4); // E6
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    
    osc.connect(gain);
    gain.connect(this.sfxGain);
    
    osc.start(now);
    osc.stop(now + 0.6);
  }

  playAchievement() {
    if (!this.isInitialized || this.muted) return;
    this.resume();
    const now = this.ctx.currentTime;
    
    // C Major Chord
    [261.63, 329.63, 392.00].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + (i * 0.1));
      
      gain.gain.setValueAtTime(0, now + (i * 0.1));
      gain.gain.linearRampToValueAtTime(0.2, now + (i * 0.1) + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      
      osc.connect(gain);
      gain.connect(this.sfxGain);
      
      osc.start(now + (i * 0.1));
      osc.stop(now + 1.2);
    });
  }

  playQuest() {
    // Soft metallic/wood knock
    this.playTone(300, 'square', 0.15, 0.1);
    setTimeout(() => this.playTone(450, 'sine', 0.2, 0.15), 100);
  }

  playBuilding() {
    this.playTone(150, 'triangle', 0.1, 0.3);
    setTimeout(() => this.playTone(200, 'triangle', 0.15, 0.2), 100);
  }

  playLevelComplete() {
    if (!this.isInitialized || this.muted) return;
    this.resume();
    const now = this.ctx.currentTime;
    
    // Grand rising chord
    [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.2 + (i * 0.1));
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
      
      osc.connect(gain);
      gain.connect(this.sfxGain);
      
      osc.start(now);
      osc.stop(now + 2.0);
    });
  }

  playEvent() {
    this.playTone(220, 'sine', 0.4, 0.2); // Low thoughtful hum
  }

  playInvestigation() {
    this.playTone(880, 'sine', 0.1, 0.1); // Short bright ping
    setTimeout(() => this.playTone(1760, 'sine', 0.2, 0.1), 100);
  }

  playError() {
    this.playTone(150, 'sawtooth', 0.2, 0.1);
  }

  // --- Ambience ---

  createBrownNoise() {
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Compensate gain
    }
    return noiseBuffer;
  }

  startAmbience(levelId) {
    this.currentAmbienceLevel = levelId;
    if (!this.isInitialized) return;
    this.stopAmbience(); // Clear existing
    this.resume();

    // Map level to filter frequencies (conceptual heritage atmosphere)
    let filterFreq = 400;
    let lfoRate = 0.1;
    let moodType = 'nature'; // nature, water, craft, trade, knowledge

    if (levelId === 1 || levelId === 2) { filterFreq = 300; moodType = 'nature'; } // Earth/Nature
    else if (levelId === 3 || levelId === 10) { filterFreq = 800; lfoRate = 0.3; moodType = 'water'; } // Water/River
    else if (levelId === 7 || levelId === 12) { filterFreq = 1200; moodType = 'knowledge'; } // Library/Manuscript
    else if (levelId === 8) { filterFreq = 200; moodType = 'stone'; } // Architecture/Stone
    else if (levelId === 9 || levelId === 13) { filterFreq = 1500; lfoRate = 0.5; moodType = 'rhythm'; } // Rhythm/Culture
    else { filterFreq = 600; moodType = 'settlement'; } // Default

    const now = this.ctx.currentTime;

    // 1. Filtered Noise (Wind/Atmosphere)
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = this.createBrownNoise();
    noiseSource.loop = true;
    
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = filterFreq;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.05, now + 3); // Fade in

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ambienceGain);
    
    noiseSource.start();

    // 2. Tonal Drone (Mood)
    const droneOsc = this.ctx.createOscillator();
    droneOsc.type = moodType === 'knowledge' ? 'sine' : (moodType === 'rhythm' ? 'triangle' : 'sine');
    droneOsc.frequency.value = moodType === 'stone' ? 65.41 : 130.81; // C2 or C3
    
    const droneLfo = this.ctx.createOscillator();
    droneLfo.type = 'sine';
    droneLfo.frequency.value = lfoRate;
    
    const droneLfoGain = this.ctx.createGain();
    droneLfoGain.gain.value = 5; // Vibrato depth
    droneLfo.connect(droneLfoGain);
    droneLfoGain.connect(droneOsc.frequency);
    
    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0, now);
    droneGain.gain.linearRampToValueAtTime(0.02, now + 4);

    droneOsc.connect(droneGain);
    droneGain.connect(this.ambienceGain);
    
    droneOsc.start();
    droneLfo.start();

    this.activeAmbienceNodes = [noiseSource, noiseGain, droneOsc, droneLfo, droneGain];
  }

  stopAmbience() {
    if (!this.isInitialized || this.activeAmbienceNodes.length === 0) return;
    
    const now = this.ctx.currentTime;
    this.activeAmbienceNodes.forEach(node => {
      if (node instanceof GainNode) {
        node.gain.cancelScheduledValues(now);
        node.gain.linearRampToValueAtTime(0, now + 1); // Fade out
      } else if (node.stop) {
        setTimeout(() => {
          try { node.stop(); node.disconnect(); } catch(e){}
        }, 1000);
      }
    });
    
    this.activeAmbienceNodes = [];
  }
}

export const audioSynth = new AudioSynthesizer();
