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
    
    // Contenuti carousel
    const blueCarContent = document.querySelector('.blue-car-content');
    const greenCarContent = document.querySelector('.green-car-content');
    const orangeCarContent = document.querySelector('.orange-car-content');
    
    // Card BLU
    const eventCards = document.querySelectorAll('.event-card-timeline:not(.green):not(.orange)');
    // Card VERDE
    const eventCardsGreen = document.querySelectorAll('.event-card-timeline.green');
    // Card ARANCIONE
    const eventCardsOrange = document.querySelectorAll('.event-card-timeline.orange');
    
    // Animazioni automatiche dopo 1 secondo
    setTimeout(function() {
        presentaLayer.classList.add('visible');
        titleGroup.classList.add('visible');
        console.log('✓ Presenta e Titolo apparsi automaticamente');
    }, 1000);
    
    // ─── HELPERS ────────────────────────────────────────────────
    
    function animateCarousel(cards, baseProgress, scrollProgress) {
        const baseY = 200;
        const exitY = -200;

        // CARD 1: baseProgress + 0 → baseProgress + 30%
        const c1Start = baseProgress;
        const c1End   = baseProgress + 0.30;
        if (cards[0]) {
            if (scrollProgress >= c1Start && scrollProgress < c1End) {
                const t = (scrollProgress - c1Start) / 0.30;
                const translateY = baseY - (t * (baseY - exitY));
                let opacity;
                if (t < 0.1)      opacity = t / 0.1;
                else if (t > 0.9) opacity = (1 - t) / 0.1;
                else               opacity = 1;
                cards[0].style.transform = `translateY(${translateY}px)`;
                cards[0].style.opacity   = opacity;
                cards[0].style.zIndex    = '3';
            } else {
                cards[0].style.opacity = '0';
                cards[0].style.zIndex  = '1';
            }
        }

        // CARD 2: baseProgress + 15% → baseProgress + 45%
        const c2Start = baseProgress + 0.15;
        const c2End   = baseProgress + 0.45;
        const c2ZUp   = baseProgress + 0.28;
        if (cards[1]) {
            if (scrollProgress >= c2Start && scrollProgress < c2End) {
                const t = (scrollProgress - c2Start) / 0.30;
                const translateY = baseY - (t * (baseY - exitY));
                let opacity;
                if (t < 0.15) {
                    opacity = 0.25 * (t / 0.15);
                } else if (t < 0.35) {
                    opacity = 0.25 + (0.75 * ((t - 0.15) / 0.20));
                } else if (t < 0.85) {
                    opacity = 1;
                } else {
                    opacity = (1 - t) / 0.15;
                }
                cards[1].style.transform = `translateY(${translateY}px)`;
                cards[1].style.opacity   = opacity;
                cards[1].style.zIndex    = scrollProgress > c2ZUp ? '3' : '2';
            } else {
                cards[1].style.opacity = '0';
                cards[1].style.zIndex  = '1';
            }
        }

        // CARD 3: baseProgress + 30% → baseProgress + 60%
        const c3Start = baseProgress + 0.30;
        const c3End   = baseProgress + 0.60;
        const c3ZUp   = baseProgress + 0.43;
        if (cards[2]) {
            if (scrollProgress >= c3Start && scrollProgress < c3End) {
                const t = (scrollProgress - c3Start) / 0.30;
                const translateY = baseY - (t * (baseY - exitY));
                let opacity;
                if (t < 0.15) {
                    opacity = 0.25 * (t / 0.15);
                } else if (t < 0.35) {
                    opacity = 0.25 + (0.75 * ((t - 0.15) / 0.20));
                } else if (t < 0.85) {
                    opacity = 1;
                } else {
                    opacity = (1 - t) / 0.15;
                }
                cards[2].style.transform = `translateY(${translateY}px)`;
                cards[2].style.opacity   = opacity;
                cards[2].style.zIndex    = scrollProgress > c3ZUp ? '3' : '2';
            } else {
                cards[2].style.opacity = '0';
                cards[2].style.zIndex  = '1';
            }
        }
    }

    function hideCards(cards) {
        cards.forEach(card => {
            card.style.opacity   = '0';
            card.style.zIndex    = '1';
            card.style.transform = 'translateY(200px)';
        });
    }

    // ─── MAIN SCROLL LOGIC ───────────────────────────────────────
    
    function updateBackgrounds() {
        if (!sectionThree || !sectionFourTransition || !sectionFive) return;
        
        const sectionThreeTop = sectionThree.getBoundingClientRect().top;
        const sectionFourTop  = sectionFourTransition.getBoundingClientRect().top;
        const sectionFiveTop  = sectionFive.getBoundingClientRect().top;
        const windowHeight    = window.innerHeight;
        
        if (sectionFiveTop < windowHeight) {
            // ── Sezione 5 visibile ──
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.classList.add('visible');
            
            const sectionFourHeight    = sectionFourTransition.offsetHeight;
            const sectionFourFullyScrolled = sectionFourTop <= -sectionFourHeight;
            
            if (sectionFourFullyScrolled) {
                const sectionFiveHeight  = sectionFive.offsetHeight;
                const scrollInSectionFive = Math.abs(sectionFourTop + sectionFourHeight);
                const scrollProgress     = Math.max(0, Math.min(1.5, scrollInSectionFive / sectionFiveHeight));

                // ── VISIBILITY MANAGEMENT ──────────────────────────────────
                // Soglie: blu 0-65%, verde 65-95%, arancione 95%+
                const showGreen  = scrollProgress >= 0.65;
                const showOrange = scrollProgress >= 0.95;

                if (showOrange) {
                    // Solo arancione
                    if (blueCarContent)   blueCarContent.classList.remove('visible');
                    if (greenCarContent)  greenCarContent.classList.remove('visible');
                    if (orangeCarContent) orangeCarContent.classList.add('visible');
                } else if (showGreen) {
                    // Solo verde
                    if (blueCarContent)   blueCarContent.classList.remove('visible');
                    if (greenCarContent)  greenCarContent.classList.add('visible');
                    if (orangeCarContent) orangeCarContent.classList.remove('visible');
                } else {
                    // Solo blu
                    if (blueCarContent)   blueCarContent.classList.add('visible');
                    if (greenCarContent)  greenCarContent.classList.remove('visible');
                    if (orangeCarContent) orangeCarContent.classList.remove('visible');
                }

                // ── COLOR REVEAL (clip-path) ───────────────────────────────
                // Verde appare scroll 65-95%
                if (scrollProgress >= 0.95) {
                    backgroundFiveGreen.classList.add('visible');
                    backgroundFiveGreen.style.clipPath = 'inset(0 0% 0 0)';
                } else if (scrollProgress >= 0.65) {
                    backgroundFiveGreen.classList.add('visible');
                    const greenProg = (scrollProgress - 0.65) / 0.30;
                    backgroundFiveGreen.style.clipPath = `inset(0 ${(1 - greenProg) * 100}% 0 0)`;
                } else {
                    backgroundFiveGreen.classList.remove('visible');
                    backgroundFiveGreen.style.clipPath = 'inset(0 100% 0 0)';
                }

                // Arancione appare scroll 95-125%
                if (scrollProgress >= 0.95) {
                    backgroundFiveOrange.classList.add('visible');
                    const orangeProg = Math.min(1, (scrollProgress - 0.95) / 0.30);
                    backgroundFiveOrange.style.clipPath = `inset(0 ${(1 - orangeProg) * 100}% 0 0)`;
                } else {
                    backgroundFiveOrange.classList.remove('visible');
                    backgroundFiveOrange.style.clipPath = 'inset(0 100% 0 0)';
                }

                // ── HEADER ELEMENTI BLU ────────────────────────────────────
                const eventTypeBlu   = document.querySelector('.event-type:not(.green):not(.orange)');
                const btnSubscribeBlu = document.querySelector('.btn-subscribe-header:not(.green):not(.orange)');
                if (!showGreen && !showOrange) {
                    if (scrollProgress > 0.05) {
                        if (eventTypeBlu)    eventTypeBlu.classList.add('show');
                        if (btnSubscribeBlu) btnSubscribeBlu.classList.add('show');
                    } else {
                        if (eventTypeBlu)    eventTypeBlu.classList.remove('show');
                        if (btnSubscribeBlu) btnSubscribeBlu.classList.remove('show');
                    }
                } else {
                    if (eventTypeBlu)    eventTypeBlu.classList.remove('show');
                    if (btnSubscribeBlu) btnSubscribeBlu.classList.remove('show');
                }

                // ── HEADER ELEMENTI VERDE ──────────────────────────────────
                const eventTypeGreen    = document.querySelector('.event-type.green');
                const btnSubscribeGreen = document.querySelector('.btn-subscribe-header.green');
                if (showGreen && !showOrange) {
                    if (eventTypeGreen)    eventTypeGreen.classList.add('show');
                    if (btnSubscribeGreen) btnSubscribeGreen.classList.add('show');
                } else {
                    if (eventTypeGreen)    eventTypeGreen.classList.remove('show');
                    if (btnSubscribeGreen) btnSubscribeGreen.classList.remove('show');
                }

                // ── HEADER ELEMENTI ARANCIONE ──────────────────────────────
                const eventTypeOrange    = document.querySelector('.event-type.orange');
                const btnSubscribeOrange = document.querySelector('.btn-subscribe-header.orange');
                if (showOrange) {
                    if (eventTypeOrange)    eventTypeOrange.classList.add('show');
                    if (btnSubscribeOrange) btnSubscribeOrange.classList.add('show');
                } else {
                    if (eventTypeOrange)    eventTypeOrange.classList.remove('show');
                    if (btnSubscribeOrange) btnSubscribeOrange.classList.remove('show');
                }

                // ── CAROUSEL BLU (0-65%) ───────────────────────────────────
                // Cards: 5-35%, 20-50%, 35-65% → baseProgress = 0.05
                if (!showGreen && !showOrange) {
                    animateCarousel(eventCards, 0.05, scrollProgress);
                } else {
                    hideCards(eventCards);
                }

                // ── CAROUSEL VERDE (65-95%) ────────────────────────────────
                // Cards: 65-95%, 80-110%, 95-125% → baseProgress = 0.65
                if (showGreen && !showOrange) {
                    animateCarousel(eventCardsGreen, 0.65, scrollProgress);
                } else {
                    hideCards(eventCardsGreen);
                }

                // ── CAROUSEL ARANCIONE (95%+) ──────────────────────────────
                // Cards: 95-125%, 110-140%, 125-155% → baseProgress = 0.95
                if (showOrange) {
                    animateCarousel(eventCardsOrange, 0.95, scrollProgress);
                } else {
                    hideCards(eventCardsOrange);
                }

                console.log(`Scroll: ${(scrollProgress * 100).toFixed(0)}%`);
                
            } else {
                // Sezione 4 non ancora salita → nascondi tutto
                const eventTypeBlu    = document.querySelector('.event-type:not(.green):not(.orange)');
                const btnSubscribeBlu = document.querySelector('.btn-subscribe-header:not(.green):not(.orange)');
                if (eventTypeBlu)    eventTypeBlu.classList.remove('show');
                if (btnSubscribeBlu) btnSubscribeBlu.classList.remove('show');
                hideCards(eventCards);
                hideCards(eventCardsGreen);
                hideCards(eventCardsOrange);
                if (blueCarContent)   blueCarContent.classList.add('visible');
                if (greenCarContent)  greenCarContent.classList.remove('visible');
                if (orangeCarContent) orangeCarContent.classList.remove('visible');
                backgroundFiveGreen.classList.remove('visible');
                backgroundFiveGreen.style.clipPath  = 'inset(0 100% 0 0)';
                backgroundFiveOrange.classList.remove('visible');
                backgroundFiveOrange.style.clipPath = 'inset(0 100% 0 0)';
            }

        } else if (sectionFourTop < 0) {
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.classList.remove('visible');
            backgroundFiveGreen.classList.remove('visible');
            backgroundFiveOrange.classList.remove('visible');
            if (blueCarContent)   blueCarContent.classList.remove('visible');
            if (greenCarContent)  greenCarContent.classList.remove('visible');
            if (orangeCarContent) orangeCarContent.classList.remove('visible');

        } else if (sectionThreeTop < windowHeight) {
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.add('visible');
            if (asphaltButtons) asphaltButtons.classList.add('visible');
            backgroundFive.classList.remove('visible');
            backgroundFiveGreen.classList.remove('visible');
            backgroundFiveOrange.classList.remove('visible');
            if (blueCarContent)   blueCarContent.classList.remove('visible');
            if (greenCarContent)  greenCarContent.classList.remove('visible');
            if (orangeCarContent) orangeCarContent.classList.remove('visible');

        } else {
            backgroundFixed.classList.remove('hidden');
            overlayGradient.classList.remove('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.classList.remove('visible');
            backgroundFiveGreen.classList.remove('visible');
            backgroundFiveOrange.classList.remove('visible');
            if (blueCarContent)   blueCarContent.classList.remove('visible');
            if (greenCarContent)  greenCarContent.classList.remove('visible');
            if (orangeCarContent) orangeCarContent.classList.remove('visible');
        }
    }
    
    // Scroll listener ottimizzato
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
    console.log('✓ Carousel BLU + VERDE + ARANCIONE configurati');
    console.log('✓ Color reveal attivo');
    console.log('✓ Visibility management attivo');
})();
