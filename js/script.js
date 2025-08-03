// AOS Init
AOS.init();

// About section typewriter
document.addEventListener('DOMContentLoaded', function () {
    const about = document.getElementById('about-text');
    if (about) {
        const full = about.textContent;
        about.textContent = '';
        let i = 0;
        function type() {
            if (i < full.length) {
                about.textContent += full.charAt(i++);
                setTimeout(type, 25);
            }
        }
        // Start typewriter only when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                type();
                observer.disconnect(); // Stop observing once it's in view
            }
        });
        observer.observe(about);
    }
});

// Hero slideshow random + overlay
(function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const imgs = [
        'images/hero-bg1.jpg',
        'images/hero-bg2.jpg',
        'images/hero-bg3.jpg',
        'images/hero-bg4.jpg',
        'images/hero-bg5.jpg',
        'images/hero-bg6.jpg'
    ];
    let pool = [...imgs];

    function nextBg() {
        if (pool.length === 0) pool = [...imgs];
        const idx = Math.floor(Math.random() * pool.length);
        const sel = pool.splice(idx, 1)[0];
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${sel}')`;
    }

    nextBg();
    setInterval(nextBg, 3000);
})();


// Services Carousel Logic - Corrected & Updated for new animation
(function () {
    const containers = document.querySelectorAll('.services-category');
    const intervalTime = 3000; // 3 seconds

    containers.forEach(container => {
        const carousel = container.querySelector('.services-carousel');
        const cards = Array.from(carousel.querySelectorAll('.service-card'));
        const totalCards = cards.length;
        let currentIndex = 0;
        let intervalId;
        let isPaused = false;
        let isAnimating = false;

        function updateCardPositions() {
            if (isAnimating) return;
            isAnimating = true;

            cards.forEach(card => card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)');

            const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
            const rightIndex = (currentIndex + 1) % totalCards;

            // Update classes for all cards
            cards.forEach((card, index) => {
                card.classList.remove('center', 'left', 'right', 'active', 'leaving-left', 'entering-right');
                
                if (index === leftIndex) {
                    card.classList.add('left');
                } else if (index === currentIndex) {
                    card.classList.add('center');
                } else if (index === rightIndex) {
                    card.classList.add('right');
                } else {
                    // Hide other cards immediately without animation
                    card.style.transition = 'none';
                    card.style.transform = 'translate(-50%, -50%) scale(0.6)';
                    card.style.opacity = '0';
                }
            });

            setTimeout(() => {
                isAnimating = false;
            }, 800); // Match this with your CSS transition duration
        }
        
        // Auto-move carousel
        function startCarousel() {
            if (isPaused) return;
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateCardPositions();
            }, intervalTime);
        }

        // Click event on cards (for glow & navigation)
        carousel.addEventListener('click', (event) => {
            const clickedCard = event.target.closest('.service-card');
            if (!clickedCard || isAnimating) return;

            clearInterval(intervalId);
            isPaused = true;

            if (clickedCard.classList.contains('center')) {
                clickedCard.classList.toggle('active');
            } else {
                const clickedIndex = cards.indexOf(clickedCard);
                currentIndex = clickedIndex;
                updateCardPositions();
            }

            const anyActiveCard = carousel.querySelector('.service-card.active');
            if (!anyActiveCard) {
                isPaused = false;
                startCarousel();
            }
        });

        // Deselect and restart animation on any click outside the cards
        document.addEventListener('click', (event) => {
            const isClickedOnCarousel = event.target.closest('.services-category');
            if (!isClickedOnCarousel && isPaused) {
                const activeCard = carousel.querySelector('.service-card.active');
                if (activeCard) {
                    activeCard.classList.remove('active');
                }
                isPaused = false;
                startCarousel();
            }
        });

        // Initial setup
        updateCardPositions();
        startCarousel();
    });
})();

// Testimonials slide animation
(function () {
  const tests = document.querySelectorAll('.testimonial');

  window.addEventListener('scroll', () => {
    tests.forEach((t, i) => {
      if (t.getBoundingClientRect().top < window.innerHeight - 50 && !t.classList.contains('shown')) {
        t.classList.add('shown');
        t.style.transform = (i % 2 === 0) ? 'translateX(-100px)' : 'translateX(100px)';
        setTimeout(() => {
          t.style.transition = 'all 0.6s';
          t.style.transform = 'translateX(0)';
          t.style.opacity = '1';
        }, 50);
      }
    });
  });
})();

// Header Title Animation on Scroll (New!)
(function () {
    const h2Titles = document.querySelectorAll('.section h2');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    h2Titles.forEach(h2 => {
        observer.observe(h2);
    });
})();
