// Boot Sequence - Epic System Initialization
class BootSequence {
    constructor() {
        this.steps = [
            { text: 'NOCTUA OS v2.0 CYBERPUNK EDITION', delay: 500, type: 'title' },
            { text: '', delay: 300 },
            { text: '[✓] Loading kernel modules...', delay: 400, type: 'success' },
            { text: '[✓] Initializing matrix rain engine...', delay: 500, type: 'success' },
            { text: '[✓] Connecting to neural network...', delay: 600, type: 'success' },
            { text: '[✓] Calibrating quantum processors...', delay: 450, type: 'success' },
            { text: '[✓] Establishing secure connection...', delay: 550, type: 'success' },
            { text: '[✓] Loading particle system...', delay: 400, type: 'success' },
            { text: '', delay: 300 },
            { text: 'Initializing system...', delay: 200, type: 'info', progress: true },
            { text: '', delay: 1500 }, // Progress bar time
            { text: 'SYSTEM READY', delay: 500, type: 'ready' },
            { text: 'Welcome, Commander.', delay: 300, type: 'welcome' }
        ];

        this.currentStep = 0;
        this.bootOverlay = null;
        this.bootOutput = null;
    }

    createOverlay() {
        this.bootOverlay = document.createElement('div');
        this.bootOverlay.id = 'boot-overlay';
        this.bootOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Courier New', monospace;
        `;

        this.bootOutput = document.createElement('div');
        this.bootOutput.id = 'boot-output';
        this.bootOutput.style.cssText = `
            color: #00FFFF;
            font-size: 16px;
            line-height: 1.8;
            max-width: 600px;
            padding: 40px;
        `;

        this.bootOverlay.appendChild(this.bootOutput);
        document.body.appendChild(this.bootOverlay);
    }

    async start() {
        this.createOverlay();

        for (const step of this.steps) {
            await this.executeStep(step);
        }

        await this.fadeOut();
    }

    async executeStep(step) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (step.text) {
                    const line = document.createElement('div');
                    line.style.cssText = `
                        margin-bottom: 8px;
                        opacity: 0;
                        animation: fadeIn 0.3s forwards;
                    `;

                    if (step.type === 'title') {
                        line.style.cssText += `
                            font-size: 24px;
                            font-weight: bold;
                            text-align: center;
                            margin-bottom: 30px;
                            text-shadow: 0 0 20px #00FFFF;
                        `;
                    } else if (step.type === 'success') {
                        line.style.color = '#00FF00';
                    } else if (step.type === 'ready') {
                        line.style.cssText += `
                            font-size: 32px;
                            font-weight: bold;
                            text-align: center;
                            margin-top: 30px;
                            color: #00FF00;
                            text-shadow: 0 0 30px #00FF00;
                            animation: pulse 1s infinite;
                        `;
                    } else if (step.type === 'welcome') {
                        line.style.cssText += `
                            text-align: center;
                            font-style: italic;
                            color: #00BFFF;
                        `;
                    }

                    line.textContent = step.text;
                    this.bootOutput.appendChild(line);

                    if (step.progress) {
                        this.createProgressBar();
                    }
                }
                resolve();
            }, step.delay);
        });
    }

    createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.style.cssText = `
            width: 100%;
            height: 20px;
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid #00FFFF;
            border-radius: 10px;
            margin-top: 15px;
            overflow: hidden;
            position: relative;
        `;

        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #00FFFF, #00BFFF);
            box-shadow: 0 0 20px #00FFFF;
            animation: fillProgress 1.5s ease-out forwards;
        `;

        progressContainer.appendChild(progressBar);
        this.bootOutput.appendChild(progressContainer);
    }

    async fadeOut() {
        return new Promise(resolve => {
            setTimeout(() => {
                this.bootOverlay.style.animation = 'fadeOut 1s forwards';
                setTimeout(() => {
                    this.bootOverlay.remove();
                    resolve();
                }, 1000);
            }, 1000);
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes fillProgress {
        from { width: 0%; }
        to { width: 100%; }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Auto-start boot sequence when page loads
window.addEventListener('load', () => {
    const boot = new BootSequence();
    boot.start();
});
