// Noctua Terminal - Effects System
// Particles, Glitch, Animations

class EffectsManager {
    constructor() {
        this.particlesEnabled = false;
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationFrame = null;
    }

    init() {
        // Create particles canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'effectsCanvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.6';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Particle System
    toggleParticles() {
        this.particlesEnabled = !this.particlesEnabled;

        if (this.particlesEnabled) {
            this.createParticles();
            this.animate();
            return 'Particles enabled ✨';
        } else {
            this.particles = [];
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return 'Particles disabled';
        }
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        if (!this.particlesEnabled) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.fillStyle = `rgba(0, 217, 255, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    // Glitch Effect
    glitch() {
        const terminal = document.getElementById('terminalOutput');
        if (!terminal) return;

        terminal.style.animation = 'glitch 0.3s ease-out';

        setTimeout(() => {
            terminal.style.animation = '';
        }, 300);
    }

    // Matrix Rain Effect
    matrixRain(duration = 5000) {
        const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01';
        const drops = [];
        const fontSize = 14;
        const columns = Math.floor(this.canvas.width / fontSize);

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        const startTime = Date.now();
        const draw = () => {
            if (Date.now() - startTime > duration) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                return;
            }

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = '#0F0';
            this.ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                this.ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > this.canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            requestAnimationFrame(draw);
        };

        draw();
    }

    // Loading Spinner
    showSpinner(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = `
            <div class="spinner">
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
            </div>
            <span>Loading...</span>
        `;
        container.appendChild(spinner);
        return spinner;
    }

    removeSpinner(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    }

    // Typing Animation
    typeText(element, text, speed = 30) {
        return new Promise((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, speed);
        });
    }

    // Progress Bar
    createProgressBar(percentage, label = '') {
        const filled = Math.floor(percentage / 2);
        const empty = 50 - filled;
        const bar = '█'.repeat(filled) + '░'.repeat(empty);
        return `${label} [${bar}] ${percentage}%`;
    }
}

// Initialize
window.effectsManager = new EffectsManager();
window.effectsManager.init();
