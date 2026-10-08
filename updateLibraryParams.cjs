const fs = require('fs');
let code = fs.readFileSync('src/pages/LibraryPage.jsx', 'utf8');

if (!code.includes('useSearchParams')) {
  code = code.replace(/import \{ useNavigate \} from 'react-router-dom';/, "import { useNavigate, useSearchParams } from 'react-router-dom';");
  if (!code.includes('useSearchParams')) {
    code = code.replace(/import BackButton from '\.\.\/components\/common\/BackButton';/, "import BackButton from '../components/common/BackButton';\nimport { useSearchParams } from 'react-router-dom';");
  }

  const stateBlock = `  const [activeCertainty, setActiveCertainty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedEntry, setSelectedEntry] = useState(null);`;

  const newBlock = `  const [activeCertainty, setActiveCertainty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [searchParams, setSearchParams] = useSearchParams();
  const initialItemId = searchParams.get('item');
  
  const [selectedEntry, setSelectedEntry] = useState(() => {
    if (initialItemId) {
      const found = heritageLibrary.find(e => e.id === initialItemId);
      return found || null;
    }
    return null;
  });

  // Clear query param when modal is closed
  const handleCloseModal = () => {
    setSelectedEntry(null);
    if (searchParams.has('item')) {
      setSearchParams({});
    }
  };`;

  code = code.replace(stateBlock, newBlock);
  
  code = code.replace(/onClose=\{() => setSelectedEntry\(null\)\}/, "onClose={handleCloseModal}");

  fs.writeFileSync('src/pages/LibraryPage.jsx', code);
  console.log("Added query parameter support to LibraryPage!");
} else {
  console.log("Already has searchParams.");
}
