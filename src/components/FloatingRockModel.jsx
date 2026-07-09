import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Float, PresentationControls } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("/3D/rock 3d model.glb");
  
  return (
    <group {...props} dispose={null}>
      {/* Set initial rotation so 'S' is facing front */}
      <primitive object={scene} scale={2.5} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}

// Preload the model
useGLTF.preload("/3D/rock 3d model.glb");

export default function FloatingRockModel() {
  return (
    <div className="absolute top-0 right-0 md:right-10 lg:right-20 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] z-[40] pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Float
            speed={2} // Animation speed, defaults to 1
            rotationIntensity={1} // XYZ rotation intensity, defaults to 1
            floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
          >
            <Model />
          </Float>
        </PresentationControls>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
