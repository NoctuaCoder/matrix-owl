// Particle System - Constellation Background
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.maxDistance = 150;
        this.mouse = { x: null, y: null, radius: 150 };

        this.resize();
        this.init();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--accent-color').trim() || '#00FFFF';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    const opacity = 1 - (distance / this.maxDistance);
                    this.ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    connectToMouse() {
        this.particles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const opacity = 1 - (distance / this.mouse.radius);
                this.ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.5})`;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.stroke();

                // Attract particles to mouse
                particle.vx += dx * 0.0001;
                particle.vy += dy * 0.0001;
            }
        });
    }

    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawParticles();
        this.connectParticles();
        if (this.mouse.x !== null) this.connectToMouse();
        this.update();

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
let particleSystem;
document.addEventListener('DOMContentLoaded', () => {
    particleSystem = new ParticleSystem('particles-canvas');
});
