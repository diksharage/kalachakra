const fs = require('fs');
let content = fs.readFileSync('src/components/tutorial/TutorialOverlay.jsx', 'utf8');

const oldPlacementLogic = `  // Determine modal placement based on target
  let modalStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  
  if (targetRect && Number.isFinite(targetRect.bottom) && Number.isFinite(targetRect.right) && Number.isFinite(targetRect.left) && Number.isFinite(targetRect.top)) {
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;
    
    // Default logic: put it below if there's space, else above
    if (step.placement === 'bottom' || (spaceBelow > 300 && step.placement !== 'top')) {
      modalStyle = { top: targetRect.bottom + 16, left: Math.max(16, targetRect.left - 100) };
    } else if (step.placement === 'top' || spaceAbove > 300) {
      modalStyle = { bottom: window.innerHeight - targetRect.top + 16, left: Math.max(16, targetRect.left - 100) };
    } else if (step.placement === 'right') {
      modalStyle = { top: targetRect.top, left: targetRect.right + 16 };
    }
  }`;

const newPlacementLogic = `  // Determine modal placement safely inside viewport
  let modalStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  
  if (targetRect && Number.isFinite(targetRect.bottom) && Number.isFinite(targetRect.right) && Number.isFinite(targetRect.left) && Number.isFinite(targetRect.top)) {
    const isMobile = window.innerWidth < 420;
    const assumedCardWidth = isMobile ? window.innerWidth - 32 : 384; // max-w-sm is 384px
    
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;
    const spaceRight = window.innerWidth - targetRect.right;
    
    let actualPlacement = step.placement || 'bottom';
    
    // Re-route placement if no space
    if (actualPlacement === 'right' && spaceRight < assumedCardWidth + 24) {
      actualPlacement = spaceBelow > 250 ? 'bottom' : (spaceAbove > 250 ? 'top' : 'center');
    }
    
    // Calculate raw Left position
    let rawLeft = targetRect.left + (targetRect.width / 2) - (assumedCardWidth / 2); // default center on target
    if (actualPlacement === 'right') rawLeft = targetRect.right + 16;
    
    // Clamp Left safely so it NEVER exceeds viewport
    const maxSafeLeft = Math.max(16, window.innerWidth - assumedCardWidth - 16);
    const clampedLeft = Math.min(Math.max(16, rawLeft), maxSafeLeft);

    if (actualPlacement === 'bottom') {
      modalStyle = { top: targetRect.bottom + 16, left: clampedLeft };
    } else if (actualPlacement === 'top') {
      modalStyle = { bottom: window.innerHeight - targetRect.top + 16, left: clampedLeft };
    } else if (actualPlacement === 'right') {
      modalStyle = { top: Math.max(16, targetRect.top), left: clampedLeft };
    } else {
      modalStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  }`;

content = content.replace(oldPlacementLogic, newPlacementLogic);

const oldDiv = `className={\`absolute max-w-sm w-full p-6 rounded-2xl shadow-2xl border \${theme === 'light' ? 'bg-surface text-content border-content/10' : 'bg-main text-content border-gold/20'} \${hasReducedMotion ? '' : 'transition-all duration-300'}\`}`;
const newDiv = `className={\`absolute flex flex-col max-h-[85vh] overflow-y-auto max-w-sm w-full p-6 rounded-2xl shadow-2xl border \${theme === 'light' ? 'bg-[#F4E8D1] text-[#211A15] border-[#A8794F]/30' : 'bg-[#121714] text-[#E8D9B8] border-[#A8794F]/40'} \${hasReducedMotion ? '' : 'transition-all duration-200'}\`}`;
content = content.replace(oldDiv, newDiv);

// Fix flex gap for footer
const oldFooter = `<div className="flex items-center justify-between">`;
const newFooter = `<div className="flex items-center justify-between mt-auto pt-4 border-t border-[#A8794F]/20 shrink-0 w-full">`;
content = content.replace(oldFooter, newFooter);

// Fix desc container scrolling
const oldDesc = `        <p className="text-sm opacity-80 leading-relaxed mb-6">`;
const newDesc = `        <p className="text-sm opacity-80 leading-relaxed mb-6 shrink-0">`;
content = content.replace(oldDesc, newDesc);

fs.writeFileSync('src/components/tutorial/TutorialOverlay.jsx', content, 'utf8');
console.log('Done replacement');
