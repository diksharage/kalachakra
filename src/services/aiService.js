import { civilizationLevels } from '../data/civilizationLevels.js';
import { levelConfigs } from '../data/levelConfigs.js';
import { getBuilderDataForLevel } from '../data/civilizationBuilder.js';
import { questData } from '../data/quests.js';

const CLIENT_TIMEOUT_MS = 16000;
const STORAGE_KEY = 'kalachakra_kala_chat_history_v1';

export const DEFAULT_WELCOME_MESSAGE = {
  role: 'ai',
  content:
    'Namaste, Explorer! I am KALA (Knowledge & AI Learning Assistant), your conversational AI guide and heritage companion. Ask me anything about Indian history, civilizations, science, mathematics, geography, general knowledge, or what to do next in your journey!'
};

export function loadKalaHistory() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [DEFAULT_WELCOME_MESSAGE];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Ignore storage read errors
  }
  return [DEFAULT_WELCOME_MESSAGE];
}

export function saveKalaHistory(messages) {
  try {
    if (!Array.isArray(messages)) return;
    // Keep last 30 messages in session storage so memory remains bounded
    const trimmed = messages.slice(-30);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearKalaHistory() {
  const reset = [
    {
      role: 'ai',
      content: 'Namaste! Conversation history cleared. How can I assist you on your journey today?'
    }
  ];
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
  } catch {
    // Ignore storage errors
  }
  return reset;
}

function getSavedGameStateFallback() {
  try {
    const activeEmail = localStorage.getItem('kalachakra_active_user');
    if (activeEmail) {
      const saved = localStorage.getItem(`kalachakra_state_${activeEmail}`);
      if (saved) return JSON.parse(saved);
    }
  } catch {
    // Ignore localStorage parse errors
  }
  return null;
}

const STAGE_NAMES = {
  1: 'EXPLORE',
  2: 'DISCOVER',
  3: 'LEARN',
  4: 'PLAY + SOLVE',
  5: 'BUILD / MANAGE',
  6: 'CLAIM REWARDS',
  7: 'LEVEL COMPLETE'
};

export function buildKalaContext(gameStateInput = null, localOverrides = {}) {
  const gs = gameStateInput || getSavedGameStateFallback() || {};
  const activeState = localOverrides.levelState || gs.activeLevelState || {};

  const levelId = Number(
    localOverrides.levelId || gs.activeLevelId || gs.currentLevel || gs.level || 1
  );
  const levelMeta =
    civilizationLevels.find(l => l.id === levelId) || civilizationLevels[0] || {};
  const levelConfig = levelConfigs[levelId] || {};

  const rawLocations =
    typeof levelConfig.locations === 'function'
      ? levelConfig.locations(1)
      : Array.isArray(levelConfig.locations)
      ? levelConfig.locations
      : [];
  const validLocations = rawLocations.filter(l => l && !l.isLockedNode);

  const allChallenges = Object.values(levelConfig.challenges || {});
  const builderData = getBuilderDataForLevel(levelId) || { buildings: [] };
  const buildActions = Array.isArray(builderData.buildings) ? builderData.buildings : [];

  const isBeginner = levelId <= 3;
  const isIntermediate = levelId >= 4 && levelId <= 7;
  const isAdvanced = levelId >= 8 && levelId <= 11;
  const isL1orL2 = levelId === 1 || levelId === 2;

  const targetCount = isBeginner ? 2 : isIntermediate ? 3 : isAdvanced ? 4 : 5;
  const targetExplore = isL1orL2
    ? Math.min(validLocations.length, Math.max(validLocations.length, 1))
    : Math.min(targetCount, Math.max(validLocations.length, 1));
  const targetDiscover = targetExplore;
  const targetLearn = targetExplore;
  const targetChallenges = levelId === 1
    ? Math.min(3, Math.max(allChallenges.length, 1))
    : levelId === 2
    ? Math.min(4, Math.max(allChallenges.length, 1))
    : Math.min(
        isBeginner ? 2 : isIntermediate ? 3 : 4,
        Math.max(allChallenges.length, 1)
      );
  const targetBuilds = isL1orL2
    ? Math.min(2, Math.max(buildActions.length, 1))
    : Math.min(targetCount, Math.max(buildActions.length, 1));

  const exploration = Array.isArray(activeState.exploration) ? activeState.exploration : [];
  const discovery = Array.isArray(activeState.discovery) ? activeState.discovery : [];
  const learning = Array.isArray(activeState.learning) ? activeState.learning : [];
  const completedChallenges = Array.isArray(activeState.completedChallenges)
    ? activeState.completedChallenges
    : [];
  const builtItems = Array.isArray(activeState.builtItems) ? activeState.builtItems : [];

  const stage = Number(localOverrides.stage || activeState.stage || 1);
  const stageName = STAGE_NAMES[stage] || 'EXPLORE';

  const levelResources =
    localOverrides.inventory ||
    activeState.resources ||
    levelConfig.defaultResources ||
    {};

  const exploredLabels = validLocations
    .filter(l => exploration.includes(l.id))
    .map(l => l.label);
  const unexploredLabels = validLocations
    .filter(l => !exploration.includes(l.id))
    .slice(0, targetExplore)
    .map(l => l.label);
  const undiscoveredLabels = validLocations
    .filter(l => exploration.includes(l.id) && !discovery.includes(l.id))
    .map(l => l.label);
  const unlearnedLabels = validLocations
    .filter(l => discovery.includes(l.id) && !learning.includes(l.id))
    .map(l => l.label);

  // Determine missing resources for unbuilt structures
  const unbuiltStructures = buildActions
    .slice(0, targetBuilds)
    .filter(b => !builtItems.includes(b.id));

  const missingResourcesMap = {};
  const buildingsSummary = buildActions.slice(0, targetBuilds).map(b => {
    const isBuilt = builtItems.includes(b.id);
    const reqs =
      b.requirements ||
      (Array.isArray(b.choices) && b.choices[0]?.requirements) ||
      {};
    const reqEntries = Object.entries(reqs);
    const reqStr =
      reqEntries.length > 0
        ? reqEntries
            .map(([rk, rv]) => {
              const have = Number(levelResources[rk] || 0);
              if (!isBuilt && have < rv) {
                missingResourcesMap[rk] = Math.max(missingResourcesMap[rk] || 0, rv - have);
              }
              return `${rk}: ${have}/${rv}`;
            })
            .join(', ')
        : 'no cost';
    return `${b.nameKey || b.id} [${isBuilt ? 'BUILT' : `NEEDS BUILD (${reqStr})`}]`;
  });

  const hasMissingResources =
    Boolean(localOverrides.missingResources) || Object.keys(missingResourcesMap).length > 0;

  // Determine active challenge
  const rawChallenge =
    localOverrides.activeChallenge ||
    (activeState.activePopup?.type === 'challenge' ? activeState.activePopup.data : null);

  let activeChallenge = null;
  if (rawChallenge) {
    const ageGroup = localOverrides.ageGroup || gs.ageGroup || '12-14';
    const qText =
      typeof rawChallenge.getQuestion === 'function'
        ? rawChallenge.getQuestion(ageGroup)
        : rawChallenge.question || '';
    activeChallenge = {
      id: rawChallenge.id,
      title: rawChallenge.title || 'Historical Challenge',
      format: rawChallenge.format || 'mcq',
      question: qText,
      options: Array.isArray(rawChallenge.options)
        ? rawChallenge.options.map(o => ({ label: o.label || o.text || String(o) }))
        : []
    };
  }

  // Compute exact current objective and actionable next steps
  let currentObjective = '';
  let stageProgress = '';
  const nextSteps = [];

  if (activeChallenge) {
    stageProgress = `Solving Challenge: ${activeChallenge.title}`;
    currentObjective = `Solve the active challenge "${activeChallenge.title}" (${
      activeChallenge.question || 'complete the task on screen'
    }).`;
    nextSteps.push(
      `Read the prompt carefully and choose the option that best fits ${levelMeta.title}`
    );
  } else if (stage === 1) {
    stageProgress = `Explored ${exploration.length}/${targetExplore} locations`;
    const targets =
      unexploredLabels.length > 0
        ? unexploredLabels.join(', ')
        : validLocations.map(l => l.label).slice(0, targetExplore).join(', ');
    currentObjective = `Stage 1 (EXPLORE) in Level ${levelId} (${levelMeta.title}): Explore ${
      targetExplore - exploration.length
    } more location(s) on the map (${exploration.length}/${targetExplore} completed). Click on: ${
      targets || 'highlighted map locations'
    }.`;
    if (targets) nextSteps.push(`Click on ${targets} on the map and investigate all discovery points`);
    nextSteps.push('Complete Stage 1 to unlock Stage 2 (DISCOVER)');
  } else if (stage === 2) {
    stageProgress = `Discovered ${discovery.length}/${targetDiscover} artifacts`;
    const targets =
      undiscoveredLabels.length > 0
        ? undiscoveredLabels.join(', ')
        : exploredLabels.join(', ');
    currentObjective = `Stage 2 (DISCOVER) in Level ${levelId} (${levelMeta.title}): Excavate and uncover artifacts at your explored locations (${discovery.length}/${targetDiscover} discovered). Target location(s): ${
      targets || 'explored map nodes'
    }.`;
    if (targets) nextSteps.push(`Select ${targets} and tap to excavate the artifact and collect resources`);
    nextSteps.push('Finish Stage 2 to unlock Stage 3 (LEARN)');
  } else if (stage === 3) {
    stageProgress = `Learned ${learning.length}/${targetLearn} historical contexts`;
    const targets =
      unlearnedLabels.length > 0 ? unlearnedLabels.join(', ') : exploredLabels.join(', ');
    currentObjective = `Stage 3 (LEARN) in Level ${levelId} (${levelMeta.title}): Analyze the historical significance of your discoveries (${learning.length}/${targetLearn} completed). Click on: ${
      targets || 'discovered map nodes'
    }.`;
    if (targets) nextSteps.push(`Open ${targets} and complete the historical insight steps`);
    nextSteps.push('Finish Stage 3 to unlock Stage 4 (PLAY + SOLVE)');
  } else if (stage === 4) {
    stageProgress = `Completed ${completedChallenges.length}/${targetChallenges} challenges`;
    const remainingChallengeTitles = allChallenges
      .filter(c => !completedChallenges.includes(c.id))
      .slice(0, targetChallenges - completedChallenges.length)
      .map(c => c.title || c.id);
    currentObjective = `Stage 4 (PLAY + SOLVE) in Level ${levelId} (${levelMeta.title}): Complete ${
      targetChallenges - completedChallenges.length
    } more challenge(s) (${completedChallenges.length}/${targetChallenges} solved)${
      remainingChallengeTitles.length > 0 ? `: ${remainingChallengeTitles.join(', ')}` : ''
    } to earn construction resources.`;
    nextSteps.push('Click the active challenge in the Objective Tracker sidebar or on the map');
    nextSteps.push('Earn rewards to prepare for Stage 5 (BUILD / MANAGE)');
  } else if (stage === 5) {
    stageProgress = `Built ${builtItems.length}/${targetBuilds} structures`;
    const remainingNames = unbuiltStructures.map(b => b.nameKey || b.id).join(', ');
    const missingStr = Object.entries(missingResourcesMap)
      .map(([k, v]) => `${v} more ${k}`)
      .join(', ');
    currentObjective = `Stage 5 (BUILD / MANAGE) in Level ${levelId} (${levelMeta.title}): Construct ${
      targetBuilds - builtItems.length
    } more structure(s) (${builtItems.length}/${targetBuilds} built): ${
      remainingNames || 'required settlement structures'
    }.${
      missingStr
        ? ` You currently need ${missingStr} — gather them by completing extra challenges or exploring remaining locations.`
        : ' You have the required resources ready to build!'
    }`;
    if (missingStr) {
      nextSteps.push(`Gather missing resources (${missingStr}) via extra challenges or unexplored locations`);
    }
    if (remainingNames) {
      nextSteps.push(`Construct ${remainingNames} from the Objective Tracker or map`);
    }
  } else if (stage === 6) {
    stageProgress = 'All 5 stages completed — Rewards ready';
    currentObjective = `Stage 6 (REWARD) in Level ${levelId} (${levelMeta.title}): All level objectives are met! Click "Claim Level Rewards" to collect your Knowledge, Culture, and Legacy XP.`;
    nextSteps.push('Click "Claim Level Rewards" on the level completion panel');
  } else if (stage === 7) {
    stageProgress = 'Level Completed';
    currentObjective = `Level ${levelId} (${levelMeta.title}) is complete! Click "Continue Journey" to return to the Journey Map and enter Level ${Math.min(
      levelId + 1,
      14
    )}.`;
    nextSteps.push('Click "Continue Journey" to advance to the next historical era');
  }

  // Quests summary
  const userQuests = gs.quests || {};
  const relevantQuests = questData
    .filter(q => q.levelId === levelId || userQuests[q.id]?.status === 'in_progress')
    .slice(0, 5)
    .map(q => {
      const status = userQuests[q.id]?.status || 'not_started';
      const objs = (q.objectives || []).map(o => `${o.type}:${o.target}`).join(', ');
      return `Quest ${q.id} (Level ${q.levelId}, status: ${status}, objectives: ${objs})`;
    });

  // Recent discoveries
  const unlockedArtifacts = Array.isArray(gs.unlockedArtifacts) ? gs.unlockedArtifacts : [];
  const discoveredLabels = validLocations
    .filter(l => discovery.includes(l.id))
    .map(l => l.label);
  const recentDiscoveries = Array.from(new Set([...discoveredLabels, ...unlockedArtifacts.slice(-6)]));

  return {
    playerName: gs.name || 'Explorer',
    playerType: gs.playerType || 'Explorer',
    age: gs.age || null,
    ageGroup: localOverrides.ageGroup || gs.ageGroup || '12-14',
    levelId,
    currentLevel: gs.currentLevel || levelId,
    levelTitle: levelMeta.title || `Level ${levelId}`,
    historicalPeriod: levelMeta.historicalPeriod || '',
    stage,
    stageName,
    stageProgress,
    currentObjective,
    nextSteps,
    exploredLocations: exploredLabels,
    unexploredLocations: unexploredLabels,
    recentDiscoveries,
    activeChallenge,
    missingResources: hasMissingResources,
    missingResourcesMap,
    levelResources,
    inventory: gs.inventory || {},
    playerStats: {
      energy: gs.energy ?? 100,
      knowledge: gs.knowledge ?? 0,
      culture: gs.culture ?? 0,
      coins: gs.coins ?? 0,
      legacy: gs.legacy ?? 0,
      completedLevels: Array.isArray(gs.completedLevels) ? gs.completedLevels.length : 0,
      unlockedArtifacts: unlockedArtifacts.length
    },
    buildingsSummary,
    questsSummary: relevantQuests
  };
}

function buildOfflineGameCompanionFallback(question, enrichedContext, noticeMessage) {
  const lowerQ = question.toLowerCase();
  const isYoung = enrichedContext.ageGroup === '6-8' || enrichedContext.ageGroup === '9-11';

  const asksNext =
    lowerQ.includes('what should i do') ||
    lowerQ.includes('what do i do') ||
    lowerQ.includes('do next') ||
    lowerQ.includes('next step') ||
    lowerQ.includes('objective') ||
    lowerQ.includes('stuck') ||
    lowerQ.includes('where do i go');

  const asksHint = lowerQ.includes('hint') || lowerQ.includes('help me with this');

  if (asksNext) {
    const obj = enrichedContext.currentObjective;
    const steps =
      Array.isArray(enrichedContext.nextSteps) && enrichedContext.nextSteps.length > 0
        ? `\n\nNext steps:\n• ${enrichedContext.nextSteps.join('\n• ')}`
        : '';
    return `${obj}${steps}${noticeMessage ? `\n\n(${noticeMessage})` : ''}`;
  }

  if (asksHint && enrichedContext.activeChallenge) {
    const ch = enrichedContext.activeChallenge;
    const hintText = isYoung
      ? `Hint for "${ch.title}": Think about what people in ${enrichedContext.levelTitle} needed most to live, work, and help their community!`
      : `Hint for "${ch.title}": Consider the core historical and environmental priorities of ${enrichedContext.levelTitle} (${enrichedContext.historicalPeriod}) and how primary resources supported settlement growth.`;
    return `${hintText}${noticeMessage ? `\n\n(${noticeMessage})` : ''}`;
  }

  return `${noticeMessage}\n\nMeanwhile, here is your current gameplay status in Level ${enrichedContext.levelId} (${enrichedContext.levelTitle}):\n${enrichedContext.currentObjective}`;
}

export const askHeritageGuide = async (question, context = {}, history = [], options = {}) => {
  const trimmedQ = typeof question === 'string' ? question.trim() : '';
  if (!trimmedQ) {
    return {
      text: 'Please enter a question so I can assist you!',
      actions: [],
      isError: false
    };
  }

  const enrichedContext = buildKalaContext(context.gameState || null, context);
  const endpoint = options.endpoint || '/api/kala';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        question: trimmedQ,
        context: enrichedContext,
        history: Array.isArray(history) ? history.slice(-10) : []
      })
    });

    clearTimeout(timeoutId);
    const data = await response.json().catch(() => ({}));

    if (response.ok && data.text) {
      return {
        text: data.text,
        actions: Array.isArray(data.actions) ? data.actions : [],
        model: data.model || null,
        isError: false
      };
    }

    const errCode = data.error || `HTTP_${response.status}`;
    const serverMsg =
      data.message ||
      'KALA could not reach the Gemini AI service right now. Please try again in a moment.';

    const fallbackText = buildOfflineGameCompanionFallback(
      trimmedQ,
      enrichedContext,
      serverMsg
    );

    return {
      text: fallbackText,
      actions: Array.isArray(data.actions) ? data.actions : [],
      isError: true,
      errorCode: errCode
    };
  } catch (error) {
    clearTimeout(timeoutId);
    const isTimeout = error.name === 'AbortError';
    const netNotice = isTimeout
      ? 'Connection timed out while waiting for KALA AI. Please check your internet connection and try again.'
      : 'Network error: Unable to connect to the KALA AI server. Please check your internet connection and ensure the server is running.';

    const fallbackText = buildOfflineGameCompanionFallback(
      trimmedQ,
      enrichedContext,
      netNotice
    );

    return {
      text: fallbackText,
      actions: [],
      isError: true,
      errorCode: isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR'
    };
  }
};
