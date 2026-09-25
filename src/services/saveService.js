export const SAVE_VERSION = 1;

export const saveService = {
  getKey: (email) => `kalachakra_state_${email}`,
  getBackupKey: (email) => `kalachakra_state_backup_${email}`,

  validateState: (state) => {
    if (!state || typeof state !== 'object') return false;
    if (!Array.isArray(state.completedLevels)) state.completedLevels = [];
    if (!Array.isArray(state.unlockedLevels)) state.unlockedLevels = [1];
    if (typeof state.currentLevel !== 'number') state.currentLevel = 1;
    if (!Array.isArray(state.unlockedArtifacts)) state.unlockedArtifacts = [];
    if (!Array.isArray(state.completedChallenges)) state.completedChallenges = [];
    if (!Array.isArray(state.buildings)) state.buildings = [];
    if (!state.inventory) state.inventory = {};
    if (!Array.isArray(state.completedInvestigations)) state.completedInvestigations = [];
    if (!Array.isArray(state.activityLog)) state.activityLog = [];
    if (typeof state.legacy !== 'number') state.legacy = 0;
    
    // Add any future structural normalizations here
    return state;
  },

  migrateState: (state) => {
    // Apply defaults or field renames based on older versions if they existed
    let migrated = { ...state };
    if (!migrated.saveVersion) migrated.saveVersion = 0;

    // Example migration: if moving from version 0 to 1
    if (migrated.saveVersion < 1) {
      if (migrated.coins) {
         // ensure coins don't act as a generic currency in the logic, we keep legacy
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
        lastSavedAt: new Date().toISOString()
      };

      const serialized = JSON.stringify(stateToSave);
      
      // Before overwriting, keep a safe backup of the previous save
      const previous = localStorage.getItem(saveService.getKey(email));
      if (previous) {
        localStorage.setItem(saveService.getBackupKey(email), previous);
      }

      localStorage.setItem(saveService.getKey(email), serialized);
      localStorage.setItem('kalachakra_active_user', email);
      return true;
    } catch (e) {
      console.error('KALACHAKRA Save failed:', e);
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
      console.error('KALACHAKRA Load failed, attempting backup recovery...', e);
      // Attempt backup recovery
      try {
        const backup = localStorage.getItem(saveService.getBackupKey(email));
        if (backup) {
          const parsedBackup = JSON.parse(backup);
          const migrated = saveService.migrateState(parsedBackup);
          return saveService.validateState({ ...defaultState, ...migrated });
        }
      } catch (backupErr) {
        console.error('KALACHAKRA Backup recovery failed.', backupErr);
      }
      
      return defaultState; // Fallback to safe defaults to prevent crash
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
      // Sanitize secrets if there were any (e.g. passwords) - currently none exist in gameState
      return data;
    } catch (e) {
      return null;
    }
  },

  importData: (email, jsonString, defaultState) => {
    if (!email) return false;
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') throw new Error('Invalid save data');
      
      // Strip potentially harmful or cross-user identifiers
      const sanitized = {
        ...parsed,
        email: email, // Force binding to current user
        id: parsed.id // Assuming it matches or auth handles it
      };

      const migrated = saveService.migrateState(sanitized);
      const validated = saveService.validateState(migrated);
      
      saveService.save(email, { ...defaultState, ...validated });
      return true;
    } catch (e) {
      console.error('KALACHAKRA Import failed:', e);
      return false;
    }
  }
};
