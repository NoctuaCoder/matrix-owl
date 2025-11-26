// Racing Terminal - F1 Cockpit Logic

class RacingTerminal {
    constructor() {
        this.output = document.getElementById('outputContainer');
        this.input = document.getElementById('commandInput');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.commandCount = 0;

        this.init();
    }

    init() {
        // Input events
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Focus on click
        document.addEventListener('click', () => this.input.focus());

        // Theme button
        document.getElementById('themeBtn')?.addEventListener('click', () => {
            this.showWarning('THEME SYSTEM ACTIVATED');
        });

        // Start HUD updates
        this.startHUDUpdates();

        // Initial focus
        this.input.focus();
    }

    async handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            await this.executeCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory('up');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory('down');
        }
    }

    async executeCommand() {
        const input = this.input.value.trim();
        if (!input) return;

        // Add to history
        this.commandHistory.push(input);
        this.historyIndex = this.commandHistory.length;

        // Update counter
        this.commandCount++;
        this.updateCommandCounter();

        // Clear input
        this.input.value = '';

        // Update status
        this.updateInputStatus('PROCESSING');

        // Execute
        await this.processCommand(input);

        // Reset status
        this.updateInputStatus('READY');

        // Scroll
        this.scrollToBottom();
    }

    async processCommand(input) {
        const cmd = input.toLowerCase().trim();

        if (window.racingCommands && window.racingCommands[cmd]) {
            try {
                const result = await window.racingCommands[cmd].execute();
                if (result) {
                    this.renderOutput(result);
                }
            } catch (error) {
                this.showWarning(`ERROR: ${error.message}`);
            }
        } else {
            this.showWarning(`COMMAND NOT FOUND: ${cmd}`);
        }
    }

    renderOutput(html) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        this.output.appendChild(wrapper);
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down') {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        }
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    updateInputStatus(status) {
        const statusEl = document.getElementById('inputStatus');
        if (statusEl) {
            statusEl.textContent = status;
            statusEl.style.color = status === 'READY' ? 'var(--racing-green)' : 'var(--racing-yellow)';
        }
    }

    updateCommandCounter() {
        const counter = document.getElementById('commandCounter');
        if (counter) {
            counter.textContent = String(this.commandCount).padStart(3, '0');
        }
    }

    showWarning(message) {
        const overlay = document.getElementById('warningOverlay');
        const text = document.getElementById('warningText');

        if (overlay && text) {
            text.textContent = message;
            overlay.classList.remove('hidden');

            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 2000);
        }
    }

    startHUDUpdates() {
        // Update time
        setInterval(() => {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { hour12: false });
            const timeEl = document.getElementById('hudTime');
            if (timeEl) timeEl.textContent = time;
        }, 1000);

        // Update gauges
        setInterval(() => {
            this.updateGauges();
        }, 2000);
    }

    updateGauges() {
        // CPU
        const cpu = Math.floor(Math.random() * 40 + 30);
        const cpuGauge = document.getElementById('cpuGauge');
        const cpuValue = document.getElementById('cpuValue');
        if (cpuGauge) {
            cpuGauge.style.setProperty('--percentage', cpu);
            cpuGauge.style.stroke = cpu > 70 ? 'var(--racing-red)' : 'var(--racing-green)';
        }
        if (cpuValue) cpuValue.textContent = cpu;

        // RAM
        const ram = Math.floor(Math.random() * 30 + 50);
        const ramGauge = document.getElementById('ramGauge');
        const ramValue = document.getElementById('ramValue');
        if (ramGauge) {
            ramGauge.style.setProperty('--percentage', ram);
            ramGauge.style.stroke = ram > 80 ? 'var(--racing-red)' : 'var(--racing-yellow)';
        }
        if (ramValue) ramValue.textContent = ram;
    }
}

// Initialize
let terminal;
document.addEventListener('DOMContentLoaded', () => {
    terminal = new RacingTerminal();
    window.terminal = terminal;
});
