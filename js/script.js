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


// Updated Carousel Logic
(function() {
  const containers = document.querySelectorAll('.services-category');
  
  containers.forEach(container => {
    const carousel = container.querySelector('.services-carousel');
    const cards = carousel.querySelectorAll('.service-card');
    let currentIndex = 0;
    let intervalId;
    let isPaused = false;

    // Initialize positions
    function updateCards() {
      cards.forEach((card, index) => {
        card.classList.remove('left', 'center', 'right', 'active');
        
        // Calculate positions
        const diff = (index - currentIndex + cards.length) % cards.length;
        
        if (diff === 1) {
          card.classList.add('right');
        } else if (diff === cards.length - 1) {
          card.classList.add('left');
        } else if (index === currentIndex) {
          card.classList.add('center');
        } else {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
        }
      });
    }

    function startCarousel() {
      intervalId = setInterval(() => {
        if (!isPaused) {
          currentIndex = (currentIndex + 1) % cards.length;
          updateCards();
        }
      }, 3000);
    }

    // Handle clicks
    carousel.addEventListener('click', (e) => {
      const card = e.target.closest('.service-card');
      if (!card) return;
      
      if (card.classList.contains('center')) {
        const isActive = card.classList.contains('active');
        cards.forEach(c => c.classList.remove('active'));
        
        if (!isActive) {
          card.classList.add('active');
          isPaused = true;
          clearInterval(intervalId);
        } else {
          isPaused = false;
          startCarousel();
        }
      }
    });

    // Touch support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (Math.abs(touchEndX - touchStartX) > 50) {
        currentIndex = touchEndX < touchStartX ? 
          (currentIndex + 1) % cards.length : 
          (currentIndex - 1 + cards.length) % cards.length;
        updateCards();
      }
    });

    updateCards();
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
