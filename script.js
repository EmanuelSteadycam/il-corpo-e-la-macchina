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
                
                // Mostra header DOPO che sezione 4 è salita (più tardi)
                if (scrollProgress > 0.05) {
                    const eventsHeader = document.querySelector('.events-header');
                    if (eventsHeader) eventsHeader.classList.add('show');
                } else {
                    const eventsHeader = document.querySelector('.events-header');
                    if (eventsHeader) eventsHeader.classList.remove('show');
                }
                
                // CAROUSEL CON PREVIEW FLUIDA - scheda successiva al 25% opacity
                // Preview sale INSIEME alla scheda principale
                
                // CARD 1
                if (eventCards[0]) {
                    const card1Progress = (scrollProgress - 0.05) / 0.29;
                    if (scrollProgress >= 0.05 && scrollProgress < 0.34) {
                        let opacity, translateY;
                        if (card1Progress < 0.2) {
                            const entranceProgress = card1Progress / 0.2;
                            opacity = entranceProgress;
                            translateY = 150 - (entranceProgress * 150);
                        } else if (card1Progress > 0.8) {
                            const exitProgress = (card1Progress - 0.8) / 0.2;
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
                    if (scrollProgress >= 0.20 && scrollProgress < 0.34) {
                        // PREVIEW FLUIDA - sale insieme a card 1, opacity 25%
                        const previewProgress = (scrollProgress - 0.20) / 0.14;
                        const baseTranslateY = 180;
                        const translateY = baseTranslateY - (previewProgress * 30); // sale leggermente
                        eventCards[1].style.opacity = '0.25';
                        eventCards[1].style.transform = `translateY(${translateY}px)`;
                        eventCards[1].style.zIndex = '2';
                    } else if (scrollProgress >= 0.34 && scrollProgress < 0.60) {
                        // MAIN - diventa principale
                        const card2Progress = (scrollProgress - 0.34) / 0.26;
                        let opacity, translateY;
                        if (card2Progress < 0.2) {
                            const entranceProgress = card2Progress / 0.2;
                            opacity = 0.25 + (entranceProgress * 0.75); // da 0.25 a 1
                            translateY = 150 - (entranceProgress * 150);
                        } else if (card2Progress > 0.8) {
                            const exitProgress = (card2Progress - 0.8) / 0.2;
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
                    if (scrollProgress >= 0.48 && scrollProgress < 0.60) {
                        // PREVIEW FLUIDA - sale insieme a card 2, opacity 25%
                        const previewProgress = (scrollProgress - 0.48) / 0.12;
                        const baseTranslateY = 180;
                        const translateY = baseTranslateY - (previewProgress * 30);
                        eventCards[2].style.opacity = '0.25';
                        eventCards[2].style.transform = `translateY(${translateY}px)`;
                        eventCards[2].style.zIndex = '2';
                    } else if (scrollProgress >= 0.60 && scrollProgress < 0.85) {
                        // MAIN
                        const card3Progress = (scrollProgress - 0.60) / 0.25;
                        let opacity, translateY;
                        if (card3Progress < 0.2) {
                            const entranceProgress = card3Progress / 0.2;
                            opacity = 0.25 + (entranceProgress * 0.75);
                            translateY = 150 - (entranceProgress * 150);
                        } else if (card3Progress > 0.8) {
                            const exitProgress = (card3Progress - 0.8) / 0.2;
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
