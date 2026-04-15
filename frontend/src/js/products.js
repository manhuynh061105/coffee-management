const PRODUCT_API = 'http://localhost:3000/api/products';

async function displayProducts() {
    const container = document.getElementById('product-container');
    if (!container) return;

    try {
        const response = await fetch(PRODUCT_API);
        const result = await response.json();

        // Giả sử Backend trả về mảng sản phẩm trong result.data hoặc result
        const products = result.data || result; 

        container.innerHTML = products.map(item => `
            <div class="col-md-3 col-6">
                <div class="content p-2 border rounded shadow-sm">
                    <img src="./img/${item.image || 'default.jpg'}" alt="${item.name}" class="img-fluid rounded">
                    <div class="text p-2">
                        <div class="text-center">
                            <h5 class="mb-2 text-uppercase" style="font-size: 0.9rem;">${item.name}</h5>
                            <p class="mb-3">Giá: <span class="fs-6 fw-semibold text-danger">${item.price.toLocaleString()}₫</span></p>
                        </div>
                        <button type="button" class="btn btn-primary mt-2 w-100" 
                            onclick="addToCart('${item._id}', '${item.name}', ${item.price})">
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
        container.innerHTML = `<p class="text-center">Không thể tải danh sách sản phẩm.</p>`;
    }
}

// Hàm kiểm tra trạng thái đăng nhập để đổi nút "Tài khoản"
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authMenu = document.getElementById('author-menu-drd');
    const profileBtn = document.getElementById('profile-dropdown');

    if (user && authMenu) {
        profileBtn.innerHTML = `<i class="fa-solid fa-user"></i> ${user.username}`;
        authMenu.innerHTML = `
            <li><a class="dropdown-item" href="#">Lịch sử đơn hàng</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" onclick="logout()">Đăng xuất</a></li>
        `;
    }
}

function logout() {
    localStorage.clear();
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    checkLoginStatus();
});