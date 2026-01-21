import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ScrollModel = () => {
    const meshRef = useRef(null);
    const scrollRef = useRef(0);

    // Sync with window scroll
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / totalHeight;
            scrollRef.current = progress;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame((state) => {
        const r1 = scrollRef.current; // 0 to 1 progress
        // Ranges
        const r2 = Math.max(0, Math.min(1, (r1 - 0.2) / 0.4)); // 0.2 to 0.6 mapped to 0-1
        // const r3 = Math.max(0, Math.min(1, (r1 - 0.6) / 0.4)); // 0.6 to 1.0 mapped to 0-1

        if (meshRef.current) {
            // Complex Rotation
            meshRef.current.rotation.x = r1 * Math.PI * 2;
            meshRef.current.rotation.y = r1 * Math.PI * 4 + state.clock.elapsedTime * 0.1;

            // Dynamic Material Color (lerp)
            const color = new THREE.Color('#00f0ff');
            if (r1 > 0.5) {
                color.lerp(new THREE.Color('#ff0080'), (r1 - 0.5) * 2);
            }

            if (meshRef.current.material) {
                meshRef.current.material.color.lerp(color, 0.1);
                meshRef.current.material.distort = 0.4 + r2 * 0.4; // More distortion in middle
            }

            // Camera Movement (Parallax)
            // Move camera down and slightly zoom in
            state.camera.position.z = 6 - r1 * 2; // Zoom in from 6 to 4
            state.camera.position.y = -r1 * 2; // Pan down
            state.camera.lookAt(0, 0, 0);
        }
    });

    return (
        <group position={[0, 0, 0]}>
            <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
                <icosahedronGeometry args={[1, 0]} />
                <MeshDistortMaterial
                    color="#00f0ff"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.9}
                />
            </mesh>
        </group>
    );
};

export default ScrollModel;
