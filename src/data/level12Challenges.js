export const level12Challenges = {
  mg_l12_story: {
    "id": "mg-l12-story",
    "title": "Mini-Game: The Monkey and The Crocodile",
    "format": "minigame",
    "explanation": "You successfully completed the mini-game scenario!"
},
  oral_puzzle: {
    id: "story-oral-01",
    title: "Oral Traditions & Storytelling",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "When a story is told by speaking instead of writing, what usually happens as it is passed from person to person?";
        case '9-11': return "What happens to a story as it is transmitted orally across different villages over many years?";
        case '12-14': return "Which statement best describes the nature of oral storytelling traditions over time?";
        case '15-17': return "In the context of oral transmission, how do historians and literary scholars view the variation of narratives over time?";
        case '18+': return "When analyzing oral traditions versus codified texts, what is the primary historiographical understanding of narrative variation?";
        default: return "What happens to oral stories?";
      }
    },
    options: [
      { id: 'static', label: 'They remain exactly the same, word-for-word, forever', icon: '🔒', isCorrect: false },
      { id: 'variation', label: 'They undergo variation and adaptation, changing details while often retaining core themes', icon: '🗣️', isCorrect: true },
      { id: 'lost', label: 'They are completely forgotten after one day', icon: '🤷', isCorrect: false }
    ],
    explanation: "Oral traditions are living entities. As they are passed down, storytellers adapt them to fit local cultures, audiences, and languages, leading to many vibrant variations of the same core story."
  },
  epic_puzzle: {
    id: "story-epic-01",
    title: "Epics, Literature & Poetry",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Are magical fables and traditional epics exactly the same as a modern history book?";
        case '9-11': return "How do historians treat traditional epics differently than direct historical records?";
        case '12-14': return "Why is it important to distinguish between a literary tradition (like an epic) and a verified historical event?";
        case '15-17': return "When utilizing epics as historical sources, what is the critical distinction a historian must make?";
        case '18+': return "In historiography, what is the methodological distinction between analyzing a traditional epic and a contemporary documentary source?";
        default: return "How do we treat epics?";
      }
    },
    options: [
      { id: 'literal', label: 'Every single magical event is treated as literal, verified historical fact', icon: '📖', isCorrect: false },
      { id: 'literary', label: 'Epics are studied as profound cultural and literary traditions, not strictly as literal historical chronicles', icon: '🏛️', isCorrect: true },
      { id: 'ignore', label: 'Historians completely ignore epics because they contain poetry', icon: '🚫', isCorrect: false }
    ],
    explanation: "Traditional epics and literature reveal immense amounts of information about the culture, values, geography, and society of the time, but they belong to literary and mythological traditions rather than literal historical chronicles."
  },
  script_puzzle: {
    id: "story-script-01",
    title: "Languages, Scripts & Manuscripts",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Are a 'Language' (the words you say) and a 'Script' (the letters you draw) the exact same thing?";
        case '9-11': return "Can the exact same language be written using different scripts (alphabets)?";
        case '12-14': return "What is the historical relationship between a language (like Sanskrit) and the scripts used to write it?";
        case '15-17': return "When examining manuscript traditions across South Asia, what becomes evident about the relationship between language and script?";
        case '18+': return "In paleographic and linguistic studies of South Asian manuscripts, what is the foundational principle regarding language and script?";
        default: return "What is the difference between language and script?";
      }
    },
    options: [
      { id: 'separate', label: 'Language is spoken, script is written. One language can be written in many different scripts.', icon: '✍️', isCorrect: true },
      { id: 'same', label: 'They are identical. A language can only ever be written in one specific script.', icon: '🔒', isCorrect: false },
      { id: 'none', label: 'Scripts were only invented in the last 100 years', icon: '📆', isCorrect: false }
    ],
    explanation: "A language (like Sanskrit) does not have one exclusive script. Historically, it was written in Brahmi, Sharada, Devanagari, Grantha, and many other regional scripts depending on where the manuscript was copied."
  },
  theatre_puzzle: {
    id: "story-theatre-01",
    title: "Theatre, Puppetry & Performance",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "When a story is told through shadow puppets or dance, do they only use words?";
        case '9-11': return "How do traditional performing arts like Kutiyattam or shadow puppetry tell stories?";
        case '12-14': return "What role do gesture, costume, and music play in traditional performance storytelling?";
        case '15-17': return "In traditional South Asian performance arts, how is narrative conveyed beyond the spoken or sung text?";
        case '18+': return "In performance traditions (e.g., Kutiyattam, Yakshagana), what constitutes the semiotic framework for narrative transmission beyond the libretto?";
        default: return "How do performances tell stories?";
      }
    },
    options: [
      { id: 'words', label: 'They rely entirely on reading from a book while standing perfectly still', icon: '📖', isCorrect: false },
      { id: 'multi', label: 'They use a complex system of music, highly stylized gestures (mudras), costumes, and movement', icon: '🎭', isCorrect: true },
      { id: 'none', label: 'They do not tell stories, they only do gymnastics', icon: '🤸', isCorrect: false }
    ],
    explanation: "Performances are multi-sensory. Traditions utilize elaborate costumes, dynamic lighting, complex rhythms, and specific hand gestures (mudras) to convey deep narrative meaning alongside or even without words."
  },
  visual_puzzle: {
    id: "story-visual-01",
    title: "Folk Arts & Visual Storytelling",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Why do folk artists paint stories on walls, scrolls, or cloth?";
        case '9-11': return "What is the primary purpose of narrative folk art like Pattachitra or Phad?";
        case '12-14': return "How do visual storytelling traditions function within local communities?";
        case '15-17': return "What role do visual narrative traditions (like scroll paintings) play in community memory and oral performance?";
        case '18+': return "Within the socio-cultural matrix, what function do vernacular visual narrative traditions (e.g., scroll paintings) primarily serve?";
        default: return "Why do we paint stories?";
      }
    },
    options: [
      { id: 'hide', label: 'To hide secrets so no one can ever read them', icon: '🤫', isCorrect: false },
      { id: 'memory', label: 'They act as visual libraries, preserving community memory, rituals, and serving as aids for oral performers', icon: '🎨', isCorrect: true },
      { id: 'sell', label: 'They were originally created entirely to sell in modern tourist shops', icon: '🛍️', isCorrect: false }
    ],
    explanation: "Visual storytelling is deeply tied to community identity and oral performance. Traveling storytellers (like Chitrakars or Bhopas) often use these painted scrolls or panels as visual aids while they sing the narrative."
  },
  preserve_puzzle: {
    id: "story-preserve-01",
    title: "Preserve, Adapt & Pass It On",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "What is the best way to keep a dance or puppet show alive for a long time?";
        case '9-11': return "If you want to preserve a traditional folk art, why isn't taking a photograph enough?";
        case '12-14': return "When attempting to preserve intangible cultural heritage (like oral storytelling), what is the main limitation of digital recording?";
        case '15-17': return "What is the critical tradeoff between archival documentation and living preservation of intangible heritage?";
        case '18+': return "In the preservation of intangible cultural heritage (ICH), what is the recognized limitation of purely archival (digital/textual) documentation strategies?";
        default: return "How do we preserve living traditions?";
      }
    },
    options: [
      { id: 'digital', label: 'Archiving documents the past perfectly, but it does not ensure the living tradition continues to be practiced and adapted by people', icon: '🏛️', isCorrect: true },
      { id: 'perfect', label: 'A digital recording is a perfect replacement and means the human artists are no longer needed', icon: '🤖', isCorrect: false },
      { id: 'ban', label: 'The only way to preserve it is to ban anyone from ever performing it again', icon: '🚫', isCorrect: false }
    ],
    explanation: "Cultural traditions are living practices. While digital archives are excellent for historical documentation, true preservation requires supporting the human communities who teach, perform, and adapt the art over time."
  }
};
