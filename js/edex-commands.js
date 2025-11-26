// eDEX-UI Premium - Commands with Gradient Cards

const edexCommands = {
    help: {
        execute: () => `
    < div class="gradient-card purple fade-in" >
        <div class="card-content">
            <h3 class="card-title">🦉 NOCTUA ARCADE & TERMINAL</h3>
            <p class="card-description">Professional gaming terminal with utilities and surprises</p>

            <div style="margin-top: 1.5rem; display: grid; gap: 1.5rem;">

                <!-- GAMES -->
                <div>
                    <h4 style="color: var(--accent-cyan); font-weight: 700; margin-bottom: 0.75rem;">🎮 GAMES</h4>
                    <div style="display: grid; gap: 0.5rem;">
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">snake</span>
                            <span style="color: var(--text-secondary);">Snake with tunnel wrapping</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">tetris</span>
                            <span style="color: var(--text-secondary);">Classic Tetris</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">pong</span>
                            <span style="color: var(--text-secondary);">2-player paddle game</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">breakout</span>
                            <span style="color: var(--text-secondary);">Brick breaking game</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">guess</span>
                            <span style="color: var(--text-secondary);">Number guessing</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">scores</span>
                            <span style="color: var(--text-secondary);">View high scores</span>
                        </div>
                    </div>
                </div>

                <!-- UTILITIES -->
                <div>
                    <h4 style="color: var(--accent-green); font-weight: 700; margin-bottom: 0.75rem;">🛠️ UTILITIES</h4>
                    <div style="display: grid; gap: 0.5rem;">
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">calc [expression]</span>
                            <span style="color: var(--text-secondary);">Calculator</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">timer [minutes]</span>
                            <span style="color: var(--text-secondary);">Countdown timer</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">todo</span>
                            <span style="color: var(--text-secondary);">Task list manager</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">weather [city]</span>
                            <span style="color: var(--text-secondary);">Live weather</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">crypto</span>
                            <span style="color: var(--text-secondary);">Crypto prices</span>
                        </div>
                    </div>
                </div>

                <!-- EFFECTS & THEMES -->
                <div>
                    <h4 style="color: var(--accent-purple); font-weight: 700; margin-bottom: 0.75rem;">✨ EFFECTS & THEMES</h4>
                    <div style="display: grid; gap: 0.5rem;">
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">particles</span>
                            <span style="color: var(--text-secondary);">Toggle floating particles</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">glitch</span>
                            <span style="color: var(--text-secondary);">Trigger glitch effect</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">matrix</span>
                            <span style="color: var(--text-secondary);">Matrix digital rain</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">theme [name]</span>
                            <span style="color: var(--text-secondary);">Change color theme</span>
                        </div>
                    </div>
                </div>

                <!-- FUN COMMANDS -->
                <div>
                    <h4 style="color: var(--accent-orange); font-weight: 700; margin-bottom: 0.75rem;">🎉 FUN</h4>
                    <div style="display: grid; gap: 0.5rem;">
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">hack</span>
                            <span style="color: var(--text-secondary);">Hollywood hacking simulator</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">fortune</span>
                            <span style="color: var(--text-secondary);">Random quotes</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">joke</span>
                            <span style="color: var(--text-secondary);">Programming jokes</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">noctua</span>
                            <span style="color: var(--text-secondary);">Meet the owl 🦉</span>
                        </div>
                    </div>
                </div>

                <!-- PORTFOLIO -->
                <div>
                    <h4 style="color: var(--accent-pink); font-weight: 700; margin-bottom: 0.75rem;">💼 PORTFOLIO</h4>
                    <div style="display: grid; gap: 0.5rem;">
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">projects</span>
                            <span style="color: var(--text-secondary);">View my projects</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px;">
                            <span style="font-weight: 600;">clear</span>
                            <span style="color: var(--text-secondary);">Clear terminal</span>
                        </div>
                    </div>
                </div>

            </div>

            <p style="margin-top: 1.5rem; text-align: center; color: var(--text-dim); font-size: 0.875rem;">
                Hint: Try the Konami code... ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
        </div>
</div > `
    },

    projects: {
        execute: () => `
    < div class="gradient-card orange fade-in" >
        <div class="card-content">
            <div class="card-icon">🤖</div>
            <h3 class="card-title">NOCTUA ASSISTANT</h3>
            <p class="card-description">Interactive portfolio chatbot with live GitHub integration</p>
            <span class="card-action">→ DEPLOYED</span>
        </div>
</div >

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
    < div class="gradient-card purple fade-in" >
        <div class="card-content">
            <div class="card-icon">⚛️</div>
            <h3 class="card-title">REACT & JAVASCRIPT</h3>
            <p class="card-description">Expert in modern JavaScript, React Hooks, component architecture</p>
            <span class="card-action">→ 95% PROFICIENCY</span>
        </div>
</div >

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
        < div class="gradient-card orange fade-in" >
            <div class="card-content">
                <div class="card-icon">⭐</div>
                <h3 class="card-title">156 STARS</h3>
                <p class="card-description">Total stars across all repositories</p>
                <span class="card-action">→ GITHUB</span>
            </div>
</div >

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
    < div class="gradient-card green fade-in" >
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

            html += `</div></div></div > `;
            return html;
        }
    },

    // === EFFECTS & VISUALS ===
    particles: {
        execute: () => {
            if (!window.effectsManager) return 'Effects system not loaded';
            return window.effectsManager.toggleParticles();
        }
    },

    glitch: {
        execute: () => {
            if (!window.effectsManager) return 'Effects system not loaded';
            window.effectsManager.glitch();
            return 'Glitch effect triggered!';
        }
    },

    matrix: {
        execute: () => {
            if (!window.effectsManager) return 'Effects system not loaded';
            window.effectsManager.matrixRain();
            return 'Welcome to the Matrix...';
        }
    },

    // === THEME SYSTEM ===
    theme: {
        execute: (args) => {
            if (!window.themeManager) return 'Theme system not loaded';

            if (!args) {
                return window.themeManager.listThemes();
            }

            return window.themeManager.applyTheme(args[0]);
        }
    },

    // === UTILITIES ===
    calc: {
        execute: (args) => {
            if (!window.utilities) return 'Utilities not loaded';
            if (!args || args.length === 0) return 'Usage: calc [expression]<br>Example: calc 2 + 2';

            const expression = args.join(' ');
            return window.utilities.calculate(expression);
        }
    },

    timer: {
        execute: (args) => {
            if (!window.utilities) return 'Utilities not loaded';
            const minutes = args ? args[0] : 5;
            return window.utilities.startTimer(minutes);
        }
    },

    todo: {
        execute: (args) => {
            if (!window.utilities) return 'Utilities not loaded';

            if (!args || args.length === 0) {
                return window.utilities.listTodos();
            }

            const command = args[0];
            const rest = args.slice(1).join(' ');

            switch (command) {
                case 'add':
                    return window.utilities.addTodo(rest);
                case 'done':
                    return window.utilities.doneTodo(rest);
                case 'clear':
                    return window.utilities.clearTodos();
                default:
                    return window.utilities.listTodos();
            }
        }
    },

    weather: {
        execute: async (args) => {
            if (!window.utilities) return 'Utilities not loaded';

            const spinner = window.effectsManager.showSpinner('terminalOutput');
            const city = args ? args.join(' ') : 'auto';
            const result = await window.utilities.getWeather(city);
            window.effectsManager.removeSpinner(spinner);

            return result;
        }
    },

    crypto: {
        execute: async () => {
            if (!window.utilities) return 'Utilities not loaded';

            const spinner = window.effectsManager.showSpinner('terminalOutput');
            const result = await window.utilities.getCrypto();
            window.effectsManager.removeSpinner(spinner);

            return result;
        }
    },

    // === FUN COMMANDS ===
    hack: {
        execute: () => {
            if (!window.easterEggs) return 'Easter eggs not loaded';
            return window.easterEggs.hack();
        }
    },

    fortune: {
        execute: () => {
            if (!window.easterEggs) return 'Easter eggs not loaded';
            return window.easterEggs.fortune();
        }
    },

    joke: {
        execute: () => {
            if (!window.easterEggs) return 'Easter eggs not loaded';
            return window.easterEggs.joke();
        }
    },

    // === EASTER EGGS ===
    noctua: {
        execute: () => {
            if (!window.easterEggs) return 'Easter eggs not loaded';
            return window.easterEggs.noctuaOwl();
        }
    },

    coffee: {
        execute: () => {
            if (!window.easterEggs) return 'Easter eggs not loaded';
            return window.easterEggs.coffee();
        }
    },

    rick: {
        execute: () => {
            if (!window.easterEggs) return 'Easter eggs not loaded';
            return window.easterEggs.rick();
        }
    },

    42: {
        execute: () => {
            if (!window.easterEggs) return 'Easter eggs not loaded';
            return window.easterEggs.answer42();
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
