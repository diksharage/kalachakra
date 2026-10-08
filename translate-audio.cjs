const fs = require('fs');

function translateKeys() {
  const hiPath = 'src/i18n/hi.js';
  const tePath = 'src/i18n/te.js';

  let hi = fs.readFileSync(hiPath, 'utf8');
  hi = hi.replace('sound_on: "Sound On"', 'sound_on: "ध्वनि चालू"');
  hi = hi.replace('sound_off: "Sound Off"', 'sound_off: "ध्वनि बंद"');
  fs.writeFileSync(hiPath, hi, 'utf8');

  let te = fs.readFileSync(tePath, 'utf8');
  te = te.replace('sound_on: "Sound On"', 'sound_on: "సౌండ్ ఆన్"');
  te = te.replace('sound_off: "Sound Off"', 'sound_off: "సౌండ్ ఆఫ్"');
  fs.writeFileSync(tePath, te, 'utf8');
}

translateKeys();
console.log('Translated audio keys successfully');
