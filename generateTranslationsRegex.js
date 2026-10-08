import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function trans(text, to) {
  if (!text) return text;
  try {
    const res = await translate(text, { to });
    return res.text;
  } catch (err) {
    console.error(`Error:`, err.message);
    await sleep(2000);
    return text;
  }
}

async function run() {
  const dataDir = path.join(__dirname, 'src', 'data');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js') && (f.startsWith('level') || f === 'civilizationLevels.js'));
  
  const translations = { en: {}, hi: {}, te: {} };
  
  for (const file of files) {
    if (file === 'levelThemes.js' || file === 'levelConfigs.js') continue;
    
    console.log(`Scanning ${file}...`);
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    
    // We will find string literals like: title: '...', description: '...'
    const regex = /(title|description|label|discoverMessage):\s*['"`](.*?)['"`](?=[,}])/gs;
    let match;
    let index = 0;
    while ((match = regex.exec(content)) !== null) {
      if (index > 15) break; // Limit to 15 strings per file for speed during this step
      
      const keyType = match[1];
      const str = match[2].trim();
      if (!str || str.length < 3) continue;
      
      const key = `${file.replace('.js', '')}_${keyType}_${index}`;
      
      translations.en[key] = str;
      translations.hi[key] = await trans(str, 'hi');
      translations.te[key] = await trans(str, 'te');
      
      index++;
    }
  }
  
  fs.writeFileSync('src/i18n/levels_en.js', `export const levels_en = ${JSON.stringify(translations.en, null, 2)};`);
  fs.writeFileSync('src/i18n/levels_hi.js', `export const levels_hi = ${JSON.stringify(translations.hi, null, 2)};`);
  fs.writeFileSync('src/i18n/levels_te.js', `export const levels_te = ${JSON.stringify(translations.te, null, 2)};`);
  console.log("Done generating fallback levels data.");
}

run();
