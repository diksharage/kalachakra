const fs = require('fs');

const content = `import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Play, CheckCircle, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

const Level1Runner = ({ onComplete, ageGroup }) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  
  const [gameState, setGameState] = useState('start'); // start, playing, hit, complete
  const [score, setScore] = useState(0);
  const [resources, setResources] = useState({ wood: 0, stone: 0, plants: 0, food: 0, water: 0 });
  const [progress, setProgress] = useState(0);

  // Game Engine Constants
  const TARGET_DISTANCE = 5000;
  const SPEED = 15;
  const PLAYER_Z = 100;
  const FOV = 300;
  const GROUND_Y = 100;
  
  // Game State Refs
  const engine = useRef({
    distance: 0,
    playerLane: 0, // -1, 0, 1
    playerY: GROUND_Y,
    vy: 0,
    isJumping: false,
    items: [],
    lastSpawnZ: 200
  });

  const laneX = { '-1': -150, '0': 0, '1': 150 };

  const spawnItem = (currentZ) => {
    const e = engine.current;
    if (currentZ - e.lastSpawnZ > 150) {
       const lane = Math.floor(Math.random() * 3) - 1;
       const isObstacle = Math.random() > 0.6;
       
       let type = 'wood';
       let icon = '🪵';
       
       if (isObstacle) {
          type = 'obstacle';
          icon = Math.random() > 0.5 ? '🪨' : '🪵';
       } else {
          const dist = e.distance;
          if (dist > 4000) { type = 'water'; icon = '💧'; }
          else if (dist > 2500) { type = 'food'; icon = '🌾'; }
          else {
             const rand = Math.random();
             if (rand < 0.4) { type = 'wood'; icon = '🪵'; }
             else if (rand < 0.7) { type = 'plants'; icon = '🌿'; }
             else { type = 'stone'; icon = '🪨'; }
          }
       }
       
       e.items.push({ type, icon, lane, z: 1200 + Math.random() * 200, active: true });
       e.lastSpawnZ = currentZ;
    }
  };

  const handleInput = (action) => {
    if (gameState !== 'playing') return;
    const e = engine.current;
    if (action === 'left' && e.playerLane > -1) e.playerLane--;
    if (action === 'right' && e.playerLane < 1) e.playerLane++;
    if (action === 'jump' && !e.isJumping) {
      e.isJumping = true;
      e.vy = -18;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') handleInput('left');
      if (e.key === 'ArrowRight' || e.key === 'd') handleInput('right');
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') handleInput('jump');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const touchStart = useRef({ x: 0, y: 0 });
  const onTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      if (dx > 0) handleInput('right');
      else handleInput('left');
    } else if (dy < -30) {
      handleInput('jump');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const draw = () => {
      if (gameState !== 'playing' && gameState !== 'hit') return;
      
      const e = engine.current;
      if (gameState === 'playing') {
        e.distance += SPEED;
        spawnItem(e.distance);
        
        if (e.isJumping) {
          e.playerY += e.vy;
          e.vy += 1.2;
          if (e.playerY >= GROUND_Y) {
            e.playerY = GROUND_Y;
            e.isJumping = false;
            e.vy = 0;
          }
        }
      }

      ctx.fillStyle = '#1a2b3c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.4;
      
      ctx.fillStyle = e.distance > 4000 ? '#3c5a45' : '#2d4c1e';
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(canvas.width, cy);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();
      
      ctx.strokeStyle = '#00000033';
      ctx.lineWidth = 2;
      [-150, -50, 50, 150].forEach(lx => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + lx * (FOV/10), canvas.height);
        ctx.stroke();
      });

      e.items.forEach(item => {
        if (!item.active) return;
        if (gameState === 'playing') item.z -= SPEED;
        
        if (gameState === 'playing' && Math.abs(item.z - PLAYER_Z) < 30 && item.lane === e.playerLane) {
          if (item.type === 'obstacle') {
             if (!e.isJumping || e.playerY > GROUND_Y - 40) {
               setGameState('hit');
               setTimeout(() => {
                 e.items = e.items.filter(i => i !== item);
                 setGameState('playing');
               }, 1000);
             }
          } else {
             item.active = false;
             setScore(s => s + 10);
             setResources(prev => ({ ...prev, [item.type]: prev[item.type] + 1 }));
          }
        }
      });

      e.items.sort((a, b) => b.z - a.z).forEach(item => {
        if (!item.active || item.z < 10) return;
        const scale = FOV / item.z;
        const sx = cx + laneX[item.lane] * scale;
        const sy = cy + GROUND_Y * scale;
        
        ctx.font = \`\${Math.max(10, 50 * scale)}px Arial\`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(item.icon, sx, sy);
      });

      const pScale = FOV / PLAYER_Z;
      const px = cx + laneX[e.playerLane] * pScale;
      const py = cy + e.playerY * pScale;
      
      ctx.font = \`\${50 * pScale}px Arial\`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      if (gameState === 'hit') {
        ctx.fillText('💥', px, py);
      } else {
        ctx.fillText(e.isJumping ? '🤸' : '🏃', px, py);
      }
      
      if (gameState === 'playing') {
         setProgress(Math.min(100, (e.distance / TARGET_DISTANCE) * 100));
         if (e.distance >= TARGET_DISTANCE) {
            setGameState('complete');
         }
      }

      animationId = requestAnimationFrame(draw);
    };
    
    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [gameState]);

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] flex flex-col rounded-2xl overflow-hidden border border-content/20 shadow-xl bg-black">
      
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="flex flex-col gap-2 pointer-events-auto">
           <h3 className="text-xl font-bold text-white uppercase tracking-wider drop-shadow-md">Survive & Gather</h3>
           <div className="flex gap-3">
             {Object.entries(resources).map(([k, v]) => (
                v > 0 && <span key={k} className="bg-black/50 text-white px-2 py-1 rounded border border-white/20 text-xs font-bold capitalize shadow-sm">
                  {k}: {v}
                </span>
             ))}
           </div>
        </div>
        <div className="text-right pointer-events-auto">
           <p className="text-gold font-bold text-lg drop-shadow-md">Score: {score}</p>
           <div className="w-32 h-3 bg-black/50 rounded-full border border-white/20 mt-1 overflow-hidden">
             <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: \`\${progress}%\` }} />
           </div>
        </div>
      </div>

      <canvas 
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full object-cover touch-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />

      {gameState === 'start' && (
        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-4">Journey to the River</h2>
          <p className="text-white/80 max-w-md mb-8 leading-relaxed">
            Run through the ancient forest, gather essential resources, and reach the water source! Watch out for rocks and logs.
          </p>
          
          <div className="flex gap-6 mb-8 text-white/70 text-sm">
             <div className="flex flex-col items-center gap-2"><div className="flex gap-1"><ArrowLeft className="w-5 h-5"/> <ArrowRight className="w-5 h-5"/></div> <span>Move (Swipe L/R)</span></div>
             <div className="flex flex-col items-center gap-2"><ArrowUp className="w-5 h-5"/> <span>Jump (Swipe Up)</span></div>
          </div>

          <button onClick={() => setGameState('playing')} className="px-8 py-4 bg-gold text-black font-bold rounded-xl text-xl hover:scale-105 transition-transform flex items-center gap-3">
            <Play fill="currentColor" /> Start Run
          </button>
        </div>
      )}

      {gameState === 'hit' && (
        <div className="absolute inset-0 z-30 bg-red-900/30 flex items-center justify-center pointer-events-none">
          <span className="text-6xl animate-bounce">⚠️</span>
        </div>
      )}

      {gameState === 'complete' && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in slide-in-from-bottom-8">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
             <CheckCircle className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Water Source Reached!</h2>
          <p className="text-white/80 mb-8">You successfully navigated the wilderness and gathered supplies.</p>
          
          <div className="bg-surface/30 border border-content/10 p-4 rounded-xl flex gap-4 mb-8">
             {Object.entries(resources).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center">
                  <span className="text-2xl mb-1">{k === 'wood' ? '🪵' : k === 'stone' ? '🪨' : k === 'plants' ? '🌿' : k === 'food' ? '🌾' : '💧'}</span>
                  <span className="text-white font-bold text-lg">+{v}</span>
                </div>
             ))}
          </div>

          <button onClick={() => onComplete(resources, score)} className="px-8 py-4 bg-blue-500 text-white font-bold rounded-xl text-xl hover:scale-105 transition-transform flex items-center gap-3 shadow-lg shadow-blue-500/20">
            Continue Journey <ArrowRight />
          </button>
        </div>
      )}
      
      {gameState === 'playing' && (
         <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-between px-8 text-white/30 pointer-events-none">
            <span>Swipe ↔️ to move</span>
            <span>Swipe ⬆️ to jump</span>
         </div>
      )}

    </div>
  );
};

export default Level1Runner;
`;

fs.writeFileSync('src/components/gameplay/Level1Runner.jsx', content);
