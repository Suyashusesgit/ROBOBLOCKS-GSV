import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const themes = {
    neon: {
        name: 'neon',
        '--color-bg': '#050505',
        '--color-text': '#e0e0e0',
        '--color-primary': '#00f0ff',
        '--color-secondary': '#ff003c',
        '--color-accent': '#7000ff',
        '--color-glass': 'rgba(255, 255, 255, 0.05)',
        '--color-border': 'rgba(255, 255, 255, 0.1)',
        '--font-main': "'Inter', sans-serif",
        '--podium-gold': 'linear-gradient(to bottom, rgba(255,215,0,0.2), rgba(0,0,0,0.5))',
        '--podium-silver': 'linear-gradient(to bottom, rgba(192,192,192,0.2), rgba(0,0,0,0.5))',
        '--podium-bronze': 'linear-gradient(to bottom, rgba(205,127,50,0.2), rgba(0,0,0,0.5))'
    },
    industrial: {
        name: 'industrial',
        '--color-bg': '#1a1a1a',
        '--color-text': '#d4d4d4',
        '--color-primary': '#ff6b00', // Rust Orange
        '--color-secondary': '#4a4a4a', // Dark Grey
        '--color-accent': '#c7a008', // Brass
        '--color-glass': 'rgba(0, 0, 0, 0.2)',
        '--color-border': 'rgba(255, 107, 0, 0.3)',
        '--font-main': "'Roboto Mono', monospace",
        '--podium-gold': 'repeating-linear-gradient(45deg, #c7a008 0, #c7a008 10px, #333 10px, #333 20px)', // Hazard strip
        '--podium-silver': 'linear-gradient(to bottom, #555, #222)',
        '--podium-bronze': 'linear-gradient(to bottom, #8B4513, #222)'
    },
    glass: {
        name: 'glass',
        '--color-bg': '#eef2f5',
        '--color-text': '#1f2937',
        '--color-primary': '#3b82f6', // Bright Blue
        '--color-secondary': '#64748b', // Slate
        '--color-accent': '#8b5cf6', // Violet
        '--color-glass': 'rgba(255, 255, 255, 0.6)',
        '--color-border': 'rgba(59, 130, 246, 0.2)',
        '--font-main': "'Outfit', sans-serif",
        '--podium-gold': 'linear-gradient(to bottom, rgba(255,215,0,0.4), rgba(255,255,255,0.8))',
        '--podium-silver': 'linear-gradient(to bottom, rgba(192,192,192,0.4), rgba(255,255,255,0.8))',
        '--podium-bronze': 'linear-gradient(to bottom, rgba(205,127,50,0.4), rgba(255,255,255,0.8))'
    }
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('neon');

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
