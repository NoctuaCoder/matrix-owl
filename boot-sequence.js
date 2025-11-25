// Boot Sequence - Realistic BIOS & System Init
class BootSequence {
    constructor() {
        this.steps = [
            { text: 'NOCTUA BIOS v2.4.0 (c) 2024 Noctua Systems Inc.', delay: 200, type: 'bios' },
            { text: 'CPU: Quantum Core i9-9900K @ 5.0GHz', delay: 100, type: 'bios' },
            { text: 'Memory Test: ', delay: 100, type: 'bios', memoryCheck: true },
            { text: '', delay: 1500 }, // Wait for memory check
            { text: 'Detecting Primary Master ... Noctua SSD 2TB', delay: 200, type: 'bios' },
            { text: 'Detecting Primary Slave  ... None', delay: 100, type: 'bios' },
            { text: 'Booting from Primary Master...', delay: 500, type: 'bios' },
            { text: '', delay: 500 },
            { text: 'Loading Kernel...', delay: 300, type: 'info', progress: true },
            { text: '', delay: 1200 },
            { text: '[ OK ] Mounted root filesystem', delay: 100, type: 'success' },
            { text: '[ OK ] Started Network Manager', delay: 100, type: 'success' },
            { text: '[ OK ] Started SSH Daemon', delay: 100, type: 'success' },
            { text: '[ OK ] Started Matrix Rain Engine', delay: 100, type: 'success' },
            { text: '[ OK ] Initialized Neural Interface', delay: 100, type: 'success' },
            { text: 'Starting User Session...', delay: 500, type: 'info' },
            { text: '', delay: 500 },
            { text: 'SYSTEM READY', delay: 200, type: 'ready' }
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
            align-items: flex-start;
            justify-content: flex-start;
            font-family: 'VT323', monospace;
            padding: 20px;
            cursor: none;
        `;

        this.bootOutput = document.createElement('div');
        this.bootOutput.id = 'boot-output';
        this.bootOutput.style.cssText = `
            color: #a0a0a0;
            font-size: 20px;
            line-height: 1.2;
            width: 100%;
            max-width: 800px;
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
            setTimeout(async () => {
                if (step.text || step.memoryCheck) {
                    const line = document.createElement('div');

                    if (step.type === 'bios') {
                        line.style.color = '#a0a0a0';
                    } else if (step.type === 'success') {
                        line.innerHTML = `<span style="color: #00FF00">[ OK ]</span> ${step.text.replace('[ OK ] ', '')}`;
                    } else if (step.type === 'ready') {
                        line.style.color = '#00FFFF';
                        line.style.fontWeight = 'bold';
                        line.style.marginTop = '20px';
                    } else {
                        line.textContent = step.text;
                    }

                    this.bootOutput.appendChild(line);

                    if (step.memoryCheck) {
                        await this.runMemoryCheck(line);
                    }

                    if (step.progress) {
                        this.createProgressBar();
                    }
                }
                resolve();
            }, step.delay);
        });
    }

    async runMemoryCheck(element) {
        return new Promise(resolve => {
            let memory = 0;
            const total = 32768; // 32GB
            const interval = setInterval(() => {
                memory += 1024;
                if (memory > total) {
                    memory = total;
                    clearInterval(interval);
                    element.textContent = `Memory Test: ${memory}MB OK`;
                    resolve();
                } else {
                    element.textContent = `Memory Test: ${memory}MB`;
                }
            }, 20);
        });
    }

    createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.style.cssText = `
            width: 300px;
            height: 15px;
            border: 1px solid #a0a0a0;
            margin-top: 5px;
            margin-bottom: 10px;
            position: relative;
        `;

        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            width: 0%;
            height: 100%;
            background: #a0a0a0;
            animation: fillProgress 1s ease-out forwards;
        `;

        progressContainer.appendChild(progressBar);
        this.bootOutput.appendChild(progressContainer);
    }

    async fadeOut() {
        return new Promise(resolve => {
            setTimeout(() => {
                this.bootOverlay.style.animation = 'fadeOut 0.5s forwards';
                setTimeout(() => {
                    this.bootOverlay.remove();
                    resolve();
                }, 500);
            }, 1000);
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes fillProgress {
        from { width: 0%; }
        to { width: 100%; }
    }
`;
document.head.appendChild(style);

// Auto-start boot sequence when page loads
window.addEventListener('load', () => {
    const boot = new BootSequence();
    boot.start();
});
