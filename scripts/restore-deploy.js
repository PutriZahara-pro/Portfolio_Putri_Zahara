const ghpages = require('gh-pages');
const path = require('path');
const fs = require('fs');

// Assurez-vous que le dossier out existe
const outDir = path.join(__dirname, '..', 'out');
if (!fs.existsSync(outDir)) {
  console.error('Le dossier out n\'existe pas. Exécutez d\'abord la commande build.');
  process.exit(1);
}

// Créer le fichier .nojekyll pour désactiver le traitement Jekyll
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

// S'assurer que le fichier CNAME existe
fs.writeFileSync(path.join(outDir, 'CNAME'), 'putrizahara.com\n');

// Options de déploiement sécurisées
const options = {
  branch: 'gh-pages',
  message: 'Reconstruction du site: ' + new Date().toISOString(),
  // Ne pas supprimer les fichiers existants
  add: false,
  // Permettre une branche orpheline si nécessaire
  history: true,
  dotfiles: true
};

console.log('Déploiement de secours depuis:', outDir);

// Publier les changements
ghpages.publish(outDir, options, function(err) {
  if (err) {
    console.error('Erreur de déploiement:', err);
    process.exit(1);
  } else {
    console.log('Reconstruction du site réussie! Les changements peuvent prendre quelques minutes à se propager.');
  }
});
