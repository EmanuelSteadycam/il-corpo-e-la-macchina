// Animazioni automatiche
(function() {
    'use strict';
    
    const presentaLayer = document.getElementById('presentaLayer');
    const titleGroup = document.getElementById('titleGroup');
    
    // Elementi backgrounds
    const backgroundFixed = document.querySelector('.background-fixed');
    const overlayGradient = document.querySelector('.overlay-gradient');
    const backgroundThree = document.querySelector('.background-three');
    const asphaltButtons = document.querySelector('.asphalt-buttons');
    const backgroundFour = document.querySelector('.background-four');
    const backgroundFourGreen = document.querySelector('.background-four-green');
    const backgroundFourOrange = document.querySelector('.background-four-orange');
    const sectionThree = document.querySelector('.section-three');
    const sectionFour = document.querySelector('.section-four');
    
    // Animazioni automatiche dopo 1 secondo
    setTimeout(function() {
        presentaLayer.classList.add('visible');
        titleGroup.classList.add('visible');
        console.log('✓ Presenta e Titolo apparsi automaticamente');
    }, 1000);
    
    // Switch tra background in base allo scroll
    function updateBackgrounds() {
        if (!sectionThree || !sectionFour) return;
        
        const sectionThreeTop = sectionThree.getBoundingClientRect().top;
        const sectionFourTop = sectionFour.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Determina quale background mostrare
        if (sectionFourTop < windowHeight) {
            // Sezione 4 visibile → mostra landing03 + color reveal
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFour.classList.add('visible');
            backgroundFourGreen.classList.add('visible');
            backgroundFourOrange.classList.add('visible');
            
            // Calcola progresso scroll nella sezione 4
            const sectionFourRect = sectionFour.getBoundingClientRect();
            const sectionFourHeight = sectionFour.offsetHeight;
            const scrolled = windowHeight - sectionFourRect.top;
            const scrollProgress = Math.max(0, Math.min(1, scrolled / sectionFourHeight));
            
            console.log('Scroll progress:', scrollProgress.toFixed(2));
            
            // STEP-BASED transitions:
            // 0-33%: Azzurra
            // 33-66%: Verde (completa)
            // 66-100%: Arancione (completa)
            
            if (scrollProgress < 0.33) {
                // Azzurra - nascondi verde e arancione
                backgroundFourGreen.style.clipPath = `inset(0 100% 0 0)`;
                backgroundFourOrange.style.clipPath = `inset(0 100% 0 0)`;
                console.log('Color: BLUE');
            } else if (scrollProgress < 0.66) {
                // Verde completa - mostra tutta verde
                backgroundFourGreen.style.clipPath = `inset(0 0% 0 0)`;
                backgroundFourOrange.style.clipPath = `inset(0 100% 0 0)`;
                console.log('Color: GREEN');
            } else {
                // Arancione completa - mostra tutta arancione
                backgroundFourGreen.style.clipPath = `inset(0 0% 0 0)`;
                backgroundFourOrange.style.clipPath = `inset(0 0% 0 0)`;
                console.log('Color: ORANGE');
            }
        } else if (sectionThreeTop < windowHeight) {
            // Sezione 3 visibile → mostra landing02 + bottoni
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.add('visible');
            if (asphaltButtons) asphaltButtons.classList.add('visible');
            backgroundFour.classList.remove('visible');
            backgroundFourGreen.classList.remove('visible');
            backgroundFourOrange.classList.remove('visible');
        } else {
            // Sezione 1 visibile → mostra landing01
            backgroundFixed.classList.remove('hidden');
            overlayGradient.classList.remove('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFour.classList.remove('visible');
            backgroundFourGreen.classList.remove('visible');
            backgroundFourOrange.classList.remove('visible');
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
