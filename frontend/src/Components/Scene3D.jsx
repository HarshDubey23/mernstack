import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';

const AnimatedSphere = () => {
    const sphereRef = useRef();

    useFrame((state) => {
        const { clock } = state;
        sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
        sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={sphereRef} args={[1, 100, 100]} scale={2}>
                <MeshDistortMaterial
                    color="#6366f1"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0}
                />
            </Sphere>
        </Float>
    );
};

const Scene3D = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <AnimatedSphere />
            </Canvas>
        </div>
    );
};

export default Scene3D;
