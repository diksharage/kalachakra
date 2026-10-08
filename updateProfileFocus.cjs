const fs = require('fs');
let code = fs.readFileSync('src/pages/ProfilePage.jsx', 'utf8');

code = code.replace(/<button([^>]+className=(["'{]))([^>"'}]+)(["'}])/g, (match, p1, p2, p3, p4) => {
    if (!p3.includes('focus:outline-none')) {
        return `<button${p1}${p3} focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-[#171B3A]${p4}`;
    }
    return match;
});

fs.writeFileSync('src/pages/ProfilePage.jsx', code);
console.log("Added focus rings to ProfilePage buttons");
