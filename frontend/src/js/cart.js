let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.productId === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productId: id, name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Đã thêm ${name} vào giỏ hàng!`);
    updateCartIcon();
}

function updateCartIcon() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector('.fa-cart-shopping');
    if (cartIcon) {
        // Tạo một badge nhỏ hiển thị số lượng
        cartIcon.innerHTML = ` <span class="badge bg-danger rounded-pill" style="font-size: 0.6rem;">${totalItems}</span>`;
    }
}

// Chạy khi load trang
document.addEventListener('DOMContentLoaded', updateCartIcon);