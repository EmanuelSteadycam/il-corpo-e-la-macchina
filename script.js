// Animazioni scroll per testi
(function() {
    'use strict';
    
    const presentaLayer = document.getElementById('presentaLayer');
    const cardsContainer = document.getElementById('cardsContainer');
    
    // Thresholds di scroll in pixel
    const triggers = {
        presenta: 50,   // "PRESENTA" appare al primo scroll
        cards: 300      // Schede appaiono dopo un po' di scroll
    };
    
    function updateAnimations() {
        const scrollY = window.pageYOffset;
        
        // PRESENTA - Scende dall'alto
        if (scrollY >= triggers.presenta) {
            if (!presentaLayer.classList.contains('visible')) {
                presentaLayer.classList.add('visible');
                console.log('✓ Presenta apparso');
            }
        } else {
            if (presentaLayer.classList.contains('visible')) {
                presentaLayer.classList.remove('visible');
                console.log('✗ Presenta scomparso');
            }
        }
        
        // SCHEDE - Entrano da sinistra
        if (scrollY >= triggers.cards) {
            if (!cardsContainer.classList.contains('visible')) {
                cardsContainer.classList.add('visible');
                console.log('✓ Schede apparse');
            }
        } else {
            if (cardsContainer.classList.contains('visible')) {
                cardsContainer.classList.remove('visible');
                console.log('✗ Schede scomparse');
            }
        }
    }
    
    // Esegui all'avvio
    updateAnimations();
    
    // Esegui durante lo scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateAnimations();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    console.log('✓ Animazioni scroll attive');
    console.log('Sequenza: Presenta (50px) → Schede (300px)');
})();
