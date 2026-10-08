import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("Starting translation script...");
  
  // We'll just translate a small test string to ensure the API works without blocking.
  try {
    const res = await translate('Hello world', { to: 'hi' });
    console.log("Test translation to Hindi:", res.text);
  } catch (err) {
    console.error("Translation API failed:", err.message);
  }
}

main();
