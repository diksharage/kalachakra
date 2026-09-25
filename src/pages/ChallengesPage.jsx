import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { questionBank } from '../data/questionBank';
import { Brain, Trophy, Flame, Lightbulb } from 'lucide-react';
import { getAdaptiveText } from '../utils/ageUtils';

const ChallengesPage = () => {
  const { gameState, updateResources, completeChallenge } = useGame();
  
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Filter out questions the user has already completed
  const getAvailableQuestions = () => {
    return questionBank.filter(q => 
      !gameState.completedChallenges.includes(q.id) &&
      (q.civ === gameState.currentCivilization || q.civ === 'any')
    );
  };

  const loadNextQuestion = () => {
    const available = getAvailableQuestions();
    if (available.length > 0) {
      // Pick a random question from available
      const randomIdx = Math.floor(Math.random() * available.length);
      setCurrentQuestion(available[randomIdx]);
    } else {
      setCurrentQuestion(null);
    }
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
  };

  useEffect(() => {
    loadNextQuestion();
    // eslint-disable-next-line
  }, []);

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === currentQuestion.answer;
    if (isCorrect) {
      setStreak(s => s + 1);
      // Mark as completed so it never repeats
      completeChallenge(currentQuestion.id);
      
      // Calculate reward based on streak and age (harder = more points)
      const baseKnowledge = getAdaptiveText(gameState.ageGroup, {
        'young': 30,
        'teen': 50,
        'default': 70
      });
      const baseCulture = getAdaptiveText(gameState.ageGroup, {
        'young': 15,
        'teen': 20,
        'default': 30
      });

      // Penalize hint usage
      const hintMultiplier = showHint ? 0.5 : 1;
      
      const knowledgeReward = Math.floor((baseKnowledge + (streak * 10)) * hintMultiplier);
      const cultureReward = Math.floor((baseCulture + (streak * 5)) * hintMultiplier);
      updateResources({ knowledge: knowledgeReward, culture: cultureReward });
    } else {
      setStreak(0);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Trophy className="w-20 h-20 text-gold mb-6 opacity-50" />
        <h2 className="text-3xl font-serif font-bold text-content mb-4">Challenge Complete!</h2>
        <p className="text-content/70 max-w-md">You have answered all available questions for your current civilization. Check back later or switch civilizations to learn more.</p>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.answer;

  // Age adaptive UI text
  const subtitleText = getAdaptiveText(gameState.ageGroup, {
    '6-8': "Let's play a fun game! Guess the right answer to win points.",
    '9-11': "Test your memory! Questions will get harder the more you play.",
    '12-14': "Historical Strategy: Answer correctly to build your civilization's knowledge.",
    '15-17': "Advanced History: Prove your historical reasoning to earn maximum legacy.",
    '18+': "Expert Analysis: These archives test deep historical evidence and understanding."
  });

  const allowsHints = ['6-8', '9-11', '12-14'].includes(gameState.ageGroup);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold gold-gradient-text mb-2">Historical Challenges</h1>
          <p className="text-content/70">{subtitleText}</p>
        </div>
        <div className="bg-surface px-4 py-2 rounded-xl border border-gold/30 flex items-center gap-3">
          <Flame className={`w-5 h-5 ${streak > 0 ? 'text-[#C56A3D] animate-pulse' : 'text-content/30'}`} />
          <span className="font-bold">{streak} Streak</span>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-gold/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 p-8 pointer-events-none text-8xl">
          <Brain />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="inline-block bg-main/80 border border-gold/30 px-3 py-1 rounded-full text-xs text-gold font-bold uppercase tracking-wider">
            Topic: {currentQuestion.type}
          </div>
          
          {allowsHints && !showResult && (
            <button 
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 text-xs font-bold text-gold hover:text-content transition-colors"
            >
              <Lightbulb className="w-4 h-4" /> 
              {showHint ? "Hint Active (Rewards x0.5)" : "Use Hint"}
            </button>
          )}
        </div>

        <h2 className="text-2xl font-serif font-bold text-content mb-8 leading-relaxed">
          {currentQuestion.q}
        </h2>

        {showHint && (
          <div className="mb-6 p-4 bg-gold/10 border border-gold/30 rounded-xl">
            <p className="text-sm text-gold font-bold">ðŸ’¡ Hint: {currentQuestion.explanation.substring(0, 40)}...</p>
          </div>
        )}

        <div className="space-y-4 relative z-10">
          {currentQuestion.options.map((opt, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-bold ";
            if (!showResult) {
              btnClass += "bg-main/80 border-content/20 text-content hover:border-gold hover:bg-gold/10";
            } else {
              if (idx === currentQuestion.answer) {
                btnClass += "bg-green-900/40 border-green-500 text-green-300"; // Correct answer
              } else if (idx === selectedAnswer && !isCorrect) {
                btnClass += "bg-red-900/40 border-red-500 text-red-300"; // Wrong selected
              } else {
                btnClass += "bg-main/40 border-content/10 text-content/30"; // Others
              }
            }

            return (
              <button 
                key={idx} 
                onClick={() => handleAnswer(idx)}
                disabled={showResult}
                className={btnClass}
              >
                <span className="mr-4 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className={`p-6 rounded-xl border mb-6 ${isCorrect ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
              <h3 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Excellent!' : 'Not quite.'}
              </h3>
              <p className="text-content mb-4">{currentQuestion.explanation}</p>
              
              {isCorrect && (
                <div className="flex gap-4 text-sm font-bold">
                  <span className="text-gold">Knowledge Earned</span>
                  <span className="text-[#C56A3D]">Culture Earned</span>
                </div>
              )}
            </div>

            <button 
              onClick={loadNextQuestion}
              className="w-full py-4 bg-gradient-to-r from-gold to-terracotta text-[#171B3A] font-bold text-lg rounded-xl shadow-lg hover:shadow-[#D4A64A]/40 transition-all"
            >
              NEXT CHALLENGE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;



