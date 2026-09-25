// Dynamic age adaptation logic to intercept and adapt static strings at runtime.
// This fulfills the requirement to adapt vocabulary, length, and complexity across all stages,
// without destroying the original historical facts or breaking the save system.

export const adaptTextForAge = (text, ageGroup) => {
  if (!text) return "";
  
  const isYoung = ageGroup === '6-8' || ageGroup === '9-11';
  const isTeen = ageGroup === '12-14' || ageGroup === '15-17';
  const isAdult = ageGroup === '18+';

  if (isYoung) {
    // 1. Shorter Explanation Length: Keep only the first one or two sentences.
    // Supports English punctuation and Devanagari Danda (।) for Hindi/Telugu safety.
    const sentences = text.match(/[^.!?।]+[.!?।]+/g) || [text];
    let simplified = sentences.slice(0, 1).join(' ').trim();
    
    // Fallback if the first sentence is too short.
    if (simplified.length < 30 && sentences.length > 1) {
       simplified += " " + sentences[1].trim();
    }

    // 2. Vocabulary Adaptation: Replace complex terms with simpler, clearer alternatives.
    // (Only affects English translations natively, preventing broken I18n strings).
    simplified = simplified
      .replace(/fundamental|crucial|essential/gi, 'very important')
      .replace(/agriculture|cultivation/gi, 'farming')
      .replace(/subsistence/gi, 'survival')
      .replace(/monumental|massive/gi, 'huge')
      .replace(/utilizing/gi, 'using')
      .replace(/complex|intricate/gi, 'detailed')
      .replace(/sophisticated/gi, 'advanced')
      .replace(/urbanization/gi, 'building cities')
      .replace(/metallurgy/gi, 'metalworking')
      .replace(/maritime/gi, 'sea')
      .replace(/domesticated/gi, 'tamed')
      .replace(/ecological niche/gi, 'natural home')
      .replace(/geological/gi, 'rock')
      .replace(/hydrological/gi, 'water')
      .replace(/hominids/gi, 'early humans')
      .replace(/sedentary communities/gi, 'settled villages')
      .replace(/paleolithic/gi, 'Stone Age')
      .replace(/lithic materials/gi, 'stone tools')
      .replace(/flora\/fauna/gi, 'plants and animals')
      .replace(/thermal regulation/gi, 'staying warm')
      .replace(/zooarchaeological evidence/gi, 'bone discoveries');
      
    return simplified;
  }

  if (isTeen) {
    // Teens get the standard historical text.
    return text;
  }

  if (isAdult) {
    // 3. Challenge Complexity/Detailed Explanations:
    // Append thought-provoking historical nuance for adults if it's an explanation.
    let enhanced = text;
    // We can add subtle analytical hooks if it's an explanation string (typically ending in a period and longer)
    if (text.length > 80 && (text.endsWith('.') || text.endsWith('।'))) {
        if (text.includes("agriculture") || text.includes("farming")) {
            enhanced += " This shift fundamentally reorganized social hierarchies and property rights.";
        } else if (text.includes("trade") || text.includes("maritime")) {
            enhanced += " These economic networks were vital for cross-cultural knowledge exchange.";
        } else if (text.includes("temple") || text.includes("architecture")) {
            enhanced += " Such structures also served as major economic redistribution centers.";
        } else if (text.includes("water") || text.includes("river")) {
            enhanced += " Hydrological engineering was the backbone of state power in antiquity.";
        } else if (text.includes("pottery") || text.includes("clay")) {
            enhanced += " The ceramic sequence remains our primary diagnostic tool for dating these strata.";
        }
    }
    return enhanced;
  }

  return text;
};

// Also adapt the complexity of the MCQs dynamically
export const adaptQuestionForAge = (question, ageGroup) => {
    if (!question) return "";
    const isYoung = ageGroup === '6-8' || ageGroup === '9-11';
    const isAdult = ageGroup === '18+';
    
    if (isYoung) {
        let q = question.replace(/Which of the following/gi, 'What');
        q = q.replace(/primary function/gi, 'main use');
        q = q.replace(/significance of/gi, 'reason for');
        q = q.replace(/characteristics/gi, 'features');
        return q;
    }
    if (isAdult) {
        let q = question.replace(/What was the main reason/gi, 'What was the primary socioeconomic driver');
        q = q.replace(/Where is the best place/gi, 'Which ecological niche was optimal');
        q = q.replace(/Why did/gi, 'What systemic factors catalyzed');
        return q;
    }
    return question;
};
