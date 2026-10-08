(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/context/GameContext.jsx
  var import_react2 = __toESM(__require("react"), 1);

  // src/context/AudioContext.jsx
  var import_react = __toESM(__require("react"), 1);

  // src/services/audioSynthesizer.js
  var AudioSynthesizer = class {
    constructor() {
      this.ctx = null;
      this.masterGain = null;
      this.sfxGain = null;
      this.ambienceGain = null;
      this.isInitialized = false;
      this.masterVolume = 1;
      this.sfxVolume = 1;
      this.ambienceVolume = 1;
      this.muted = false;
      this.activeAmbienceNodes = [];
    }
    init() {
      if (this.isInitialized) return;
      try {
        const AudioContext2 = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext2();
        this.masterGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();
        this.ambienceGain = this.ctx.createGain();
        this.sfxGain.connect(this.masterGain);
        this.ambienceGain.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
        this.updateVolumes();
        this.isInitialized = true;
      } catch (e) {
        console.warn("Web Audio API not supported or blocked", e);
      }
    }
    resume() {
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {
        });
      }
    }
    updateVolumes() {
      if (!this.masterGain) return;
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(this.muted ? 0 : this.masterVolume, now, 0.1);
      this.sfxGain.gain.setTargetAtTime(this.sfxVolume, now, 0.1);
      this.ambienceGain.gain.setTargetAtTime(this.ambienceVolume, now, 0.1);
    }
    setSettings({ master, sfx, ambience, muted }) {
      if (master !== void 0) this.masterVolume = master;
      if (sfx !== void 0) this.sfxVolume = sfx;
      if (ambience !== void 0) this.ambienceVolume = ambience;
      if (muted !== void 0) this.muted = muted;
      this.updateVolumes();
    }
    // --- Sound Effects ---
    playTone(freq, type = "sine", duration = 0.1, vol = 0.5) {
      if (!this.isInitialized || this.muted || this.sfxVolume === 0) return;
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(1e-3, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    }
    playUI() {
      this.playTone(600, "sine", 0.1, 0.2);
    }
    playDiscovery() {
      if (!this.isInitialized || this.muted) return;
      this.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.4);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.6);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.6);
    }
    playAchievement() {
      if (!this.isInitialized || this.muted) return;
      this.resume();
      const now = this.ctx.currentTime;
      [261.63, 329.63, 392].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.1 + 0.1);
        gain.gain.exponentialRampToValueAtTime(1e-3, now + 1.2);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + i * 0.1);
        osc.stop(now + 1.2);
      });
    }
    playQuest() {
      this.playTone(300, "square", 0.15, 0.1);
      setTimeout(() => this.playTone(450, "sine", 0.2, 0.15), 100);
    }
    playBuilding() {
      this.playTone(150, "triangle", 0.1, 0.3);
      setTimeout(() => this.playTone(200, "triangle", 0.15, 0.2), 100);
    }
    playLevelComplete() {
      if (!this.isInitialized || this.muted) return;
      this.resume();
      const now = this.ctx.currentTime;
      [261.63, 329.63, 392, 523.25].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.2 + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(1e-3, now + 2);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 2);
      });
    }
    playEvent() {
      this.playTone(220, "sine", 0.4, 0.2);
    }
    playInvestigation() {
      this.playTone(880, "sine", 0.1, 0.1);
      setTimeout(() => this.playTone(1760, "sine", 0.2, 0.1), 100);
    }
    playError() {
      this.playTone(150, "sawtooth", 0.2, 0.1);
    }
    // --- Ambience ---
    createBrownNoise() {
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
      return noiseBuffer;
    }
    startAmbience(levelId) {
      if (!this.isInitialized) return;
      this.stopAmbience();
      this.resume();
      let filterFreq = 400;
      let lfoRate = 0.1;
      let moodType = "nature";
      if (levelId === 1 || levelId === 2) {
        filterFreq = 300;
        moodType = "nature";
      } else if (levelId === 3 || levelId === 10) {
        filterFreq = 800;
        lfoRate = 0.3;
        moodType = "water";
      } else if (levelId === 7 || levelId === 12) {
        filterFreq = 1200;
        moodType = "knowledge";
      } else if (levelId === 8) {
        filterFreq = 200;
        moodType = "stone";
      } else if (levelId === 9 || levelId === 13) {
        filterFreq = 1500;
        lfoRate = 0.5;
        moodType = "rhythm";
      } else {
        filterFreq = 600;
        moodType = "settlement";
      }
      const now = this.ctx.currentTime;
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = this.createBrownNoise();
      noiseSource.loop = true;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.value = filterFreq;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0, now);
      noiseGain.gain.linearRampToValueAtTime(0.05, now + 3);
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ambienceGain);
      noiseSource.start();
      const droneOsc = this.ctx.createOscillator();
      droneOsc.type = moodType === "knowledge" ? "sine" : moodType === "rhythm" ? "triangle" : "sine";
      droneOsc.frequency.value = moodType === "stone" ? 65.41 : 130.81;
      const droneLfo = this.ctx.createOscillator();
      droneLfo.type = "sine";
      droneLfo.frequency.value = lfoRate;
      const droneLfoGain = this.ctx.createGain();
      droneLfoGain.gain.value = 5;
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
      this.activeAmbienceNodes.forEach((node) => {
        if (node instanceof GainNode) {
          node.gain.cancelScheduledValues(now);
          node.gain.linearRampToValueAtTime(0, now + 1);
        } else if (node.stop) {
          setTimeout(() => {
            try {
              node.stop();
              node.disconnect();
            } catch (e) {
            }
          }, 1e3);
        }
      });
      this.activeAmbienceNodes = [];
    }
  };
  var audioSynth = new AudioSynthesizer();

  // src/context/AudioContext.jsx
  var AudioContext = (0, import_react.createContext)();
  var useAudio = () => (0, import_react.useContext)(AudioContext);

  // src/services/saveService.js
  var SAVE_VERSION = 1;
  var saveService = {
    getKey: (email) => `kalachakra_state_${email}`,
    getBackupKey: (email) => `kalachakra_state_backup_${email}`,
    validateState: (state) => {
      if (!state || typeof state !== "object") return false;
      if (!Array.isArray(state.completedLevels)) state.completedLevels = [];
      if (!Array.isArray(state.unlockedLevels)) state.unlockedLevels = [1];
      if (typeof state.currentLevel !== "number") state.currentLevel = 1;
      if (!Array.isArray(state.unlockedArtifacts)) state.unlockedArtifacts = [];
      if (!Array.isArray(state.completedChallenges)) state.completedChallenges = [];
      if (!Array.isArray(state.buildings)) state.buildings = [];
      if (!state.inventory) state.inventory = {};
      if (!Array.isArray(state.completedInvestigations)) state.completedInvestigations = [];
      if (!Array.isArray(state.activityLog)) state.activityLog = [];
      if (typeof state.legacy !== "number") state.legacy = 0;
      return state;
    },
    migrateState: (state) => {
      let migrated = { ...state };
      if (!migrated.saveVersion) migrated.saveVersion = 0;
      if (migrated.saveVersion < 1) {
        if (migrated.coins) {
          delete migrated.coins;
        }
        migrated.saveVersion = SAVE_VERSION;
      }
      return migrated;
    },
    save: (email, state) => {
      if (!email) return false;
      try {
        const stateToSave = {
          ...state,
          saveVersion: SAVE_VERSION,
          lastSavedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        const serialized = JSON.stringify(stateToSave);
        const previous = localStorage.getItem(saveService.getKey(email));
        if (previous) {
          localStorage.setItem(saveService.getBackupKey(email), previous);
        }
        localStorage.setItem(saveService.getKey(email), serialized);
        localStorage.setItem("kalachakra_active_user", email);
        return true;
      } catch (e) {
        console.error("KALACHAKRA Save failed:", e);
        return false;
      }
    },
    load: (email, defaultState) => {
      if (!email) return defaultState;
      try {
        const saved = localStorage.getItem(saveService.getKey(email));
        if (!saved) return defaultState;
        const parsed = JSON.parse(saved);
        const migrated = saveService.migrateState(parsed);
        const validated = saveService.validateState(migrated);
        return { ...defaultState, ...validated };
      } catch (e) {
        console.error("KALACHAKRA Load failed, attempting backup recovery...", e);
        try {
          const backup = localStorage.getItem(saveService.getBackupKey(email));
          if (backup) {
            const parsedBackup = JSON.parse(backup);
            const migrated = saveService.migrateState(parsedBackup);
            return saveService.validateState({ ...defaultState, ...migrated });
          }
        } catch (backupErr) {
          console.error("KALACHAKRA Backup recovery failed.", backupErr);
        }
        return defaultState;
      }
    },
    clear: (email) => {
      if (!email) return;
      localStorage.removeItem(saveService.getKey(email));
      localStorage.removeItem(saveService.getBackupKey(email));
    },
    exportData: (email) => {
      if (!email) return null;
      try {
        const data = localStorage.getItem(saveService.getKey(email));
        if (!data) return null;
        return data;
      } catch (e) {
        return null;
      }
    },
    importData: (email, jsonString, defaultState) => {
      if (!email) return false;
      try {
        const parsed = JSON.parse(jsonString);
        if (!parsed || typeof parsed !== "object") throw new Error("Invalid save data");
        const sanitized = {
          ...parsed,
          email,
          // Force binding to current user
          id: parsed.id
          // Assuming it matches or auth handles it
        };
        const migrated = saveService.migrateState(sanitized);
        const validated = saveService.validateState(migrated);
        saveService.save(email, { ...defaultState, ...validated });
        return true;
      } catch (e) {
        console.error("KALACHAKRA Import failed:", e);
        return false;
      }
    }
  };

  // src/data/quests.js
  var questData = [
    {
      id: "q_l1_main",
      levelId: 1,
      type: "main",
      titleKey: "quest.q_l1_main.title",
      descKey: "quest.q_l1_main.desc",
      objectives: [
        { type: "discover", target: "hand_axe", required: 1, labelKey: "quest.obj.discover_tools" }
      ],
      rewards: { legacy: 20 },
      prerequisites: [],
      kalaHintKey: "quest.q_l1_main.hint"
    },
    {
      id: "q_l3_main",
      levelId: 3,
      type: "main",
      titleKey: "quest.q_l3_main.title",
      descKey: "quest.q_l3_main.desc",
      objectives: [
        { type: "discover", target: "harappa", required: 1, labelKey: "quest.obj.discover_harappa" },
        { type: "investigate", target: "indus-seal-investigation", required: 1, labelKey: "quest.obj.inv_seal" }
      ],
      rewards: { legacy: 50, inventory: { trade_goods: 1 } },
      prerequisites: [],
      kalaHintKey: "quest.q_l3_main.hint"
    },
    {
      id: "q_l3_side_drainage",
      levelId: 3,
      type: "side",
      titleKey: "quest.q_l3_side_drainage.title",
      descKey: "quest.q_l3_side_drainage.desc",
      objectives: [
        { type: "discover", target: "great_bath", required: 1, labelKey: "quest.obj.discover_great_bath" },
        { type: "build", target: "indus_water_feature", required: 1, labelKey: "quest.obj.build_water" }
      ],
      rewards: { legacy: 15 },
      prerequisites: [],
      kalaHintKey: "quest.q_l3_side_drainage.hint"
    },
    {
      id: "q_l6_main",
      levelId: 6,
      type: "main",
      titleKey: "quest.q_l6_main.title",
      descKey: "quest.q_l6_main.desc",
      objectives: [
        { type: "investigate", target: "ashokan-edict-investigation", required: 1, labelKey: "quest.obj.inv_ashoka" }
      ],
      rewards: { legacy: 40, inventory: { royal_decree: 1 } },
      prerequisites: [],
      kalaHintKey: "quest.q_l6_main.hint"
    },
    {
      id: "q_l11_main",
      levelId: 11,
      type: "main",
      titleKey: "quest.q_l11_main.title",
      descKey: "quest.q_l11_main.desc",
      objectives: [
        { type: "investigate", target: "hampi-architecture-investigation", required: 1, labelKey: "quest.obj.inv_hampi" },
        { type: "discover", target: "hampi_vijayanagara", required: 1, labelKey: "quest.obj.discover_hampi" }
      ],
      rewards: { legacy: 60, inventory: { temple_carving: 1 } },
      prerequisites: [],
      kalaHintKey: "quest.q_l11_main.hint"
    }
  ];

  // src/context/GameContext.jsx
  var GameContext = (0, import_react2.createContext)();
  var useGame = () => (0, import_react2.useContext)(GameContext);
  var GameProvider = ({ children }) => {
    const defaultState = {
      // Profile info (populated on login)
      id: null,
      name: "Explorer",
      email: "",
      age: null,
      ageGroup: null,
      createdAt: null,
      lastLogin: null,
      isAuthenticated: false,
      onboardingCompleted: false,
      // Game progress
      playerType: null,
      currentCivilization: null,
      energy: 100,
      knowledge: 0,
      culture: 0,
      coins: 0,
      legacy: 0,
      // Journey Progress
      currentLevel: 1,
      completedLevels: [],
      unlockedLevels: [1],
      activeLevelId: null,
      // Tracks which level the state is for
      activeLevelState: null,
      // Persists in-progress level data
      level: 1,
      unlockedArtifacts: [],
      completedChallenges: [],
      buildings: [],
      achievements: [],
      inventory: {},
      completedInvestigations: []
    };
    const [recentDiscoveries, setRecentDiscoveries] = (0, import_react2.useState)([]);
    const audio = useAudio();
    const [saveStatus, setSaveStatus] = (0, import_react2.useState)("idle");
    const [lastSavedAt, setLastSavedAt] = (0, import_react2.useState)(null);
    const [gameState, setGameState] = (0, import_react2.useState)(() => {
      const activeEmail = localStorage.getItem("kalachakra_active_user");
      if (activeEmail) {
        return saveService.load(activeEmail, defaultState);
      }
      return defaultState;
    });
    (0, import_react2.useEffect)(() => {
      if (!gameState.isAuthenticated || !gameState.email) return;
      setSaveStatus("saving");
      const handler = setTimeout(() => {
        const success = saveService.save(gameState.email, gameState);
        if (success) {
          setSaveStatus("saved");
          setLastSavedAt(/* @__PURE__ */ new Date());
          setTimeout(() => setSaveStatus("idle"), 3e3);
        } else {
          setSaveStatus("error");
        }
      }, 1e3);
      return () => clearTimeout(handler);
    }, [gameState]);
    (0, import_react2.useEffect)(() => {
      const handleVisibilityChange = () => {
        if (document.hidden && gameState.isAuthenticated && gameState.email) {
          saveService.save(gameState.email, gameState);
          setLastSavedAt(/* @__PURE__ */ new Date());
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [gameState]);
    const loginUser = (userProfile) => {
      const savedState = localStorage.getItem(`kalachakra_state_${userProfile.email}`);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setGameState({
          ...defaultState,
          ...parsed,
          ...userProfile,
          // Update with fresh DB profile info (like lastLogin)
          isAuthenticated: true
        });
      } else {
        setGameState({
          ...defaultState,
          ...userProfile,
          isAuthenticated: true
        });
      }
      localStorage.setItem("kalachakra_active_user", userProfile.email);
    };
    const logoutUser = () => {
      localStorage.removeItem("kalachakra_active_user");
      setGameState(defaultState);
    };
    const updateResources = (resources) => {
      setGameState((prev) => {
        const newState = { ...prev };
        if (resources.knowledge) newState.knowledge += resources.knowledge;
        if (resources.culture) newState.culture += resources.culture;
        if (resources.legacy) newState.legacy += resources.legacy;
        if (resources.coins) newState.coins += resources.coins;
        if (resources.energy) newState.energy = Math.max(0, Math.min(100, newState.energy + resources.energy));
        const inv = { ...prev.inventory || {} };
        Object.keys(resources).forEach((k) => {
          if (["knowledge", "culture", "legacy", "energy", "coins"].includes(k)) return;
          inv[k] = (inv[k] || 0) + resources[k];
        });
        newState.inventory = inv;
        return newState;
      });
    };
    ;
    const setPlayerType = (type) => setGameState((prev) => ({ ...prev, playerType: type }));
    const setCivilization = (civId) => setGameState((prev) => ({ ...prev, currentCivilization: civId }));
    const unlockArtifact = (id) => {
      if (!gameState.unlockedArtifacts.includes(id)) {
        setRecentDiscoveries((prev) => [...prev, id]);
        notify("DISCOVERY", id, "library.added", { icon: "\u{1F3FA}", route: "/library" });
        setGameState((prev) => ({ ...prev, unlockedArtifacts: [...prev.unlockedArtifacts, id] }));
        checkQuestProgress("discover", id);
      }
    };
    const clearRecentDiscoveries = () => setRecentDiscoveries([]);
    const [recentCompletedQuests, setRecentCompletedQuests] = (0, import_react2.useState)([]);
    const clearRecentCompletedQuests = () => setRecentCompletedQuests([]);
    const notify = (type, titleKey, messageKey, metadata = {}) => {
      if (audio?.playSound) {
        if (type === "DISCOVERY") audio.playSound("discovery");
        else if (type === "ACHIEVEMENT") audio.playSound("achievement");
        else if (type === "QUEST_COMPLETE") audio.playSound("quest");
        else if (type === "LEVEL_UNLOCK") audio.playSound("level_unlock");
        else if (type === "BUILD") audio.playSound("building");
        else if (type === "EVENT") audio.playSound("event");
        else if (type === "INVESTIGATION") audio.playSound("investigation");
        else if (type === "SYSTEM") audio.playSound("ui");
      }
      setGameState((prev) => {
        const newNotif = {
          id: Date.now().toString() + Math.random().toString(36).substring(7),
          type,
          titleKey,
          messageKey,
          metadata,
          read: false,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
        const notifications = [newNotif, ...prev.notifications || []].slice(0, 100);
        return { ...prev, notifications };
      });
    };
    const markNotificationRead = (id) => {
      setGameState((prev) => ({
        ...prev,
        notifications: (prev.notifications || []).map((n) => n.id === id ? { ...n, read: true } : n)
      }));
    };
    const markTutorialComplete = (skipped = false) => {
      setGameState((prev) => ({
        ...prev,
        tutorialCompleted: true,
        tutorialSkipped: skipped
      }));
      if (!skipped) {
        logActivity("SYSTEM", "tutorial.completed_title", "tutorial.completed_desc");
        notify("SYSTEM", "tutorial.completed_title", "tutorial.completed_desc", { icon: "\u{1F389}" });
      }
    };
    const resetTutorial = () => {
      setGameState((prev) => ({
        ...prev,
        tutorialCompleted: false,
        tutorialSkipped: false
      }));
    };
    const markHintComplete = (hintId) => {
      setGameState((prev) => ({
        ...prev,
        completedHints: {
          ...prev.completedHints || {},
          [hintId]: true
        }
      }));
    };
    const markAllNotificationsRead = () => {
      setGameState((prev) => ({
        ...prev,
        notifications: (prev.notifications || []).map((n) => ({ ...n, read: true }))
      }));
    };
    const clearNotifications = () => {
      setGameState((prev) => ({ ...prev, notifications: [] }));
    };
    const logActivity = (type, titleKey, descKey, metadata = {}) => {
      setGameState((prev) => {
        const newLog = {
          id: Date.now().toString() + Math.random().toString(36).substring(7),
          type,
          titleKey,
          descKey,
          metadata,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
        const activityLog = [newLog, ...prev.activityLog || []].slice(0, 50);
        return { ...prev, activityLog };
      });
    };
    const resolveEvent = (eventId, optionId, reqs, consequences) => {
      logActivity("EVENT", "Historical Decision", "You resolved a world event.");
      notify("EVENT", "event.resolved", "event.alert_desc", { icon: "\u26A1" });
      setGameState((prev) => {
        if (prev.completedEvents?.[eventId]) return prev;
        const currentInv = prev.inventory || {};
        const newInv = { ...currentInv };
        for (const [res, cost] of Object.entries(reqs || {})) {
          if ((currentInv[res] || 0) < cost) return prev;
          newInv[res] -= cost;
        }
        if (consequences?.inventory) {
          for (const [res, gain] of Object.entries(consequences.inventory)) {
            newInv[res] = (newInv[res] || 0) + gain;
          }
        }
        return {
          ...prev,
          inventory: newInv,
          legacy: (prev.legacy || 0) + (consequences?.legacy || 0),
          completedEvents: {
            ...prev.completedEvents || {},
            [eventId]: optionId
          }
        };
      });
    };
    const placeBuilding = (levelId, gridIndex, buildingData) => {
      logActivity("BUILD", "Building Constructed", "Expanded your settlement.");
      notify("BUILD", "Building Constructed", "dash.rec.build_desc", { icon: "\u{1F3D7}\uFE0F", route: "/builder" });
      setGameState((prev) => {
        const reqs = buildingData.requirements || {};
        const currentInv = prev.inventory || {};
        for (const [res, cost] of Object.entries(reqs)) {
          if ((currentInv[res] || 0) < cost) return prev;
        }
        const newInv = { ...currentInv };
        for (const [res, cost] of Object.entries(reqs)) {
          newInv[res] -= cost;
        }
        const currentEnv = prev.builtEnvironment || {};
        const levelEnv = currentEnv[levelId] || [];
        const filteredEnv = levelEnv.filter((b) => b.gridIndex !== gridIndex);
        const newState = {
          ...prev,
          inventory: newInv,
          builtEnvironment: {
            ...currentEnv,
            [levelId]: [...filteredEnv, { gridIndex, buildingId: buildingData.id }]
          },
          legacy: (prev.legacy || 0) + 5
          // Small legacy reward for building
        };
        return newState;
      });
      checkQuestProgress("build", buildingData.id);
    };
    const removeBuilding = (levelId, gridIndex) => {
      setGameState((prev) => {
        const currentEnv = prev.builtEnvironment || {};
        const levelEnv = currentEnv[levelId] || [];
        return {
          ...prev,
          builtEnvironment: {
            ...currentEnv,
            [levelId]: levelEnv.filter((b) => b.gridIndex !== gridIndex)
          }
        };
      });
    };
    const startQuest = (id) => {
      setGameState((prev) => {
        if (prev.quests?.[id]) return prev;
        return {
          ...prev,
          quests: {
            ...prev.quests || {},
            [id]: { status: "in_progress", progress: {} }
          }
        };
      });
    };
    const checkQuestProgress = (type, target) => {
      setGameState((prev) => {
        let newState = { ...prev };
        let questsUpdated = false;
        const currentQuests = newState.quests || {};
        questData.forEach((q) => {
          const stateQ = currentQuests[q.id];
          if (stateQ && stateQ.status === "in_progress") {
            q.objectives.forEach((obj, idx) => {
              if (obj.type === type && obj.target === target) {
                const currProg = stateQ.progress[idx] || 0;
                if (currProg < obj.required) {
                  if (!questsUpdated) {
                    newState.quests = { ...currentQuests };
                    questsUpdated = true;
                  }
                  newState.quests[q.id] = {
                    ...newState.quests[q.id],
                    progress: { ...newState.quests[q.id].progress, [idx]: currProg + 1 }
                  };
                  let isComplete = true;
                  q.objectives.forEach((o, i) => {
                    const p = i === idx ? currProg + 1 : newState.quests[q.id].progress[i] || 0;
                    if (p < o.required) isComplete = false;
                  });
                  if (isComplete) {
                    newState.quests[q.id].status = "completed";
                    setRecentCompletedQuests((r) => [...r, q]);
                    if (q.rewards?.legacy) {
                      newState.legacy = (newState.legacy || 0) + q.rewards.legacy;
                    }
                    if (q.rewards?.inventory) {
                      newState.inventory = { ...newState.inventory };
                      Object.entries(q.rewards.inventory).forEach(([k, v]) => {
                        newState.inventory[k] = (newState.inventory[k] || 0) + v;
                      });
                    }
                  }
                }
              }
            });
          }
        });
        return questsUpdated ? newState : prev;
      });
    };
    const completeInvestigation = (id, rewards) => {
      if (!gameState.completedInvestigations.includes(id)) {
        setGameState((prev) => {
          const newState = { ...prev, completedInvestigations: [...prev.completedInvestigations, id] };
          return newState;
        });
        if (rewards?.legacy) updateResources({ legacy: rewards.legacy });
        if (rewards?.inventory) updateResources(rewards.inventory);
        if (rewards?.libraryId) unlockArtifact(rewards.libraryId);
        checkQuestProgress("investigate", id);
      }
    };
    const addBuilding = (buildingId) => {
      setGameState((prev) => ({ ...prev, buildings: [...prev.buildings, buildingId] }));
    };
    const unlockAchievement = (id) => {
      if (!gameState.achievements.includes(id)) {
        setGameState((prev) => ({ ...prev, achievements: [...prev.achievements, id] }));
      }
    };
    const completeChallenge = (id) => {
      if (!gameState.completedChallenges.includes(id)) {
        setGameState((prev) => ({ ...prev, completedChallenges: [...prev.completedChallenges, id] }));
      }
    };
    const completeLevel = (levelId) => {
      setGameState((prev) => {
        if (prev.completedLevels.includes(levelId)) return prev;
        const newCompleted = [...prev.completedLevels, levelId];
        const nextLevel = levelId + 1;
        const newUnlocked = prev.unlockedLevels.includes(nextLevel) ? prev.unlockedLevels : [...prev.unlockedLevels, nextLevel];
        const isFinalLevel = levelId === 14;
        return {
          ...prev,
          completedLevels: newCompleted,
          unlockedLevels: newUnlocked,
          currentLevel: prev.currentLevel === levelId ? nextLevel : prev.currentLevel,
          legacy: prev.legacy + 100,
          // Reward legacy points for completing a level
          gameCompleted: isFinalLevel ? true : prev.gameCompleted,
          achievements: isFinalLevel && !prev.achievements.includes("achievement_preserver") ? [...prev.achievements, "achievement_preserver"] : prev.achievements
        };
      });
    };
    const updateActiveLevelState = (levelId, newState) => {
      setGameState((prev) => ({
        ...prev,
        activeLevelId: levelId,
        activeLevelState: newState
      }));
    };
    const completeOnboarding = () => setGameState((prev) => ({ ...prev, onboardingCompleted: true }));
    return /* @__PURE__ */ import_react2.default.createElement(GameContext.Provider, { value: {
      gameState,
      loginUser,
      logoutUser,
      updateResources,
      setPlayerType,
      setCivilization,
      unlockArtifact,
      recentDiscoveries,
      clearRecentDiscoveries,
      addBuilding,
      unlockAchievement,
      startQuest,
      placeBuilding,
      removeBuilding,
      resolveEvent,
      logActivity,
      notify,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
      markTutorialComplete,
      resetTutorial,
      markHintComplete,
      recentCompletedQuests,
      clearRecentCompletedQuests,
      completeInvestigation,
      completeChallenge,
      completeOnboarding,
      completeLevel,
      updateActiveLevelState,
      saveStatus,
      lastSavedAt
    } }, children);
  };
})();
