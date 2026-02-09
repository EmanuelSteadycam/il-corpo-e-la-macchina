// Effetto scroll con sequenza di immagini - CROSSFADE
(function() {
    'use strict';
    
    const img1 = document.getElementById('carsSequence1');
    const img2 = document.getElementById('carsSequence2');
    
    if (!img1 || !img2) {
        console.error('Elementi immagine non trovati!');
        return;
    }

    // Array delle immagini nella sequenza corretta: da pieno (06) a vuoto (01)
    const imageSequence = [
        '06.png',  // Frame 0: Tutte le auto
        '05.png',  // Frame 1: Poche auto rimosse
        '04.png',  // Frame 2: Più auto rimosse
        '03.png',  // Frame 3: Ancora meno auto
        '02.png',  // Frame 4: Pochissime auto
        '01.png'   // Frame 5: Solo asfalto e persona
    ];

    // Precarica tutte le immagini
    const preloadedImages = [];
    imageSequence.forEach(function(src) {
        const img = new Image();
        img.src = src;
        preloadedImages.push(img);
    });

    console.log('Sequenza caricata:', imageSequence.length, 'frame');
    console.log('Pixel di scroll per frame:', window.innerHeight * 5 / (imageSequence.length - 1), 'px');

    let currentFrame = 0;
    let activeLayer = 1; // Quale layer sta mostrando (1 o 2)

    function updateSequence() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        // Le auto scompaiono in 5 schermate
        const scrollDuration = windowHeight * 5;
        const scrollPercent = Math.min(scrollY / scrollDuration, 1);
        
        // Mappa ai frame (0-5)
        const targetFrame = Math.floor(scrollPercent * (imageSequence.length - 1));
        
        // Cambia immagine con crossfade
        if (targetFrame !== currentFrame && targetFrame >= 0 && targetFrame < imageSequence.length) {
            currentFrame = targetFrame;
            
            // CROSSFADE: carica nuova immagine nel layer nascosto, poi fai apparire
            if (activeLayer === 1) {
                // Layer 2 diventa visibile con nuova immagine
                img2.src = imageSequence[currentFrame];
                img2.style.opacity = '1';
                img1.style.opacity = '0';
                activeLayer = 2;
            } else {
                // Layer 1 diventa visibile con nuova immagine
                img1.src = imageSequence[currentFrame];
                img1.style.opacity = '1';
                img2.style.opacity = '0';
                activeLayer = 1;
            }
            
            console.log('Frame:', currentFrame, '/', imageSequence.length - 1, '- Scroll:', Math.round(scrollPercent * 100) + '%');
        }
    }

    // Esegui all'avvio
    updateSequence();

    // Esegui durante lo scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateSequence();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Esegui al resize
    window.addEventListener('resize', updateSequence);

    console.log('✓ Effetto crossfade attivato!');

})();
