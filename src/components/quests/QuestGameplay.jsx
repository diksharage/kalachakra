import React, { useState, useMemo, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { questQuestions } from '../../data/questQuestions';
import { levelThemes } from '../../data/levelThemes';
import { useTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';
import {
  CheckCircle, XCircle, Star, Trophy, Target,
  ChevronRight, RotateCcw, ArrowLeft
} from 'lucide-react';

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// How many questions per quest session
const QUESTIONS_PER_SESSION = 5;

/**
 * QuestGameplay — shows MCQ questions for a given quest/level.
 * Props:
 *   quest      — the full quest object from questData
 *   onComplete — called with { correct, total, legacy } when done
 *   onClose    — called when user wants to go back
 */
const QuestGameplay = ({ quest, onComplete, onClose }) => {
  const { gameState } = useGame();
  const { theme: appTheme } = useTheme();
  const { playSound } = useAudio();

  const levelId = quest?.levelId ?? 1;
  const levelTheme = levelThemes[levelId] || levelThemes[1];
  const ageGroup = gameState?.ageGroup || '12-14';
  const isYoung = ageGroup === '6-8' || ageGroup === '9-11';

  // Build question set once per session
  const questions = useMemo(() => {
    const pool = questQuestions[levelId] || questQuestions[1] || [];
    const shuffled = shuffle(pool);
    return shuffled.slice(0, Math.min(QUESTIONS_PER_SESSION, shuffled.length));
  }, [levelId]);

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);   // index of chosen option
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQ = questions[qIndex];
  const totalQ = questions.length;
  const progress = ((qIndex) / totalQ) * 100;

  // Shuffle options once per question, keeping track of correct mapping
  const optionMapping = useMemo(() => {
    if (!currentQ) return { options: [], correctIdx: 0 };
    const indexed = currentQ.options.map((opt, i) => ({ opt, isCorrect: i === currentQ.answer }));
    const shuffledOpts = isYoung ? indexed : shuffle(indexed);
    const correctIdx = shuffledOpts.findIndex(o => o.isCorrect);
    return { options: shuffledOpts.map(o => o.opt), correctIdx };
  }, [qIndex, currentQ, isYoung]);

  const handleSelect = (idx) => {
    if (submitted) return;
    setSelected(idx);
  };

  const handleSubmit = useCallback(() => {
    if (selected === null || submitted) return;
    setSubmitted(true);
    const isCorrect = selected === optionMapping.correctIdx;
    if (isCorrect) {
      setCorrect(prev => prev + 1);
      playSound?.('correct');
    } else {
      playSound?.('incorrect');
    }
  }, [selected, submitted, optionMapping, playSound]);

  const handleNext = useCallback(() => {
    if (qIndex + 1 >= totalQ) {
      setFinished(true);
    } else {
      setQIndex(prev => prev + 1);
      setSelected(null);
      setSubmitted(false);
    }
  }, [qIndex, totalQ]);

  const handleComplete = useCallback(() => {
    const accuracy = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;
    const baseLegacy = quest?.rewards?.legacy || 20;
    const earnedLegacy = Math.round(baseLegacy * (accuracy / 100));
    const mastery = accuracy >= 80 ? 3 : accuracy >= 50 ? 2 : 1;
    onComplete?.({ correct, total: totalQ, accuracy, earnedLegacy, mastery });
  }, [correct, totalQ, quest, onComplete]);

  if (!currentQ && !finished) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-content/60">
        <p className="text-lg">No questions available for this quest yet.</p>
        <button onClick={onClose} className="mt-6 px-6 py-2 bg-gold text-main font-bold rounded-xl">
          Go Back
        </button>
      </div>
    );
  }

  /* ─── RESULTS SCREEN ─── */
  if (finished) {
    const accuracy = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;
    const baseLegacy = quest?.rewards?.legacy || 20;
    const earnedLegacy = Math.round(baseLegacy * (accuracy / 100));
    const stars = accuracy >= 80 ? 3 : accuracy >= 50 ? 2 : 1;

    return (
      <div className="flex flex-col items-center gap-6 py-8 px-4 max-w-lg mx-auto text-center animate-in fade-in zoom-in duration-500">
        <div className="text-6xl">{accuracy >= 80 ? '🏆' : accuracy >= 50 ? '⭐' : '📚'}</div>
        <h2 className={`text-3xl font-serif font-bold ${levelTheme.text}`}>
          {accuracy >= 80 ? 'Quest Complete!' : accuracy >= 50 ? 'Well Done!' : 'Keep Exploring!'}
        </h2>

        {/* Stars */}
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <Star key={s} size={32} className={s <= stars ? 'text-gold fill-gold' : 'text-content/20'} />
          ))}
        </div>

        {/* Stats */}
        <div className={`w-full rounded-2xl p-6 border ${levelTheme.border} bg-surface/80`}>
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <div className="text-2xl font-bold text-gold">{correct}</div>
              <div className="text-xs text-content/60 uppercase tracking-wider">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-content">{totalQ}</div>
              <div className="text-xs text-content/60 uppercase tracking-wider">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{accuracy}%</div>
              <div className="text-xs text-content/60 uppercase tracking-wider">Accuracy</div>
            </div>
          </div>

          <div className={`pt-4 border-t ${levelTheme.border} flex items-center justify-between`}>
            <span className="text-sm text-content/70 font-bold uppercase tracking-wider">Legacy Earned</span>
            <span className="text-gold font-bold flex items-center gap-1">
              <Star size={14} className="fill-gold" /> +{earnedLegacy}
            </span>
          </div>

          {quest?.rewards?.inventory && (
            <div className={`pt-3 border-t ${levelTheme.border} flex items-center justify-between mt-3`}>
              <span className="text-sm text-content/70 font-bold uppercase tracking-wider">Items Earned</span>
              <span className="text-content font-bold text-sm">
                {Object.entries(quest.rewards.inventory).map(([k, v]) => `+${v} ${k}`).join(', ')}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleComplete}
          className="px-8 py-3 bg-gold text-main font-bold rounded-xl shadow-lg shadow-gold/30 hover:scale-105 transition-transform text-lg"
        >
          Complete Quest <Trophy size={18} className="inline ml-2" />
        </button>
      </div>
    );
  }

  /* ─── QUESTION SCREEN ─── */
  const isAnswered = submitted;
  const isRight = submitted && selected === optionMapping.correctIdx;
  const isWrong = submitted && selected !== optionMapping.correctIdx;

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto px-2">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface transition-colors text-content/60 hover:text-content">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Target size={14} className={levelTheme.text} />
            <span className={`text-xs font-bold uppercase tracking-wider ${levelTheme.text}`}>
              Level {levelId} Quest
            </span>
          </div>
          <h2 className="text-base font-bold text-content truncate">{quest?.titleKey?.split('.').pop()?.replace(/_/g,' ')?.replace(/\b\w/g,c=>c.toUpperCase()) || 'Quest'}</h2>
        </div>
        <div className="text-right">
          <span className="text-xs text-content/50 font-bold">{qIndex + 1} / {totalQ}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-surface rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${levelTheme.accent || 'bg-gold'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question card */}
      <div className={`rounded-2xl p-6 border ${levelTheme.border} bg-surface/80`}>
        <p className={`font-bold text-lg leading-snug text-content mb-6 ${isYoung ? 'text-xl' : ''}`}>
          {currentQ.q}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {optionMapping.options.map((opt, idx) => {
            let btnClass = 'w-full text-left px-5 py-4 rounded-xl border font-medium transition-all text-sm flex items-center gap-3 ';
            if (!submitted) {
              btnClass += selected === idx
                ? `border-gold bg-gold/10 text-content shadow-md`
                : `border-content/20 bg-main hover:border-gold/40 hover:bg-surface text-content`;
            } else if (idx === optionMapping.correctIdx) {
              btnClass += 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
            } else if (idx === selected) {
              btnClass += 'border-red-500 bg-red-500/10 text-red-400';
            } else {
              btnClass += 'border-content/10 bg-main/60 text-content/40';
            }

            const optLabel = String.fromCharCode(65 + idx); // A, B, C, D

            return (
              <button key={idx} onClick={() => handleSelect(idx)} className={btnClass} disabled={submitted}>
                <span className={`w-7 h-7 rounded-full border flex-shrink-0 flex items-center justify-center text-xs font-bold
                  ${submitted && idx === optionMapping.correctIdx ? 'border-emerald-500 text-emerald-500' :
                    submitted && idx === selected ? 'border-red-500 text-red-400' :
                    selected === idx ? 'border-gold text-gold' : 'border-content/30 text-content/50'}`}>
                  {submitted && idx === optionMapping.correctIdx
                    ? <CheckCircle size={14} />
                    : submitted && idx === selected
                    ? <XCircle size={14} />
                    : optLabel}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {submitted && (
        <div className={`rounded-xl p-4 border animate-in fade-in slide-in-from-bottom-2 duration-300
          ${isRight ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-red-500/40 bg-red-500/5'}`}>
          <div className={`flex items-center gap-2 font-bold mb-1 ${isRight ? 'text-emerald-400' : 'text-red-400'}`}>
            {isRight ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {isRight ? 'Correct!' : 'Not quite right'}
          </div>
          <p className="text-sm text-content/80 leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}

      {/* Action buttons */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className={`px-8 py-3 font-bold rounded-xl transition-all ${
            selected !== null
              ? 'bg-gold text-main shadow-lg shadow-gold/30 hover:scale-105'
              : 'bg-surface text-content/40 cursor-not-allowed'
          }`}
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-gold text-main font-bold rounded-xl shadow-lg shadow-gold/30 hover:scale-105 transition-transform flex items-center justify-center gap-2"
        >
          {qIndex + 1 >= totalQ ? 'See Results' : 'Next Question'}
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
};

export default QuestGameplay;
