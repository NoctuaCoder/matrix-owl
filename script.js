// Matrix Owl Terminal - Main Script
// Command system and terminal logic

// File System Mock
const fileSystem = {
    'about.txt': `NoctuaCoder - Digital Alchemist

I craft celestial web experiences that blend aesthetics with functionality.
Specializing in premium dotfiles, ethereal UI/UX, and cyberpunk aesthetics.

"Code by night, create by instinct."`,

    'skills.txt': `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Frontend: HTML5, CSS3, JavaScript (ES6+)
• Frameworks: React, Next.js, Vite
• Linux: Hyprland, Waybar, Bash scripting
• Design: Figma, SVG animations, CSS art
• Tools: Git, GitHub Actions, npm
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

    'contact.txt': `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
◉ Email: 38922657+NoctuaCoder@users.noreply.github.com
◆ GitHub: github.com/NoctuaCoder
◎ Portfolio: noctuacoder.github.io/NoctuaCoder/portfolio.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

    'projects.txt': `Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Stellar Dots - Premium Hyprland configurations
2. SpectraHypr - Ethereal desktop aesthetics
3. Midnight Dots - Cyberpunk theme collection
4. Matrix Owl - Interactive terminal experience
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
};

// Virtual directory system
let currentDirectory = '~';
const directories = {
    '~': ['about.txt', 'skills.txt', 'contact.txt', 'projects.txt'],
    'projects': ['stellar-dots', 'spectra-hypr', 'midnight-dots', 'matrix-owl'],
    'about': ['bio.txt', 'resume.txt']
};

// Command history navigation
let historyIndex = -1;

// Commands definition
const commands = {
    'help': {
        desc: 'List available commands',
        action: () => {
            printOutput('Available commands:', 'info');
            printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            printOutput('  help           - Show this help message');
            printOutput('  whoami         - About the user');
            printOutput('  about          - Detailed bio with ASCII art');
            printOutput('  projects       - List featured projects');
            printOutput('  ls             - List files in current directory');
            printOutput('  cat [file]     - Read a file');
            printOutput('  cd [dir]       - Change directory');
            printOutput('  pwd            - Print working directory');
            printOutput('  clear          - Clear terminal');
            printOutput('  history        - Show command history');
            printOutput('  date           - Show current date/time');
            printOutput('  theme [action] - Manage themes (list/[name]/random)');
            printOutput('  sound [action] - Sound controls (on/off/volume)');
            printOutput('  neofetch       - System information');
            printOutput('  snake          - Play Snake game (opens in new tab) ~');
            printOutput('  exit           - Return to portfolio');
            printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            printOutput('Easter eggs: Try "owl", "sudo", "matrix [color]", "hack"', 'info');
        }
    },

    'whoami': {
        desc: 'About user',
        action: () => {
            printOutput('User: NoctuaCoder', 'success');
            printOutput('Role: Creative Developer & Dotfiles Architect');
            printOutput('Mission: To beautify the digital universe, one pixel at a time.');
            playSuccessSound();
        }
    },

    'about': {
        desc: 'Detailed bio',
        action: () => {
            const asciiArt = `
    ╔═══════════════════════════════════════╗
    ║         N NoctuaCoder N            ║
    ╚═══════════════════════════════════════╝
    
    Digital Alchemist | UI/UX Sorcerer
    
    I transform code into celestial experiences,
    blending cyberpunk aesthetics with modern web tech.
    
    Specialties:
    • Premium Hyprland configurations
    • Ethereal web interfaces
    • Terminal-based experiences
    • SVG animations & CSS art
    
    Philosophy: "Beauty in every byte"
    `;
            printOutput(asciiArt, 'success');
            pulseElement(document.querySelector('.ascii-owl'), 2);
        }
    },

    'projects': {
        desc: 'List projects',
        action: () => {
            printOutput('Fetching projects from GitHub...', 'info');
            setTimeout(() => {
                printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
                printOutput('1. ◆ Stellar Dots - Premium Hyprland Configs', 'success');
                printOutput('   <a class="term-link" href="https://github.com/NoctuaCoder/stellar-dots" target="_blank">[View Repo]</a>');
                printOutput('');
                printOutput('2. ◇ SpectraHypr - Ethereal Aesthetics', 'success');
                printOutput('   <a class="term-link" href="https://github.com/NoctuaCoder/SpectraHypr" target="_blank">[View Repo]</a>');
                printOutput('');
                printOutput('3. ◐ Midnight Dots - Cyberpunk Theme', 'success');
                printOutput('   <a class="term-link" href="https://github.com/NoctuaCoder/midnight-dots" target="_blank">[View Repo]</a>');
                printOutput('');
                printOutput('4. N Matrix Owl - Interactive Terminal', 'success');
                printOutput('   <a class="term-link" href="https://github.com/NoctuaCoder/matrix-owl" target="_blank">[View Repo]</a>');
                printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
                playSuccessSound();
            }, 500);
        }
    },

    'ls': {
        desc: 'List files',
        action: () => {
            const files = directories[currentDirectory] || Object.keys(fileSystem);
            printOutput(files.join('  '), 'info');
        }
    },

    'cat': {
        desc: 'Read file',
        action: (args) => {
            if (!args[0]) {
                printOutput('Usage: cat [filename]', 'error');
                playErrorSound();
                return;
            }
            const file = args[0];
            if (fileSystem[file]) {
                printOutput(fileSystem[file]);
                playSuccessSound();
            } else {
                printOutput(`cat: ${file}: No such file or directory`, 'error');
                playErrorSound();
            }
        }
    },

    'cd': {
        desc: 'Change directory',
        action: (args) => {
            if (!args[0] || args[0] === '~') {
                currentDirectory = '~';
                printOutput('Changed to home directory', 'success');
            } else if (directories[args[0]]) {
                currentDirectory = args[0];
                printOutput(`Changed to /${args[0]}`, 'success');
            } else {
                printOutput(`cd: ${args[0]}: No such directory`, 'error');
                playErrorSound();
                return;
            }
            updatePrompt();
            playSuccessSound();
        }
    },

    'pwd': {
        desc: 'Print working directory',
        action: () => {
            printOutput(currentDirectory === '~' ? '/home/noctuacoder' : `/home/noctuacoder/${currentDirectory}`, 'info');
        }
    },

    'clear': {
        desc: 'Clear screen',
        action: () => {
            const output = document.getElementById('terminal-output');
            output.innerHTML = '';
        }
    },

    'history': {
        desc: 'Show command history',
        action: () => {
            const history = getHistory();
            if (history.length === 0) {
                printOutput('No command history', 'info');
            } else {
                printOutput('Command History:', 'info');
                printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                history.forEach((cmd, i) => {
                    printOutput(`  ${i + 1}  ${cmd}`);
                });
            }
        }
    },

    'date': {
        desc: 'Show date',
        action: () => {
            printOutput(new Date().toString());
        }
    },

    'theme': {
        desc: 'Theme management',
        action: (args) => {
            if (!args[0] || args[0] === 'list') {
                printOutput('Available themes:', 'info');
                printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                const themeList = listThemes();
                themeList.forEach(theme => {
                    const current = theme.key === currentTheme ? ' (current)' : '';
                    printOutput(`  ${theme.key.padEnd(12)} - ${theme.name}${current}`);
                });
                printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                printOutput('Usage: theme [name] or theme random', 'info');
            } else if (args[0] === 'random') {
                const randomTheme = getRandomTheme();
                if (applyTheme(randomTheme)) {
                    printOutput(`Theme changed to: ${themes[randomTheme].name}`, 'success');
                    flashMatrixRain();
                    playSuccessSound();
                }
            } else {
                if (applyTheme(args[0])) {
                    printOutput(`Theme changed to: ${themes[args[0]].name}`, 'success');
                    flashMatrixRain();
                    playSuccessSound();
                } else {
                    printOutput(`Theme '${args[0]}' not found. Type 'theme list' to see available themes.`, 'error');
                    playErrorSound();
                }
            }
        }
    },

    'sound': {
        desc: 'Sound controls',
        action: (args) => {
            if (!args[0]) {
                printOutput('Sound Controls:', 'info');
                printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                printOutput(`  Status: ${config.soundEnabled ? 'ON' : 'OFF'}`);
                printOutput(`  Volume: ${config.volume}%`);
                printOutput(`  Ambient: ${config.ambientSound ? 'ON' : 'OFF'}`);
                printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                printOutput('Usage:', 'info');
                printOutput('  sound on/off       - Toggle sounds');
                printOutput('  sound volume [0-100] - Set volume');
                printOutput('  sound ambient on/off - Toggle ambient sound');
            } else if (args[0] === 'on') {
                toggleSound(true);
                printOutput('Sound enabled', 'success');
                playSuccessSound();
            } else if (args[0] === 'off') {
                toggleSound(false);
                printOutput('Sound disabled', 'info');
            } else if (args[0] === 'volume' && args[1]) {
                const vol = parseInt(args[1]);
                if (vol >= 0 && vol <= 100) {
                    setVolume(vol);
                    printOutput(`Volume set to ${vol}%`, 'success');
                    playSuccessSound();
                } else {
                    printOutput('Volume must be between 0 and 100', 'error');
                    playErrorSound();
                }
            } else if (args[0] === 'ambient') {
                if (args[1] === 'on') {
                    toggleAmbientSound(true);
                    printOutput('Ambient sound enabled', 'success');
                } else if (args[1] === 'off') {
                    toggleAmbientSound(false);
                    printOutput('Ambient sound disabled', 'info');
                } else {
                    printOutput('Usage: sound ambient on/off', 'error');
                }
            }
        }
    },

    'neofetch': {
        desc: 'System info',
        action: () => {
            const neofetch = `
         ___              noctuacoder@matrix-owl
        (o,o)             ━━━━━━━━━━━━━━━━━━━━━━
        {"\`"}             OS: Matrix Owl Terminal v2.0
        -"-"-            Host: GitHub Pages
                          Kernel: JavaScript ES6+
                          Uptime: ${Math.floor(performance.now() / 1000)}s
                          Shell: owl-shell
                          Resolution: ${window.innerWidth}x${window.innerHeight}
                          Theme: ${themes[currentTheme].name}
                          Terminal: Noctua Terminal
                          CPU: Your Brain
                          Memory: Infinite
            `;
            printOutput(neofetch, 'success');
            rainbowText(document.querySelector('.ascii-owl'), 2000);
        }
    },

    'exit': {
        desc: 'Exit terminal',
        action: () => {
            printOutput('Terminating session...', 'error');
            printOutput('Goodbye! N', 'info');
            setTimeout(() => {
                window.location.href = 'https://noctuacoder.github.io/NoctuaCoder/portfolio.html';
            }, 1000);
        }
    },

    // Easter Eggs
    'matrix': {
        desc: 'Change matrix color',
        action: (args) => {
            if (args[0]) {
                matrixColor = args[0];
                printOutput(`Matrix rain color changed to ${args[0]}`, 'success');
                flashMatrixRain();
                playSuccessSound();
            } else {
                printOutput('Usage: matrix [color] (e.g., matrix red, matrix #00FF00)', 'info');
            }
        }
    },

    'owl': {
        desc: 'Owl magic',
        action: () => {
            printOutput('Hoot hoot! N◇', 'success');
            const owl = document.querySelector('.ascii-owl');
            rainbowText(owl, 2000);
            pulseElement(owl, 5);
            playSuccessSound();
        }
    },

    'sudo': {
        desc: 'Admin access',
        action: (args) => {
            if (args.join(' ') === 'rm -rf /') {
                printOutput('Nice try! But I\'m not falling for that one. ', 'error');
                shakeElement(document.querySelector('.terminal'));
            } else {
                printOutput('Permission denied: You are not root. Nice try though. N', 'error');
            }
            playErrorSound();
        }
    },

    'hack': {
        desc: 'Hacking simulation',
        action: () => {
            printOutput('Initializing hack sequence...', 'success');
            setTimeout(() => printOutput('Accessing mainframe...', 'info'), 500);
            setTimeout(() => printOutput('Bypassing firewall...', 'info'), 1000);
            setTimeout(() => printOutput('Downloading data...', 'info'), 1500);
            setTimeout(() => {
                printOutput('Just kidding! This is just a terminal. ', 'success');
                playSuccessSound();
            }, 2000);
        }
    },

    'snake': {
        desc: 'Play Snake game',
        action: () => {
            printOutput('~ Opening Snake Game...', 'success');
            printOutput('Game will open in a new tab!', 'info');
            window.open('snake.html', '_blank');
            playSuccessSound();
        }
    }
};

// Print output to terminal
function printOutput(text, type = '') {
    const output = document.getElementById('terminal-output');
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.innerHTML = text;
    output.appendChild(line);
    scrollToBottom();
}

// Scroll to bottom
function scrollToBottom() {
    const output = document.getElementById('terminal-output');
    output.scrollTop = output.scrollHeight;
}

// Update prompt based on current directory
function updatePrompt() {
    const prompts = document.querySelectorAll('.prompt');
    const promptText = currentDirectory === '~'
        ? 'noctuacoder@github:~$'
        : `noctuacoder@github:${currentDirectory}$`;

    prompts.forEach(prompt => {
        prompt.textContent = promptText;
    });
}

// Process command
function processCommand(text) {
    const args = text.split(' ');
    const cmd = args.shift().toLowerCase();

    // Add to history
    addToHistory(text);

    // Echo command
    const echo = document.createElement('div');
    echo.className = 'command-echo';
    echo.innerHTML = `<span class="prompt">${currentDirectory === '~' ? 'noctuacoder@github:~$' : `noctuacoder@github:${currentDirectory}$`}</span> ${text}`;
    document.getElementById('terminal-output').appendChild(echo);

    // Execute command
    if (commands[cmd]) {
        commands[cmd].action(args);
    } else {
        printOutput(`Command not found: ${cmd}. Type 'help' for list.`, 'error');
        playErrorSound();
        shakeElement(document.querySelector('.input-line'));
    }
}

// Initialize terminal
function initTerminal() {
    const input = document.getElementById('command-input');
    const output = document.getElementById('terminal-output');

    // Focus input on click anywhere
    document.addEventListener('click', () => input.focus());

    // Handle input
    input.addEventListener('keydown', (e) => {
        // Play typing sound
        if (config.soundEnabled) {
            playTypingSound();
        }

        // Command history navigation (disabled when Snake is running)
        if (e.key === 'ArrowUp') {
            // Don't prevent default if Snake game is active
            if (typeof currentSnakeGame !== 'undefined' && currentSnakeGame && !currentSnakeGame.gameOver) {
                return; // Let Snake handle it
            }
            e.preventDefault();
            const history = getHistory();
            if (history.length > 0) {
                historyIndex = Math.max(0, historyIndex === -1 ? history.length - 1 : historyIndex - 1);
                input.value = history[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            // Don't prevent default if Snake game is active
            if (typeof currentSnakeGame !== 'undefined' && currentSnakeGame && !currentSnakeGame.gameOver) {
                return; // Let Snake handle it
            }
            e.preventDefault();
            const history = getHistory();
            if (historyIndex !== -1) {
                historyIndex = Math.min(history.length - 1, historyIndex + 1);
                input.value = history[historyIndex];
            }
        } else if (e.key === 'Enter') {
            const text = input.value.trim();
            if (text) {
                processCommand(text);
                input.value = '';
                historyIndex = -1;
            }
        }
    });

    // Boot sequence
    setTimeout(() => {
        playBootSound();
        bootSequence();
    }, 500);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initTerminal);
