// Effetto scroll - CROSSFADE VELOCE A STEP (più naturale)
(function() {
    'use strict';
    
    const img1 = document.getElementById('carsSequence1');
    const img2 = document.getElementById('carsSequence2');
    
    if (!img1 || !img2) {
        console.error('Elementi immagine non trovati!');
        return;
    }

    const imageSequence = [
        '06.png', '05.png', '04.png', '03.png', '02.png', '01.png'
    ];

    // Precarica
    imageSequence.forEach(function(src) {
        const img = new Image();
        img.src = src;
    });

    console.log('✓ Crossfade a step attivato (più naturale)');

    let currentFrame = 0;
    let activeLayer = 1;

    function updateSequence() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        const scrollDuration = windowHeight * 5;
        const scrollPercent = Math.min(Math.max(scrollY / scrollDuration, 0), 1);
        
        // Frame come numero intero (non decimale)
        const targetFrame = Math.floor(scrollPercent * (imageSequence.length - 1));
        
        // Cambia SOLO quando passi a un frame diverso
        if (targetFrame !== currentFrame) {
            currentFrame = targetFrame;
            
            // Crossfade veloce tra i due layer
            if (activeLayer === 1) {
                img2.src = imageSequence[currentFrame];
                img2.style.opacity = '1';
                img1.style.opacity = '0';
                activeLayer = 2;
            } else {
                img1.src = imageSequence[currentFrame];
                img1.style.opacity = '1';
                img2.style.opacity = '0';
                activeLayer = 1;
            }
            
            console.log('Frame:', currentFrame, '/', imageSequence.length - 1);
        }
    }

    updateSequence();

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateSequence();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', updateSequence);

})();
