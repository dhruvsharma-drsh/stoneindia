import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float, Center } from "@react-three/drei";

const RockModel = () => {
  const { scene } = useGLTF("/3D/rock 3d model.glb");
  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <Center>
        <primitive object={scene} scale={2.8} />
      </Center>
    </Float>
  );
};

// Preload the 3D model
useGLTF.preload("/3D/rock 3d model.glb");

export default function About3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      <Suspense fallback={null}>
        <RockModel />
      </Suspense>
    </Canvas>
  );
}
