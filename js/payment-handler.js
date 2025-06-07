document.addEventListener('DOMContentLoaded', () => {
    const orderItemsSummary = document.getElementById('order-items-summary');
    const orderSubtotalSummaryEl = document.getElementById('order-subtotal-summary');
    const orderTotalSummaryEl = document.getElementById('order-total-summary');
    const paymentForm = document.getElementById('payment-form');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function formatCurrency(amount) {
         return parseFloat(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    function renderOrderSummary() {
        if (!orderItemsSummary) return;
        orderItemsSummary.innerHTML = '';

        if (cartItems.length === 0) {
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 2;
            emptyCell.textContent = 'Không có sản phẩm nào trong đơn hàng.';
            emptyCell.style.textAlign = 'center';
            emptyRow.appendChild(emptyCell);
            orderItemsSummary.appendChild(emptyRow);
            // Disable form or show message if cart is empty
            if (paymentForm) {
                const placeOrderBtn = paymentForm.querySelector('.place-order-btn');
                if (placeOrderBtn) placeOrderBtn.disabled = true;
            }
        } else {
            cartItems.forEach(item => {
                const itemRow = document.createElement('tr');
                itemRow.innerHTML = `
                    <td>${item.name} &times; ${item.quantity}</td>
                    <td>${formatCurrency(item.price * item.quantity)}</td>
                `;
                orderItemsSummary.appendChild(itemRow);
            });
             if (paymentForm) {
                const placeOrderBtn = paymentForm.querySelector('.place-order-btn');
                if (placeOrderBtn) placeOrderBtn.disabled = false;
            }
        }
        updateOrderTotals();
    }

    function updateOrderTotals() {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        // Assuming free shipping for now
        const total = subtotal;

        if (orderSubtotalSummaryEl) orderSubtotalSummaryEl.textContent = formatCurrency(subtotal);
        if (orderTotalSummaryEl) orderTotalSummaryEl.innerHTML = `<strong>${formatCurrency(total)}</strong>`;
    }

    // Placeholder for address population (City, District, Ward)
    // In a real app, this would involve API calls or predefined data
    const citySelect = document.getElementById('city');
    const districtSelect = document.getElementById('district');
    const wardSelect = document.getElementById('ward');

    if (citySelect && districtSelect && wardSelect) {
        // Example: Populate districts when city changes
        citySelect.addEventListener('change', function() {
            // Clear previous options
            districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
            wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
            
            const selectedCity = this.value;
            if (selectedCity === 'hanoi') {
                // Add Hanoi districts
                ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa'].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.toLowerCase().replace(' ', '-');
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            } else if (selectedCity === 'hcm') {
                // Add HCM districts
                ['Quận 1', 'Quận 3', 'Quận Bình Thạnh', 'Quận Tân Bình'].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.toLowerCase().replace(' ', '-');
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            }
            // Add more cities and districts as needed
        });

        // Example: Populate wards when district changes
        districtSelect.addEventListener('change', function() {
            // Clear previous options
            wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
            // Populate wards based on selectedDistrict (highly dependent on data structure)
        });
    }


    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox || !termsCheckbox.checked) {
                 if (window.showGlobalNotification) {
                    window.showGlobalNotification('Vui lòng đồng ý với điều khoản và điều kiện.', 'error');
                } else {
                    alert('Vui lòng đồng ý với điều khoản và điều kiện.');
                }
                return;
            }

            // Basic validation example
            const requiredFields = paymentForm.querySelectorAll('[required]');
            let formIsValid = true;
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    formIsValid = false;
                    field.style.borderColor = 'red'; // Highlight empty required fields
                } else {
                    field.style.borderColor = '#ccc';
                }
            });

            if (!formIsValid) {
                if (window.showGlobalNotification) {
                    window.showGlobalNotification('Vui lòng điền đầy đủ thông tin bắt buộc.', 'error');
                } else {
                    alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
                }
                return;
            }

            // Simulate order placement
            console.log('Placing order with data:', new FormData(paymentForm));
            
            if (window.showGlobalNotification) {
                window.showGlobalNotification('Đơn hàng của bạn đã được đặt thành công!', 'success');
            } else {
                alert('Đơn hàng của bạn đã được đặt thành công!');
            }

            // Clear cart and redirect to a thank you page (example)
            localStorage.removeItem('cartItems');
            dispatchCartUpdateEvent(); // Update header cart count
            // paymentForm.reset(); // Reset form
            // window.location.href = 'thank-you.html'; // Redirect
            setTimeout(() => {
                 window.location.href = 'index.html'; // Redirect to homepage after a delay
            }, 2000);
        });
    }

    // Initial render
    renderOrderSummary();
});

document.addEventListener('DOMContentLoaded', function() {
    // Mock data sản phẩm (giống cart-handler.js)
    const mockProducts = {
        1: {
            id: 1,
            name: 'Mật ong rừng U Minh',
            price: 255000,
            oldPrice: 300000,
            image: '/assets/images/matong9.jpg'
        },
        2: {
            id: 2,
            name: 'Mật ong rừng Tràm',
            price: 280000,
            image: '/assets/images/matong8.jpg'
        },
        3: {
            id: 3,
            name: 'Mật ong rừng Bạc Hà',
            price: 270000,
            oldPrice: 300000,
            image: '/assets/images/mậtong2.jpg'
        },
        4: {
            id: 4,
            name: 'Mật ong rừng hoa Nhãn',
            price: 310000,
            image: '/assets/images/matong9.jpg'
        }
    };

    // Mock data địa chỉ Việt Nam
    const locationData = {
        'HN': {
            name: 'Hà Nội',
            districts: {
                'BA_DINH': { name: 'Ba Đình', wards: ['Kim Mã', 'Ngọc Hà', 'Đội Cấn', 'Liễu Giai'] },
                'HOAN_KIEM': { name: 'Hoàn Kiếm', wards: ['Tràng Tiền', 'Phan Chu Trinh', 'Hàng Trống', 'Cửa Nam'] },
                'DONG_DA': { name: 'Đống Đa', wards: ['Khâm Thiên', 'Thổ Quan', 'Nam Đồng', 'Trung Liệt'] }
            }
        },
        'HCM': {
            name: 'TP. Hồ Chí Minh',
            districts: {
                'QUAN_1': { name: 'Quận 1', wards: ['Bến Nghé', 'Bến Thành', 'Cầu Kho', 'Cô Giang'] },
                'QUAN_3': { name: 'Quận 3', wards: ['Võ Thị Sáu', 'Tân Định', 'Phường 1', 'Phường 2'] },
                'QUAN_7': { name: 'Quận 7', wards: ['Tân Thuận Đông', 'Tân Thuận Tây', 'Tân Kiểng', 'Tân Hưng'] }
            }
        }
    };

    // Format giá tiền
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    // Populate địa chỉ select options
    function populateLocationSelects() {
        const citySelects = document.querySelectorAll('#billing-city, #shipping-city');
        
        citySelects.forEach(select => {
            select.innerHTML = '<option value="">Chọn Tỉnh/Thành phố</option>';
            Object.keys(locationData).forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = locationData[key].name;
                select.appendChild(option);
            });
        });
    }

    // Update districts based on selected city
    function updateDistricts(citySelect, districtSelect) {
        const selectedCity = citySelect.value;
        districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        
        if (selectedCity && locationData[selectedCity]) {
            Object.keys(locationData[selectedCity].districts).forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = locationData[selectedCity].districts[key].name;
                districtSelect.appendChild(option);
            });
        }
    }

    // Update wards based on selected district
    function updateWards(citySelect, districtSelect, wardSelect) {
        const selectedCity = citySelect.value;
        const selectedDistrict = districtSelect.value;
        wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
        
        if (selectedCity && selectedDistrict && locationData[selectedCity].districts[selectedDistrict]) {
            const wards = locationData[selectedCity].districts[selectedDistrict].wards;
            wards.forEach(ward => {
                const option = document.createElement('option');
                option.value = ward;
                option.textContent = ward;
                wardSelect.appendChild(option);
            });
        }
    }

    // Render order review
    function renderOrderReview() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const orderReviewItems = document.getElementById('order-review-items');
        let subtotal = 0;

        if (cartItems.length === 0) {
            orderReviewItems.innerHTML = '<tr><td colspan="2">Không có sản phẩm trong giỏ hàng</td></tr>';
            return;
        }

        orderReviewItems.innerHTML = cartItems.map(item => {
            const product = mockProducts[item.productId];
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            
            return `
                <tr>
                    <td>${product.name} <strong>&times; ${item.quantity}</strong></td>
                    <td>${formatPrice(itemTotal)}</td>
                </tr>
            `;
        }).join('');

        // Update totals
        document.getElementById('order-subtotal').textContent = formatPrice(subtotal);
        document.getElementById('order-total').textContent = formatPrice(subtotal); // Miễn phí ship
    }

    // Handle shipping address toggle
    const shipToDifferentAddress = document.getElementById('ship-to-different-address');
    const shippingAddressFields = document.getElementById('shipping-address-fields');
    
    shipToDifferentAddress.addEventListener('change', function() {
        if (this.checked) {
            shippingAddressFields.style.display = 'block';
            // Copy billing info to shipping
            document.getElementById('shipping-firstname').value = document.getElementById('billing-firstname').value;
            document.getElementById('shipping-lastname').value = document.getElementById('billing-lastname').value;
        } else {
            shippingAddressFields.style.display = 'none';
        }
    });

    // Handle payment method selection
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const bankTransferInfo = document.getElementById('bank-transfer-info');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'bank') {
                bankTransferInfo.style.display = 'block';
            } else {
                bankTransferInfo.style.display = 'none';
            }
        });
    });

    // Location select event listeners
    document.getElementById('billing-city').addEventListener('change', function() {
        updateDistricts(this, document.getElementById('billing-district'));
        document.getElementById('billing-ward').innerHTML = '<option value="">Chọn Phường/Xã</option>';
    });

    document.getElementById('billing-district').addEventListener('change', function() {
        updateWards(
            document.getElementById('billing-city'),
            this,
            document.getElementById('billing-ward')
        );
    });

    document.getElementById('shipping-city').addEventListener('change', function() {
        updateDistricts(this, document.getElementById('shipping-district'));
        document.getElementById('shipping-ward').innerHTML = '<option value="">Chọn Phường/Xã</option>';
    });

    document.getElementById('shipping-district').addEventListener('change', function() {
        updateWards(
            document.getElementById('shipping-city'),
            this,
            document.getElementById('shipping-ward')
        );
    });

    // Form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
            return;
        }
        
        // Mock order processing
        const orderData = {
            orderId: 'HBF' + Date.now(),
            items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
            billingInfo: {
                firstname: document.getElementById('billing-firstname').value,
                lastname: document.getElementById('billing-lastname').value,
                email: document.getElementById('billing-email').value,
                phone: document.getElementById('billing-phone').value,
                address: document.getElementById('billing-address1').value,
                city: document.getElementById('billing-city').value,
                district: document.getElementById('billing-district').value,
                ward: document.getElementById('billing-ward').value
            },
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            total: document.getElementById('order-total').textContent
        };
        
        // Simulate processing
        const submitBtn = document.getElementById('place-order-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
        
        setTimeout(() => {
            // Clear cart
            localStorage.removeItem('cartItems');
            
            // Show success message
            alert(`Đặt hàng thành công!\nMã đơn hàng: ${orderData.orderId}\n\nCảm ơn bạn đã mua hàng tại Honey Bee Farm!`);
            
            // Redirect to home page
            window.location.href = 'index.html';
        }, 2000);
    });

    // Auto-fill demo data for testing
    function fillDemoData() {
        document.getElementById('billing-firstname').value = 'Nguyễn Văn';
        document.getElementById('billing-lastname').value = 'A';
        document.getElementById('billing-email').value = 'nguyenvana@email.com';
        document.getElementById('billing-phone').value = '0123456789';
        document.getElementById('billing-address1').value = '123 Đường ABC';
        
        // Auto-select Hà Nội
        document.getElementById('billing-city').value = 'HN';
        updateDistricts(document.getElementById('billing-city'), document.getElementById('billing-district'));
        
        setTimeout(() => {
            document.getElementById('billing-district').value = 'BA_DINH';
            updateWards(
                document.getElementById('billing-city'),
                document.getElementById('billing-district'),
                document.getElementById('billing-ward')
            );
            
            setTimeout(() => {
                document.getElementById('billing-ward').value = 'Đội Cấn';
            }, 100);
        }, 100);
    }

    function showNotification(message, type = 'success') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            alert(message);
        }
    }

    // Initialize page
    populateLocationSelects();
    renderOrderReview();
    
    // Fill demo data for testing (remove in production)
    setTimeout(fillDemoData, 500);
});
