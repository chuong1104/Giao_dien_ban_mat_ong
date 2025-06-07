// File: js/product-detail-handler.js
// Xử lý hiển thị chi tiết sản phẩm

document.addEventListener('DOMContentLoaded', function() {
    // Mock data sản phẩm chi tiết
    const productDetailData = { // Renamed to avoid conflict if other productData exists
        1: {
            id: 1,
            name: 'Mật ong rừng U Minh',
            price: 255000,
            oldPrice: 300000,
            images: [
                '/assets/images/matong9.jpg',
                '/assets/images/matong8.jpg',
                '/assets/images/matong7.jpg',
                '/assets/images/matong6.jpg'
            ],
            shortDescription: 'Mật ong rừng U Minh nguyên chất 100%, thu hoạch từ rừng U Minh Hạ, Cà Mau. Hương vị đậm đà, chất lượng cao.',
            fullDescription: `
                <h3>Mô tả chi tiết sản phẩm</h3>
                <p>Mật ong rừng U Minh là sản phẩm đặc biệt được thu hoạch từ những cây hoa trong rừng U Minh Hạ, tỉnh Cà Mau. Đây là vùng đất nguyên sinh, không bị ô nhiễm, tạo nên những giọt mật ong có chất lượng tuyệt vời.</p>
                
                <h4>Đặc điểm nổi bật:</h4>
                <ul>
                    <li>100% nguyên chất, không pha tạp</li>
                    <li>Thu hoạch từ rừng U Minh nguyên sinh</li>
                    <li>Hương vị đậm đà, ngọt thanh tự nhiên</li>
                    <li>Giàu vitamin và khoáng chất</li>
                    <li>Có tác dụng tốt cho sức khỏe</li>
                </ul>
                
                <h4>Công dụng:</h4>
                <ul>
                    <li>Tăng cường sức đề kháng</li>
                    <li>Hỗ trợ tiêu hóa</li>
                    <li>Làm đẹp da</li>
                    <li>Cung cấp năng lượng tự nhiên</li>
                </ul>
                
                <h4>Cách sử dụng:</h4>
                <p>Sử dụng 1-2 thìa canh mỗi ngày, có thể pha với nước ấm, sữa hoặc sử dụng trực tiếp.</p>
                
                <h4>Bảo quản:</h4>
                <p>Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.</p>
            `,
            specifications: {
                'Dung tích': '500ml',
                'Thành phần': '100% Mật ong nguyên chất',
                'Xuất xứ': 'Rừng U Minh, Cà Mau',
                'Hạn sử dụng': '2 năm',
                'Bảo quản': 'Nơi khô ráo, thoáng mát'
            },
            category: 'Mật ong rừng',
            sku: 'HBF001',
            tags: ['Mật ong', 'U Minh', 'Nguyên chất', 'Rừng'],
            inStock: true,
            discount: 15
        },
        2: {
            id: 2,
            name: 'Mật ong rừng Tràm',
            price: 280000,
            images: [
                '/assets/images/matong8.jpg',
                '/assets/images/matong9.jpg',
                '/assets/images/matong7.jpg'
            ],
            shortDescription: 'Mật ong rừng Tràm có hương vị đặc trưng, thu hoạch từ hoa tràm rừng nguyên sinh miền Tây.',
            fullDescription: `
                <h3>Mô tả chi tiết sản phẩm</h3>
                <p>Mật ong rừng Tràm được thu hoạch từ những cây tràm trong rừng nguyên sinh miền Tây Nam Bộ. Sản phẩm có hương vị đặc trưng và nhiều công dụng tốt cho sức khỏe.</p>
                
                <h4>Đặc điểm:</h4>
                <ul>
                    <li>Hương vị đặc trưng của hoa tràm</li>
                    <li>Màu vàng đậm tự nhiên</li>
                    <li>Giàu chất chống oxy hóa</li>
                    <li>Tính kháng khuẩn cao</li>
                </ul>
            `,
            specifications: {
                'Dung tích': '500ml',
                'Thành phần': '100% Mật ong tràm nguyên chất',
                'Xuất xứ': 'Miền Tây Nam Bộ',
                'Hạn sử dụng': '2 năm'
            },
            category: 'Mật ong rừng',
            sku: 'HBF002',
            tags: ['Mật ong', 'Tràm', 'Miền Tây'],
            inStock: true
        },
        3: {
            id: 3,
            name: 'Mật ong rừng Bạc Hà',
            price: 270000,
            oldPrice: 300000,
            images: [
                '/assets/images/mậtong2.jpg',
                '/assets/images/matong8.jpg'
            ],
            shortDescription: 'Mật ong rừng Bạc Hà từ vùng núi phía Bắc, có vị ngọt thanh mát đặc trưng.',
            fullDescription: `
                <h3>Mô tả chi tiết sản phẩm</h3>
                <p>Mật ong rừng Bạc Hà được thu hoạch từ những cây hoa dại trong rừng Bạc Hà, Lào Cai. Khí hậu lạnh và độ cao tạo nên chất lượng mật ong đặc biệt.</p>
            `,
            specifications: {
                'Dung tích': '500ml',
                'Thành phần': '100% Mật ong nguyên chất',
                'Xuất xứ': 'Bạc Hà, Lào Cai',
                'Hạn sử dụng': '2 năm'
            },
            category: 'Mật ong rừng',
            sku: 'HBF003',
            tags: ['Mật ong', 'Bạc Hà', 'Núi cao'],
            inStock: true,
            discount: 10
        },
        4: {
            id: 4,
            name: 'Mật ong rừng hoa Nhãn',
            price: 310000,
            images: ['/assets/images/matong9.jpg'],
            shortDescription: 'Mật ong từ hoa nhãn có vị ngọt đậm đà, thơm mùi hoa nhãn đặc trưng.',
            fullDescription: `
                <h3>Mô tả chi tiết sản phẩm</h3>
                <p>Mật ong hoa nhãn được thu hoạch trong mùa hoa nhãn nở rộ, có hương thơm và vị ngọt đặc trưng.</p>
            `,
            specifications: {
                'Dung tích': '500ml',
                'Thành phần': '100% Mật ong hoa nhãn',
                'Hạn sử dụng': '2 năm'
            },
            category: 'Mật ong hoa',
            sku: 'HBF004',
            tags: ['Mật ong', 'Hoa nhãn'],
            inStock: true
        },
        5: {
            id: 5,
            name: 'Mật ong rừng nguyên tổ',
            price: 340000,
            oldPrice: 370000,
            images: ['/assets/images/matong9.jpg'],
            shortDescription: 'Mật ong nguyên tổ chưa qua xử lý, giữ nguyên tất cả dưỡng chất tự nhiên.',
            fullDescription: `
                <h3>Mô tả chi tiết sản phẩm</h3>
                <p>Mật ong nguyên tổ là sản phẩm cao cấp nhất, chưa qua bất kỳ quá trình xử lý nào, giữ nguyên tất cả enzym và dưỡng chất.</p>
            `,
            specifications: {
                'Dung tích': '500ml',
                'Thành phần': 'Mật ong nguyên tổ 100%',
                'Hạn sử dụng': '2 năm'
            },
            category: 'Mật ong cao cấp',
            sku: 'HBF005',
            tags: ['Mật ong', 'Nguyên tổ', 'Cao cấp'],
            inStock: true,
            discount: 8
        }
    };

    // Lấy ID sản phẩm từ URL
    function getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1'; // Default to product 1
    }

    // Format giá tiền
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    // Hiển thị thông tin sản phẩm
    function displayProductDetails() {
        const productId = getProductIdFromURL();
        const product = productDetailData[productId]; // Use renamed data object

        if (!product) {
            console.error('Product not found');
            return;
        }

        // Cập nhật title và breadcrumb
        document.title = `${product.name} - Honey Bee Farm`;
        document.getElementById('product-breadcrumb-name').textContent = product.name;

        // Cập nhật thông tin cơ bản
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('current-price').textContent = formatPrice(product.price);
        document.getElementById('short-description').textContent = product.shortDescription;
        document.getElementById('product-sku').textContent = product.sku;
        document.getElementById('product-category-link').textContent = product.category;

        // Hiển thị giá cũ nếu có
        const oldPriceElement = document.getElementById('old-price');
        if (product.oldPrice) {
            oldPriceElement.textContent = formatPrice(product.oldPrice);
            oldPriceElement.style.display = 'inline';
        } else {
            oldPriceElement.style.display = 'none';
        }

        // Hiển thị discount badge nếu có
        const discountBadge = document.querySelector('.discount-badge');
        if (product.discount) {
            discountBadge.style.display = 'block';
            discountBadge.querySelector('.discount-percent').textContent = `-${product.discount}%`;
        } else {
            discountBadge.style.display = 'none';
        }

        // Cập nhật hình ảnh chính
        const mainImage = document.getElementById('main-product-image');
        mainImage.src = product.images[0];
        mainImage.alt = product.name;

        // Cập nhật thumbnail images
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (product.images[index]) {
                thumb.dataset.image = product.images[index];
                thumb.querySelector('img').src = product.images[index];
                thumb.style.display = 'block';
            } else {
                thumb.style.display = 'none';
            }
        });

        // Cập nhật trạng thái kho
        const stockStatus = document.getElementById('stock-status');
        if (product.inStock) {
            stockStatus.innerHTML = '<span>Còn hàng</span>';
            stockStatus.className = 'stock-status in-stock';
        } else {
            stockStatus.innerHTML = '<span>Hết hàng</span>';
            stockStatus.className = 'stock-status out-of-stock';
        }

        // Cập nhật tags
        const tagsElement = document.getElementById('product-tags-link');
        tagsElement.innerHTML = product.tags.map(tag => `<a href="#">${tag}</a>`).join(', ');

        // Cập nhật mô tả chi tiết
        document.getElementById('description-tab').innerHTML = product.fullDescription;

        // Cập nhật thông số kỹ thuật
        const specsContainer = document.querySelector('.product-specification');
        specsContainer.innerHTML = Object.entries(product.specifications)
            .map(([key, value]) => `
                <div class="spec-item">
                    <div class="spec-label">${key}:</div>
                    <div class="spec-value">${value}</div>
                </div>
            `).join('');

        // Cập nhật button add to cart
        const addToCartBtn = document.getElementById('add-to-cart-detail');
        addToCartBtn.setAttribute('data-product-id', product.id);
    }

    // Xử lý thumbnail clicks
    function setupThumbnailClicks() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-product-image');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image
                const newImageSrc = this.dataset.image;
                mainImage.src = newImageSrc;
            });
        });
    }

    // Xử lý quantity selector
    function setupQuantitySelector() {
        const minusBtn = document.querySelector('.minus-btn');
        const plusBtn = document.querySelector('.plus-btn');
        const quantityInput = document.getElementById('quantity-input');

        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }

    // Xử lý tabs
    function setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // Xử lý add to cart
    function setupAddToCart() {
        const addToCartBtn = document.getElementById('add-to-cart-detail');
        const buyNowBtn = document.getElementById('buy-now-detail');
        const quantityInput = document.getElementById('quantity-input');

        addToCartBtn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const quantity = parseInt(quantityInput.value);
            const product = productDetailData[productId]; // Get product details for name
            
            // Add to cart logic
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find(item => item.productId === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cartItems.push({ productId, quantity });
            }
            
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Update cart count in header
            window.updateHeaderCartCount(); // Use global function
            
            // Show notification
            if (product) {
                window.showNotification(`${product.name} (x${quantity}) đã được thêm vào giỏ hàng.`, 'success'); // Use global function
            } else {
                window.showNotification(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`, 'success'); // Fallback
            }
            
            // Animation effect
            this.innerHTML = '<i class="fas fa-check"></i> Đã thêm vào giỏ';
            this.classList.add('added');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Thêm vào giỏ';
                this.classList.remove('added');
            }, 2000);
        });

        buyNowBtn.addEventListener('click', function() {
            // Simulate buy now action
            const productId = parseInt(addToCartBtn.getAttribute('data-product-id'));
            const quantity = parseInt(quantityInput.value);
            
            // Add to cart first
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find(item => item.productId === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cartItems.push({ productId, quantity });
            }
            
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Redirect to cart
            window.location.href = 'cart.html';
        });
    }

    // Initialize all functionality
    displayProductDetails();
    setupThumbnailClicks();
    setupQuantitySelector();
    setupTabs();
    setupAddToCart();
    // updateHeaderCartCount(); // Called by main.js on DOMContentLoaded
});
