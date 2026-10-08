export const askHeritageGuide = async (question, context = {}, history = []) => {
  // Simulate network delay for natural feel
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

  const lowerQ = question.toLowerCase();
  let responseText = "";
  let actions = [];

  const isYoung = context.ageGroup === '6-8' || context.ageGroup === '9-11';
  
  // 1. Game-Aware Assistance
  if (lowerQ.includes("what should i do") || lowerQ.includes("next") || lowerQ.includes("objective") || lowerQ.includes("stuck")) {
     if (context.missingResources) {
        responseText = isYoung 
          ? "You need more materials! Look around for places you can gather resources."
          : "Your current objective is to gather the missing resources required for your construction. Explore the era to find them.";
        actions.push({ label: 'Show Locations', type: 'show_location' });
     } else if (context.activeChallenge) {
        responseText = "You are currently facing a challenge! Would you like a hint?";
        actions.push({ label: 'Give Hint', type: 'give_hint' });
     } else {
        switch(context.stage) {
          case 1: 
             responseText = "Right now, you should explore the map to find all key locations. Click on the highlighted areas!";
             break;
          case 2:
             responseText = "We need to investigate the areas you explored to discover historical artifacts.";
             break;
          case 3:
             responseText = "Now that we've found these clues, let's analyze them to learn their historical significance.";
             break;
          case 4:
             responseText = "It's time to solve the challenges for this era using what you've learned.";
             actions.push({ label: 'Show Objective', type: 'show_objective' });
             break;
          case 5:
             responseText = "You have enough resources to build! Open the Builder menu to construct the required structures.";
             actions.push({ label: 'Open Builder', type: 'show_objective' });
             break;
          case 6:
             responseText = "You've met all objectives for this level! Claim your rewards to proceed.";
             break;
          case 7:
             responseText = "You have completed this level! You can now move on to the next era from the Journey map.";
             actions.push({ label: 'Journey Map', type: 'go_journey' });
             break;
          default:
             responseText = "You can explore the map, review your inventory, or check your active quests.";
        }
     }
     return { text: responseText, actions };
  }

  if (lowerQ.includes("hint") || lowerQ.includes("help me with this") || lowerQ.includes("i'm stuck")) {
     if (context.activeChallenge) {
        // Count previous hints in history for progressive hinting
        const hintCount = history.filter(m => m.role === 'user' && m.content.toLowerCase().includes('hint')).length;
        
        if (hintCount === 0) {
           responseText = isYoung 
             ? "Hint 1: Think about what early humans needed most to survive every day."
             : "Hint 1: Consider the foundational needs of a developing community. Which resource is most scarce here?";
        } else if (hintCount === 1) {
           responseText = isYoung 
             ? "Hint 2: Look at the options again. One of them is a natural resource."
             : "Hint 2: Review the options carefully. Water and shelter were typically prioritized over advanced tools initially.";
        } else {
           responseText = "Final Hint: The answer is closely tied to establishing a permanent settlement. Focus on the most vital survival element.";
        }
        actions.push({ label: 'Return to Challenge', type: 'return_challenge' });
     } else {
        responseText = "You aren't in an active challenge right now! If you're unsure what to do, ask me 'What should I do next?'.";
     }
     return { text: responseText, actions };
  }

  // 2. Multi-turn Conversational logic (mocking open-ended)
  const isGreeting = ["hello", "hi", "namaste", "hey"].some(w => lowerQ.startsWith(w) || lowerQ === w);
  if (isGreeting) {
     return { text: "Namaste! I am KALA. How can I assist you on your journey today?", actions: [] };
  }

  const isClarification = ["what do you mean", "explain more", "simplify", "elaborate"].some(w => lowerQ.includes(w));
  if (isClarification && history.length > 0) {
     return { text: "Certainly! To put it simply: historians look at artifacts like tools and pottery to understand how ancient people lived, traded, and survived. Does that make more sense?", actions: [] };
  }

  // 3. Knowledge Base
  if (lowerQ.includes("dancing girl")) {
    responseText = "The Dancing Girl is a prehistoric bronze sculpture made in the 'lost-wax' casting technique around 2500 BCE in the Indus Valley. It shows their remarkable metallurgical skills!";
  } else if (lowerQ.includes("great bath")) {
    responseText = "The Great Bath at Mohenjo-daro is one of the earliest known public water tanks! It was likely used for religious purification. The brickwork was waterproofed using natural tar.";
  } else if (lowerQ.includes("ashoka") || lowerQ.includes("pillar")) {
    responseText = "Emperor Ashoka of the Mauryan Empire erected pillars across the subcontinent inscribed with edicts promoting 'Dhamma' (peace and tolerance). The Lion Capital of one such pillar is India's national emblem!";
  } else if (lowerQ.includes("nalanda")) {
    responseText = "Nalanda was a renowned ancient university in Magadha (modern-day Bihar), operating from 427 to 1197 CE. It attracted scholars from all over Asia to study philosophy, logic, and medicine.";
  } else if (lowerQ.includes("chola") || lowerQ.includes("nataraja")) {
    responseText = "The Nataraja is a depiction of Shiva as the cosmic dancer. Chola dynasty artisans perfected this using the lost-wax casting method in the 11th century.";
  } else if (lowerQ.includes("hampi") || lowerQ.includes("vijayanagara")) {
    responseText = "Hampi was the magnificent capital of the Vijayanagara Empire. In the 1500s, it was a major global center for trade and featured incredible architecture like the Stone Chariot.";
  } else if (lowerQ.includes("fire") || lowerQ.includes("invented")) {
    responseText = "Early humans discovered how to control fire over a million years ago! It provided warmth, protection from predators, and a way to cook food, which was crucial for human brain development.";
  } else if (lowerQ.includes("indus valley") || lowerQ.includes("harappan")) {
    responseText = "The Indus Valley Civilization (also known as Harappan) was known for its advanced urban planning, standardized weights, and complex drainage systems. They were remarkably peaceful and trade-focused!";
  } else {
    // 4. Open-ended / Everyday questions fallback
    responseText = "That's an interesting question! While my primary expertise is in history and civilization building, I can tell you that the principles of adaptation and innovation apply everywhere. Would you like to know more about the historical context of your current level, or do you have a specific artifact in mind?";
  }

  // Age adaptation for generic responses
  if (isYoung && responseText.length > 150) {
     responseText = responseText.split('.')[0] + ". It's really fascinating!";
  }

  return { text: responseText, actions };
};
