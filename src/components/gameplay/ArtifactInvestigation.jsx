import React, { useState } from 'react';
import { Search, CheckCircle, X, ChevronRight, HelpCircle } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

const ArtifactInvestigation = ({ data, theme, onComplete, onClose, completedChallenges }) => {
  const { playSound } = useAudio();
  const [step, setStep] = useState(0); 
  const [log, setLog] = useState(null);
  
  const artifact = data.investigation;
  const isAlreadyCompleted = completedChallenges.includes(data.id);

  if (!artifact) {
    return (
      <div className="p-6">
        <h3 className="text-xl text-red-500">Missing investigation data.</h3>
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
          {data.icon || '🏺'}
        </div>
        <h3 className="text-3xl font-serif font-bold text-green-400 mb-2">Investigation Complete</h3>
        <p className="text-content/80 mb-6">You have successfully analyzed the {data.label}.</p>
        <div className="bg-surface/40 border border-content/10 p-6 rounded-2xl mb-6">
          <p className="text-sm italic opacity-80">{data.discoverMessage}</p>
        </div>
      </div>
    );
  }

  const handleOptionSelect = (option) => {
    if (option.isCorrect) {
      playSound('achievement');
      setLog({ text: option.explanation || "Correct! You inferred the true historical purpose.", type: 'success', option });
    } else {
      playSound('error');
      setLog({ text: "That doesn't match the clues we found. Think about the specific observations.", type: 'error' });
    }
  };

  return (
    <div className="flex flex-col h-full text-left relative animate-fade-in">
      <button onClick={onClose} className="absolute top-0 right-0 p-2 hover:bg-surface/50 rounded-full text-content/60 hover:text-content z-10 transition-colors">
        <X className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-6 mb-6">
        <div className={"w-24 h-24 shrink-0 rounded-full flex items-center justify-center text-5xl bg-surface border-4 shadow-xl " + theme.border}>
          {data.icon || '🏺'}
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
              <Search className="w-4 h-4 text-gold" /> Step 1: Examine Clues
            </h4>
            <div className="space-y-3">
              {artifact.clues.map((clue, idx) => (
                <div key={idx} className="bg-surface/50 border border-content/10 p-4 rounded-xl flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <strong className="block text-content mb-1">{clue.text}</strong>
                    <span className="text-sm text-content/70">{clue.observation}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setStep(1)}
              className={"w-full mt-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all " + theme.bg + " hover:scale-[1.02]"}
            >
              Conclude Investigation <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 1 && !log && (
          <div className="animate-fade-in">
             <div className="bg-surface/50 border border-content/10 p-6 rounded-xl mb-6">
               <h4 className="font-bold uppercase tracking-widest text-xs opacity-60 mb-2">Step 2: Infer Historical Context</h4>
               <p className="text-lg font-serif">{artifact.question}</p>
             </div>

             {artifact.hint && (
               <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl mb-6 flex gap-3 text-sm">
                 <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                 <div>
                   <strong className="text-blue-400 block mb-1">KALA's Hint:</strong>
                   <span className="text-content/80">{artifact.hint}</span>
                 </div>
               </div>
             )}

             <div className="space-y-3">
               {artifact.options.map((opt, idx) => (
                 <button
                   key={idx}
                   onClick={() => handleOptionSelect(opt)}
                   className="w-full text-left p-4 rounded-xl border border-content/20 bg-surface/50 hover:bg-surface hover:border-gold transition-all"
                 >
                   {opt.label}
                 </button>
               ))}
             </div>
             
             <button onClick={() => setStep(0)} className="text-xs text-content/50 uppercase tracking-widest mt-6 hover:text-content text-center w-full">
               &larr; Review Clues
             </button>
          </div>
        )}

        {log && (
          <div className={`p-6 rounded-2xl animate-pop-in ${log.type === 'success' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
             <h4 className={`font-bold mb-2 flex items-center gap-2 ${log.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {log.type === 'success' ? <CheckCircle className="w-5 h-5"/> : <X className="w-5 h-5"/>} 
                {log.type === 'success' ? 'Brilliant Deduction' : 'Needs Re-evaluation'}
             </h4>
             <p className="text-content/90 leading-relaxed mb-6">{log.text}</p>
             {log.type === 'success' ? (
                <button 
                  onClick={() => onComplete(data.id, artifact.reward)}
                  className="w-full py-4 bg-green-500 text-black font-extrabold rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                >
                  Collect Artifact & Rewards
                </button>
             ) : (
                <button 
                  onClick={() => setLog(null)}
                  className="w-full py-3 bg-surface border border-content/20 rounded-xl hover:bg-surface-light transition-colors font-bold"
                >
                  Review Clues & Try Again
                </button>
             )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ArtifactInvestigation;
