// File: js/product-detail-handler.js
// Xử lý hiển thị chi tiết sản phẩm

/**
 * Dữ liệu sản phẩm (trong ứng dụng thực tế, dữ liệu này sẽ đến từ cơ sở dữ liệu)
 */
const productData = {
    '1': {
        id: '1',
        name: 'Mật ong rừng U Minh nguyên chất',
        category: 'Mật ong rừng',
        currentPrice: '255,000₫',
        oldPrice: '300,000₫',
        discount: true,
        discountPercent: '15%',
        rating: 5,
        ratingCount: 24,
        description: 'Mật ong rừng U Minh được thu hoạch từ rừng ngập mặn U Minh, mang hương vị đặc trưng của thiên nhiên hoang dã.',
        origin: 'Cà Mau',
        stock: 'in-stock',
        stockText: 'Còn hàng',
        image: '/assets/images/mậtong3.jpg',
        detailDescription: 'Mật ong rừng U Minh nguyên chất được thu hoạch bởi các gia đình nuôi ong chuyên nghiệp tại khu vực rừng ngập mặn U Minh, tỉnh Cà Mau. Sản phẩm không chứa chất bảo quản, không pha tạp, giữ nguyên hương vị và dưỡng chất tự nhiên.',
        specifications: [
            { label: 'Dung tích', value: '500ml' },
            { label: 'Xuất xứ', value: 'Cà Mau, Việt Nam' },
            { label: 'Thành phần', value: '100% mật ong rừng nguyên chất' },
            { label: 'Hạn sử dụng', value: '24 tháng kể từ ngày sản xuất' }
        ],
        gallery: [
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg'
        ]
    },
    '2': {
        id: '2',
        name: 'Mật ong rừng Tràm Đồng Tháp',
        category: 'Mật ong rừng',
        currentPrice: '280,000₫',
        oldPrice: '',
        discount: false,
        rating: 4,
        ratingCount: 18,
        description: 'Mật ong rừng Tràm Đồng Tháp có hương thơm đặc trưng, vị ngọt dịu, chứa nhiều dưỡng chất từ rừng tràm.',
        origin: 'Đồng Tháp',
        stock: 'in-stock',
        stockText: 'Còn hàng',
        image: '/assets/images/mậtong3.jpg',
        detailDescription: 'Mật ong rừng Tràm Đồng Tháp được thu hoạch từ những cánh rừng tràm nguyên sinh tại Đồng Tháp. Sản phẩm có màu vàng amber đặc trưng, hương thơm nhẹ nhàng và vị ngọt thanh.',
        specifications: [
            { label: 'Dung tích', value: '500ml' },
            { label: 'Xuất xứ', value: 'Đồng Tháp, Việt Nam' },
            { label: 'Thành phần', value: '100% mật ong rừng tràm nguyên chất' },
            { label: 'Hạn sử dụng', value: '24 tháng kể từ ngày sản xuất' }
        ],
        gallery: [
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg'
        ]
    },
    '3': {
        id: '3',
        name: 'Mật ong rừng Bạc Hà Mộc Châu',
        category: 'Mật ong rừng',
        currentPrice: '270,000₫',
        oldPrice: '300,000₫',
        discount: true,
        discountPercent: '10%',
        rating: 5,
        ratingCount: 31,
        description: 'Mật ong rừng Bạc Hà Mộc Châu mang hương thơm của hoa bạc hà, giúp sảng khoái và tốt cho hệ hô hấp.',
        origin: 'Sơn La',
        stock: 'in-stock',
        stockText: 'Còn hàng',
        image: '/assets/images/mậtong3.jpg',
        detailDescription: 'Mật ong rừng Bạc Hà Mộc Châu được thu hoạch từ vùng cao nguyên Mộc Châu, nơi có khí hậu mát mẻ quanh năm, rất thích hợp cho sự phát triển của cây bạc hà. Mật ong mang hương thơm nhẹ của bạc hà, có tác dụng tốt cho hệ hô hấp.',
        specifications: [
            { label: 'Dung tích', value: '500ml' },
            { label: 'Xuất xứ', value: 'Sơn La, Việt Nam' },
            { label: 'Thành phần', value: '100% mật ong rừng bạc hà nguyên chất' },
            { label: 'Hạn sử dụng', value: '24 tháng kể từ ngày sản xuất' }
        ],
        gallery: [
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg'
        ]
    },
    '4': {
        id: '4',
        name: 'Mật ong rừng hoa Nhãn Hưng Yên',
        category: 'Mật ong rừng',
        currentPrice: '310,000₫',
        oldPrice: '',
        discount: false,
        rating: 4,
        ratingCount: 15,
        description: 'Mật ong rừng hoa Nhãn Hưng Yên có vị ngọt thanh, đặc biệt giàu khoáng chất và vitamin, hỗ trợ sức khỏe tim mạch.',
        origin: 'Hưng Yên',
        stock: 'in-stock',
        stockText: 'Còn hàng',
        image: '/placeholder.svg?height=600&width=600&text=Longan+Honey',
        detailDescription: 'Mật ong rừng hoa Nhãn Hưng Yên được thu hoạch từ những vườn nhãn lâu năm tại Hưng Yên. Sản phẩm có màu vàng đậm, hương thơm đặc trưng của hoa nhãn và vị ngọt thanh. Đặc biệt giàu khoáng chất và vitamin, hỗ trợ sức khỏe tim mạch.',
        specifications: [
            { label: 'Dung tích', value: '500ml' },
            { label: 'Xuất xứ', value: 'Hưng Yên, Việt Nam' },
            { label: 'Thành phần', value: '100% mật ong hoa nhãn nguyên chất' },
            { label: 'Hạn sử dụng', value: '24 tháng kể từ ngày sản xuất' }
        ],
        gallery: [
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg'
        ]
    },
    '5': {
        id: '5',
        name: 'Mật ong rừng nguyên tổ cao cấp',
        category: 'Mật ong nguyên tổ',
        currentPrice: '340,000₫',
        oldPrice: '370,000₫',
        discount: true,
        discountPercent: '8%',
        rating: 5,
        ratingCount: 42,
        description: 'Mật ong rừng nguyên tổ cao cấp được thu hoạch nguyên sáp, giữ nguyên phấn hoa và mật ong tươi nguyên chất.',
        origin: 'Tây Nguyên',
        stock: 'in-stock',
        stockText: 'Còn hàng',
        image: '/placeholder.svg?height=600&width=600&text=Raw+Comb+Honey',
        detailDescription: 'Mật ong rừng nguyên tổ cao cấp là sản phẩm được thu hoạch nguyên sáp, giữ nguyên phấn hoa và mật ong tươi nguyên chất. Sản phẩm này giữ được đầy đủ nhất các dưỡng chất từ thiên nhiên, bao gồm cả enzym, phấn hoa và các vi chất có lợi khác.',
        specifications: [
            { label: 'Khối lượng', value: '300g' },
            { label: 'Xuất xứ', value: 'Tây Nguyên, Việt Nam' },
            { label: 'Thành phần', value: '100% mật ong rừng nguyên tổ' },
            { label: 'Hạn sử dụng', value: '12 tháng kể từ ngày sản xuất' }
        ],
        gallery: [
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg'
        ]
    },
    '6': {
        id: '6',
        name: 'Sữa ong chúa tươi nguyên chất',
        category: 'Sữa ong chúa',
        currentPrice: '450,000₫',
        oldPrice: '',
        discount: false,
        rating: 5,
        ratingCount: 28,
        description: 'Sữa ong chúa tươi nguyên chất được thu hoạch và bảo quản lạnh, giữ nguyên dưỡng chất quý giá cho sức khỏe và làm đẹp.',
        origin: 'Đà Lạt',
        stock: 'in-stock',
        stockText: 'Còn hàng',
        image: '/placeholder.svg?height=600&width=600&text=Fresh+Royal+Jelly',
        detailDescription: 'Sữa ong chúa tươi nguyên chất được thu hoạch và bảo quản lạnh, giữ nguyên dưỡng chất quý giá. Sản phẩm giàu protein, axit amin, vitamin và khoáng chất, có tác dụng tăng cường sức khỏe, làm đẹp da và chống lão hóa.',
        specifications: [
            { label: 'Khối lượng', value: '100g' },
            { label: 'Xuất xứ', value: 'Đà Lạt, Việt Nam' },
            { label: 'Thành phần', value: '100% sữa ong chúa tươi nguyên chất' },
            { label: 'Hạn sử dụng', value: '6 tháng kể từ ngày sản xuất (bảo quản lạnh)' }
        ],
        gallery: [
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg',
            '/assets/images/mậtong3.jpg'
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Mock data sản phẩm chi tiết
    const productData = {
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
        const product = productData[productId];

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
            updateHeaderCartCount();
            
            // Show notification
            showNotification(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`, 'success');
            
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

    // Update cart count
    function updateHeaderCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
            if (totalItems > 0) {
                el.style.display = 'flex';
            }
        });
    }

    // Show notification
    function showNotification(message, type = 'success') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            // Fallback notification
            alert(message);
        }
    }

    // Initialize all functionality
    displayProductDetails();
    setupThumbnailClicks();
    setupQuantitySelector();
    setupTabs();
    setupAddToCart();
    updateHeaderCartCount();
});
