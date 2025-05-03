const RenJSConfig =  {
  'name': 'The Ethians Redeemed',
  'w': 800,
  'h': 600,
  'renderer': Phaser.AUTO,
  'scaleMode': Phaser.ScaleManager.SHOW_ALL,
  'loadingScreen': {
    'background': 'assets/gui/loaderloaderbackground.png',
    'loadingBar': {
      'asset': 'assets/gui/loaderloading-bar.png',
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
  'fonts': 'assets/gui/fonts.css',
  'guiConfig': 'story/GUI.yaml',
  'storyConfig': 'story/Config.yaml',
  'storySetup': 'story/Setup.yaml',
  'storyText': [
    'story/Story.yaml'
  ],
  'logChoices': true,
  'parent': 'game-wrapper'
}

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
