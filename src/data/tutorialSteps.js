export const tutorialSteps = [
  { 
    id: 'welcome', 
    target: null, 
    titleKey: 'tutorial.welcome.title', 
    descKey: 'tutorial.welcome.desc' 
  },
  { 
    id: 'journey', 
    target: '[data-tutorial="nav-journey"]', 
    titleKey: 'tutorial.journey.title', 
    descKey: 'tutorial.journey.desc',
    placement: 'right'
  },
  { 
    id: 'continue', 
    target: '[data-tutorial="continue-journey"]', 
    titleKey: 'tutorial.continue.title', 
    descKey: 'tutorial.continue.desc',
    placement: 'bottom'
  },
  { 
    id: 'explore', 
    target: '[data-tutorial="dash-explore"]', 
    titleKey: 'tutorial.explore.title', 
    descKey: 'tutorial.explore.desc',
    placement: 'top'
  },
  { 
    id: 'legacy', 
    target: '[data-tutorial="legacy-stats"]', 
    titleKey: 'tutorial.legacy.title', 
    descKey: 'tutorial.legacy.desc',
    placement: 'left'
  },
  { 
    id: 'search', 
    target: '[data-tutorial="global-search"]', 
    titleKey: 'tutorial.search.title', 
    descKey: 'tutorial.search.desc',
    placement: 'bottom'
  },
  { 
    id: 'notifications', 
    target: '[data-tutorial="notifications"]', 
    titleKey: 'tutorial.notif.title', 
    descKey: 'tutorial.notif.desc',
    placement: 'bottom'
  },
  { 
    id: 'kala', 
    target: '[data-tutorial="nav-kala"]', 
    titleKey: 'tutorial.kala.title', 
    descKey: 'tutorial.kala.desc',
    placement: 'right'
  },
  { 
    id: 'ready', 
    target: null, 
    titleKey: 'tutorial.ready.title', 
    descKey: 'tutorial.ready.desc' 
  }
];
