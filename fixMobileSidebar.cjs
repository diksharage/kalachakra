const fs = require('fs');

// 1. Modify Sidebar.jsx
let sidebarCode = fs.readFileSync('src/components/layout/Sidebar.jsx', 'utf8');
sidebarCode = sidebarCode.replace(/const Sidebar = \(\) => \{/, 'const Sidebar = ({ isOpen, onClose }) => {\n  const { t } = useLanguage();');
sidebarCode = sidebarCode.replace(/<div className="w-64 h-screen bg-main border-r border-gold\/20 flex flex-col p-4">/, `
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm animate-fade-in" onClick={onClose} />}
      <div className={\`fixed md:static inset-y-0 left-0 z-50 w-64 h-screen bg-main border-r border-gold/20 flex flex-col p-4 transform transition-transform duration-300 \${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}\`}>`);
sidebarCode = sidebarCode.replace(/<nav className="flex-1 space-y-2">/, '<nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar pb-10">');
sidebarCode = sidebarCode.replace(/<item\.icon className="w-5 h-5" \/>\s*<span className="font-medium text-sm">\{item\.name\}<\/span>\s*<\/NavLink>/g, `<item.icon className="w-5 h-5" />\n            <span className="font-medium text-sm">{t('nav.' + item.name.toLowerCase().replace(/ /g, '_'), item.name)}</span>\n          </NavLink>`);
sidebarCode = sidebarCode.replace(/<\/nav>\s*<\/div>\s*\);\s*\};/g, '</nav>\n      </div>\n    </>\n  );\n};');
// Make sure X button for closing on mobile is available
sidebarCode = sidebarCode.replace(/<h1 className="text-xl font-serif font-bold gold-gradient-text tracking-wider">KALACHAKRA<\/h1>\s*<\/div>/, `<h1 className="text-xl font-serif font-bold gold-gradient-text tracking-wider">KALACHAKRA</h1>\n        <button onClick={onClose} className="md:hidden ml-auto p-1 hover:bg-surface rounded-lg"><X size={20}/></button>\n      </div>`);
// Ensure X is imported
if (!sidebarCode.includes('X } from')) {
    sidebarCode = sidebarCode.replace(/import { LayoutDashboard/, "import { X, LayoutDashboard");
}
if (!sidebarCode.includes('useLanguage')) {
    sidebarCode = sidebarCode.replace(/import \{ useGame \}/, "import { useGame } from '../../context/GameContext';\nimport { useLanguage } from '../../context/LanguageContext';");
}
sidebarCode = sidebarCode.replace(/onClick=\{logoutUser\}/, "onClick={() => { logoutUser(); onClose && onClose(); }}");
// also add onClick to NavLink
sidebarCode = sidebarCode.replace(/to=\{item\.path\}/g, "onClick={onClose} to={item.path}");

fs.writeFileSync('src/components/layout/Sidebar.jsx', sidebarCode);

// 2. Modify StatusBar.jsx
let statusBarCode = fs.readFileSync('src/components/layout/StatusBar.jsx', 'utf8');
statusBarCode = statusBarCode.replace(/const StatusBar = \(\) => \{/, 'const StatusBar = ({ onMenuToggle }) => {');
statusBarCode = statusBarCode.replace(/<div className="h-16 glass-panel border-b border-gold\/20 flex items-center justify-between px-6 sticky top-0 z-10">/, `<div className="h-16 glass-panel border-b border-gold/20 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">\n      <button className="md:hidden p-2 mr-2 text-content/70 hover:text-gold" onClick={onMenuToggle}>\n        <Menu size={24} />\n      </button>`);
if (!statusBarCode.includes('Menu } from')) {
    statusBarCode = statusBarCode.replace(/import { Heart/, "import { Menu, Heart");
}
fs.writeFileSync('src/components/layout/StatusBar.jsx', statusBarCode);

// 3. Modify GameLayout.jsx
let layoutCode = fs.readFileSync('src/components/layout/GameLayout.jsx', 'utf8');
if (!layoutCode.includes('isMobileMenuOpen')) {
    layoutCode = layoutCode.replace(/const \[isSearchOpen, setIsSearchOpen\] = React\.useState\(false\);/, "const [isSearchOpen, setIsSearchOpen] = React.useState(false);\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);");
    layoutCode = layoutCode.replace(/<Sidebar \/>/, "<Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />");
    layoutCode = layoutCode.replace(/<StatusBar \/>/, "<StatusBar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />");
}
fs.writeFileSync('src/components/layout/GameLayout.jsx', layoutCode);

console.log("Mobile responsiveness fixed for Sidebar!");
