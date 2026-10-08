const fs = require('fs');

const engLib = `
    // LIBRARY CATEGORIES
    "library.cat.artifacts": "Artifacts",
    "library.cat.places": "Places",
    "library.cat.people": "People",
    "library.cat.architecture": "Architecture",
    "library.cat.stories": "Stories",
    "library.cat.culture": "Culture",
    "library.cat.knowledge": "Knowledge",
    "library.cat.games": "Games",
    "library.cat.crafts": "Crafts",
    "library.cat.preservation": "Preservation",

    // CERTAINTY LEVELS
    "library.cert.well_supported": "Well Supported",
    "library.cert.documented": "Documented",
    "library.cert.archaeological": "Archaeological",
    "library.cert.interpretation": "Interpretation",
    "library.cert.traditional": "Traditional",
    "library.cert.uncertain": "Uncertain",

    // ENTRIES
    "library.entry.hand_axe.title": "Acheulean Hand Axe",
    "library.entry.hand_axe.period": "Paleolithic",
    "library.entry.hand_axe.known": "One of the earliest tools used by early humans for cutting and chopping.",
    "library.entry.hand_axe.evidence": "Found in abundant numbers in regions like Bhimbetka and the Narmada Valley.",
    "library.entry.hand_axe.interpretation": "Shows cognitive development and planning in early human ancestors.",

    "library.entry.fire.title": "Controlled Use of Fire",
    "library.entry.fire.period": "Paleolithic",
    "library.entry.fire.known": "The ability to generate and maintain fire for warmth, protection, and cooking.",
    "library.entry.fire.evidence": "Ash layers and burnt bones found in ancient cave dwellings.",
    "library.entry.fire.interpretation": "Fire fundamentally changed human diets and social structures.",

    "library.entry.early_pottery.title": "Early Pottery",
    "library.entry.early_pottery.period": "Neolithic",
    "library.entry.early_pottery.known": "Clay vessels baked in fire, used for storing grain and water.",
    "library.entry.early_pottery.evidence": "Shards found in early farming settlements like Mehrgarh.",
    "library.entry.early_pottery.interpretation": "Indicates a shift to settled agriculture and surplus food storage.",

    "library.entry.harappan_bead.title": "Carnelian Bead",
    "library.entry.harappan_bead.period": "Mature Harappan",
    "library.entry.harappan_bead.known": "Intricately drilled semi-precious stone beads prized in antiquity.",
    "library.entry.harappan_bead.evidence": "Found across the Indus Valley and as far as Mesopotamia.",
    "library.entry.harappan_bead.interpretation": "Proof of highly specialized craft and extensive trade networks.",

    "library.entry.steatite_seal.title": "Steatite Seal",
    "library.entry.steatite_seal.period": "Mature Harappan",
    "library.entry.steatite_seal.known": "Carved stone stamps often featuring animals like the 'unicorn' and script.",
    "library.entry.steatite_seal.evidence": "Thousands excavated across various Indus sites.",
    "library.entry.steatite_seal.interpretation": "Likely used for trade, identity, or administration.",

    "library.entry.great_bath.title": "The Great Bath",
    "library.entry.great_bath.period": "Mature Harappan",
    "library.entry.great_bath.known": "A massive, waterproofed brick pool in Mohenjo-Daro.",
    "library.entry.great_bath.evidence": "Excavated ruins showing complex brickwork and bitumen waterproofing.",
    "library.entry.great_bath.interpretation": "Probably used for ritual bathing, indicating the importance of water purity.",

    "library.entry.indus_script.title": "Indus Script",
    "library.entry.indus_script.period": "Mature Harappan",
    "library.entry.indus_script.known": "The undeciphered writing system of the Indus Civilization.",
    "library.entry.indus_script.evidence": "Found on seals, pottery, and copper tablets.",
    "library.entry.indus_script.interpretation": "Without a bilingual key, its exact meaning and language remain a mystery.",

    "library.entry.standardized_weight.title": "Standardized Weights",
    "library.entry.standardized_weight.period": "Mature Harappan",
    "library.entry.standardized_weight.known": "Cubic chert weights following a strict binary and decimal ratio.",
    "library.entry.standardized_weight.evidence": "Uniform weights found across all major Harappan settlements.",
    "library.entry.standardized_weight.interpretation": "Shows a highly organized central authority regulating trade and taxation.",

    "library.entry.harappa_city.title": "City of Harappa",
    "library.entry.harappa_city.period": "Mature Harappan",
    "library.entry.harappa_city.known": "One of the two largest known cities of the Indus Valley.",
    "library.entry.harappa_city.evidence": "Extensive ruins featuring grid planning, granaries, and drainage.",
    "library.entry.harappa_city.interpretation": "An urban center of commerce, craft, and civic administration.",

    "library.entry.textiles.title": "Ancient Textiles",
    "library.entry.textiles.period": "Ancient",
    "library.entry.textiles.known": "Early use of woven cotton for clothing and trade.",
    "library.entry.textiles.evidence": "Spindle whorls and microscopic traces on silver artifacts.",
    "library.entry.textiles.interpretation": "India was one of the earliest regions to cultivate and weave cotton.",

    "library.entry.maritime_cargo.title": "Maritime Cargo",
    "library.entry.maritime_cargo.period": "Ancient",
    "library.entry.maritime_cargo.known": "Goods shipped across the Indian Ocean.",
    "library.entry.maritime_cargo.evidence": "Dockyards like Lothal and foreign goods in coastal settlements.",
    "library.entry.maritime_cargo.interpretation": "Coastal India was a central hub connecting East and West.",

    "library.entry.punch_marked_coin.title": "Punch-Marked Coin",
    "library.entry.punch_marked_coin.period": "Mahajanapada",
    "library.entry.punch_marked_coin.known": "Early Indian coinage made of silver and copper, stamped with symbols.",
    "library.entry.punch_marked_coin.evidence": "Hoards found across Northern and Central India.",
    "library.entry.punch_marked_coin.interpretation": "Indicates a monetized economy and standardized trade.",

    "library.entry.ashokan_edict.title": "Ashokan Edict",
    "library.entry.ashokan_edict.period": "Mauryan",
    "library.entry.ashokan_edict.known": "Royal proclamations carved on pillars and rocks.",
    "library.entry.ashokan_edict.evidence": "Pillars surviving across the Indian subcontinent.",
    "library.entry.ashokan_edict.interpretation": "Ashoka's effort to spread 'Dhamma' (moral law) to his subjects.",

    "library.entry.aryabhata.title": "Aryabhata",
    "library.entry.aryabhata.period": "Gupta Period",
    "library.entry.aryabhata.known": "Ancient astronomer and mathematician who calculated pi and planetary motions.",
    "library.entry.aryabhata.evidence": "His treatise, the Aryabhatiya.",
    "library.entry.aryabhata.interpretation": "A pioneer of classical Indian mathematics and astronomy.",

    "library.entry.gupta_manuscript.title": "Gupta Manuscript",
    "library.entry.gupta_manuscript.period": "Gupta Period",
    "library.entry.gupta_manuscript.known": "Literary and scientific texts preserved on palm leaves.",
    "library.entry.gupta_manuscript.evidence": "Surviving texts and references in contemporary accounts.",
    "library.entry.gupta_manuscript.interpretation": "The Gupta era was a 'Golden Age' of classical literature and science.",

    "library.entry.sanchi_stupa.title": "Sanchi Stupa",
    "library.entry.sanchi_stupa.period": "Mauryan to Gupta",
    "library.entry.sanchi_stupa.known": "A grand Buddhist monument originally commissioned by Ashoka.",
    "library.entry.sanchi_stupa.evidence": "The physical structure and its elaborate carved gateways (Toranas).",
    "library.entry.sanchi_stupa.interpretation": "A masterpiece of early Buddhist architecture and narrative art.",

    "library.entry.ajanta_caves.title": "Ajanta Caves",
    "library.entry.ajanta_caves.period": "Vakataka",
    "library.entry.ajanta_caves.known": "Rock-cut Buddhist cave monuments featuring exquisite murals.",
    "library.entry.ajanta_caves.evidence": "The physical caves in Maharashtra.",
    "library.entry.ajanta_caves.interpretation": "Represents the pinnacle of ancient Indian painting and rock-cut architecture.",

    "library.entry.traditional_dance.title": "Classical Dance",
    "library.entry.traditional_dance.period": "Various",
    "library.entry.traditional_dance.known": "Expressive arts combining rhythm, storytelling, and devotion.",
    "library.entry.traditional_dance.evidence": "Described in the Natya Shastra and depicted in temple sculptures.",
    "library.entry.traditional_dance.interpretation": "A vital medium for transmitting cultural and spiritual narratives.",

    "library.entry.bronze_statue.title": "Bronze Sculptures",
    "library.entry.bronze_statue.period": "Various",
    "library.entry.bronze_statue.known": "Metal statues created using the 'lost-wax' casting technique.",
    "library.entry.bronze_statue.evidence": "Numerous statues recovered from across South India.",
    "library.entry.bronze_statue.interpretation": "Highlights advanced metallurgical skills and aesthetic refinement.",

    "library.entry.brihadisvara_temple.title": "Brihadisvara Temple",
    "library.entry.brihadisvara_temple.period": "Chola",
    "library.entry.brihadisvara_temple.known": "A colossal Shiva temple built by Rajaraja Chola I.",
    "library.entry.brihadisvara_temple.evidence": "The standing temple in Thanjavur, featuring a 216 ft Vimana.",
    "library.entry.brihadisvara_temple.interpretation": "A testament to Chola wealth, engineering prowess, and devotion.",

    "library.entry.chola_bronze.title": "Nataraja Bronze",
    "library.entry.chola_bronze.period": "Chola",
    "library.entry.chola_bronze.known": "The iconic depiction of Shiva as the Lord of Dance.",
    "library.entry.chola_bronze.evidence": "Masterpieces surviving in museums worldwide.",
    "library.entry.chola_bronze.interpretation": "Symbolizes the cosmic cycles of creation and destruction.",

    "library.entry.hampi_bazaar.title": "Hampi Bazaar",
    "library.entry.hampi_bazaar.period": "Vijayanagara",
    "library.entry.hampi_bazaar.known": "The bustling commercial street leading to the Virupaksha Temple.",
    "library.entry.hampi_bazaar.evidence": "Ruined pavilions spanning over a kilometer in Hampi.",
    "library.entry.hampi_bazaar.interpretation": "Reflects the immense wealth and global trade connections of the empire.",

    "library.entry.stone_chariot.title": "Stone Chariot",
    "library.entry.stone_chariot.period": "Vijayanagara",
    "library.entry.stone_chariot.known": "A magnificent shrine built in the shape of a temple chariot.",
    "library.entry.stone_chariot.evidence": "The central monument in the Vittala Temple complex.",
    "library.entry.stone_chariot.interpretation": "An architectural marvel meant to evoke awe and divine motion.",

    "library.entry.jataka_tales.title": "Jataka Tales",
    "library.entry.jataka_tales.period": "Ancient",
    "library.entry.jataka_tales.known": "Voluminous body of literature native to India concerning the previous births of Gautama Buddha.",
    "library.entry.jataka_tales.evidence": "Preserved in Pali texts and carved in stone at Sanchi and Ajanta.",
    "library.entry.jataka_tales.interpretation": "Used to teach moral lessons and Buddhist values to the masses.",

    "library.entry.shadow_puppetry.title": "Shadow Puppetry",
    "library.entry.shadow_puppetry.period": "Various",
    "library.entry.shadow_puppetry.known": "An ancient form of storytelling using flat articulated figures.",
    "library.entry.shadow_puppetry.evidence": "Traditional practices surviving in regions like Andhra Pradesh (Tholu Bommalata).",
    "library.entry.shadow_puppetry.interpretation": "A precursor to modern animation, blending art, music, and myth.",

    "library.entry.pachisi_board.title": "Pachisi (Ludo)",
    "library.entry.pachisi_board.period": "Medieval",
    "library.entry.pachisi_board.known": "The national board game of India, played on a cross-shaped board.",
    "library.entry.pachisi_board.evidence": "Depicted in medieval texts and surviving cloth boards.",
    "library.entry.pachisi_board.interpretation": "Games were both entertainment and tools for strategic thinking.",

    "library.entry.digital_archives.title": "Digital Archives",
    "library.entry.digital_archives.period": "Modern",
    "library.entry.digital_archives.known": "The modern preservation of ancient texts, 3D scans of monuments, and oral histories.",
    "library.entry.digital_archives.evidence": "Online repositories and digitized museum collections.",
    "library.entry.digital_archives.interpretation": "Technology is the new frontier for protecting the world's heritage.",
`;

let code = fs.readFileSync('src/i18n/en.js', 'utf8');

if(!code.includes("library.cat.artifacts")) {
  const insertIndex = code.indexOf('export const en = {') + 'export const en = {'.length;
  code = code.slice(0, insertIndex) + engLib + code.slice(insertIndex);
  fs.writeFileSync('src/i18n/en.js', code);
  console.log("Injected Library strings into en.js!");
} else {
  console.log("Already present in en.js");
}
