import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Stars, Sparkles } from '@react-three/drei';
import styled from 'styled-components';
import ScrollModel from './ScrollModel';

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: #050505; /* Deep dark background */
`;

const Scene3D = () => {
    return (
        <CanvasContainer>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 10, 5]} intensity={2.5} color="#00f0ff" />
                <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#ff0080" />
                <spotLight position={[0, 10, 0]} intensity={2} angle={0.5} penumbra={1} />

                <Suspense fallback={null}>
                    {/* Native Scroll via Window Listener in ScrollModel */}
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <ScrollModel />
                    </Float>
                    <Environment preset="city" />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Sparkles count={100} scale={10} size={4} speed={0.4} opacity={0.5} color="#fff" />
                </Suspense>
            </Canvas>
        </CanvasContainer>
    );
};

export default Scene3D;
