import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const themes = {
    premium: {
        name: 'premium',
        '--color-bg': '#0a0a0a',
        '--color-text': '#ededed',
        '--color-primary': '#ff2a5d', // Vibrant red/pink
        '--color-secondary': '#2a2aff', // Deep blue
        '--color-accent': '#00f0ff', // Cyan
        '--color-glass': 'rgba(10, 10, 10, 0.8)',
        '--color-border': 'rgba(255, 255, 255, 0.1)',
        '--font-main': "'Inter', sans-serif",
        '--font-heading': "'Orbitron', sans-serif",
        '--podium-gold': 'linear-gradient(to bottom, #d4af37, #aa8c2c)',
        '--podium-silver': 'linear-gradient(to bottom, #c0c0c0, #969696)',
        '--podium-bronze': 'linear-gradient(to bottom, #cd7f32, #a05a2c)'
    },
    neon: {
        name: 'neon',
        '--color-bg': '#050505',
        '--color-text': '#e0e0e0',
        '--color-primary': '#00f0ff',
        '--color-secondary': '#ff003c',
        '--color-accent': '#7000ff',
        '--color-glass': '#111111',
        '--color-border': 'rgba(255, 255, 255, 0.1)',
        '--font-main': "'Inter', sans-serif",
        '--font-heading': "'Orbitron', sans-serif",
        '--podium-gold': 'linear-gradient(to bottom, rgba(255,215,0,0.2), rgba(0,0,0,0.5))',
        '--podium-silver': 'linear-gradient(to bottom, rgba(192,192,192,0.2), rgba(0,0,0,0.5))',
        '--podium-bronze': 'linear-gradient(to bottom, rgba(205,127,50,0.2), rgba(0,0,0,0.5))'
    },
    industrial: {
        name: 'industrial',
        '--color-bg': '#1a1a1a',
        '--color-text': '#d4d4d4',
        '--color-primary': '#ff6b00',
        '--color-secondary': '#4a4a4a',
        '--color-accent': '#c7a008',
        '--color-glass': '#222222',
        '--color-border': 'rgba(255, 107, 0, 0.3)',
        '--font-main': "'Roboto Mono', monospace",
        '--font-heading': "'Orbitron', sans-serif",
        '--podium-gold': 'repeating-linear-gradient(45deg, #c7a008 0, #c7a008 10px, #333 10px, #333 20px)',
        '--podium-silver': 'linear-gradient(to bottom, #555, #222)',
        '--podium-bronze': 'linear-gradient(to bottom, #8B4513, #222)'
    }
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('premium');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && themes[savedTheme]) {
            setCurrentTheme(savedTheme);
        }
    }, []);

    const switchTheme = (themeName) => {
        if (themes[themeName]) {
            setCurrentTheme(themeName);
            localStorage.setItem('theme', themeName);
        }
    };

    const theme = themes[currentTheme];

    return (
        <ThemeContext.Provider value={{ currentTheme, switchTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};
