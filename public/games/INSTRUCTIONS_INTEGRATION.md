# Instructions pour intégrer "The Ethians Redeemed" à votre portfolio

## Étapes pour l'empaquetage web

1. **Ouvrez le lanceur Ren'Py**
   - Lancez Ren'Py SDK sur votre ordinateur
   - Sélectionnez votre projet "The Ethians Redeemed"

2. **Cliquez sur "Build Packages"** dans le menu de droite
   - Une nouvelle fenêtre s'ouvrira avec différentes options de compilation

3. **Sélectionnez "Web"** dans les options
   - Cochez "Build Web Application"
   - Vérifiez que "Web" est sélectionné comme plateforme
   - Cliquez sur "Build"

4. **Patientez pendant la compilation**
   - Ren'Py va compiler votre jeu pour le web en utilisant HTML5/WebGL
   - Les fichiers seront générés dans un dossier "web" à l'intérieur du répertoire de votre projet
   (généralement `C:\Users\Admin\Documents\The_ethians_redeemed\The ethians redeemed\web`)

## Intégration au portfolio

1. **Copiez les fichiers générés**
   - Créez un dossier `public/games/ethians_web` dans votre portfolio
   - Copiez tout le contenu du dossier "web" généré par Ren'Py dans ce dossier

2. **Mettez à jour la page du jeu**
   - Ouvrez `app/game/page.tsx` et modifiez-le pour qu'il affiche le jeu web
   - Utilisez un iframe pour intégrer le jeu ou créez un lien vers `/games/ethians_web/index.html`

3. **Personnalisez l'intégration**
   - Ajoutez un cadre stylisé avec effet néon autour du jeu
   - Utilisez des boutons très arrondis (rounded-xl ou rounded-full) pour les contrôles
   - Conservez votre style visuel cohérent avec le reste du portfolio

## Exemple de code d'intégration

```tsx
// Dans app/game/page.tsx
export default function GamePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">The Ethians Redeemed</h1>
      
      <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]">
        <iframe 
          src="/games/ethians_web/index.html" 
          className="w-full h-[600px]"
          title="The Ethians Redeemed"
          allow="fullscreen"
        ></iframe>
      </div>
      
      <div className="mt-8 bg-gray-800 bg-opacity-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-emerald-500 mb-4">Comment jouer</h2>
        <p className="mb-4">
          Explorez l'univers des Ethians dans ce visual novel interactif. Prenez des décisions qui influenceront 
          le cours de l'histoire et participez à des combats stratégiques pour sauver votre peuple.
        </p>
        <div className="flex justify-center mt-6">
          <a 
            href="/portfolio" 
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(16,185,129,0.6)]"
          >
            Retour au portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
```

## Remarques importantes

- Assurez-vous que votre jeu fonctionne correctement dans le navigateur avant de l'intégrer
- Testez sur différents navigateurs (Chrome, Firefox, Edge)
- Ajustez la taille de l'iframe selon vos besoins
- Gardez les effets néon et éléments arrondis cohérents avec le reste de votre design
