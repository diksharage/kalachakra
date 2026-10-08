const fs = require('fs');
let code = fs.readFileSync('src/data/civilizationBuilder.js', 'utf8');

// The file currently ends with `};` for the object, but misses the export function.
const exportFunc = `
export const getBuilderDataForLevel = (levelId) => {
  if (civilizationBuilderData[levelId]) {
    return civilizationBuilderData[levelId];
  }
  return {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [0, 5, 10, 15] },
    categories: ["Structures"],
    buildings: [
      {
        id: "generic_structure",
        category: "Structures",
        nameKey: "Structure",
        descKey: "A basic building.",
        requirements: { materials: 1 },
        effects: { progress: 1 },
        icon: "🏗️"
      }
    ]
  };
};
`;

if (!code.includes('export const getBuilderDataForLevel')) {
  code += '\n' + exportFunc;
  fs.writeFileSync('src/data/civilizationBuilder.js', code);
  console.log("Restored missing export function!");
} else {
  console.log("Function already exists.");
}
