document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products-grid');
    const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
    const paginationContainer = document.querySelector('.pagination');
    const sortSelect = document.getElementById('sort-products');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyFilterBtn = document.getElementById('apply-filter');
    const viewToggleButtons = document.querySelectorAll('.view-btn');
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const filterToggleButton = document.getElementById('filter-toggle');
    const closeSidebarButton = document.getElementById('close-sidebar');
    const shopSidebar = document.getElementById('shop-sidebar');
    const quickViewModal = document.getElementById('quickview-modal');
    const quickViewCloseBtn = document.getElementById('quickview-close-btn');
    const quickViewContainer = document.getElementById('quickview-product-container');
    // const notificationElement = document.getElementById('notification');
    // const notificationMessage = document.getElementById('notification-message');
    // const notificationClose = document.getElementById('notification-close');
    const loadingOverlay = document.getElementById('loading-overlay');
    const filterTagsContainer = document.getElementById('filter-tags-container');
    const recentlyViewedSection = document.getElementById('recently-viewed-section');


    let allProductsData = productCards.map(card => {
        const priceText = card.querySelector('.current-price').textContent;
        const oldPriceText = card.querySelector('.old-price')?.textContent;
        return {
            id: card.dataset.productId,
            element: card,
            name: card.querySelector('.product-title a').textContent.trim(),
            category: card.dataset.category,
            price: parseFloat(priceText.replace(/[^\d.-]/g, '')) || 0,
            oldPrice: oldPriceText ? parseFloat(oldPriceText.replace(/[^\d.-]/g, '')) : null,
            rating: parseInt(card.dataset.rating) || 0,
            dateAdded: card.dataset.dateAdded || new Date().toISOString(), // Placeholder
            popularity: parseInt(card.dataset.popularity) || 0, // Placeholder
            description: card.querySelector('.product-description')?.textContent.trim() || '',
            imageSrc: card.querySelector('.product-img img')?.src || '',
            origin: card.querySelector('.product-origin')?.textContent.trim().replace('<i class="fas fa-map-marker-alt"></i>', '').trim() || '',
            stockStatus: card.querySelector('.product-stock')?.classList.contains('in-stock') ? 'Còn hàng' : 'Hết hàng',
            categoryDisplay: card.querySelector('.product-category')?.textContent.trim() || '',
            ratingCount: card.querySelector('.rating-count')?.textContent.trim() || '(0 đánh giá)'
        };
    });

    let currentFilters = {
        category: 'all',
        minPrice: null,
        maxPrice: null,
        searchTerm: ''
    };
    let currentSort = 'default';
    let currentPage = 1;
    const productsPerPage = 9; // Adjust as needed

    function formatCurrency(amount) {
        return parseFloat(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    // --- RENDERING ---
    function renderProducts() {
        showLoading();
        let filteredProducts = [...allProductsData];

        // Apply category filter
        if (currentFilters.category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === currentFilters.category);
        }

        // Apply price filter
        if (currentFilters.minPrice !== null) {
            filteredProducts = filteredProducts.filter(p => p.price >= currentFilters.minPrice);
        }
        if (currentFilters.maxPrice !== null) {
            filteredProducts = filteredProducts.filter(p => p.price <= currentFilters.maxPrice);
        }
        
        // Apply search term (future enhancement)

        // Apply sorting
        sortProducts(filteredProducts, currentSort);

        // Clear current grid
        productsGrid.innerHTML = '';

        // Pagination
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        if (paginatedProducts.length === 0) {
            productsGrid.innerHTML = '<p class="no-products-found">Không tìm thấy sản phẩm nào phù hợp.</p>';
        } else {
            paginatedProducts.forEach(productData => {
                productsGrid.appendChild(productData.element);
            });
        }
        
        updateShowingResults(filteredProducts.length);
        renderPagination(totalPages, filteredProducts.length);
        renderFilterTags();
        hideLoading();
    }
    
    function updateShowingResults(totalCount) {
        const showingResultsEl = document.querySelector('.showing-results p');
        if (showingResultsEl) {
            showingResultsEl.innerHTML = `<strong>${totalCount}</strong> sản phẩm được tìm thấy`;
        }
    }


    // --- SORTING ---
    function sortProducts(products, sortBy) {
        currentSort = sortBy;
        switch (sortBy) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                products.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'popularity':
                products.sort((a, b) => b.popularity - a.popularity); // Assuming higher is more popular
                break;
            case 'rating':
                products.sort((a, b) => b.rating - a.rating);
                break;
            case 'date':
                products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            case 'default':
            default:
                // Maintain original order or sort by ID if needed
                products.sort((a, b) => parseInt(a.id) - parseInt(b.id)); 
                break;
        }
    }

    // --- PAGINATION ---
    function renderPagination(totalPages) {
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;

        // Previous Button
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.classList.add('prev');
        prevButton.setAttribute('aria-label', 'Trang trước');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Trước';
        if (currentPage === 1) prevButton.classList.add('disabled');
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderProducts();
            }
        });
        paginationContainer.appendChild(prevButton);

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            // Basic pagination: show all pages. For more complex scenarios, add ellipsis.
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            if (i === currentPage) pageLink.classList.add('active');
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                renderProducts();
            });
            paginationContainer.appendChild(pageLink);
        }

        // Next Button
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.classList.add('next');
        nextButton.setAttribute('aria-label', 'Trang sau');
        nextButton.innerHTML = 'Sau <i class="fas fa-chevron-right"></i>';
        if (currentPage === totalPages) nextButton.classList.add('disabled');
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts();
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    // --- FILTERING ---
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentFilters.category = link.dataset.category;
            currentPage = 1;
            renderProducts();
        });
    });

    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', () => {
            currentFilters.minPrice = minPriceInput.value ? parseFloat(minPriceInput.value.replace(/[^\d]/g, '')) : null;
            currentFilters.maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value.replace(/[^\d]/g, '')) : null;
            currentPage = 1;
            renderProducts();
        });
    }
    
    // Format price inputs as user types
    [minPriceInput, maxPriceInput].forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/[^\d]/g, '');
                if (value) {
                    // e.target.value = formatCurrency(parseFloat(value)).replace(' ₫', '₫'); // Keep it simple for input
                }
            });
        }
    });

    // --- FILTER TAGS ---
    function renderFilterTags() {
        filterTagsContainer.innerHTML = '';
        let activeFilters = false;

        if (currentFilters.category !== 'all') {
            const categoryName = document.querySelector(`.category-list a[data-category="${currentFilters.category}"]`)?.textContent.replace(/\s*\(\d+\)$/, '').trim() || currentFilters.category;
            addFilterTag(`Danh mục: ${categoryName}`, 'category');
            activeFilters = true;
        }
        if (currentFilters.minPrice !== null) {
            addFilterTag(`Giá từ: ${formatCurrency(currentFilters.minPrice)}`, 'minPrice');
            activeFilters = true;
        }
        if (currentFilters.maxPrice !== null) {
            addFilterTag(`Giá đến: ${formatCurrency(currentFilters.maxPrice)}`, 'maxPrice');
            activeFilters = true;
        }
        
        filterTagsContainer.style.display = activeFilters ? 'flex' : 'none';
    }

    function addFilterTag(text, filterType) {
        const tag = document.createElement('div');
        tag.classList.add('filter-tag');
        tag.textContent = text;
        
        const removeBtn = document.createElement('span');
        removeBtn.classList.add('filter-tag-remove');
        removeBtn.innerHTML = '&times;';
        removeBtn.title = 'Xóa bộ lọc';
        removeBtn.addEventListener('click', () => {
            removeFilter(filterType);
        });
        
        tag.appendChild(removeBtn);
        filterTagsContainer.appendChild(tag);
    }

    function removeFilter(filterType) {
        if (filterType === 'category') {
            currentFilters.category = 'all';
            categoryLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('.category-list a[data-category="all"]')?.classList.add('active');
        } else if (filterType === 'minPrice') {
            currentFilters.minPrice = null;
            minPriceInput.value = '';
        } else if (filterType === 'maxPrice') {
            currentFilters.maxPrice = null;
            maxPriceInput.value = '';
        }
        currentPage = 1;
        renderProducts();
    }


    // --- VIEW TOGGLE ---
    viewToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewToggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const view = button.dataset.view;
            productsGrid.classList.remove('grid-view', 'grid-large-view', 'list-view');
            if (view === 'grid') productsGrid.classList.add('grid-view');
            else if (view === 'grid-large') productsGrid.classList.add('grid-large-view');
            else if (view === 'list') productsGrid.classList.add('list-view');
            // Default to grid view if not specified
            if (!productsGrid.classList.contains('grid-view') && !productsGrid.classList.contains('grid-large-view') && !productsGrid.classList.contains('list-view')) {
                productsGrid.classList.add('grid-view');
            }
        });
    });
     // Set initial view based on active button or default to grid
    const activeViewButton = document.querySelector('.view-btn.active');
    const initialView = activeViewButton ? activeViewButton.dataset.view : 'grid';
    productsGrid.classList.remove('grid-view', 'grid-large-view', 'list-view');
    if (initialView === 'grid') productsGrid.classList.add('grid-view');
    else if (initialView === 'grid-large') productsGrid.classList.add('grid-large-view');
    else if (initialView === 'list') productsGrid.classList.add('list-view');
    else productsGrid.classList.add('grid-view');


    // --- THEME TOGGLE ---
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            themeToggleButton.querySelector('i').classList.toggle('fa-sun');
            themeToggleButton.querySelector('i').classList.toggle('fa-moon');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // Apply saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleButton.querySelector('i').classList.add('fa-sun');
            themeToggleButton.querySelector('i').classList.remove('fa-moon');
        } else {
             themeToggleButton.querySelector('i').classList.add('fa-moon');
            themeToggleButton.querySelector('i').classList.remove('fa-sun');
        }
    }

    // --- SIDEBAR TOGGLE ---
    if (filterToggleButton) {
        filterToggleButton.addEventListener('click', () => {
            shopSidebar.classList.add('open');
            document.body.classList.add('sidebar-open-overlay');
        });
    }
    if (closeSidebarButton) {
        closeSidebarButton.addEventListener('click', () => {
            shopSidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open-overlay');
        });
    }
    // Close sidebar if clicking outside
    document.addEventListener('click', (event) => {
        if (shopSidebar && shopSidebar.classList.contains('open') && 
            !shopSidebar.contains(event.target) && 
            !filterToggleButton.contains(event.target) &&
            !filterToggleButton.querySelector('i').contains(event.target) ) {
            shopSidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open-overlay');
        }
    });


    // --- QUICK VIEW ---
    function populateQuickView(productId) {
        const product = allProductsData.find(p => p.id === productId);
        if (!product) return;

        quickViewContainer.querySelector('#quickview-main-image').src = product.imageSrc || '/placeholder.svg?height=400&width=400&text=Product+Image';
        quickViewContainer.querySelector('#quickview-main-image').alt = product.name;
        quickViewContainer.querySelector('#quickview-category-text').textContent = product.categoryDisplay || product.category;
        quickViewContainer.querySelector('#quickview-title-text').textContent = product.name;
        
        const ratingDisplay = quickViewContainer.querySelector('#quickview-rating-display');
        ratingDisplay.innerHTML = ''; // Clear previous
        for(let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            star.classList.add('fas', i < product.rating ? 'fa-star' : 'far fa-star');
            ratingDisplay.appendChild(star);
        }
        const ratingCountSpan = document.createElement('span');
        ratingCountSpan.classList.add('rating-count-quickview');
        ratingCountSpan.textContent = ` ${product.ratingCount}`;
        ratingDisplay.appendChild(ratingCountSpan);

        const priceDisplay = quickViewContainer.querySelector('#quickview-price-display');
        priceDisplay.innerHTML = `<span class="current-price">${formatCurrency(product.price)}</span>`;
        if (product.oldPrice) {
            priceDisplay.innerHTML += ` <span class="old-price">${formatCurrency(product.oldPrice)}</span>`;
        }

        quickViewContainer.querySelector('#quickview-short-desc-text').textContent = product.description || 'Không có mô tả cho sản phẩm này.';
        
        const availabilityStatus = quickViewContainer.querySelector('#quickview-availability-status');
        availabilityStatus.textContent = product.stockStatus;
        availabilityStatus.className = 'quickview-availability'; // Reset classes
        availabilityStatus.classList.add(product.stockStatus === 'Còn hàng' ? 'in-stock' : 'out-of-stock');


        quickViewContainer.querySelector('#quickview-sku-text').textContent = product.id;
        const categoryLink = quickViewContainer.querySelector('#quickview-category-link');
        categoryLink.textContent = product.categoryDisplay || product.category;
        categoryLink.href = `shop.html?category=${product.category}`; // Adjust link as needed

        const fullDetailsLink = quickViewContainer.querySelector('#quickview-full-details-link');
        fullDetailsLink.href = `product-detail.html?id=${product.id}`;
        
        const addToCartBtn = quickViewContainer.querySelector('#quickview-add-to-cart-action-btn');
        addToCartBtn.dataset.productId = product.id; // For cart handler
        addToCartBtn.disabled = product.stockStatus !== 'Còn hàng';


        // Reset quantity
        quickViewContainer.querySelector('#quickview-quantity-input').value = 1;

        quickViewModal.classList.add('open');
        document.body.classList.add('modal-open');
        addToRecentlyViewed(product.id);
    }

    if (quickViewCloseBtn) {
        quickViewCloseBtn.addEventListener('click', () => {
            quickViewModal.classList.remove('open');
            document.body.classList.remove('modal-open');
        });
    }
    // Close modal on escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && quickViewModal.classList.contains('open')) {
            quickViewModal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    });
    // Close modal if clicking outside content
     quickViewModal.addEventListener('click', (event) => {
        if (event.target === quickViewModal) {
            quickViewModal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    });


    // --- EVENT LISTENERS FOR DYNAMICALLY ADDED/FILTERED ITEMS ---
    productsGrid.addEventListener('click', (e) => {
        // Quick View
        const quickViewButton = e.target.closest('.action-btn[data-action="quick-view"]');
        if (quickViewButton) {
            e.preventDefault();
            const productId = quickViewButton.closest('.product-card')?.dataset.productId;
            if (productId) {
                populateQuickView(productId);
            }
        }

        // Add to Cart from Grid
        const addToCartButton = e.target.closest('.add-to-cart');
        if (addToCartButton && !e.target.closest('.quickview-actions')) { // Ensure not QV button
            e.preventDefault();
            const productId = addToCartButton.dataset.productId;
            const product = allProductsData.find(p => p.id === productId);
            const quantity = 1; // Default quantity for grid add

            if (product && product.stockStatus === 'Còn hàng') {
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const existingItemIndex = cartItems.findIndex(item => item.productId == productId);

                if (existingItemIndex > -1) {
                    cartItems[existingItemIndex].quantity += quantity;
                } else {
                    cartItems.push({ productId: parseInt(productId), quantity: quantity });
                }
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                window.updateHeaderCartCount();
                // window.showNotification(`${product.name} (x${quantity}) đã được thêm vào giỏ hàng.`, 'success');
                
                // Optional: Add visual feedback to the button
                addToCartButton.innerHTML = '<i class="fas fa-check"></i> Đã thêm';
                addToCartButton.classList.add('added');
                setTimeout(() => {
                    addToCartButton.innerHTML = '<i class="fas fa-shopping-cart"></i> Thêm vào giỏ';
                    addToCartButton.classList.remove('added');
                }, 2000);

            } else if (product) {
                window.showNotification(`${product.name} hiện đã hết hàng.`, 'warning');
            }
        }
        
        // Buy Now from Grid
        const buyNowButton = e.target.closest('.buy-now');
        if (buyNowButton && !e.target.closest('.quickview-actions')) { // Ensure not QV button
            e.preventDefault();
            const productId = buyNowButton.dataset.productId;
            const product = allProductsData.find(p => p.id === productId);
            const quantity = 1;

            if (product && product.stockStatus === 'Còn hàng') {
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const existingItemIndex = cartItems.findIndex(item => item.productId == productId);
                if (existingItemIndex > -1) {
                    cartItems[existingItemIndex].quantity += quantity;
                } else {
                    cartItems.push({ productId: parseInt(productId), quantity: quantity });
                }
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                window.updateHeaderCartCount();
                window.location.href = 'cart.html';
            } else if (product) {
                 window.showNotification(`${product.name} hiện đã hết hàng.`, 'warning');
            }
        }

        // Wishlist
        const wishlistButton = e.target.closest('.action-btn[data-action="wishlist"]');
        if (wishlistButton) {
            e.preventDefault();
            wishlistButton.classList.toggle('active');
            wishlistButton.querySelector('i').classList.toggle('far');
            wishlistButton.querySelector('i').classList.toggle('fas');
            const productId = wishlistButton.closest('.product-card').dataset.productId;
            if (wishlistButton.classList.contains('active')) {
                showNotification('Đã thêm vào danh sách yêu thích!');
                console.log(`Added to wishlist: ${productId}`);
            } else {
                showNotification('Đã xóa khỏi danh sách yêu thích!');
                console.log(`Removed from wishlist: ${productId}`);
            }
            return;
        }
        
        // Compare
        const compareButton = e.target.closest('.action-btn[data-action="compare"]');
        if (compareButton) {
            e.preventDefault();
            compareButton.classList.toggle('active');
            // Add to compare logic
            const productId = compareButton.closest('.product-card').dataset.productId;
            showNotification('Chức năng so sánh đang được phát triển.');
            console.log(`Compare: ${productId}`);
            return;
        }
    });
    
    // Quick view quantity controls
    const qvQtyInput = document.getElementById('quickview-quantity-input');
    const qvQtyMinus = document.getElementById('quickview-quantity-minus');
    const qvQtyPlus = document.getElementById('quickview-quantity-plus');

    if (qvQtyMinus) {
        qvQtyMinus.addEventListener('click', () => {
            let currentVal = parseInt(qvQtyInput.value);
            if (currentVal > 1) qvQtyInput.value = currentVal - 1;
        });
    }
    if (qvQtyPlus) {
        qvQtyPlus.addEventListener('click', () => {
            let currentVal = parseInt(qvQtyInput.value);
            if (currentVal < 99) qvQtyInput.value = currentVal + 1; // Max 99
        });
    }
    if (qvQtyInput) {
         qvQtyInput.addEventListener('change', () => {
            let val = parseInt(qvQtyInput.value);
            if (isNaN(val) || val < 1) qvQtyInput.value = 1;
            if (val > 99) qvQtyInput.value = 99;
        });
    }



    // function showNotification(message, type = 'success') { // Removed: Using global from main.js
    //     if (!notificationElement || !notificationMessage) return;
    //     notificationMessage.textContent = message;
    //     notificationElement.className = 'notification show'; 
    //     notificationElement.classList.add(type);
    //     // Auto-hide after some time
    //     setTimeout(() => {
    //         if (notificationElement) notificationElement.classList.remove('show');
    //     }, 3000);
    // }
    // if (notificationClose) { // Listener for notification close is in main.js
    //     notificationClose.addEventListener('click', () => {
    //         if (notificationElement) notificationElement.classList.remove('show');
    //     });
    // }

    // --- LOADING OVERLAY ---
    function showLoading() {
        if (loadingOverlay) loadingOverlay.classList.add('show');
    }
    function hideLoading() {
        if (loadingOverlay) loadingOverlay.classList.remove('show');
    }
    
    // --- RECENTLY VIEWED ---
    let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const MAX_RECENTLY_VIEWED = 5;

    function addToRecentlyViewed(productId) {
        // Remove if already exists to add it to the top
        recentlyViewed = recentlyViewed.filter(id => id !== productId);
        recentlyViewed.unshift(productId); // Add to the beginning
        if (recentlyViewed.length > MAX_RECENTLY_VIEWED) {
            recentlyViewed.pop(); // Remove the oldest if limit exceeded
        }
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
        renderRecentlyViewed();
    }

    // --- INITIAL SETUP ---
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentPage = 1;
            renderProducts();
        });
    }

    // Initial render
    renderProducts();
    renderRecentlyViewed();

    // Handle URL parameters for category or search (example)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const targetCategoryLink = document.querySelector(`.category-list a[data-category="${categoryParam}"]`);
        if (targetCategoryLink) {
            categoryLinks.forEach(l => l.classList.remove('active'));
            targetCategoryLink.classList.add('active');
            currentFilters.category = categoryParam;
            currentPage = 1;
            // renderProducts(); // Already called at the end
        }
    }
    // Re-render if params changed anything before initial full render
    // This ensures URL params are respected on first load.
    // The final renderProducts() call will pick up these changes.
});

// Placeholder for functions that might be in main.js or cart-handler.js
// function updateCartCount(change) {
//     const cartCountEl = document.querySelector('.cart-count');
//     if (cartCountEl) {
//         let currentCount = parseInt(cartCountEl.textContent) || 0;
//         cartCountEl.textContent = Math.max(0, currentCount + change);
//     }
// }

// Enhanced Filter Management
function initializeFilters() {
    // Initialize rating filter
    const ratingFilters = document.querySelectorAll('.rating-filter a');
    ratingFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all rating filters
            ratingFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const rating = this.dataset.rating;
            
            // Add filter tag
            addFilterTag('rating', `${rating} sao & cao hơn`, rating);
            
            // Apply filter
            applyFilters();
            
            // Update URL
            updateURLParams();
        });
    });

    // Initialize brand filter
    const brandFilters = document.querySelectorAll('.brand-filter a');
    brandFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle active class
            this.classList.toggle('active');
            
            const brand = this.dataset.brand;
            const brandName = this.querySelector('span').textContent;
            
            if (this.classList.contains('active')) {
                addFilterTag('brand', brandName, brand);
            } else {
                removeFilterTag('brand', brand);
            }
            
            // Apply filter
            applyFilters();
            
            // Update URL
            updateURLParams();
        });
    });

    // Copy promo code functionality
    const copyCodeBtn = document.querySelector('.copy-code');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', function() {
            const code = this.dataset.code;
            
            // Create temporary input to copy text
            const tempInput = document.createElement('input');
            tempInput.value = code;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Show success message
            this.innerHTML = '<i class="fas fa-check"></i> Đã sao chép!';
            this.style.background = 'rgba(40, 167, 69, 0.3)';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i> Sao Chép';
                this.style.background = 'rgba(255, 255, 255, 0.2)';
            }, 2000);
            
            // Show notification
            showNotification(`Mã giảm giá ${code} đã được sao chép!`, 'success');
        });
    }

    // Clear all filters
    const clearAllBtn = document.getElementById('clear-all-filters');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            // Clear all active filters
            document.querySelectorAll('.category-list a.active').forEach(filter => {
                if (!filter.dataset.category || filter.dataset.category !== 'all') {
                    filter.classList.remove('active');
                }
            });
            
            // Reset category to "all"
            const allCategoryFilter = document.querySelector('[data-category="all"]');
            if (allCategoryFilter) {
                allCategoryFilter.classList.add('active');
            }
            
            // Clear price inputs
            document.getElementById('min-price').value = '';
            document.getElementById('max-price').value = '';
            
            // Clear all filter tags
            clearAllFilterTags();
            
            // Apply filters (will show all products)
            applyFilters();
            
            // Update URL
            updateURLParams();
            
            // Show notification
            showNotification('Đã xóa tất cả bộ lọc', 'info');
        });
    }

    // Enhanced filter tags with animations
    function addFilterTag(type, label, value) {
        const container = document.getElementById('filter-tags-container');
        
        // Check if tag already exists
        const existingTag = container.querySelector(`[data-filter-type="${type}"][data-filter-value="${value}"]`);
        if (existingTag) return;
        
        // Create new tag
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.dataset.filterType = type;
        tag.dataset.filterValue = value;
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(-10px)';
        
        tag.innerHTML = `
            <span>${label}</span>
            <button class="filter-tag-remove" aria-label="Xóa bộ lọc">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(tag);
        
        // Animate in
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 10);
        
        // Add remove functionality
        tag.querySelector('.filter-tag-remove').addEventListener('click', () => {
            removeFilterTag(type, value);
            applyFilters();
            updateURLParams();
        });
        
        // Show container if hidden
        if (container.children.length > 0) {
            container.style.display = 'flex';
        }
    }
}

// Enhanced product filtering
function applyFilters() {
    const products = document.querySelectorAll('.product-card');
    const activeCategory = document.querySelector('.category-list a.active')?.dataset.category || 'all';
    const activeRating = document.querySelector('.rating-filter a.active')?.dataset.rating;
    const activeBrands = Array.from(document.querySelectorAll('.brand-filter a.active')).map(f => f.dataset.brand);
    const minPrice = parseFloat(document.getElementById('min-price').value.replace(/[^\d]/g, '')) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value.replace(/[^\d]/g, '')) || Infinity;
    
    let visibleCount = 0;
    
    products.forEach(product => {
        const productCategory = product.dataset.category;
        const productPrice = parseFloat(product.dataset.price);
        const productRating = parseFloat(product.dataset.rating);
        const productBrand = product.dataset.brand || 'honey-bee-farm'; // Default brand
        
        let shouldShow = true;
        
        // Category filter
        if (activeCategory !== 'all' && productCategory !== activeCategory) {
            shouldShow = false;
        }
        
        // Price filter
        if (productPrice < minPrice || productPrice > maxPrice) {
            shouldShow = false;
        }
        
        // Rating filter
        if (activeRating && productRating < parseFloat(activeRating)) {
            shouldShow = false;
        }
        
        // Brand filter
        if (activeBrands.length > 0 && !activeBrands.includes(productBrand)) {
            shouldShow = false;
        }
        
        // Apply visibility with animation
        if (shouldShow) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, visibleCount * 50); // Stagger animation
            visibleCount++;
        } else {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
    
    // Update results count
    updateResultsCount(visibleCount);
}

// Update results count with animation
function updateResultsCount(count) {
    const resultElement = document.querySelector('.showing-results strong');
    if (resultElement) {
        // Animate number change
        const currentCount = parseInt(resultElement.textContent);
        animateNumber(resultElement, currentCount, count, 500);
    }
}

// Animate number changes
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// Initialize enhanced filters on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    
    // Add smooth scrolling for filter actions
    const filterButtons = document.querySelectorAll('.sidebar-widget .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add hover effects for featured products
    const featuredProducts = document.querySelectorAll('.featured-product');
    featuredProducts.forEach(product => {
        product.addEventListener('click', function() {
            const productId = this.dataset.productId;
            if (productId) {
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    });
});

// Enhanced Shop Page JavaScript with QuickView

// Product data structure
const productsData = {
    1: {
        id: 1,
        name: "Mật ong rừng U Minh",
        category: "Mật ong rừng",
        price: 255000,
        oldPrice: 300000,
        rating: 5,
        reviewCount: 15,
        sku: "MON001",
        origin: "U Minh, Cà Mau",
        brand: "Honey Bee Farm",
        availability: "in-stock",
        description: "Mật ong rừng U Minh nguyên chất, thu hoạch từ các tổ ong rừng tự nhiên tại khu rừng U Minh. Sản phẩm có hương vị đậm đà, thơm ngon và giàu dinh dưỡng.",
        images: [
            "/assets/images/matong9.jpg",
            "/assets/images/matong8.jpg",
            "/assets/images/matong7.jpg"
        ]
    },
    2: {
        id: 2,
        name: "Mật ong rừng Tràm",
        category: "Mật ong rừng",
        price: 280000,
        oldPrice: null,
        rating: 4.5,
        reviewCount: 12,
        sku: "MON002",
        origin: "Miền Tây Nam Bộ",
        brand: "Honey Bee Farm",
        availability: "in-stock",
        description: "Mật ong rừng Tràm có màu hổ phách đẹp mắt, vị ngọt thanh mát đặc trưng. Được thu hoạch từ hoa cây Tràm trong vùng rừng ngập mặn.",
        images: [
            "/assets/images/matong8.jpg",
            "/assets/images/matong9.jpg",
            "/assets/images/matong7.jpg"
        ]
    },
    3: {
        id: 3,
        name: "Mật ong rừng Bạc Hà",
        category: "Mật ong rừng",
        price: 270000,
        oldPrice: 300000,
        rating: 4.8,
        reviewCount: 8,
        sku: "MON003",
        origin: "Bạc Hà, Lào Cai",
        brand: "Honey Bee Farm",
        availability: "in-stock",
        description: "Mật ong rừng Bạc Hà với hương vị độc đáo của vùng cao. Sản phẩm được thu hoạch từ các loài hoa dại tại vùng núi Bạc Hà.",
        images: [
            "/assets/images/mậtong2.jpg",
            "/assets/images/matong8.jpg",
            "/assets/images/matong9.jpg"
        ]
    },
    4: {
        id: 4,
        name: "Mật ong rừng hoa Nhãn",
        category: "Mật ong hoa",
        price: 310000,
        oldPrice: null,
        rating: 5,
        reviewCount: 20,
        sku: "MON004",
        origin: "Hưng Yên",
        brand: "Honey Bee Farm",
        availability: "in-stock",
        description: "Mật ong hoa Nhãn có hương thơm đặc trưng của hoa nhãn, vị ngọt dịu nhẹ. Đây là loại mật ong cao cấp được ưa chuộng nhất.",
        images: [
            "/assets/images/matong9.jpg",
            "/assets/images/matong8.jpg",
            "/assets/images/matong7.jpg"
        ]
    },
    5: {
        id: 5,
        name: "Mật ong rừng nguyên tổ",
        category: "Mật ong rừng",
        price: 340000,
        oldPrice: 370000,
        rating: 4.9,
        reviewCount: 18,
        sku: "MON005",
        origin: "Rừng nguyên sinh Việt Nam",
        brand: "Honey Bee Farm",
        availability: "in-stock",
        description: "Mật ong rừng nguyên tổ chưa qua xử lý, giữ nguyên dưỡng chất và enzyme tự nhiên. Đây là sản phẩm cao cấp nhất của chúng tôi.",
        images: [
            "/assets/images/matong9.jpg",
            "/assets/images/matong4.jpg",
            "/assets/images/matong8.jpg"
        ]
    },
    6: {
        id: 6,
        name: "Sữa ong chúa tươi",
        category: "Sữa ong chúa",
        price: 450000,
        oldPrice: null,
        rating: 5,
        reviewCount: 25,
        sku: "SOC001",
        origin: "Đà Lạt",
        brand: "Honey Bee Farm",
        availability: "in-stock",
        description: "Sữa ong chúa tươi nguyên chất, bảo quản lạnh để giữ nguyên hoạt tính sinh học. Tốt cho sức khỏe và làm đẹp.",
        images: [
            "/assets/images/matong4.jpg",
            "/assets/images/matong9.jpg",
            "/assets/images/matong8.jpg"
        ]
    }
};

// QuickView Modal functionality
class QuickViewModal {
    constructor() {
        this.modal = document.getElementById('quickview-modal');
        this.closeBtn = document.getElementById('quickview-close');
        this.currentProductId = null;
        
        this.init();
    }
    
    init() {
        // Close modal events
        this.closeBtn?.addEventListener('click', () => this.close());
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('open')) {
                this.close();
            }
        });
        
        // Quantity controls
        document.getElementById('quickview-qty-minus')?.addEventListener('click', () => {
            this.changeQuantity(-1);
        });
        
        document.getElementById('quickview-qty-plus')?.addEventListener('click', () => {
            this.changeQuantity(1);
        });
        
        // Add to cart
        document.getElementById('quickview-add-to-cart')?.addEventListener('click', () => {
            this.addToCart();
        });
        
        // Initialize quickview buttons
        this.initQuickViewButtons();
    }
    
    initQuickViewButtons() {
        // Add quickview buttons to product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            const productId = index + 1; // Simple ID assignment
            
            // Add quickview button if not exists
            if (!card.querySelector('.quickview-btn')) {
                const actionsDiv = card.querySelector('.product-actions') || this.createActionsDiv(card);
                
                const quickviewBtn = document.createElement('button');
                quickviewBtn.className = 'action-btn quickview-btn';
                quickviewBtn.innerHTML = '<i class="fas fa-eye"></i>';
                quickviewBtn.title = 'Xem nhanh';
                quickviewBtn.setAttribute('data-product-id', productId);
                
                quickviewBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.open(productId);
                });
                
                actionsDiv.appendChild(quickviewBtn);
            }
        });
    }
    
    createActionsDiv(card) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'product-actions';
        
        const productImg = card.querySelector('.product-img');
        if (productImg) {
            productImg.appendChild(actionsDiv);
        }
        
        return actionsDiv;
    }
    
    open(productId) {
        const product = productsData[productId];
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }
        
        this.currentProductId = productId;
        this.populateModal(product);
        this.modal?.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.modal?.classList.remove('open');
        document.body.style.overflow = '';
        this.currentProductId = null;
    }
    
    populateModal(product) {
        // Update product details
        const titleEl = document.getElementById('quickview-title');
        const categoryEl = document.getElementById('quickview-category');
        const priceEl = document.getElementById('quickview-price');
        const descriptionEl = document.getElementById('quickview-short-description');
        const availabilityEl = document.getElementById('quickview-availability');
        const skuEl = document.getElementById('quickview-sku');
        const originEl = document.getElementById('quickview-origin');
        const brandEl = document.getElementById('quickview-brand');
        const mainImageEl = document.getElementById('quickview-main-image');
        const categoryLinkEl = document.getElementById('quickview-category-link');
        const fullDetailsEl = document.getElementById('quickview-full-details');
        
        if (titleEl) titleEl.textContent = product.name;
        if (categoryEl) categoryEl.textContent = product.category;
        if (descriptionEl) descriptionEl.textContent = product.description;
        if (skuEl) skuEl.textContent = product.sku;
        if (originEl) originEl.textContent = product.origin;
        if (brandEl) brandEl.textContent = product.brand;
        if (mainImageEl) {
            mainImageEl.src = product.images[0];
            mainImageEl.alt = product.name;
        }
        if (categoryLinkEl) {
            categoryLinkEl.textContent = product.category;
            categoryLinkEl.href = `shop.html?category=${encodeURIComponent(product.category)}`;
        }
        if (fullDetailsEl) {
            fullDetailsEl.href = `product-detail.html?id=${product.id}`;
        }
        
        // Update price
        if (priceEl) {
            const currentPriceEl = priceEl.querySelector('.current-price');
            const oldPriceEl = priceEl.querySelector('.old-price');
            
            if (currentPriceEl) {
                currentPriceEl.textContent = this.formatPrice(product.price);
            }
            
            if (oldPriceEl) {
                if (product.oldPrice) {
                    oldPriceEl.textContent = this.formatPrice(product.oldPrice);
                    oldPriceEl.style.display = 'inline';
                } else {
                    oldPriceEl.style.display = 'none';
                }
            }
        }
        
        // Update rating
        this.updateRating(product.rating, product.reviewCount);
        
        // Update availability
        if (availabilityEl) {
            const statusEl = availabilityEl.querySelector('span');
            if (statusEl) {
                statusEl.textContent = product.availability === 'in-stock' ? 'Còn hàng' : 'Hết hàng';
                statusEl.className = product.availability;
            }
        }
        
        // Update thumbnails
        this.updateThumbnails(product.images, product.name);
        
        // Reset quantity
        const quantityInput = document.getElementById('quickview-quantity-input');
        if (quantityInput) quantityInput.value = 1;
    }
    
    updateRating(rating, reviewCount) {
        const ratingEl = document.getElementById('quickview-rating');
        if (!ratingEl) return;
        
        const starsEl = ratingEl.querySelector('.stars');
        const countEl = ratingEl.querySelector('.rating-count-quickview');
        
        if (starsEl) {
            const stars = starsEl.querySelectorAll('i');
            stars.forEach((star, index) => {
                if (index < Math.floor(rating)) {
                    star.className = 'fas fa-star';
                } else if (index < rating) {
                    star.className = 'fas fa-star-half-alt';
                } else {
                    star.className = 'far fa-star';
                }
            });
        }
        
        if (countEl) {
            countEl.textContent = `(${reviewCount} đánh giá)`;
        }
    }
    
    updateThumbnails(images, productName) {
        const container = document.getElementById('quickview-thumbnails-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        images.forEach((imageSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imageSrc;
            thumb.alt = `${productName} - Ảnh ${index + 1}`;
            thumb.className = index === 0 ? 'active' : '';
            
            thumb.addEventListener('click', () => {
                // Update main image
                const mainImage = document.getElementById('quickview-main-image');
                if (mainImage) {
                    mainImage.src = imageSrc;
                }
                
                // Update active thumbnail
                container.querySelectorAll('img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            
            container.appendChild(thumb);
        });
    }
    
    changeQuantity(delta) {
        const quantityInput = document.getElementById('quickview-quantity-input');
        if (!quantityInput) return;
        
        const currentValue = parseInt(quantityInput.value) || 1;
        const newValue = Math.max(1, Math.min(10, currentValue + delta));
        quantityInput.value = newValue;
    }
    
    addToCart() {
        if (!this.currentProductId) return;
        
        const product = productsData[this.currentProductId] || allProductsData.find(p => p.id == this.currentProductId); // Use productsData or allProductsData
        const quantityInput = document.getElementById('quickview-quantity-input');
        const quantity = parseInt(quantityInput?.value) || 1;

        if (!product) {
            console.error("QuickView: Product data not found for ID:", this.currentProductId);
            window.showNotification('Lỗi: Không tìm thấy thông tin sản phẩm.', 'error');
            return;
        }
        
        // Get existing cart items
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Check if product already exists in cart
        const existingItem = cartItems.find(item => item.productId == this.currentProductId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({
                productId: this.currentProductId,
                quantity: quantity,
                name: product.name,
                price: product.price,
                image: product.images[0]
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update cart count in header
        this.updateCartCount(); // This will call the global one
        
        // Show success message
        this.showAddToCartSuccess(product.name, quantity);
        
        // Close modal after short delay
        setTimeout(() => {
            this.close();
        }, 1000);
    }
    
    updateCartCount() {
        window.updateHeaderCartCount(); // Call global function
        
        // Dispatch custom event for other scripts if needed
        // this.modal.dispatchEvent(new CustomEvent('cartUpdated'));
    }

    
    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize QuickView Modal
    const quickView = new QuickViewModal();
    
    // Initialize other shop functionalities
    initializeShopFeatures();
});

function initializeShopFeatures() {
    // Filter functionality
    initializeFilters();
    
    // Product grid view toggle
    initializeViewToggle();
    
    // Product sorting
    initializeSorting();
    
    // Mobile sidebar toggle
    initializeMobileSidebar();
}

function initializeFilters() {
    // Category filters
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Filter products (implement based on your needs)
            const category = this.dataset.category;
            filterProductsByCategory(category);
        });
    });
}

function initializeViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.querySelector('.products-grid');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const viewType = this.dataset.view;
            if (productsGrid) {
                productsGrid.className = `products-grid ${viewType}`;
            }
        });
    });
}

function initializeSorting() {
    const sortSelect = document.getElementById('sort-products');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortProducts(sortBy);
        });
    }
}

function initializeMobileSidebar() {
    const filterToggle = document.querySelector('.filter-toggle');
    const sidebar = document.querySelector('.shop-sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    
    if (filterToggle && sidebar) {
        filterToggle.addEventListener('click', function() {
            sidebar.classList.add('open');
        });
    }
    
    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('open');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991 && sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !filterToggle?.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
}

function filterProductsByCategory(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            const productCategory = card.dataset.category;
            card.style.display = productCategory === category ? 'block' : 'none';
        }
    });
}

function sortProducts(sortBy) {
    const productsGrid = document.querySelector('.products-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    
    productCards.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return getProductPrice(a) - getProductPrice(b);
            case 'price-high':
                return getProductPrice(b) - getProductPrice(a);
            case 'name-asc':
                return getProductName(a).localeCompare(getProductName(b));
            case 'name-desc':
                return getProductName(b).localeCompare(getProductName(a));
            default:
                return 0;
        }
    });
    
    // Re-append sorted cards
    productCards.forEach(card => {
        productsGrid?.appendChild(card);
    });
}

function getProductPrice(card) {
    const priceEl = card.querySelector('.current-price');
    const priceText = priceEl?.textContent.replace(/[^\d]/g, '') || '0';
    return parseInt(priceText);
}

function getProductName(card) {
    const nameEl = card.querySelector('.product-title a');
    return nameEl?.textContent.trim() || '';
}