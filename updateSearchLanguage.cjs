const fs = require('fs');
let code = fs.readFileSync('src/components/layout/GlobalSearch.jsx', 'utf8');

const oldEffect = `  useEffect(() => {
    if (isOpen) {
      setIndex(buildSearchIndex(t, gameState));
      inputRef.current?.focus();
    }
  }, [isOpen, t, gameState]);`;

const newEffect = `  const { language } = useLanguage();
  useEffect(() => {
    if (isOpen) {
      setIndex(buildSearchIndex(t, gameState, language));
      inputRef.current?.focus();
    }
  }, [isOpen, t, gameState, language]);`;

code = code.replace(oldEffect, newEffect);

fs.writeFileSync('src/components/layout/GlobalSearch.jsx', code);
console.log("Updated GlobalSearch effect for languages!");
