// Animazioni scroll sequenziali: Testo → Uomo → Auto
(function() {
    'use strict';
    
    const textLayer = document.getElementById('textLayer');
    const manLayer = document.getElementById('manLayer');
    const carLayer = document.getElementById('carLayer');
    
    // Thresholds di scroll per ogni animazione (in percentuale dello scroll totale)
    const triggers = {
        text: 0.05,  // Testo appare subito (5% scroll)
        man: 0.25,   // Uomo entra dopo (25% scroll)
        car: 0.50    // Auto scende per ultima (50% scroll)
    };
    
    function updateAnimations() {
        const scrollY = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollY / maxScroll;
        
        // 1. TESTO - Appare/scompare
        if (scrollPercent >= triggers.text) {
            if (!textLayer.classList.contains('visible')) {
                textLayer.classList.add('visible');
                console.log('✓ Testo apparso');
            }
        } else {
            if (textLayer.classList.contains('visible')) {
                textLayer.classList.remove('visible');
                console.log('✗ Testo scomparso');
            }
        }
        
        // 2. UOMO - Entra/esce
        if (scrollPercent >= triggers.man) {
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
        if (scrollPercent >= triggers.car) {
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
    console.log('Sequenza: Testo → Uomo → Auto');
    
})();