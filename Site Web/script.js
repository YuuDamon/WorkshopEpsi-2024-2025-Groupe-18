// Écouteur d'événements pour la soumission du formulaire
document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des réponses
    const verification = document.querySelector('input[name="cyberharcèlement"]:checked').value;
    const utilisationRéseaux = document.querySelector('input[name="utilisationRéseaux"]:checked').value;
    const cyberharcelement = document.querySelector('input[name="verification"]:checked').value;

    // Ajustement des pourcentages en fonction des réponses
    let percentage1 = 50; // Valeur par défaut pour la vérification
    let percentage2 = 70; // Valeur par défaut pour l'utilisation des réseaux sociaux
    let percentage3 = 20; // Valeur par défaut pour le cyberharcèlement

    // Logique pour ajuster les pourcentages
    if (verification === "oui") {
        percentage1 += 10; // Augmente le pourcentage de ceux qui vérifient
    }
    if (utilisationRéseaux === "oui") {
        percentage2 += 5; // Augmente le pourcentage d'utilisation des réseaux sociaux
    }
    if (cyberharcelement === "oui") {
        percentage3 += 10; // Augmente le pourcentage de ceux qui ont été victimes de cyberharcèlement
    }

     // Logique pour ajuster les pourcentages
     if (verification === "non") {
        percentage1 -= 10; // Augmente le pourcentage de ceux qui vérifient
    }
    if (utilisationRéseaux === "non") {
        percentage2 -= 5; // Augmente le pourcentage d'utilisation des réseaux sociaux
    }
    if (cyberharcelement === "non") {
        percentage3 -= 5; // Augmente le pourcentage de ceux qui ont été victimes de cyberharcèlement
    }

    // Met à jour les pourcentages dans le DOM
    document.getElementById('percentage1').innerText = percentage1 + "%";
    document.getElementById('percentage2').innerText = percentage2 + "%";
    document.getElementById('percentage3').innerText = percentage3 + "%";

    // Afficher un message de remerciement
    alert("Merci d'avoir répondu aux questions !");
    
    // Afficher le bouton pour commencer le jeu
    document.getElementById('startGame').style.display = 'block';
});

// Écouteur d'événements pour le bouton "Commencer le jeu"
document.getElementById('startGame').addEventListener('click', function() {
    // Redirection vers la page du jeu
    window.location.href = 'Jeux/html.html';
});
