const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/KalaCompanion.jsx', 'utf8');

const contextualLogic = `
  const getContextualMessage = () => {
    if (activeChallenge) {
      return "You are currently facing a challenge! Review the options carefully. If you need a hint, just ask.";
    }
    
    // Missing resources check
    const isMissingResources = document.querySelector('.bg-red-900\\\\/20');
    if (isMissingResources) {
      return "You need more resources for this structure. You can gather them by completing challenges or exploring more locations in this era.";
    }

    switch(stage) {
      case 1: return "We're exploring the area. Click on the highlighted locations to see what resources and clues we can find.";
      case 2: return "This object may tell us something about the people in this civilization. Let's investigate to uncover artifacts.";
      case 3: return "Great discoveries! Now let's decode the history behind what we found.";
      case 4: return "Time to test our knowledge. Complete the challenges to advance the civilization.";
      case 5: return "We have enough resources to start building. Let's expand our settlement!";
      case 6: return "Excellent progress. We should claim our rewards before we move on.";
      case 7: return "Your decisions improved the settlement! Here's what that tells us historically... The next era awaits.";
      default: return "I am here to guide you through history. Where should we go next?";
    }
  };
`;

content = content.replace(/const getContextualMessage = \(\) => \{[\s\S]*?\}\s*};\n/m, contextualLogic + '\n');

fs.writeFileSync('src/components/gameplay/KalaCompanion.jsx', content);
