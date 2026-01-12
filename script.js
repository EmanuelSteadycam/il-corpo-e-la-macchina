// Effetto scroll per far scomparire le auto una alla volta dal basso
document.addEventListener('DOMContentLoaded', function() {
    const carsImage = document.getElementById('carsImage');
    let lastScrollY = 0;
    let ticking = false;

    // Configurazione dell'effetto
    const config = {
        startScroll: 100, // Inizia l'effetto dopo 100px di scroll
        scrollRange: 2000, // Completa l'effetto in 2000px di scroll
        minClip: 0, // Percentuale minima visibile (0%)
        maxClip: 100 // Percentuale massima visibile (100%)
    };

    function updateCarsVisibility(scrollY) {
        // Calcola la percentuale di scroll nell'intervallo definito
        const scrollProgress = Math.max(0, Math.min(1, 
            (scrollY - config.startScroll) / config.scrollRange
        ));

        // Calcola quanto dell'immagine rimane visibile (dal basso verso l'alto)
        // 100% = tutto visibile, 0% = tutto nascosto
        const visiblePercentage = config.maxClip - (scrollProgress * (config.maxClip - config.minClip));

        // Applica il clip-path per mostrare solo la parte superiore dell'immagine
        // inset(top right bottom left)
        const bottomClip = 100 - visiblePercentage;
        carsImage.style.clipPath = `inset(0% 0% ${bottomClip}% 0%)`;

        // Opzionale: aggiungi un leggero effetto di scala per maggiore dinamismo
        const scale = 1 + (scrollProgress * 0.1);
        carsImage.style.transform = `scale(${scale})`;
    }

    function onScroll() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateCarsVisibility(lastScrollY);
                ticking = false;
            });
            ticking = true;
        }
    }

    // Inizializza l'effetto
    updateCarsVisibility(window.scrollY);

    // Listener per lo scroll
    window.addEventListener('scroll', onScroll, { passive: true });

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

// Gestione del resize per mantenere l'effetto corretto
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const carsImage = document.getElementById('carsImage');
        const scrollY = window.scrollY;
        
        // Ricrea l'effetto con le nuove dimensioni
        const config = {
            startScroll: 100,
            scrollRange: 2000,
            minClip: 0,
            maxClip: 100
        };

        const scrollProgress = Math.max(0, Math.min(1, 
            (scrollY - config.startScroll) / config.scrollRange
        ));

        const visiblePercentage = config.maxClip - (scrollProgress * (config.maxClip - config.minClip));
        const bottomClip = 100 - visiblePercentage;
        
        carsImage.style.clipPath = `inset(0% 0% ${bottomClip}% 0%)`;
    }, 250);
});
