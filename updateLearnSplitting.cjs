const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const oldLogic = `// Split into sentences for progressive learning
    const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
    const fact = sentences[0]?.trim() || fullText;
    const significance = sentences.slice(1).join(' ').trim() || (isYoung ? "It helped them progress." : "It played a key role in their civilization.");
  
    // Interaction type based on data string length
    const mode = sentences.length > 1 ? 'order' : 'reveal';`;

const newLogic = `// Split logic to ensure interactive ordering for ALL facts
    let fact = "";
    let significance = "";
    let mode = 'order';
    
    const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
    if (sentences.length > 1) {
      fact = sentences[0].trim();
      significance = sentences.slice(1).join(' ').trim();
    } else {
      // Split single sentence into two logical halves based on punctuation or length
      const single = sentences[0].trim();
      let splitIndex = single.indexOf(', ');
      if (splitIndex === -1 || splitIndex > single.length - 15) {
        // Find a space near the middle
        const words = single.split(' ');
        const mid = Math.floor(words.length / 2);
        fact = words.slice(0, mid).join(' ') + "...";
        significance = "..." + words.slice(mid).join(' ');
      } else {
        fact = single.substring(0, splitIndex) + "...";
        significance = "..." + single.substring(splitIndex + 2);
      }
    }`;

code = code.replace(oldLogic, newLogic);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated InteractiveLearnNode splitting logic!");
