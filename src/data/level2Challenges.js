export const level2Challenges = {
  mg_l2_farming: {
    id: "mg-l2-farming",
    title: "Plan Planting & Seasonal Harvest Schedule",
    format: "minigame",
    difficulty: "medium",
    reward: { grain: 2, tools: 1, seeds: 2 }
  },
  crops: {
    id: "l2-crops-matching",
    title: "Select Suitable Crops for Ecological Conditions",
    format: "matching",
    difficulty: "medium",
    reward: { grain: 2, seeds: 2, xp: 50 },
    pairs: [
      {
        id: "c1",
        left: { id: "paddy", label: "Wet River Floodplains & Low Marshes", icon: "🌾" },
        right: { id: "paddy_crop", label: "Indica Rice (Thrives in standing monsoon water and deep alluvial silt)" }
      },
      {
        id: "c2",
        left: { id: "winter_alluvium", label: "Well-Drained River Terraces (Cool Winter)", icon: "🌱" },
        right: { id: "winter_crop", label: "Barley & Emmer Wheat (Requires cool temperatures and moderate soil moisture)" }
      },
      {
        id: "c3",
        left: { id: "arid_plateau", label: "Semi-Arid Rocky Plateau & Hillslopes", icon: "🪨" },
        right: { id: "arid_crop", label: "Small Millets & Horse Gram (Drought-resilient grains surviving dry spells)" }
      },
      {
        id: "c4",
        left: { id: "river_borders", label: "Sandy Loam River Borders & Garden Plots", icon: "🌿" },
        right: { id: "border_crop", label: "Green Gram & Lentils (Nitrogen-fixing pulses enriching soil between harvests)" }
      }
    ]
  },
  water: {
    id: "l2-water-allocation",
    title: "Solve Water-Allocation & Canal Challenges",
    difficulty: "medium",
    format: "interactive_survival",
    question: "A mid-season dry spell hits as rice seedlings are heading and barley plots need moisture. The single river overflow channel has limited flow. As community planner, how do you allocate the water?",
    options: [
      {
        label: "Construct an alternating clay sluice gate: flood the thirsty rice paddy during midday heat, then divert evening water to the barley plots and cattle pen",
        costs: { water: 2, mud: 1 },
        resultText: "Superb planning! The timed sluice gate prevented sun-scalding in the paddy while providing adequate moisture to barley and livestock without wasting a drop.",
        isSuccess: true,
        reward: { grain: 2, water: 2, xp: 50 }
      },
      {
        label: "Divert all available water solely into the cattle pen, completely shutting off the field canals",
        costs: { water: 1 },
        resultText: "Disastrous decision! The thirsty rice seedlings wilted and died in the heat, resulting in severe food shortages.",
        isSuccess: false
      },
      {
        label: "Tear down the riverbank earthen dykes completely, flooding everything at once without channels",
        costs: { mud: 1 },
        resultText: "The sudden uncontrolled torrent washed away topsoil, submerged the low village homes, and damaged mudbrick walls.",
        isSuccess: false
      }
    ]
  },
  protection: {
    id: "l2-crop-protection",
    title: "Protect Crops from Environmental Problems",
    difficulty: "medium",
    format: "interactive_survival",
    question: "Torrential unseasonal rains threaten to waterlog your ripening grain plots, and a fungal leaf blight is beginning to spread across dense stalks. How do you protect the harvest?",
    options: [
      {
        label: "Dig perimeter drainage runoffs to release stagnant water into the river, and cut/burn infected crop borders to halt the fungal blight",
        costs: { tools: 1, wood: 1 },
        resultText: "Decisive action saved the village harvest! Drainage prevented root rot, and creating firebreaks stopped the blight from entering the main grain fields.",
        isSuccess: true,
        reward: { grain: 2, tools: 1, xp: 50 }
      },
      {
        label: "Pack heavy wet river mud tightly around every waterlogged stem to trap the stagnant water",
        costs: { mud: 2 },
        resultText: "Trapping stagnant mud suffocated the plant root systems, rotting the crops within days.",
        isSuccess: false
      },
      {
        label: "Ignore the fields completely and wait for the sun to evaporate standing water on its own",
        costs: {},
        resultText: "Stagnant pools festered for two weeks. Water mold destroyed over 70% of the ripening harvest.",
        isSuccess: false
      }
    ]
  }
};
