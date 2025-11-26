// HUD Controller - Updates system stats

class HUDController {
    constructor() {
        this.hudTime = document.getElementById('hudTime');
        this.hudCpu = document.getElementById('hudCpu');
        this.hudRam = document.getElementById('hudRam');
        this.hudCommands = document.getElementById('hudCommands');
        this.hudUptime = document.getElementById('hudUptime');
        this.hudTheme = document.getElementById('hudTheme');
        this.terminalTime = document.getElementById('terminalTime');

        this.init();
    }

    init() {
        this.updateTime();
        this.updateStats();

        setInterval(() => this.updateTime(), 1000);
        setInterval(() => this.updateStats(), 2000);
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });

        if (this.hudTime) this.hudTime.textContent = timeString;
        if (this.terminalTime) this.terminalTime.textContent = timeString;
    }

    updateStats() {
        // Simulate CPU/RAM (random for effect)
        if (this.hudCpu) {
            const cpu = Math.floor(Math.random() * 30 + 20);
            this.hudCpu.textContent = cpu + '%';
        }

        if (this.hudRam) {
            const ram = (Math.random() * 2 + 7).toFixed(1);
            this.hudRam.textContent = ram + 'GB';
        }

        // Uptime
        if (this.hudUptime && window.config) {
            const uptime = Math.floor((Date.now() - window.config.startTime) / 1000);
            const minutes = Math.floor(uptime / 60);
            const seconds = uptime % 60;
            this.hudUptime.textContent = minutes > 0 ?
                `${minutes}m ${seconds}s` : `${seconds}s`;
        }
    }

    updateCommandCount(count) {
        if (this.hudCommands) {
            this.hudCommands.textContent = count;
        }
    }

    updateTheme(themeName) {
        if (this.hudTheme) {
            this.hudTheme.textContent = themeName;
        }
    }
}

// Initialize
let hud;
document.addEventListener('DOMContentLoaded', () => {
    hud = new HUDController();
    window.hud = hud;
});
