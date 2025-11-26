// eDEX-UI Premium - Monitor Graphics
class SystemMonitors {
    constructor() {
        this.initGraphs();
        this.startMonitoring();
    }

    initGraphs() {
        // CPU Graph
        this.cpuCanvas = document.getElementById('cpuGraph');
        if (this.cpuCanvas) {
            this.cpuCtx = this.cpuCanvas.getContext('2d');
            this.cpuData = new Array(50).fill(0);
            this.resizeCanvas(this.cpuCanvas);
        }

        // Network Graph
        this.netCanvas = document.getElementById('networkGraph');
        if (this.netCanvas) {
            this.netCtx = this.netCanvas.getContext('2d');
            this.netData = new Array(50).fill(0);
            this.resizeCanvas(this.netCanvas);
        }

        window.addEventListener('resize', () => {
            if (this.cpuCanvas) this.resizeCanvas(this.cpuCanvas);
            if (this.netCanvas) this.resizeCanvas(this.netCanvas);
        });
    }

    resizeCanvas(canvas) {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
    }

    startMonitoring() {
        // Update every 1s
        setInterval(() => this.updateStats(), 1000);

        // Animate graphs at 30fps
        setInterval(() => this.drawGraphs(), 33);

        // Update Clock
        setInterval(() => this.updateClock(), 1000);
        this.updateClock();
    }

    updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
        const dateStr = now.toISOString().split('T')[0];

        const clockEl = document.getElementById('clock');
        const dateEl = document.getElementById('date');

        if (clockEl) clockEl.textContent = timeStr;
        if (dateEl) dateEl.textContent = dateStr;

        // Uptime
        const uptimeEl = document.getElementById('uptime');
        if (uptimeEl) {
            // Fake uptime increment
            const uptime = performance.now() / 1000;
            const h = Math.floor(uptime / 3600).toString().padStart(2, '0');
            const m = Math.floor((uptime % 3600) / 60).toString().padStart(2, '0');
            const s = Math.floor(uptime % 60).toString().padStart(2, '0');
            uptimeEl.textContent = `${h}:${m}:${s}`;
        }
    }

    updateStats() {
        // CPU
        const cpuUsage = Math.floor(Math.random() * 30) + 5; // Fake 5-35%
        const cpuEl = document.getElementById('cpuValue');
        if (cpuEl) cpuEl.textContent = `${cpuUsage}%`;
        this.cpuData.push(cpuUsage);
        this.cpuData.shift();

        // Memory
        const memUsage = (Math.random() * 0.5 + 4).toFixed(1); // Fake 4.0-4.5GB
        const memEl = document.getElementById('memoryValue');
        const memBar = document.getElementById('memoryBar');
        if (memEl) memEl.textContent = `${memUsage} GB`;
        if (memBar) {
            const percent = (parseFloat(memUsage) / 16) * 100;
            memBar.style.width = `${percent}%`;
        }

        // Network
        const netUsage = Math.floor(Math.random() * 50);
        this.netData.push(netUsage);
        this.netData.shift();

        // FPS
        const fpsEl = document.getElementById('fps');
        if (fpsEl) fpsEl.textContent = `FPS: ${Math.floor(58 + Math.random() * 4)}`;
    }

    drawGraphs() {
        if (this.cpuCanvas && this.cpuCtx) {
            this.drawGraph(this.cpuCtx, this.cpuData, '#00d9ff');
        }
        if (this.netCanvas && this.netCtx) {
            this.drawGraph(this.netCtx, this.netData, '#2ecc71');
        }
    }

    drawGraph(ctx, data, color) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const step = w / (data.length - 1);

        ctx.clearRect(0, 0, w, h);

        // Grid
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < w; i += 20) { ctx.moveTo(i, 0); ctx.lineTo(i, h); }
        for (let i = 0; i < h; i += 20) { ctx.moveTo(0, i); ctx.lineTo(w, i); }
        ctx.stroke();

        // Line
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        data.forEach((val, i) => {
            const x = i * step;
            const y = h - (val / 100 * h);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        ctx.stroke();

        // Fill
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.fillStyle = color + '22'; // Low opacity
        ctx.fill();
    }
}

window.systemMonitors = new SystemMonitors();
document.addEventListener('DOMContentLoaded', () => {
    // monitors = new MonitorGraphs(); // Old initialization
    // window.monitors = monitors; // Old initialization
});
