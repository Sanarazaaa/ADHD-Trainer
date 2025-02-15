class MemoryGame {
    constructor() {
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.colors = ['red', 'blue', 'green', 'yellow'];
    }

    init() {
        const gameArea = document.getElementById('gameArea');
        gameArea.style.display = 'block';
        gameArea.innerHTML = `
            <div class="memory-game">
                <div class="game-info">
                    <h3>Level: <span id="level">1</span></h3>
                    <button id="startMemory">Start Game</button>
                </div>
                <div class="color-grid">
                    ${this.colors.map(color => `
                        <div class="color-button ${color}" data-color="${color}"></div>
                    `).join('')}
                </div>
            </div>
        `;

        this.addStyles();
        this.addEventListeners();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .memory-game {
                text-align: center;
                padding: 20px;
            }
            .color-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
                max-width: 400px;
                margin: 20px auto;
            }
            .color-button {
                aspect-ratio: 1;
                border-radius: 15px;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s;
            }
            .color-button:hover {
                opacity: 1;
            }
            .color-button.active {
                opacity: 1;
            }
            .red { background-color: #ff4444; }
            .blue { background-color: #4444ff; }
            .green { background-color: #44ff44; }
            .yellow { background-color: #ffff44; }
        `;
        document.head.appendChild(style);
    }

    addEventListeners() {
        document.getElementById('startMemory').addEventListener('click', () => this.startGame());
        document.querySelectorAll('.color-button').forEach(button => {
            button.addEventListener('click', (e) => this.handlePlayerInput(e.target.dataset.color));
        });
    }

    startGame() {
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.nextRound();
    }

    nextRound() {
        this.sequence.push(this.colors[Math.floor(Math.random() * 4)]);
        document.getElementById('level').textContent = this.level;
        this.playSequence();
    }

    async playSequence() {
        const buttons = document.querySelectorAll('.color-button');
        buttons.forEach(button => button.style.pointerEvents = 'none');

        for (let color of this.sequence) {
            await this.flashColor(color);
        }

        buttons.forEach(button => button.style.pointerEvents = 'auto');
        this.playerSequence = [];
    }

    async flashColor(color) {
        const button = document.querySelector(`[data-color="${color}"]`);
        button.classList.add('active');
        await new Promise(resolve => setTimeout(resolve, 500));
        button.classList.remove('active');
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    handlePlayerInput(color) {
        this.playerSequence.push(color);
        this.flashColor(color);

        if (this.playerSequence[this.playerSequence.length - 1] !== this.sequence[this.playerSequence.length - 1]) {
            alert(`Game Over! You reached level ${this.level}`);
            this.startGame();
            return;
        }

        if (this.playerSequence.length === this.sequence.length) {
            this.level++;
            setTimeout(() => this.nextRound(), 1000);
        }
    }
}