// eDEX-UI Premium - Commands with Gradient Cards

const edexCommands = {
    help: {
        execute: () => `
<div class="gradient-card blue fade-in">
    <div class="card-content">
        <h3 class="card-title">NOCTUA ARCADE</h3>
        <p class="card-description">Professional gaming terminal with classic arcade games</p>
        <div style="margin-top: 1.5rem; display: grid; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                <span style="font-weight: 600;">snake</span>
                <span style="color: var(--text-secondary);">Classic Snake with tunnel wrapping</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                <span style="font-weight: 600;">tetris</span>
                <span style="color: var(--text-secondary);">Block stacking puzzle game</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                <span style="font-weight: 600;">pong</span>
                <span style="color: var(--text-secondary);">Classic paddle ball game</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                <span style="font-weight: 600;">breakout</span>
                <span style="color: var(--text-secondary);">Brick breaking arcade game</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                <span style="font-weight: 600;">guess</span>
                <span style="color: var(--text-secondary);">Number guessing game</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                <span style="font-weight: 600;">scores</span>
                <span style="color: var(--text-secondary);">View high scores</span>
            </div>
        </div>
    </div>
</div>

<div class="gradient-card purple fade-in">
    <div class="card-content">
        <h3 class="card-title">PORTFOLIO</h3>
        <p class="card-description">View developer information and projects</p>
        <div style="margin-top: 1rem; display: flex; gap: 1rem;">
            <span class="card-action">projects</span>
            <span class="card-action">skills</span>
            <span class="card-action">stats</span>
        </div>
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

    snake: {
        execute: () => {
            const game = new window.SnakeGame(document.getElementById('terminalOutput'));
            game.start();
            window.currentGame = game;
            return '';
        }
    },

    tetris: {
        execute: () => {
            const game = new window.TetrisGame(document.getElementById('terminalOutput'));
            game.start();
            window.currentGame = game;
            return '';
        }
    },

    guess: {
        execute: () => {
            const game = new window.GuessNumberGame(document.getElementById('terminalOutput'));
            game.start();
            window.currentGame = game;
            return '';
        }
    },

    pong: {
        execute: () => {
            const game = new window.PongGame(document.getElementById('terminalOutput'));
            game.start();
            window.currentGame = game;
            return '';
        }
    },

    breakout: {
        execute: () => {
            const game = new window.BreakoutGame(document.getElementById('terminalOutput'));
            game.start();
            window.currentGame = game;
            return '';
        }
    },

    scores: {
        execute: () => {
            const games = ['snake', 'tetris', 'breakout', 'pong', 'guess'];
            let html = `
<div class="gradient-card green fade-in">
    <div class="card-content">
        <h3 class="card-title">HIGH SCORES</h3>
        <p class="card-description">Top scores across all games</p>
        <div style="margin-top: 1.5rem; display: grid; gap: 1rem;">`;

            games.forEach(game => {
                const topScores = window.highScores.getTopScores(game, 3);
                const highScore = window.highScores.getHighScore(game);
                html += `
<div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 4px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
        <span style="font-weight: 700; text-transform: uppercase;">${game}</span>
        <span style="color: var(--accent-cyan);">Best: ${highScore}</span>
    </div>`;

                if (topScores.length > 0) {
                    topScores.forEach((score, i) => {
                        html += `
    <div style="display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
        <span>${i + 1}. ${score.name}</span>
        <span>${score.score}</span>
    </div>`;
                    });
                } else {
                    html += `<div style="font-size: 0.875rem; color: var(--text-dim); text-align: center;">No scores yet</div>`;
                }

                html += `</div>`;
            });

            html += `</div></div></div>`;
            return html;
        }
    },

    clear: {
        execute: () => {
            document.getElementById('terminalOutput').innerHTML = '';
            return '';
        }
    }
};

window.edexCommands = edexCommands;
