const ghpages = require('gh-pages');
const path = require('path');

// Options de déploiement plus agressives pour forcer la mise à jour
const options = {
  // Ne pas conserver l'historique git
  history: false,
  // Ajouter un timestamp pour éviter le cache
  add: true,
  // Message de commit explicite
  message: 'Deploy with warning banners: ' + new Date().toISOString(),
  // Forcer la mise à jour
  push: true,
  // Supprimer les fichiers locaux après le déploiement
  repo: undefined,
  // Activer le mode silencieux
  silent: false,
  // Ne pas utiliser le cache git pour accélérer le déploiement
  dotfiles: true
};

// Chemin du dossier de build
const distPath = path.join(__dirname, '..', 'out');

console.log('Force deploying from:', distPath);
console.log('Using options:', options);

// Lancer le déploiement
ghpages.publish(distPath, options, function(err) {
  if (err) {
    console.error('Deployment error:', err);
    process.exit(1);
  } else {
    console.log('Successfully deployed! Changes may take a few minutes to propagate.');
  }
});
