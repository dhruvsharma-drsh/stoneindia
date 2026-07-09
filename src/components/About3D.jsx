import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float, Center } from "@react-three/drei";

const RockModel = () => {
  const { scene } = useGLTF("/3D/rock 3d model.glb");
  const groupRef = useRef();

  // Clone the scene so unmounting doesn't corrupt the cached original
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.2}>
      <Center>
        {/* Changed from Math.PI / 2 to -Math.PI / 2 to show the other side where 'S' should be */}
        <group ref={groupRef} rotation={[0, -Math.PI / 2, 0]}>
          <primitive object={clonedScene} scale={2.8} dispose={null} />
        </group>
      </Center>
    </Float>
  );
};

// Preload the 3D model
useGLTF.preload("/3D/rock 3d model.glb");

export default function About3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay Canvas mount to next frame so React finishes its DOM work first
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => {
      cancelAnimationFrame(raf);
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      onCreated={({ gl }) => {
        // Suppress noisy context-lost errors during teardown
        const canvas = gl.domElement;
        canvas.addEventListener("webglcontextlost", (e) => e.preventDefault());
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <Environment preset="city" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enableRotate={true}
        /* Limit left/right rotation to 45 degrees in either direction */
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        /* Limit up/down rotation */
        minPolarAngle={Math.PI / 2 - 0.2}
        maxPolarAngle={Math.PI / 2 + 0.2}
      />
      <Suspense fallback={null}>
        <RockModel />
      </Suspense>
    </Canvas>
  );
}