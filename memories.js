const cards = [
    'A', 'A', 'B', 'B',
    'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H'
];

// Mélanger les cartes
cards.sort(() => Math.random() - 0.5);

// Sélectionner l'élément du jeu
const memoryGame = document.getElementById('memory-game');

// Initialiser le tableau pour suivre les cartes retournées
let flippedCards = [];

// Créer les cartes et les ajouter à la page
cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('memory-card');
    cardElement.dataset.card = card;
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', flipCard);
    memoryGame.appendChild(cardElement);
});

// Fonction pour retourner une carte
function flipCard() {
    const selectedCard = this;
    selectedCard.textContent = selectedCard.dataset.card;

    flippedCards.push(selectedCard);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Fonction pour vérifier si les cartes retournées forment une paire
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.card === card2.dataset.card) {
        // Paire trouvée
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
    } else {
        // Pas de correspondance, retourner les cartes face cachée
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];
}