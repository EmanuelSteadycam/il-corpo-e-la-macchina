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
            
            // Calcola progresso scroll nella sezione 4
            const sectionFourHeight = sectionFour.offsetHeight;
            const scrollProgress = Math.max(0, Math.min(1, -sectionFourTop / sectionFourHeight));
            
            // Color reveal: verde 0-50%, arancione 50-100%
            if (scrollProgress > 0) {
                backgroundFourGreen.classList.add('visible');
                
                // Verde si rivela da 0% a 50% scroll
                const greenProgress = Math.min(1, scrollProgress * 2); // 0-0.5 → 0-1
                const greenReveal = greenProgress * 100;
                backgroundFourGreen.style.clipPath = `inset(0 ${100 - greenReveal}% 0 0)`;
                
                // Arancione si rivela da 50% a 100% scroll
                if (scrollProgress > 0.5) {
                    backgroundFourOrange.classList.add('visible');
                    const orangeProgress = (scrollProgress - 0.5) * 2; // 0.5-1 → 0-1
                    const orangeReveal = orangeProgress * 100;
                    backgroundFourOrange.style.clipPath = `inset(0 ${100 - orangeReveal}% 0 0)`;
                } else {
                    backgroundFourOrange.classList.remove('visible');
                }
            } else {
                backgroundFourGreen.classList.remove('visible');
                backgroundFourOrange.classList.remove('visible');
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
