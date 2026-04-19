export const authView = `
    <div id="authContent" class="auth-container">
        <div class="auth-header">
            <div class="auth-logo-box">
                <img src="pormiki-logo.png" alt="Logo PORMIKI">
            </div>
            <h1>Selamat Datang</h1>
            <p>Silakan masuk ke akun anggota Anda untuk mengakses materi dan kartu digital.</p>
        </div>

        <div id="loginForm" class="auth-form-box">
            <div class="input-group-premium">
                <label>Nomor Anggota / Email</label>
                <div class="input-wrapper">
                    <i data-lucide="user"></i>
                    <input type="text" id="loginEmail" placeholder="Contoh: POR-2024-001">
                </div>
            </div>
            <div class="input-group-premium">
                <label>Kata Sandi</label>
                <div class="input-wrapper">
                    <i data-lucide="lock"></i>
                    <input type="password" id="loginPass" placeholder="••••••••">
                    <button class="toggle-pass"><i data-lucide="eye"></i></button>
                </div>
            </div>
            <div class="auth-options">
                <label class="remember-me">
                    <input type="checkbox"> <span>Ingat Saya</span>
                </label>
                <a href="#" class="forgot-link">Lupa Sandi?</a>
            </div>
            <button class="btn-action primary-action w-100 auth-submit" onclick="handleLogin()">
                Masuk Sekarang
            </button>
            <p class="auth-switch">Belum punya akun? <a href="#" onclick="toggleAuthMode('register')">Daftar Anggota</a></p>
        </div>

        <div id="registerForm" class="auth-form-box" style="display: none;">
            <div class="input-group-premium">
                <label>Nama Lengkap</label>
                <div class="input-wrapper">
                    <i data-lucide="user"></i>
                    <input type="text" id="regName" placeholder="Masukkan nama sesuai ijazah">
                </div>
            </div>
            <div class="input-group-premium">
                <label>Email Aktif</label>
                <div class="input-wrapper">
                    <i data-lucide="mail"></i>
                    <input type="email" id="regEmail" placeholder="nama@email.com">
                </div>
            </div>
            <div class="input-group-premium">
                <label>Kata Sandi</label>
                <div class="input-wrapper">
                    <i data-lucide="lock"></i>
                    <input type="password" id="regPass" placeholder="Buat sandi yang kuat">
                </div>
            </div>
            <button class="btn-action primary-action w-100 auth-submit" onclick="handleRegister()">
                Daftar Sekarang
            </button>
            <p class="auth-switch">Sudah punya akun? <a href="#" onclick="toggleAuthMode('login')">Masuk di sini</a></p>
        </div>

        <div class="auth-footer">
            <p>&copy; 2024 PORMIKI. Platform Pengembangan PMIK.</p>
        </div>
    </div>
`;
