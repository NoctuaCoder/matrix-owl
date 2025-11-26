// eDEX-UI Premium - Commands with Gradient Cards

const edexCommands = {
    help: {
        execute: () => `
<div class="gradient-card orange fade-in">
    <div class="card-content">
        <div class="card-icon">📚</div>
        <h3 class="card-title">PROJECTS</h3>
        <p class="card-description">View portfolio of applications and creative coding projects</p>
        <span class="card-action">→ Type: projects</span>
    </div>
</div>

<div class="gradient-card blue fade-in">
    <div class="card-content">
        <div class="card-icon">⚡</div>
        <h3 class="card-title">SKILLS</h3>
        <p class="card-description">Technical abilities and proficiency levels</p>
        <span class="card-action">→ Type: skills</span>
    </div>
</div>

<div class="gradient-card green fade-in">
    <div class="card-content">
        <div class="card-icon">📊</div>
        <h3 class="card-title">STATS</h3>
        <p class="card-description">GitHub statistics and activity metrics</p>
        <span class="card-action">→ Type: stats</span>
    </div>
</div>`
    },

    projects: {
        execute: () => `
<div class="gradient-card orange fade-in">
    <div class="card-content">
        <div class="card-icon">🤖</div>
        <h3 class="card-title">NOCTUA ASSISTANT</h3>
        <p class="card-description">Interactive portfolio chatbot with live GitHub integration</p>
        <span class="card-action">→ DEPLOYED</span>
    </div>
</div>

<div class="gradient-card blue fade-in">
    <div class="card-content">
        <div class="card-icon">💻</div>
        <h3 class="card-title">eDEX-UI PREMIUM</h3>
        <p class="card-description">Hybrid terminal combining sci-fi aesthetics with modern design</p>
        <span class="card-action">→ ACTIVE</span>
    </div>
</div>

<div class="gradient-card green fade-in">
    <div class="card-content">
        <div class="card-icon">✅</div>
        <h3 class="card-title">STELLAR TASKS</h3>
        <p class="card-description">Beautiful task manager with glassmorphism UI</p>
        <span class="card-action">→ DEPLOYED</span>
    </div>
</div>`
    },

    skills: {
        execute: () => `
<div class="gradient-card purple fade-in">
    <div class="card-content">
        <div class="card-icon">⚛️</div>
        <h3 class="card-title">REACT & JAVASCRIPT</h3>
        <p class="card-description">Expert in modern JavaScript, React Hooks, component architecture</p>
        <span class="card-action">→ 95% PROFICIENCY</span>
    </div>
</div>

<div class="gradient-card blue fade-in">
    <div class="card-content">
        <div class="card-icon">🎨</div>
        <h3 class="card-title">CSS & DESIGN</h3>
        <p class="card-description">Glassmorphism, animations, modern UI/UX patterns</p>
        <span class="card-action">→ 95% PROFICIENCY</span>
    </div>
</div>`
    },

    stats: {
        execute: () => `
<div class="gradient-card orange fade-in">
    <div class="card-content">
        <div class="card-icon">⭐</div>
        <h3 class="card-title">156 STARS</h3>
        <p class="card-description">Total stars across all repositories</p>
        <span class="card-action">→ GITHUB</span>
    </div>
</div>

<div class="gradient-card blue fade-in">
    <div class="card-content">
        <div class="card-icon">📦</div>
        <h3 class="card-title">42 REPOSITORIES</h3>
        <p class="card-description">Public repositories on GitHub</p>
        <span class="card-action">→ ACTIVE</span>
    </div>
</div>

<div class="gradient-card green fade-in">
    <div class="card-content">
        <div class="card-icon">💚</div>
        <h3 class="card-title">1.2K COMMITS</h3>
        <p class="card-description">Contributions this year</p>
        <span class="card-action">→ 2024</span>
    </div>
</div>`
    },

    clear: {
        execute: () => {
            document.getElementById('terminalOutput').innerHTML = '';
            return '';
        }
    }
};

window.edexCommands = edexCommands;
