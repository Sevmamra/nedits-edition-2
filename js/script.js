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


// Services Carousel Logic - Corrected
(function () {
  const containers = document.querySelectorAll('.services-container');
  const intervalTime = 3000; // 3 seconds

  containers.forEach(container => {
    const carousel = container.querySelector('.services-carousel');
    const cards = Array.from(carousel.querySelectorAll('.service-card'));
    let currentIndex = 0;
    let intervalId;
    let isPaused = false;

    // Set initial card positions
    function updateCardPositions() {
      const cardWidth = cards[0].offsetWidth + 20; // Card width + margin
      const totalCards = cards.length;
      
      const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
      const rightIndex = (currentIndex + 1) % totalCards;
      
      // Reset classes
      cards.forEach(card => card.classList.remove('center', 'left', 'right'));

      // Apply classes
      cards[currentIndex].classList.add('center');
      cards[leftIndex].classList.add('left');
      cards[rightIndex].classList.add('right');

      // Calculate new transform value
      const offset = (currentIndex) * cardWidth;
      carousel.style.transform = `translate(-${offset}px, -50%)`;
    }

    // Auto-move carousel
    function startCarousel() {
      if (isPaused) return;
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCardPositions();
      }, intervalTime);
    }

    // Pause/Play functionality
    function togglePause() {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(intervalId);
        } else {
            startCarousel();
        }
    }

    // Click event on cards
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        // Clear previous active card and remove glow
        const previousActive = carousel.querySelector('.service-card.active');
        if (previousActive) {
          previousActive.classList.remove('active');
        }

        // Add active class and glow to the clicked card
        card.classList.add('active');

        // Pause the carousel
        clearInterval(intervalId);
        isPaused = true;
      });
    });

    // Reset carousel on mouseleave from container
    container.addEventListener('mouseleave', () => {
      // Only restart if not paused by a click
      if (!isPaused) {
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
    const testimonials = document.querySelectorAll('.testimonial');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const testimonial = entry.target;
                const index = Array.from(testimonials).indexOf(testimonial);
                
                // Add the animation class which triggers the CSS animation
                testimonial.classList.add('aos-animate');
                
                // Apply custom transforms based on index for the slide effect
                if (index % 2 === 0) {
                    testimonial.style.transform = 'translateX(-100px)';
                } else {
                    testimonial.style.transform = 'translateX(100px)';
                }
                
                setTimeout(() => {
                    testimonial.style.transition = 'transform 0.6s ease-out';
                    testimonial.style.transform = 'translateX(0)';
                }, 50);

                observer.unobserve(testimonial); // Stop observing after animation
            }
        });
    }, { threshold: 0.1 });

    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '0';
        observer.observe(testimonial);
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
