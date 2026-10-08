import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, X, ChevronRight, HelpCircle } from 'lucide-react';

const WorldEvent = ({ data, theme, levelState, onComplete, onClose }) => {
  const [step, setStep] = useState(0);
  const [log, setLog] = useState(null);
  
  const eventDef = data.eventDef;
  const isAlreadyCompleted = levelState.completedEvents.includes(data.id);

  if (!eventDef) {
    return (
      <div className="p-6">
        <h3 className="text-xl text-red-500">Missing event data.</h3>
      </div>
    );
  }

  if (isAlreadyCompleted) {
    return (
      <div className="flex flex-col h-full text-center relative animate-fade-in p-8">
        <button onClick={onClose} className="absolute top-0 right-0 p-2 hover:bg-surface/50 rounded-full text-content/60 hover:text-content z-10 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl bg-surface border-4 border-green-500/50 mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          {data.icon || '📜'}
        </div>
        <h3 className="text-3xl font-serif font-bold text-green-400 mb-2">Event Resolved</h3>
        <p className="text-content/80 mb-6">You have already made a decision for this event.</p>
        <div className="bg-surface/40 border border-content/10 p-6 rounded-2xl mb-6">
          <p className="text-sm italic opacity-80">{data.discoverMessage}</p>
        </div>
      </div>
    );
  }

  const handleOptionSelect = (option) => {
    // Check if player has required resources
    let canAfford = true;
    if (option.costs) {
      Object.entries(option.costs).forEach(([k, v]) => {
        if ((levelState.resources[k] || 0) < v) canAfford = false;
      });
    }

    if (!canAfford) {
      setLog({ text: "You do not have the required resources for this choice.", type: 'error' });
      setTimeout(() => setLog(null), 3000);
      return;
    }

    setLog({ text: option.resultText || "Your civilization will adapt to this decision.", type: 'success' });
    setTimeout(() => {
      onComplete(data.id, option.costs, option.rewards);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full text-left relative animate-fade-in">
      <button onClick={onClose} className="absolute top-0 right-0 p-2 hover:bg-surface/50 rounded-full text-content/60 hover:text-content z-10 transition-colors">
        <X className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-6 mb-6">
        <div className={"w-24 h-24 shrink-0 rounded-full flex items-center justify-center text-5xl bg-surface border-4 shadow-xl " + theme.border}>
          {data.icon || '⚠️'}
        </div>
        <div>
          <h3 className="text-2xl font-serif font-bold mb-1">{data.label}</h3>
          <p className="text-sm text-content/70 italic">{data.description}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6">
        
        {step === 0 && (
          <div className="animate-fade-in">
            <h4 className="font-bold uppercase tracking-widest text-sm opacity-80 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" /> Crisis / Opportunity
            </h4>
            
            <div className="bg-surface/50 border border-content/10 p-6 rounded-xl mb-6">
               <p className="text-lg font-serif leading-relaxed">{eventDef.scenario}</p>
            </div>

            <h4 className="font-bold uppercase tracking-widest text-xs opacity-60 mb-3">Available Decisions:</h4>
            
            <div className="space-y-4">
              {eventDef.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt)}
                  className="w-full text-left p-4 rounded-xl border border-content/20 bg-surface/50 hover:bg-surface hover:border-gold transition-all group focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <strong className="block text-lg mb-1 group-hover:text-gold transition-colors">{opt.label}</strong>
                  
                  {opt.costs && Object.keys(opt.costs).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs uppercase tracking-widest text-red-400 font-bold mr-2">Costs:</span>
                      {Object.entries(opt.costs).map(([k, v]) => (
                         <span key={k} className="text-xs font-medium px-2 py-0.5 bg-red-900/20 text-red-300 rounded border border-red-500/20">
                           {v} {k}
                         </span>
                      ))}
                    </div>
                  )}

                  {opt.rewards && Object.keys(opt.rewards).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs uppercase tracking-widest text-green-400 font-bold mr-2">Yields:</span>
                      {Object.entries(opt.rewards).map(([k, v]) => (
                         <span key={k} className="text-xs font-medium px-2 py-0.5 bg-green-900/20 text-green-300 rounded border border-green-500/20">
                           +{v} {k}
                         </span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {log && (
           <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center animate-fade-in mt-4 ${
             log.type === 'success' ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'
           }`}>
             {log.type === 'success' ? <CheckCircle className="w-12 h-12 text-green-400 mb-4" /> : <X className="w-12 h-12 text-red-400 mb-4" />}
             <h4 className={`text-xl font-bold mb-2 ${log.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
               {log.type === 'success' ? 'Decision Recorded' : 'Action Failed'}
             </h4>
             <p className="text-content/80">{log.text}</p>
           </div>
        )}

      </div>
    </div>
  );
};

export default WorldEvent;
