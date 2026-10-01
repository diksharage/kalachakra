import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Play, CheckCircle, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

const Level1Runner = ({ onComplete, ageGroup }) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [resources, setResources] = useState({ wood: 0, stone: 0, plants: 0, food: 0, water: 0 });
  const [progress, setProgress] = useState(0);

  // Engine Constants
  const TARGET_DISTANCE = 6000;
  const SPEED = 25;
  const PLAYER_Z = 100;
  const FOV = 400;
  const GROUND_Y = 100;
  
  const engine = useRef({
    distance: 0,
    playerLane: 0, // -1, 0, 1
    visualLane: 0, // for smooth transition
    playerY: GROUND_Y,
    vy: 0,
    isJumping: false,
    items: [],
    scenery: [],
    lastSpawnZ: 200,
    lastSceneryZ: 200,
    cameraShake: 0
  });

  const laneX = { '-1': -250, '0': 0, '1': 250 };
  
  // Resource config
  const resConfig = {
     wood: { color: '#8B5A2B', icon: '🪵', label: 'Wood' },
     stone: { color: '#708090', icon: '🪨', label: 'Stone' },
     plants: { color: '#228B22', icon: '🌿', label: 'Plants' },
     food: { color: '#DAA520', icon: '🌾', label: 'Food' },
     water: { color: '#00BFFF', icon: '💧', label: 'Water' }
  };

  const spawnScenery = (currentZ) => {
    const e = engine.current;
    if (currentZ - e.lastSceneryZ > 100) {
       e.scenery.push({
          side: Math.random() > 0.5 ? 1 : -1,
          type: Math.random() > 0.3 ? 'tree' : 'rock',
          xOffset: 400 + Math.random() * 400,
          z: 2500,
          scale: 1 + Math.random()
       });
       e.lastSceneryZ = currentZ;
    }
  };

  const spawnItem = (currentZ) => {
    const e = engine.current;
    if (currentZ - e.lastSpawnZ > 200) {
       const lane = Math.floor(Math.random() * 3) - 1;
       const isObstacle = Math.random() > 0.6;
       
       let type = 'wood';
       if (isObstacle) {
          type = 'obstacle';
       } else {
          const dist = e.distance;
          if (dist > 5000) type = 'water';
          else if (dist > 3000) type = 'food';
          else {
             const r = Math.random();
             if (r < 0.4) type = 'wood';
             else if (r < 0.7) type = 'plants';
             else type = 'stone';
          }
       }
       
       e.items.push({ 
          type, 
          lane, 
          z: 2500, 
          active: true,
          isLog: isObstacle ? Math.random() > 0.5 : false
       });
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
      e.vy = -22;
    }
  };

  useEffect(() => {
    const handleKeyDown = (ev) => {
      if (ev.key === 'ArrowLeft' || ev.key === 'a') handleInput('left');
      if (ev.key === 'ArrowRight' || ev.key === 'd') handleInput('right');
      if (ev.key === 'ArrowUp' || ev.key === 'w' || ev.key === ' ') handleInput('jump');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const touchStart = useRef({ x: 0, y: 0 });
  const onTouchStart = (ev) => {
    touchStart.current = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
  };
  const onTouchEnd = (ev) => {
    const dx = ev.changedTouches[0].clientX - touchStart.current.x;
    const dy = ev.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      if (dx > 0) handleInput('right');
      else handleInput('left');
    } else if (dy < -30) {
      handleInput('jump');
    }
  };

  // Drawing helpers
  const drawPlayer = (ctx, px, py, scale, runCycle, isJumping, hit) => {
     ctx.save();
     ctx.translate(px, py);
     ctx.scale(scale, scale);
     
     if (hit) {
        ctx.fillStyle = 'red';
        ctx.globalAlpha = 0.5;
        ctx.beginPath(); ctx.arc(0, -60, 80, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1.0;
     }

     const swing = isJumping ? 0 : Math.sin(runCycle * Math.PI * 2);
     
     // Shadow
     ctx.fillStyle = 'rgba(0,0,0,0.3)';
     ctx.beginPath();
     ctx.ellipse(0, 5, 30, 10, 0, 0, Math.PI*2);
     ctx.fill();

     // Left Leg
     ctx.strokeStyle = '#5c4033'; ctx.lineWidth = 12; ctx.lineCap = 'round';
     ctx.beginPath(); ctx.moveTo(-10, -40); ctx.lineTo(-10 + swing*20, -10); ctx.stroke();
     // Right Leg
     ctx.beginPath(); ctx.moveTo(10, -40); ctx.lineTo(10 - swing*20, -10); ctx.stroke();

     // Body (Hide wrap)
     ctx.fillStyle = '#8b5a2b';
     ctx.beginPath();
     ctx.moveTo(-20, -90);
     ctx.lineTo(20, -90);
     ctx.lineTo(15, -40);
     ctx.lineTo(-15, -40);
     ctx.fill();

     // Left Arm
     ctx.strokeStyle = '#7b533f'; ctx.lineWidth = 10;
     ctx.beginPath(); ctx.moveTo(-25, -80); ctx.lineTo(-30 - swing*15, -50); ctx.stroke();
     // Right Arm
     ctx.beginPath(); ctx.moveTo(25, -80); ctx.lineTo(30 + swing*15, -50); ctx.stroke();

     // Head
     ctx.fillStyle = '#7b533f';
     ctx.beginPath(); ctx.arc(0, -110, 18, 0, Math.PI*2); ctx.fill();
     // Hair
     ctx.fillStyle = '#1a1a1a';
     ctx.beginPath(); ctx.arc(0, -115, 20, Math.PI, Math.PI*2); ctx.fill();

     ctx.restore();
  };

  const drawObstacle = (ctx, x, y, scale, isLog) => {
     ctx.save();
     ctx.translate(x, y);
     ctx.scale(scale, scale);
     
     // shadow
     ctx.fillStyle = 'rgba(0,0,0,0.4)';
     ctx.beginPath(); ctx.ellipse(0, 0, isLog ? 50 : 40, 15, 0, 0, Math.PI*2); ctx.fill();

     if (isLog) {
        ctx.fillStyle = '#4a2f1d';
        ctx.fillRect(-45, -30, 90, 30);
        ctx.fillStyle = '#5c3a21';
        ctx.beginPath(); ctx.ellipse(-45, -15, 10, 15, 0, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#d2b48c';
        ctx.beginPath(); ctx.ellipse(45, -15, 10, 15, 0, 0, Math.PI*2); ctx.fill();
     } else {
        ctx.fillStyle = '#696969';
        ctx.beginPath();
        ctx.moveTo(-30, 0); ctx.lineTo(-40, -20); ctx.lineTo(-15, -45);
        ctx.lineTo(15, -50); ctx.lineTo(35, -25); ctx.lineTo(30, 0);
        ctx.fill();
        ctx.fillStyle = '#808080';
        ctx.beginPath();
        ctx.moveTo(-15, -45); ctx.lineTo(15, -50); ctx.lineTo(10, -20); ctx.lineTo(-10, -20);
        ctx.fill();
     }
     ctx.restore();
  };

  const drawCollectible = (ctx, x, y, scale, type, hoverCycle) => {
     ctx.save();
     ctx.translate(x, y - 30 + Math.sin(hoverCycle)*10);
     ctx.scale(scale, scale);
     
     const conf = resConfig[type];
     // Aura
     ctx.fillStyle = conf.color;
     ctx.globalAlpha = 0.3;
     ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI*2); ctx.fill();
     ctx.globalAlpha = 0.6;
     ctx.beginPath(); ctx.arc(0, 0, 25, 0, Math.PI*2); ctx.fill();
     ctx.globalAlpha = 1.0;
     
     ctx.font = '30px Arial';
     ctx.textAlign = 'center';
     ctx.textBaseline = 'middle';
     ctx.fillText(conf.icon, 0, 0);
     
     ctx.restore();
  };

  const drawScenery = (ctx, x, y, scale, type) => {
     ctx.save();
     ctx.translate(x, y);
     ctx.scale(scale, scale);
     if (type === 'tree') {
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(-10, -100, 20, 100);
        ctx.fillStyle = '#1b5e20';
        ctx.beginPath(); ctx.moveTo(0, -200); ctx.lineTo(60, -80); ctx.lineTo(-60, -80); ctx.fill();
        ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(70, -30); ctx.lineTo(-70, -30); ctx.fill();
     } else {
        ctx.fillStyle = '#546e7a';
        ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(0, -80); ctx.lineTo(40, 0); ctx.fill();
     }
     ctx.restore();
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
        spawnScenery(e.distance);
        
        // smooth visual lane
        e.visualLane += (laneX[e.playerLane] - e.visualLane) * 0.15;
        
        if (e.cameraShake > 0) e.cameraShake -= 1;

        if (e.isJumping) {
          e.playerY += e.vy;
          e.vy += 1.8;
          if (e.playerY >= GROUND_Y) {
            e.playerY = GROUND_Y;
            e.isJumping = false;
            e.vy = 0;
          }
        }
      }

      // Draw Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height*0.4);
      skyGrad.addColorStop(0, '#87CEEB'); // day sky
      if (e.distance > 4000) {
         skyGrad.addColorStop(0, '#FF8C00'); // evening transition near water
         skyGrad.addColorStop(1, '#FFD700');
      } else {
         skyGrad.addColorStop(1, '#E0F6FF');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Mountains
      ctx.fillStyle = '#78909c';
      ctx.beginPath();
      const mOffset = (e.distance * 0.05) % canvas.width;
      ctx.moveTo(-mOffset, canvas.height*0.4);
      ctx.lineTo(200 - mOffset, canvas.height*0.1);
      ctx.lineTo(400 - mOffset, canvas.height*0.4);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(300 - mOffset, canvas.height*0.4);
      ctx.lineTo(550 - mOffset, canvas.height*0.15);
      ctx.lineTo(800 - mOffset, canvas.height*0.4);
      ctx.fill();

      // Camera Shake
      const shakeX = (Math.random()-0.5) * e.cameraShake;
      const shakeY = (Math.random()-0.5) * e.cameraShake;
      
      const cx = canvas.width / 2 + shakeX;
      const cy = canvas.height * 0.4 + Math.sin(e.distance*0.05)*2 + shakeY; // head bob
      
      // Draw Ground with perspective lines
      ctx.fillStyle = e.distance > 4500 ? '#2e7d32' : '#33691E';
      ctx.fillRect(0, cy, canvas.width, canvas.height - cy);
      
      // Checkerboard / Strip effect for speed
      ctx.fillStyle = e.distance > 4500 ? '#1b5e20' : '#1b5e20';
      const stripeW = 200;
      const zOffset = e.distance % stripeW;
      
      // Path drawing
      ctx.fillStyle = '#8d6e63'; // dirt path
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy);
      ctx.lineTo(cx + 50, cy);
      ctx.lineTo(cx + 400, canvas.height);
      ctx.lineTo(cx - 400, canvas.height);
      ctx.fill();

      // Filter active items and scenery
      e.items = e.items.filter(i => i.z > 0 && i.active);
      e.scenery = e.scenery.filter(s => s.z > 0);
      
      if (gameState === 'playing') {
         e.items.forEach(i => i.z -= SPEED);
         e.scenery.forEach(s => s.z -= SPEED);
      }

      // Collisions
      e.items.forEach(item => {
        if (gameState === 'playing' && item.active && Math.abs(item.z - PLAYER_Z) < 40) {
           const onSameLane = item.lane === e.playerLane;
           if (onSameLane) {
             if (item.type === 'obstacle') {
                if (!e.isJumping || e.playerY > GROUND_Y - 50) {
                   setGameState('hit');
                   e.cameraShake = 20;
                   setTimeout(() => {
                     item.active = false;
                     setGameState('playing');
                   }, 800);
                }
             } else {
                item.active = false;
                setScore(s => s + 20);
                setResources(prev => ({ ...prev, [item.type]: prev[item.type] + 1 }));
             }
           }
        }
      });

      // Render Pipeline (sort by Z descending)
      const renderables = [
         ...e.items.map(i => ({ ...i, isScenery: false })),
         ...e.scenery.map(s => ({ ...s, isScenery: true }))
      ].sort((a, b) => b.z - a.z);

      renderables.forEach(r => {
         if (r.z < 10) return;
         const scale = FOV / r.z;
         const sy = cy + GROUND_Y * scale;
         
         if (r.isScenery) {
            const sx = cx + (r.xOffset * r.side) * scale;
            drawScenery(ctx, sx, sy, scale * r.scale, r.type);
         } else {
            const sx = cx + laneX[r.lane] * scale;
            if (r.type === 'obstacle') {
               drawObstacle(ctx, sx, sy, scale, r.isLog);
            } else {
               drawCollectible(ctx, sx, sy, scale, r.type, e.distance*0.05);
            }
         }
      });

      // Draw Player
      const pScale = FOV / PLAYER_Z;
      const px = cx + e.visualLane * pScale;
      const py = cy + e.playerY * pScale;
      
      const runCycle = (e.distance % 200) / 200;
      drawPlayer(ctx, px, py, pScale, runCycle, e.isJumping, gameState === 'hit');
      
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
    <div className="relative w-full h-[65vh] min-h-[450px] flex flex-col rounded-2xl overflow-hidden border border-content/20 shadow-2xl bg-black">
      
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="flex flex-col gap-2 pointer-events-auto">
           <h3 className="text-xl font-bold text-white uppercase tracking-wider drop-shadow-md">Survive & Gather</h3>
           <div className="flex gap-3 flex-wrap max-w-xs">
             {Object.entries(resources).map(([k, v]) => (
                v > 0 && <span key={k} className="bg-black/60 text-white px-3 py-1.5 rounded-lg border border-white/20 text-xs font-bold capitalize shadow-sm flex items-center gap-2">
                  <span className="text-lg">{resConfig[k].icon}</span> {v}
                </span>
             ))}
           </div>
        </div>
        <div className="text-right pointer-events-auto">
           <p className="text-gold font-bold text-2xl drop-shadow-md mb-1">{score}</p>
           <div className="w-32 md:w-48 h-3 bg-black/50 rounded-full border border-white/20 overflow-hidden shadow-inner">
             <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-300 transition-all duration-300" style={{ width: `${progress}%` }} />
           </div>
        </div>
      </div>

      <canvas 
        ref={canvasRef}
        width={1000}
        height={600}
        className="w-full h-full object-cover touch-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />

      {gameState === 'start' && (
        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg font-serif">The River Journey</h2>
          <p className="text-white/90 max-w-lg mb-8 text-lg leading-relaxed drop-shadow">
            Run through the ancient wilderness to find a reliable water source for your early community. 
            Gather crucial natural resources along the way and avoid natural hazards.
          </p>
          
          <div className="flex gap-8 mb-10 text-white/80 font-bold bg-black/40 px-6 py-4 rounded-2xl border border-white/10">
             <div className="flex flex-col items-center gap-3">
               <div className="flex gap-1 bg-white/20 p-2 rounded-lg"><ArrowLeft className="w-6 h-6"/> <ArrowRight className="w-6 h-6"/></div> 
               <span>Move / Swipe</span>
             </div>
             <div className="w-px bg-white/20" />
             <div className="flex flex-col items-center gap-3">
               <div className="bg-white/20 p-2 rounded-lg"><ArrowUp className="w-6 h-6"/></div> 
               <span>Jump / Swipe Up</span>
             </div>
          </div>

          <button onClick={() => setGameState('playing')} className="px-10 py-5 bg-gold text-black font-extrabold rounded-2xl text-xl hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(218,165,32,0.4)]">
            <Play fill="currentColor" className="w-6 h-6" /> Begin Journey
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
          <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(59,130,246,0.4)]">
             <CheckCircle className="w-12 h-12 text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 font-serif">Sanctuary Reached!</h2>
          <p className="text-white/80 mb-8 text-lg max-w-md">You successfully navigated the wilderness, securing vital resources for your community's survival.</p>
          
          <div className="bg-surface/40 border border-content/10 p-6 rounded-2xl flex flex-wrap justify-center gap-6 mb-10 shadow-2xl">
             {Object.entries(resources).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center">
                  <span className="text-3xl mb-2 filter drop-shadow-md">{resConfig[k].icon}</span>
                  <span className="text-white font-extrabold text-xl">+{v}</span>
                </div>
             ))}
          </div>

          <button onClick={() => onComplete(resources, score)} className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl text-xl hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            Establish Camp <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </div>
  );
};

export default Level1Runner;
