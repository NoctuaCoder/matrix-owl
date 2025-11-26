// Theme System

const themes = {
    matrix: {
        name: 'Matrix',
        primary: '#00ffff',
        secondary: '#9333ea',
        accent: '#ec4899'
    },
    cyberpunk: {
        name: 'Cyberpunk',
        primary: '#ff00ff',
        secondary: '#ffff00',
        accent: '#00ffff'
    },
    ocean: {
        name: 'Ocean',
        primary: '#3b82f6',
        secondary: '#06b6d4',
        accent: '#8b5cf6'
    },
    sunset: {
        name: 'Sunset',
        primary: '#f97316',
        secondary: '#ec4899',
        accent: '#8b5cf6'
    }
};

let currentTheme = 'matrix';

function applyTheme(themeName) {
    if (!themes[themeName]) return;

    currentTheme = themeName;
    const theme = themes[themeName];

    // Update CSS variables
    document.documentElement.style.setProperty('--neon-cyan', theme.primary);
    document.documentElement.style.setProperty('--cosmic-purple', theme.secondary);
    document.documentElement.style.setProperty('--stellar-pink', theme.accent);

    // Update HUD
    if (window.hud) {
        window.hud.updateTheme(theme.name);
    }

    // Owl reaction
    if (window.owl) {
        window.owl.react('theme');
    }
}

function cycleTheme() {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    const nextTheme = themeKeys[nextIndex];

    applyTheme(nextTheme);

    if (window.terminal) {
        window.terminal.printOutput(`Theme changed to: ${themes[nextTheme].name}`, 'success');
    }
}

window.themes = themes;
window.currentTheme = currentTheme;
window.applyTheme = applyTheme;
window.cycleTheme = cycleTheme;
