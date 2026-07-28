import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Laptop() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15 + 0.3;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05 - 0.1;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  const bodyMaterial = (
    <meshStandardMaterial
      color="#1a1a2e"
      metalness={0.8}
      roughness={0.2}
    />
  );

  const screenMaterial = (
    <meshStandardMaterial
      color="#0f0f1a"
      metalness={0.9}
      roughness={0.1}
    />
  );

  const screenGlow = (
    <meshStandardMaterial
      color="#8b5cf6"
      emissive="#8b5cf6"
      emissiveIntensity={0.3}
      metalness={0.1}
      roughness={0.8}
    />
  );

  const accentMaterial = (
    <meshStandardMaterial
      color="#06b6d4"
      emissive="#06b6d4"
      emissiveIntensity={0.5}
      metalness={0.3}
      roughness={0.4}
    />
  );

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 0.12, 2]} />
        {bodyMaterial}
      </mesh>

      {/* Base top accent strip */}
      <mesh position={[0, 0.065, -0.85]}>
        <boxGeometry args={[2.8, 0.01, 0.05]} />
        {accentMaterial}
      </mesh>

      {/* Keyboard area */}
      <mesh position={[0, 0.07, 0.1]}>
        <boxGeometry args={[2.4, 0.01, 1.2]} />
        <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.07, 0.65]}>
        <boxGeometry args={[0.8, 0.005, 0.5]} />
        <meshStandardMaterial color="#16162e" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Screen */}
      <group position={[0, 1.05, -0.95]} rotation={[-0.2, 0, 0]}>
        {/* Screen frame */}
        <mesh castShadow>
          <boxGeometry args={[3, 2, 0.08]} />
          {screenMaterial}
        </mesh>

        {/* Screen display */}
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[2.7, 1.7, 0.01]} />
          {screenGlow}
        </mesh>

        {/* Code lines on screen */}
        {[0.5, 0.25, 0, -0.25, -0.5].map((y, i) => (
          <mesh key={i} position={[-0.3 + i * 0.15, y, 0.05]}>
            <boxGeometry args={[0.6 + Math.random() * 0.8, 0.04, 0.005]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#06b6d4' : '#8b5cf6'}
              emissive={i % 2 === 0 ? '#06b6d4' : '#8b5cf6'}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}

        {/* Screen camera dot */}
        <mesh position={[0, 0.95, 0.045]}>
          <circleGeometry args={[0.03, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
    </group>
  );
}

function FloatingBrackets() {
  const group1 = useRef();
  const group2 = useRef();
  const group3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group1.current) {
      group1.current.position.x = Math.sin(t * 0.4) * 2.5;
      group1.current.position.y = Math.cos(t * 0.3) * 0.8 + 0.5;
      group1.current.rotation.z = Math.sin(t * 0.2) * 0.3;
      group1.current.rotation.y = t * 0.1;
    }
    if (group2.current) {
      group2.current.position.x = Math.cos(t * 0.35) * 2.2;
      group2.current.position.y = Math.sin(t * 0.4) * 0.6 - 0.3;
      group2.current.rotation.z = Math.cos(t * 0.25) * 0.4;
      group2.current.rotation.y = -t * 0.15;
    }
    if (group3.current) {
      group3.current.position.x = Math.sin(t * 0.25 + 2) * 2;
      group3.current.position.y = Math.cos(t * 0.45 + 1) * 0.7;
      group3.current.rotation.z = Math.sin(t * 0.3) * 0.25;
      group3.current.rotation.y = t * 0.12;
    }
  });

  const Bracket = ({ children, material }) => (
    <group>
      {children}
    </group>
  );

  const cyanMat = (
    <meshStandardMaterial
      color="#06b6d4"
      emissive="#06b6d4"
      emissiveIntensity={0.6}
      transparent
      opacity={0.8}
    />
  );

  const purpleMat = (
    <meshStandardMaterial
      color="#8b5cf6"
      emissive="#8b5cf6"
      emissiveIntensity={0.6}
      transparent
      opacity={0.8}
    />
  );

  // Curly bracket { shape approximation with boxes
  const CurlyBracket = ({ material }) => (
    <group>
      {/* Top horizontal */}
      <mesh position={[0, 0.4, 0]}>{material}
        <boxGeometry args={[0.3, 0.06, 0.06]} />
      </mesh>
      {/* Top vertical */}
      <mesh position={[0.12, 0.25, 0]}>{material}
        <boxGeometry args={[0.06, 0.25, 0.06]} />
      </mesh>
      {/* Middle horizontal */}
      <mesh position={[0.25, 0, 0]}>{material}
        <boxGeometry args={[0.3, 0.06, 0.06]} />
      </mesh>
      {/* Bottom vertical */}
      <mesh position={[0.12, -0.25, 0]}>{material}
        <boxGeometry args={[0.06, 0.25, 0.06]} />
      </mesh>
      {/* Bottom horizontal */}
      <mesh position={[0, -0.4, 0]}>{material}
        <boxGeometry args={[0.3, 0.06, 0.06]} />
      </mesh>
    </group>
  );

  const SlashPair = ({ material }) => (
    <group>
      <mesh position={[-0.08, 0, 0]} rotation={[0, 0, 0.4]}>{material}
        <boxGeometry args={[0.06, 0.7, 0.06]} />
      </mesh>
      <mesh position={[0.18, 0, 0]} rotation={[0, 0, 0.4]}>{material}
        <boxGeometry args={[0.06, 0.7, 0.06]} />
      </mesh>
    </group>
  );

  return (
    <>
      <group ref={group1} scale={0.6}>
        <CurlyBracket material={cyanMat} />
      </group>
      <group ref={group2} scale={0.5}>
        <SlashPair material={purpleMat} />
      </group>
      <group ref={group3} scale={0.55}>
        <group>
          <mesh position={[-0.12, 0.2, 0]} rotation={[0, 0, -0.15]}>{cyanMat}
            <boxGeometry args={[0.06, 0.5, 0.06]} />
          </mesh>
          <mesh position={[0.05, 0.35, 0]} rotation={[0, 0, 0.6]}>{cyanMat}
            <boxGeometry args={[0.06, 0.35, 0.06]} />
          </mesh>
          <mesh position={[0.18, 0.18, 0]} rotation={[0, 0, -0.6]}>{cyanMat}
            <boxGeometry args={[0.06, 0.35, 0.06]} />
          </mesh>
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, 0]}>{cyanMat}
            <boxGeometry args={[0.3, 0.06, 0.06]} />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-5, 3, -5]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[0, -2, 3]} intensity={0.3} color="#ffffff" />

        <Laptop />
        <FloatingBrackets />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
