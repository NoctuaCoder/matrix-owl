// Main Terminal Logic

class Terminal {
    constructor() {
        this.output = document.getElementById('terminalOutput');
        this.input = document.getElementById('commandInput');
        this.bootSequence = document.getElementById('bootSequence');

        this.commandHistory = [];
        this.historyIndex = -1;

        this.init();
    }

    init() {
        // Hide boot sequence after delay
        setTimeout(() => {
            if (this.bootSequence) {
                this.bootSequence.style.display = 'none';
            }
        }, 3000);

        // Input event listeners
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Focus input on click anywhere
        document.addEventListener('click', () => {
            this.input.focus();
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
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autocomplete();
        }
    }

    async executeCommand() {
        const input = this.input.value.trim();
        if (!input) return;

        // Add to history
        this.commandHistory.push(input);
        this.historyIndex = this.commandHistory.length;

        // Show command
        this.printCommand(input);

        // Clear input
        this.input.value = '';

        // Update command count
        if (window.config) {
            window.config.commandCount++;
            if (window.hud) {
                window.hud.updateCommandCount(window.config.commandCount);
            }
        }

        // Execute
        await this.processCommand(input);

        // Scroll to bottom
        this.scrollToBottom();
    }

    async processCommand(input) {
        const parts = input.toLowerCase().split(' ');
        const cmd = parts[0];
        const args = parts.slice(1);

        // Check if command exists
        if (window.commands && window.commands[cmd]) {
            try {
                // Show loading
                if (window.owl) {
                    window.owl.pulse();
                }

                const result = await window.commands[cmd].execute(args);

                if (window.owl) {
                    window.owl.stopPulse();
                }

                if (result) {
                    this.printOutput(result, 'info');
                }

                if (window.owl) {
                    window.owl.react('success');
                }
            } catch (error) {
                this.printOutput(`Error: ${error.message}`, 'error');
                if (window.owl) {
                    window.owl.react('error');
                }
            }
        } else {
            this.printOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
            if (window.owl) {
                window.owl.react('error');
            }
        }
    }

    printCommand(text) {
        const line = document.createElement('div');
        line.className = 'output-line output-command';
        line.innerHTML = `<span class="prompt">noctuacoder@celestial:~$</span> ${this.escapeHtml(text)}`;
        this.output.appendChild(line);
    }

    printOutput(text, type = 'info') {
        const line = document.createElement('div');
        line.className = `output-line output-${type}`;
        line.innerHTML = text;
        this.output.appendChild(line);
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        if (direction === 'up') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
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

    autocomplete() {
        const input = this.input.value.toLowerCase();
        if (!input) return;

        const matches = Object.keys(window.commands || {}).filter(cmd =>
            cmd.startsWith(input)
        );

        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.printOutput(matches.join('  '), 'info');
        }
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Sound toggle function
function toggleSound() {
    if (window.config) {
        window.config.soundEnabled = !window.config.soundEnabled;
        const label = document.getElementById('soundLabel');
        if (label) {
            label.textContent = window.config.soundEnabled ? 'Sound' : 'Muted';
        }
        if (window.terminal) {
            window.terminal.printOutput(
                `Sound ${window.config.soundEnabled ? 'enabled' : 'disabled'}`,
                'info'
            );
        }
    }
}

// Initialize terminal
let terminal;
document.addEventListener('DOMContentLoaded', () => {
    terminal = new Terminal();
    window.terminal = terminal;
});

// Export
window.toggleSound = toggleSound;
