const fs = require('fs');

const content = \import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, SoftShadows, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Play, RotateCcw, AlertTriangle } from 'lucide-react';
import { useAudio } from '../../context/AudioContext'; // <-- ADDED AUDIO

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
  waterPool: new THREE.PlaneGeometry(15, 15),
  spear: new THREE.CylinderGeometry(0.02, 0.02, 1.5, 4)
};

const objectives = { wood: 3, stone: 2, plants: 3, food: 1 };

// --- Particle System ---
const ParticleEffect = ({ position, color, onComplete }) => {
  const mesh = useRef();
  useFrame((state, delta) => {
     if (!mesh.current) return;
     mesh.current.scale.x += delta * 15;
     mesh.current.scale.y += delta * 15;
     mesh.current.scale.z += delta * 15;
     mesh.current.material.opacity -= delta * 2;
     if (mesh.current.material.opacity <= 0) onComplete();
  });
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={1} />
    </mesh>
  );
};

// --- Character ---
const Player = ({ isPlaying, lane, hitEffect, isJumping }) => {
  const group = useRef();
  const leftLeg = useRef();
  const rightLeg = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const torso = useRef();

  const [visualLane, setVisualLane] = useState(0);
  
  // Physics state for jump
  const phys = useRef({ y: 0, vy: 0, jumping: false });

  // Watch prop changes for jump initiation
  useEffect(() => {
     if (isJumping && !phys.current.jumping) {
        phys.current.jumping = true;
        phys.current.vy = 18; // upward velocity
     }
  }, [isJumping]);

  useFrame((state, delta) => {
    // Lane Movement (with lean)
    const targetX = lane * LANE_WIDTH;
    const diff = targetX - visualLane;
    setVisualLane(v => v + diff * 10 * delta);
    group.current.position.x = visualLane;
    
    // Lean when changing lanes
    group.current.rotation.z = -diff * 0.2;

    // Real Gravity/Jump Physics
    if (phys.current.jumping) {
       phys.current.vy -= 50 * delta; // gravity
       phys.current.y += phys.current.vy * delta;
       if (phys.current.y <= 0) {
          phys.current.y = 0;
          phys.current.jumping = false;
       }
    }
    group.current.position.y = phys.current.y;

    const t = state.clock.elapsedTime;

    // Hit flashing & rotation
    if (hitEffect) {
       group.current.rotation.y = Math.sin(t * 50) * 0.3;
       torso.current.children[0].material.color.set('#ff0000');
    } else {
       group.current.rotation.y = 0;
       torso.current.children[0].material.color.set('#5c4033'); // normal cloth
    }

    if (isPlaying && !phys.current.jumping) {
      const runSpeed = 20; // faster run animation
      const angle = Math.sin(t * runSpeed);
      leftLeg.current.rotation.x = angle * 1.0;
      rightLeg.current.rotation.x = -angle * 1.0;
      leftArm.current.rotation.x = -angle * 1.0;
      rightArm.current.rotation.x = angle * 1.0;
      torso.current.position.y = 0.9 + Math.abs(angle) * 0.15;
      group.current.rotation.x = 0.15; // lean forward more
    } else if (phys.current.jumping) {
      leftLeg.current.rotation.x = -0.5;
      rightLeg.current.rotation.x = 0.5;
      leftArm.current.rotation.x = 0.8;
      rightArm.current.rotation.x = -0.8;
      group.current.rotation.x = 0;
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
        <mesh geometry={geos.torso} material={mats.cloth} castShadow receiveShadow />
        
        <group position={[0, 0.7, 0]}>
          <mesh geometry={geos.head} material={mats.skin} castShadow />
          <mesh geometry={geos.head} material={mats.hair} position={[0, 0.05, -0.05]} scale={[1.05, 1.05, 1.05]} castShadow />
        </group>

        <group position={[-0.45, 0.2, 0]}>
          <mesh ref={leftArm} geometry={geos.limb} material={mats.skin} position={[0, -0.3, 0]} castShadow />
        </group>
        <group position={[0.45, 0.2, 0]}>
          <mesh ref={rightArm} geometry={geos.limb} material={mats.skin} position={[0, -0.3, 0]} castShadow>
             {/* Holding a primitive spear */}
             <mesh geometry={geos.spear} material={mats.wood} position={[0, -0.3, 0.4]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
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
    
    // Exact Player is at Z=0
    if (item.z > -1.5 && item.z < 1.5) {
       onCollide(item);
    }
    
    if (!item.isObstacle && item.type !== 'waterSource') {
       meshRef.current.rotation.y += 3 * delta;
       meshRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 4 + item.id) * 0.3;
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
      return <mesh ref={meshRef} geometry={geos.rock} material={mats.rock} position={[item.lane * LANE_WIDTH, 0.5, item.z]} scale={[1.2, 1.2, 1.2]} castShadow receiveShadow />;
    } else {
      return <mesh ref={meshRef} geometry={geos.trunk} material={mats.treeTrunk} position={[item.lane * LANE_WIDTH, 0.3, item.z]} rotation={[Math.PI/2, 0, 0]} scale={[1,2.5,1]} castShadow receiveShadow />;
    }
  }

  const colorMap = { wood: '#8B5A2B', stone: '#708090', plants: '#228B22', food: '#DAA520' };
  const geoMap = { wood: geos.box, stone: geos.rock, plants: geos.capsule, food: geos.sphere };
  
  return (
    <Float floatIntensity={3} rotationIntensity={2}>
      <mesh ref={meshRef} geometry={geoMap[item.type]} material={mats[item.type]} position={[item.lane * LANE_WIDTH, 1, item.z]} scale={[0.7, 0.7, 0.7]} castShadow />
      <pointLight position={[item.lane * LANE_WIDTH, 1, item.z]} color={colorMap[item.type]} intensity={0.8} distance={4} />
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
      <mesh geometry={geos.ground} material={mats.ground} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -500]} receiveShadow />
      
      {/* Visual Path styling */}
      <mesh geometry={geos.path} material={mats.path} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -500]} receiveShadow />
      {/* Path Edges for depth */}
      <mesh geometry={geos.path} material={mats.ground} rotation={[-Math.PI / 2, 0, 0.02]} position={[-5, 0.05, -500]} scale={[0.1, 1, 1]} receiveShadow />
      <mesh geometry={geos.path} material={mats.ground} rotation={[-Math.PI / 2, 0, -0.02]} position={[5, 0.05, -500]} scale={[0.1, 1, 1]} receiveShadow />

      {/* Dynamic spawned items */}
      {engineRef.current.items.map(item => (
        <WorldItem key={item.id} item={item} onCollide={onCollide} />
      ))}
      
      {/* Particles */}
      {engineRef.current.particles.map(p => (
        <ParticleEffect key={p.id} position={p.position} color={p.color} onComplete={() => {
           engineRef.current.particles = engineRef.current.particles.filter(x => x.id !== p.id);
        }} />
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
    // Smoother dynamic camera
    const targetY = 3.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    state.camera.position.lerp(new THREE.Vector3(0, targetY, 7), 0.1);
    state.camera.lookAt(0, 1.5, -10);
  });
  return null;
};

// --- Main Render Scene ---
const Scene = ({ uiState, engineRef, onCollide }) => {
  return (
    <>
      <color attach=
