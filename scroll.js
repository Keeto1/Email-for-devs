// FAFCODE - Enhanced Scroll Effects
class ScrollEffects {
    constructor() {
        this.header = document.getElementById('header');
        this.scrollPosition = 0;
        this.ticking = false;
        this.init();
    }

    init() {
        this.setupScrollListener();
        this.setupHeaderEffects();
        this.setupProgressBar();
        this.setupScrollToTop();
        this.setupSectionHighlighting();
        this.setupParallaxElements();
    }

    setupScrollListener() {
        const throttledScroll = this.throttle(() => {
            this.scrollPosition = window.pageYOffset;
            this.updateScrollEffects();
        }, 16); // ~60fps

        window.addEventListener('scroll', throttledScroll, { passive: true });
    }

    updateScrollEffects() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateHeader();
                this.updateProgressBar();
                this.updateParallax();
                this.updateScrollAnimations();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    // Enhanced Header Effects
    setupHeaderEffects() {
        this.headerHeight = this.header.offsetHeight;
        this.lastScrollTop = 0;
        this.headerVisible = true;
    }

    updateHeader() {
        const currentScroll = this.scrollPosition;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScroll > this.lastScrollTop && currentScroll > this.headerHeight) {
            // Scrolling down
            if (this.headerVisible) {
                this.hideHeader();
            }
        } else {
            // Scrolling up
            if (!this.headerVisible) {
                this.showHeader();
            }
        }

        this.lastScrollTop = currentScroll;
    }

    hideHeader() {
        this.header.style.transform = 'translateY(-100%)';
        this.headerVisible = false;
    }

    showHeader() {
        this.header.style.transform = 'translateY(0)';
        this.headerVisible = true;
    }

    // Reading Progress Bar
    setupProgressBar() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-300 z-50 transition-all duration-300';
        this.progressBar.style.width = '0%';
        document.body.appendChild(this.progressBar);
    }

    updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPercentage = (this.scrollPosition / documentHeight) * 100;
        
        this.progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
    }

    // Scroll to Top Button
    setupScrollToTop() {
        this.scrollTopBtn = document.createElement('button');
        this.scrollTopBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        `;
        this.scrollTopBtn.className = `
            fixed bottom-8 right-8 w-12 h-12 bg-orange-500 hover:bg-orange-600 
            text-white rounded-full shadow-lg transition-all duration-300 
            flex items-center justify-center z-40 opacity-0 translate-y-4 
            pointer-events-none
        `;
        this.scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        
        this.scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.body.appendChild(this.scrollTopBtn);
        
        // Show/hide based on scroll position
        this.updateScrollTopButton();
    }

    updateScrollTopButton() {
        if (this.scrollPosition > 300) {
            this.scrollTopBtn.style.opacity = '1';
            this.scrollTopBtn.style.transform = 'translateY(0)';
            this.scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            this.scrollTopBtn.style.opacity = '0';
            this.scrollTopBtn.style.transform = 'translateY(16px)';
            this.scrollTopBtn.style.pointerEvents = 'none';
        }
    }

    // Section Highlighting in Navigation
    setupSectionHighlighting() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        this.updateActiveSection();
    }

    updateActiveSection() {
        const scrollPos = this.scrollPosition + 100; // Offset for header
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.setActiveNavItem(sectionId);
            }
        });
    }

    setActiveNavItem(activeId) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('text-orange-500');
            } else {
                link.classList.remove('text-orange-500');
            }
        });
    }

    // Parallax Elements
    setupParallaxElements() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
    }

    updateParallax() {
        this.parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(this.scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Scroll Animations
    updateScrollAnimations() {
        // Update any scroll-based animations here
        this.updateScrollTopButton();
        this.updateActiveSection();
    }

    // Advanced Smooth Scrolling
    smoothScrollTo(targetPosition, duration = 1000) {
        const startPosition = this.scrollPosition;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const easeInOutQuart = (t) => {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const ease = easeInOutQuart(progress);
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    // Intersection Observer for Animations
    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animations for child elements
                    const children = entry.target.querySelectorAll('.stagger-animate');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe elements
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => this.scrollObserver.observe(el));
    }

    // Utility Methods
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Public Methods
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const targetPosition = section.offsetTop - this.headerHeight;
            this.smoothScrollTo(targetPosition);
        }
    }

    destroy() {
        // Clean up event listeners
        window.removeEventListener('scroll', this.updateScrollEffects);
        this.scrollObserver?.disconnect();
        this.progressBar?.remove();
        this.scrollTopBtn?.remove();
    }
}

// Initialize scroll effects
document.addEventListener('DOMContentLoaded', () => {
    window.scrollEffects = new ScrollEffects();
});

// Handle resize events
window.addEventListener('resize', () => {
    if (window.scrollEffects) {
        window.scrollEffects.headerHeight = window.scrollEffects.header.offsetHeight;
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollEffects;
}