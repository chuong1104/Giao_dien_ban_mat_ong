document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Background slideshow functionality - FIXED
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Remove the hardcoded images array - use actual images from HTML
    console.log('Found', slides.length, 'slides');
    
    // Validate existing images instead of replacing them
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img && img.src) {
            console.log(`Slide ${index}:`, img.src);
            
            // Add error handling
            img.onerror = function() {
                console.error('Failed to load:', this.src);
                this.closest('.slide').style.background = 'linear-gradient(135deg, #2c3e50, #34495e)';
            };
            
            img.onload = function() {
                console.log('Loaded successfully:', this.src);
            };
        }
    });
    
    function nextSlide() {
        if (slides.length <= 1) return;
        
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        
        console.log('Active slide:', currentSlide);
    }
    
    // Auto-advance slideshow every 5 seconds
    if (slides.length > 1) {
        setInterval(nextSlide, 5000);
    }
    
    // Cart functionality
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cartItems = localStorage.getItem('cartItems') || 0;
        cartCount.textContent = cartItems;
    }
    
    // Add to cart functionality for product buttons
    const buyButtons = document.querySelectorAll('.btn-primary');
    buyButtons.forEach(button => {
        if (button.textContent.includes('Mua ngay')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get current cart count
                let currentCount = parseInt(cartCount.textContent) || 0;
                currentCount++;
                
                // Update cart count
                cartCount.textContent = currentCount;
                localStorage.setItem('cartItems', currentCount);
                
                // Add visual feedback
                button.style.background = '#28a745';
                button.textContent = 'Đã thêm!';
                
                setTimeout(() => {
                    button.style.background = '';
                    button.textContent = 'Mua ngay';
                }, 1500);
                
                // Animate cart icon
                const cartIcon = document.querySelector('.cart');
                cartIcon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartIcon.style.transform = 'scale(1)';
                }, 200);
            });
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .news-card, .process-step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile menu toggle (for future implementation)
    const createMobileMenu = () => {
        const mobileMenuButton = document.createElement('div');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuButton.style.display = 'none';
        mobileMenuButton.style.fontSize = '1.5rem';
        mobileMenuButton.style.cursor = 'pointer';
        
        // Add mobile menu functionality here when needed
        mobileMenuButton.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('mobile-active');
        });
        
        return mobileMenuButton;
    };
    
    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Apply lazy loading to images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Search functionality (basic implementation)
    const searchIcon = document.querySelector('.search');
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = prompt('Tìm kiếm sản phẩm:');
            if (searchTerm) {
                // Implement search functionality here
                console.log('Searching for:', searchTerm);
                alert(`Đang tìm kiếm: ${searchTerm}`);
            }
        });
    }
    
    // Newsletter signup (if implemented)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Cảm ơn bạn đã đăng ký nhận tin!');
                this.reset();
            }
        });
    }
    
    // Back to top button
    const createBackToTopButton = () => {
        const backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(228, 168, 28, 0.3);
        `;
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
        
        document.body.appendChild(backToTop);
    };
    
    createBackToTopButton();
});

// Additional utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

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
const optimizedScrollHandler = debounce(() => {
    const scrolled = window.scrollY > 50;
    document.querySelector('.header').classList.toggle('scrolled', scrolled);
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);