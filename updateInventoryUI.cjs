const fs = require('fs');
let code = fs.readFileSync('src/pages/InventoryPage.jsx', 'utf8');

const origReturn = /        \{item\.isHistorical && \(\n          <span className="inline-block text-\[9px\] bg-gold\/10 text-gold px-1\.5 rounded uppercase tracking-wider mb-1 border border-gold\/20">\n            \{t\('inventory\.historical', 'Historical Reference'\)\}\n          <\/span>\n        \)\}\n      <\/div>\n    <\/div>\n  \);\n\};/;

const newReturn = `        {item.isHistorical && (
          <span className="inline-block text-[9px] bg-gold/10 text-gold px-1.5 rounded uppercase tracking-wider mb-2 border border-gold/20">
            {t('inventory.historical', 'Historical Reference')}
          </span>
        )}
        <div className="flex flex-col gap-1 mt-1 text-[10px] text-content/70">
          <p><strong className="text-content/90 opacity-70">Source:</strong> {item.source}</p>
          <p><strong className="text-content/90 opacity-70">Purpose:</strong> {item.purpose}</p>
        </div>
      </div>
    </div>
  );
};`;

code = code.replace(origReturn, newReturn);
fs.writeFileSync('src/pages/InventoryPage.jsx', code);
console.log("Updated InventoryPage UI!");
