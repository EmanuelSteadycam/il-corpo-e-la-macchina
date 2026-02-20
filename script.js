// Animazioni automatiche
(function() {
    'use strict';
    
    const presentaLayer = document.getElementById('presentaLayer');
    const titleGroup = document.getElementById('titleGroup');
    
    // Elementi backgrounds
    const backgroundFixed = document.querySelector('.background-fixed');
    const overlayGradient = document.querySelector('.overlay-gradient');
    const backgroundThree = document.querySelector('.background-three');
    const overlayThree = document.querySelector('.overlay-three');
    const sectionThree = document.querySelector('.section-three');
    
    // Animazioni automatiche dopo 1 secondo
    setTimeout(function() {
        presentaLayer.classList.add('visible');
        titleGroup.classList.add('visible');
        console.log('✓ Presenta e Titolo apparsi automaticamente');
    }, 1000);
    
    // Switch tra background in base allo scroll
    function updateBackgrounds() {
        if (!sectionThree) return;
        
        const sectionThreeTop = sectionThree.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Se sezione 3 sta per apparire (appena entra nello schermo)
        if (sectionThreeTop < windowHeight) {
            // Nascondi landing01, mostra landing02
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.add('visible');
            overlayThree.classList.add('visible');
        } else {
            // Mostra landing01, nascondi landing02
            backgroundFixed.classList.remove('hidden');
            overlayGradient.classList.remove('hidden');
            backgroundThree.classList.remove('visible');
            overlayThree.classList.remove('visible');
        }
    }
    
    // Esegui durante lo scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateBackgrounds();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Esegui all'avvio
    updateBackgrounds();
    
    console.log('✓ Animazioni automatiche attive');
    console.log('Sequenza: Dopo 1s → Presenta + Titolo + Sottotitolo appaiono');
    console.log('✓ Background switching attivo');
})();
