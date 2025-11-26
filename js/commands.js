// Commands - Dashboard Style

const commands = {
    help: {
        description: 'Show available commands',
        execute: () => {
            return `
<div class="stat-card">
    <div class="card-tags">
        <span class="tag">navigation</span>
        <span class="tag">info</span>
    </div>
    <h2 class="stat-card-title">Available Commands</h2>
    <div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
            <code style="color: var(--accent-blue); font-weight: 600;">about</code>
            <span style="color: var(--text-secondary);">About NoctuaCoder</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
            <code style="color: var(--accent-blue); font-weight: 600;">projects</code>
            <span style="color: var(--text-secondary);">View my projects</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
            <code style="color: var(--accent-blue); font-weight: 600;">skills</code>
            <span style="color: var(--text-secondary);">Technical skills</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
            <code style="color: var(--accent-blue); font-weight: 600;">stats</code>
            <span style="color: var(--text-secondary);">GitHub statistics</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
            <code style="color: var(--accent-blue); font-weight: 600;">contact</code>
            <span style="color: var(--text-secondary);">Get in touch</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
            <code style="color: var(--accent-blue); font-weight: 600;">clear</code>
            <span style="color: var(--text-secondary);">Clear terminal</span>
        </div>
    </div>
</div>`;
        }
    },

    about: {
        description: 'About NoctuaCoder',
        execute: () => {
            return `
<div class="stat-card">
    <div class="card-tags">
        <span class="tag">developer</span>
        <span class="tag">designer</span>
        <span class="tag">brazil</span>
    </div>
    <h2 class="stat-card-title">NoctuaCoder</h2>
    <div style="margin-top: 1.5rem; line-height: 1.8;">
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
            Full-Stack Developer & Creative Coder specializing in glassmorphism, interactive UI/UX, and celestial-themed designs.
        </p>
        <p style="color: var(--text-tertiary); font-style: italic;">
            "Converting starlight into source code ✨"
        </p>
    </div>
    <div style="margin-top: 1.5rem; display: grid; gap: 0.5rem;">
        <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-tertiary);">Location</span>
            <span style="color: var(--text-primary);">Brazil 🇧🇷</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-tertiary);">Specialties</span>
            <span style="color: var(--text-primary);">UI/UX, Glassmorphism</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-tertiary);">Philosophy</span>
            <span style="color: var(--text-primary);">Beauty + Function</span>
        </div>
    </div>
</div>`;
        }
    },

    projects: {
        description: 'View my projects',
        execute: () => {
            const projects = [
                {
                    name: 'Noctua Assistant',
                    description: 'Interactive portfolio chatbot with live GitHub integration',
                    tech: ['JavaScript', 'GitHub API', 'Glassmorphism'],
                    stars: 12,
                    demo: 'https://noctuacoder.github.io/noctua-assistant/',
                    github: 'https://github.com/NoctuaCoder/noctua-assistant'
                },
                {
                    name: 'Matrix Owl Terminal',
                    description: 'Modern dashboard-style terminal with stats visualization',
                    tech: ['JavaScript', 'CSS', 'Canvas'],
                    stars: 8,
                    demo: 'https://noctuacoder.github.io/matrix-owl/',
                    github: 'https://github.com/NoctuaCoder/matrix-owl'
                },
                {
                    name: 'Stellar Task Manager',
                    description: 'Beautiful task manager with React Hooks',
                    tech: ['React', 'JavaScript', 'LocalStorage'],
                    stars: 15,
                    demo: 'https://noctuacoder.github.io/stellar-task-manager/',
                    github: 'https://github.com/NoctuaCoder/stellar-task-manager'
                }
            ];

            let html = '';
            projects.forEach(project => {
                html += `
<div class="project-card">
    <div class="project-card-header">
        <h3 class="project-card-title">${project.name}</h3>
        <div class="project-card-stats">
            <span>⭐ ${project.stars}</span>
        </div>
    </div>
    <p class="project-card-description">${project.description}</p>
    <div class="project-card-tech">
        ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="project-card-links">
        <a href="${project.demo}" target="_blank" class="project-link">Live Demo →</a>
        <a href="${project.github}" target="_blank" class="project-link">GitHub</a>
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
                { name: 'JavaScript', level: 95 },
                { name: 'React', level: 90 },
                { name: 'CSS/Glassmorphism', level: 95 },
                { name: 'UI/UX Design', level: 85 },
                { name: 'Node.js', level: 80 },
                { name: 'Git & GitHub', level: 88 }
            ];

            function getColorClass(level) {
                if (level >= 90) return 'expert';
                if (level >= 75) return 'high';
                if (level >= 50) return 'medium';
                return 'low';
            }

            let html = `
<div class="stat-card">
    <div class="card-tags">
        <span class="tag">frontend</span>
        <span class="tag">design</span>
        <span class="tag">development</span>
    </div>
    <h2 class="stat-card-title">Technical Skills</h2>
    <div class="racing-progress">`;

            skills.forEach(skill => {
                const colorClass = getColorClass(skill.level);
                html += `
<div class="racing-progress-item">
    <div class="racing-progress-header">
        <span class="racing-progress-label">${skill.name}</span>
        <span class="racing-progress-value">${skill.level}%</span>
    </div>
    <div class="racing-progress-bar-container">
        <div class="racing-progress-bar-fill ${colorClass}" style="width: ${skill.level}%;">
            <span class="racing-progress-bar-indicator">${skill.level}%</span>
        </div>
    </div>
</div>`;
            });

            html += `</div></div>`;
            return html;
        }
    },

    stats: {
        description: 'GitHub statistics',
        execute: () => {
            return `
<div class="stat-card">
    <div class="card-tags">
        <span class="tag">github</span>
        <span class="tag">activity</span>
    </div>
    <h2 class="stat-card-title">GitHub Activity</h2>
    <div class="stat-number">42</div>
    <div class="stat-change positive">↗ 14% since last month</div>
    <div class="progress-bars">
        ${Array(30).fill(0).map(() =>
                `<div class="progress-bar" style="height: ${Math.random() * 100}%;"></div>`
            ).join('')}
    </div>
</div>

<div class="stat-card">
    <h3 class="stat-card-title">Repository Stats</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
        <div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--accent-blue);">156</div>
            <div style="color: var(--text-tertiary); font-size: 0.875rem;">Total Stars</div>
        </div>
        <div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--accent-purple);">23</div>
            <div style="color: var(--text-tertiary); font-size: 0.875rem;">Repositories</div>
        </div>
        <div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--accent-pink);">89</div>
            <div style="color: var(--text-tertiary); font-size: 0.875rem;">Followers</div>
        </div>
    </div>
</div>`;
        }
    },

    contact: {
        description: 'Get in touch',
        execute: () => {
            return `
<div class="stat-card">
    <div class="card-tags">
        <span class="tag">contact</span>
        <span class="tag">social</span>
    </div>
    <h2 class="stat-card-title">Get In Touch</h2>
    <div style="margin-top: 1.5rem; display: grid; gap: 1rem;">
        <a href="mailto:noctuacoder@proton.me" style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md); text-decoration: none; color: var(--text-primary); transition: all 0.2s;">
            <span>📧 Email</span>
            <span style="color: var(--accent-blue);">noctuacoder@proton.me</span>
        </a>
        <a href="https://github.com/NoctuaCoder" target="_blank" style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md); text-decoration: none; color: var(--text-primary); transition: all 0.2s;">
            <span>🐙 GitHub</span>
            <span style="color: var(--accent-blue);">@NoctuaCoder</span>
        </a>
        <a href="https://noctuacoder.github.io/NoctuaCoder/portfolio.html" target="_blank" style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md); text-decoration: none; color: var(--text-primary); transition: all 0.2s;">
            <span>🌐 Portfolio</span>
            <span style="color: var(--accent-blue);">View Site →</span>
        </a>
    </div>
</div>`;
        }
    },

    clear: {
        description: 'Clear terminal',
        execute: () => {
            document.getElementById('outputContainer').innerHTML = '';
            return '';
        }
    }
};

window.commands = commands;
