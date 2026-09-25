export const calculateAgeGroup = (age) => {
  const numAge = parseInt(age, 10);
  if (isNaN(numAge) || numAge < 6) return '6-8'; // Defaulting youngest to 6-8 for safety
  
  if (numAge >= 6 && numAge <= 8) return '6-8';
  if (numAge >= 9 && numAge <= 11) return '9-11';
  if (numAge >= 12 && numAge <= 14) return '12-14';
  if (numAge >= 15 && numAge <= 17) return '15-17';
  if (numAge >= 18) return '18+';
  
  return '18+';
};

// Helper to return adaptive text based on age group
export const getAdaptiveText = (ageGroup, options) => {
  if (options[ageGroup]) return options[ageGroup];
  
  // Fallbacks if specific group text isn't provided
  if (ageGroup === '6-8' || ageGroup === '9-11') return options['young'] || options['default'];
  if (ageGroup === '12-14' || ageGroup === '15-17') return options['teen'] || options['default'];
  
  return options['default'] || options['18+'] || "";
};
