const fs = require('fs');
let code = fs.readFileSync('src/pages/JourneyPage.jsx', 'utf8');

code = code.replace(/Revisit'\) : t\('common.continue', 'Enter Region'\)\} <span className="text-lg">[^<]*<\/span>/g, "Revisit') : t('common.continue', 'Enter Region')} <span className=\"text-lg\"><ArrowRight className=\"w-5 h-5 inline ml-1\" /></span>");

// Fix imports to include ArrowRight
if (!code.includes('ArrowRight')) {
  code = code.replace(/import \{ CheckCircle, Lock, Unlock \} from 'lucide-react';/g, "import { CheckCircle, Lock, Unlock, ArrowRight } from 'lucide-react';");
}

fs.writeFileSync('src/pages/JourneyPage.jsx', code);
console.log("Fixed garbled text in JourneyPage!");
