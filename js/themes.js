// Noctua Terminal - Theme System

const themes = {
    noctua: {
        name: 'Noctua',
        primary: '#ffffff',
        secondary: '#b0b0b0',
        dim: '#666666',
        accent: '#00d9ff',
        background: '#000000',
        cardBg: 'rgba(255, 255, 255, 0.03)',
        borderGlow: 'rgba(0, 217, 255, 0.3)'
    },
    matrix: {
        name: 'Matrix',
        primary: '#00ff00',
        secondary: '#00cc00',
        dim: '#006600',
        accent: '#00ff00',
        background: '#000000',
        cardBg: 'rgba(0, 255, 0, 0.03)',
        borderGlow: 'rgba(0, 255, 0, 0.3)'
    },
    synthwave: {
        name: 'Synthwave',
        primary: '#ff00ff',
        secondary: '#ff69b4',
        dim: '#9932cc',
        accent: '#ff1493',
        background: '#1a0033',
        cardBg: 'rgba(255, 0, 255, 0.05)',
        borderGlow: 'rgba(255, 20, 147, 0.4)'
    },
    hacker: {
        name: 'Hacker',
        primary: '#00ff41',
        secondary: '#00cc33',
        dim: '#008822',
        accent: '#00ff41',
        background: '#0d0208',
        cardBg: 'rgba(0, 255, 65, 0.03)',
        borderGlow: 'rgba(0, 255, 65, 0.3)'
    },
    blood: {
        name: 'Blood',
        primary: '#ff0000',
        secondary: '#cc0000',
        dim: '#660000',
        accent: '#ff3333',
        background: '#0a0000',
        cardBg: 'rgba(255, 0, 0, 0.05)',
        borderGlow: 'rgba(255, 51, 51, 0.4)'
    },
    ocean: {
        name: 'Ocean',
        primary: '#00d4ff',
        secondary: '#00a8cc',
        dim: '#006688',
        accent: '#00ffff',
        background: '#001a33',
        cardBg: 'rgba(0, 212, 255, 0.05)',
        borderGlow: 'rgba(0, 255, 255, 0.3)'
    }
};

class ThemeManager {
    constructor() {
        this.currentTheme = 'noctua';
        this.loadTheme();
    }

    loadTheme() {
        const saved = localStorage.getItem('noctua_theme');
        if (saved && themes[saved]) {
            this.currentTheme = saved;
            this.applyTheme(saved);
        }
    }

    applyTheme(themeName) {
        if (!themes[themeName]) {
            return `Theme "${themeName}" not found. Available: ${Object.keys(themes).join(', ')}`;
        }

        const theme = themes[themeName];
        const root = document.documentElement;

        // Apply CSS variables
        root.style.setProperty('--text-primary', theme.primary);
        root.style.setProperty('--text-secondary', theme.secondary);
        root.style.setProperty('--text-dim', theme.dim);
        root.style.setProperty('--accent-cyan', theme.accent);
        root.style.setProperty('--background', theme.background);
        root.style.setProperty('--card-bg', theme.cardBg);
        root.style.setProperty('--border-glow', theme.borderGlow);

        // Save preference
        this.currentTheme = themeName;
        localStorage.setItem('noctua_theme', themeName);

        // Trigger glitch effect on theme change
        if (window.effectsManager) {
            window.effectsManager.glitch();
        }

        return `Theme changed to: ${theme.name} ✨`;
    }

    listThemes() {
        let output = '<div class="gradient-card purple fade-in"><div class="card-content">';
        output += '<h3 class="card-title">AVAILABLE THEMES</h3>';
        output += '<p class="card-description">Use: theme [name]</p>';
        output += '<div style="margin-top: 1.5rem; display: grid; gap: 0.75rem;">';

        Object.entries(themes).forEach(([key, theme]) => {
            const current = key === this.currentTheme ? ' (current)' : '';
            output += `
                <div style="padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 4px; border-left: 3px solid ${theme.accent};">
                    <span style="font-weight: 700;">${theme.name}</span>${current}
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                        <div style="width: 20px; height: 20px; background: ${theme.primary}; border-radius: 2px;"></div>
                        <div style="width: 20px; height: 20px; background: ${theme.secondary}; border-radius: 2px;"></div>
                        <div style="width: 20px; height: 20px; background: ${theme.accent}; border-radius: 2px;"></div>
                    </div>
                </div>`;
        });

        output += '</div></div></div>';
        return output;
    }
}

window.themeManager = new ThemeManager();
