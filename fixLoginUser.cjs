const fs = require('fs');
let code = fs.readFileSync('src/context/GameContext.jsx', 'utf8');

// Replace loginUser logic
const oldLogin = `    const loginUser = (userProfile) => {
      // Try to load existing state for this user
      const savedState = localStorage.getItem(\`kalachakra_state_\${userProfile.email}\`);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setGameState({
          ...defaultState,
          ...parsed,
          ...userProfile, // Update with fresh DB profile info (like lastLogin)
          isAuthenticated: true
        });
      } else {
        // New game state for this user
        setGameState({
          ...defaultState,
          ...userProfile,
          isAuthenticated: true
        });
      }
      localStorage.setItem('kalachakra_active_user', userProfile.email);
    };`;

const newLogin = `    const loginUser = (userProfile) => {
      // Safely load and validate existing state for this user using saveService
      const loadedState = saveService.load(userProfile.email, defaultState);
      
      setGameState({
        ...defaultState,
        ...loadedState,
        ...userProfile, // Always override with fresh profile data
        isAuthenticated: true
      });
      
      localStorage.setItem('kalachakra_active_user', userProfile.email);
    };`;

code = code.replace(oldLogin, newLogin);
fs.writeFileSync('src/context/GameContext.jsx', code);
console.log("Fixed GameContext loginUser to use saveService.load");
