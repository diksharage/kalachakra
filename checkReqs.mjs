import fs from 'fs';
import path from 'path';

// A simple script to parse the files statically using regex since we can't easily run the ES modules without vite-node
const dataDir = './src/data';
const configsContent = fs.readFileSync(path.join(dataDir, 'civilizationBuilder.js'), 'utf8');

// We will just read civilizationBuilder.js and extract requirements for 1, 3, 6, 10, 13
const levels = [1, 3, 6, 10, 13];

levels.forEach(l => {
  const regex = new RegExp(`\\s*${l}:\\s*\\{[\\s\\S]*?buildings:\\s*\\[([\\s\\S]*?)\\]\\n\\s*\\},`, 'm');
  const match = configsContent.match(regex);
  if (match) {
    console.log(`=== LEVEL ${l} BUILDER ===`);
    const reqMatch = match[1].matchAll(/requirements:\s*\{([^}]+)\}/g);
    for (const r of reqMatch) {
      console.log(`  Reqs: ${r[1]}`);
    }
  }
});
