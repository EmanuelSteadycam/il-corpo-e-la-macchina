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
    
    // Cards
    const eventCards       = document.querySelectorAll('.event-card-timeline:not(.green):not(.orange)');
    const eventCardsGreen  = document.querySelectorAll('.event-card-timeline.green');
    const eventCardsOrange = document.querySelectorAll('.event-card-timeline.orange');

    // Header
    const eventTypeBlu      = document.querySelector('.event-type:not(.green):not(.orange)');
    const btnSubscribeBlu   = document.querySelector('.btn-subscribe-header:not(.green):not(.orange)');
    const eventTypeGreen    = document.querySelector('.event-type.green');
    const btnSubscribeGreen = document.querySelector('.btn-subscribe-header.green');
    const eventTypeOrange    = document.querySelector('.event-type.orange');
    const btnSubscribeOrange = document.querySelector('.btn-subscribe-header.orange');

    // Init: green/orange COMPLETAMENTE nascosti con style inline (override CSS)
    if (backgroundFiveGreen) {
        backgroundFiveGreen.style.opacity  = '0';
        backgroundFiveGreen.style.clipPath = 'inset(0 100% 0 0)';
    }
    if (backgroundFiveOrange) {
        backgroundFiveOrange.style.opacity  = '0';
        backgroundFiveOrange.style.clipPath = 'inset(0 100% 0 0)';
    }
    
    // Animazioni intro
    setTimeout(function() {
        if (presentaLayer) presentaLayer.classList.add('visible');
        if (titleGroup)    titleGroup.classList.add('visible');
    }, 1000);
    
    // ─── HELPERS ─────────────────────────────────────────────────

    function animateCarousel(cards, baseProgress, scrollProgress) {
        const baseY = 200;
        const exitY = -200;

        const c1Start = baseProgress;
        const c1End   = baseProgress + 0.30;
        if (cards[0]) {
            if (scrollProgress >= c1Start && scrollProgress < c1End) {
                const t = (scrollProgress - c1Start) / 0.30;
                const translateY = baseY - (t * (baseY - exitY));
                const opacity = t < 0.1 ? t / 0.1 : (t > 0.9 ? (1 - t) / 0.1 : 1);
                cards[0].style.transform = `translateY(${translateY}px)`;
                cards[0].style.opacity   = opacity;
                cards[0].style.zIndex    = '3';
            } else {
                cards[0].style.opacity = '0';
                cards[0].style.zIndex  = '1';
            }
        }

        const c2Start = baseProgress + 0.15;
        const c2End   = baseProgress + 0.45;
        const c2ZUp   = baseProgress + 0.28;
        if (cards[1]) {
            if (scrollProgress >= c2Start && scrollProgress < c2End) {
                const t = (scrollProgress - c2Start) / 0.30;
                const translateY = baseY - (t * (baseY - exitY));
                let opacity;
                if (t < 0.15)      opacity = 0.25 * (t / 0.15);
                else if (t < 0.35) opacity = 0.25 + (0.75 * ((t - 0.15) / 0.20));
                else if (t < 0.85) opacity = 1;
                else               opacity = (1 - t) / 0.15;
                cards[1].style.transform = `translateY(${translateY}px)`;
                cards[1].style.opacity   = opacity;
                cards[1].style.zIndex    = scrollProgress > c2ZUp ? '3' : '2';
            } else {
                cards[1].style.opacity = '0';
                cards[1].style.zIndex  = '1';
            }
        }

        const c3Start = baseProgress + 0.30;
        const c3End   = baseProgress + 0.60;
        const c3ZUp   = baseProgress + 0.43;
        if (cards[2]) {
            if (scrollProgress >= c3Start && scrollProgress < c3End) {
                const t = (scrollProgress - c3Start) / 0.30;
                const translateY = baseY - (t * (baseY - exitY));
                let opacity;
                if (t < 0.15)      opacity = 0.25 * (t / 0.15);
                else if (t < 0.35) opacity = 0.25 + (0.75 * ((t - 0.15) / 0.20));
                else if (t < 0.85) opacity = 1;
                else               opacity = (1 - t) / 0.15;
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

    function resetGreenOrange() {
        backgroundFiveGreen.style.opacity   = '0';
        backgroundFiveGreen.style.clipPath  = 'inset(0 100% 0 0)';
        backgroundFiveOrange.style.opacity  = '0';
        backgroundFiveOrange.style.clipPath = 'inset(0 100% 0 0)';
    }

    // ─── MAIN ────────────────────────────────────────────────────
    
    function updateBackgrounds() {
        if (!sectionThree || !sectionFourTransition || !sectionFive) return;
        
        const sectionThreeTop = sectionThree.getBoundingClientRect().top;
        const sectionFourTop  = sectionFourTransition.getBoundingClientRect().top;
        const sectionFiveTop  = sectionFive.getBoundingClientRect().top;
        const windowHeight    = window.innerHeight;
        
        if (sectionFiveTop < windowHeight) {
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');

            const sectionFourHeight        = sectionFourTransition.offsetHeight;
            const sectionFourFullyScrolled = sectionFourTop <= -sectionFourHeight;
            
            if (sectionFourFullyScrolled) {
                backgroundFive.style.opacity = '1';

                const sectionFiveHeight   = sectionFive.offsetHeight;
                const scrollInSectionFive = Math.abs(sectionFourTop + sectionFourHeight);
                const scrollProgress      = Math.max(0, Math.min(1.5, scrollInSectionFive / sectionFiveHeight));

                const showGreen  = scrollProgress >= 0.65;
                const showOrange = scrollProgress >= 0.95;

                // Visibility contenuti
                if (showOrange) {
                    if (blueCarContent)   blueCarContent.classList.remove('visible');
                    if (greenCarContent)  greenCarContent.classList.remove('visible');
                    if (orangeCarContent) orangeCarContent.classList.add('visible');
                } else if (showGreen) {
                    if (blueCarContent)   blueCarContent.classList.remove('visible');
                    if (greenCarContent)  greenCarContent.classList.add('visible');
                    if (orangeCarContent) orangeCarContent.classList.remove('visible');
                } else {
                    if (blueCarContent)   blueCarContent.classList.add('visible');
                    if (greenCarContent)  greenCarContent.classList.remove('visible');
                    if (orangeCarContent) orangeCarContent.classList.remove('visible');
                }

                // Color reveal — SOLO style inline, mai .visible su green/orange
                if (scrollProgress >= 0.65) {
                    const p = Math.min(1, (scrollProgress - 0.65) / 0.30);
                    backgroundFiveGreen.style.opacity  = '1';
                    backgroundFiveGreen.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
                } else {
                    backgroundFiveGreen.style.opacity  = '0';
                    backgroundFiveGreen.style.clipPath = 'inset(0 100% 0 0)';
                }

                if (scrollProgress >= 0.95) {
                    const p = Math.min(1, (scrollProgress - 0.95) / 0.30);
                    backgroundFiveOrange.style.opacity  = '1';
                    backgroundFiveOrange.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
                } else {
                    backgroundFiveOrange.style.opacity  = '0';
                    backgroundFiveOrange.style.clipPath = 'inset(0 100% 0 0)';
                }

                // Header blu
                if (!showGreen) {
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

                // Header verde
                if (showGreen && !showOrange) {
                    if (eventTypeGreen)    eventTypeGreen.classList.add('show');
                    if (btnSubscribeGreen) btnSubscribeGreen.classList.add('show');
                } else {
                    if (eventTypeGreen)    eventTypeGreen.classList.remove('show');
                    if (btnSubscribeGreen) btnSubscribeGreen.classList.remove('show');
                }

                // Header arancione
                if (showOrange) {
                    if (eventTypeOrange)    eventTypeOrange.classList.add('show');
                    if (btnSubscribeOrange) btnSubscribeOrange.classList.add('show');
                } else {
                    if (eventTypeOrange)    eventTypeOrange.classList.remove('show');
                    if (btnSubscribeOrange) btnSubscribeOrange.classList.remove('show');
                }

                // Carousel
                if (!showGreen) {
                    animateCarousel(eventCards, 0.05, scrollProgress);
                } else {
                    hideCards(eventCards);
                }

                if (showGreen && !showOrange) {
                    animateCarousel(eventCardsGreen, 0.65, scrollProgress);
                } else {
                    hideCards(eventCardsGreen);
                }

                if (showOrange) {
                    animateCarousel(eventCardsOrange, 0.95, scrollProgress);
                } else {
                    hideCards(eventCardsOrange);
                }

            } else {
                // Sezione 4 non ancora completamente salita
                backgroundFive.style.opacity = '1';
                resetGreenOrange();
                if (blueCarContent)   blueCarContent.classList.add('visible');
                if (greenCarContent)  greenCarContent.classList.remove('visible');
                if (orangeCarContent) orangeCarContent.classList.remove('visible');
                if (eventTypeBlu)    eventTypeBlu.classList.remove('show');
                if (btnSubscribeBlu) btnSubscribeBlu.classList.remove('show');
                hideCards(eventCards);
                hideCards(eventCardsGreen);
                hideCards(eventCardsOrange);
            }

        } else if (sectionFourTop < 0) {
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.style.opacity = '0';
            resetGreenOrange();
            if (blueCarContent)   blueCarContent.classList.remove('visible');
            if (greenCarContent)  greenCarContent.classList.remove('visible');
            if (orangeCarContent) orangeCarContent.classList.remove('visible');

        } else if (sectionThreeTop < windowHeight) {
            backgroundFixed.classList.add('hidden');
            overlayGradient.classList.add('hidden');
            backgroundThree.classList.add('visible');
            if (asphaltButtons) asphaltButtons.classList.add('visible');
            backgroundFive.style.opacity = '0';
            resetGreenOrange();
            if (blueCarContent)   blueCarContent.classList.remove('visible');
            if (greenCarContent)  greenCarContent.classList.remove('visible');
            if (orangeCarContent) orangeCarContent.classList.remove('visible');

        } else {
            backgroundFixed.classList.remove('hidden');
            overlayGradient.classList.remove('hidden');
            backgroundThree.classList.remove('visible');
            if (asphaltButtons) asphaltButtons.classList.remove('visible');
            backgroundFive.style.opacity = '0';
            resetGreenOrange();
            if (blueCarContent)   blueCarContent.classList.remove('visible');
            if (greenCarContent)  greenCarContent.classList.remove('visible');
            if (orangeCarContent) orangeCarContent.classList.remove('visible');
        }
    }
    
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
    
    updateBackgrounds();
    
    console.log('✓ Script v3 attivo');
})();
