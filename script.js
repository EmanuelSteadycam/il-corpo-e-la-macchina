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
    const backgroundFive = document.querySelector('.background-five');
    const backgroundFiveGreen = document.querySelector('.background-five-green');
    const backgroundFiveOrange = document.querySelector('.background-five-orange');
    const sectionThree = document.querySelector('.section-three');
    const sectionFourTransition = document.querySelector('.section-four-transition');
    const sectionFive = document.querySelector('.section-five');
    
    // Elementi per animazioni entrata
    const eventType = document.querySelector('.event-type');
    const eventCards = document.querySelectorAll('.event-card-timeline');
    const btnSubscribe = document.querySelector('.btn-subscribe-single');
    
    // Animazioni automatiche dopo 1 secondo
    setTimeout(function() {
        presentaLayer.classList.add('visible');
        titleGroup.classList.add('visible');
        console.log('✓ Presenta e Titolo apparsi automaticamente');
    }, 1000);
    
    // Switch tra background in base allo scroll
    function updateBackgrounds() {
        if (!sectionThree || !sectionFourTransition || !sectionFive) return;
        
        const sectionThreeTop = sectionThree.getBoundingClientRect().top;
        const sectionFourTop = sectionFourTransition.getBoundingClientRect().top;
        const sectionFiveTop = sectionFive.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Determina quale background mostrare
        if (sectionFiveTop < windowHeight) {
            // Sezione 5 visibile → mostra landing03
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.classList.add('visible');
            backgroundFiveGreen.classList.add('visible');
            backgroundFiveOrange.classList.add('visible');
            
            // Calcola progresso scroll nella sezione 5
            const sectionFiveHeight = sectionFive.offsetHeight;
            const scrolled = windowHeight - sectionFiveTop;
            const scrollProgress = Math.max(0, Math.min(1, scrolled / sectionFiveHeight));
            
            // Trigger animazioni eventi in base allo scroll
            // 0% → INCONTRI PUBBLICI
            if (scrollProgress > 0.05 && eventType) {
                eventType.classList.add('show');
            }
            
            // 10% → Scheda 1
            if (scrollProgress > 0.1 && eventCards[0]) {
                eventCards[0].classList.add('show');
            }
            
            // 20% → Scheda 2
            if (scrollProgress > 0.2 && eventCards[1]) {
                eventCards[1].classList.add('show');
            }
            
            // 30% → Scheda 3
            if (scrollProgress > 0.3 && eventCards[2]) {
                eventCards[2].classList.add('show');
            }
            
            // 40% → Bottone
            if (scrollProgress > 0.4 && btnSubscribe) {
                btnSubscribe.classList.add('show');
            }
            
            console.log('Scroll progress:', (scrollProgress * 100).toFixed(0) + '%');
            
            // Calcola progresso scroll nella sezione 5
            const sectionFiveHeight = sectionFive.offsetHeight;
            
            // Lo scroll progress parte da 0 quando sez 5 entra nello schermo
            // e arriva a 1 quando sez 5 esce dallo schermo
            const scrolled = windowHeight - sectionFiveTop;
            const scrollProgress = Math.max(0, Math.min(1, scrolled / sectionFiveHeight));
            
            console.log('Section 5 top:', sectionFiveTop.toFixed(0));
            console.log('Scrolled in section 5:', scrolled.toFixed(0));
            console.log('Scroll progress:', (scrollProgress * 100).toFixed(0) + '%');
            
            // STEP-BASED transitions:
            // 0-60%: Azzurra (molto più tempo)
            // 60-80%: Verde (completa)
            // 80-100%: Arancione (completa)
            
            if (scrollProgress < 0.6) {
                // Azzurra - nascondi verde e arancione
                backgroundFiveGreen.style.clipPath = `inset(0 100% 0 0)`;
                backgroundFiveOrange.style.clipPath = `inset(0 100% 0 0)`;
                console.log('Color: BLUE');
            } else if (scrollProgress < 0.8) {
                // Verde completa - mostra tutta verde
                backgroundFiveGreen.style.clipPath = `inset(0 0% 0 0)`;
                backgroundFiveOrange.style.clipPath = `inset(0 100% 0 0)`;
                console.log('Color: GREEN');
            } else {
                // Arancione completa - mostra tutta arancione
                backgroundFiveGreen.style.clipPath = `inset(0 0% 0 0)`;
                backgroundFiveOrange.style.clipPath = `inset(0 0% 0 0)`;
                console.log('Color: ORANGE');
            }
        } else if (sectionFourTop < 0) {
            // Sezione 4 nera ha raggiunto il top → nascondi landing02, mostra nero
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.classList.remove('visible');
            backgroundFiveGreen.classList.remove('visible');
            backgroundFiveOrange.classList.remove('visible');
        } else if (sectionThreeTop < windowHeight) {
            // Sezione 3 visibile → mostra landing02 + bottoni
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.add('visible');
            if (asphaltButtons) asphaltButtons.classList.add('visible');
            backgroundFive.classList.remove('visible');
            backgroundFiveGreen.classList.remove('visible');
            backgroundFiveOrange.classList.remove('visible');
        } else {
            // Sezione 1 visibile → mostra landing01
            backgroundFixed.classList.remove('hidden');
            overlayGradient.classList.remove('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.classList.remove('visible');
            backgroundFiveGreen.classList.remove('visible');
            backgroundFiveOrange.classList.remove('visible');
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
