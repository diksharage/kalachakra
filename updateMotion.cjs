const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

if (!css.includes('prefers-reduced-motion')) {
    css += `\n
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-delay: -1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    background-attachment: initial !important;
    scroll-behavior: auto !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
}
`;
    fs.writeFileSync('src/index.css', css);
    console.log("Added prefers-reduced-motion to index.css");
}
