const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

code = code.replace(
    "{t(data.descKey) || data.descKey}",
    "{adaptTextForAge(t(data.descKey) || data.descKey, ageGroup)}"
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected builder adaptation!");
