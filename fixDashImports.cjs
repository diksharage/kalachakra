const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/DashboardWidgets.jsx', 'utf8');

code = code.replace(
  "import { \n  Map, BookOpen, Compass, Search, Trophy, Hammer, Star, ChevronRight, Activity, Zap\n} from 'lucide-react';",
  "import { \n  Map, BookOpen, Compass, Search, Trophy, Hammer, Star, ChevronRight, Activity, Zap, CheckCircle, Lock, MapPin\n} from 'lucide-react';"
);

fs.writeFileSync('src/components/dashboard/DashboardWidgets.jsx', code);
console.log("Fixed lucide-react imports!");
