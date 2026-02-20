// Animazioni scroll
(function() {
    'use strict';
    
    // Scroll automatico di 1px all'apertura per nascondere barra browser
    window.addEventListener('load', function() {
        setTimeout(function() {
            window.scrollTo(0, 1);
            console.log('✓ Scroll automatico eseguito (1px) - barra browser nascosta');
        }, 100);
    });
    
    const presentaLayer = document.getElementById('presentaLayer');
    const titleGroup = document.getElementById('titleGroup');
    
    // Trigger thresholds
    const triggers = {
        presenta: 0,      // Subito visibile (appena la pagina si carica)
        title: 10         // Appare scrollando solo 10px
    };
    
    function updateAnimations() {
        const scrollY = window.pageYOffset;
        
        // PRESENTA - Appare subito dalla sinistra
        if (scrollY >= triggers.presenta) {
            if (!presentaLayer.classList.contains('visible')) {
                presentaLayer.classList.add('visible');
                console.log('✓ Presenta apparso');
            }
        }
        
        // TITOLO + SOTTOTITOLO - Appaiono a 10px scroll
        if (scrollY >= triggers.title) {
            if (!titleGroup.classList.contains('visible')) {
                titleGroup.classList.add('visible');
                console.log('✓ Titolo + sottotitolo apparsi');
            }
        } else {
            if (titleGroup.classList.contains('visible')) {
                titleGroup.classList.remove('visible');
                console.log('✗ Titolo + sottotitolo scomparsi');
            }
        }
    }
    
    // Esegui all'avvio
    updateAnimations();
    
    // Esegui durante lo scroll con requestAnimationFrame
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
    console.log('Sequenza: Presenta (subito) → Titolo (10px)');
})();
