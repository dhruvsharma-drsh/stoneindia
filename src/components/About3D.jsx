import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float, Center } from "@react-three/drei";

const RockModel = () => {
  const { scene } = useGLTF("/3D/rock 3d model.glb");
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <Center>
        <primitive object={scene} scale={2.8} rotation={[0, -Math.PI / 2, 0]} />
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
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minAzimuthAngle={-Math.PI / 4} 
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
      <Suspense fallback={null}>
        <RockModel />
      </Suspense>
    </Canvas>
  );
}
