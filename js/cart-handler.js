document.addEventListener('DOMContentLoaded', () => {
    // Mock data cho sản phẩm
    const mockProducts = {
        1: {
            id: 1,
            name: 'Mật ong rừng U Minh',
            price: 255000,
            oldPrice: 300000,
            image: '/assets/images/matong9.jpg',
            description: 'Dung tích: 500ml'
        },
        2: {
            id: 2,
            name: 'Mật ong rừng Tràm',
            price: 280000,
            image: '/assets/images/matong8.jpg',
            description: 'Dung tích: 500ml'
        },
        3: {
            id: 3,
            name: 'Mật ong rừng Bạc Hà',
            price: 270000,
            oldPrice: 300000,
            image: '/assets/images/mậtong2.jpg',
            description: 'Dung tích: 500ml'
        },
        4: {
            id: 4,
            name: 'Mật ong rừng hoa Nhãn',
            price: 310000,
            image: '/assets/images/matong9.jpg',
            description: 'Dung tích: 500ml'
        }
    };

    // Mock data cho giỏ hàng - để demo
    const mockCartData = [
        { productId: 1, quantity: 2 },
        { productId: 3, quantity: 1 },
        { productId: 4, quantity: 1 }
    ];

    // Khởi tạo giỏ hàng với mock data nếu localStorage trống
    function initializeCart() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Nếu giỏ hàng trống, thêm mock data
        if (cartItems.length === 0) {
            cartItems = mockCartData;
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
        const cartItems = initializeCart();
        const cartTableBody = document.getElementById('cart-items-body');
        const cartEmptyMessage = document.getElementById('cart-empty-message');
        
        if (cartItems.length === 0) {
            cartTableBody.innerHTML = '';
            cartEmptyMessage.style.display = 'block';
            document.querySelector('.cart-table-container').style.display = 'none';
            document.querySelector('.cart-summary-area').style.display = 'none';
        } else {
            cartEmptyMessage.style.display = 'none';
            document.querySelector('.cart-table-container').style.display = 'block';
            document.querySelector('.cart-summary-area').style.display = 'block';
            
            cartTableBody.innerHTML = cartItems.map(item => {
                const product = mockProducts[item.productId];
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
                            <p class="item-meta">${product.description}</p>
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
        updateHeaderCartCount();
    }

    // Cập nhật tổng giỏ hàng
    function updateCartSummary() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let subtotal = 0;
        
        cartItems.forEach(item => {
            const product = mockProducts[item.productId];
            subtotal += product.price * item.quantity;
        });
        
        const shippingCost = 0; // Miễn phí
        const total = subtotal + shippingCost;
        
        document.getElementById('cart-subtotal').textContent = formatCurrency(subtotal);
        document.getElementById('cart-total').textContent = formatCurrency(total);
    }

    // Cập nhật số lượng cart trong header
    function updateHeaderCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
            if (totalItems > 0) {
                el.style.display = 'flex';
            } else {
                el.style.display = 'none';
            }
        });
    }

    // Xử lý thay đổi số lượng
    function handleQuantityChange(productId, newQuantity) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.productId == productId);
        
        if (itemIndex !== -1) {
            if (newQuantity > 0) {
                cartItems[itemIndex].quantity = parseInt(newQuantity);
            } else {
                cartItems.splice(itemIndex, 1);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
            showNotification('Đã cập nhật số lượng sản phẩm');
        }
    }

    // Xử lý xóa sản phẩm
    function handleRemoveItem(productId) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter(item => item.productId != productId);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
        showNotification('Đã xóa sản phẩm khỏi giỏ hàng', 'success');
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
            'FREESHIP': { discount: 30000, type: 'fixed', description: 'Miễn phí vận chuyển' }
        };
        
        if (validCoupons[code]) {
            const coupon = validCoupons[code];
            couponStatus.innerHTML = `<span class="success">✓ Áp dụng thành công: ${coupon.description}</span>`;
            showNotification(`Đã áp dụng mã giảm giá: ${coupon.description}`, 'success');
            
            // Cập nhật tổng tiền (có thể implement logic tính toán ở đây)
        } else {
            couponStatus.innerHTML = `<span class="error">✗ Mã giảm giá không hợp lệ</span>`;
            showNotification('Mã giảm giá không hợp lệ', 'error');
        }
    });

    // Xử lý nút thanh toán
    const checkoutBtn = document.getElementById('proceed-to-checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length > 0) {
            window.location.href = 'payment.html';
        } else {
            showNotification('Giỏ hàng của bạn đang trống', 'error');
        }
    });

    // Notification function
    function showNotification(message, type = 'success') {
        // Sử dụng notification function từ main.js
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            alert(message);
        }
    }

    // Khởi tạo trang
    renderCart();
});
