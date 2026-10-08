const fs = require('fs');

const content = \import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, SoftShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

const SPEED = 15;
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
  ground: new THREE.PlaneGeometry(300, 1000),
  path: new THREE.PlaneGeometry(10, 1000),
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
    // Lane movement
    setVisualLane(THREE.MathUtils.lerp(visualLane, lane * LANE_WIDTH, 10 * delta));
    group.current.position.x = visualLane;

    // Jump logic
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
      
      // Slight torso bounce and lean
      torso.current.position.y = 0.9 + Math.abs(Math.sin(t * runSpeed)) * 0.1;
      group.current.rotation.x = 0.1; // lean forward
    } else {
      // Idle Animation
      leftLeg.current.rotation.x = 0;
      rightLeg.current.rotation.x = 0;
      leftArm.current.rotation.x = Math.sin(t * 2) * 0.1;
      rightArm.current.rotation.x = -Math.sin(t * 2) * 0.1;
      
      torso.current.position.y = 0.9 + Math.sin(t * 3) * 0.05; // breathing
      group.current.rotation.x = 0;
    }
  });

  return (
    <group ref={group}>
      <group ref={torso} position={[0, 0.9, 0]}>
        {/* Body/Cloth */}
        <mesh geometry={geos.torso} material={mats.cloth} castShadow receiveShadow />
        
        {/* Head */}
        <group position={[0, 0.7, 0]}>
          <mesh geometry={geos.head} material={mats.skin} castShadow />
          <mesh geometry={geos.head} material={mats.hair} position={[0, 0.05, -0.05]} scale={[1.05, 1.05, 1.05]} castShadow />
        </group>

        {/* Arms */}
        <group position={[-0.45, 0.2, 0]}>
          <mesh ref={leftArm} geometry={geos.limb} material={mats.skin} position={[0, -0.3, 0]} castShadow />
        </group>
        <group position={[0.45, 0.2, 0]}>
          <mesh ref={rightArm} geometry={geos.limb} material={mats.skin} position={[0, -0.3, 0]} castShadow />
        </group>

        {/* Legs */}
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

  // Generate static scenery positions
  const scenery = useMemo(() => {
    const items = [];
    for (let i = 0; i < 200; i++) {
      const z = -(Math.random() * 1000); // 1000 units deep
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (6 + Math.random() * 40); // away from path
      const scale = 0.5 + Math.random() * 1.5;
      const isRock = Math.random() > 0.7;
      items.push({ x, z, scale, isRock, id: i });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    // Move the world towards the camera to simulate running
    // We wrap it around so the forest feels endless
    const zOffset = distance % 1000;
    worldGroup.current.position.z = zOffset;
  });

  return (
    <group>
      {/* Ground */}
      <mesh geometry={geos.ground} material={mats.ground} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -400]} receiveShadow />
      
      {/* Dirt Path */}
      <mesh geometry={geos.path} material={mats.path} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -400]} receiveShadow />
      
      {/* Distant Water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, -1000]} receiveShadow>
         <planeGeometry args={[500, 200]} />
         <primitive object={mats.water} />
      </mesh>

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

const CameraController = () => {
  useFrame((state) => {
    // Camera is positioned behind and slightly above the player
    state.camera.position.lerp(new THREE.Vector3(0, 4, 8), 0.1);
    state.camera.lookAt(0, 2, -10);
  });
  return null;
};

// --- Main Scene ---
const Scene = ({ isPlaying, lane, isJumping, distance }) => {
  return (
    <>
      <color attach=
