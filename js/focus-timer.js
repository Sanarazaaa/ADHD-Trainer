class FocusTimer {
    constructor() {
        this.timeLeft = 0;
        this.isRunning = false;
        this.timerId = null;
    }

    init() {
        const gameArea = document.getElementById('gameArea');
        gameArea.style.display = 'block';
        gameArea.innerHTML = `
            <div class="focus-timer">
                <div class="timer-display">
                    <h3>Focus Timer</h3>
                    <div id="timeDisplay">25:00</div>
                </div>
                <div class="timer-controls">
                    <button id="start15" class="timer-button">15 Minutes</button>
                    <button id="start25" class="timer-button">25 Minutes</button>
                    <button id="start45" class="timer-button">45 Minutes</button>
                </div>
                <div class="timer-actions">
                    <button id="startStop" class="action-button">Start</button>
                    <button id="reset" class="action-button">Reset</button>
                </div>
            </div>
        `;

        this.addStyles();
        this.addEventListeners();
        this.setTime(25); // Default to 25 minutes
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .focus-timer {
                text-align: center;
                padding: 20px;
            }
            .timer-display {
                margin: 20px 0;
            }
            #timeDisplay {
                font-size: 3rem;
                font-weight: bold;
                margin: 20px 0;
            }
            .timer-controls {
                display: flex;
                gap: 10px;
                justify-content: center;
                margin-bottom: 20px;
            }
            .timer-button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                background: #f0f0f0;
                cursor: pointer;
            }
            .timer-button:hover {
                background: #e0e0e0;
            }
            .timer-actions {
                display: flex;
                gap: 10px;
                justify-content: center;
            }
            .action-button {
                padding: 10px 30px;
                border: none;
                border-radius: 5px;
                background: #4a90e2;
                color: white;
                cursor: pointer;
            }
            .action-button:hover {
                background: #357abd;
            }
        `;
        document.head.appendChild(style);
    }

    addEventListeners() {
        document.getElementById('start15').addEventListener('click', () => this.setTime(15));
        document.getElementById('start25').addEventListener('click', () => this.setTime(25));
        document.getElementById('start45').addEventListener('click', () => this.setTime(45));
        document.getElementById('startStop').addEventListener('click', () => this.toggleTimer());
        document.getElementById('reset').addEventListener('click', () => this.resetTimer());
    }

    setTime(minutes) {
        this.timeLeft = minutes * 60;
        this.updateDisplay();
    }

    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        if (this.timeLeft > 0) {
            this.isRunning = true;
            document.getElementById('startStop').textContent = 'Pause';
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                if (this.timeLeft <= 0) {
                    this.completeTimer();
                }
            }, 1000);
        }
    }

    pauseTimer() {
        this.isRunning = false;
        document.getElementById('startStop').textContent = 'Start';
        clearInterval(this.timerId);
    }

    resetTimer() {
        this.pauseTimer();
        this.timeLeft = 25 * 60;
        this.updateDisplay();
    }

    completeTimer() {
        this.pauseTimer();
        alert('Focus session complete!');
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        document.getElementById('timeDisplay').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}