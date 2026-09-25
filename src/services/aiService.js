export const askHeritageGuide = async (question) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const lowerQ = question.toLowerCase();

  // Simple keyword matching for educational queries
  if (lowerQ.includes("dancing girl")) {
    return "The Dancing Girl is a prehistoric bronze sculpture made in the 'lost-wax' casting technique around 2500 BCE. It shows the remarkable metallurgical skills of the Indus Valley people. Even though it's called a dancing girl, we aren't certain she is actually dancing—her confident posture tells a story of a vibrant culture!";
  }
  
  if (lowerQ.includes("great bath")) {
    return "The Great Bath at Mohenjo-daro is one of the earliest known public water tanks in the ancient world! It was likely used for religious purification and ritual bathing. The brickwork was so advanced that it was made waterproof using a layer of natural tar called bitumen.";
  }

  if (lowerQ.includes("ashoka") || lowerQ.includes("pillar")) {
    return "Emperor Ashoka of the Mauryan Empire is famous for renouncing war after the devastating Kalinga conflict. He erected pillars across the subcontinent inscribed with edicts promoting 'Dhamma' (moral law, peace, and tolerance). The Lion Capital of one such pillar at Sarnath is now the national emblem of India!";
  }

  if (lowerQ.includes("nalanda")) {
    return "Nalanda was a renowned Mahavihara (large Buddhist monastery) in ancient Magadha (modern-day Bihar), operating from 427 to 1197 CE. It is considered one of the world's first residential universities, attracting scholars from Tibet, China, Korea, and Central Asia to study philosophy, logic, medicine, and mathematics.";
  }

  if (lowerQ.includes("nataraja") || lowerQ.includes("chola")) {
    return "The Nataraja is a depiction of the Hindu god Shiva as the cosmic dancer. The Chola dynasty artisans perfected this using the lost-wax casting method in the 11th century. The dance represents the continuous cycle of creation, preservation, and destruction of the universe.";
  }

  if (lowerQ.includes("hampi") || lowerQ.includes("vijayanagara")) {
    return "Hampi was the magnificent capital of the Vijayanagara Empire. In the 1500s, it was one of the largest and richest cities in the world! It was a major center for trade and featured incredible architecture, like the Vittala Temple with its iconic Stone Chariot.";
  }

  // Fallback response
  return "That's a fascinating question! India's history is incredibly diverse, stretching over millennia. From the urban planning of the Indus Valley to the philosophical depths of the Vedas, and the grand architecture of empires like the Cholas and Mauryans. Is there a specific era or artifact you'd like to dive into?";
};
