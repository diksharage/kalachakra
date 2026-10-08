const fs = require('fs');

let code = fs.readFileSync('src/data/civilizationBuilder.js', 'utf8');

// Level 5 requirements fix (Yields: food, population, tradeGoods, materials, currency)
code = code.replace(/requirements: \{ tools: 1, wood: 1 \}, \/\/ maha_farm/, 'requirements: { materials: 1, population: 1 },');
code = code.replace(/requirements: \{ wood: 3, tools: 1 \}, \/\/ maha_fort/, 'requirements: { materials: 2, food: 1 },');
code = code.replace(/requirements: \{ wealth: 2, tools: 1 \}, \/\/ maha_guild/, 'requirements: { currency: 1, tradeGoods: 1 },');

// Need to match exactly based on the previous injection
code = code.replace(/id: "maha_farm",[\s\S]*?requirements: \{.*?\}/, 'id: "maha_farm",\n        category: "Agriculture",\n        nameKey: "Iron Plow Farm",\n        descKey: "Utilize iron tools for deep plowing.",\n        requirements: { materials: 1, population: 1 }');
code = code.replace(/id: "maha_fort",[\s\S]*?requirements: \{.*?\}/, 'id: "maha_fort",\n        category: "Military",\n        nameKey: "Palisade Fort",\n        descKey: "Defend the capital with a timber wall.",\n        requirements: { materials: 2, food: 1 }');
code = code.replace(/id: "maha_guild",[\s\S]*?requirements: \{.*?\}/, 'id: "maha_guild",\n        category: "Administration",\n        nameKey: "Merchant Guild (Shreni)",\n        descKey: "Organize artisans and merchants.",\n        requirements: { currency: 1, tradeGoods: 1 }');

// Level 10 requirements fix (Yields: food, culture, tradeGoods, maybe materials)
code = code.replace(/id: "chola_tank",[\s\S]*?requirements: \{.*?\}/, 'id: "chola_tank",\n        category: "Water",\n        nameKey: "Eri (Irrigation Tank)",\n        descKey: "Vast local reservoir managed by village assemblies.",\n        requirements: { food: 1 }');
code = code.replace(/id: "chola_temple",[\s\S]*?requirements: \{.*?\}/, 'id: "chola_temple",\n        category: "Temple",\n        nameKey: "Brihadeeswara Foundation",\n        descKey: "A massive center of redistribution, art, and worship.",\n        requirements: { culture: 2, food: 1 }');
code = code.replace(/id: "chola_guild",[\s\S]*?requirements: \{.*?\}/, 'id: "chola_guild",\n        category: "Trade",\n        nameKey: "Ayyavole Guild Hall",\n        descKey: "Headquarters for international merchant networks.",\n        requirements: { tradeGoods: 2 }');
code = code.replace(/id: "chola_navy",[\s\S]*?requirements: \{.*?\}/, 'id: "chola_navy",\n        category: "Navy",\n        nameKey: "Naval Shipyard",\n        descKey: "Construct ships for Southeast Asian expeditions.",\n        requirements: { tradeGoods: 1, culture: 1 }');

fs.writeFileSync('src/data/civilizationBuilder.js', code);
console.log("Fixed Builder Requirements for 5 and 10!");
