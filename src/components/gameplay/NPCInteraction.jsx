import React, { useState } from 'react';
import { CheckCircle, Search, Gift, X } from 'lucide-react';

const NPCInteraction = ({ data, theme, resources, completedChallenges, onTurnIn, onClose }) => {
  const [log, setLog] = useState(null);

  // Find the first uncompleted quest
  const activeQuest = data.quests.find(q => !completedChallenges.includes(q.id));
  const isAllComplete = !activeQuest;

  const handleTurnIn = (quest) => {
    const reqs = quest.requirements || {};
    let canAfford = true;
    for (let k of Object.keys(reqs)) {
      if ((resources[k] || 0) < reqs[k]) canAfford = false;
    }

    if (!canAfford) {
      setLog({ text: "You don't have the required items yet.", type: 'error' });
      setTimeout(() => setLog(null), 2000);
      return;
    }

    setLog({ text: quest.successDialogue, type: 'success' });
    setTimeout(() => {
      onTurnIn(quest.id, reqs, quest.reward);
      setLog(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full text-left relative animate-fade-in">
      <button onClick={onClose} className="absolute top-0 right-0 p-2 hover:bg-surface/50 rounded-full text-content/60 hover:text-content z-10 transition-colors">
        <X className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-6 mb-6">
        <div className={"w-24 h-24 rounded-full flex items-center justify-center text-5xl bg-surface border-4 shadow-xl " + theme.border}>
          {data.icon || '🧑'}
        </div>
        <div>
          <h3 className="text-3xl font-serif font-bold">{data.name}</h3>
          <p className={"text-sm uppercase tracking-widest font-bold opacity-80 " + theme.primary}>{data.role}</p>
        </div>
      </div>

      <div className="bg-surface/40 border border-content/10 p-6 rounded-2xl mb-6 relative">
        <div className={"absolute -left-3 top-6 w-0 h-0 border-t-[10px] border-t-transparent border-r-[12px] border-b-[10px] border-b-transparent border-r-surface/40"}></div>
        <p className="text-xl italic text-content/90 leading-relaxed">
          "{log ? log.text : (isAllComplete ? (data.farewell || "Thank you for all your help. Our community thrives because of you.") : (activeQuest.dialogue || data.greeting))}"
        </p>
      </div>

      {!isAllComplete && !log && (
        <div className="flex-1 overflow-y-auto">
          <div className={"p-5 rounded-xl border bg-surface/80 " + theme.border}>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold uppercase tracking-widest text-sm opacity-80">Quest Objective</h4>
              <span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full">Active</span>
            </div>
            
            <div className="space-y-3 mb-6">
              {Object.entries(activeQuest.requirements || {}).map(([k, v]) => {
                const has = resources[k] || 0;
                const isMet = has >= v;
                return (
                  <div key={k} className="flex justify-between items-center border-b border-content/10 pb-2">
                    <span className="capitalize font-medium">{k.replace(/_/g, ' ')}</span>
                    <span className={isMet ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                      {has} / {v} {isMet && <CheckCircle className="inline w-4 h-4 ml-1" />}
                    </span>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => handleTurnIn(activeQuest)}
              className={"w-full py-4 rounded-xl font-bold transition-all " + theme.bg + " hover:scale-105 hover:" + theme.border + " border border-transparent"}
            >
              Complete Quest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPCInteraction;
