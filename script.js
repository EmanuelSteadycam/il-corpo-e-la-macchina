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
            const sectionFourHeight = sectionFourTransition.offsetHeight;
            const sectionFourFullyScrolled = sectionFourTop <= -sectionFourHeight;
            
            if (sectionFourFullyScrolled) {
                // CAROSELLO VERTICALE - calcolo più semplice
                const sectionFiveHeight = sectionFive.offsetHeight;
                const scrollInSectionFive = Math.abs(sectionFourTop + sectionFourHeight);
                // Usa l'intera altezza della sezione 5 (300svh)
                const scrollProgress = Math.max(0, Math.min(1, scrollInSectionFive / sectionFiveHeight));
                
                // Mostra header elementi separatamente
                if (scrollProgress > 0.05) {
                    const eventType = document.querySelector('.event-type');
                    const btnSubscribe = document.querySelector('.btn-subscribe-header');
                    if (eventType) eventType.classList.add('show');
                    if (btnSubscribe) btnSubscribe.classList.add('show');
                } else {
                    const eventType = document.querySelector('.event-type');
                    const btnSubscribe = document.querySelector('.btn-subscribe-header');
                    if (eventType) eventType.classList.remove('show');
                    if (btnSubscribe) btnSubscribe.classList.remove('show');
                }
                
                // CAROUSEL ULTRA-SEMPLICE - z-index corretto
                // La card successiva resta DIETRO fino a che la precedente non è quasi uscita
                
                const baseY = 200; // Posizione base sotto
                const centerY = 0; // Posizione centrale
                const exitY = -200; // Posizione uscita sopra
                
                // CARD 1: 5-38%
                if (eventCards[0]) {
                    if (scrollProgress >= 0.05 && scrollProgress < 0.38) {
                        const t = (scrollProgress - 0.05) / 0.33;
                        const translateY = baseY - (t * (baseY - exitY));
                        
                        let opacity;
                        if (t < 0.1) opacity = t / 0.1;
                        else if (t > 0.9) opacity = (1 - t) / 0.1;
                        else opacity = 1;
                        
                        eventCards[0].style.transform = `translateY(${translateY}px)`;
                        eventCards[0].style.opacity = opacity;
                        eventCards[0].style.zIndex = '3'; // SEMPRE davanti quando visibile
                    } else {
                        eventCards[0].style.opacity = '0';
                        eventCards[0].style.zIndex = '1';
                    }
                }
                
                // CARD 2: 12-50% - Resta DIETRO fino a 35%!
                if (eventCards[1]) {
                    if (scrollProgress >= 0.12 && scrollProgress < 0.50) {
                        const t = (scrollProgress - 0.12) / 0.38;
                        const translateY = baseY - (t * (baseY - exitY));
                        
                        let opacity;
                        if (t < 0.15) {
                            opacity = 0.25 * (t / 0.15);
                        } else if (t < 0.4) {
                            const fadeProgress = (t - 0.15) / 0.25;
                            opacity = 0.25 + (0.75 * fadeProgress);
                        } else if (t < 0.85) {
                            opacity = 1;
                        } else {
                            opacity = (1 - t) / 0.15;
                        }
                        
                        eventCards[1].style.transform = `translateY(${translateY}px)`;
                        eventCards[1].style.opacity = opacity;
                        // Passa davanti SOLO quando card 1 è quasi uscita (dopo 35% scroll)
                        eventCards[1].style.zIndex = scrollProgress > 0.35 ? '3' : '2';
                    } else {
                        eventCards[1].style.opacity = '0';
                        eventCards[1].style.zIndex = '1';
                    }
                }
                
                // CARD 3: 24-62% - Resta DIETRO fino a 47%!
                if (eventCards[2]) {
                    if (scrollProgress >= 0.24 && scrollProgress < 0.62) {
                        const t = (scrollProgress - 0.24) / 0.38;
                        const translateY = baseY - (t * (baseY - exitY));
                        
                        let opacity;
                        if (t < 0.15) {
                            opacity = 0.25 * (t / 0.15);
                        } else if (t < 0.4) {
                            const fadeProgress = (t - 0.15) / 0.25;
                            opacity = 0.25 + (0.75 * fadeProgress);
                        } else if (t < 0.85) {
                            opacity = 1;
                        } else {
                            opacity = (1 - t) / 0.15;
                        }
                        
                        eventCards[2].style.transform = `translateY(${translateY}px)`;
                        eventCards[2].style.opacity = opacity;
                        // Passa davanti SOLO quando card 2 è quasi uscita (dopo 47% scroll)
                        eventCards[2].style.zIndex = scrollProgress > 0.47 ? '3' : '2';
                    } else {
                        eventCards[2].style.opacity = '0';
                        eventCards[2].style.zIndex = '1';
                    }
                }
                
                console.log(`Scroll: ${(scrollProgress * 100).toFixed(0)}%`);
            } else {
                // Sezione 4 non ancora completamente salita → nascondi tutto
                if (eventType) eventType.classList.remove('show');
                eventCards.forEach(card => {
                    card.style.opacity = 0;
                    card.style.transform = 'translateY(150px)';
                });
                if (btnSubscribe) btnSubscribe.classList.remove('show');
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
