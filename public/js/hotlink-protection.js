/**
 * Protection anti-hotlinking pour les images
 * Empêche les sites externes d'utiliser directement vos images
 */
(function() {
  // Liste des domaines autorisés
  const allowedDomains = [
    'putrizahara.com',
    'www.putrizahara.com',
    'putrizahara-pro.github.io',
    'localhost',
    '127.0.0.1'
  ];
  
  // Vérifier si nous sommes sur un domaine autorisé
  function isAllowedDomain() {
    const currentHost = window.location.hostname;
    return allowedDomains.some(domain => 
      currentHost === domain || currentHost.endsWith('.' + domain)
    );
  }
  
  // Remplacer les images hotlinkées
  function protectImages() {
    if (!isAllowedDomain()) {
      // Si on est sur un domaine non autorisé
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const originalSrc = img.getAttribute('src');
        if (originalSrc) {
          // Sauvegarder l'URL originale pour une référence potentielle
          img.setAttribute('data-original-src', originalSrc);
          
          // Remplacer par une image d'erreur ou un message
          img.setAttribute('src', 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22300%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23111827%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22150%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2220%22%20fill%3D%22%23ffffff%22%3EImage%20protégée%20de%20Putri%20Zahara%3C%2Ftext%3E%3Ctext%20x%3D%22200%22%20y%3D%22180%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2216%22%20fill%3D%22%2310b981%22%3Eputrizahara.com%3C%2Ftext%3E%3C%2Fsvg%3E');
          
          // Désactiver les interactions
          img.style.pointerEvents = 'none';
          img.setAttribute('alt', 'Image protégée - Putri Zahara');
          
          // Empêcher le glisser-déposer
          img.setAttribute('draggable', 'false');
        }
      });
      
      // Ajouter un filigrane sur la page
      const watermark = document.createElement('div');
      watermark.innerHTML = 'Contenu protégé<br>putrizahara.com';
      watermark.style.position = 'fixed';
      watermark.style.top = '0';
      watermark.style.left = '0';
      watermark.style.width = '100%';
      watermark.style.height = '100%';
      watermark.style.display = 'flex';
      watermark.style.justifyContent = 'center';
      watermark.style.alignItems = 'center';
      watermark.style.color = 'rgba(255, 255, 255, 0.15)';
      watermark.style.fontSize = '4vw';
      watermark.style.fontWeight = 'bold';
      watermark.style.textAlign = 'center';
      watermark.style.pointerEvents = 'none';
      watermark.style.zIndex = '1000';
      watermark.style.transform = 'rotate(-45deg)';
      document.body.appendChild(watermark);
    }
  }
  
  // Utiliser MutationObserver pour surveiller les nouveaux éléments ajoutés
  function observeNewImages() {
    if (!isAllowedDomain()) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            const images = document.querySelectorAll('img:not([data-protected="true"])');
            images.forEach(img => {
              img.setAttribute('data-protected', 'true');
              const originalSrc = img.getAttribute('src');
              if (originalSrc) {
                img.setAttribute('data-original-src', originalSrc);
                img.setAttribute('src', 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22300%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23111827%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22150%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2220%22%20fill%3D%22%23ffffff%22%3EImage%20protégée%20de%20Putri%20Zahara%3C%2Ftext%3E%3Ctext%20x%3D%22200%22%20y%3D%22180%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2216%22%20fill%3D%22%2310b981%22%3Eputrizahara.com%3C%2Ftext%3E%3C%2Fsvg%3E');
                img.style.pointerEvents = 'none';
                img.setAttribute('draggable', 'false');
              }
            });
          }
        });
      });
      
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
    }
  }
  
  // Exécuter la protection lorsque la page est chargée
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    protectImages();
    observeNewImages();
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      protectImages();
      observeNewImages();
    });
  }
})();
