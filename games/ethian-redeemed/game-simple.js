// Jeu The Ethians Redeemed - Chapitre 1
class SimpleGame {
  constructor() {
    this.game = null;
    this.currentDialogIndex = 0;
    this.dialogueActive = false;
    this.characters = {};
    this.backgrounds = {};
    this.tutorialActive = false;
    this.tutorialStep = 0;
    
    // Chapitre 1 - Introduction et tutoriel
    this.dialogData = [
      // Intro du portfolio
      { character: "narrator", text: "THE ETHIANS REDEEMED", background: "title", style: "title" },
      { character: "narrator", text: "Un portfolio interactif de Putri Zahara", background: "title" },
      { character: "narrator", text: "Concept Artist & Game Designer", background: "title" },
      
      // Introduction du monde
      { character: "narrator", text: "Chapitre 1: Le début d'une rébellion", background: "capital" },
      { character: "narrator", text: "Dans un monde ravagé par la tyrannie, un homme se lève pour défier l'Empire Yirie.", background: "capital" },
      
      // Village d'Ethia - Introduction de Demetrius
      { character: "narrator", text: "Village d'Ethia - Avant l'invasion", background: "village" },
      { character: "demetrius", text: "Quelle belle journée pour la récolte. Notre village est vraiment béni cette année.", position: "left" },
      { character: "narrator", text: "Demetrius était un simple fermier, menant une vie paisible avec sa famille dans le village d'Ethia." },
      
      // Arrivée des gardes impériaux
      { character: "imperial_guard", text: "Attention villageois ! Par ordre de l'Empereur Adès, ce village est maintenant sous le contrôle de l'Empire Yirie !", position: "right" },
      { character: "demetrius", text: "Que se passe-t-il ? Pourquoi envahissez-vous notre village ?", position: "left" },
      
      // Introduction du commandant Milo
      { character: "milo", text: "Vos terres sont désormais la propriété de l'Empire. Toute résistance sera sévèrement punie.", position: "right" },
      { character: "narrator", text: "Le Commandant Milo, bras droit de l'Empereur, dirigeait l'invasion avec une cruauté implacable." },
      
      // Tutoriel de combat
      { character: "narrator", text: "TUTORIEL: Cliquez sur les options pour défendre votre village", isTutorial: true },
      { character: "demetrius", text: "Je dois protéger ma famille !", position: "left", 
        choices: ["Combattre les gardes", "Tenter de négocier"] },
      
      // Résultat du choix
      { character: "narrator", text: "Malgré votre bravoure, les forces impériales sont trop nombreuses..." },
      { character: "milo", text: "Emmenez ce rebelle au camp de travail. L'Empereur décidera de son sort.", position: "right" },
      
      // Camp de travail
      { character: "narrator", text: "Quelques jours plus tard... Camp de travail impérial", background: "camp" },
      { character: "demetrius", text: "Je dois trouver un moyen de m'échapper...", position: "left" },
      
      // Rencontre avec Haikal
      { character: "haikal", text: "Toi aussi, tu as osé défier l'Empire ? Je m'appelle Haikal.", position: "right" },
      { character: "demetrius", text: "Je suis Demetrius. Ils ont détruit mon village et tué ma famille.", position: "left" },
      { character: "haikal", text: "J'étais le prince héritier du Royaume d'Ether avant que l'Empereur ne s'en empare.", position: "right" },
      
      // Début de la rébellion
      { character: "haikal", text: "J'ai un plan pour nous échapper. Veux-tu te joindre à notre rébellion ?", position: "right", 
        choices: ["Accepter et rejoindre la rébellion", "Demander plus d'informations"] },
        
      // Epilogue du chapitre 1
      { character: "narrator", text: "Ainsi débute l'histoire de Demetrius, de simple fermier à leader de la rébellion.", background: "base_camp" },
      { character: "narrator", text: "Son voyage pour libérer les Ethians ne fait que commencer...", background: "base_camp" },
      
      // Présentation du portfolio
      { character: "narrator", text: "Merci d'avoir découvert ce chapitre du portfolio interactif de Putri Zahara.", background: "title" },
      { character: "narrator", text: "Découvrez d'autres œuvres en explorant les sections du portfolio.", background: "title",
        choices: ["Voir les concept arts", "Retourner au portfolio"] }
    ];
  }

  preload() {
    // Charger les images d'arrière-plan depuis les ressources disponibles
    this.game.load.image('camp', '/images/environement/camp_du_travail_keyframe.jpg');
    this.game.load.image('capital', '/images/environement/gate_capital_yirie.png');
    this.game.load.image('base_camp', '/images/environement/key_frame_base_camp.jpg');
    this.game.load.image('title', '/images/title/background.png');
    this.game.load.image('village', '/images/title/background.png'); // Utiliser l'image de titre comme village par défaut
    
    // Charger les images des personnages
    this.game.load.image('demetrius', '/images/characters/Demetrius_concept_art_new.png');
    this.game.load.image('haikal', '/images/characters/haikal_personnage_alone.png');
    this.game.load.image('milo', '/images/characters/commandant_milo.png');
    this.game.load.image('hades', '/images/characters/emepror_hades.png');
    this.game.load.image('ellis', '/images/characters/ellis_queen.png');
    this.game.load.image('imperial_guard', '/images/characters/imperial_guard.png');
    
    // Créer les éléments d'interface
    this.createUIElements();
    
    // Écran de chargement
    const loadingText = this.game.add.text(
      this.game.width / 2, 
      this.game.height / 2, 
      'Chargement...', 
      { font: '24px Arial', fill: '#10b981' }
    );
    loadingText.anchor.setTo(0.5, 0.5);
    
    // Barre de progression
    const progressBar = this.game.add.graphics(0, 0);
    progressBar.beginFill(0x10b981, 1);
    progressBar.drawRect(this.game.width / 2 - 150, this.game.height / 2 + 30, 300, 10);
    progressBar.endFill();
    progressBar.scale.x = 0;
    
    this.game.load.onFileComplete.add((progress) => {
      progressBar.scale.x = progress / 100;
      loadingText.setText(`Chargement... ${progress}%`);
    });
  }
  
  // Créer les éléments d'interface utilisateur
  createUIElements() {
    // Créer une boîte de dialogue arrondie
    const dialogBoxBmd = this.game.add.bitmapData(700, 150);
    dialogBoxBmd.ctx.fillStyle = 'rgba(31, 41, 55, 0.9)';
    this.roundRect(dialogBoxBmd.ctx, 0, 0, 700, 150, 20, true, false);
    
    dialogBoxBmd.ctx.strokeStyle = '#10b981';
    dialogBoxBmd.ctx.lineWidth = 3;
    this.roundRect(dialogBoxBmd.ctx, 0, 0, 700, 150, 20, false, true);
    
    this.game.cache.addBitmapData('dialog_box', dialogBoxBmd);
    this.game.load.image('dialog_box', this.game.cache.getBitmapData('dialog_box'));
    
    // Créer un bouton de choix arrondi
    const choiceBmd = this.game.add.bitmapData(500, 50);
    choiceBmd.ctx.fillStyle = 'rgba(31, 41, 55, 0.8)';
    this.roundRect(choiceBmd.ctx, 0, 0, 500, 50, 25, true, false);
    
    choiceBmd.ctx.strokeStyle = '#10b981';
    choiceBmd.ctx.lineWidth = 2;
    this.roundRect(choiceBmd.ctx, 0, 0, 500, 50, 25, false, true);
    
    this.game.cache.addBitmapData('dialog_choice', choiceBmd);
    this.game.load.image('dialog_choice', this.game.cache.getBitmapData('dialog_choice'));
  }
  
  // Fonction utilitaire pour dessiner un rectangle arrondi
  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    
    if (fill) {
      ctx.fill();
    }
    
    if (stroke) {
      ctx.stroke();
    }
  }

  create() {
    // Initialiser les arrière-plans
    this.backgrounds.title = this.game.add.sprite(0, 0, 'title');
    this.backgrounds.title.width = this.game.width;
    this.backgrounds.title.height = this.game.height;
    this.backgrounds.title.visible = false;
    
    this.backgrounds.camp = this.game.add.sprite(0, 0, 'camp');
    this.backgrounds.camp.width = this.game.width;
    this.backgrounds.camp.height = this.game.height;
    this.backgrounds.camp.visible = false;
    
    this.backgrounds.capital = this.game.add.sprite(0, 0, 'capital');
    this.backgrounds.capital.width = this.game.width;
    this.backgrounds.capital.height = this.game.height;
    this.backgrounds.capital.visible = false;
    
    this.backgrounds.base_camp = this.game.add.sprite(0, 0, 'base_camp');
    this.backgrounds.base_camp.width = this.game.width;
    this.backgrounds.base_camp.height = this.game.height;
    this.backgrounds.base_camp.visible = false;
    
    this.backgrounds.village = this.game.add.sprite(0, 0, 'village');
    this.backgrounds.village.width = this.game.width;
    this.backgrounds.village.height = this.game.height;
    this.backgrounds.village.visible = false;
    
    // Personnages
    this.characters.demetrius = this.game.add.sprite(this.game.width / 4, this.game.height - 420, 'demetrius');
    this.characters.demetrius.anchor.setTo(0.5, 0);
    this.characters.demetrius.scale.setTo(0.65);
    this.characters.demetrius.visible = false;
    
    this.characters.haikal = this.game.add.sprite(this.game.width * 3/4, this.game.height - 420, 'haikal');
    this.characters.haikal.anchor.setTo(0.5, 0);
    this.characters.haikal.scale.setTo(0.65);
    this.characters.haikal.visible = false;
    
    this.characters.milo = this.game.add.sprite(this.game.width * 3/4, this.game.height - 450, 'milo');
    this.characters.milo.anchor.setTo(0.5, 0);
    this.characters.milo.scale.setTo(0.65);
    this.characters.milo.visible = false;
    
    this.characters.hades = this.game.add.sprite(this.game.width * 3/4, this.game.height - 450, 'hades');
    this.characters.hades.anchor.setTo(0.5, 0);
    this.characters.hades.scale.setTo(0.65);
    this.characters.hades.visible = false;
    
    this.characters.ellis = this.game.add.sprite(this.game.width * 3/4, this.game.height - 450, 'ellis');
    this.characters.ellis.anchor.setTo(0.5, 0);
    this.characters.ellis.scale.setTo(0.65);
    this.characters.ellis.visible = false;
    
    this.characters.imperial_guard = this.game.add.sprite(this.game.width * 3/4, this.game.height - 420, 'imperial_guard');
    this.characters.imperial_guard.anchor.setTo(0.5, 0);
    this.characters.imperial_guard.scale.setTo(0.65);
    this.characters.imperial_guard.visible = false;
    
    // Interface dialogue
    this.dialogBox = this.game.add.sprite(this.game.width / 2, this.game.height - 120, 'dialog_box');
    this.dialogBox.anchor.setTo(0.5, 0);
    this.dialogBox.width = this.game.width * 0.9;
    this.dialogBox.height = 150;
    this.dialogBox.visible = false;
    
    // Texte
    this.speakerText = this.game.add.text(this.game.width / 2 - this.dialogBox.width / 2 + 30, this.game.height - 110, '', { 
      font: 'bold 20px Arial', 
      fill: '#10b981',
      stroke: '#000',
      strokeThickness: 2
    });
    
    this.dialogText = this.game.add.text(this.game.width / 2 - this.dialogBox.width / 2 + 30, this.game.height - 80, '', { 
      font: '18px Arial', 
      fill: '#ffffff',
      wordWrap: true,
      wordWrapWidth: this.dialogBox.width - 60
    });
    
    // Texte du tutoriel
    this.tutorialText = this.game.add.text(this.game.width / 2, 50, '', { 
      font: 'bold 18px Arial', 
      fill: '#10b981',
      stroke: '#000',
      strokeThickness: 3,
      align: 'center'
    });
    this.tutorialText.anchor.setTo(0.5, 0);
    this.tutorialText.visible = false;
    
    // Texte en gros titre
    this.titleText = this.game.add.text(this.game.width / 2, this.game.height / 3, '', { 
      font: 'bold 48px Arial', 
      fill: '#ffffff',
      stroke: '#10b981',
      strokeThickness: 6,
      align: 'center'
    });
    this.titleText.anchor.setTo(0.5, 0.5);
    this.titleText.visible = false;
    
    this.speakerText.visible = false;
    this.dialogText.visible = false;
    
    // Choix
    this.choiceGroup = this.game.add.group();
    
    // Commencer le dialogue
    this.startDialog();
    
    // Ajouter écouteur d'événements pour continuer le dialogue
    this.game.input.onDown.add(this.handleClick, this);
    
    // Signaler que le jeu est prêt
    if (window.parent) {
      window.parent.postMessage('game:ready', '*');
    }
  }
  
  showCharacter(name, position = 'center') {
    // Masquer tous les personnages
    Object.values(this.characters).forEach(character => {
      character.visible = false;
    });
    
    // Montrer uniquement le personnage demandé
    if (name !== 'narrator' && this.characters[name]) {
      this.characters[name].visible = true;
      
      // Positionner le personnage
      if (position === 'left') {
        this.characters[name].x = this.game.width / 4;
      } else if (position === 'right') {
        this.characters[name].x = this.game.width * 3/4;
      } else {
        this.characters[name].x = this.game.width / 2;
      }
    }
  }
  
  showBackground(name) {
    // Masquer tous les arrière-plans
    Object.values(this.backgrounds).forEach(bg => {
      bg.visible = false;
    });
    
    // Montrer uniquement l'arrière-plan demandé
    if (this.backgrounds[name]) {
      this.backgrounds[name].visible = true;
    }
  }

  startDialog() {
    this.dialogueActive = true;
    this.currentDialogIndex = 0;
    this.showDialog();
  }
  
  showDialog() {
    if (this.currentDialogIndex >= this.dialogData.length) {
      this.endDialog();
      return;
    }
    
    const currentDialog = this.dialogData[this.currentDialogIndex];
    
    // Changer de scène si spécifié
    if (currentDialog.background) {
      this.showBackground(currentDialog.background);
    }
    
    // Afficher le personnage si ce n'est pas un narrateur
    this.showCharacter(currentDialog.character, currentDialog.position);
    
    // Afficher différemment selon le style (titre ou normal)
    if (currentDialog.style === 'title') {
      // Afficher en tant que titre
      this.titleText.visible = true;
      this.titleText.text = currentDialog.text;
      this.dialogBox.visible = false;
      this.speakerText.visible = false;
      this.dialogText.visible = false;
    } else {
      // Afficher en tant que dialogue normal
      this.titleText.visible = false;
      this.dialogBox.visible = true;
      this.speakerText.visible = true;
      this.dialogText.visible = true;
      
      // Mettre à jour le texte
      if (currentDialog.character === 'narrator') {
        this.speakerText.text = '';
        this.dialogText.y = this.game.height - 85; // Centrer le texte si pas de locuteur
      } else {
        const characterName = currentDialog.character.charAt(0).toUpperCase() + currentDialog.character.slice(1);
        this.speakerText.text = characterName;
        this.dialogText.y = this.game.height - 80;
      }
      this.dialogText.text = currentDialog.text;
    }
    
    // Afficher un tutoriel si nécessaire
    if (currentDialog.isTutorial) {
      this.tutorialText.visible = true;
      this.tutorialText.text = currentDialog.text;
      this.tutorialActive = true;
    } else {
      this.tutorialText.visible = false;
      this.tutorialActive = false;
    }
    
    // Gérer les choix
    if (currentDialog.choices) {
      this.showChoices(currentDialog.choices);
    } else {
      this.choiceGroup.removeAll();
    }
  }
  
  showChoices(choices) {
    this.choiceGroup.removeAll();
    
    choices.forEach((choice, index) => {
      const y = this.game.height / 2 + index * 60 - (choices.length - 1) * 30;
      
      // Fond du choix avec coins arrondis
      const choiceBg = this.game.add.sprite(this.game.width / 2, y, 'dialog_choice');
      choiceBg.anchor.setTo(0.5, 0.5);
      choiceBg.width = this.game.width * 0.7;
      choiceBg.height = 50;
      
      // Ajouter un effet de survol
      choiceBg.inputEnabled = true;
      choiceBg.events.onInputOver.add(() => {
        choiceBg.tint = 0x10b981;
        
        // Ajouter effet de glow (néon)
        const glow = this.game.add.graphics(0, 0);
        glow.beginFill(0x10b981, 0.2);
        glow.drawRoundedRect(choiceBg.x - choiceBg.width/2 - 5, choiceBg.y - choiceBg.height/2 - 5, 
                      choiceBg.width + 10, choiceBg.height + 10, 25);
        glow.endFill();
        
        // Ajouter au groupe de choix
        this.choiceGroup.add(glow);
        // Mettre le glow en arrière du bouton
        this.choiceGroup.sendToBack(glow);
        // Sauvegarder référence au glow
        choiceBg.glowEffect = glow;
      }, this);
      
      choiceBg.events.onInputOut.add(() => {
        choiceBg.tint = 0xffffff;
        // Supprimer l'effet de glow
        if (choiceBg.glowEffect) {
          choiceBg.glowEffect.destroy();
          choiceBg.glowEffect = null;
        }
      }, this);
      
      // Ajouter le texte du choix
      const choiceText = this.game.add.text(this.game.width / 2, y, choice, { 
        font: '16px Arial', 
        fill: '#ffffff',
        align: 'center'
      });
      choiceText.anchor.setTo(0.5, 0.5);
      
      // Cliquer sur le choix
      choiceBg.events.onInputDown.add(() => {
        this.handleChoice(index, choice);
      }, this);
      
      this.choiceGroup.add(choiceBg);
      this.choiceGroup.add(choiceText);
    });
  }
  
  handleChoice(index, choiceText) {
    // Traiter le choix en fonction du contexte
    this.choiceGroup.removeAll();
    
    // Actions spéciales pour certains choix
    if (choiceText === "Voir les concept arts") {
      // Rediriger vers la page de concept art
      if (window.parent) {
        window.parent.location.href = "/portfolio/ethian-redem/";
      }
      return;
    } else if (choiceText === "Retourner au portfolio") {
      // Rediriger vers la page d'accueil
      if (window.parent) {
        window.parent.location.href = "/";
      }
      return;
    }
    
    // Pour tous les autres choix, continuer l'histoire
    this.currentDialogIndex++;
    this.showDialog();
  }
  
  handleClick() {
    if (!this.dialogueActive) return;
    
    // S'il y a des choix affichés, ne pas avancer automatiquement
    if (this.choiceGroup.length > 0) return;
    
    this.currentDialogIndex++;
    this.showDialog();
  }
  
  endDialog() {
    this.dialogueActive = false;
    this.dialogBox.visible = false;
    this.speakerText.visible = false;
    this.dialogText.visible = false;
    this.tutorialText.visible = false;
    this.titleText.visible = false;
    this.choiceGroup.removeAll();
    
    // Afficher l'écran de fin
    this.showBackground('title');
    
    const endText = this.game.add.text(this.game.width / 2, this.game.height / 3, 
      "THE ETHIANS REDEEMED", 
      { 
        font: 'bold 48px Arial', 
        fill: '#ffffff',
        align: 'center',
        stroke: '#10b981',
        strokeThickness: 6
      }
    );
    endText.anchor.setTo(0.5, 0.5);
    
    const subText = this.game.add.text(this.game.width / 2, this.game.height / 3 + 70, 
      "Portfolio interactif de Putri Zahara\nConcept Artist & Game Designer", 
      { 
        font: '24px Arial', 
        fill: '#ffffff',
        align: 'center',
        stroke: '#000',
        strokeThickness: 3
      }
    );
    subText.anchor.setTo(0.5, 0.5);
    
    // Ajouter des boutons pour naviguer
    this.showChoices(["Voir les concept arts", "Retourner au portfolio"]);
    
    // Ajouter un effet de pulsation
    this.game.add.tween(endText.scale)
      .to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
  }
  
  newGame() {
    // Nettoyer les éléments existants
    this.game.world.removeAll();
    
    // Recréer le jeu
    this.create();
    
    // Redémarrer l'histoire
    this.currentDialogIndex = 0;
    this.dialogueActive = true;
    this.showDialog();
  }
}

// Initialiser le jeu quand la page est chargée
function initSimpleGame() {
  // Initialiser l'instance de jeu
  const gameWidth = 800;
  const gameHeight = 600;
  const simpleGame = new SimpleGame();
  
  // Créer le jeu Phaser
  const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game-container', {
    preload: function() {
      simpleGame.game = this;
      simpleGame.preload();
    },
    create: function() {
      simpleGame.create();
    }
  });
  
  // Rendre l'instance accessible
  window.EthiansGame = simpleGame;
}

// Pour s'assurer que Phaser est chargé avant d'initialiser le jeu
if (typeof Phaser !== 'undefined') {
  initSimpleGame();
} else {
  // Si Phaser n'est pas encore chargé, attendre qu'il le soit
  window.addEventListener('phaserLoaded', initSimpleGame);
}
