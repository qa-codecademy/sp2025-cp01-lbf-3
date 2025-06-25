// ===== ABOUT PAGE JAVASCRIPT =====

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize accordion functionality
    initializeAccordion();
    
    // Initialize sticky CTA behavior
    initializeStickyCTA();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
});

// ===== ACCORDION FUNCTIONALITY =====
function initializeAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            toggleAccordion(this);
        });
        
        // Add keyboard support
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(this);
            }
        });
    });
}

// Toggle accordion item
function toggleAccordion(header) {
    const accordionItem = header.parentElement;
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.accordion-toggle');
    
    // Close all other accordion items
    const allAccordionItems = document.querySelectorAll('.accordion-item');
    allAccordionItems.forEach(item => {
        if (item !== accordionItem) {
            const itemHeader = item.querySelector('.accordion-header');
            const itemContent = item.querySelector('.accordion-content');
            const itemToggle = item.querySelector('.accordion-toggle');
            
            itemHeader.classList.remove('active');
            itemContent.classList.remove('active');
            itemToggle.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current item
    const isActive = header.classList.contains('active');
    
    if (isActive) {
        header.classList.remove('active');
        content.classList.remove('active');
        toggle.style.transform = 'rotate(0deg)';
    } else {
        header.classList.add('active');
        content.classList.add('active');
        toggle.style.transform = 'rotate(180deg)';
    }
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
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

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.vision-card, .mission-card, .value-card, .benefit-item');
    animateElements.forEach(el => observer.observe(el));
}

// ===== RESPONSIVE ACCORDION HEIGHT ADJUSTMENT =====
window.addEventListener('resize', function() {
    const activeAccordion = document.querySelector('.accordion-item.active');
    if (activeAccordion) {
        const content = activeAccordion.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
});

// ===== ENHANCED ACCESSIBILITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels and roles for accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        // Add ARIA attributes
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-controls', `accordion-content-${index}`);
        
        content.setAttribute('id', `accordion-content-${index}`);
        content.setAttribute('role', 'region');
        content.setAttribute('aria-labelledby', `accordion-header-${index}`);
        
        // Update ARIA attributes on toggle
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);
        });
    });
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
const optimizedScrollHandler = debounce(function() {
    // Any scroll-based functionality can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.warn('About page error:', e.error);
    // You can add error reporting here
});

// ===== ANALYTICS TRACKING (OPTIONAL) =====
function trackAccordionInteraction(sectionName) {
    // Track accordion interactions for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'accordion_interaction', {
            'event_category': 'engagement',
            'event_label': sectionName
        });
    }
}

// Add tracking to accordion clicks
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const sectionName = this.querySelector('h3').textContent;
            trackAccordionInteraction(sectionName);
        });
    });
});

// ===== PRINT STYLES SUPPORT =====
window.addEventListener('beforeprint', function() {
    // Expand all accordion items for printing
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Reset accordion state after printing
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const content = item.querySelector('.accordion-content');
        if (!item.classList.contains('active')) {
            content.style.maxHeight = '0';
        }
    });
});

// Sticky CTA functionality
function initializeStickyCTA() {
    const stickyCTA = document.querySelector('.sticky-cta');
    const footer = document.querySelector('#main-footer');
    
    if (stickyCTA && footer) {
        window.addEventListener('scroll', function() {
            const footerTop = footer.offsetTop;
            const windowBottom = window.pageYOffset + window.innerHeight;
            
            // Hide sticky CTA when footer is visible
            if (windowBottom > footerTop - 100) {
                stickyCTA.style.transform = 'translateY(100%)';
                stickyCTA.style.opacity = '0';
            } else {
                stickyCTA.style.transform = 'translateY(0)';
                stickyCTA.style.opacity = '1';
            }
        });
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeLazyLoading();
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
    
    // Add hover effects for value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Export functions for global access (if needed)
window.aboutFunctions = {
    toggleAccordion
};

// Add smooth reveal animation for mission/vision cards
function revealCards() {
    const cards = document.querySelectorAll('.vision-card, .mission-card');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.3
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}

// Initialize card reveal animations
document.addEventListener('DOMContentLoaded', function() {
    revealCards();
});

// Add parallax effect to hero section
function initializeParallax() {
    const hero = document.querySelector('.about-hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', function() {
    initializeParallax();
}); 