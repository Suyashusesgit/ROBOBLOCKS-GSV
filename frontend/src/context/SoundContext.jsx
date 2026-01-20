import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
    const audioCtxRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Initialize AudioContext on first user interaction
        const initAudio = () => {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
        };
        window.addEventListener('click', initAudio, { once: true });
        return () => window.removeEventListener('click', initAudio);
    }, []);

    const playTone = (freq, type, duration, vol = 0.1) => {
        if (isMuted || !audioCtxRef.current) return;

        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    };

    const playHover = () => {
        // High pitched short blip
        playTone(800, 'sine', 0.05, 0.05);
    };

    const playClick = () => {
        // Mechanical click sound
        playTone(300, 'square', 0.1, 0.05);
        setTimeout(() => playTone(600, 'square', 0.05, 0.03), 50);
    };

    const playSuccess = () => {
        // Success chord
        playTone(440, 'sine', 0.3, 0.1);
        setTimeout(() => playTone(554, 'sine', 0.3, 0.1), 100);
        setTimeout(() => playTone(659, 'sine', 0.4, 0.1), 200);
    };

    return (
        <SoundContext.Provider value={{ playHover, playClick, playSuccess, isMuted, setIsMuted }}>
            {children}
        </SoundContext.Provider>
    );
};
