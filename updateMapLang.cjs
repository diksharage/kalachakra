const fs = require('fs');
let code = fs.readFileSync('src/i18n/en.js', 'utf8');

code = code.replace(
  '        hampi_vijayanagara: "Hampi / Vijayanagara"\n      }\n    },',
  \`        hampi_vijayanagara: "Hampi / Vijayanagara",
        nalanda: "Nalanda",
        rakhigarhi: "Rakhigarhi",
        ellora: "Ellora Caves",
        madurai: "Madurai",
        konark: "Konark",
        bodh_gaya: "Bodh Gaya"
      }
    },\`
);

fs.writeFileSync('src/i18n/en.js', code);
console.log("Updated en.js with new map locations!");
