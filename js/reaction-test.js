class ReactionTest {
    constructor() {
        this.timeoutId = null;
        this.startTime = null;
        this.bestTime = localStorage.getItem('bestReactionTime') || Infinity;
    }

    init() {
        const gameArea = document.getElementById('gameArea');
        gameArea.style.display = 'block';
        gameArea.innerHTML = `
            <div class="reaction-test">
                <div class="game-info">
                    <h3>Best Time: <span id="bestTime">${this.bestTime === Infinity ? '-' : this.bestTime + 'ms'}</span></h3>
                    <button id="startReaction">Start Test</button>
                </div>
                <div id="reactionArea" class="reaction-area waiting">
                    Wait for green...
                </div>
            </div>
        `;

        this.addStyles();
        this.addEventListeners();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .reaction-test {
                text-align: center;
                padding: 20px;
            }
            .reaction-area {
                width: 300px;
                height: 300px;
                margin: 20px auto;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 1.2rem;
                border-radius: 15px;
                transition: background-color 0.1s;
            }
            .waiting {
                background-color: #ff4444;
                color: white;
            }
            .ready {
                background-color: #44ff44;
                color: black;
            }
            .too-soon {
                background-color: #ff8800;
                color: white;
            }
        `;
        document.head.appendChild(style);
    }

    addEventListeners() {
        document.getElementById('startReaction').addEventListener('click', () => this.startTest());
        document.getElementById('reactionArea').addEventListener('click', (e) => this.handleClick(e));
    }

    startTest() {
        const reactionArea = document.getElementById('reactionArea');
        reactionArea.className = 'reaction-area waiting';
        reactionArea.textContent = 'Wait for green...';

        const delay = 1000 + Math.random() * 4000;
        this.timeoutId = setTimeout(() => {
            this.startTime = Date.now();
            reactionArea.className = 'reaction-area ready';
            reactionArea.textContent = 'Click Now!';
        }, delay);
    }

    handleClick(event) {
        const reactionArea = event.target;
        
        if (reactionArea.classList.contains('waiting')) {
            clearTimeout(this.timeoutId);
            reactionArea.className = 'reaction-area too-soon';
            reactionArea.textContent = 'Too Soon! Click to try again';
        } 
        else if (reactionArea.classList.contains('ready')) {
            const reactionTime = Date.now() - this.startTime;
            if (reactionTime < this.bestTime) {
                this.bestTime = reactionTime;
                localStorage.setItem('bestReactionTime', reactionTime);
                document.getElementById('bestTime').textContent = reactionTime + 'ms';
            }
            reactionArea.className = 'reaction-area waiting';
            reactionArea.textContent = `${reactionTime}ms - Click to try again`;
        } 
        else if (reactionArea.classList.contains('too-soon')) {
            this.startTest();
        }
    }
}