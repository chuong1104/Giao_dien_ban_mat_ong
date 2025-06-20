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

    // Background slideshow functionality - Optimized for compact banner
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    console.log('Slideshow initialization:', slides.length, 'slides found');
    
    // Don't override existing images - just work with what's in HTML
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img) {
            console.log(`Slide ${index} image:`, img.src);
            
            // Ensure image covers the container properly for compact banner
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center 40%'; // Show more of the image
            
            // Add error handling for images
            img.addEventListener('error', function() {
                console.error(`Failed to load image: ${this.src}`);
                // Set a fallback background with lighter gradient
                const slideElement = this.closest('.slide');
                slideElement.style.background = 'linear-gradient(135deg, #f39c12, #e67e22, #d35400)';
                slideElement.style.backgroundSize = 'cover';
                this.style.display = 'none';
            });
            
            img.addEventListener('load', function() {
                console.log(`Successfully loaded: ${this.src}`);
                // Ensure proper sizing after load for compact banner
                this.style.width = '100%';
                this.style.height = '100%';
                this.style.objectFit = 'cover';
                this.style.objectPosition = 'center 40%';
                
                // Add a subtle animation when image loads
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.5s ease-in-out';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 100);
            });
            
            // Preload images for better performance
            if (!img.complete) {
                img.style.opacity = '0';
            }
        }
    });
    
    function nextSlide() {
        if (slides.length <= 1) return;
        
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new current slide
        slides[currentSlide].classList.add('active');
        
        console.log('Switched to slide:', currentSlide);
    }
    
    // Start slideshow if we have multiple slides - slower interval for compact banner
    if (slides.length > 1) {
        setInterval(nextSlide, 6000); // Slower transition for compact size
        console.log('Slideshow started with', slides.length, 'slides');
    }
    
    // Cart functionality
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cartItems = localStorage.getItem('cartItems') || 0;
        cartCount.textContent = cartItems;
    }
    
    // Enhanced add to cart functionality for product buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            // Attempt to get product name robustly
            let productName = "Sản phẩm"; // Default name
            const productCard = this.closest('.product-card');
            if (productCard) {
                const titleElement = productCard.querySelector('.product-title a, .product-title'); // Check for link or direct title
                if (titleElement) {
                    productName = titleElement.textContent.trim();
                }
            }
            
            // Add to cart logic
            let cartItems = getCartItemsFromLocalStorage(); // Use robust getter
            
            const existingItem = cartItems.find(item => item.productId == productId); // Use == for potential string/number comparison if IDs are mixed
            
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 0) + 1;
            } else {
                cartItems.push({
                    productId: parseInt(productId),
                    quantity: 1
                });
            }
            
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            updateHeaderCartCount();
            
            this.innerHTML = '<i class="fas fa-check"></i> Đã thêm';
            this.classList.add('added');
            
            setTimeout(() => {
                this.innerHTML = 'Thêm vào giỏ';
                this.classList.remove('added');
            }, 2000);
            
            // Use the global notification function
            window.showNotification(`Đã thêm ${productName} vào giỏ hàng`, 'success');
        });
    });

    // Function to update cart count in header
    function updateHeaderCartCount() {
        const cartItems = getCartItemsFromLocalStorage(); // Use the robust helper function
        const totalItems = cartItems.reduce((sum, item) => {
            // Ensure item and item.quantity are valid before adding
            if (item && typeof item.quantity === 'number') {
                return sum + item.quantity;
            }
            return sum;
        }, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
            if (totalItems > 0) {
                el.style.display = 'flex'; // Or 'block' or as appropriate
            } else {
                el.style.display = 'none';
            }
        });
    }

    // Initial cart count update
    updateHeaderCartCount();

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
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
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .news-card, .process-step');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Product slider functionality
    setupSlider('.products-grid', '.prev-btn', '.next-btn', 4);
    
    // News slider functionality
    setupSlider('.news-grid', '.news-prev-btn', '.news-next-btn', 3);
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Enhanced mobile menu functionality for all pages
    function initializeMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const header = document.querySelector('.header');
        
        if (mobileToggle && navMenu) {
            // Toggle mobile menu
            mobileToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking on nav links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!header.contains(e.target) && navMenu.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }
    
    // Enhanced header scroll effect for all pages
    function initializeHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        function updateHeader() {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Auto-hide header on scroll down, show on scroll up
            if (scrollY > 200) {
                if (scrollY > lastScrollY && scrollY > 300) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // Initialize header functionality for all pages
    initializeMobileMenu();
    initializeHeaderScroll();

    // Newsletter signup
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"], input[type="text"]'); // More robust selector
            if (emailInput) {
                const email = emailInput.value;
                if (validateEmail(email)) {
                    window.showNotification('Cảm ơn bạn đã đăng ký nhận tin!', 'success'); // Use global
                    this.reset();
                } else {
                    window.showNotification('Vui lòng nhập email hợp lệ!', 'error'); // Use global
                }
            }
        });
    }
    
    // Mobile menu toggle
    const createMobileMenu = () => {
        const header = document.querySelector('.header');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile toggle button if it doesn't exist
        if (!document.querySelector('.mobile-menu-toggle')) {
            const mobileToggle = document.createElement('div');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = `
                <span class="menu-bar"></span>
                <span class="menu-bar"></span>
                <span class="menu-bar"></span>
            `;
            
            // Insert before the logo
            header.querySelector('.main-nav').insertBefore(mobileToggle, header.querySelector('.logo'));
            
            // Event listener for toggle
            mobileToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    };
    
    // Call mobile menu creation for responsive design
    createMobileMenu();
    
    // Responsive menu handling
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        }
    }, 200));
});

// Slider functionality
function setupSlider(gridSelector, prevBtnSelector, nextBtnSelector, itemsPerPage) {
    const grid = document.querySelector(gridSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    
    if (!grid || !prevBtn || !nextBtn) return;
    
    const items = grid.children;
    const itemCount = items.length;
    let currentPage = 0;
    let itemsToShow = getItemsPerPage();
    
    // Initial setup
    updateSlider();
    
    // Window resize handler
    window.addEventListener('resize', debounce(function() {
        itemsToShow = getItemsPerPage();
        updateSlider();
    }, 200));
    
    // Button event listeners
    prevBtn.addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentPage < Math.ceil(itemCount / itemsToShow) - 1) {
            currentPage++;
            updateSlider();
        }
    });
    
    // Update slider display
    function updateSlider() {
        const offset = -currentPage * (100 / Math.ceil(itemCount / itemsToShow));
        grid.style.transform = `translateX(${offset}%)`;
        
        // Update button states
        prevBtn.disabled = currentPage === 0;
        prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
        
        const maxPage = Math.ceil(itemCount / itemsToShow) - 1;
        nextBtn.disabled = currentPage >= maxPage;
        nextBtn.style.opacity = currentPage >= maxPage ? '0.5' : '1';
        
        // Adjust grid template columns
        grid.style.gridTemplateColumns = `repeat(${itemCount}, minmax(${100/itemsToShow}%, 1fr))`;
        grid.style.width = `${(itemCount / itemsToShow) * 100}%`;
    }
    
    // Determine items per page based on screen size
    function getItemsPerPage() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 992) return 3;
        return itemsPerPage;
    }
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// Email validation
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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

// Add CSS for notifications
document.head.insertAdjacentHTML('beforeend', `
<style>
.notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 20px;
    background: white; /* Default background */
    color: #333; /* Default text color */
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 9999;
    opacity: 0;
    transform: translateY(20px); /* Start off-screen for slide-up effect */
    transition: all 0.3s ease-in-out;
    max-width: 350px;
    min-width: 300px; /* Ensure a minimum width */
}

.notification.show {
    opacity: 1;
    transform: translateY(0); /* Slide into view */
}

.notification.success {
    background-color: #4CAF50; /* Green background for success */
    color: white; /* White text for success */
    border-left: none; /* Override any other border styles */
}

.notification.error {
    background-color: #F44336; /* Red background for error */
    color: white; /* White text for error */
    border-left: none;
}

.notification.warning {
    background-color: #ff9800; /* Orange background for warning */
    color: white; /* White text for warning */
    border-left: none;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1;
}

.notification-content i {
    font-size: 1.2rem;
    /* Default icon color will be inherited or can be set here */
}

.notification.success .notification-content i,
.notification.error .notification-content i,
.notification.warning .notification-content i {
    color: white; /* Ensure icons are white on colored backgrounds */
}

.notification-close {
    background: none;
    border: none;
    color: #aaa; /* Default close button color */
    cursor: pointer;
    font-size: 1.1rem; /* Slightly larger for easier clicking */
    padding: 5px;
    line-height: 1;
    margin-left: 10px;
}

.notification.success .notification-close,
.notification.error .notification-close,
.notification.warning .notification-close {
    color: white; /* White close button on colored backgrounds */
    opacity: 0.7;
}

.notification-close:hover {
    color: #333; /* Darker hover for default */
}

.notification.success .notification-close:hover,
.notification.error .notification-close:hover,
.notification.warning .notification-close:hover {
    opacity: 1;
}

@media (max-width: 576px) {
    .notification {
        right: 10px;
        bottom: 10px;
        max-width: calc(100% - 20px); /* Adjust width for smaller screens */
        min-width: auto;
        padding: 12px 15px;
    }
    .notification-content i {
        font-size: 1rem;
    }
    .notification-close {
        font-size: 1rem;
    }
}
</style>
`);

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const scrolled = window.scrollY > 50;
    document.querySelector('.header').classList.toggle('scrolled', scrolled);
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Helper function to dispatch cart updated event
function dispatchCartUpdateEvent() {
    document.dispatchEvent(new CustomEvent('cartUpdated'));
}

// Global function to update cart count in header
function updateHeaderCartCount() {
    const cartItems = getCartItemsFromLocalStorage(); // Use the robust helper function
    const totalItems = cartItems.reduce((sum, item) => {
        // Ensure item and item.quantity are valid before adding
        if (item && typeof item.quantity === 'number') {
            return sum + item.quantity;
        }
        return sum;
    }, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        if (totalItems > 0) {
            el.style.display = 'flex'; // Or 'block' or as appropriate
        } else {
            el.style.display = 'none';
        }
    });
}

// Helper function to safely get cart items from localStorage
function getCartItemsFromLocalStorage() {
    let items = [];
    try {
        const storedItems = localStorage.getItem('cartItems');
        if (storedItems) {
            const parsed = JSON.parse(storedItems);
            if (Array.isArray(parsed)) {
                items = parsed;
            } else {
                // Log a warning if the parsed data is not an array
                console.warn('cartItems in localStorage was not an array after parsing. Resetting to empty. Value was:', parsed);
                // Optionally, clear the invalid item: localStorage.removeItem('cartItems');
            }
        }
    } catch (e) {
        // Log an error if JSON parsing fails
        console.error('Error parsing cartItems from localStorage. Resetting to empty. Error:', e);
        // Optionally, clear the invalid item: localStorage.removeItem('cartItems');
    }
    return items;
}

// Initial cart count update on page load for all pages
// Also attach close listener for notification if it exists on the page
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderCartCount();
});
