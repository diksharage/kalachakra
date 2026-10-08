const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

if (!css.includes('.hide-scrollbar')) {
    css += `\n
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
`;
    fs.writeFileSync('src/index.css', css);
    console.log("Added hide-scrollbar to index.css");
}
