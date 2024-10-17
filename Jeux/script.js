let currentPlayer = 1;
let players = [];
const boardSize = 63; // Nombre total de cases
const diceResult = document.getElementById('dice-number');
const diceAnimation = document.getElementById('dice-animation');
const currentPlayerElement = document.getElementById('current-player');
const currentPionElement = document.getElementById('current-pion');
const pionsContainer = document.getElementById('pions');
const playersContainer = document.getElementById('players');
const diceSection = document.getElementById('dice');

// Couleurs pour les pions (max 6 joueurs)
const pionColors = ['🟢', '🔵', '🔴', '🟡', '🟠', '🟣'];

// Cartes questions
const cards = [
    {
        question: "Message de haine – Quelqu’un t’a envoyé un message de haine. Que fais-tu ?",
        consequence: "Signale ce message et avance de 2 cases."
    },
    {
        question: "Publication inappropriée – Tu as partagé une photo d’un ami sans son consentement. Retire-la et excuse-toi.",
        consequence: "Recule de 2 cases pour réparer ton erreur."
    }
];

// Initialisation des joueurs et de l'interface
document.getElementById('startGame').addEventListener('click', function () {
    const numPlayers = parseInt(document.getElementById('numPlayers').value);

    // Réinitialiser l'interface
    playersContainer.innerHTML = '';
    pionsContainer.innerHTML = '';
    players = [];

    // Générer les champs pour les noms des joueurs
    for (let i = 0; i < numPlayers; i++) {
        const playerName = `Joueur ${i + 1}`;
        playersContainer.innerHTML += `
            <div class="player-input">
                <span class="pion-icon">${pionColors[i]}</span>
                <label for="player${i}">Nom du joueur ${i + 1} :</label>
                <input type="text" id="player${i}" placeholder="${playerName}" value="${playerName}">
            </div>
        `;
        players.push({ name: playerName, position: 0, element: null });
    }

    // Afficher les pions
    players.forEach((player, index) => {
        const pion = document.createElement('div');
        pion.classList.add('pion');
        pion.id = `pion${index}`;
        pion.innerHTML = pionColors[index];
        pionsContainer.appendChild(pion);
        player.element = pion;
    });

    // Montrer les sections cachées
    playersContainer.classList.remove('hidden');
    diceSection.classList.remove('hidden');

    // Afficher le premier joueur et son pion
    currentPlayerElement.textContent = players[0].name;
    currentPionElement.textContent = pionColors[0];
});

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function movePlayer(player, steps) {
    player.position += steps;
    if (player.position >= boardSize) {
        player.position = boardSize - 1; // Empêcher de dépasser la dernière case
    }

    const cell = document.querySelectorAll('.cell')[player.position];
    
    // Si le joueur atterrit sur une case jaune
    if (cell.classList.contains('special-yellow')) {
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        alert(`${randomCard.question}\n\n${randomCard.consequence}`);

        // Afficher la deuxième pop-up avec une réponse après un petit délai
        setTimeout(function() {
            alert("Voici la bonne action à faire : " + randomCard.consequence);
        }, 500); // Délai de 500 millisecondes avant d'afficher la réponse

        // Appliquer la conséquence de la carte
        if (randomCard.consequence.includes("avance de 2 cases")) {
            player.position = Math.min(player.position + 2, boardSize - 1);
        } else if (randomCard.consequence.includes("recule de 2 cases")) {
            player.position = Math.max(player.position - 2, 0);
        }

        // Met à jour la position après conséquence
        const updatedCell = document.querySelectorAll('.cell')[player.position];
        const basePosition = updatedCell.getBoundingClientRect();
        player.element.style.top = basePosition.top + 'px';
        player.element.style.left = basePosition.left + 'px';
    }

    // Positionner chaque pion correctement
    const playersOnSameCell = players.filter(p => p.position === player.position);
    const basePosition = cell.getBoundingClientRect();
    const radius = 20;
    const angleIncrement = (Math.PI * 2) / playersOnSameCell.length;

    playersOnSameCell.forEach((p, index) => {
        const angle = index * angleIncrement;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;

        p.element.style.top = basePosition.top + offsetY + 'px';
        p.element.style.left = basePosition.left + offsetX + 'px';
    });
}

function nextTurn() {
    currentPlayer = (currentPlayer % players.length) + 1; // Alternance entre les joueurs
    players[currentPlayer - 1].name = document.getElementById(`player${currentPlayer - 1}`).value; // Met à jour les noms des joueurs s'ils sont modifiés
    currentPlayerElement.textContent = players[currentPlayer - 1].name;
    currentPionElement.textContent = pionColors[currentPlayer - 1]; // Affiche la couleur du pion correspondant
}

function startDiceAnimation() {
    diceAnimation.classList.add('visible');
}

function stopDiceAnimation() {
    diceAnimation.classList.remove('visible');
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        startDiceAnimation(); // Lance l'animation du dé

        setTimeout(function () {
            const result = rollDice();
            diceResult.textContent = result;

            stopDiceAnimation(); // Arrête l'animation une fois le dé "roulé"
            
            const current = players[currentPlayer - 1];
            movePlayer(current, result);

            // Si le joueur atteint la dernière case
            if (current.position === boardSize - 1) {
                alert(current.name + " a gagné !");
                alert("Félicitations ! Tu as appris à repérer, prévenir et réagir face au cyberharcèlement. Continue à promouvoir un usage sain et respectueux des réseaux sociaux !");

                // Demander à l'utilisateur s'il souhaite recommencer ou quitter
                let playAgain = confirm("Voulez-vous jouer une nouvelle partie ?");
                
                if (playAgain) {
                    // Recharger la page pour recommencer
                    location.reload();
                } else {
                    // Fermer la fenêtre du jeu
                    window.close();
                }
            } else {
                nextTurn();
            }
        }, 1000); // Arrête le dé après 1 seconde
    }
});
