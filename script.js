// Effetto scroll con sequenza di immagini - Le auto scompaiono progressivamente
(function() {
    'use strict';
    
    const sequenceImage = document.getElementById('carsSequence');
    
    if (!sequenceImage) {
        console.error('Elemento immagine non trovato!');
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

    // Precarica tutte le immagini per transizioni fluide
    const preloadedImages = [];
    imageSequence.forEach(function(src) {
        const img = new Image();
        img.src = src;
        preloadedImages.push(img);
    });

    console.log('Sequenza caricata:', imageSequence.length, 'frame');

    let currentFrame = 0;

    function updateSequence() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        // Calcola quale frame mostrare in base allo scroll
        // Le auto scompaiono completamente in circa 3 schermate
        const scrollDuration = windowHeight * 3;
        const scrollPercent = Math.min(scrollY / scrollDuration, 1);
        
        // Mappa la percentuale di scroll ai frame (0-5)
        const targetFrame = Math.floor(scrollPercent * (imageSequence.length - 1));
        
        // Cambia immagine solo se necessario (per performance)
        if (targetFrame !== currentFrame && targetFrame >= 0 && targetFrame < imageSequence.length) {
            currentFrame = targetFrame;
            sequenceImage.src = imageSequence[currentFrame];
            console.log('Frame:', currentFrame, '- Immagine:', imageSequence[currentFrame]);
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

    // Smooth scroll per link interni
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animazione event cards quando entrano nel viewport
    const cards = document.querySelectorAll('.event-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    cards.forEach(function(card) {
        observer.observe(card);
    });

    // Button placeholder
    document.querySelectorAll('.btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            alert('Form di iscrizione in arrivo! Torna presto per maggiori informazioni.');
        });
    });

    console.log('✓ Effetto sequenza attivato!');

})();
