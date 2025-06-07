document.addEventListener('DOMContentLoaded', () => {
    // Mock data cho sản phẩm
    const mockProducts = {
        1: {
            id: 1,
            name: 'Mật ong rừng U Minh nguyên chất',
            price: 255000,
            oldPrice: 300000,
            image: '/assets/images/matong4.jpg', // Assuming this is a generic image, adjust if needed
            description: 'Hương vị đặc trưng, 500ml'
        },
        2: {
            id: 2,
            name: 'Mật ong rừng Tràm Đồng Tháp',
            price: 280000,
            image: '/assets/images/matong4.jpg',
            description: 'Hương thơm dịu, 500ml'
        },
        3: {
            id: 3,
            name: 'Mật ong rừng Bạc Hà Mộc Châu',
            price: 270000,
            oldPrice: 300000,
            image: '/assets/images/matong4.jpg',
            description: 'Tốt cho hô hấp, 500ml'
        },
        4: {
            id: 4,
            name: 'Mật ong rừng hoa Nhãn Hưng Yên',
            price: 310000,
            image: '/assets/images/matong4.jpg',
            description: 'Giàu khoáng chất, 500ml'
        },
        5: {
            id: 5,
            name: 'Mật ong rừng nguyên tổ Tây Bắc',
            price: 340000,
            oldPrice: 370000,
            image: '/assets/images/matong4.jpg',
            description: 'Nguyên tổ tinh túy, 300g'
        },
        6: {
            id: 6,
            name: 'Sữa ong chúa tươi nguyên chất',
            price: 450000,
            image: '/assets/images/matong4.jpg',
            description: '"Thần dược" sức khỏe, 100g'
        },
        7: {
            id: 7,
            name: 'Mật ong hoa Cà Phê Đắk Lắk',
            price: 290000,
            image: '/assets/images/matong4.jpg',
            description: 'Vị ngọt đậm đà, 500ml'
        },
        8: {
            id: 8,
            name: 'Mật ong hoa Vải Lục Ngạn',
            price: 264000,
            oldPrice: 300000,
            image: '/assets/images/matong4.jpg',
            description: 'Thơm dịu, tốt cho trẻ em, 500ml'
        },
        9: {
            id: 9,
            name: 'Mật ong Manuka New Zealand',
            price: 450000, // Price might be higher in reality
            image: '/assets/images/matong4.jpg',
            description: 'Kháng khuẩn vượt trội, 250g'
        },
        10: {
            id: 10,
            name: 'Phấn hoa Ong Rừng Tự Nhiên',
            price: 180000,
            image: '/assets/images/matong4.jpg',
            description: 'Giàu protein, vitamin, 200g'
        },
        11: {
            id: 11,
            name: 'Sáp ong Vàng Nguyên Chất',
            price: 120000,
            oldPrice: 150000,
            image: '/assets/images/matong4.jpg',
            description: 'Tinh khiết, đa dụng, 100g'
        }
    };

    // Mock data cho giỏ hàng - để demo
    const mockCartData = [
        { productId: 1, quantity: 1 },
        { productId: 3, quantity: 2 },
        { productId: 5, quantity: 1 },
        { productId: 10, quantity: 3 },
    ];

    // Helper function (can be shared from main.js if main.js is guaranteed to load first and define it globally,
    // or defined locally like this for encapsulation)
    function getCartItemsFromLocalStorageForCartHandler() {
        let items = [];
        try {
            const storedItems = localStorage.getItem('cartItems');
            if (storedItems) {
                const parsed = JSON.parse(storedItems);
                if (Array.isArray(parsed)) {
                    items = parsed;
                } else {
                    console.warn('cart-handler: cartItems in localStorage was not an array. Value:', parsed);
                }
            }
        } catch (e) {
            console.error('cart-handler: Error parsing cartItems from localStorage:', e);
        }
        return items;
    }

    function initializeCart() {
        let cartItems = getCartItemsFromLocalStorageForCartHandler();
        
        if (cartItems.length === 0 && mockCartData && mockCartData.length > 0) {
            // Deep copy mockData to avoid modifying the original
            cartItems = JSON.parse(JSON.stringify(mockCartData));
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
        return cartItems;
    }

    function formatCurrency(amount) {
        return parseFloat(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    function parseCurrency(currencyString) {
        if (!currencyString) return 0;
        return parseFloat(currencyString.replace(/[^\d.-]/g, '').replace('.', '')); // Basic parsing, might need refinement
    }


    function renderCart() {
        const cartItemsBody = document.getElementById('cart-items-body');
        const cartEmptyMessage = document.getElementById('cart-empty-message');
        
        if (!cartItemsBody || !cartEmptyMessage) {
            console.error('Cart DOM elements not found.');
            return;
        }
        
        let cartItems = initializeCart(); // initializeCart now returns a guaranteed array

        const cartTableContainer = document.querySelector('.cart-table-container');

        if (cartItems.length === 0) {
            cartItemsBody.innerHTML = '';
            cartEmptyMessage.style.display = 'block';
            if (cartTableContainer) {
                cartTableContainer.style.display = 'none';
            }
        } else {
            cartEmptyMessage.style.display = 'none';
            if (cartTableContainer) {
                cartTableContainer.style.display = 'table'; // Or 'block'
            }
            cartItemsBody.innerHTML = cartItems.map(item => {
                const product = mockProducts[item.productId];
                if (!product) {
                    console.warn(`Product with ID ${item.productId} not found in mockProducts.`);
                    return ''; // Skip rendering this item
                }
                const subtotal = product.price * item.quantity;
                
                return `
                    <tr class="cart-item" data-product-id="${product.id}">
                        <td class="product-thumbnail">
                            <a href="product-detail.html?id=${product.id}">
                                <img src="${product.image}" alt="${product.name}">
                            </a>
                        </td>
                        <td class="product-name">
                            <a href="product-detail.html?id=${product.id}">${product.name}</a>
                            <p class="item-meta">${product.description || ''}</p>
                        </td>
                        <td class="product-price" data-price="${product.price}">
                            ${formatCurrency(product.price)}
                            ${product.oldPrice ? `<br><small class="old-price">${formatCurrency(product.oldPrice)}</small>` : ''}
                        </td>
                        <td class="product-quantity">
                            <div class="quantity-selector">
                                <button class="quantity-btn minus-btn" aria-label="Giảm số lượng">-</button>
                                <input type="number" value="${item.quantity}" min="1" max="10" aria-label="Số lượng sản phẩm">
                                <button class="quantity-btn plus-btn" aria-label="Tăng số lượng">+</button>
                            </div>
                        </td>
                        <td class="product-subtotal">${formatCurrency(subtotal)}</td>
                        <td class="product-remove">
                            <button class="remove-item-btn" aria-label="Xóa sản phẩm">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
        
        updateCartSummary();
        if (window.updateHeaderCartCount) { // Ensure main.js's function is available
            window.updateHeaderCartCount();
        }
    }

    // Cập nhật tổng giỏ hàng
    function updateCartSummary() {
        const cartItems = getCartItemsFromLocalStorageForCartHandler(); // Use robust getter
        let subtotal = 0;
        
        cartItems.forEach(item => {
            const product = mockProducts[item.productId];
            // Add checks for product and valid properties
            if (product && typeof product.price === 'number' && item && typeof item.quantity === 'number') {
                subtotal += product.price * item.quantity;
            } else {
                console.warn('Skipping item in cart summary due to missing data:', item);
            }
        });
        
        const shippingCost = 0; 
        const total = subtotal + shippingCost;
        
        const cartSubtotalEl = document.getElementById('cart-subtotal');
        const cartTotalEl = document.getElementById('cart-total');

        if (cartSubtotalEl) cartSubtotalEl.textContent = formatCurrency(subtotal);
        if (cartTotalEl) cartTotalEl.textContent = formatCurrency(total);
    }

    // Cập nhật số lượng cart trong header
    // function updateHeaderCartCount() { // Removed: Now using global function from main.js
    //     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    //     const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    //     const cartCountElements = document.querySelectorAll('.cart-count');
    //     cartCountElements.forEach(el => {
    //         el.textContent = totalItems;
    //         if (totalItems > 0) {
    //             el.style.display = 'flex';
    //         } else {
    //             el.style.display = 'none';
    //         }
    //     });
    // }

    // Xử lý thay đổi số lượng
    function handleQuantityChange(productId, newQuantity) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.productId == productId);
        
        if (itemIndex !== -1) {
            const productName = mockProducts[productId] ? mockProducts[productId].name : 'Sản phẩm';
            if (newQuantity > 0) {
                cartItems[itemIndex].quantity = parseInt(newQuantity);
            } else {
                cartItems.splice(itemIndex, 1); // Should ideally be handled by remove, but good fallback
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
            window.showNotification(`Đã cập nhật số lượng cho "${productName}".`, 'success'); // Use global function
        }
    }

    // Xử lý xóa sản phẩm
    function handleRemoveItem(productId) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const productName = mockProducts[productId] ? mockProducts[productId].name : 'Sản phẩm';
        cartItems = cartItems.filter(item => item.productId != productId);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
        window.showNotification(`"${productName}" đã được xóa khỏi giỏ hàng.`, 'success'); // Use global function
    }

    // Event listeners
    document.addEventListener('click', function(e) {
        // Xử lý nút tăng/giảm số lượng
        if (e.target.classList.contains('minus-btn') || e.target.classList.contains('plus-btn')) {
            const row = e.target.closest('.cart-item');
            const productId = row.dataset.productId;
            const input = row.querySelector('input[type="number"]');
            const currentValue = parseInt(input.value);
            
            if (e.target.classList.contains('minus-btn')) {
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    handleQuantityChange(productId, currentValue - 1);
                }
            } else {
                if (currentValue < 10) {
                    input.value = currentValue + 1;
                    handleQuantityChange(productId, currentValue + 1);
                }
            }
        }
        
        // Xử lý nút xóa sản phẩm
        if (e.target.closest('.remove-item-btn')) {
            const row = e.target.closest('.cart-item');
            const productId = row.dataset.productId;
            const productName = mockProducts[productId].name;
            
            if (confirm(`Bạn có chắc muốn xóa "${productName}" khỏi giỏ hàng?`)) {
                handleRemoveItem(productId);
            }
        }
    });

    // Xử lý thay đổi input số lượng
    document.addEventListener('input', function(e) {
        if (e.target.type === 'number' && e.target.closest('.cart-item')) {
            const row = e.target.closest('.cart-item');
            const productId = row.dataset.productId;
            const newQuantity = parseInt(e.target.value);
            
            if (newQuantity >= 1 && newQuantity <= 10) {
                handleQuantityChange(productId, newQuantity);
            }
        }
    });

    // Xử lý mã giảm giá
    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    const couponCodeInput = document.getElementById('coupon-code');
    const couponStatus = document.getElementById('coupon-status');

    applyCouponBtn.addEventListener('click', function() {
        const code = couponCodeInput.value.trim().toUpperCase();
        
        // Mock coupons
        const validCoupons = {
            'HONEY10': { discount: 10, type: 'percent', description: 'Giảm 10%' },
            'SUMMER20': { discount: 20, type: 'percent', description: 'Giảm 20%' },
            'FREESHIP': { discount: 30000, type: 'fixed', description: 'Miễn phí vận chuyển (giảm 30k)' } // Clarified description
        };
        
        if (validCoupons[code]) {
            const coupon = validCoupons[code];
            couponStatus.innerHTML = `<span class="success">✓ Áp dụng thành công: ${coupon.description}</span>`;
            window.showNotification(`Đã áp dụng mã giảm giá: ${coupon.description}`, 'success'); // Use global function
            
            // Cập nhật tổng tiền (có thể implement logic tính toán ở đây)
        } else {
            couponStatus.innerHTML = `<span class="error">✗ Mã giảm giá không hợp lệ</span>`;
            window.showNotification('Mã giảm giá không hợp lệ', 'error'); // Use global function
        }
    });

    // Xử lý nút thanh toán
    const checkoutBtn = document.getElementById('proceed-to-checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length > 0) {
            window.location.href = 'payment.html';
        } else {
            window.showNotification('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm để tiếp tục.', 'warning'); // Use global function
        }
    });

    // Khởi tạo trang
    renderCart();
});
