// ===== INDEX PAGE JAVASCRIPT =====

/// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0
    });

    // Initialize testimonial carousel
    initTestimonialCarousel();
});

function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    const cards = carousel ? carousel.querySelectorAll('.testimonial-card') : [];
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!carousel || cards.length === 0) {
        console.log('Carousel not found or no cards available');
        return;
    }

    let current = 0; // Start with first card (index 0)

    console.log('Initializing carousel with', cards.length, 'cards');

    // Initialize carousel state
    function setupInitialState() {
        // Hide all cards first
        cards.forEach((card, index) => {
            card.classList.remove('active');
            card.style.opacity = '0';
            card.style.transform = 'translateX(100%)';
            card.style.position = 'absolute';
            card.style.top = '0';
            card.style.left = '0';
            card.style.width = '100%';
        });

        // Show first card
        const firstCard = cards[0];
        firstCard.classList.add('active');
        firstCard.style.opacity = '1';
        firstCard.style.transform = 'translateX(0)';
        
        console.log('Initial card set to:', firstCard.querySelector('.name').textContent);
    }

    // Animate card transition
    function animateTransition(fromCard, toCard, direction = 'next') {
        console.log('Animating from', fromCard.querySelector('.name').textContent, 'to', toCard.querySelector('.name').textContent);
        
        // Set up the incoming card position
        const startX = direction === 'next' ? '100%' : '-100%';
        const endX = direction === 'next' ? '-100%' : '100%';
        
        toCard.style.opacity = '0';
        toCard.style.transform = `translateX(${startX})`;
        
        // Start animation
        let progress = 0;
        const duration = 600; // 600ms
        const startTime = performance.now();
        
        function animate(currentTime) {
            progress = Math.min((currentTime - startTime) / duration, 1);
            const easeProgress = easeInOut(progress);
            
            // Animate outgoing card
            fromCard.style.opacity = 1 - easeProgress;
            fromCard.style.transform = `translateX(${easeProgress * (direction === 'next' ? -100 : 100)}%)`;
            
            // Animate incoming card
            toCard.style.opacity = easeProgress;
            toCard.style.transform = `translateX(${(1 - easeProgress) * (direction === 'next' ? 100 : -100)}%)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                fromCard.classList.remove('active');
                toCard.classList.add('active');
                
                // Reset positions
                fromCard.style.transform = `translateX(${endX})`;
                toCard.style.transform = 'translateX(0)';
            }
        }
        
        requestAnimationFrame(animate);
    }

    // Easing function
    function easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function slideToNext() {
        if (cards.length <= 1) return;
        
        const currentCard = cards[current];
        const nextIndex = (current + 1) % cards.length;
        const nextCard = cards[nextIndex];
        
        animateTransition(currentCard, nextCard, 'next');
        current = nextIndex;
        
        console.log('Moved to card index:', current);
    }

    function slideToPrev() {
        if (cards.length <= 1) return;
        
        const currentCard = cards[current];
        const prevIndex = (current - 1 + cards.length) % cards.length;
        const prevCard = cards[prevIndex];
        
        animateTransition(currentCard, prevCard, 'prev');
        current = prevIndex;
        
        console.log('Moved to card index:', current);
    }

    // Set up event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', slideToNext);
        console.log('Next button listener added');
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', slideToPrev);
        console.log('Prev button listener added');
    }

    // Initialize the carousel
    setupInitialState();

    // Optional: Auto-advance carousel every 5 seconds
    // setInterval(slideToNext, 5000);
}

// Helper functions (stubs for the missing functions)
function initHeroAnimations() {
    // Add hero animations if needed
    console.log('Hero animations initialized');
}

function initServiceCardHover() {
    // Add service card hover effects if needed
    console.log('Service card hover effects initialized');
}

function initSmoothScrolling() {
    // Add smooth scrolling if needed
    console.log('Smooth scrolling initialized');
}
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