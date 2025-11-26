// Noctua Terminal - Games Module

// Snake Game
class SnakeGame {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.snake = [{ x: 10, y: 10 }];
        this.food = { x: 15, y: 15 };
        this.direction = 'right';
        this.score = 0;
        this.gameLoop = null;
        this.gridSize = 20;
        this.tileSize = 20;
    }

    start() {
        this.createCanvas();
        this.setupControls();
        this.gameLoop = setInterval(() => this.update(), 100);
    }

    createCanvas() {
        const html = `
<div class="game-container fade-in">
    <div class="gradient-card blue">
        <div class="card-content">
            <h3 class="card-title">🐍 SNAKE GAME</h3>
            <p class="card-description">Use arrow keys to move. Pass through walls with tunnel effect!</p>
            <div style="margin: 1.5rem 0;">
                <canvas id="snakeCanvas" width="400" height="400" style="border: 2px solid var(--accent-cyan); background: #000; display: block; margin: 0 auto;"></canvas>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="card-action">SCORE: <span id="snakeScore">0</span></span>
                <button onclick="window.currentGame.restart()" style="padding: 0.5rem 1rem; background: var(--accent-cyan); border: none; color: #000; font-weight: 700; cursor: pointer; border-radius: 4px;">RESTART</button>
            </div>
        </div>
    </div>
</div>`;
        this.container.innerHTML = html;
        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Scroll to game
        setTimeout(() => {
            const gameContainer = this.container.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' && this.direction !== 'down') this.direction = 'up';
            if (e.key === 'ArrowDown' && this.direction !== 'up') this.direction = 'down';
            if (e.key === 'ArrowLeft' && this.direction !== 'right') this.direction = 'left';
            if (e.key === 'ArrowRight' && this.direction !== 'left') this.direction = 'right';
        });
    }

    update() {
        const head = { ...this.snake[0] };

        if (this.direction === 'up') head.y--;
        if (this.direction === 'down') head.y++;
        if (this.direction === 'left') head.x--;
        if (this.direction === 'right') head.x++;

        // Wall wrapping (tunnel effect)
        if (head.x < 0) head.x = this.gridSize - 1;
        if (head.x >= this.gridSize) head.x = 0;
        if (head.y < 0) head.y = this.gridSize - 1;
        if (head.y >= this.gridSize) head.y = 0;

        // Check collision with self
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Check if ate food
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;
            document.getElementById('snakeScore').textContent = this.score;
            this.spawnFood();
        } else {
            this.snake.pop();
        }

        this.draw();
    }

    spawnFood() {
        this.food = {
            x: Math.floor(Math.random() * this.gridSize),
            y: Math.floor(Math.random() * this.gridSize)
        };
    }

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = '#00d9ff';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#00d9ff';
        this.snake.forEach(segment => {
            this.ctx.fillRect(segment.x * this.tileSize, segment.y * this.tileSize, this.tileSize - 2, this.tileSize - 2);
        });

        // Draw food
        this.ctx.fillStyle = '#ff6b35';
        this.ctx.shadowColor = '#ff6b35';
        this.ctx.fillRect(this.food.x * this.tileSize, this.food.y * this.tileSize, this.tileSize - 2, this.tileSize - 2);
        this.ctx.shadowBlur = 0;
    }

    gameOver() {
        clearInterval(this.gameLoop);

        // Save high score
        if (this.score > 0) {
            window.highScores.saveScore('snake', this.score);
        }

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '30px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '20px Orbitron';
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 40);

        const highScore = window.highScores.getHighScore('snake');
        if (this.score === highScore && this.score > 0) {
            this.ctx.fillStyle = '#00d9ff';
            this.ctx.fillText('NEW HIGH SCORE!', this.canvas.width / 2, this.canvas.height / 2 + 80);
        }
    }

    restart() {
        this.snake = [{ x: 10, y: 10 }];
        this.direction = 'right';
        this.score = 0;
        document.getElementById('snakeScore').textContent = '0';
        this.spawnFood();
        clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 100);
    }
}

// Tetris Game
class TetrisGame {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.board = Array(20).fill().map(() => Array(10).fill(0));
        this.score = 0;
        this.currentPiece = null;
        this.gameLoop = null;
    }

    start() {
        const html = `
<div class="game-container fade-in">
    <div class="gradient-card purple">
        <div class="card-content">
            <h3 class="card-title">🟦 TETRIS</h3>
            <p class="card-description">Use arrow keys: ← → to move, ↑ to rotate, ↓ to drop faster</p>
            <div style="margin: 1.5rem 0;">
                <canvas id="tetrisCanvas" width="300" height="600" style="border: 2px solid var(--accent-purple); background: #000; display: block; margin: 0 auto;"></canvas>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="card-action">SCORE: <span id="tetrisScore">0</span></span>
                <button onclick="window.currentGame.restart()" style="padding: 0.5rem 1rem; background: var(--accent-purple); border: none; color: #fff; font-weight: 700; cursor: pointer; border-radius: 4px;">RESTART</button>
            </div>
        </div>
    </div>
</div>`;
        this.container.innerHTML = html;
        this.canvas = document.getElementById('tetrisCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Scroll to game
        setTimeout(() => {
            const gameContainer = this.container.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);

        this.spawnPiece();
        this.setupControls();
        this.gameLoop = setInterval(() => this.update(), 500);
    }

    spawnPiece() {
        const pieces = [
            [[1, 1, 1, 1]], // I
            [[1, 1], [1, 1]], // O
            [[1, 1, 1], [0, 1, 0]], // T
            [[1, 1, 0], [0, 1, 1]], // S
            [[0, 1, 1], [1, 1, 0]] // Z
        ];
        const piece = pieces[Math.floor(Math.random() * pieces.length)];
        this.currentPiece = {
            shape: piece,
            x: 3,
            y: 0,
            color: ['#00d9ff', '#ff6b35', '#2ecc71', '#9b59b6', '#e91e63'][Math.floor(Math.random() * 5)]
        };
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.movePiece(-1, 0);
            if (e.key === 'ArrowRight') this.movePiece(1, 0);
            if (e.key === 'ArrowDown') this.movePiece(0, 1);
            if (e.key === 'ArrowUp') this.rotatePiece();
        });
    }

    movePiece(dx, dy) {
        this.currentPiece.x += dx;
        this.currentPiece.y += dy;
        if (this.checkCollision()) {
            this.currentPiece.x -= dx;
            this.currentPiece.y -= dy;
            if (dy > 0) this.lockPiece();
        }
    }

    rotatePiece() {
        const rotated = this.currentPiece.shape[0].map((_, i) =>
            this.currentPiece.shape.map(row => row[i]).reverse()
        );
        const original = this.currentPiece.shape;
        this.currentPiece.shape = rotated;
        if (this.checkCollision()) this.currentPiece.shape = original;
    }

    checkCollision() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    const newX = this.currentPiece.x + x;
                    const newY = this.currentPiece.y + y;
                    if (newX < 0 || newX >= 10 || newY >= 20 || (newY >= 0 && this.board[newY][newX])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    lockPiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    const boardY = this.currentPiece.y + y;
                    if (boardY >= 0) {
                        this.board[boardY][this.currentPiece.x + x] = this.currentPiece.color;
                    }
                }
            }
        }
        this.clearLines();
        this.spawnPiece();
        if (this.checkCollision()) this.gameOver();
    }

    clearLines() {
        for (let y = 19; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                this.board.splice(y, 1);
                this.board.unshift(Array(10).fill(0));
                this.score += 100;
                document.getElementById('tetrisScore').textContent = this.score;
            }
        }
    }

    update() {
        this.movePiece(0, 1);
        this.draw();
    }

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw board
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 10; x++) {
                if (this.board[y][x]) {
                    this.ctx.fillStyle = this.board[y][x];
                    this.ctx.fillRect(x * 30, y * 30, 28, 28);
                }
            }
        }

        // Draw current piece
        if (this.currentPiece) {
            this.ctx.fillStyle = this.currentPiece.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = this.currentPiece.color;
            for (let y = 0; y < this.currentPiece.shape.length; y++) {
                for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                    if (this.currentPiece.shape[y][x]) {
                        this.ctx.fillRect((this.currentPiece.x + x) * 30, (this.currentPiece.y + y) * 30, 28, 28);
                    }
                }
            }
            this.ctx.shadowBlur = 0;
        }
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '30px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
    }

    restart() {
        this.board = Array(20).fill().map(() => Array(10).fill(0));
        this.score = 0;
        document.getElementById('tetrisScore').textContent = '0';
        this.spawnPiece();
        clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 500);
    }
}

// Guess Number Game
class GuessNumberGame {
    constructor(container) {
        this.container = container;
        this.target = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
    }

    start() {
        const html = `
<div class="game-container fade-in">
    <div class="gradient-card green">
        <div class="card-content">
            <h3 class="card-title">🎯 GUESS THE NUMBER</h3>
            <p class="card-description">I'm thinking of a number between 1 and 100. Can you guess it?</p>
            <div style="margin: 1.5rem 0;">
                <input type="number" id="guessInput" min="1" max="100" placeholder="Enter your guess..." style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid var(--accent-green); color: #fff; font-size: 1rem; border-radius: 4px; margin-bottom: 1rem;">
                <button onclick="window.currentGame.makeGuess()" style="width: 100%; padding: 0.75rem; background: var(--accent-green); border: none; color: #000; font-weight: 700; cursor: pointer; border-radius: 4px; font-size: 1rem;">GUESS</button>
            </div>
            <div id="guessResult" style="min-height: 60px; margin: 1rem 0; font-size: 1.125rem; text-align: center;"></div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="card-action">ATTEMPTS: <span id="guessAttempts">0</span></span>
                <button onclick="window.currentGame.restart()" style="padding: 0.5rem 1rem; background: rgba(255,255,255,0.1); border: 1px solid var(--accent-green); color: #fff; font-weight: 700; cursor: pointer; border-radius: 4px;">NEW GAME</button>
            </div>
        </div>
    </div>
</div>`;
        this.container.innerHTML = html;

        // Scroll to game
        setTimeout(() => {
            const gameContainer = this.container.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);

        document.getElementById('guessInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.makeGuess();
        });
    }

    makeGuess() {
        const input = document.getElementById('guessInput');
        const guess = parseInt(input.value);
        const result = document.getElementById('guessResult');

        if (!guess || guess < 1 || guess > 100) {
            result.innerHTML = '<span style="color: var(--accent-orange);">Please enter a number between 1 and 100!</span>';
            return;
        }

        this.attempts++;
        document.getElementById('guessAttempts').textContent = this.attempts;

        if (guess === this.target) {
            result.innerHTML = `<span style="color: var(--accent-green); font-weight: 700;">🎉 CORRECT! You got it in ${this.attempts} attempts!</span>`;
            input.disabled = true;
        } else if (guess < this.target) {
            result.innerHTML = '<span style="color: var(--accent-cyan);">📈 Too low! Try higher...</span>';
        } else {
            result.innerHTML = '<span style="color: var(--accent-pink);">📉 Too high! Try lower...</span>';
        }

        input.value = '';
        input.focus();
    }

    restart() {
        this.target = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        document.getElementById('guessAttempts').textContent = '0';
        document.getElementById('guessResult').innerHTML = '';
        const input = document.getElementById('guessInput');
        input.disabled = false;
        input.value = '';
        input.focus();
    }
}

// Simple Top-Down Racing Game
class RacerGame {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.playerX = 5; // Grid position (0-9)
        this.score = 0;
        this.obstacles = [];
        this.gameLoop = null;
        this.speed = 300; // ms between moves
        this.roadY = 0; // For scrolling effect
    }

    start() {
        const html = `
<div class="game-container fade-in">
    <div class="gradient-card orange">
        <div class="card-content">
            <h3 class="card-title">RACER</h3>
            <p class="card-description">Use LEFT/RIGHT arrows to dodge obstacles</p>
            <div style="margin: 1.5rem 0;">
                <canvas id="racerCanvas" width="400" height="600" style="border: 2px solid var(--accent-orange); background: #333; display: block; margin: 0 auto;"></canvas>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="card-action">SCORE: <span id="racerScore">0</span></span>
                <button onclick="window.currentGame.restart()" style="padding: 0.5rem 1rem; background: var(--accent-orange); border: none; color: #000; font-weight: 700; cursor: pointer; border-radius: 4px;">RESTART</button>
            </div>
        </div>
    </div>
</div>`;
        this.container.innerHTML = html;
        this.canvas = document.getElementById('racerCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Scroll to game
        setTimeout(() => {
            const gameContainer = this.container.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);

        this.setupControls();
        this.spawnObstacle();
        this.gameLoop = setInterval(() => this.update(), this.speed);
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.playerX > 0) {
                this.playerX--;
            }
            if (e.key === 'ArrowRight' && this.playerX < 9) {
                this.playerX++;
            }
        });
    }

    spawnObstacle() {
        if (Math.random() < 0.7) { // 70% chance to spawn
            const lanes = [];
            const numObstacles = Math.floor(Math.random() * 3) + 1; // 1-3 obstacles

            for (let i = 0; i < numObstacles; i++) {
                let lane;
                do {
                    lane = Math.floor(Math.random() * 10);
                } while (lanes.includes(lane));

                lanes.push(lane);
                this.obstacles.push({ x: lane, y: 0 });
            }
        }
    }

    update() {
        // Move obstacles down
        this.obstacles = this.obstacles.map(obs => ({
            ...obs,
            y: obs.y + 1
        }));

        // Remove off-screen obstacles and increase score
        const beforeLength = this.obstacles.length;
        this.obstacles = this.obstacles.filter(obs => obs.y < 15);
        const removed = beforeLength - this.obstacles.length;
        if (removed > 0) {
            this.score += removed;
            document.getElementById('racerScore').textContent = this.score;

            // Speed up every 10 points
            if (this.score % 10 === 0 && this.speed > 100) {
                this.speed -= 20;
                clearInterval(this.gameLoop);
                this.gameLoop = setInterval(() => this.update(), this.speed);
            }
        }

        // Check collision
        const playerRow = 13; // Player is at row 13
        const collision = this.obstacles.some(obs =>
            obs.x === this.playerX && obs.y === playerRow
        );

        if (collision) {
            this.gameOver();
            return;
        }

        // Spawn new obstacles
        if (Math.random() < 0.3) {
            this.spawnObstacle();
        }

        // Road scrolling effect
        this.roadY = (this.roadY + 2) % 40;

        this.draw();
    }

    draw() {
        const tileSize = 40;
        const w = this.canvas.width;
        const h = this.canvas.height;

        // Background
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, w, h);

        // Road
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, w, h);

        // Road lines
        this.ctx.fillStyle = '#555';
        for (let i = 0; i < 10; i++) {
            for (let j = -1; j < 16; j++) {
                const y = j * tileSize + this.roadY;
                if (i === 0 || i === 9) {
                    // Side lines
                    this.ctx.fillRect(i * tileSize, y, tileSize, 2);
                }
                // Center dashed line
                if (i === 4 || i === 5) {
                    if (j % 2 === 0) {
                        this.ctx.fillRect(i * tileSize + tileSize / 2 - 2, y, 4, tileSize / 2);
                    }
                }
            }
        }

        // Obstacles
        this.ctx.fillStyle = '#e91e63';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#e91e63';
        this.obstacles.forEach(obs => {
            this.ctx.fillRect(
                obs.x * tileSize + 4,
                obs.y * tileSize + 4,
                tileSize - 8,
                tileSize - 8
            );
        });
        this.ctx.shadowBlur = 0;

        // Player car
        const playerY = 13;
        this.ctx.fillStyle = '#00d9ff';
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#00d9ff';
        this.ctx.fillRect(
            this.playerX * tileSize + 4,
            playerY * tileSize + 4,
            tileSize - 8,
            tileSize - 8
        );
        this.ctx.shadowBlur = 0;

        // Headlights
        this.ctx.fillStyle = '#ffff00';
        this.ctx.fillRect(this.playerX * tileSize + 8, playerY * tileSize + 8, 6, 6);
        this.ctx.fillRect(this.playerX * tileSize + tileSize - 14, playerY * tileSize + 8, 6, 6);
    }

    gameOver() {
        clearInterval(this.gameLoop);

        // Save high score
        if (this.score > 0) {
            window.highScores.saveScore('racer', this.score);
        }

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '30px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '20px Orbitron';
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 40);

        const highScore = window.highScores.getHighScore('racer');
        if (this.score === highScore && this.score > 0) {
            this.ctx.fillStyle = '#00d9ff';
            this.ctx.fillText('NEW HIGH SCORE!', this.canvas.width / 2, this.canvas.height / 2 + 80);
        }
    }

    restart() {
        this.playerX = 5;
        this.score = 0;
        this.obstacles = [];
        this.speed = 300;
        this.roadY = 0;
        document.getElementById('racerScore').textContent = '0';
        clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), this.speed);
    }
}

// Pong Game
class PongGame {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.ballX = 200;
        this.ballY = 200;
        this.ballSpeedX = 5;
        this.ballSpeedY = 5;
        this.paddle1Y = 150;
        this.paddle2Y = 150;
        this.score1 = 0;
        this.score2 = 0;
        this.gameLoop = null;
        this.keys = {};
    }

    start() {
        const html = `
<div class="game-container fade-in">
    <div class="gradient-card blue">
        <div class="card-content">
            <h3 class="card-title">PONG</h3>
            <p class="card-description">Classic paddle game. W/S for left paddle, Arrow UP/DOWN for right paddle</p>
            <div style="margin: 1.5rem 0;">
                <canvas id="pongCanvas" width="600" height="400" style="border: 2px solid var(--accent-blue); background: #000; display: block; margin: 0 auto;"></canvas>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="card-action">PLAYER 1: <span id="pongScore1">0</span></span>
                <button onclick="window.currentGame.restart()" style="padding: 0.5rem 1rem; background: var(--accent-blue); border: none; color: #fff; font-weight: 700; cursor: pointer; border-radius: 4px;">RESTART</button>
                <span class="card-action">PLAYER 2: <span id="pongScore2">0</span></span>
            </div>
        </div>
    </div>
</div>`;
        this.container.innerHTML = html;
        this.canvas = document.getElementById('pongCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Scroll to game
        setTimeout(() => {
            const gameContainer = this.container.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);

        this.setupControls();
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    update() {
        // Paddle controls
        if (this.keys['w'] || this.keys['W']) this.paddle1Y -= 6;
        if (this.keys['s'] || this.keys['S']) this.paddle1Y += 6;
        if (this.keys['ArrowUp']) this.paddle2Y -= 6;
        if (this.keys['ArrowDown']) this.paddle2Y += 6;

        // Keep paddles in bounds
        this.paddle1Y = Math.max(0, Math.min(300, this.paddle1Y));
        this.paddle2Y = Math.max(0, Math.min(300, this.paddle2Y));

        // Ball movement
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;

        // Ball collision with top/bottom
        if (this.ballY <= 10 || this.ballY >= 390) {
            this.ballSpeedY = -this.ballSpeedY;
        }

        // Ball collision with paddles
        if (this.ballX <= 30 && this.ballY >= this.paddle1Y && this.ballY <= this.paddle1Y + 100) {
            this.ballSpeedX = Math.abs(this.ballSpeedX) + 0.5;
            this.ballSpeedY += (this.ballY - (this.paddle1Y + 50)) * 0.1;
        }
        if (this.ballX >= 570 && this.ballY >= this.paddle2Y && this.ballY <= this.paddle2Y + 100) {
            this.ballSpeedX = -Math.abs(this.ballSpeedX) - 0.5;
            this.ballSpeedY += (this.ballY - (this.paddle2Y + 50)) * 0.1;
        }

        // Scoring
        if (this.ballX < 0) {
            this.score2++;
            document.getElementById('pongScore2').textContent = this.score2;
            this.resetBall();
            if (this.score2 >= 5) this.gameOver(2);
        }
        if (this.ballX > 600) {
            this.score1++;
            document.getElementById('pongScore1').textContent = this.score1;
            this.resetBall();
            if (this.score1 >= 5) this.gameOver(1);
        }

        this.draw();
    }

    resetBall() {
        this.ballX = 300;
        this.ballY = 200;
        this.ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 5;
        this.ballSpeedY = (Math.random() - 0.5) * 4;
    }

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, 600, 400);

        // Center line
        this.ctx.strokeStyle = '#333';
        this.ctx.setLineDash([10, 10]);
        this.ctx.beginPath();
        this.ctx.moveTo(300, 0);
        this.ctx.lineTo(300, 400);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Paddles
        this.ctx.fillStyle = '#00d9ff';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#00d9ff';
        this.ctx.fillRect(10, this.paddle1Y, 10, 100);
        this.ctx.fillRect(580, this.paddle2Y, 10, 100);

        // Ball
        this.ctx.fillStyle = '#fff';
        this.ctx.shadowColor = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(this.ballX, this.ballY, 10, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }

    gameOver(winner) {
        clearInterval(this.gameLoop);

        const totalScore = this.score1 + this.score2;
        if (totalScore > 0) {
            window.highScores.saveScore('pong', totalScore);
        }

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, 600, 400);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '30px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`PLAYER ${winner} WINS!`, 300, 200);
    }

    restart() {
        this.ballX = 300;
        this.ballY = 200;
        this.ballSpeedX = 5;
        this.ballSpeedY = 5;
        this.paddle1Y = 150;
        this.paddle2Y = 150;
        this.score1 = 0;
        this.score2 = 0;
        document.getElementById('pongScore1').textContent = '0';
        document.getElementById('pongScore2').textContent = '0';
        clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    }
}

// Breakout Game
class BreakoutGame {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.paddleX = 250;
        this.ballX = 300;
        this.ballY = 350;
        this.ballSpeedX = 4;
        this.ballSpeedY = -4;
        this.score = 0;
        this.bricks = [];
        this.gameLoop = null;
        this.keys = {};
    }

    start() {
        const html = `
<div class="game-container fade-in">
    <div class="gradient-card green">
        <div class="card-content">
            <h3 class="card-title">BREAKOUT</h3>
            <p class="card-description">Break all bricks. Use arrow LEFT/RIGHT or A/D to move paddle</p>
            <div style="margin: 1.5rem 0;">
                <canvas id="breakoutCanvas" width="600" height="400" style="border: 2px solid var(--accent-green); background: #000; display: block; margin: 0 auto;"></canvas>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="card-action">SCORE: <span id="breakoutScore">0</span></span>
                <button onclick="window.currentGame.restart()" style="padding: 0.5rem 1rem; background: var(--accent-green); border: none; color: #000; font-weight: 700; cursor: pointer; border-radius: 4px;">RESTART</button>
            </div>
        </div>
    </div>
</div>`;
        this.container.innerHTML = html;
        this.canvas = document.getElementById('breakoutCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Scroll to game
        setTimeout(() => {
            const gameContainer = this.container.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);

        this.createBricks();
        this.setupControls();
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    }

    createBricks() {
        const colors = ['#ff6b35', '#4a90e2', '#2ecc71', '#9b59b6', '#e91e63'];
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 10; col++) {
                this.bricks.push({
                    x: col * 60 + 5,
                    y: row * 20 + 30,
                    width: 55,
                    height: 15,
                    color: colors[row],
                    alive: true
                });
            }
        }
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    update() {
        // Paddle controls
        if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) this.paddleX -= 8;
        if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) this.paddleX += 8;

        // Keep paddle in bounds
        this.paddleX = Math.max(0, Math.min(500, this.paddleX));

        // Ball movement
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;

        // Ball collision with walls
        if (this.ballX <= 10 || this.ballX >= 590) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        if (this.ballY <= 10) {
            this.ballSpeedY = -this.ballSpeedY;
        }

        // Ball collision with paddle
        if (this.ballY >= 370 && this.ballY <= 380 &&
            this.ballX >= this.paddleX && this.ballX <= this.paddleX + 100) {
            this.ballSpeedY = -Math.abs(this.ballSpeedY);
            this.ballSpeedX += (this.ballX - (this.paddleX + 50)) * 0.1;
        }

        // Ball collision with bricks
        this.bricks.forEach(brick => {
            if (brick.alive &&
                this.ballX >= brick.x && this.ballX <= brick.x + brick.width &&
                this.ballY >= brick.y && this.ballY <= brick.y + brick.height) {
                brick.alive = false;
                this.ballSpeedY = -this.ballSpeedY;
                this.score += 10;
                document.getElementById('breakoutScore').textContent = this.score;
            }
        });

        // Check win
        if (this.bricks.every(b => !b.alive)) {
            this.gameOver(true);
        }

        // Check loss
        if (this.ballY > 400) {
            this.gameOver(false);
        }

        this.draw();
    }

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, 600, 400);

        // Bricks
        this.bricks.forEach(brick => {
            if (brick.alive) {
                this.ctx.fillStyle = brick.color;
                this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
        });

        // Paddle
        this.ctx.fillStyle = '#00d9ff';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#00d9ff';
        this.ctx.fillRect(this.paddleX, 370, 100, 10);

        // Ball
        this.ctx.fillStyle = '#fff';
        this.ctx.shadowColor = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(this.ballX, this.ballY, 10, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }

    gameOver(won) {
        clearInterval(this.gameLoop);

        if (this.score > 0) {
            window.highScores.saveScore('breakout', this.score);
        }

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, 600, 400);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '30px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(won ? 'YOU WIN!' : 'GAME OVER', 300, 180);
        this.ctx.font = '20px Orbitron';
        this.ctx.fillText(`Score: ${this.score}`, 300, 220);

        const highScore = window.highScores.getHighScore('breakout');
        if (this.score === highScore && this.score > 0) {
            this.ctx.fillStyle = '#00d9ff';
            this.ctx.fillText('NEW HIGH SCORE!', 300, 260);
        }
    }

    restart() {
        this.paddleX = 250;
        this.ballX = 300;
        this.ballY = 350;
        this.ballSpeedX = 4;
        this.ballSpeedY = -4;
        this.score = 0;
        this.bricks = [];
        document.getElementById('breakoutScore').textContent = '0';
        this.createBricks();
        clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    }
}

window.SnakeGame = SnakeGame;
window.TetrisGame = TetrisGame;
window.GuessNumberGame = GuessNumberGame;
window.RacerGame = RacerGame;
window.PongGame = PongGame;
window.BreakoutGame = BreakoutGame;
