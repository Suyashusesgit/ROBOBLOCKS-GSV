import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Icosahedron, Octahedron, Instance, Instances, Grid } from '@react-three/drei';
import * as THREE from 'three';

const RoboCore = () => {
    const meshRef = useRef();
    const groupRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.5;
            meshRef.current.rotation.y = t * 0.2;
        }
        if (groupRef.current) {
            groupRef.current.rotation.z = -t * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Inner Core */}
                <Octahedron args={[1.5, 0]} ref={meshRef}>
                    <meshStandardMaterial
                        color="#2a2aff"
                        emissive="#ce04f8"
                        emissiveIntensity={0.5}
                        wireframe
                        transparent
                        opacity={0.8}
                    />
                </Octahedron>

                {/* Outer Shell */}
                <Icosahedron args={[2, 0]}>
                    <meshPhysicalMaterial
                        color="#111"
                        roughness={0.2}
                        metalness={1}
                        transmission={0.2}
                        thickness={1}
                        wireframeLinewidth={2}
                    />
                </Icosahedron>

                {/* Tech Rings */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.8, 0.05, 16, 100]} />
                    <meshBasicMaterial color="#00f0ff" />
                </mesh>
            </Float>
        </group>
    );
};

const DataSwarm = ({ count = 40 }) => {
    const groupRef = useRef();

    // Generate random data for instances
    const data = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10
            ],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
            scale: Math.random() * 0.5 + 0.2,
            speed: Math.random() * 0.5 + 0.2
        }));
    }, [count]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <Instances range={count}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#ff2a5d" wireframe />
                {data.map((props, i) => (
                    <FloatingInstance key={i} {...props} />
                ))}
            </Instances>
        </group>
    );
};

const FloatingInstance = ({ position, rotation, scale }) => {
    return (
        <Instance
            position={position}
            rotation={rotation}
            scale={scale}
        />
    );
};


const Hero3D = () => {
    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 8], fov: 45 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
            <fog attach="fog" args={['#0a0a0a', 5, 25]} />
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} castShadow color="#00f0ff" />
            <pointLight position={[-10, -5, -5]} intensity={5} color="#ff2a5d" distance={20} />

            <RoboCore />
            <DataSwarm count={40} />

            <Grid
                position={[0, -4, 0]}
                args={[20, 20]}
                cellSize={0.5}
                cellThickness={0.5}
                cellColor="#2a2aff"
                sectionSize={2.5}
                sectionThickness={1}
                sectionColor="#7000ff"
                fadeDistance={15}
                fadeStrength={1.5}
            />

            <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={20} blur={2.5} far={4} resolution={256} color="#000000" />
        </Canvas>
    );
};

export default Hero3D;
