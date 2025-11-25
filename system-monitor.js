// System Monitor HUD - eDEX-UI Style
class SystemMonitor {
    constructor() {
        this.visible = false;
        this.stats = {
            cpu: 0,
            ram: 0,
            network: { up: 0, down: 0 },
            disk: 0,
            uptime: 0
        };

        this.cpuHistory = new Array(60).fill(0);
        this.ramHistory = new Array(60).fill(0);

        this.createHUD();
        this.startMonitoring();
    }

    createHUD() {
        const hud = document.createElement('div');
        hud.id = 'system-hud';
        hud.className = 'system-hud hidden';
        hud.innerHTML = `
            <div class="hud-header">
                <span class="hud-title">◆ SYSTEM MONITOR</span>
                <button class="hud-close" onclick="systemMonitor.toggle()">×</button>
            </div>
            
            <div class="hud-content">
                <!-- CPU Monitor -->
                <div class="hud-section">
                    <div class="hud-label">CPU USAGE</div>
                    <div class="hud-value" id="cpu-value">0%</div>
                    <canvas id="cpu-graph" width="250" height="60"></canvas>
                </div>
                
                <!-- RAM Monitor -->
                <div class="hud-section">
                    <div class="hud-label">MEMORY</div>
                    <div class="hud-value" id="ram-value">0%</div>
                    <div class="progress-ring">
                        <svg width="80" height="80">
                            <circle cx="40" cy="40" r="35" class="progress-ring-bg"/>
                            <circle cx="40" cy="40" r="35" class="progress-ring-fill" id="ram-circle"/>
                        </svg>
                        <div class="progress-text" id="ram-text">0%</div>
                    </div>
                </div>
                
                <!-- Network Monitor -->
                <div class="hud-section">
                    <div class="hud-label">NETWORK</div>
                    <div class="network-stats">
                        <div class="network-item">
                            <span class="network-icon">↑</span>
                            <span id="net-up">0 KB/s</span>
                        </div>
                        <div class="network-item">
                            <span class="network-icon">↓</span>
                            <span id="net-down">0 KB/s</span>
                        </div>
                    </div>
                </div>
                
                <!-- Disk Usage -->
                <div class="hud-section">
                    <div class="hud-label">DISK</div>
                    <div class="hexagon-container">
                        <div class="hexagon">
                            <div class="hexagon-text" id="disk-value">0%</div>
                        </div>
                    </div>
                </div>
                
                <!-- Uptime -->
                <div class="hud-section">
                    <div class="hud-label">UPTIME</div>
                    <div class="hud-value" id="uptime-value">00:00:00</div>
                </div>
            </div>
        `;

        document.body.appendChild(hud);
        this.hud = hud;
        this.setupGraphs();
    }

    setupGraphs() {
        this.cpuCanvas = document.getElementById('cpu-graph');
        this.cpuCtx = this.cpuCanvas.getContext('2d');
    }

    toggle() {
        this.visible = !this.visible;
        this.hud.classList.toggle('hidden');

        if (window.printOutput) {
            printOutput(`System HUD ${this.visible ? 'enabled' : 'disabled'}`, 'info');
        }
    }

    startMonitoring() {
        const startTime = Date.now();

        setInterval(() => {
            // Simulate CPU (smooth random walk)
            this.stats.cpu = Math.max(0, Math.min(100,
                this.stats.cpu + (Math.random() - 0.5) * 10
            ));
            if (this.stats.cpu === 0) this.stats.cpu = Math.random() * 30 + 20;

            // Simulate RAM
            this.stats.ram = Math.max(0, Math.min(100,
                this.stats.ram + (Math.random() - 0.5) * 5
            ));
            if (this.stats.ram === 0) this.stats.ram = Math.random() * 40 + 40;

            // Simulate Network
            this.stats.network.up = Math.random() * 500 + 50;
            this.stats.network.down = Math.random() * 1000 + 100;

            // Simulate Disk
            this.stats.disk = 65 + Math.random() * 10;

            // Calculate uptime
            this.stats.uptime = Math.floor((Date.now() - startTime) / 1000);

            this.updateDisplay();
        }, 1000);
    }

    updateDisplay() {
        // Update CPU
        document.getElementById('cpu-value').textContent = `${Math.round(this.stats.cpu)}%`;
        this.cpuHistory.push(this.stats.cpu);
        this.cpuHistory.shift();
        this.drawCPUGraph();

        // Update RAM
        document.getElementById('ram-value').textContent = `${Math.round(this.stats.ram)}%`;
        document.getElementById('ram-text').textContent = `${Math.round(this.stats.ram)}%`;
        this.updateRamCircle(this.stats.ram);

        // Update Network
        document.getElementById('net-up').textContent = `${Math.round(this.stats.network.up)} KB/s`;
        document.getElementById('net-down').textContent = `${Math.round(this.stats.network.down)} KB/s`;

        // Update Disk
        document.getElementById('disk-value').textContent = `${Math.round(this.stats.disk)}%`;

        // Update Uptime
        const hours = Math.floor(this.stats.uptime / 3600);
        const minutes = Math.floor((this.stats.uptime % 3600) / 60);
        const seconds = this.stats.uptime % 60;
        document.getElementById('uptime-value').textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    drawCPUGraph() {
        const ctx = this.cpuCtx;
        const width = this.cpuCanvas.width;
        const height = this.cpuCanvas.height;

        ctx.clearRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = (height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw graph
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();

        this.cpuHistory.forEach((value, index) => {
            const x = (width / this.cpuHistory.length) * index;
            const y = height - (value / 100) * height;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Fill area under graph
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.fill();
    }

    updateRamCircle(percentage) {
        const circle = document.getElementById('ram-circle');
        const radius = 35;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
    }
}

// Initialize
let systemMonitor;
document.addEventListener('DOMContentLoaded', () => {
    systemMonitor = new SystemMonitor();
});
