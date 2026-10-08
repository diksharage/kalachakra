const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Sidebar.jsx', 'utf8');

// Rename Explore to Heritage Map
content = content.replace(
  "{ name: 'Explore', path: '/explore', icon: Compass },",
  "{ name: 'Heritage Map', path: '/explore', icon: Compass },"
);

fs.writeFileSync('src/components/layout/Sidebar.jsx', content);
