// Noctua Arcade - High Scores System

class HighScoresManager {
    constructor() {
        this.scores = this.loadScores();
    }

    loadScores() {
        const saved = localStorage.getItem('noctua_arcade_scores');
        return saved ? JSON.parse(saved) : {
            snake: [],
            tetris: [],
            breakout: [],
            pong: [],
            invaders: [],
            game2048: []
        };
    }

    saveScore(game, score, name = 'Player') {
        if (!this.scores[game]) this.scores[game] = [];

        this.scores[game].push({
            name,
            score,
            date: new Date().toISOString()
        });

        this.scores[game].sort((a, b) => b.score - a.score);
        this.scores[game] = this.scores[game].slice(0, 10);

        localStorage.setItem('noctua_arcade_scores', JSON.stringify(this.scores));
    }

    getTopScores(game, limit = 5) {
        return (this.scores[game] || []).slice(0, limit);
    }

    getHighScore(game) {
        const scores = this.scores[game] || [];
        return scores.length > 0 ? scores[0].score : 0;
    }
}

window.highScores = new HighScoresManager();
