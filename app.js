// SKeta Early Access Ended Page - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize email links
    initializeEmailLinks();
    
    // Initialize responsive navigation
    initializeNavigation();
}

// Scroll effects for header
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => ticking = false, 16); // ~60fps
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Initialize animations on scroll
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero__content, .info-card, .footer__content');
    animateElements.forEach(el => {
        observer.observe(el);
        // Add initial hidden state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .header.scrolled {
            background-color: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        [data-color-scheme="dark"] .header.scrolled,
        @media (prefers-color-scheme: dark) {
            .header.scrolled {
                background-color: rgba(31, 33, 33, 0.98) !important;
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced email functionality
function initializeEmailLinks() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            const originalText = this.textContent;
            this.style.transition = 'color 0.3s ease';
            this.style.color = '#d35100';
            
            // Reset after a moment
            setTimeout(() => {
                this.style.color = '';
            }, 300);
            
            // Optional: Track email clicks (analytics)
            trackEvent('email_click', {
                email: this.getAttribute('href').replace('mailto:', ''),
                page: 'early_access_ended'
            });
        });
    });
}

// Navigation enhancements
function initializeNavigation() {
    const navLink = document.querySelector('.nav__link');
    
    if (navLink) {
        navLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Track navigation click
            trackEvent('navigation_click', {
                link: 'login',
                page: 'early_access_ended'
            });
            
            // Show a subtle message (could redirect in a real app)
            showNotification('Login functionality will be available when we launch!');
        });
    }
}

// Utility function for showing notifications
function showNotification(message, duration = 3000) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: '#d35100',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(211, 81, 0, 0.3)',
        zIndex: '10000',
        fontSize: '14px',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Analytics tracking function (placeholder)
function trackEvent(eventName, properties = {}) {
    // In a real application, this would send data to analytics service
    console.log('Event tracked:', eventName, properties);
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Example: Custom analytics
    if (window.analytics) {
        window.analytics.track(eventName, properties);
    }
}

// Performance optimization: Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap'
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Theme detection and handling
function handleThemePreference() {
    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleThemeChange(e) {
        // Update any theme-specific functionality
        console.log('Theme changed to:', e.matches ? 'dark' : 'light');
    }
    
    mediaQuery.addEventListener('change', handleThemeChange);
    
    // Initial check
    handleThemeChange(mediaQuery);
}

// Error handling
window.addEventListener('error', function(e) {
    console.warn('JavaScript error caught:', e.error);
    // In production, you might want to report this to an error tracking service
});

// Initialize theme handling on load
document.addEventListener('DOMContentLoaded', function() {
    handleThemePreference();
    preloadResources();
});

// Export functions for potential external use
window.SketaApp = {
    showNotification,
    trackEvent
};