export const worldEvents = [
  {
    id: "evt_l3_water",
    levelId: 3,
    type: "resource",
    titleKey: "event.evt_l3_water.title",
    contextKey: "event.evt_l3_water.context",
    historicalContextKey: "event.evt_l3_water.hist",
    options: [
      {
        id: "opt_drainage",
        titleKey: "event.evt_l3_water.opt1_title",
        descKey: "event.evt_l3_water.opt1_desc",
        requirements: { trade_goods: 1 },
        consequences: { legacy: 15, inventory: { harappan_bead: 1 } }, // Gain bead, lose trade_goods
        explanationKey: "event.evt_l3_water.opt1_exp"
      },
      {
        id: "opt_storage",
        titleKey: "event.evt_l3_water.opt2_title",
        descKey: "event.evt_l3_water.opt2_desc",
        requirements: { harappan_bead: 1 },
        consequences: { legacy: 15, inventory: { trade_goods: 1 } },
        explanationKey: "event.evt_l3_water.opt2_exp"
      }
    ],
    kalaHintKey: "event.evt_l3_water.hint"
  },
  {
    id: "evt_l6_road",
    levelId: 6,
    type: "infrastructure",
    titleKey: "event.evt_l6_road.title",
    contextKey: "event.evt_l6_road.context",
    historicalContextKey: "event.evt_l6_road.hist",
    options: [
      {
        id: "opt_repair",
        titleKey: "event.evt_l6_road.opt1_title",
        descKey: "event.evt_l6_road.opt1_desc",
        requirements: { royal_decree: 1 },
        consequences: { legacy: 20 },
        explanationKey: "event.evt_l6_road.opt1_exp"
      },
      {
        id: "opt_local",
        titleKey: "event.evt_l6_road.opt2_title",
        descKey: "event.evt_l6_road.opt2_desc",
        requirements: {},
        consequences: { legacy: 10 },
        explanationKey: "event.evt_l6_road.opt2_exp"
      }
    ],
    kalaHintKey: "event.evt_l6_road.hint"
  },
  {
    id: "evt_l11_heritage",
    levelId: 11,
    type: "preservation",
    titleKey: "event.evt_l11_heritage.title",
    contextKey: "event.evt_l11_heritage.context",
    historicalContextKey: "event.evt_l11_heritage.hist",
    options: [
      {
        id: "opt_repair_temple",
        titleKey: "event.evt_l11_heritage.opt1_title",
        descKey: "event.evt_l11_heritage.opt1_desc",
        requirements: { temple_carving: 1 },
        consequences: { legacy: 25 },
        explanationKey: "event.evt_l11_heritage.opt1_exp"
      },
      {
        id: "opt_document",
        titleKey: "event.evt_l11_heritage.opt2_title",
        descKey: "event.evt_l11_heritage.opt2_desc",
        requirements: {},
        consequences: { legacy: 15 },
        explanationKey: "event.evt_l11_heritage.opt2_exp"
      }
    ],
    kalaHintKey: "event.evt_l11_heritage.hint"
  }
];

export const getAvailableEvents = (levelId, completedEvents) => {
  return worldEvents.filter(e => e.levelId === levelId && !completedEvents[e.id]);
};
