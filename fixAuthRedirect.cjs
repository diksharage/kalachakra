const fs = require('fs');
let code = fs.readFileSync('src/pages/AuthPage.jsx', 'utf8');

code = code.replace(
  "if (gameState.currentCivilization) {",
  "if (gameState.onboardingCompleted) {"
);

code = code.replace(
  "gameState.isAuthenticated, gameState.currentCivilization, navigate",
  "gameState.isAuthenticated, gameState.onboardingCompleted, navigate"
);

fs.writeFileSync('src/pages/AuthPage.jsx', code);
console.log("Fixed onboarding redirect in AuthPage!");
