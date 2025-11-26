// eDEX-UI Premium - Monitor Graphics

class MonitorGraphs {
    constructor() {
        this.cpuCanvas = document.getElementById('cpuGraph');
        this.ramCanvas = document.getElementById('ramGraph');
        this.netCanvas = document.getElementById('netGraph');
        
        this.cpuData = Array(50).fill(0);
        this.ramData = Array(50).fill(0);
        this.netData = Array(50).fill(0);
        
        this.init();
    }

    init() {
        if (this.cpuCanvas) this.setupCanvas(this.cpuCanvas);
        if (this.ramCanvas) this.setupCanvas(this.ramCanvas);
        if (this.netCanvas) this.setupCanvas(this.netCanvas);
        
        setInterval(() => this.update(), 1000);
    }

    setupCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    update() {
        // Update CPU
        const cpu = Math.floor(Math.random() * 40 + 30);
        this.cpuData.push(cpu);
        this.cpuData.shift();
        document.getElementById('cpuValue').textContent = cpu + '%';
        this.drawGraph(this.cpuCanvas, this.cpuData, '#00ff00');
        
        // Update RAM
        const ram = (Math.random() * 2 + 7).toFixed(1);
        const ramPercent = Math.floor(Math.random() * 30 + 50);
        this.ramData.push(ramPercent);
        this.ramData.shift();
        document.getElementById('ramValue').textContent = ram + 'GB';
        this.drawGraph(this.ramCanvas, this.ramData, '#00ffff');
        
        // Update Network
        const net = (Math.random() * 2).toFixed(1);
        const netPercent = Math.floor(Math.random() * 60 + 20);
        this.netData.push(netPercent);
        this.netData.shift();
        document.getElementById('netValue').textContent = '↓ ' + net + 'MB/s';
        this.drawGraph(this.netCanvas, this.netData, '#ff6b35');
    }

    drawGraph(canvas, data, color) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        
        ctx.beginPath();
        data.forEach((value, i) => {
            const x = (i / data.length) * width;
            const y = height - (value / 100) * height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
    }
}

// Initialize
let monitors;
document.addEventListener('DOMContentLoaded', () => {
    monitors = new MonitorGraphs();
    window.monitors = monitors;
});
