const fs = require('fs');

function fixFile(filePath, isProfile) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (isProfile) {
    // In ProfilePage.jsx, it's inside <option value="hi">...
    content = content.replace(/<option value="hi">.*?<\/option>/g, '<option value="hi">हिन्दी</option>');
    content = content.replace(/<option value="te">.*?<\/option>/g, '<option value="te">తెలుగు</option>');
  } else {
    // LanguageSelectionScreen.jsx
    const marker = '<span className="text-xl font-bold text-content group-hover:text-gold transition-colors">';
    const parts = content.split(marker);
    if (parts.length === 4) {
      parts[1] = 'English</span>' + parts[1].substring(parts[1].indexOf('</span>') + 7);
      parts[2] = 'हिन्दी</span>' + parts[2].substring(parts[2].indexOf('</span>') + 7);
      parts[3] = 'తెలుగు</span>' + parts[3].substring(parts[3].indexOf('</span>') + 7);
      content = parts.join(marker);
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
}

fixFile('src/components/LanguageSelectionScreen.jsx', false);
fixFile('src/pages/ProfilePage.jsx', true);
fixFile('src/pages/LandingPage.jsx', true); // same <option> structure if it has one

console.log('Fixed JSX files');
