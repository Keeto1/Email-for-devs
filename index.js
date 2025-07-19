// FAFCODE - Enhanced JavaScript
class FafcodeApp {
    constructor() {
        this.isLoading = true;
        this.init();
    }

    init() {
        this.setupPreloader();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupParallax();
        this.setupFormValidation();
        this.setupKeyboardNavigation();
        this.setupPerformanceOptimizations();
    }

    // Enhanced Preloader with progress
    setupPreloader() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.createElement('div');
        const progressFill = document.createElement('div');
        
        progressBar.className = 'fixed bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-800 rounded-full overflow-hidden';
        progressFill.className = 'h-full bg-gradient-to-r from-orange-500 to-orange-300 rounded-full transition-all duration-300';
        progressFill.style.width = '0%';
        
        progressBar.appendChild(progressFill);
        preloader.appendChild(progressBar);

        // Simulate loading progress
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.transform = 'translateY(-100%)';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        this.isLoading = false;
                        this.triggerAnimations();
                    }, 500);
                }, 500);
            }
            progressFill.style.width = `${progress}%`;
        }, 100);

        // Also hide preloader when page is fully loaded
        window.addEventListener('load', () => {
            if (progress < 100) {
                progress = 100;
                progressFill.style.width = '100%';
            }
        });
    }

    // Enhanced Mobile Menu with animations
    setupMobileMenu() {
        const menuButton = document.getElementById('menuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuIcon = document.getElementById('menuIcon');
        let isMenuOpen = false;

        menuButton.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('animate-fade-in');
                menuIcon.style.transform = 'rotate(90deg)';
                document.body.style.overflow = 'hidden';
                
                // Animate menu items
                const menuItems = mobileMenu.querySelectorAll('a');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('animate-fade-in');
                menuIcon.style.transform = 'rotate(0deg)';
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                menuButton.click();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                menuButton.click();
            }
        });
    }

    // Enhanced Smooth Scrolling with offset
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Enhanced Animation System
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special animations for different elements
                    if (entry.target.classList.contains('feature-card')) {
                        this.animateFeatureCard(entry.target);
                    }
                    
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Add animation classes to existing elements
        document.querySelectorAll('.feature-card').forEach(card => {
            card.classList.add('animate-on-scroll');
        });
    }

    triggerAnimations() {
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero-animate');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    animateFeatureCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    }

    // Enhanced Parallax Effects
    setupParallax() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Form Validation
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.validateForm(form);
            });
        });
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                this.showFieldError(input, 'Please enter a valid email');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
        });
        
        if (isValid) {
            this.submitForm(form);
        }
    }

    showFieldError(input, message) {
        input.classList.add('border-red-500');
        let errorElement = input.parentNode.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message text-red-500 text-sm mt-1 block';
            input.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearFieldError(input) {
        input.classList.remove('border-red-500');
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = '✓ Sent!';
            submitButton.classList.remove('loading');
            submitButton.classList.add('bg-green-500');
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('bg-green-500');
                form.reset();
            }, 2000);
        }, 1500);
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        this.focusSearch();
                        break;
                    case 'm':
                        e.preventDefault();
                        document.getElementById('menuButton')?.click();
                        break;
                }
            }
        });
    }

    focusSearch() {
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadResources();
        
        // Setup service worker if available
        this.setupServiceWorker();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
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

    preloadResources() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
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

    static getRandomColor() {
        const colors = ['#e99b63', '#f5b881', '#f5d5b8'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.fafcodeApp = new FafcodeApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FafcodeApp, Utils };
}