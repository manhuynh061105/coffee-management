// Cấu hình URL Backend
const API_BASE = 'http://localhost:3000/api/auth';

// --- HÀM ĐĂNG NHẬP (Khớp với login.html) ---
async function handleLogin(event) {
    event.preventDefault(); // Chặn load lại trang
    
    // Lấy đúng ID từ HTML của em
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            // Lưu token và thông tin user vào localStorage
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.data));
            
            alert('Chào mừng bạn quay trở lại!');
            window.location.href = 'index.html';
        } else {
            alert('Thất bại: ' + result.message);
        }
    } catch (error) {
        console.error('Lỗi kết nối API:', error);
        alert('Không thể kết nối đến máy chủ Backend!');
    }
}

async function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // 1. Kiểm tra khớp mật khẩu
    if (password !== confirmPassword) {
        return alert("Mật khẩu xác nhận không khớp!");
    }

    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: username, 
                password: password 
                // Nếu Backend có lưu fullname/phone thì thêm vào đây
            })
        });

        const result = await response.json();

        if (result.success) {
            alert('Đăng ký thành công! Hãy đăng nhập nhé.');
            window.location.href = 'login.html';
        } else {
            alert('Lỗi: ' + result.message);
        }
    } catch (error) {
        console.error('Lỗi kết nối:', error);
    }
}