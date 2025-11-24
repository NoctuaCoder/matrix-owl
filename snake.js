// Snake Game for Matrix Owl Terminal
// Classic snake game with ASCII graphics

class SnakeGame {
    constructor() {
        this.gridWidth = 35; // Bigger grid for more space
        this.gridHeight = 18;
        this.snake = [{ x: 10, y: 9 }]; // Start more to the left and centered
        this.direction = { x: 1, y: 0 }; // Moving right
        this.nextDirection = { x: 1, y: 0 };
        this.food = this.spawnFood();
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.gameOver = false;
        this.paused = false;
        this.speed = 200; // ms per frame - slower for easier gameplay
        this.gameLoop = null;
        this.boundKeyHandler = null;
    }

    loadHighScore() {
        try {
            return parseInt(localStorage.getItem('snakeHighScore') || '0');
        } catch (e) {
            return 0;
        }
    }

    saveHighScore() {
        try {
            localStorage.setItem('snakeHighScore', this.highScore.toString());
        } catch (e) {
            console.warn('Failed to save high score');
        }
    }

    spawnFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.gridWidth),
                y: Math.floor(Math.random() * this.gridHeight)
            };
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        return food;
    }

    changeDirection(newDirection) {
        // Prevent 180-degree turns
        if (this.direction.x + newDirection.x === 0 &&
            this.direction.y + newDirection.y === 0) {
            return;
        }
        this.nextDirection = newDirection;
    }

    update() {
        if (this.gameOver || this.paused) return;

        // Update direction
        this.direction = this.nextDirection;

        // Calculate new head position
        const head = this.snake[0];
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };

        // Check wall collision
        if (newHead.x < 0 || newHead.x >= this.gridWidth ||
            newHead.y < 0 || newHead.y >= this.gridHeight) {
            this.endGame();
            return;
        }

        // Check self collision
        if (this.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
            this.endGame();
            return;
        }

        // Add new head
        this.snake.unshift(newHead);

        // Check food collision
        if (newHead.x === this.food.x && newHead.y === this.food.y) {
            this.score += 10;
            if (this.score > this.highScore) {
                this.highScore = this.score;
                this.saveHighScore();
            }
            this.food = this.spawnFood();

            // Speed up slightly (less aggressive)
            if (this.speed > 100 && this.score % 50 === 0) {
                this.speed -= 5;
            }

            // Play eat sound
            if (typeof playSuccessSound === 'function') {
                playSuccessSound();
            }
        } else {
            // Remove tail if no food eaten
            this.snake.pop();
        }
    }

    endGame() {
        this.gameOver = true;
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }

        // Play game over sound
        if (typeof playErrorSound === 'function') {
            playErrorSound();
        }
    }

    togglePause() {
        this.paused = !this.paused;
    }

    render() {
        let output = '';

        // Top border
        output += '╔' + '═'.repeat(this.gridWidth * 2) + '╗\n';

        // Game grid
        for (let y = 0; y < this.gridHeight; y++) {
            output += '║';
            for (let x = 0; x < this.gridWidth; x++) {
                const isSnakeHead = this.snake[0].x === x && this.snake[0].y === y;
                const isSnakeBody = this.snake.slice(1).some(segment => segment.x === x && segment.y === y);
                const isFood = this.food.x === x && this.food.y === y;

                if (isSnakeHead) {
                    output += '<span style="color: var(--success-color)">●●</span>';
                } else if (isSnakeBody) {
                    output += '<span style="color: var(--primary-color)">▓▓</span>';
                } else if (isFood) {
                    output += '<span style="color: var(--error-color)">◆◆</span>';
                } else {
                    output += '  ';
                }
            }
            output += '║\n';
        }

        // Bottom border
        output += '╚' + '═'.repeat(this.gridWidth * 2) + '╝\n';

        // Score display
        output += `\n<span style="color: var(--primary-color)">Score: ${this.score}</span>  `;
        output += `<span style="color: var(--secondary-color)">High Score: ${this.highScore}</span>\n`;

        // Controls
        if (!this.gameOver) {
            output += '\n<span style="color: var(--text-color); opacity: 0.7;">Controls: WASD or Arrow Keys | P: Pause | Q: Quit</span>';
        }

        if (this.paused) {
            output += '\n\n<span style="color: var(--secondary-color); font-size: 20px;">⏸ PAUSED</span>';
        }

        if (this.gameOver) {
            output += '\n\n<span style="color: var(--error-color); font-size: 20px;">💀 GAME OVER!</span>';
            output += '\n<span style="color: var(--text-color);">Type "snake" to play again</span>';
        }

        return output;
    }

    start(outputElement) {
        this.outputElement = outputElement;

        // Initial render
        this.renderToTerminal();

        // Set up keyboard controls
        this.boundKeyHandler = this.handleKeyPress.bind(this);
        document.addEventListener('keydown', this.boundKeyHandler);

        // Add countdown before starting
        let countdown = 3;
        const countdownInterval = setInterval(() => {
            this.renderToTerminal();
            if (countdown > 0) {
                const displays = this.outputElement.querySelectorAll('.snake-game-display');
                if (displays.length > 0) {
                    const lastDisplay = displays[displays.length - 1];
                    const countdownDiv = document.createElement('div');
                    countdownDiv.style.cssText = 'text-align: center; font-size: 24px; color: var(--primary-color); margin-top: 10px;';
                    countdownDiv.textContent = `Starting in ${countdown}...`;
                    lastDisplay.appendChild(countdownDiv);
                }
                countdown--;
            } else {
                clearInterval(countdownInterval);
                // Start game loop after countdown
                this.gameLoop = setInterval(() => {
                    this.update();
                    this.renderToTerminal();
                }, this.speed);
            }
        }, 1000);
    }

    handleKeyPress(e) {
        if (this.gameOver) {
            if (e.key.toLowerCase() === 'q') {
                this.stop();
            }
            return;
        }

        switch (e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                e.preventDefault();
                this.changeDirection({ x: 0, y: -1 });
                break;
            case 's':
            case 'arrowdown':
                e.preventDefault();
                this.changeDirection({ x: 0, y: 1 });
                break;
            case 'a':
            case 'arrowleft':
                e.preventDefault();
                this.changeDirection({ x: -1, y: 0 });
                break;
            case 'd':
            case 'arrowright':
                e.preventDefault();
                this.changeDirection({ x: 1, y: 0 });
                break;
            case 'p':
                e.preventDefault();
                this.togglePause();
                this.renderToTerminal();
                break;
            case 'q':
                e.preventDefault();
                this.stop();
                break;
        }
    }

    renderToTerminal() {
        if (this.outputElement) {
            // Clear previous game state
            const gameDisplays = this.outputElement.querySelectorAll('.snake-game-display');
            gameDisplays.forEach(display => display.remove());

            // Create new display
            const display = document.createElement('div');
            display.className = 'snake-game-display';
            display.innerHTML = this.render();
            display.style.fontFamily = 'monospace';
            display.style.lineHeight = '1.2';
            display.style.marginTop = '10px';
            this.outputElement.appendChild(display);

            // Scroll to bottom
            this.outputElement.scrollTop = this.outputElement.scrollHeight;
        }
    }

    stop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        if (this.boundKeyHandler) {
            document.removeEventListener('keydown', this.boundKeyHandler);
        }

        // Print exit message
        if (typeof printOutput === 'function') {
            printOutput('Snake game ended. Thanks for playing! 🐍', 'info');
        }
    }
}

// Global game instance
let currentSnakeGame = null;

function startSnakeGame() {
    // Stop any existing game
    if (currentSnakeGame) {
        currentSnakeGame.stop();
    }

    const output = document.getElementById('terminal-output');
    if (!output) {
        console.error('Terminal output not found');
        return;
    }

    // Print game start message
    if (typeof printOutput === 'function') {
        printOutput('🐍 Starting Snake Game...', 'success');
        printOutput('Use WASD or Arrow Keys to move', 'info');
        printOutput('Press P to pause, Q to quit', 'info');
        printOutput('');
    }

    // Create and start game
    currentSnakeGame = new SnakeGame();
    currentSnakeGame.start(output);
}
