import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function trans(text, to) {
  if (!text) return "";
  try {
    const res = await translate(text, { to });
    return res.text;
  } catch (err) {
    console.error(`Translation error for "${String(text).substring(0, 20)}..." to ${to}:`, err.message);
    await sleep(2000);
    return text;
  }
}

async function generateTranslations() {
  const moduleUrl = pathToFileURL(path.join(__dirname, 'src/data/levelConfigs.js')).href;
  const dataModule = await import(moduleUrl);
  const configs = dataModule.levelConfigs;
  
  const levelsData = {};
  
  for (let i = 1; i <= 14; i++) {
    console.log(`Processing Level ${i}...`);
    const config = configs[i];
    if (!config) {
      console.log(`Skipping Level ${i} (not found in levelConfigs)`);
      continue;
    }
    
    const enLevel = {};
    const hiLevel = {};
    const teLevel = {};
    
    const shouldTranslate = [1, 3, 5, 7, 9, 13, 14].includes(i);
    
    for (let s = 0; s < config.stages.length; s++) {
      const stage = config.stages[s];
      
      enLevel[`stage${s+1}`] = {
        title: stage.title,
        description: stage.description,
        locations: {}
      };
      
      hiLevel[`stage${s+1}`] = {
        title: shouldTranslate ? await trans(stage.title, 'hi') : stage.title,
        description: shouldTranslate ? await trans(stage.description, 'hi') : stage.description,
        locations: {}
      };
      
      teLevel[`stage${s+1}`] = {
        title: shouldTranslate ? await trans(stage.title, 'te') : stage.title,
        description: shouldTranslate ? await trans(stage.description, 'te') : stage.description,
        locations: {}
      };
      
      if (stage.locations) {
        for (const loc of stage.locations) {
          enLevel[`stage${s+1}`].locations[`loc_${loc.id}`] = {
            title: loc.title || loc.label,
            description: loc.description,
            discoverMessage: loc.discoverMessage
          };
          
          hiLevel[`stage${s+1}`].locations[`loc_${loc.id}`] = {
            title: shouldTranslate ? await trans(loc.title || loc.label, 'hi') : (loc.title || loc.label),
            description: shouldTranslate ? await trans(loc.description, 'hi') : loc.description,
            discoverMessage: shouldTranslate ? await trans(loc.discoverMessage, 'hi') : loc.discoverMessage
          };
          
          teLevel[`stage${s+1}`].locations[`loc_${loc.id}`] = {
            title: shouldTranslate ? await trans(loc.title || loc.label, 'te') : (loc.title || loc.label),
            description: shouldTranslate ? await trans(loc.description, 'te') : loc.description,
            discoverMessage: shouldTranslate ? await trans(loc.discoverMessage, 'te') : loc.discoverMessage
          };
        }
      }
    }
    
    levelsData[i] = { en: enLevel, hi: hiLevel, te: teLevel };
    console.log(`Completed Level ${i}`);
  }
  
  fs.writeFileSync('levelsTranslation.json', JSON.stringify(levelsData, null, 2));
  console.log('Saved to levelsTranslation.json');
}

generateTranslations();
