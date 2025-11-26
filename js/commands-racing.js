// Racing Commands - F1 Style

const racingCommands = {
    help: {
        description: 'Show available commands',
        execute: () => {
            return `
<div class="racing-card">
    <h2 class="racing-card-title">AVAILABLE COMMANDS</h2>
    <div class="racing-stat">
        <span class="racing-stat-label">TELEMETRY</span>
        <span class="racing-stat-value">View system telemetry</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">PERFORMANCE</span>
        <span class="racing-stat-value">Performance metrics</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">PROJECTS</span>
        <span class="racing-stat-value">View racing projects</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">SKILLS</span>
        <span class="racing-stat-value">Technical abilities</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">CONTACT</span>
        <span class="racing-stat-value">Communication channels</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">CLEAR</span>
        <span class="racing-stat-value">Clear display</span>
    </div>
</div>`;
        }
    },

    telemetry: {
        description: 'System telemetry',
        execute: () => {
            return `
<div class="racing-card">
    <div class="welcome-badges">
        <span class="racing-badge red">SYSTEM</span>
        <span class="racing-badge yellow">TELEMETRY</span>
        <span class="racing-badge green">ACTIVE</span>
    </div>
    <h2 class="racing-card-title">SYSTEM TELEMETRY</h2>
    <div class="racing-stat">
        <span class="racing-stat-label">DRIVER</span>
        <span class="racing-stat-value">NOCTUACODER</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">LOCATION</span>
        <span class="racing-stat-value">BRAZIL 🇧🇷</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">SPECIALIZATION</span>
        <span class="racing-stat-value">FRONTEND RACING</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">PHILOSOPHY</span>
        <span class="racing-stat-value">SPEED + BEAUTY</span>
    </div>
</div>`;
        }
    },

    performance: {
        description: 'Performance metrics',
        execute: () => {
            const repos = 42;
            const stars = 156;
            const commits = 1247;

            return `
<div class="racing-card">
    <div class="welcome-badges">
        <span class="racing-badge red">PERFORMANCE</span>
        <span class="racing-badge yellow">METRICS</span>
    </div>
    <h2 class="racing-card-title">PERFORMANCE DATA</h2>
    <div class="racing-stat">
        <span class="racing-stat-label">REPOSITORIES</span>
        <span class="racing-stat-value">${repos}</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">TOTAL STARS</span>
        <span class="racing-stat-value">${stars}</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">COMMITS</span>
        <span class="racing-stat-value">${commits}</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">UPTIME</span>
        <span class="racing-stat-value">24/7</span>
    </div>
</div>`;
        }
    },

    projects: {
        description: 'Racing projects',
        execute: () => {
            const projects = [
                { name: 'NOCTUA ASSISTANT', status: 'DEPLOYED', speed: '95%' },
                { name: 'RACING TERMINAL', status: 'ACTIVE', speed: '100%' },
                { name: 'STELLAR TASKS', status: 'DEPLOYED', speed: '90%' }
            ];

            let html = '';
            projects.forEach(p => {
                html += `
<div class="racing-card">
    <div class="welcome-badges">
        <span class="racing-badge green">${p.status}</span>
    </div>
    <h2 class="racing-card-title">${p.name}</h2>
    <div class="racing-stat">
        <span class="racing-stat-label">PERFORMANCE</span>
        <span class="racing-stat-value">${p.speed}</span>
    </div>
</div>`;
            });
            return html;
        }
    },

    skills: {
        description: 'Technical skills',
        execute: () => {
            const skills = [
                { name: 'JAVASCRIPT', level: 95 },
                { name: 'REACT', level: 90 },
                { name: 'CSS RACING', level: 95 },
                { name: 'UI/UX SPEED', level: 85 }
            ];

            let html = `
<div class="racing-card">
    <div class="welcome-badges">
        <span class="racing-badge red">TECHNICAL</span>
        <span class="racing-badge yellow">SKILLS</span>
    </div>
    <h2 class="racing-card-title">TECHNICAL ABILITIES</h2>`;

            skills.forEach(skill => {
                html += `
<div class="racing-stat">
    <span class="racing-stat-label">${skill.name}</span>
    <span class="racing-stat-value">${skill.level}%</span>
</div>`;
            });

            html += `</div>`;
            return html;
        }
    },

    contact: {
        description: 'Communication channels',
        execute: () => {
            return `
<div class="racing-card">
    <div class="welcome-badges">
        <span class="racing-badge green">COMMUNICATION</span>
        <span class="racing-badge yellow">CHANNELS</span>
    </div>
    <h2 class="racing-card-title">CONTACT CHANNELS</h2>
    <div class="racing-stat">
        <span class="racing-stat-label">EMAIL</span>
        <span class="racing-stat-value">noctuacoder@proton.me</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">GITHUB</span>
        <span class="racing-stat-value">@NoctuaCoder</span>
    </div>
    <div class="racing-stat">
        <span class="racing-stat-label">STATUS</span>
        <span class="racing-stat-value">OPEN TO PROJECTS</span>
    </div>
</div>`;
        }
    },

    clear: {
        description: 'Clear display',
        execute: () => {
            document.getElementById('outputContainer').innerHTML = '';
            return '';
        }
    }
};

window.racingCommands = racingCommands;
