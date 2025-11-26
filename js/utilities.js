// Noctua Terminal - Utilities
// Calculator, Timer, Todo List

class Utilities {
    constructor() {
        this.todos = this.loadTodos();
    }

    // Calculator
    calculate(expression) {
        try {
            // Safety check - only allow numbers and basic operators
            if (!/^[\d\s+\-*/().]+$/.test(expression)) {
                return 'Error: Invalid expression. Use only numbers and +, -, *, /, ()';
            }

            const result = eval(expression);
            return `
<div class="gradient-card blue fade-in">
    <div class="card-content">
        <h3 class="card-title">CALCULATOR</h3>
        <div style="margin: 1.5rem 0;">
            <div style="font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${expression}</div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--accent-cyan);">${result}</div>
        </div>
    </div>
</div>`;
        } catch (e) {
            return 'Error: Invalid expression';
        }
    }

    // Timer
    startTimer(minutes) {
        const mins = parseInt(minutes) || 5;
        const totalSeconds = mins * 60;
        let remaining = totalSeconds;

        const container = document.createElement('div');
        container.className = 'gradient-card orange fade-in';
        container.innerHTML = `
            <div class="card-content">
                <h3 class="card-title">TIMER</h3>
                <div style="margin: 1.5rem 0;">
                    <div id="timerDisplay" style="font-size: 3rem; font-weight: 700; text-align: center; color: var(--accent-cyan);"></div>
                    <div id="timerProgress" style="margin-top: 1rem; font-family: monospace; font-size: 0.875rem;"></div>
                </div>
            </div>
        `;

        const interval = setInterval(() => {
            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            const display = container.querySelector('#timerDisplay');
            const progress = container.querySelector('#timerProgress');

            if (display) {
                display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }

            if (progress && window.effectsManager) {
                const percentage = Math.floor((remaining / totalSeconds) * 100);
                progress.textContent = window.effectsManager.createProgressBar(percentage, 'Progress');
            }

            remaining--;

            if (remaining < 0) {
                clearInterval(interval);
                if (display) {
                    display.textContent = 'TIME\'S UP!';
                    display.style.color = '#ff6b35';
                }
                // Play sound if available
                if (window.soundManager) {
                    window.soundManager.playSuccess();
                }
            }
        }, 1000);

        return container.outerHTML;
    }

    // Todo List
    loadTodos() {
        const saved = localStorage.getItem('noctua_todos');
        return saved ? JSON.parse(saved) : [];
    }

    saveTodos() {
        localStorage.setItem('noctua_todos', JSON.stringify(this.todos));
    }

    listTodos() {
        if (this.todos.length === 0) {
            return `
<div class="gradient-card green fade-in">
    <div class="card-content">
        <h3 class="card-title">TODO LIST</h3>
        <p class="card-description">No tasks yet. Add one with: todo add [task]</p>
    </div>
</div>`;
        }

        let html = `
<div class="gradient-card green fade-in">
    <div class="card-content">
        <h3 class="card-title">TODO LIST</h3>
        <p class="card-description">Manage with: todo add/done/clear [id]</p>
        <div style="margin-top: 1.5rem; display: grid; gap: 0.5rem;">`;

        this.todos.forEach((todo, i) => {
            const check = todo.done ? '✓' : '○';
            const style = todo.done ? 'text-decoration: line-through; opacity: 0.5;' : '';
            html += `
            <div style="padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 4px; display: flex; align-items: center; ${style}">
                <span style="color: var(--accent-cyan); font-weight: 700; margin-right: 1rem;">${check}</span>
                <span style="flex: 1;">${i + 1}. ${todo.text}</span>
            </div>`;
        });

        html += `</div></div></div>`;
        return html;
    }

    addTodo(text) {
        if (!text) return 'Usage: todo add [task]';
        this.todos.push({ text, done: false });
        this.saveTodos();
        return this.listTodos();
    }

    doneTodo(id) {
        const index = parseInt(id) - 1;
        if (index < 0 || index >= this.todos.length) {
            return 'Invalid task ID';
        }
        this.todos[index].done = !this.todos[index].done;
        this.saveTodos();
        return this.listTodos();
    }

    clearTodos() {
        this.todos = this.todos.filter(t => !t.done);
        this.saveTodos();
        return this.listTodos();
    }

    // Weather
    async getWeather(city = 'auto') {
        try {
            const response = await fetch(`https://wttr.in/${city}?format=j1`);
            const data = await response.json();
            const current = data.current_condition[0];
            const location = data.nearest_area[0];

            return `
<div class="gradient-card blue fade-in">
    <div class="card-content">
        <h3 class="card-title">WEATHER</h3>
        <p class="card-description">${location.areaName[0].value}, ${location.country[0].value}</p>
        <div style="margin: 1.5rem 0;">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">${current.weatherDesc[0].value}</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div style="text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-cyan);">${current.temp_C}°C</div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Temperature</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-cyan);">${current.humidity}%</div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Humidity</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700;">${current.windspeedKmph} km/h</div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Wind Speed</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700;">${current.FeelsLikeC}°C</div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Feels Like</div>
                </div>
            </div>
        </div>
    </div>
</div>`;
        } catch (e) {
            return 'Error fetching weather data';
        }
    }

    // Crypto Prices (using free API)
    async getCrypto() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,solana,polkadot&vs_currencies=usd&include_24hr_change=true');
            const data = await response.json();

            let html = `
<div class="gradient-card purple fade-in">
    <div class="card-content">
        <h3 class="card-title">CRYPTO PRICES</h3>
        <p class="card-description">Top cryptocurrencies (USD)</p>
        <div style="margin-top: 1.5rem; display: grid; gap: 0.75rem;">`;

            const coins = [
                { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
                { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
                { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
                { id: 'solana', name: 'Solana', symbol: 'SOL' },
                { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' }
            ];

            coins.forEach(coin => {
                const price = data[coin.id].usd;
                const change = data[coin.id].usd_24h_change;
                const changeColor = change >= 0 ? '#2ecc71' : '#e74c3c';
                const changeSymbol = change >= 0 ? '▲' : '▼';

                html += `
                <div style="padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: 700;">${coin.name} (${coin.symbol})</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">$${price.toLocaleString()}</div>
                    </div>
                    <div style="color: ${changeColor}; font-weight: 700;">
                        ${changeSymbol} ${Math.abs(change).toFixed(2)}%
                    </div>
                </div>`;
            });

            html += `</div></div></div>`;
            return html;
        } catch (e) {
            return 'Error fetching crypto data';
        }
    }
}

window.utilities = new Utilities();
