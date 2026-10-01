import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, Cloud, Stars, Float, Text, SoftShadows } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';
import { Play, RotateCcw, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Heart } from 'lucide-react';
import * as THREE from 'three';

const LANE_WIDTH = 2.5;
const SPEED = 25;
const MAX_DISTANCE = 5000;

// Reusable Primitive Geometries/Materials
const materials = {
  wood: new THREE.MeshStandardMaterial({ color: '#8B5A2B', roughness: 0.9 }),
  stone: new THREE.MeshStandardMaterial({ color: '#708090', roughness: 0.8 }),
  plant: new THREE.MeshStandardMaterial({ color: '#228B22', roughness: 0.6 }),
  food: new THREE.MeshStandardMaterial({ color: '#DAA520', roughness: 0.4 }),
  water: new THREE.MeshPhysicalMaterial({ color: '#00BFFF', transmission: 0.9, opacity: 1, transparent: true, roughness: 0 }),
  rock: new THREE.MeshStandardMaterial({ color: '#4a4a4a', roughness: 1 }),
  log: new THREE.MeshStandardMaterial({ color: '#3d2817', roughness: 0.9 }),
  skin: new THREE.MeshStandardMaterial({ color: '#8d5524', roughness: 0.4 }),
  cloth: new THREE.MeshStandardMaterial({ color: '#654321', roughness: 0.9 }),
  hair: new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.8 }),
  ground: new THREE.MeshStandardMaterial({ color: '#2e7d32', roughness: 1 }),
};

const geometries = {
  box: new THREE.BoxGeometry(1, 1, 1),
  sphere: new THREE.SphereGeometry(0.5, 16, 16),
  rock: new THREE.DodecahedronGeometry(1, 1),
  log: new THREE.CylinderGeometry(0.5, 0.5, 3, 8),
  capsule: new THREE.CapsuleGeometry(0.2, 0.5, 4, 8),
  ground: new THREE.PlaneGeometry(100, 400),
};

// Character Component
const PlayerCharacter = ({ lane, isJumping, isSliding, hitState }) => {
  const group = useRef();
  const [visualLane, setVisualLane] = useState(0);
  
  useFrame((state, delta) => {
    // Smooth lane transition
    setVisualLane(THREE.MathUtils.lerp(visualLane, lane * LANE_WIDTH, 10 * delta));
    group.current.position.x = visualLane;
    
    // Jump/Slide logic
    if (isJumping) {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 2.5, 10 * delta);
    } else if (isSliding) {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0.2, 15 * delta);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.PI / 2, 10 * delta);
    } else {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0, 10 * delta);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 10 * delta);
    }

    // Hit effect
    if (hitState) {
       group.current.rotation.z = Math.sin(state.clock.elapsedTime * 40) * 0.2;
    } else {
       group.current.rotation.z = 0;
    }

    // Running Animation (swinging arms/legs)
    if (!isJumping && !isSliding && !hitState) {
       const t = state.clock.elapsedTime * 15;
       group.current.children[1].rotation.x = Math.sin(t) * 0.8; // Left leg
       group.current.children[2].rotation.x = -Math.sin(t) * 0.8; // Right leg
       group.current.children[3].rotation.x = -Math.sin(t) * 0.8; // Left arm
       group.current.children[4].rotation.x = Math.sin(t) * 0.8; // Right arm
    }
  });

  return (
    <group ref={group} castShadow>
      {/* Torso */}
      <mesh geometry={geometries.capsule} material={materials.cloth} position={[0, 1, 0]} castShadow />
      {/* Left Leg */}
      <mesh geometry={geometries.capsule} material={materials.skin} position={[-0.3, 0.4, 0]} scale={[0.8, 0.8, 0.8]} castShadow />
      {/* Right Leg */}
      <mesh geometry={geometries.capsule} material={materials.skin} position={[0.3, 0.4, 0]} scale={[0.8, 0.8, 0.8]} castShadow />
      {/* Left Arm */}
      <mesh geometry={geometries.capsule} material={materials.skin} position={[-0.4, 1.2, 0]} scale={[0.7, 0.7, 0.7]} castShadow />
      {/* Right Arm */}
      <mesh geometry={geometries.capsule} material={materials.skin} position={[0.4, 1.2, 0]} scale={[0.7, 0.7, 0.7]} castShadow />
      {/* Head */}
      <mesh geometry={geometries.sphere} material={materials.skin} position={[0, 1.7, 0]} scale={[0.6, 0.6, 0.6]} castShadow />
      {/* Hair */}
      <mesh geometry={geometries.sphere} material={materials.hair} position={[0, 1.8, -0.05]} scale={[0.65, 0.65, 0.65]} />
    </group>
  );
};

// Environment Item (Collectibles & Obstacles)
const WorldItem = ({ type, lane, zOffset, isObstacle, onCollide }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.position.z += SPEED * delta;
    
    // Check collision (Player is at z=0)
    if (meshRef.current.position.z > -1 && meshRef.current.position.z < 1) {
       onCollide(type, lane, isObstacle, meshRef.current);
    }
    
    if (!isObstacle) {
       meshRef.current.rotation.y += 2 * delta;
       meshRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  if (isObstacle) {
    if (type === 'rock') {
      return (
         <mesh ref={meshRef} geometry={geometries.rock} material={materials.rock} position={[lane * LANE_WIDTH, 0.5, zOffset]} scale={[1, 1, 1]} castShadow receiveShadow />
      );
    } else if (type === 'log') {
      return (
         <mesh ref={meshRef} geometry={geometries.log} material={materials.log} position={[lane * LANE_WIDTH, 0.3, zOffset]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow />
      );
    }
  }

  // Collectibles
  const colorMap = { wood: '#8B5A2B', stone: '#708090', plants: '#228B22', food: '#DAA520', water: '#00BFFF' };
  const geoMap = { wood: geometries.box, stone: geometries.rock, plants: geometries.capsule, food: geometries.sphere, water: geometries.sphere };
  
  return (
    <Float floatIntensity={2} rotationIntensity={1} ref={meshRef} position={[lane * LANE_WIDTH, 1, zOffset]}>
      <mesh geometry={geoMap[type]} material={materials[type]} scale={[0.6, 0.6, 0.6]} castShadow />
      <pointLight color={colorMap[type]} intensity={0.5} distance={3} />
    </Float>
  );
};

// Ground & Scenery
const Scenery = () => {
  const groundRef = useRef();
  const trees = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
     x: (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 15),
     z: -Math.random() * 200,
     scale: 1 + Math.random() * 2
  })), []);

  useFrame((state, delta) => {
    // Scroll ground texture (if we had one) or just move trees
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -100]} receiveShadow>
        <planeGeometry args={[100, 400]} />
        <meshStandardMaterial color="#2e7d32" roughness={1} />
      </mesh>
      
      {/* Simple Trees */}
      {trees.map((t, i) => (
         <group key={i} position={[t.x, 0, t.z]} scale={[t.scale, t.scale, t.scale]}>
           <mesh geometry={geometries.log} material={materials.log} position={[0, 1.5, 0]} scale={[0.3, 1, 0.3]} castShadow />
           <mesh geometry={geometries.rock} material={materials.plant} position={[0, 3.5, 0]} scale={[1.5, 2, 1.5]} castShadow />
         </group>
      ))}
    </group>
  );
};

// Camera Controller
const CameraController = ({ isJumping, isSliding }) => {
  useFrame((state) => {
    const targetY = isJumping ? 4 : isSliding ? 2.5 : 3.5;
    state.camera.position.lerp(new THREE.Vector3(0, targetY, 6), 0.1);
    state.camera.lookAt(0, 1.5, -5);
  });
  return null;
};

const GameWorld = ({ engineState, setEngineState, onCollect, onHit, targetObjectives }) => {
  const [items, setItems] = useState([]);
  
  // Spawner
  useEffect(() => {
    if (engineState.status !== 'playing') return;
    
    let zCursor = -20;
    const interval = setInterval(() => {
       if (engineState.distance > MAX_DISTANCE) return;
       
       const lane = Math.floor(Math.random() * 3) - 1;
       const isObstacle = Math.random() > 0.5;
       
       let type = 'wood';
       if (isObstacle) {
          type = Math.random() > 0.5 ? 'rock' : 'log';
       } else {
          // Weighted random based on remaining objectives
          const missing = Object.keys(targetObjectives).filter(k => engineState.inventory[k] < targetObjectives[k]);
          if (missing.length > 0) {
             type = missing[Math.floor(Math.random() * missing.length)];
          } else {
             const dist = engineState.distance;
             if (dist > MAX_DISTANCE * 0.8) type = 'water';
             else if (dist > MAX_DISTANCE * 0.6) type = 'food';
             else type = ['wood', 'stone', 'plants'][Math.floor(Math.random()*3)];
          }
       }
       
       const newItem = { id: Math.random(), type, lane, zOffset: -100, isObstacle };
       setItems(prev => [...prev.slice(-30), newItem]); // keep max 30 items
       
       engineState.distance += SPEED * 0.4; // sync distance loosely
    }, 400);
    
    return () => clearInterval(interval);
  }, [engineState.status]);

  const handleCollide = (type, lane, isObstacle, mesh) => {
     if (engineState.status !== 'playing') return;
     if (mesh.userData.collected) return; // prevent multi-trigger
     
     // Only hit if in same lane
     if (lane === engineState.lane) {
        if (isObstacle) {
           // Ducking log or jumping rock
           if (type === 'log' && engineState.isSliding) return;
           if (type === 'rock' && engineState.isJumping) return;
           
           mesh.userData.collected = true;
           onHit();
        } else {
           mesh.userData.collected = true;
           mesh.visible = false; // Hide immediately
           onCollect(type);
        }
     }
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight castShadow position={[10, 20, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]} shadow-camera-far={50} shadow-camera-left={-20} shadow-camera-right={20} shadow-camera-top={20} shadow-camera-bottom={-20} />
      <Sky sunPosition={[100, 20, -100]} turbidity={0.1} />
      
      <Scenery />
      
      <PlayerCharacter 
         lane={engineState.lane} 
         isJumping={engineState.isJumping} 
         isSliding={engineState.isSliding} 
         hitState={engineState.hitState} 
      />
      
      {items.map(item => (
         <WorldItem key={item.id} {...item} onCollide={handleCollide} />
      ))}
      
      <CameraController isJumping={engineState.isJumping} isSliding={engineState.isSliding} />
    </>
  );
};


const Level1Runner = ({ onComplete, ageGroup }) => {
  const { theme } = useTheme();
  const targetObjectives = { wood: 3, stone: 2, plants: 3, food: 1, water: 1 };
  
  const [engineState, setEngineState] = useState({
     status: 'start', // start, playing, gameover, complete
     lane: 0,
     isJumping: false,
     isSliding: false,
     hitState: false,
     health: 3,
     distance: 0,
     inventory: { wood: 0, stone: 0, plants: 0, food: 0, water: 0 }
  });

  const handleInput = (action) => {
    if (engineState.status !== 'playing') return;
    setEngineState(prev => {
       const next = { ...prev };
       if (action === 'left' && prev.lane > -1) next.lane--;
       if (action === 'right' && prev.lane < 1) next.lane++;
       if (action === 'jump' && !prev.isJumping && !prev.isSliding) {
          next.isJumping = true;
          setTimeout(() => setEngineState(s => ({ ...s, isJumping: false })), 600);
       }
       if (action === 'slide' && !prev.isJumping && !prev.isSliding) {
          next.isSliding = true;
          setTimeout(() => setEngineState(s => ({ ...s, isSliding: false })), 600);
       }
       return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (ev) => {
      if (ev.key === 'ArrowLeft' || ev.key === 'a') handleInput('left');
      if (ev.key === 'ArrowRight' || ev.key === 'd') handleInput('right');
      if (ev.key === 'ArrowUp' || ev.key === 'w' || ev.key === ' ') handleInput('jump');
      if (ev.key === 'ArrowDown' || ev.key === 's') handleInput('slide');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [engineState.status]);

  const touchStart = useRef({ x: 0, y: 0 });
  const onTouchStart = (ev) => {
    touchStart.current = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
  };
  const onTouchEnd = (ev) => {
    const dx = ev.changedTouches[0].clientX - touchStart.current.x;
    const dy = ev.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      if (dx > 0) handleInput('right'); else handleInput('left');
    } else if (Math.abs(dy) > 30) {
      if (dy < 0) handleInput('jump'); else handleInput('slide');
    }
  };

  const onCollect = (type) => {
     setEngineState(prev => {
        const next = { ...prev, inventory: { ...prev.inventory, [type]: prev.inventory[type] + 1 } };
        // Check win condition
        const allMet = Object.keys(targetObjectives).every(k => next.inventory[k] >= targetObjectives[k]);
        if (allMet && prev.distance >= MAX_DISTANCE * 0.9) {
           next.status = 'complete';
        }
        return next;
     });
  };

  const onHit = () => {
     setEngineState(prev => {
        if (prev.hitState) return prev; // immune
        const next = { ...prev, health: prev.health - 1, hitState: true };
        if (next.health <= 0) next.status = 'gameover';
        
        // Reset hit state after 1s
        setTimeout(() => setEngineState(s => ({ ...s, hitState: false })), 1000);
        return next;
     });
  };

  const restart = () => {
     setEngineState({
        status: 'playing',
        lane: 0, isJumping: false, isSliding: false, hitState: false,
        health: 3, distance: 0,
        inventory: { wood: 0, stone: 0, plants: 0, food: 0, water: 0 }
     });
  };

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-black border border-content/20" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      
      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 3, 6], fov: 60 }} className="w-full h-full">
         <SoftShadows size={10} samples={10} focus={0.5} />
         <GameWorld engineState={engineState} setEngineState={setEngineState} onCollect={onCollect} onHit={onHit} targetObjectives={targetObjectives} />
      </Canvas>

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 pointer-events-none">
        <div className="flex flex-col gap-2">
           <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">SURVIVAL RUN</h3>
           <div className="flex flex-col gap-1 bg-black/60 p-3 rounded-lg border border-white/20 backdrop-blur-sm pointer-events-auto">
             {Object.entries(targetObjectives).map(([k, max]) => {
                const cur = engineState.inventory[k];
                const done = cur >= max;
                return (
                  <div key={k} className={`flex items-center justify-between gap-4 text-sm font-bold uppercase tracking-widest ${done ? 'text-green-400' : 'text-white'}`}>
                    <span className="flex items-center gap-2">
                       {k === 'wood' ? '🪵' : k === 'stone' ? '🪨' : k === 'plants' ? '🌿' : k === 'food' ? '🌾' : '💧'} {k}
                    </span>
                    <span>{cur} / {max}</span>
                  </div>
                );
             })}
           </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
           <div className="flex gap-1 bg-black/60 p-2 rounded-lg border border-white/20 backdrop-blur-sm">
             {[1,2,3].map(h => (
                <Heart key={h} className={`w-6 h-6 ${h <= engineState.health ? 'text-red-500 fill-red-500' : 'text-white/20'}`} />
             ))}
           </div>
           <div className="text-right text-white font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mt-2">
             <p className="text-sm opacity-80 uppercase tracking-widest">Distance</p>
             <p className="text-xl">{Math.floor(engineState.distance)}m</p>
           </div>
        </div>
      </div>

      {/* OVERLAYS */}
      {engineState.status === 'start' && (
        <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <h2 className="text-5xl font-extrabold text-white mb-4 font-serif">Wilderness Survival</h2>
          <p className="text-white/90 max-w-lg mb-8 text-lg">
            Navigate the harsh ancient environment. Collect all required resources and reach the water source to survive.
          </p>
          
          <div className="flex gap-8 mb-8 bg-white/10 p-4 rounded-xl border border-white/20 text-white font-bold">
            <div className="text-center"><span className="text-2xl block mb-2">⬅️ ➡️</span>Move / Swipe</div>
            <div className="w-px bg-white/20" />
            <div className="text-center"><span className="text-2xl block mb-2">⬆️</span>Jump / Swipe Up</div>
            <div className="w-px bg-white/20" />
            <div className="text-center"><span className="text-2xl block mb-2">⬇️</span>Duck / Swipe Down</div>
          </div>

          <button onClick={() => setEngineState(s => ({ ...s, status: 'playing' }))} className="px-10 py-5 bg-gold text-black font-extrabold rounded-2xl text-xl hover:scale-105 transition-transform flex items-center gap-3">
            <Play fill="currentColor" /> Start Survival Run
          </button>
        </div>
      )}

      {engineState.status === 'gameover' && (
        <div className="absolute inset-0 z-40 bg-red-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <h2 className="text-5xl font-extrabold text-red-500 mb-2">GAME OVER</h2>
          <p className="text-white/80 mb-8 text-lg">You succumbed to the hazards of the wilderness.</p>
          <button onClick={restart} className="px-10 py-5 bg-red-600 text-white font-bold rounded-2xl text-xl hover:scale-105 transition-transform flex items-center gap-3">
            <RotateCcw /> Retry Survival
          </button>
        </div>
      )}

      {engineState.status === 'complete' && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in slide-in-from-bottom-8">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
             <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Survival Successful!</h2>
          <p className="text-white/80 mb-8 text-lg max-w-md">You gathered the required supplies and secured a safe water source for your community.</p>
          
          <button onClick={() => onComplete(engineState.inventory, Math.floor(engineState.distance))} className="px-10 py-5 bg-green-600 text-white font-bold rounded-2xl text-xl hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(22,163,74,0.4)]">
            Establish Camp <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Level1Runner;
