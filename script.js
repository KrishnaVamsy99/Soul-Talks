// ==========================================
// 1. EDIT YOUR CONTACT DETAILS HERE
// ==========================================
const CONTACT_NUMBER = "919566251124"; // Replace with your real number (with country code if needed, e.g. 919876543210)
const TELEGRAM_USERNAME = "Soultalks99"; // Replace this

// Set Call + Telegram links
document.addEventListener("DOMContentLoaded", function () {
    const callLink = document.getElementById("callLink");
    const telegramLink = document.getElementById("telegramLink");

    if (callLink) {
        callLink.href = `tel:+${CONTACT_NUMBER}`;
    }

    if (telegramLink) {
        telegramLink.href = `https://t.me/${TELEGRAM_USERNAME}`;
    }
});

// ==========================================
// 2. WHATSAPP CONNECTION
// ==========================================
function openWhatsApp(planName) {
    const message = `Hello! I'm interested in the "${planName}" session.

I would like to know:
- Your availability
- Whether call / online / in-person is possible
- Any important details for this session

Please let me know if you're available.`;

    window.location.href = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ==========================================
// 3. BREATHING EXERCISE LOGIC
// ==========================================
let breathingInterval;

function startBreathing(buttonElement) {
    const circle = document.getElementById('breatheCircle');
    const text = document.getElementById('breatheText');
    const btn = buttonElement || document.getElementById('breatheBtn');

    clearInterval(breathingInterval);
    btn.innerText = "Restart Exercise";

    function breatheCycle() {
        text.innerText = "Inhale...";
        circle.className = "breathe-circle inhale";

        setTimeout(() => {
            text.innerText = "Hold...";

            setTimeout(() => {
                text.innerText = "Exhale...";
                circle.className = "breathe-circle exhale";
            }, 2000); // Hold for 2 sec

        }, 3000); // Inhale 3 sec
    }

    breatheCycle();
    breathingInterval = setInterval(breatheCycle, 8000); // Full cycle 8 sec
}

// ==========================================
// 4. TIC-TAC-TOE VS BOT LOGIC
// ==========================================
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const statusDisplay = document.getElementById('gameStatus');

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function makeMove(cellIndex) {
    if (board[cellIndex] !== '' || !gameActive) return;

    // Player Move
    updateCell(cellIndex, 'X');
    checkResult();

    // Bot Move
    if (gameActive) {
        statusDisplay.innerText = "Bot is thinking...";
        setTimeout(() => botMove(), 600);
    }
}

function botMove() {
    let emptyCells = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') emptyCells.push(i);
    }

    if (emptyCells.length === 0) return;

    // Basic smarter bot: try to win/block first, else random
    let move = findBestMove('O') ?? findBestMove('X');

    if (move === null || move === undefined) {
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    updateCell(move, 'O');
    checkResult();
}

function findBestMove(player) {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        const values = [board[a], board[b], board[c]];

        if (values.filter(v => v === player).length === 2 && values.includes('')) {
            if (board[a] === '') return a;
            if (board[b] === '') return b;
            if (board[c] === '') return c;
        }
    }
    return null;
}

function updateCell(index, player) {
    board[index] = player;
    const cells = document.querySelectorAll('.cell');
    cells[index].innerText = player;
    cells[index].classList.add(player.toLowerCase());
}

function checkResult() {
    let roundWon = false;
    let winner = '';

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winner = board[a];
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = winner === 'X' ? "You won! Great game." : "Bot wins this round!";
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    let currentPlayerTurn = board.filter(x => x !== '').length % 2 === 0 ? 'X' : 'O';
    if (currentPlayerTurn === 'X') {
        statusDisplay.innerText = "Your turn! (You are X)";
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusDisplay.innerText = "Your turn! (You are X)";

    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
    });
}

// ==========================================
// 5. REVEAL ON SCROLL
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ==========================================
// 6. PARTICLES BACKGROUND
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { value: 70 },
                color: { value: "#ffffff" },
                opacity: { value: 0.28 },
                size: { value: 2 },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.08
                },
                move: {
                    enable: true,
                    speed: 1
                }
            }
        });
    }
});