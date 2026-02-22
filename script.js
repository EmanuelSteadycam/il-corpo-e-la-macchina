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
    const blueCarContent = document.querySelector('.blue-car-content');
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
            // Sezione 5 visibile → mostra landing03 + contenuti
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.classList.add('visible');
            backgroundFiveGreen.classList.add('visible');
            backgroundFiveOrange.classList.add('visible');
            if (blueCarContent) blueCarContent.classList.add('visible');
            
            // Le animazioni partono SOLO quando sezione 4 è completamente salita
            // (quando sectionFourTop è negativo per tutta la sua altezza)
            const sectionFourHeight = sectionFourTransition.offsetHeight;
            const sectionFourFullyScrolled = sectionFourTop <= -sectionFourHeight;
            
            if (sectionFourFullyScrolled) {
                // Calcola progresso scroll nella sezione 5 (DOPO che sez 4 è salita)
                const sectionFiveHeight = sectionFive.offsetHeight;
                const scrollInSectionFive = Math.abs(sectionFourTop + sectionFourHeight);
                const scrollProgress = Math.max(0, Math.min(1, scrollInSectionFive / (sectionFiveHeight * 0.5)));
                
                // Trigger animazioni eventi in base allo scroll (con rimozione quando si torna indietro)
                // 5% → INCONTRI PUBBLICI
                if (scrollProgress > 0.05 && eventType) {
                    eventType.classList.add('show');
                } else if (eventType) {
                    eventType.classList.remove('show');
                }
                
                // 15% → Scheda 1
                if (scrollProgress > 0.15 && eventCards[0]) {
                    eventCards[0].classList.add('show');
                } else if (eventCards[0]) {
                    eventCards[0].classList.remove('show');
                }
                
                // 30% → Scheda 2
                if (scrollProgress > 0.3 && eventCards[1]) {
                    eventCards[1].classList.add('show');
                } else if (eventCards[1]) {
                    eventCards[1].classList.remove('show');
                }
                
                // 45% → Scheda 3
                if (scrollProgress > 0.45 && eventCards[2]) {
                    eventCards[2].classList.add('show');
                } else if (eventCards[2]) {
                    eventCards[2].classList.remove('show');
                }
                
                // 60% → Bottone
                if (scrollProgress > 0.6 && btnSubscribe) {
                    btnSubscribe.classList.add('show');
                } else if (btnSubscribe) {
                    btnSubscribe.classList.remove('show');
                }
                
                console.log('Section 4 fully scrolled - Progress:', (scrollProgress * 100).toFixed(0) + '%');
            } else {
                // Sezione 4 non ancora completamente salita → nascondi tutto
                if (eventType) eventType.classList.remove('show');
                eventCards.forEach(card => card.classList.remove('show'));
                if (btnSubscribe) btnSubscribe.classList.remove('show');
                
                console.log('Waiting for section 4 to fully scroll...');
            }
            
            // COLOR REVEAL DISABILITATO - solo macchina blu visibile
            backgroundFiveGreen.style.clipPath = `inset(0 100% 0 0)`;
            backgroundFiveOrange.style.clipPath = `inset(0 100% 0 0)`;
            
        } else if (sectionFourTop < 0) {
            // Sezione 4 nera ha raggiunto il top → nascondi landing02, mostra nero
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.classList.remove('visible');
            backgroundFiveGreen.classList.remove('visible');
            backgroundFiveOrange.classList.remove('visible');
            if (blueCarContent) blueCarContent.classList.remove('visible');
        } else if (sectionThreeTop < windowHeight) {
            // Sezione 3 visibile → mostra landing02 + bottoni
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.add('visible');
            if (asphaltButtons) asphaltButtons.classList.add('visible');
            backgroundFive.classList.remove('visible');
            backgroundFiveGreen.classList.remove('visible');
            backgroundFiveOrange.classList.remove('visible');
            if (blueCarContent) blueCarContent.classList.remove('visible');
        } else {
            // Sezione 1 visibile → mostra landing01
            backgroundFixed.classList.remove('hidden');
            overlayGradient.classList.remove('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.classList.remove('visible');
            backgroundFiveGreen.classList.remove('visible');
            backgroundFiveOrange.classList.remove('visible');
            if (blueCarContent) blueCarContent.classList.remove('visible');
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
