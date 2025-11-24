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
