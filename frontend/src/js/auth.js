const API_BASE = 'http://localhost:3000/api/auth';

// --- HÀM ĐĂNG NHẬP ---
async function handleLogin(event) {
    event.preventDefault(); 
    
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
            // SỬA Ở ĐÂY: Truy cập vào result.data.token theo đúng Backend của em
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));
            
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

// --- HÀM ĐĂNG KÝ ---
async function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return; 
    }

    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
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
        alert('Lỗi kết nối server!');
    }
}