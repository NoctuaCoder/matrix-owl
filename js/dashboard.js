// Modern Dashboard Terminal - Main Logic

class DashboardTerminal {
    constructor() {
        this.output = document.getElementById('outputContainer');
        this.input = document.getElementById('commandInput');
        this.commandHistory = [];
        this.historyIndex = -1;

        this.init();
    }

    init() {
        // Input event listeners
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Focus input on click
        document.addEventListener('click', () => this.input.focus());

        // Theme button
        document.getElementById('themeBtn')?.addEventListener('click', () => {
            if (window.cycleTheme) window.cycleTheme();
        });

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

        // Clear input
        this.input.value = '';

        // Execute
        await this.processCommand(input);

        // Scroll to bottom
        this.scrollToBottom();
    }

    async processCommand(input) {
        const cmd = input.toLowerCase().trim();

        if (window.commands && window.commands[cmd]) {
            try {
                const result = await window.commands[cmd].execute();
                if (result) {
                    this.renderOutput(result);
                }
            } catch (error) {
                this.showError(`Error: ${error.message}`);
            }
        } else {
            this.showError(`Command not found: ${cmd}. Type 'help' for available commands.`);
        }
    }

    renderOutput(html) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        wrapper.className = 'fade-in';
        this.output.appendChild(wrapper);
    }

    showError(message) {
        const error = document.createElement('div');
        error.className = 'stat-card fade-in';
        error.style.borderColor = 'var(--error)';
        error.innerHTML = `
            <p style="color: var(--error); font-weight: 500;">${message}</p>
        `;
        this.output.appendChild(error);
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
}

// Initialize
let terminal;
document.addEventListener('DOMContentLoaded', () => {
    terminal = new DashboardTerminal();
    window.terminal = terminal;
});
