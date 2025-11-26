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
        this.container.innerHTML += html;
        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');
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
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '30px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '20px Orbitron';
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 40);
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
        this.container.innerHTML += html;
        this.canvas = document.getElementById('tetrisCanvas');
        this.ctx = this.canvas.getContext('2d');

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
        this.container.innerHTML += html;

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

window.SnakeGame = SnakeGame;
window.TetrisGame = TetrisGame;
window.GuessNumberGame = GuessNumberGame;
