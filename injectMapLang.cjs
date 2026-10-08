const fs = require('fs');

const engMap = `
    // MAP REGIONS
    "map.region.Central India": "Central India",
    "map.region.Balochistan (Historical Region)": "Balochistan (Historical)",
    "map.region.Punjab Region": "Punjab Region",
    "map.region.Sindh Region": "Sindh Region",
    "map.region.Kutch Region": "Kutch Region",
    "map.region.Gujarat Region": "Gujarat Region",
    "map.region.Western Coast": "Western Coast",
    "map.region.Eastern India": "Eastern India",
    "map.region.Gandhara Region": "Gandhara Region",
    "map.region.Magadha": "Magadha",
    "map.region.Deccan": "Deccan",
    "map.region.Coromandel Coast": "Coromandel Coast",
    "map.region.Kaveri Delta": "Kaveri Delta",
    "map.region.Bay of Bengal (Approximate)": "Bay of Bengal (Approximate)",
    "map.region.Tungabhadra Basin": "Tungabhadra Basin",
    "map.region.Bihar": "Bihar",
    "map.region.Haryana": "Haryana",
    "map.region.Maharashtra": "Maharashtra",
    "map.region.Tamil Nadu": "Tamil Nadu",
    "map.region.Odisha": "Odisha",

    // MAP LOCATIONS
    "map.loc.bhimbetka_region": "Bhimbetka",
    "map.loc.mehrgarh_region": "Mehrgarh",
    "map.loc.harappa": "Harappa",
    "map.loc.mohenjo_daro": "Mohenjo-daro",
    "map.loc.dholavira": "Dholavira",
    "map.loc.lothal": "Lothal",
    "map.loc.west_coast_trade": "West Coast Ports",
    "map.loc.magadha_region": "Magadha",
    "map.loc.taxila_region": "Taxila (Takshashila)",
    "map.loc.pataliputra_region": "Pataliputra",
    "map.loc.ujjain_region": "Ujjain",
    "map.loc.sanchi": "Sanchi",
    "map.loc.ajanta": "Ajanta Caves",
    "map.loc.mahabalipuram": "Mahabalipuram",
    "map.loc.thanjavur_region": "Thanjavur",
    "map.loc.chola_maritime": "Chola Maritime Routes",
    "map.loc.hampi_vijayanagara": "Hampi",
    "map.loc.nalanda": "Nalanda",
    "map.loc.rakhigarhi": "Rakhigarhi",
    "map.loc.ellora": "Ellora Caves",
    "map.loc.madurai": "Madurai",
    "map.loc.konark": "Konark",
    "map.loc.bodh_gaya": "Bodh Gaya",
`;

let code = fs.readFileSync('src/i18n/en.js', 'utf8');

if(!code.includes("map.loc.nalanda")) {
  const insertIndex = code.indexOf('map: {') + 'map: {'.length;
  code = code.slice(0, insertIndex) + engMap + code.slice(insertIndex);
  fs.writeFileSync('src/i18n/en.js', code);
  console.log("Injected Map strings into en.js!");
} else {
  console.log("Already present in en.js");
}
