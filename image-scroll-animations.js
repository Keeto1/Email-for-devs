// Image Scroll Animations Library
// Easy to integrate with existing Tailwind CSS projects

class ImageScrollAnimations {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            enableParallax: false,
            parallaxSpeed: 0.3,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.setupObserver();
        this.observeElements();
        
        if (this.options.enableParallax) {
            this.setupParallax();
        }
    }
    
    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });
    }
    
    observeElements() {
        // Observe elements with scroll-animate class
        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach(el => this.observer.observe(el));
    }
    
    animateElement(element) {
        const animation = element.dataset.animation || 'fade-in';
        const delay = parseInt(element.dataset.delay) || 0;
        const duration = element.dataset.duration || '800ms';
        
        setTimeout(() => {
            // Apply animation based on type
            switch(animation) {
                case 'fade-in':
                    this.fadeIn(element, duration);
                    break;
                case 'slide-up':
                    this.slideUp(element, duration);
                    break;
                case 'slide-left':
                    this.slideLeft(element, duration);
                    break;
                case 'slide-right':
                    this.slideRight(element, duration);
                    break;
                case 'zoom-in':
                    this.zoomIn(element, duration);
                    break;
                case 'bounce-in':
                    this.bounceIn(element, duration);
                    break;
                case 'rotate-in':
                    this.rotateIn(element, duration);
                    break;
                default:
                    this.fadeIn(element, duration);
            }
            
            // Stop observing once animated
            this.observer.unobserve(element);
        }, delay);
    }
    
    // Animation methods
    fadeIn(element, duration) {
        element.style.transition = `opacity ${duration} ease-out`;
        element.style.opacity = '1';
    }
    
    slideUp(element, duration) {
        element.style.transition = `all ${duration} ease-out`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
    
    slideLeft(element, duration) {
        element.style.transition = `all ${duration} ease-out`;
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }
    
    slideRight(element, duration) {
        element.style.transition = `all ${duration} ease-out`;
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }
    
    zoomIn(element, duration) {
        element.style.transition = `all ${duration} ease-out`;
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }
    
    bounceIn(element, duration) {
        element.style.transition = `all ${duration} cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }
    
    rotateIn(element, duration) {
        element.style.transition = `all ${duration} ease-out`;
        element.style.opacity = '1';
        element.style.transform = 'rotate(0deg) scale(1)';
    }
    
    setupParallax() {
        window.addEventListener('scroll', () => {
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                const speed = element.dataset.speed || this.options.parallaxSpeed;
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
    }
    
    // Utility method to add animation to new elements
    addAnimation(element, animation = 'fade-in', delay = 0) {
        element.classList.add('scroll-animate');
        element.dataset.animation = animation;
        element.dataset.delay = delay;
        this.observer.observe(element);
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with default options
    new ImageScrollAnimations({
        enableParallax: true
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageScrollAnimations;
}