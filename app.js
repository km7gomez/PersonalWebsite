// Academic Personal Website JavaScript
// Handles smooth scrolling navigation and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initializeNavigation();
    
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Active section highlighting
    initializeSectionHighlighting();
    
    // Mobile navigation handling
    initializeMobileNavigation();
    
    // Contact form interactions (if needed in future)
    initializeContactInteractions();
    
    console.log('Academic website initialized successfully');
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                scrollToSection(targetSection);
            }
        });
    });
}

/**
 * Initialize smooth scrolling for all anchor links
 */
function initializeSmoothScrolling() {
    // Already handled by CSS scroll-behavior: smooth
    // But we can add custom easing if needed
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#' or empty
            if (!href || href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                scrollToSection(targetElement);
            }
        });
    });
}

/**
 * Smooth scroll to a specific section with offset for fixed header
 */
function scrollToSection(targetSection) {
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = targetSection.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Initialize section highlighting based on scroll position
 */
function initializeSectionHighlighting() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Throttle scroll events for better performance
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                highlightActiveSection(sections, navLinks);
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    // Initial highlight on load
    highlightActiveSection(sections, navLinks);
}

/**
 * Highlight the active section in navigation
 */
function highlightActiveSection(sections, navLinks) {
    const scrollPosition = window.scrollY;
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    let activeSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            activeSection = section.id;
        }
    });
    
    // Update navigation active state
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.substring(1) === activeSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize mobile navigation handling
 */
function initializeMobileNavigation() {
    // Handle mobile navigation collapse on link click
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // On mobile, we might want to close a mobile menu
            // This is placeholder for future mobile menu implementation
            
            // Add a small delay to ensure smooth scrolling starts
            setTimeout(() => {
                // Any mobile-specific navigation handling
            }, 100);
        });
    });
}

/**
 * Initialize contact form interactions and email links
 */
function initializeContactInteractions() {
    // Handle email links with better UX
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add some visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Handle phone links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add some visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Handle external profile links
    const profileLinks = document.querySelectorAll('.profile-link');
    
    profileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Since these are placeholder links, prevent navigation
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Show a message that this is a placeholder
                showTemporaryMessage('Please update this link with your actual profile URL');
            }
        });
    });
}

/**
 * Show a temporary message to the user
 */
function showTemporaryMessage(message) {
    // Create a temporary message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--color-surface);
        color: var(--color-text);
        padding: 12px 16px;
        border-radius: 8px;
        border: 1px solid var(--color-border);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        font-size: var(--font-size-sm);
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    if (!document.querySelector('#temp-message-styles')) {
        const style = document.createElement('style');
        style.id = 'temp-message-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageEl);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

/**
 * Utility function to debounce function calls
 */
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

/**
 * Initialize any animation observers for sections coming into view
 */
function initializeAnimationObservers() {
    // Use Intersection Observer to add subtle animations when sections come into view
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
}

// Initialize animations if desired (commented out by default for simplicity)
// initializeAnimationObservers();