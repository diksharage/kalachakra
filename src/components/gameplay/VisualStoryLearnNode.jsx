import React, { useState } from "react";
import { adaptTextForAge } from "../../utils/ageAdapter";
import { ArrowRight, ArrowLeft, CheckCircle, Info, Image as ImageIcon } from "lucide-react";

const VisualStoryLearnNode = ({ data, onComplete, theme, isYoung, playSound, ageGroup }) => {
  const [slide, setSlide] = useState(0);
  const story = data.visualStory || [];

  const handleNext = () => {
    if (playSound) playSound("ui");
    if (slide < story.length - 1) setSlide(slide + 1);
    else onComplete();
  };

  const handlePrev = () => {
    if (playSound) playSound("ui");
    if (slide > 0) setSlide(slide - 1);
  };

  if (!story.length) return null;
  const current = story[slide];

  return (
    <div className="flex flex-col gap-4 w-full animate-fade-in">
      <div className="text-center mb-2">
        <p className="text-xs opacity-70 uppercase tracking-widest text-gold mb-1">
          Historical Understanding ({slide + 1}/{story.length})
        </p>
        <h3 className={"text-2xl font-bold uppercase " + theme.primary}>{current.title}</h3>
      </div>

      <div className={"w-full overflow-hidden rounded-xl border-2 shadow-lg relative bg-surface/80 flex flex-col items-center justify-center min-h-[16rem] " + theme.border}>
        {current.image ? (
          <img src={current.image} alt={current.title} className="w-full h-48 md:h-64 object-cover object-center opacity-90" />
        ) : current.icon ? (
          <div className="w-full h-48 md:h-64 flex items-center justify-center bg-black/20 text-8xl">
            {current.icon}
          </div>
        ) : (
          <div className="w-full h-48 md:h-64 flex items-center justify-center bg-black/20">
             <ImageIcon size={64} className="opacity-30" />
          </div>
        )}
        
        {current.focusPoint && (
          <div className="absolute top-2 right-2 bg-black/60 text-white backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs font-bold flex items-center gap-2 max-w-[70%] text-left">
            <Info size={14} className="text-blue-400 shrink-0" />
            <span>{current.focusPoint}</span>
          </div>
        )}

        {current.type && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-gold backdrop-blur-md px-2 py-1 rounded border border-gold/30 text-[10px] uppercase font-bold tracking-widest">
            {current.type}
          </div>
        )}
      </div>

      <div className={"p-5 rounded-xl border text-left bg-surface/50 shadow-inner " + theme.border}>
        <p className="text-base md:text-lg leading-relaxed text-content/90">
          {adaptTextForAge(current.text, ageGroup)}
        </p>
        {current.evidence && (
          <div className="mt-4 pt-3 border-t border-content/10 flex gap-2">
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest shrink-0 mt-0.5">Evidence:</span>
            <p className="text-sm opacity-80 italic">{current.evidence}</p>
          </div>
        )}
        {current.uncertainty && (
          <div className="mt-2 flex gap-2">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest shrink-0 mt-0.5">Debated:</span>
            <p className="text-sm opacity-80 italic">{current.uncertainty}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-2">
        {slide > 0 && (
          <button onClick={handlePrev} className={"px-4 py-3 font-bold rounded-xl flex items-center justify-center gap-2 border hover:bg-surface/50 transition-colors " + theme.border}>
            <ArrowLeft size={18} /> Back
          </button>
        )}
        <button onClick={handleNext} className={"px-6 py-3 font-bold rounded-xl flex-1 flex items-center justify-center gap-2 " + theme.button}>
          {slide < story.length - 1 ? (
            <>Next <ArrowRight size={18} /></>
          ) : (
            <>Complete Learning <CheckCircle size={18} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default VisualStoryLearnNode;
