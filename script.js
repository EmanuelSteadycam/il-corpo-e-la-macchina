// Animazioni scroll sequenziali: Testo → Uomo → Auto
(function() {
    'use strict';
    
    const presentaLayer = document.getElementById('presentaLayer');
    const textLayer = document.getElementById('textLayer');
    const manLayer = document.getElementById('manLayer');
    const carLayer = document.getElementById('carLayer');
    
    // Thresholds di scroll in pixel fissi (più precisi per animazioni bidirezionali)
    const triggers = {
        presenta: 50,  // "PRESENTA" appare al primo scroll
        man: 50,       // Uomo entra INSIEME a presenta (era 400px)
        car: 800       // Auto scende a 800px
    };
    
    function updateAnimations() {
        const scrollY = window.pageYOffset;
        
        // 1. PRESENTA - Appare/scompare dall'alto
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
        
        // 2. UOMO - Entra/esce
        if (scrollY >= triggers.man) {
            if (!manLayer.classList.contains('visible')) {
                manLayer.classList.add('visible');
                console.log('✓ Uomo entrato');
            }
        } else {
            if (manLayer.classList.contains('visible')) {
                manLayer.classList.remove('visible');
                console.log('✗ Uomo uscito');
            }
        }
        
        // 3. AUTO - Scende/sale
        if (scrollY >= triggers.car) {
            if (!carLayer.classList.contains('visible')) {
                carLayer.classList.add('visible');
                console.log('✓ Auto scesa');
            }
        } else {
            if (carLayer.classList.contains('visible')) {
                carLayer.classList.remove('visible');
                console.log('✗ Auto risalita');
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
    
    console.log('✓ Animazioni sequenziali attive');
    console.log('Sequenza: Presenta → Uomo → Auto');
    
})();