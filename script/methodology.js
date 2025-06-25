// Methodology Page JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize tab functionality
    initializeTabs();
    
    // Initialize smooth scrolling for pillar cards
    initializeSmoothScrolling();
    
    // Initialize sticky CTA behavior
    initializeStickyCTA();
});

// Tab functionality for wellbeing section
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('#main-header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize smooth scrolling for pillar CTA buttons
function initializeSmoothScrolling() {
    const pillarCTAs = document.querySelectorAll('.pillar-cta');
    
    pillarCTAs.forEach(cta => {
        cta.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            scrollToSection(sectionId);
        });
    });
}

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

// Tab switching function (for onclick handlers)
function openTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Remove active class from all buttons and panes
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Add active class to target button and pane
    const targetButton = document.querySelector(`[onclick="openTab('${tabName}')"]`);
    const targetPane = document.getElementById(tabName);
    
    if (targetButton && targetPane) {
        targetButton.classList.add('active');
        targetPane.classList.add('active');
    }
}

// Intersection Observer for scroll animations
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
    const animateElements = document.querySelectorAll('.pillar-card, .element-card, .wellbeing-item, .instructor-card, .journey-step');
    animateElements.forEach(el => observer.observe(el));
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

// Keyboard navigation for tabs
function initializeKeyboardNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Performance optimization: Debounce scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Any scroll-based functionality can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeLazyLoading();
    initializeKeyboardNavigation();
    
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
});

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('Methodology page error:', e.error);
});

// Export functions for global access (if needed)
window.methodologyFunctions = {
    scrollToSection,
    openTab
}; 