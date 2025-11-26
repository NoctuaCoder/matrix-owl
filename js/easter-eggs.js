// Noctua Terminal - Easter Eggs & Fun Commands

const fortunes = [
    "The best way to predict the future is to invent it.",
    "Code never lies, comments sometimes do.",
    "First, solve the problem. Then, write the code.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Truth can only be found in one place: the code.",
    "Think twice, code once.",
    "Debugging is like being the detective in a crime movie where you're also the murderer.",
    "Talk is cheap. Show me the code.",
    "The only way to go fast is to go well.",
    "Simplicity is the soul of efficiency.",
    "Make it work, make it right, make it fast.",
    "Programs must be written for people to read, and only incidentally for machines to execute."
];

const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Why do Java developers wear glasses? Because they can't C#!",
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "What's the object-oriented way to become wealthy? Inheritance.",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25!",
    "How did the programmer die in the shower? They read the shampoo bottle: 'Lather, rinse, repeat.'",
    "Why was the JavaScript developer sad? Because they didn't Node how to Express themselves.",
    "What do you call 8 hobbits? A hobbyte!"
];

class EasterEggs {
    constructor() {
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;
        this.achievements = this.loadAchievements();
        this.setupKonami();
    }

    loadAchievements() {
        const saved = localStorage.getItem('noctua_achievements');
        return saved ? JSON.parse(saved) : {
            commands: new Set(),
            gamesPlayed: new Set(),
            secretsFound: []
        };
    }

    saveAchievements() {
        const data = {
            commands: Array.from(this.achievements.commands),
            gamesPlayed: Array.from(this.achievements.gamesPlayed),
            secretsFound: this.achievements.secretsFound
        };
        localStorage.setItem('noctua_achievements', JSON.stringify(data));
    }

    trackCommand(cmd) {
        if (!this.achievements.commands) this.achievements.commands = new Set();
        this.achievements.commands.add(cmd);
        this.saveAchievements();
    }

    setupKonami() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konamiCode.length) {
                    this.konamiActivated();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    konamiActivated() {
        if (!this.achievements.secretsFound.includes('konami')) {
            this.achievements.secretsFound.push('konami');
            this.saveAchievements();
        }
        return this.showKonami();
    }

    showKonami() {
        return `
<div class="gradient-card purple fade-in" style="animation: rainbow 3s linear infinite;">
    <div class="card-content">
        <h3 class="card-title">🎮 KONAMI CODE ACTIVATED! 🎮</h3>
        <p class="card-description">You found a secret! 30 extra lives granted!</p>
        <div style="margin: 1.5rem 0; text-align: center; font-size: 2rem;">
            ↑ ↑ ↓ ↓ ← → ← → B A
        </div>
        <p style="text-align: center; color: var(--accent-cyan);">Achievement Unlocked: Konami Master</p>
    </div>
</div>`;
    }

    // Noctua Owl Animation
    noctuaOwl() {
        if (!this.achievements.secretsFound.includes('noctua')) {
            this.achievements.secretsFound.push('noctua');
            this.saveAchievements();
        }

        return `
<div class="gradient-card blue fade-in">
    <div class="card-content">
        <h3 class="card-title">🦉 NOCTUA OWL</h3>
        <pre style="color: var(--accent-cyan); font-size: 0.7rem; line-height: 1.2; margin: 1.5rem 0;">
    ___
   (o o)
  (  V  )
  /--m-m-
        </pre>
        <div style="text-align: center;">
            <p style="font-style: italic; color: var(--text-secondary); margin: 1rem 0;">
                "In the darkness of code, the wise owl brings light."
            </p>
            <p style="color: var(--accent-cyan); font-weight: 700;">
                Achievement Unlocked: Friend of Noctua
            </p>
        </div>
    </div>
</div>`;
    }

    // Coffee Animation
    coffee() {
        return `
<div class="gradient-card orange fade-in">
    <div class="card-content">
        <h3 class="card-title">☕ COFFEE BREAK</h3>
        <pre style="color: var(--text-secondary); font-size: 0.8rem; line-height: 1.2; margin: 1.5rem 0; text-align: center;">
    ( (
     ) )
  .______.
  |      |]
  \\      /
   \`----'
        </pre>
        <p style="text-align: center; font-style: italic;">
            Time for a coffee break! ☕<br>
            <span style="color: var(--text-dim); font-size: 0.875rem;">Caffeine loading...</span>
        </p>
    </div>
</div>`;
    }

    // Answer to Everything
    answer42() {
        return `
<div class="gradient-card green fade-in">
    <div class="card-content">
        <h3 class="card-title">THE ANSWER</h3>
        <div style="margin: 2rem 0; text-align: center;">
            <div style="font-size: 5rem; font-weight: 700; color: var(--accent-cyan);">42</div>
            <p style="font-style: italic; margin-top: 1rem;">
                "The Answer to the Ultimate Question of Life,<br>
                the Universe, and Everything."
            </p>
            <p style="color: var(--text-dim); font-size: 0.875rem; margin-top: 1rem;">
                - The Hitchhiker's Guide to the Galaxy
            </p>
        </div>
    </div>
</div>`;
    }

    // Rick Roll (you asked for it!)
    rick() {
        if (!this.achievements.secretsFound.includes('rick')) {
            this.achievements.secretsFound.push('rick');
            this.saveAchievements();
        }

        return `
<div class="gradient-card purple fade-in">
    <div class="card-content">
        <h3 class="card-title">🎵 NEVER GONNA GIVE YOU UP 🎵</h3>
        <div style="margin: 1.5rem 0; text-align: center;">
            <p style="font-size: 1.2rem; line-height: 1.8;">
                Never gonna give you up<br>
                Never gonna let you down<br>
                Never gonna run around and desert you<br>
                Never gonna make you cry<br>
                Never gonna say goodbye<br>
                Never gonna tell a lie and hurt you
            </p>
            <p style="margin-top: 2rem; color: var(--accent-cyan); font-weight: 700;">
                🎸 You just got Rick Rolled! 🎸
            </p>
        </div>
    </div>
</div>`;
    }

    // Fortune Cookie
    fortune() {
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        return `
<div class="gradient-card purple fade-in">
    <div class="card-content">
        <h3 class="card-title">🥠 FORTUNE</h3>
        <div style="margin: 1.5rem 0; padding: 1.5rem; background: rgba(0,0,0,0.3); border-left: 4px solid var(--accent-cyan); font-style: italic; font-size: 1.125rem;">
            "${fortune}"
        </div>
    </div>
</div>`;
    }

    // Programming Joke
    joke() {
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        return `
<div class="gradient-card green fade-in">
    <div class="card-content">
        <h3 class="card-title">😄 JOKE</h3>
        <div style="margin: 1.5rem 0; padding: 1.5rem; background: rgba(0,0,0,0.3); border-radius: 8px; font-size: 1.125rem; text-align: center;">
            ${joke}
        </div>
    </div>
</div>`;
    }

    // Hack Simulator
    async hack() {
        const steps = [
            'Initializing hacking sequence...',
            'Scanning network for vulnerabilities...',
            'Bypassing firewall...',
            'Decrypting passwords...',
            'Accessing mainframe...',
            'Downloading classified files...',
            'Covering tracks...',
            'Hack complete!'
        ];

        let html = `
<div class="gradient-card orange fade-in">
    <div class="card-content">
        <h3 class="card-title">🔒 HACK SIMULATOR</h3>
        <div id="hackProgress" style="margin: 1.5rem 0; font-family: monospace;">`;

        for (let i = 0; i < steps.length; i++) {
            const percentage = Math.floor((i + 1) / steps.length * 100);
            html += `
            <div style="margin-bottom: 0.5rem;">
                <span style="color: var(--accent-cyan);">[${percentage}%]</span> ${steps[i]}
            </div>`;

            if (window.effectsManager) {
                html += `
                <div style="margin-bottom: 1rem; font-size: 0.875rem;">
                    ${window.effectsManager.createProgressBar(percentage)}
                </div>`;
            }
        }

        html += `
            <div style="margin-top: 2rem; padding: 1rem; background: rgba(0,255,0,0.1); border: 1px solid #0f0; border-radius: 4px; color: #0f0; text-align: center; font-weight: 700;">
                ✓ ACCESS GRANTED
            </div>
        </div>
    </div>
</div>`;

        return html;
    }
}

window.easterEggs = new EasterEggs();
