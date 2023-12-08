const elements = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cards = generateUniquePairs(elements);

let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function generateUniquePairs(elements) {
  const pairs = elements.concat(elements); // Doubler chaque élément pour créer des paires
  return shuffle(pairs); // Mélanger les paires
}

function createCard(cardValue) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.addEventListener('click', () => flipCard(card));

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const frontFace = document.createElement('div');
  frontFace.classList.add('face');
  frontFace.textContent = '?';

  const backFace = document.createElement('div');
  backFace.classList.add('face', 'back');
  backFace.textContent = cardValue;

  cardInner.appendChild(frontFace);
  cardInner.appendChild(backFace);
  card.appendChild(cardInner);

  return card;
}

function flipCard(card) {
  if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const value1 = card1.querySelector('.back').textContent;
  const value2 = card2.querySelector('.back').textContent;

  if (value1 === value2) {
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      Swal.fire({
          title: 'Bien joué, vous avez gagné !',
          icon: 'success',
          confirmButtonText: 'Rejouer une partie',
          showDenybutton: true,
          denyButtonText: 'Retourner à l\'accueil',
          allowOutsideClick: false,
          allowEscapeKey: false,
          }).then((result) => {
          if (result.isConfirmed) {
              location.reload();
          }
      })
    }
  } else {
    flippedCards.forEach(card => card.classList.remove('flipped'));
    flippedCards = [];
  }
}

function initGame() {
  const shuffledCards = shuffle(cards);
  const gameContainer = document.getElementById('memory-game');

  shuffledCards.forEach(cardValue => {
    const card = createCard(cardValue);
    gameContainer.appendChild(card);
  });
}