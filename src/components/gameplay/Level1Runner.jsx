import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, SoftShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Play, RotateCcw, AlertTriangle } from 'lucide-react';

const SPEED = 25;
const LANE_WIDTH = 2.5;

// --- Materials ---
const mats = {
  skin: new THREE.MeshStandardMaterial({ color: '#8d5524', roughness: 0.6 }),
  cloth: new THREE.MeshStandardMaterial({ color: '#5c4033', roughness: 0.9 }),
  hair: new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.8 }),
  ground: new THREE.MeshStandardMaterial({ color: '#2e7d32', roughness: 1 }),
  path: new THREE.MeshStandardMaterial({ color: '#6d4c41', roughness: 1 }),
  treeTrunk: new THREE.MeshStandardMaterial({ color: '#3e2723', roughness: 1 }),
  treeLeaves: new THREE.MeshStandardMaterial({ color: '#1b5e20', roughness: 0.8 }),
  rock: new THREE.MeshStandardMaterial({ color: '#607d8b', roughness: 0.7 }),
  wood: new THREE.MeshStandardMaterial({ color: '#8B5A2B', roughness: 0.9 }),
  stone: new THREE.MeshStandardMaterial({ color: '#708090', roughness: 0.8 }),
  plants: new THREE.MeshStandardMaterial({ color: '#228B22', roughness: 0.6 }),
  food: new THREE.MeshStandardMaterial({ color: '#DAA520', roughness: 0.4 }),
  water: new THREE.MeshPhysicalMaterial({ color: '#00BFFF', transparent: true, opacity: 0.8, roughness: 0.1, transmission: 0.9 }),
};

// --- Geometries ---
const geos = {
  head: new THREE.SphereGeometry(0.35, 16, 16),
  torso: new THREE.CapsuleGeometry(0.3, 0.6, 4, 8),
  limb: new THREE.CapsuleGeometry(0.15, 0.4, 4, 8),
  ground: new THREE.PlaneGeometry(500, 2000),
  path: new THREE.PlaneGeometry(10, 2000),
  rock: new THREE.DodecahedronGeometry(1, 1),
  trunk: new THREE.CylinderGeometry(0.2, 0.4, 2, 8),
  leaves: new THREE.ConeGeometry(1.5, 3, 8),
  box: new THREE.BoxGeometry(1, 1, 1),
  sphere: new THREE.SphereGeometry(0.6, 16, 16),
  capsule: new THREE.CapsuleGeometry(0.3, 0.5, 4, 8),
  waterPool: new THREE.PlaneGeometry(15, 15)
};

const objectives = { wood: 3, stone: 2, plants: 3, food: 1 };

// --- Character ---
const Player = ({ isPlaying, lane, isJumping, hitEffect }) => {
  const group = useRef();
  const leftLeg = useRef();
  const rightLeg = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const torso = useRef();

  const [visualLane, setVisualLane] = useState(0);

  useFrame((state, delta) => {
    setVisualLane(THREE.MathUtils.lerp(visualLane, lane * LANE_WIDTH, 10 * delta));
    group.current.position.x = visualLane;

    if (isJumping) {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 3.5, 10 * delta);
    } else {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0, 10 * delta);
    }

    const t = state.clock.elapsedTime;

    if (hitEffect) {
       group.current.rotation.z = Math.sin(t * 30) * 0.2;
    } else {
       group.current.rotation.z = 0;
    }

    if (isPlaying) {
      const runSpeed = 15;
      const angle = Math.sin(t * runSpeed);
      leftLeg.current.rotation.x = angle * 0.8;
      rightLeg.current.rotation.x = -angle * 0.8;
      leftArm.current.rotation.x = -angle * 0.8;
      rightArm.current.rotation.x = angle * 0.8;
      torso.current.position.y = 0.9 + Math.abs(Math.sin(t * runSpeed)) * 0.1;
      group.current.rotation.x = 0.1; 
    } else {
      leftLeg.current.rotation.x = 0;
      rightLeg.current.rotation.x = 0;
      leftArm.current.rotation.x = Math.sin(t * 2) * 0.1;
      rightArm.current.rotation.x = -Math.sin(t * 2) * 0.1;
      torso.current.position.y = 0.9 + Math.sin(t * 3) * 0.05; 
      group.current.rotation.x = 0;
    }
  });

  return (
    <group ref={group}>
      <group ref={torso} position={[0, 0.9, 0]}>
        <mesh geometry={geos.torso} material={hitEffect ? mats.skin : mats.cloth} castShadow receiveShadow />
        <group position={[0, 0.7, 0]}>
          <mesh geometry={geos.head} material={mats.skin} castShadow />
          <mesh geometry={geos.head} material={mats.hair} position={[0, 0.05, -0.05]} scale={[1.05, 1.05, 1.05]} castShadow />
        </group>
        <group position={[-0.45, 0.2, 0]}>
          <mesh ref={leftArm} geometry={geos.limb} material={mats.skin} position={[0, -0.3, 0]} castShadow />
        </group>
        <group position={[0.45, 0.2, 0]}>
          <mesh ref={rightArm} geometry={geos.limb} material={mats.skin} position={[0, -0.3, 0]} castShadow />
        </group>
        <group position={[-0.2, -0.4, 0]}>
          <mesh ref={leftLeg} geometry={geos.limb} material={mats.skin} position={[0, -0.3, 0]} castShadow />
        </group>
        <group position={[0.2, -0.4, 0]}>
          <mesh ref={rightLeg} geometry={geos.limb} material={mats.skin} position={[0, -0.3, 0]} castShadow />
        </group>
      </group>
    </group>
  );
};

// --- Items & Obstacles ---
const WorldItem = ({ item, onCollide }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (!item.active) return;
    
    // Z collision check
    if (item.z > -1 && item.z < 1) {
       onCollide(item);
    }
    
    if (!item.isObstacle && item.type !== 'waterSource') {
       meshRef.current.rotation.y += 2 * delta;
       meshRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  if (!item.active) return null;

  if (item.type === 'waterSource') {
    return (
      <mesh ref={meshRef} geometry={geos.waterPool} material={mats.water} position={[0, 0.05, item.z]} rotation={[-Math.PI/2, 0, 0]} receiveShadow />
    );
  }

  if (item.isObstacle) {
    if (item.type === 'rock') {
      return <mesh ref={meshRef} geometry={geos.rock} material={mats.rock} position={[item.lane * LANE_WIDTH, 0.5, item.z]} castShadow receiveShadow />;
    } else {
      return <mesh ref={meshRef} geometry={geos.trunk} material={mats.treeTrunk} position={[item.lane * LANE_WIDTH, 0.3, item.z]} rotation={[Math.PI/2, 0, 0]} scale={[1,2,1]} castShadow receiveShadow />;
    }
  }

  const colorMap = { wood: '#8B5A2B', stone: '#708090', plants: '#228B22', food: '#DAA520' };
  const geoMap = { wood: geos.box, stone: geos.rock, plants: geos.capsule, food: geos.sphere };
  
  return (
    <Float floatIntensity={2} rotationIntensity={1}>
      <mesh ref={meshRef} geometry={geoMap[item.type]} material={mats[item.type]} position={[item.lane * LANE_WIDTH, 1, item.z]} scale={[0.6, 0.6, 0.6]} castShadow />
      <pointLight position={[item.lane * LANE_WIDTH, 1, item.z]} color={colorMap[item.type]} intensity={0.5} distance={3} />
    </Float>
  );
};

// --- Environment ---
const EnvironmentSetup = ({ distance, engineRef, onCollide }) => {
  const worldGroup = useRef();

  const scenery = useMemo(() => {
    const items = [];
    for (let i = 0; i < 300; i++) {
      const z = -(Math.random() * 1500); 
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (6 + Math.random() * 50); 
      const scale = 0.5 + Math.random() * 2;
      const isRock = Math.random() > 0.7;
      items.push({ x, z, scale, isRock, id: i });
    }
    return items;
  }, []);

  useFrame(() => {
    const zOffset = distance % 1500;
    worldGroup.current.position.z = zOffset;
  });

  return (
    <group>
      <mesh geometry={geos.ground} material={mats.ground} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -500]} receiveShadow />
      <mesh geometry={geos.path} material={mats.path} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -500]} receiveShadow />
      
      {/* Dynamic spawned items */}
      {engineRef.current.items.map(item => (
        <WorldItem key={item.id} item={item} onCollide={onCollide} />
      ))}

      <group ref={worldGroup}>
        {scenery.map(item => (
          item.isRock ? (
            <mesh key={item.id} geometry={geos.rock} material={mats.rock} position={[item.x, item.scale*0.5, item.z]} scale={[item.scale, item.scale, item.scale]} castShadow receiveShadow />
          ) : (
            <group key={item.id} position={[item.x, 0, item.z]} scale={[item.scale, item.scale, item.scale]}>
              <mesh geometry={geos.trunk} material={mats.treeTrunk} position={[0, 1, 0]} castShadow receiveShadow />
              <mesh geometry={geos.leaves} material={mats.treeLeaves} position={[0, 3, 0]} castShadow receiveShadow />
            </group>
          )
        ))}
      </group>
    </group>
  );
};

// --- Camera ---
const CameraController = () => {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(0, 4, 8), 0.1);
    state.camera.lookAt(0, 2, -10);
  });
  return null;
};

// --- Main Render Scene ---
const Scene = ({ uiState, engineRef, onCollide }) => {
  return (
    <>
      <color attach="background" args={['#87CEEB']} />
      <fog attach="fog" args={['#87CEEB', 30, 200]} />
      
      <ambientLight intensity={0.6} />
      <directionalLight 
        castShadow 
        position={[40, 50, 20]} 
        intensity={1.5} 
        shadow-mapSize={[2048, 2048]} 
        shadow-camera-far={150} 
        shadow-camera-left={-40} 
        shadow-camera-right={40} 
        shadow-camera-top={40} 
        shadow-camera-bottom={-40} 
      />
      <Sky sunPosition={[100, 20, -100]} turbidity={0.1} rayleigh={0.5} />

      <CameraController />
      <EnvironmentSetup distance={engineRef.current.distance} engineRef={engineRef} onCollide={onCollide} />
      <Player isPlaying={uiState.status === 'playing'} lane={uiState.lane} isJumping={uiState.isJumping} hitEffect={uiState.hitEffect} />
    </>
  );
};

// --- Wrapper Component ---
const Level1Runner = ({ onComplete }) => {
  const [uiState, setUiState] = useState({
     status: 'start',
     lane: 0,
     isJumping: false,
     hitEffect: false,
     energy: 100,
     inventory: { wood: 0, stone: 0, plants: 0, food: 0 },
     message: ''
  });

  const engineRef = useRef({
     distance: 0,
     items: [],
     lastSpawnZ: -50
  });

  const handleInput = (action) => {
    if (uiState.status !== 'playing') return;
    setUiState(prev => {
       const next = { ...prev };
       if (action === 'left' && prev.lane > -1) next.lane--;
       if (action === 'right' && prev.lane < 1) next.lane++;
       if (action === 'jump' && !prev.isJumping) {
          next.isJumping = true;
          setTimeout(() => setUiState(s => ({ ...s, isJumping: false })), 500);
       }
       return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (ev) => {
      if (ev.key === 'ArrowLeft' || ev.key === 'a') handleInput('left');
      if (ev.key === 'ArrowRight' || ev.key === 'd') handleInput('right');
      if (ev.key === 'ArrowUp' || ev.key === 'w' || ev.key === ' ') handleInput('jump');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [uiState.status, uiState.lane, uiState.isJumping]);

  const showMessage = (msg) => {
     setUiState(prev => ({ ...prev, message: msg }));
     setTimeout(() => setUiState(prev => ({ ...prev, message: '' })), 2000);
  };

  const handleCollide = (item) => {
     if (uiState.status !== 'playing' || !item.active) return;
     item.active = false; // Mark handled
     
     if (item.type === 'waterSource') {
        setUiState(prev => {
           const done = Object.keys(objectives).every(k => prev.inventory[k] >= objectives[k]);
           if (done) {
              return { ...prev, status: 'complete' };
           } else {
              showMessage("Missing Resources! Keep searching!");
              return prev;
           }
        });
        return;
     }
     
     if (item.lane === uiState.lane) {
        if (item.isObstacle) {
           if (uiState.isJumping && item.type === 'log') return; // successfully jumped log
           
           setUiState(prev => {
              const newEnergy = Math.max(0, prev.energy - 25);
              return { 
                 ...prev, 
                 energy: newEnergy, 
                 hitEffect: true,
                 status: newEnergy === 0 ? 'gameover' : prev.status 
              };
           });
           setTimeout(() => setUiState(prev => ({ ...prev, hitEffect: false })), 500);
        } else {
           setUiState(prev => ({
              ...prev,
              inventory: { ...prev.inventory, [item.type]: prev.inventory[item.type] + 1 }
           }));
        }
     }
  };

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();
    
    const loop = (time) => {
       const dt = (time - lastTime) / 1000;
       lastTime = time;
       const safeDt = Math.min(dt, 0.1);
       
       if (uiState.status === 'playing') {
          engineRef.current.distance += SPEED * safeDt;
          
          // Move items
          engineRef.current.items.forEach(i => {
             if (i.active) i.z += SPEED * safeDt;
          });
          
          // Cleanup passed items
          engineRef.current.items = engineRef.current.items.filter(i => i.z < 20);
          
          // Spawn logic
          if (engineRef.current.distance > engineRef.current.lastSpawnZ) {
             const r = Math.random();
             const isObstacle = r < 0.4;
             let type = 'wood';
             
             // Check if we should spawn Water Source (every 500m)
             if (engineRef.current.distance > 0 && Math.floor(engineRef.current.distance) % 500 < 5) {
                // Spawn a water source pool spanning all lanes
                engineRef.current.items.push({ id: Math.random(), type: 'waterSource', lane: 0, z: -150, active: true, isObstacle: false });
                engineRef.current.lastSpawnZ = engineRef.current.distance + 150;
             } else {
                if (isObstacle) {
                   type = Math.random() > 0.5 ? 'rock' : 'log';
                } else {
                   // Prefer spawning missing objectives
                   const missing = Object.keys(objectives).filter(k => uiState.inventory[k] < objectives[k]);
                   if (missing.length > 0 && Math.random() > 0.3) {
                      type = missing[Math.floor(Math.random() * missing.length)];
                   } else {
                      type = ['wood', 'stone', 'plants', 'food'][Math.floor(Math.random()*4)];
                   }
                }
                const lane = Math.floor(Math.random() * 3) - 1;
                engineRef.current.items.push({ id: Math.random(), type, lane, z: -150, active: true, isObstacle });
                engineRef.current.lastSpawnZ = engineRef.current.distance + 20 + Math.random() * 40;
             }
          }
       }
       animationFrameId = requestAnimationFrame(loop);
    };
    
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [uiState.status, uiState.inventory]);

  const restart = () => {
     engineRef.current.distance = 0;
     engineRef.current.items = [];
     engineRef.current.lastSpawnZ = -50;
     setUiState({
        status: 'playing', lane: 0, isJumping: false, hitEffect: false,
        energy: 100, inventory: { wood: 0, stone: 0, plants: 0, food: 0 }, message: ''
     });
  };

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-black border border-content/20">
      
      <Canvas shadows camera={{ fov: 60 }}>
         <SoftShadows size={15} samples={16} focus={0.5} />
         <Scene uiState={uiState} engineRef={engineRef} onCollide={handleCollide} />
      </Canvas>

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 pointer-events-none">
        <div className="flex flex-col gap-2">
           <h3 className="text-xl font-bold text-white drop-shadow-lg uppercase tracking-widest">Survival Run</h3>
           <div className="flex flex-col gap-1 bg-black/70 p-3 rounded-lg border border-white/20 backdrop-blur-sm pointer-events-auto">
             {Object.entries(objectives).map(([k, max]) => {
                const cur = uiState.inventory[k];
                const done = cur >= max;
                return (
                  <div key={k} className={`flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest ${done ? 'text-green-400' : 'text-white'}`}>
                    <span>{k === 'wood' ? '🪵' : k === 'stone' ? '🪨' : k === 'plants' ? '🌿' : '🌾'} {k}</span>
                    <span>{cur} / {max}</span>
                  </div>
                );
             })}
           </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
           <div className="bg-black/70 px-4 py-2 rounded-lg border border-white/20 backdrop-blur-sm pointer-events-auto">
             <div className="text-xs text-white/80 font-bold uppercase tracking-widest mb-1">Energy</div>
             <div className="w-32 h-4 bg-black rounded-full overflow-hidden border border-white/10">
               <div className={`h-full transition-all duration-300 ${uiState.energy > 30 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${uiState.energy}%` }} />
             </div>
           </div>
        </div>
      </div>

      {/* IN-GAME MESSAGES */}
      {uiState.message && (
         <div className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-red-900/90 text-white px-6 py-3 rounded-xl border border-red-500/50 font-bold text-xl tracking-wider backdrop-blur-md animate-bounce z-20 shadow-2xl">
            {uiState.message}
         </div>
      )}

      {/* MENUS */}
      {uiState.status === 'start' && (
        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <h2 className="text-5xl font-extrabold text-white mb-4 font-serif drop-shadow-lg">Wilderness Survival</h2>
          <p className="text-white/90 max-w-lg mb-8 text-lg leading-relaxed shadow-sm">
            Collect the required resources and reach the water source! Avoid obstacles to maintain your energy.
          </p>
          <button onClick={() => setUiState(s => ({ ...s, status: 'playing' }))} className="px-10 py-5 bg-gold text-black font-extrabold rounded-2xl text-xl hover:scale-105 transition-transform shadow-xl flex items-center gap-2">
            <Play fill="currentColor" /> Begin Run
          </button>
        </div>
      )}

      {uiState.status === 'gameover' && (
        <div className="absolute inset-0 z-40 bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-5xl font-extrabold text-white mb-4">Energy Depleted</h2>
          <p className="text-white/80 mb-6 text-lg">You did not survive the wilderness.</p>
          <div className="flex gap-4 mb-8 bg-black/40 p-4 rounded-xl">
             {Object.entries(uiState.inventory).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center"><span className="text-xl">{v}</span><span className="text-xs uppercase text-white/50">{k}</span></div>
             ))}
          </div>
          <button onClick={restart} className="px-10 py-4 bg-red-600 text-white font-bold rounded-2xl text-xl hover:scale-105 transition-transform flex items-center gap-2">
            <RotateCcw /> Restart Level
          </button>
        </div>
      )}

      {uiState.status === 'complete' && (
        <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in slide-in-from-bottom-8">
          <h2 className="text-5xl font-bold text-green-400 mb-4 font-serif">Level Complete!</h2>
          <p className="text-white/80 mb-8 text-lg max-w-md">You gathered the required supplies and reached the water source safely.</p>
          <div className="bg-surface/40 border border-content/10 p-6 rounded-2xl flex flex-wrap justify-center gap-6 mb-10 shadow-2xl">
             {Object.entries(uiState.inventory).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center">
                  <span className="text-white font-extrabold text-2xl">{v}</span>
                  <span className="text-white/60 text-xs uppercase">{k}</span>
                </div>
             ))}
          </div>
          <button onClick={() => onComplete(uiState.inventory, Math.floor(engineRef.current.distance))} className="px-10 py-5 bg-green-600 text-white font-bold rounded-2xl text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(22,163,74,0.4)]">
            Continue Journey
          </button>
        </div>
      )}
    </div>
  );
};

export default Level1Runner;
