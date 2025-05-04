// Fonction pour détecter et configurer le chemin de base des ressources
function getBasePath() {
  // Vérifier si nous sommes sur GitHub Pages ou un domaine personnalisé
  const isGitHubPages = window.location.hostname.includes('github.io');
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  // Retourner le chemin de base approprié
  if (isGitHubPages) {
    return '/Portfolio_Putri_Zahara/games/ethian-redeemed/';
  } else if (!isLocalhost) {
    // Sur le domaine personnalisé
    return '/games/ethian-redeemed/';
  }
  // En local, utiliser un chemin relatif
  return '';
}

// Obtenir le chemin de base pour les ressources
const basePath = getBasePath();

// Fonction pour résoudre le chemin des ressources
function resolvePath(path) {
  // Si c'est déjà une URL absolue, la retourner telle quelle
  if (path.startsWith('http') || path.startsWith('/') || path === '') {
    return path;
  }
  // Sinon, ajouter le chemin de base
  return basePath + path;
}

const RenJSConfig =  {
  'name': 'The Ethians Redeemed',
  'w': 800,
  'h': 600,
  'renderer': Phaser.AUTO,
  'scaleMode': Phaser.ScaleManager.SHOW_ALL,
  'loadingScreen': {
    'background': resolvePath('assets/gui/loaderloaderbackground.png'),
    'loadingBar': {
      'asset': resolvePath('assets/gui/loaderloading-bar.png'),
      'position': {
        'x': 109,
        'y': 458
      },
      'size': {
        'w': 578,
        'h': 82
      }
    }
  },
  'fonts': resolvePath('assets/gui/fonts.css'),
  'guiConfig': resolvePath('story/GUI.yaml'),
  'storyConfig': resolvePath('story/Config.yaml'),
  'storySetup': resolvePath('story/Setup.yaml'),
  'storyText': [
    resolvePath('story/Story.yaml')
  ],
  'logChoices': true,
  'parent': 'game-wrapper'
}

// Étendre le chargeur de Phaser pour gérer le chemin de base
Phaser.Loader.prototype._originalTransformUrl = Phaser.Loader.prototype.transformUrl;
Phaser.Loader.prototype.transformUrl = function(url, defaultType) {
  // Si c'est déjà une URL complète, utilisez directement la fonction d'origine
  if (url && (url.startsWith('http') || url.startsWith('/'))) {
    return this._originalTransformUrl(url, defaultType);
  }
  
  // Sinon, appliquez le chemin de base avant la transformation standard
  if (url && typeof url === 'string') {
    return this._originalTransformUrl(resolvePath(url), defaultType);
  }
  
  // Cas d'erreur - url n'est pas une chaîne
  console.warn('URL invalide passée au chargeur:', url);
  return url; // Retourner l'URL inchangée pour éviter l'erreur
};

const RenJSGame = new RenJS.game(RenJSConfig)
RenJSGame.launch()

// Notifier le parent lorsque le jeu est chargé
if (window.parent) {
  RenJSGame.on('start', function() {
    // Masquer l'overlay de chargement
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
    
    // Informer la page parent que le jeu est prêt
    window.parent.postMessage('game:ready', '*');
  });
  
  // Mettre à jour la barre de progression
  RenJSGame.on('loadprogress', function(progress) {
    const loadingBar = document.getElementById('loading-bar');
    if (loadingBar) {
      loadingBar.style.width = `${progress * 100}%`;
    }
  });
}
