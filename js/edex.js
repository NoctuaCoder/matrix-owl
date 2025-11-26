// eDEX-UI Premium - Main Logic

class EdexTerminal {
    constructor() {
        this.output = document.getElementById('terminalOutput');
        this.input = document.getElementById('commandInput');
        this.commandCount = 0;
        this.startTime = Date.now();

        this.init();
    }

    init() {
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('click', () => this.input.focus());

        // Start updates
        this.startUpdates();

        this.input.focus();
    }

    async handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            await this.executeCommand();
        }
    }

    async executeCommand() {
        const input = this.input.value.trim();
        if (!input) return;

        this.input.value = '';
        this.commandCount++;
        document.getElementById('commandCount').textContent = String(this.commandCount).padStart(3, '0');

        await this.processCommand(input);
        this.scrollToBottom();
    }

    async processCommand(input) {
        const cmd = input.toLowerCase().trim();

        if (window.edexCommands && window.edexCommands[cmd]) {
            const result = await window.edexCommands[cmd].execute();
            if (result) {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = result;
                this.output.appendChild(wrapper);
            }
        }
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    startUpdates() {
        // Update time
        setInterval(() => {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { hour12: false });
            document.getElementById('timeDisplay').textContent = time;
        }, 1000);

        // Update uptime
        setInterval(() => {
            const uptime = Math.floor((Date.now() - this.startTime) / 1000);
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = uptime % 60;
            document.getElementById('uptimeValue').textContent =
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);

        // Update FPS
        let lastTime = performance.now();
        let frames = 0;
        const updateFPS = () => {
            frames++;
            const now = performance.now();
            if (now >= lastTime + 1000) {
                document.getElementById('fps').textContent = `FPS: ${frames}`;
                frames = 0;
                lastTime = now;
            }
            requestAnimationFrame(updateFPS);
        };
        updateFPS();
    }
}

// Initialize
let terminal;
document.addEventListener('DOMContentLoaded', () => {
    terminal = new EdexTerminal();
    window.terminal = terminal;
});
