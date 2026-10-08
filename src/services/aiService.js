import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const askHeritageGuide = async (question, context = {}, history = []) => {
  // Simulate network delay for natural feel if not hitting external API
  const lowerQ = question.toLowerCase();
  let responseText = "";
  let actions = [];

  const isYoung = context.ageGroup === '6-8' || context.ageGroup === '9-11';
  
  // 1. Game-Aware Assistance (Highest Priority)
  if (lowerQ.includes("what should i do") || lowerQ.includes("next") || lowerQ.includes("objective") || lowerQ.includes("stuck")) {
     await new Promise(resolve => setTimeout(resolve, 800));
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

  if (lowerQ.includes("hint") || lowerQ.includes("help me with this")) {
     await new Promise(resolve => setTimeout(resolve, 800));
     if (context.activeChallenge) {
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

  // 2. Multi-turn Conversational logic (Greetings)
  const isGreeting = ["hello", "hi", "namaste", "hey"].some(w => lowerQ.startsWith(w) || lowerQ === w);
  if (isGreeting) {
     await new Promise(resolve => setTimeout(resolve, 800));
     return { text: "Namaste! I am KALA. How can I assist you on your journey today?", actions: [] };
  }

  // 3. Fallback to Gemini AI for "Any Type of Question"
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const systemPrompt = `You are KALA, an AI Heritage Companion in a game called Kalachakra. 
The player is currently in Level ${context.levelId || 'unknown'}. 
Your goal is to answer their questions about Indian history, heritage, artifacts, or general knowledge accurately but concisely. 
Keep your tone encouraging, mystical yet educational. 
The player's age group is ${context.ageGroup || 'unknown'}. Adjust your language complexity accordingly.
Limit your response to 2-3 short paragraphs maximum so it fits nicely in a chat bubble.`;

      const chatHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: "I understand. I am KALA, ready to assist." }] },
          ...chatHistory.slice(-5) // Keep last 5 messages for context
        ],
      });

      const result = await chat.sendMessage(question);
      responseText = result.response.text();
      
      // Clean up markdown bolding for UI
      responseText = responseText.replace(/\*\*/g, '');
      
      return { text: responseText, actions };

    } catch (error) {
      console.error("Gemini AI Error:", error);
      return { 
        text: "I experienced a disturbance in the flow of time (AI Error). Please check your internet connection or API key.", 
        actions: [] 
      };
    }
  }

  // 4. No API Key Fallback
  await new Promise(resolve => setTimeout(resolve, 800));
  return { 
    text: "I would love to answer that! To unlock my full AI knowledge and allow me to answer any question accurately, please add a Gemini API Key to your `.env` file as `VITE_GEMINI_API_KEY`.", 
    actions: [] 
  };
};
