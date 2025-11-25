// Theme System for Matrix Owl Terminal
const themes = {
    matrix: {
        name: 'Matrix',
        primary: '#00FFFF',
        secondary: '#00BFFF',
        background: '#000000',
        terminalBg: 'rgba(0, 0, 0, 0.85)',
        matrixRain: '#00FFFF',
        text: '#a0b0c0',
        border: '#00BFFF',
        glow: 'rgba(0, 191, 255, 0.5)',
        error: '#ff5f56',
        success: '#00FFFF'
    },
    dark: {
        name: 'Dark Purple',
        primary: '#BB86FC',
        secondary: '#03DAC6',
        background: '#121212',
        terminalBg: 'rgba(18, 18, 18, 0.85)',
        matrixRain: '#BB86FC',
        text: '#E1E1E1',
        border: '#BB86FC',
        glow: 'rgba(187, 134, 252, 0.5)',
        error: '#CF6679',
        success: '#03DAC6'
    },
    light: {
        name: 'Light Mode',
        primary: '#6200EE',
        secondary: '#03DAC6',
        background: '#F5F5F5',
        terminalBg: 'rgba(255, 255, 255, 0.95)',
        matrixRain: '#6200EE',
        text: '#333333',
        border: '#6200EE',
        glow: 'rgba(98, 0, 238, 0.3)',
        error: '#B00020',
        success: '#018786'
    },
    cyberpunk: {
        name: 'Cyberpunk',
        primary: '#FF00FF',
        secondary: '#FFFF00',
        background: '#0A0A0A',
        terminalBg: 'rgba(10, 10, 10, 0.85)',
        matrixRain: '#FF00FF',
        text: '#FFD700',
        border: '#FF00FF',
        glow: 'rgba(255, 0, 255, 0.5)',
        error: '#FF0000',
        success: '#00FF00'
    },
    ocean: {
        name: 'Ocean',
        primary: '#00CED1',
        secondary: '#4682B4',
        background: '#001F3F',
        terminalBg: 'rgba(0, 31, 63, 0.85)',
        matrixRain: '#00CED1',
        text: '#B0E0E6',
        border: '#00CED1',
        glow: 'rgba(0, 206, 209, 0.5)',
        error: '#FF6B6B',
        success: '#4ECDC4'
    },
    sunset: {
        name: 'Sunset',
        primary: '#FF6B6B',
        secondary: '#FFA500',
        background: '#1A0A2E',
        terminalBg: 'rgba(26, 10, 46, 0.85)',
        matrixRain: '#FF6B6B',
        text: '#FFE5B4',
        border: '#FF6B6B',
        glow: 'rgba(255, 107, 107, 0.5)',
        error: '#FF0000',
        success: '#FFD700'
    },
    tron: {
        name: 'TRON',
        primary: '#00D9FF',
        secondary: '#0066FF',
        background: '#000000',
        terminalBg: 'rgba(0, 0, 0, 0.9)',
        matrixRain: '#00D9FF',
        text: '#FFFFFF',
        border: '#00D9FF',
        glow: 'rgba(0, 217, 255, 0.6)',
        error: '#FF4444',
        success: '#00D9FF'
    },
    bladerunner: {
        name: 'Blade Runner',
        primary: '#FF6B35',
        secondary: '#6B2D5C',
        background: '#0D0D0D',
        terminalBg: 'rgba(13, 13, 13, 0.85)',
        matrixRain: '#FF6B35',
        text: '#E8DCC4',
        border: '#FF6B35',
        glow: 'rgba(255, 107, 53, 0.5)',
        error: '#FF0000',
        success: '#FFD700'
    },
    gits: {
        name: 'Ghost in the Shell',
        primary: '#00FF41',
        secondary: '#00CC33',
        background: '#000000',
        terminalBg: 'rgba(0, 0, 0, 0.9)',
        matrixRain: '#00FF41',
        text: '#33FF66',
        border: '#00FF41',
        glow: 'rgba(0, 255, 65, 0.5)',
        error: '#FF3333',
        success: '#00FF41'
    },
    cp2077: {
        name: 'Cyberpunk 2077',
        primary: '#FCE300',
        secondary: '#00F0FF',
        background: '#0A0A0A',
        terminalBg: 'rgba(10, 10, 10, 0.85)',
        matrixRain: '#FCE300',
        text: '#FFFFFF',
        border: '#FCE300',
        glow: 'rgba(252, 227, 0, 0.5)',
        error: '#FF003C',
        success: '#00F0FF'
    },
    synthwave: {
        name: 'Synthwave',
        primary: '#FF006E',
        secondary: '#8338EC',
        background: '#0F0326',
        terminalBg: 'rgba(15, 3, 38, 0.85)',
        matrixRain: '#FF006E',
        text: '#FB5607',
        border: '#FF006E',
        glow: 'rgba(255, 0, 110, 0.5)',
        error: '#FF0000',
        success: '#00F5FF'
    }
};

let currentTheme = 'matrix';

function applyTheme(themeName) {
    if (!themes[themeName]) {
        return false;
    }

    const theme = themes[themeName];
    currentTheme = themeName;

    // Update CSS custom properties
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--background-color', theme.background);
    root.style.setProperty('--terminal-bg', theme.terminalBg);
    root.style.setProperty('--text-color', theme.text);
    root.style.setProperty('--border-color', theme.border);
    root.style.setProperty('--glow-color', theme.glow);
    root.style.setProperty('--error-color', theme.error);
    root.style.setProperty('--success-color', theme.success);

    // Update matrix rain color
    if (typeof matrixColor !== 'undefined') {
        matrixColor = theme.matrixRain;
    }

    // Save to config
    if (typeof config !== 'undefined') {
        config.theme = themeName;
        saveConfig();
    }

    return true;
}

function listThemes() {
    return Object.keys(themes).map(key => ({
        key,
        name: themes[key].name
    }));
}

function getRandomTheme() {
    const themeKeys = Object.keys(themes);
    const randomKey = themeKeys[Math.floor(Math.random() * themeKeys.length)];
    return randomKey;
}
