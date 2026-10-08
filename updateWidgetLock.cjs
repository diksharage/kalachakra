const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/DashboardWidgets.jsx', 'utf8');

const oldStr = /\{t\(`levels\.\$\{level\}\.title`, `Level \$\{level\}`\)\}\n\s*<\/div>\n\s*<\/div>\n\s*\);\n\s*\}\)\}/;

const newStr = `{t(\`levels.\${level}.title\`, \`Level \${level}\`)}
                </div>
                {isLocked && (
                  <div className="mt-auto pt-2 text-[9px] text-content/50 leading-tight uppercase font-bold">
                    Complete Level {level - 1} to unlock Level {level}.
                  </div>
                )}
              </div>
            );
          })}`;

code = code.replace(oldStr, newStr);

// Also remove generic 'Level X' if there is an actual theme name available so it looks better
// I'll keep the translation key but provide lTheme.name as fallback.
const titleOrig = /\{t\(`levels\.\$\{level\}\.title`, `Level \$\{level\}`\)\}/;
const titleNew = `{t(\`levels.\${level}.title\`, lTheme.name)}`;
code = code.replace(titleOrig, titleNew);

fs.writeFileSync('src/components/dashboard/DashboardWidgets.jsx', code);
console.log("Updated JourneyProgressCard locked explanation!");
