const fs = require('fs');
let content = fs.readFileSync('src/components/tutorial/TutorialOverlay.jsx', 'utf8');

content = content.replace(
  'className="flex items-center justify-between mt-auto pt-4 border-t border-[#A8794F]/20 shrink-0 w-full"',
  'className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-[#A8794F]/20 shrink-0 w-full"'
);

// We must target the second div with className="flex gap-2" inside the footer
// The footer starts with the replaced class above.
const parts = content.split('className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-[#A8794F]/20 shrink-0 w-full"');
if (parts.length === 2) {
  parts[1] = parts[1].replace('className="flex gap-2"', 'className="flex flex-wrap gap-2 w-full sm:w-auto justify-end"');
  content = parts.join('className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-[#A8794F]/20 shrink-0 w-full"');
}

fs.writeFileSync('src/components/tutorial/TutorialOverlay.jsx', content, 'utf8');
