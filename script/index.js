// ===== INDEX PAGE JAVASCRIPT =====

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0
    });

    // Initialize other interactive features
    initHeroAnimations();
    initServiceCardHover();
    initSmoothScrolling();

    // Testimonial Carousel Logic
    const carousel = document.querySelector('.testimonial-carousel');
    const card = carousel ? carousel.querySelector('.testimonial-card') : null;
    const cardContent = card ? card.querySelector('.card-content') : null;
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let current = 0;

    // Array of testimonials
    const testimonials = [
      {
        avatar: '/assets/images/60111.jpg',
        name: 'Chris Tucked',
        text: '„Долги години се соочував со предизвици и сомнежи, но никогаш не се откажав од своите цели. Благодарение на посветеноста и поддршката што ја добив, денес сум тука – исполнет, мотивиран и подготвен за нови успеси. Секоја пречка беше лекција, а секој пад – чекор напред.“',
        stars: 5
      },
      {
        avatar: '/assets/images/60111.jpg',
        name: 'Ana Petrova',
        text: '„Програмата ми помогна да стекнам нови вештини и самодоверба. Инструкторите беа секогаш тука за поддршка и инспирација. Сега верувам во себе и во моите можности.“',
        stars: 5
      },
      {
        avatar: '/assets/images/60111.jpg',
        name: 'Marko Iliev',
        text: '„Одлично искуство! Се запознав со многу нови пријатели и научив како да работам во тим. Секоја сесија беше забавна и едукативна.“',
        stars: 5
      }
    ];

    function renderTestimonial(index) {
      if (!cardContent) return;
      cardContent.style.opacity = '0';
      cardContent.style.visibility = 'hidden';
      const t = testimonials[index];
      cardContent.innerHTML = `
        <img src="${t.avatar}" alt="Avatar" class="avatar">
        <h3 class="name">${t.name}</h3>
        <p class="text">${t.text}</p>
        <div class="stars">${'★ '.repeat(t.stars).trim()}</div>
      `;
    }

    function fadeInCardContent() {
      if (!cardContent) return;
      setTimeout(() => {
        cardContent.style.visibility = 'visible';
        cardContent.style.opacity = '1';
      }, 50);
    }

    if (card && cardContent) {
      renderTestimonial(current);
      fadeInCardContent();
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
          current = (current - 1 + testimonials.length) % testimonials.length;
          carousel.classList.add('flipping');
          cardContent.style.opacity = '0';
          cardContent.style.visibility = 'hidden';
          setTimeout(() => {
            carousel.classList.remove('flipping');
            renderTestimonial(current);
            fadeInCardContent();
          }, 600);
        });
        nextBtn.addEventListener('click', function() {
          current = (current + 1) % testimonials.length;
          carousel.classList.add('flipping');
          cardContent.style.opacity = '0';
          cardContent.style.visibility = 'hidden';
          setTimeout(() => {
            carousel.classList.remove('flipping');
            renderTestimonial(current);
            fadeInCardContent();
          }, 600);
        });
      }
    }

    // Language Switcher Logic
    const langFlagBtn = document.getElementById('lang-flag-btn');
    const langMenu = document.getElementById('lang-menu');
    const langFlag = document.getElementById('current-flag');
    const langOptions = document.querySelectorAll('.lang-option');
    const navHamburger = document.querySelector('.nav-hamburger');
    const mainNav = document.querySelector('.main-nav');

    // Toggle nav on mobile
    if (navHamburger && mainNav) {
      navHamburger.addEventListener('click', function(e) {
        mainNav.classList.toggle('open');
        e.stopPropagation();
      });
      document.addEventListener('click', function() {
        mainNav.classList.remove('open');
      });
    }

    // Toggle language menu
    if (langFlagBtn && langMenu && langFlag && langOptions.length) {
      langFlagBtn.addEventListener('click', function(e) {
        langMenu.classList.toggle('active');
        e.stopPropagation();
      });
      document.addEventListener('click', function() {
        langMenu.classList.remove('active');
      });
      langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
          e.stopPropagation();
          const lang = this.getAttribute('data-lang');
          if (lang === 'mk') {
            langFlag.src = '../assets/images/mk-flag.png';
            langFlag.alt = 'Macedonian Flag';
          } else if (lang === 'al') {
            langFlag.src = '../assets/images/al-flag.png';
            langFlag.alt = 'Albanian Flag';
          }
          langMenu.classList.remove('active');
        });
      });
    }
});

// ===== HERO SECTION ANIMATIONS =====
function initHeroAnimations() {
    const heroImage = document.querySelector('.hero-image img');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroImage && heroContent) {
        // Add parallax effect to hero image
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px) scale(1.02)`;
        });
        
        // Add typing effect to hero title (optional)
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.8s ease';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 300);
        }
    }
}

// ===== SERVICE CARDS HOVER EFFECTS =====
function initServiceCardHover() {
    const serviceCards = document.querySelectorAll('.index-service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
        });
    });
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('#main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ADDITIONAL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for service cards
                if (entry.target.classList.contains('services-grid')) {
                    const cards = entry.target.querySelectorAll('.index-service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that need animation
    const animateElements = document.querySelectorAll('.services-grid, .programs .cards, .about');
    animateElements.forEach(el => observer.observe(el));
});

// ===== FORM ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Add floating label effect
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
        
        // Form submission enhancement
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Се испраќа...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitBtn.textContent = 'Испратено!';
                submitBtn.style.background = 'var(--secondary-green)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScrollHandler = debounce(() => {
    // Any scroll-based functionality can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Index page error:', e.error);
    // You can add error reporting here
});

// ===== ANALYTICS TRACKING (OPTIONAL) =====
function trackPageInteraction(interactionType, elementName) {
    // Track page interactions for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_interaction', {
            'event_category': 'engagement',
            'event_label': `${interactionType}_${elementName}`
        });
    }
}

// Add tracking to various interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track service card clicks
    const serviceCards = document.querySelectorAll('.index-service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            trackPageInteraction('service_click', serviceName);
        });
    });
    
    // Track program card clicks
    const programCards = document.querySelectorAll('.programs .card');
    programCards.forEach(card => {
        card.addEventListener('click', function() {
            const programName = this.querySelector('h3').textContent;
            trackPageInteraction('program_click', programName);
        });
    });
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-main');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackPageInteraction('cta_click', buttonText);
        });
    });
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for service cards
    const serviceCards = document.querySelectorAll('.index-service-card');
    serviceCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-regular)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// ===== PRINT STYLES SUPPORT =====
window.addEventListener('beforeprint', function() {
    // Ensure all content is visible for printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    // Remove print-specific styles
    document.body.classList.remove('printing');
}); 