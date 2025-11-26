// Owl Controller - Handles SVG owl animations and reactions

class OwlController {
    constructor() {
        this.svg = document.getElementById('owlSvg');
        this.container = document.getElementById('owlContainer');
        this.pupilLeft = document.getElementById('pupilLeft');
        this.pupilRight = document.getElementById('pupilRight');
        this.eyelidLeft = document.getElementById('eyelidLeft');
        this.eyelidRight = document.getElementById('eyelidRight');

        this.isBlinking = false;
        this.init();
    }

    init() {
        // Start random blinking
        this.startBlinking();

        // Eye following (subtle)
        document.addEventListener('mousemove', (e) => this.followMouse(e));
    }

    followMouse(e) {
        if (this.isBlinking) return;

        const rect = this.svg.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angleX = (e.clientX - centerX) / window.innerWidth * 2;
        const angleY = (e.clientY - centerY) / window.innerHeight * 2;

        // Move pupils slightly
        const moveX = Math.max(-2, Math.min(2, angleX));
        const moveY = Math.max(-2, Math.min(2, angleY));

        this.pupilLeft.setAttribute('cx', 85 + moveX);
        this.pupilLeft.setAttribute('cy', 75 + moveY);
        this.pupilRight.setAttribute('cx', 115 + moveX);
        this.pupilRight.setAttribute('cy', 75 + moveY);
    }

    startBlinking() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.blink();
            }
        }, 3000);
    }

    blink() {
        if (this.isBlinking) return;
        this.isBlinking = true;

        // Close eyes
        this.eyelidLeft.setAttribute('ry', '12');
        this.eyelidRight.setAttribute('ry', '12');

        // Open eyes after 150ms
        setTimeout(() => {
            this.eyelidLeft.setAttribute('ry', '0');
            this.eyelidRight.setAttribute('ry', '0');
            this.isBlinking = false;
        }, 150);
    }

    react(type) {
        switch (type) {
            case 'success':
                this.glowGreen();
                break;
            case 'error':
                this.glowRed();
                break;
            case 'loading':
                this.pulse();
                break;
            case 'theme':
                this.colorShift();
                break;
        }
    }

    glowGreen() {
        this.svg.style.filter = 'drop-shadow(0 0 30px #00ff00)';
        setTimeout(() => {
            this.svg.style.filter = '';
        }, 500);
    }

    glowRed() {
        this.svg.style.filter = 'drop-shadow(0 0 30px #ff5f56)';
        this.container.classList.add('shake');
        setTimeout(() => {
            this.svg.style.filter = '';
            this.container.classList.remove('shake');
        }, 500);
    }

    pulse() {
        this.svg.classList.add('glow-pulse');
    }

    stopPulse() {
        this.svg.classList.remove('glow-pulse');
    }

    colorShift() {
        this.container.classList.add('rainbow-text');
        setTimeout(() => {
            this.container.classList.remove('rainbow-text');
        }, 2000);
    }

    hoot() {
        // Animate owl "hooting"
        this.blink();
        this.container.classList.add('bounce');
        setTimeout(() => {
            this.container.classList.remove('bounce');
        }, 1000);
    }
}

// Initialize when DOM is ready
let owl;
document.addEventListener('DOMContentLoaded', () => {
    owl = new OwlController();
    window.owl = owl;
});
