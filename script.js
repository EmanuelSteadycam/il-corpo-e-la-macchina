// Effetto scroll - Le auto scompaiono dal basso rivelando l'asfalto
(function() {
    'use strict';
    
    const carsImage = document.getElementById('carsImage');
    
    if (!carsImage) {
        console.error('Layer auto non trovato!');
        return;
    }

    console.log('Effetto due livelli attivo: auto sopra, asfalto sotto');

    function updateCars() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        // Le auto scompaiono progressivamente in 3-4 schermate
        const scrollDuration = windowHeight * 3.5;
        const scrollPercent = Math.min(scrollY / scrollDuration, 1);
        
        // Percentuale di immagine ancora visibile (dall'alto)
        const visibleFromTop = 100 * (1 - scrollPercent);
        
        // Usa clip-path per nascondere progressivamente dal basso
        // inset(top right bottom left)
        carsImage.style.clipPath = `inset(0% 0% ${100 - visibleFromTop}% 0%)`;
        
        // Opacità progressiva per transizione più morbida
        carsImage.style.opacity = Math.max(0, 1 - (scrollPercent * 1.2));
    }

    // Esegui all'avvio
    updateCars();

    // Esegui quando si scrolla
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateCars();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Esegui quando si ridimensiona
    window.addEventListener('resize', updateCars);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animazione event cards
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

})();
