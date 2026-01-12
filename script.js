// Effetto scroll - Le auto scompaiono fila per fila dal basso
(function() {
    'use strict';
    
    const carsImage = document.getElementById('carsImage');
    
    if (!carsImage) {
        console.error('Immagine auto non trovata!');
        return;
    }

    console.log('Immagine caricata. Effetto attivo.');

    function updateCars() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        // Configurazione: le auto scompaiono in 3-4 schermate di scroll
        const scrollDuration = windowHeight * 3.5;
        const scrollPercent = Math.min(scrollY / scrollDuration, 1);
        
        // Calcola quanto dell'immagine rimane visibile
        // 100% = tutta visibile, 0% = tutta invisibile
        const visibleFromTop = 100 * (1 - scrollPercent);
        
        // Crea una maschera sfumata che nasconde le auto dal basso verso l'alto
        // Usiamo un gradiente che parte da trasparente (in basso) a opaco (in alto)
        const fadeHeight = 15; // Altezza della zona di dissolvenza (in %)
        const fadeStart = Math.max(0, visibleFromTop - fadeHeight);
        const fadeEnd = visibleFromTop;
        
        // Crea il gradiente: 
        // - Da 0% a fadeStart: completamente visibile (bianco)
        // - Da fadeStart a fadeEnd: dissolvenza 
        // - Da fadeEnd in poi: completamente nascosto (trasparente)
        const gradient = `linear-gradient(to bottom, 
            rgba(255,255,255,1) 0%, 
            rgba(255,255,255,1) ${fadeStart}%, 
            rgba(255,255,255,0) ${fadeEnd}%,
            rgba(255,255,255,0) 100%)`;
        
        carsImage.style.maskImage = gradient;
        carsImage.style.webkitMaskImage = gradient;
        
        // Opacità globale dell'immagine (opzionale per effetto extra)
        carsImage.style.opacity = Math.max(0.2, 1 - (scrollPercent * 0.3));
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
