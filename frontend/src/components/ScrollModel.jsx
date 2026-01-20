import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ScrollModel = () => {
    const meshRef = useRef(null);
    const scroll = useScroll();

    useFrame((state, delta) => {
        const r1 = scroll.range(0, 1);
        const r2 = scroll.range(0.2, 0.6); // Middle section range
        const r3 = scroll.range(0.6, 1); // End section

        if (meshRef.current) {
            // Complex Rotation
            meshRef.current.rotation.x = r1 * Math.PI * 2;
            meshRef.current.rotation.y = r1 * Math.PI * 4 + state.clock.elapsedTime * 0.1;

            // Dynamic Material Color (lerp)
            // Initial: Cyan (#00f0ff), Mid: Purple/Pink (#ff0080), End: Orange (#ff8000)
            const color = new THREE.Color('#00f0ff');
            if (r1 > 0.5) {
                color.lerp(new THREE.Color('#ff0080'), (r1 - 0.5) * 2);
            }
            // meshRef.current.material.color = color; // MeshDistortMaterial handles color prop, better to update via ref if possible or state, but lets try direct prop update on ref if material is accessible
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
                    metalness={0.9} // Shiny, metallic look
                />
            </mesh>
        </group>
    );
};

export default ScrollModel;
