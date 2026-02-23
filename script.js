// Animazioni automatiche
(function() {
    'use strict';
    
    const presentaLayer = document.getElementById('presentaLayer');
    const titleGroup = document.getElementById('titleGroup');
    
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
    
    const blueCarContent = document.querySelector('.blue-car-content');
    const greenCarContent = document.querySelector('.green-car-content');
    const orangeCarContent = document.querySelector('.orange-car-content');
    
    const eventCards       = document.querySelectorAll('.event-card-timeline:not(.green):not(.orange)');
    const eventCardsGreen  = document.querySelectorAll('.event-card-timeline.green');
    const eventCardsOrange = document.querySelectorAll('.event-card-timeline.orange');

    const eventTypeBlu      = document.querySelector('.event-type:not(.green):not(.orange)');
    const btnSubscribeBlu   = document.querySelector('.btn-subscribe-header:not(.green):not(.orange)');
    const eventTypeGreen    = document.querySelector('.event-type.green');
    const btnSubscribeGreen = document.querySelector('.btn-subscribe-header.green');
    const eventTypeOrange   = document.querySelector('.event-type.orange');
    const btnSubscribeOrange = document.querySelector('.btn-subscribe-header.orange');

    const GREEN_START  = 0.65;
    const ORANGE_START = 0.82;

    if (backgroundFiveGreen)  { backgroundFiveGreen.style.opacity  = '0'; backgroundFiveGreen.style.clipPath  = 'inset(0 100% 0 0)'; }
    if (backgroundFiveOrange) { backgroundFiveOrange.style.opacity = '0'; backgroundFiveOrange.style.clipPath = 'inset(0 100% 0 0)'; }
    
    setTimeout(function() {
        if (presentaLayer) presentaLayer.classList.add('visible');
        if (titleGroup)    titleGroup.classList.add('visible');
    }, 1000);
    
    function animateCarousel(cards, baseProgress, scrollProgress) {
        const baseY = 200;
        const exitY = -200;

        if (cards[0]) {
            const s = baseProgress, e = baseProgress + 0.30;
            if (scrollProgress >= s && scrollProgress < e) {
                const t = (scrollProgress - s) / 0.30;
                cards[0].style.transform = `translateY(${baseY - t * (baseY - exitY)}px)`;
                cards[0].style.opacity   = t < 0.1 ? t / 0.1 : (t > 0.9 ? (1 - t) / 0.1 : 1);
                cards[0].style.zIndex    = '3';
            } else {
                cards[0].style.opacity = '0'; cards[0].style.zIndex = '1';
            }
        }

        if (cards[1]) {
            const s = baseProgress + 0.15, e = baseProgress + 0.45, zUp = baseProgress + 0.28;
            if (scrollProgress >= s && scrollProgress < e) {
                const t = (scrollProgress - s) / 0.30;
                let op;
                if (t < 0.15)      op = 0.25 * (t / 0.15);
                else if (t < 0.35) op = 0.25 + 0.75 * ((t - 0.15) / 0.20);
                else if (t < 0.85) op = 1;
                else               op = (1 - t) / 0.15;
                cards[1].style.transform = `translateY(${baseY - t * (baseY - exitY)}px)`;
                cards[1].style.opacity   = op;
                cards[1].style.zIndex    = scrollProgress > zUp ? '3' : '2';
            } else {
                cards[1].style.opacity = '0'; cards[1].style.zIndex = '1';
            }
        }

        if (cards[2]) {
            const s = baseProgress + 0.30, e = baseProgress + 0.60, zUp = baseProgress + 0.43;
            if (scrollProgress >= s && scrollProgress < e) {
                const t = (scrollProgress - s) / 0.30;
                let op;
                if (t < 0.15)      op = 0.25 * (t / 0.15);
                else if (t < 0.35) op = 0.25 + 0.75 * ((t - 0.15) / 0.20);
                else if (t < 0.85) op = 1;
                else               op = (1 - t) / 0.15;
                cards[2].style.transform = `translateY(${baseY - t * (baseY - exitY)}px)`;
                cards[2].style.opacity   = op;
                cards[2].style.zIndex    = scrollProgress > zUp ? '3' : '2';
            } else {
                cards[2].style.opacity = '0'; cards[2].style.zIndex = '1';
            }
        }
    }

    function hideCards(cards) {
        cards.forEach(c => { c.style.opacity = '0'; c.style.zIndex = '1'; c.style.transform = 'translateY(200px)'; });
    }

    function resetGreenOrange() {
        backgroundFiveGreen.style.opacity   = '0';
        backgroundFiveGreen.style.clipPath  = 'inset(0 100% 0 0)';
        backgroundFiveOrange.style.opacity  = '0';
        backgroundFiveOrange.style.clipPath = 'inset(0 100% 0 0)';
    }

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
                const scrollProgress      = Math.max(0, scrollInSectionFive / sectionFiveHeight);

                const inGreen  = scrollProgress >= GREEN_START;
                const inOrange = scrollProgress >= ORANGE_START;

                // Visibility
                if (inOrange) {
                    if (blueCarContent)   blueCarContent.classList.remove('visible');
                    if (greenCarContent)  greenCarContent.classList.remove('visible');
                    if (orangeCarContent) orangeCarContent.classList.add('visible');
                } else if (inGreen) {
                    if (blueCarContent)   blueCarContent.classList.remove('visible');
                    if (greenCarContent)  greenCarContent.classList.add('visible');
                    if (orangeCarContent) orangeCarContent.classList.remove('visible');
                } else {
                    if (blueCarContent)   blueCarContent.classList.add('visible');
                    if (greenCarContent)  greenCarContent.classList.remove('visible');
                    if (orangeCarContent) orangeCarContent.classList.remove('visible');
                }

                // Color reveal - snap con CSS transition 0.6s
                if (inGreen) {
                    backgroundFiveGreen.style.opacity  = '1';
                    backgroundFiveGreen.style.clipPath = 'inset(0 0% 0 0)';
                } else {
                    backgroundFiveGreen.style.opacity  = '0';
                    backgroundFiveGreen.style.clipPath = 'inset(0 100% 0 0)';
                }

                if (inOrange) {
                    backgroundFiveOrange.style.opacity  = '1';
                    backgroundFiveOrange.style.clipPath = 'inset(0 0% 0 0)';
                } else {
                    backgroundFiveOrange.style.opacity  = '0';
                    backgroundFiveOrange.style.clipPath = 'inset(0 100% 0 0)';
                }

                // Header blu
                if (!inGreen) {
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
                if (inGreen && !inOrange) {
                    if (eventTypeGreen)    eventTypeGreen.classList.add('show');
                    if (btnSubscribeGreen) btnSubscribeGreen.classList.add('show');
                } else {
                    if (eventTypeGreen)    eventTypeGreen.classList.remove('show');
                    if (btnSubscribeGreen) btnSubscribeGreen.classList.remove('show');
                }

                // Header arancione
                if (inOrange) {
                    if (eventTypeOrange)    eventTypeOrange.classList.add('show');
                    if (btnSubscribeOrange) btnSubscribeOrange.classList.add('show');
                } else {
                    if (eventTypeOrange)    eventTypeOrange.classList.remove('show');
                    if (btnSubscribeOrange) btnSubscribeOrange.classList.remove('show');
                }

                // Carousel
                if (!inGreen) {
                    animateCarousel(eventCards, 0.05, scrollProgress);
                } else {
                    hideCards(eventCards);
                }

                if (inGreen && !inOrange) {
                    animateCarousel(eventCardsGreen, GREEN_START, scrollProgress);
                } else {
                    hideCards(eventCardsGreen);
                }

                if (inOrange) {
                    animateCarousel(eventCardsOrange, ORANGE_START, scrollProgress);
                } else {
                    hideCards(eventCardsOrange);
                }

            } else {
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
    console.log('✓ Script v4 attivo');
})();
