// Commands - Portfolio data and command handlers

const commands = {
    help: {
        description: 'Show available commands',
        execute: () => {
            return `
<div class="help-section">
    <div class="help-category">📁 Navigation & Info</div>
    <div class="help-command">
        <span class="help-command-name">help</span>
        <span class="help-command-desc">Show this help message</span>
    </div>
    <div class="help-command">
        <span class="help-command-name">about</span>
        <span class="help-command-desc">About NoctuaCoder</span>
    </div>
    <div class="help-command">
        <span class="help-command-name">projects</span>
        <span class="help-command-desc">View my projects</span>
    </div>
    <div class="help-command">
        <span class="help-command-name">skills</span>
        <span class="help-command-desc">Technical skills</span>
    </div>
    <div class="help-command">
        <span class="help-command-name">contact</span>
        <span class="help-command-desc">Get in touch</span>
    </div>
    
    <div class="help-category">🎨 Customization</div>
    <div class="help-command">
        <span class="help-command-name">theme</span>
        <span class="help-command-desc">Change color theme</span>
    </div>
    <div class="help-command">
        <span class="help-command-name">clear</span>
        <span class="help-command-desc">Clear terminal</span>
    </div>
    
    <div class="help-category">🦉 Special</div>
    <div class="help-command">
        <span class="help-command-name">owl</span>
        <span class="help-command-desc">Make the owl hoot!</span>
    </div>
</div>`;
        }
    },

    about: {
        description: 'About NoctuaCoder',
        execute: () => {
            return `
<div class="neofetch-container">
    <div class="neofetch-info">
        <div class="neofetch-line"><span class="neofetch-label">Name:</span> <span class="neofetch-value">NoctuaCoder</span></div>
        <div class="neofetch-line"><span class="neofetch-label">Role:</span> <span class="neofetch-value">Full-Stack Developer & Creative Coder</span></div>
        <div class="neofetch-line"><span class="neofetch-label">Location:</span> <span class="neofetch-value">Brazil 🇧🇷</span></div>
        <div class="neofetch-line"><span class="neofetch-label">Tagline:</span> <span class="neofetch-value">Converting starlight into source code ✨</span></div>
        <div class="neofetch-line"><span class="neofetch-label">Specialties:</span> <span class="neofetch-value">Glassmorphism, Interactive UI/UX, Celestial Themes</span></div>
        <div class="neofetch-line"><span class="neofetch-label">Philosophy:</span> <span class="neofetch-value">Code should be both functional and beautiful</span></div>
    </div>
</div>`;
        }
    },

    projects: {
        description: 'View my projects',
        execute: async () => {
            const projects = [
                {
                    name: 'Noctua Assistant',
                    description: 'Interactive portfolio chatbot with live GitHub integration and celestial design',
                    tech: ['JavaScript', 'GitHub API', 'Glassmorphism'],
                    demo: 'https://noctuacoder.github.io/noctua-assistant/',
                    github: 'https://github.com/NoctuaCoder/noctua-assistant'
                },
                {
                    name: 'Matrix Owl Terminal',
                    description: 'Celestial-cyberpunk terminal with interactive owl and particle effects',
                    tech: ['JavaScript', 'Canvas', 'SVG'],
                    demo: 'https://noctuacoder.github.io/matrix-owl/',
                    github: 'https://github.com/NoctuaCoder/matrix-owl'
                },
                {
                    name: 'Stellar Task Manager',
                    description: 'Beautiful task manager with React Hooks and glassmorphism UI',
                    tech: ['React', 'JavaScript', 'LocalStorage'],
                    demo: 'https://noctuacoder.github.io/stellar-task-manager/',
                    github: 'https://github.com/NoctuaCoder/stellar-task-manager'
                }
            ];

            let html = '<div style="margin: 1rem 0;">';
            projects.forEach(project => {
                html += `
<div class="project-card">
    <div class="project-card-header">
        <h3 class="project-card-title">${project.name}</h3>
    </div>
    <div class="project-card-tech">
        ${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
    </div>
    <p class="project-card-description">${project.description}</p>
    <div class="project-card-links">
        ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link">🌐 Live Demo</a>` : ''}
        <a href="${project.github}" target="_blank" class="project-link">📂 GitHub</a>
    </div>
</div>`;
            });
            html += '</div>';
            return html;
        }
    },

    skills: {
        description: 'Technical skills',
        execute: () => {
            const skills = {
                'Frontend': ['React', 'JavaScript', 'HTML/CSS', 'TypeScript'],
                'Design': ['Glassmorphism', 'UI/UX', 'Responsive Design', 'Animations'],
                'Tools': ['Git', 'Canvas API', 'Web Audio API', 'REST APIs'],
                'Other': ['Linux', 'Shell Scripting', 'Hyprland']
            };

            let html = '<div style="margin: 1rem 0;">';
            for (const [category, items] of Object.entries(skills)) {
                html += `
<div style="margin-bottom: 1rem;">
    <div class="help-category">${category}</div>
    <div class="project-card-tech">
        ${items.map(skill => `<span class="tech-badge">${skill}</span>`).join('')}
    </div>
</div>`;
            }
            html += '</div>';
            return html;
        }
    },

    contact: {
        description: 'Get in touch',
        execute: () => {
            return `
<div style="margin: 1rem 0;">
    <div class="help-category">📬 Get In Touch</div>
    <div class="neofetch-line"><span class="neofetch-label">Email:</span> <span class="neofetch-value">noctuacoder@proton.me</span></div>
    <div class="neofetch-line"><span class="neofetch-label">GitHub:</span> <a href="https://github.com/NoctuaCoder" target="_blank">@NoctuaCoder</a></div>
    <div class="neofetch-line"><span class="neofetch-label">Portfolio:</span> <a href="https://noctuacoder.github.io/NoctuaCoder/portfolio.html" target="_blank">View Portfolio</a></div>
    <div class="neofetch-line"><span class="neofetch-label">Status:</span> <span class="neofetch-value">Open to Frontend positions and UI/UX projects</span></div>
</div>`;
        }
    },

    theme: {
        description: 'Change color theme',
        execute: () => {
            cycleTheme();
            return '';
        }
    },

    clear: {
        description: 'Clear terminal',
        execute: () => {
            document.getElementById('terminalOutput').innerHTML = '';
            return '';
        }
    },

    owl: {
        description: 'Make the owl hoot!',
        execute: () => {
            if (window.owl) {
                window.owl.hoot();
            }
            return `
<div style="text-align: center; margin: 1rem 0;">
    <pre style="color: var(--neon-cyan); font-size: 1.5rem;">
    🦉
   /o o\\
  (  >  )
   \\ - /
    |||
   </pre>
   <p class="neon-text">Hoot hoot! 🌙</p>
</div>`;
        }
    }
};

window.commands = commands;
