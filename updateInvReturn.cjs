const fs = require('fs');

let code = fs.readFileSync('src/pages/InvestigationDetail.jsx', 'utf8');

// Add useLocation
if(!code.includes('useLocation')) {
   code = code.replace("import { useParams, useNavigate } from 'react-router-dom';", "import { useParams, useNavigate, useLocation } from 'react-router-dom';");
}

// Add location hook
code = code.replace("const navigate = useNavigate();", "const navigate = useNavigate();\n  const location = useLocation();\n  const returnTo = new URLSearchParams(location.search).get('returnTo');");

// Update back buttons
code = code.replace(/navigate\('\/investigations'\)/g, "navigate(returnTo || '/investigations')");

fs.writeFileSync('src/pages/InvestigationDetail.jsx', code);
console.log("Updated InvestigationDetail to support returnTo!");
