const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Add import
content = content.replace(
  "import BackButton from '../common/BackButton';",
  "import BackButton from '../common/BackButton';\nimport KalaCompanion from './KalaCompanion';"
);

// Inject component right before the closing tag of LevelEngine
content = content.replace(
  "    </div>\n  );\n};\n\nconst ArtifactDiscoverer",
  `      {/* Persistent KALA Companion */}
      <KalaCompanion stage={stage} levelId={config.id} inventory={levelState.resources} activeChallenge={levelState.activePopup?.type === 'challenge' ? levelState.activePopup.data : null} ageGroup={ageGroup} />
    </div>
  );
};

const ArtifactDiscoverer`
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
