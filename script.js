const gameBoard = document.getElementById("gameBoard");
const resetButton = document.getElementById("resetGame");
const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🥝", "🍍", "🍓", "🥭", "🍈"];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = "";
    const shuffledSymbols = shuffle([...symbols, ...symbols]);
    shuffledSymbols.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.symbol;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === symbols.length) {
            alert("Parabéns! Você venceu!");
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
        flippedCards = [];
    }
}

function resetGame() {
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    createBoard();
}

resetButton.addEventListener("click", resetGame);
createBoard();
