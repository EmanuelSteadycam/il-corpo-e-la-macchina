// Effetto scroll per far scomparire le auto una alla volta dal basso
document.addEventListener('DOMContentLoaded', function() {
    const carsImage = document.getElementById('carsImage');
    let ticking = false;

    // Configurazione dell'effetto - regola questi valori per cambiare la velocità
    const config = {
        startScroll: 0, // Inizia subito
        scrollMultiplier: 0.4 // Quanto velocemente scompaiono le auto (0.4 = più lento, 0.8 = più veloce)
    };

    function updateCarsVisibility() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calcola quanto scrollare prima che le auto scompaiano completamente
        // Più alto il valore, più lento l'effetto
        const totalScrollRange = windowHeight * 3;
        
        // Calcola la percentuale di scroll (0 = inizio, 1 = auto completamente scomparse)
        let scrollProgress = (scrollY * config.scrollMultiplier) / windowHeight;
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Calcola quanto dell'immagine è ancora visibile (100% all'inizio, 0% alla fine)
        const visiblePercentage = 100 - (scrollProgress * 100);
        
        // Applica il clip-path per nascondere l'immagine dal basso verso l'alto
        // inset(top right bottom left)
        carsImage.style.clipPath = `inset(0% 0% ${100 - visiblePercentage}% 0%)`;
        
        // Opzionale: leggero zoom per dare profondità
        const scale = 1 + (scrollProgress * 0.05);
        carsImage.style.transform = `scale(${scale})`;
        
        // Fade out graduale quando scompaiono del tutto
        if (visiblePercentage < 20) {
            carsImage.style.opacity = visiblePercentage / 20;
        } else {
            carsImage.style.opacity = 1;
        }
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateCarsVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Inizializza
    updateCarsVisibility();

    // Listener per lo scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Aggiorna anche al resize
    window.addEventListener('resize', function() {
        updateCarsVisibility();
    });

    // Smooth scroll per eventuali link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animazione delle event cards quando entrano nel viewport
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Osserva tutte le event cards
    document.querySelectorAll('.event-card').forEach(card => {
        observer.observe(card);
    });

    // Placeholder per future funzionalità (form, modali, etc.)
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Qui verrà aggiunto il comportamento del form di iscrizione
            console.log('Button clicked - form integration coming soon');
            alert('Form di iscrizione in arrivo! Torna presto per maggiori informazioni.');
        });
    });
});
