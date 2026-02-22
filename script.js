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
                
                // Mostra header (titolo + bottone)
                if (scrollProgress > 0.01) {
                    const eventsHeader = document.querySelector('.events-header');
                    if (eventsHeader) eventsHeader.classList.add('show');
                } else {
                    const eventsHeader = document.querySelector('.events-header');
                    if (eventsHeader) eventsHeader.classList.remove('show');
                }
                
                // CAROUSEL CON PREVIEW - scheda successiva visibile al 10%
                // Card 1: 0.01-0.30 (main), Card 2 preview dal 0.15
                // Card 2: 0.30-0.55 (main), Card 3 preview dal 0.45
                // Card 3: 0.55-0.80 (main)
                
                // CARD 1
                if (eventCards[0]) {
                    const card1Progress = (scrollProgress - 0.01) / 0.29;
                    if (scrollProgress >= 0.01 && scrollProgress < 0.30) {
                        // Scheda principale
                        let opacity, translateY;
                        if (card1Progress < 0.25) {
                            const entranceProgress = card1Progress / 0.25;
                            opacity = entranceProgress;
                            translateY = 150 - (entranceProgress * 150);
                        } else if (card1Progress > 0.75) {
                            const exitProgress = (card1Progress - 0.75) / 0.25;
                            opacity = 1 - exitProgress;
                            translateY = -(exitProgress * 150);
                        } else {
                            opacity = 1;
                            translateY = 0;
                        }
                        eventCards[0].style.opacity = Math.max(0, Math.min(1, opacity));
                        eventCards[0].style.transform = `translateY(${translateY}px)`;
                        eventCards[0].style.zIndex = '3';
                    } else {
                        eventCards[0].style.opacity = '0';
                        eventCards[0].style.zIndex = '1';
                    }
                }
                
                // CARD 2
                if (eventCards[1]) {
                    if (scrollProgress >= 0.15 && scrollProgress < 0.30) {
                        // PREVIEW - visibile al 10% sotto card 1
                        eventCards[1].style.opacity = '0.1';
                        eventCards[1].style.transform = 'translateY(180px)';
                        eventCards[1].style.zIndex = '1';
                    } else if (scrollProgress >= 0.30 && scrollProgress < 0.55) {
                        // MAIN - scheda principale
                        const card2Progress = (scrollProgress - 0.30) / 0.25;
                        let opacity, translateY;
                        if (card2Progress < 0.25) {
                            const entranceProgress = card2Progress / 0.25;
                            opacity = 0.1 + (entranceProgress * 0.9); // da 0.1 a 1
                            translateY = 180 - (entranceProgress * 180); // da 180 a 0
                        } else if (card2Progress > 0.75) {
                            const exitProgress = (card2Progress - 0.75) / 0.25;
                            opacity = 1 - exitProgress;
                            translateY = -(exitProgress * 150);
                        } else {
                            opacity = 1;
                            translateY = 0;
                        }
                        eventCards[1].style.opacity = Math.max(0, Math.min(1, opacity));
                        eventCards[1].style.transform = `translateY(${translateY}px)`;
                        eventCards[1].style.zIndex = '3';
                    } else {
                        eventCards[1].style.opacity = '0';
                        eventCards[1].style.zIndex = '1';
                    }
                }
                
                // CARD 3
                if (eventCards[2]) {
                    if (scrollProgress >= 0.45 && scrollProgress < 0.55) {
                        // PREVIEW - visibile al 10% sotto card 2
                        eventCards[2].style.opacity = '0.1';
                        eventCards[2].style.transform = 'translateY(180px)';
                        eventCards[2].style.zIndex = '1';
                    } else if (scrollProgress >= 0.55 && scrollProgress < 0.80) {
                        // MAIN - scheda principale
                        const card3Progress = (scrollProgress - 0.55) / 0.25;
                        let opacity, translateY;
                        if (card3Progress < 0.25) {
                            const entranceProgress = card3Progress / 0.25;
                            opacity = 0.1 + (entranceProgress * 0.9);
                            translateY = 180 - (entranceProgress * 180);
                        } else if (card3Progress > 0.75) {
                            const exitProgress = (card3Progress - 0.75) / 0.25;
                            opacity = 1 - exitProgress;
                            translateY = -(exitProgress * 150);
                        } else {
                            opacity = 1;
                            translateY = 0;
                        }
                        eventCards[2].style.opacity = Math.max(0, Math.min(1, opacity));
                        eventCards[2].style.transform = `translateY(${translateY}px)`;
                        eventCards[2].style.zIndex = '3';
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
