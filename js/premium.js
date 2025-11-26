// Premium Terminal Logic

class PremiumTerminal {
    constructor() {
        this.output = document.getElementById('outputArea');
        this.input = document.getElementById('commandInput');
        this.commandHistory = [];
        this.historyIndex = -1;

        this.init();
    }

    init() {
        // Input events
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Focus on click
        document.addEventListener('click', () => this.input.focus());

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

        // Scroll
        this.scrollToBottom();
    }

    async processCommand(input) {
        const cmd = input.toLowerCase().trim();

        if (window.premiumCommands && window.premiumCommands[cmd]) {
            try {
                const result = await window.premiumCommands[cmd].execute();
                if (result) {
                    this.renderOutput(result);
                }
            } catch (error) {
                console.error(error);
            }
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
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
}

// Initialize
let terminal;
document.addEventListener('DOMContentLoaded', () => {
    terminal = new PremiumTerminal();
    window.terminal = terminal;
});
