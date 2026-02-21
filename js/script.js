document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       0. MENU HAMBURGUER
       ======================================================== */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');

    function toggleMenu(open) {
        hamburger.classList.toggle('active', open);
        mobileNav.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.contains('open');
        toggleMenu(!isOpen);
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    /* ========================================================
       1. INTERSECTION OBSERVER (ANIMAÇÕES NO SCROLL)
       ======================================================== */
    const animationElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animationElements.forEach(el => {
        scrollObserver.observe(el);
    });

    /* ========================================================
       2. SLIDER DE DEPOIMENTOS
       ======================================================== */
    const track = document.getElementById('sliderTrack');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextSlide');
    const prevButton = document.getElementById('prevSlide');

    let currentIndex = 0;

    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        updateSliderPosition();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        updateSliderPosition();
    });

    setInterval(() => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        updateSliderPosition();
    }, 6000);
});
