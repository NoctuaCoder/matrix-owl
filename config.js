// Configuration System with localStorage persistence
const config = {
    theme: 'matrix',
    soundEnabled: true,
    ambientSound: false,
    volume: 70,
    commandHistory: [],
    currentDirectory: '~',
    maxHistorySize: 50
};

function saveConfig() {
    try {
        localStorage.setItem('matrixOwlConfig', JSON.stringify(config));
    } catch (e) {
        console.warn('Failed to save config to localStorage:', e);
    }
}

function loadConfig() {
    try {
        const saved = localStorage.getItem('matrixOwlConfig');
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.assign(config, parsed);
            return true;
        }
    } catch (e) {
        console.warn('Failed to load config from localStorage:', e);
    }
    return false;
}

function addToHistory(command) {
    if (command && command.trim()) {
        config.commandHistory.push(command);

        // Keep only last N commands
        if (config.commandHistory.length > config.maxHistorySize) {
            config.commandHistory.shift();
        }

        saveConfig();
    }
}

function getHistory() {
    return config.commandHistory;
}

function clearHistory() {
    config.commandHistory = [];
    saveConfig();
}

// Initialize config on load
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();

    // Apply saved theme
    if (config.theme && typeof applyTheme === 'function') {
        applyTheme(config.theme);
    }
});
