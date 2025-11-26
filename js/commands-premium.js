// Premium Commands - Gradient Cards Style

const premiumCommands = {
    help: {
        description: 'Show available commands',
        execute: () => {
            return `
<div class="gradient-cards-grid fade-in">
    <div class="gradient-card orange">
        <div class="card-content">
            <div class="card-icon">📚</div>
            <h3 class="card-title">Projects</h3>
            <p class="card-description">View my portfolio of web applications and creative coding projects.</p>
            <span class="card-action">View Projects</span>
        </div>
    </div>
    
    <div class="gradient-card blue">
        <div class="card-content">
            <div class="card-icon">⚡</div>
            <h3 class="card-title">Skills</h3>
            <p class="card-description">Technical abilities and proficiency levels across different technologies.</p>
            <span class="card-action">View Skills</span>
        </div>
    </div>
    
    <div class="gradient-card green">
        <div class="card-content">
            <div class="card-icon">📊</div>
            <h3 class="card-title">Stats</h3>
            <p class="card-description">GitHub statistics and development activity metrics.</p>
            <span class="card-action">View Stats</span>
        </div>
    </div>
</div>

<div class="gradient-cards-grid fade-in">
    <div class="gradient-card purple">
        <div class="card-content">
            <div class="card-icon">👤</div>
            <h3 class="card-title">About</h3>
            <p class="card-description">Learn more about my background and development philosophy.</p>
            <span class="card-action">Read More</span>
        </div>
    </div>
    
    <div class="gradient-card pink">
        <div class="card-content">
            <div class="card-icon">📧</div>
            <h3 class="card-title">Contact</h3>
            <p class="card-description">Get in touch for collaborations and opportunities.</p>
            <span class="card-action">Contact Me</span>
        </div>
    </div>
</div>`;
        }
    },

    projects: {
        description: 'View projects',
        execute: () => {
            return `
<div class="gradient-cards-grid fade-in">
    <div class="gradient-card orange">
        <div class="card-content">
            <div class="card-icon">🤖</div>
            <h3 class="card-title">Noctua Assistant</h3>
            <p class="card-description">Interactive portfolio chatbot with live GitHub integration and celestial design.</p>
            <span class="card-action">View Demo</span>
        </div>
    </div>
    
    <div class="gradient-card blue">
        <div class="card-content">
            <div class="card-icon">💻</div>
            <h3 class="card-title">Premium Terminal</h3>
            <p class="card-description">Modern terminal with gradient cards and clean minimalist design.</p>
            <span class="card-action">View Demo</span>
        </div>
    </div>
    
    <div class="gradient-card green">
        <div class="card-content">
            <div class="card-icon">✅</div>
            <h3 class="card-title">Stellar Tasks</h3>
            <p class="card-description">Beautiful task manager built with React Hooks and glassmorphism UI.</p>
            <span class="card-action">View Demo</span>
        </div>
    </div>
</div>`;
        }
    },

    skills: {
        description: 'Technical skills',
        execute: () => {
            return `
<div class="stats-card fade-in">
    <div class="stats-card-header">
        <div class="stats-badges">
            <span class="badge">dev</span>
            <span class="badge">frontend</span>
            <span class="badge">design</span>
        </div>
        <button class="stats-menu">⋯</button>
    </div>
    
    <h3 class="stats-title">Technical Skills</h3>
    <p class="stats-subtitle">Proficiency across different technologies and frameworks</p>
    
    <div class="stats-main">
        <div class="stats-number">95%</div>
        <div class="stats-change positive">↗ 5%</div>
    </div>
    
    <p class="stats-label">Average proficiency level</p>
    
    <div class="progress-bars">
        ${Array(30).fill(0).map((_, i) => {
                const height = i < 22 ? Math.random() * 60 + 40 : Math.random() * 30 + 10;
                const filled = i < 22;
                return `<div class="progress-bar ${filled ? 'filled' : 'empty'}" style="height: ${height}%"></div>`;
            }).join('')}
    </div>
</div>

<div class="gradient-cards-grid fade-in">
    <div class="gradient-card purple">
        <div class="card-content">
            <div class="card-icon">⚛️</div>
            <h3 class="card-title">React & JavaScript</h3>
            <p class="card-description">Expert in modern JavaScript, React Hooks, and component architecture.</p>
            <span class="card-action">95% Proficiency</span>
        </div>
    </div>
    
    <div class="gradient-card blue">
        <div class="card-content">
            <div class="card-icon">🎨</div>
            <h3 class="card-title">CSS & Design</h3>
            <p class="card-description">Glassmorphism, animations, and modern UI/UX design patterns.</p>
            <span class="card-action">95% Proficiency</span>
        </div>
    </div>
</div>`;
        }
    },

    stats: {
        description: 'GitHub statistics',
        execute: () => {
            return `
<div class="stats-card fade-in">
    <div class="stats-card-header">
        <div class="stats-badges">
            <span class="badge">github</span>
            <span class="badge">activity</span>
        </div>
        <button class="stats-menu">⋯</button>
    </div>
    
    <h3 class="stats-title">GitHub Activity</h3>
    <p class="stats-subtitle">You are on track to reach the goal in three days.</p>
    
    <div class="stats-main">
        <div class="stats-number">71%</div>
        <div class="stats-change positive">↗ 14%</div>
    </div>
    
    <p class="stats-label">since you last checked</p>
    
    <div class="progress-bars">
        ${Array(30).fill(0).map((_, i) => {
                const height = i < 21 ? Math.random() * 60 + 40 : Math.random() * 30 + 10;
                const filled = i < 21;
                return `<div class="progress-bar ${filled ? 'filled' : 'empty'}" style="height: ${height}%"></div>`;
            }).join('')}
    </div>
</div>

<div class="gradient-cards-grid fade-in">
    <div class="gradient-card orange">
        <div class="card-content">
            <div class="card-icon">⭐</div>
            <h3 class="card-title">156 Stars</h3>
            <p class="card-description">Total stars across all repositories</p>
            <span class="card-action">View Repos</span>
        </div>
    </div>
    
    <div class="gradient-card blue">
        <div class="card-content">
            <div class="card-icon">📦</div>
            <h3 class="card-title">42 Repos</h3>
            <p class="card-description">Public repositories on GitHub</p>
            <span class="card-action">Explore</span>
        </div>
    </div>
    
    <div class="gradient-card green">
        <div class="card-content">
            <div class="card-icon">💚</div>
            <h3 class="card-title">1.2K Commits</h3>
            <p class="card-description">Contributions this year</p>
            <span class="card-action">View Activity</span>
        </div>
    </div>
</div>`;
        }
    },

    about: {
        description: 'About me',
        execute: () => {
            return `
<div class="stats-card fade-in">
    <div class="stats-card-header">
        <div class="stats-badges">
            <span class="badge">developer</span>
            <span class="badge">designer</span>
            <span class="badge">brazil</span>
        </div>
        <button class="stats-menu">⋯</button>
    </div>
    
    <h3 class="stats-title">NoctuaCoder</h3>
    <p class="stats-subtitle">Full-Stack Developer & Creative Coder specializing in glassmorphism, interactive UI/UX, and modern web experiences.</p>
    
    <div style="margin-top: 2rem;">
        <p style="color: var(--text-secondary); line-height: 1.8;">
            Converting starlight into source code ✨<br><br>
            Based in Brazil 🇧🇷, I create beautiful and functional web applications with a focus on premium aesthetics and smooth user experiences.
        </p>
    </div>
</div>`;
        }
    },

    contact: {
        description: 'Contact information',
        execute: () => {
            return `
<div class="gradient-cards-grid fade-in">
    <div class="gradient-card purple">
        <div class="card-content">
            <div class="card-icon">📧</div>
            <h3 class="card-title">Email</h3>
            <p class="card-description">noctuacoder@proton.me</p>
            <span class="card-action">Send Email</span>
        </div>
    </div>
    
    <div class="gradient-card blue">
        <div class="card-content">
            <div class="card-icon">🐙</div>
            <h3 class="card-title">GitHub</h3>
            <p class="card-description">@NoctuaCoder</p>
            <span class="card-action">View Profile</span>
        </div>
    </div>
    
    <div class="gradient-card green">
        <div class="card-content">
            <div class="card-icon">🌐</div>
            <h3 class="card-title">Portfolio</h3>
            <p class="card-description">View my complete portfolio</p>
            <span class="card-action">Visit Site</span>
        </div>
    </div>
</div>`;
        }
    },

    clear: {
        description: 'Clear terminal',
        execute: () => {
            document.getElementById('outputArea').innerHTML = '';
            return '';
        }
    }
};

window.premiumCommands = premiumCommands;
