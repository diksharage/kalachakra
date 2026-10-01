import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';

const SPEED = 20;
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
  water: new THREE.MeshPhysicalMaterial({ color: '#00bcd4', transparent: true, opacity: 0.8, roughness: 0.1, transmission: 0.9 }),
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
};

// --- Character ---
const Player = ({ isPlaying, lane, isJumping }) => {
  const group = useRef();
  const leftLeg = useRef();
  const rightLeg = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const torso = useRef();

  const [visualLane, setVisualLane] = useState(0);

  useFrame((state, delta) => {
    // Smooth lane transition
    setVisualLane(THREE.MathUtils.lerp(visualLane, lane * LANE_WIDTH, 10 * delta));
    group.current.position.x = visualLane;

    // Smooth Jump
    if (isJumping) {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 3, 10 * delta);
    } else {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0, 10 * delta);
    }

    const t = state.clock.elapsedTime;

    if (isPlaying) {
      // Running Animation
      const runSpeed = 15;
      const angle = Math.sin(t * runSpeed);
      
      leftLeg.current.rotation.x = angle * 0.8;
      rightLeg.current.rotation.x = -angle * 0.8;
      leftArm.current.rotation.x = -angle * 0.8;
      rightArm.current.rotation.x = angle * 0.8;
      
      torso.current.position.y = 0.9 + Math.abs(Math.sin(t * runSpeed)) * 0.1;
      group.current.rotation.x = 0.1; 
    } else {
      // Idle Animation
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
        <mesh geometry={geos.torso} material={mats.cloth} castShadow receiveShadow />
        
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

// --- Environment ---
const EnvironmentSetup = ({ distance }) => {
  const worldGroup = useRef();

  const scenery = useMemo(() => {
    const items = [];
    // Plant trees and rocks randomly, extending 1500 units ahead
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
    // Loop the world wrapping around smoothly to simulate endless running
    const zOffset = distance % 1500;
    worldGroup.current.position.z = zOffset;
  });

  return (
    <group>
      {/* Static huge ground */}
      <mesh geometry={geos.ground} material={mats.ground} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -500]} receiveShadow />
      
      {/* Dirt Path running down the middle */}
      <mesh geometry={geos.path} material={mats.path} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -500]} receiveShadow />

      {/* Moving World Elements */}
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
const Scene = ({ isPlaying, lane, isJumping, distance }) => {
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
      <EnvironmentSetup distance={distance} />
      <Player isPlaying={isPlaying} lane={lane} isJumping={isJumping} />
    </>
  );
};

// --- Wrapper Component ---
const Level1Runner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [lane, setLane] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [distance, setDistance] = useState(0);

  const handleInput = (action) => {
    if (!isPlaying) return;
    if (action === 'left' && lane > -1) setLane(l => l - 1);
    if (action === 'right' && lane < 1) setLane(l => l + 1);
    if (action === 'jump' && !isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
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
  }, [isPlaying, lane, isJumping]);

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();
    
    const loop = (time) => {
       const dt = (time - lastTime) / 1000;
       lastTime = time;
       
       // Max cap delta time to avoid huge jumps when tab is inactive
       const safeDt = Math.min(dt, 0.1);
       
       if (isPlaying) {
          setDistance(d => d + SPEED * safeDt);
       }
       animationFrameId = requestAnimationFrame(loop);
    };
    
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-black border border-content/20">
      
      <Canvas shadows camera={{ fov: 60 }}>
         <SoftShadows size={15} samples={16} focus={0.5} />
         <Scene isPlaying={isPlaying} lane={lane} isJumping={isJumping} distance={distance} />
      </Canvas>

      {!isPlaying && (
        <div className="absolute inset-0 z-30 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <h2 className="text-5xl font-extrabold text-white mb-4 font-serif drop-shadow-lg">Wilderness Sandbox</h2>
          <p className="text-white/90 max-w-lg mb-8 text-lg leading-relaxed shadow-sm">
            Experience a gorgeous 3D prehistoric environment. Explore the running mechanics and lighting foundation.
          </p>
          <div className="flex gap-8 mb-8 bg-black/40 p-5 rounded-2xl border border-white/20 text-white font-bold backdrop-blur-md shadow-lg">
            <div className="text-center"><span className="text-2xl block mb-2">A / D</span>Move Left/Right</div>
            <div className="w-px bg-white/20" />
            <div className="text-center"><span className="text-2xl block mb-2">SPACE</span>Jump</div>
          </div>
          <button 
            onClick={() => setIsPlaying(true)} 
            className="px-10 py-5 bg-white text-black font-extrabold rounded-2xl text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Enter 3D World
          </button>
        </div>
      )}
      
      {isPlaying && (
         <div className="absolute top-4 left-4 bg-black/40 text-white px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 text-sm font-bold tracking-widest uppercase">
            Distance: {Math.floor(distance)}m
         </div>
      )}

    </div>
  );
};

export default Level1Runner;
