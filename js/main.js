// Main functionality
let darkMode = false;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode from localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        toggleDarkMode();
    }
});

document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

// Utility Functions
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    document.getElementById('darkModeToggle').textContent = darkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', darkMode);
}

function updateProgress(progress) {
    document.querySelector('.progress').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${progress}%`;
}

// Game Functions
function startMemoryGame() {
    const game = new MemoryGame();
    game.init();
}

function startReactionTest() {
    const game = new ReactionTest();
    game.init();
}

function startFocusTimer() {
    const timer = new FocusTimer();
    timer.init();
}