// Sélection des éléments
const container = document.querySelector('.background-animation');
const image = document.getElementById('foreground-image');
const textContainer = document.getElementById('typing-text');

// Chargement de l'animation Lottie
const animation = lottie.loadAnimation({
  container: document.getElementById('lottie-container'), // Conteneur pour Lottie
  renderer: 'svg',
  loop: false, // Pas de boucle initiale
  autoplay: true, // Lecture automatique au chargement
  path: '/assets/video/animBF.json' // Chemin vers l'animation JSON
});

// Texte à afficher
const text = "Bertrand FOUQUET";
let index = 0;

// Fonction pour l'effet de texte machine
function typeWriter() {
  if (index < text.length) {
    textContainer.textContent += text.charAt(index); // Ajoute un caractère
    index++;
    setTimeout(typeWriter, 100); // Vitesse d'écriture (100ms par lettre)
  }
}

// Vérifie si l'appareil est mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Gestion des événements (différents pour mobile)
if (!isMobile()) {
  // Lecture automatique au chargement
  animation.goToAndPlay(0, true);
  image.style.opacity = '0.5';

  // Rétablit l'état initial à la fin de l'animation
  animation.addEventListener('complete', () => {
    image.style.opacity = '1';
  });

  container.addEventListener('mouseenter', () => {
    animation.goToAndPlay(0, true); // Repart depuis le début
    image.style.opacity = '0.5'; // Réduit l'opacité de l'image
    index = 0; // Réinitialise l'index du texte
    textContainer.textContent = ""; // Vide le texte
    typeWriter(); // Démarre l'écriture
  });

  container.addEventListener('mouseleave', () => {
    animation.stop(); // Arrête l'animation
    image.style.opacity = '1'; // Rétablit l'opacité d'origine
  });

  container.addEventListener('mouseleave', () => {
    container.style.cursor = 'default'; // Curseur par défaut
  });
} else {
  // Gestion des événements pour mobile
  container.addEventListener('touchstart', () => {
    animation.goToAndPlay(0, true); // Repart depuis le début
    image.style.opacity = '0.5'; // Réduit l'opacité de l'image
    index = 0; // Réinitialise l'index du texte
    textContainer.textContent = ""; // Vide le texte
    typeWriter(); // Démarre l'écriture
  });

  // Rétablit l'état initial à la fin de l'animation
  animation.addEventListener('complete', () => {
    image.style.opacity = '1'; // Rétablit l'opacité d'origine
  });
}

// Démarrage automatique de l'écriture au chargement
setTimeout(typeWriter, 1000); // Commence après 1s
