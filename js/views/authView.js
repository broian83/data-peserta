export const authView = `
    <div id="authContent" class="auth-container">
        <!-- BRAND HERO SECTION -->
        <div class="auth-brand-hero">
            <div class="auth-brand-bg">
                <div class="auth-brand-circle c1"></div>
                <div class="auth-brand-circle c2"></div>
                <div class="auth-brand-circle c3"></div>
            </div>
            <div class="auth-brand-inner">
                <div class="auth-logo-box">
                    <img src="pormiki-logo.png" alt="Logo PORMIKI">
                </div>
                <h1 class="auth-brand-title">PORMIKI APPS</h1>
                <p class="auth-brand-sub">Portal Anggota Perekam Medis<br>& Informasi Kesehatan</p>
                <div class="auth-brand-stats">
                    <div class="auth-stat-item">
                        <span class="stat-num">1.2K+</span>
                        <span class="stat-lbl">Anggota</span>
                    </div>
                    <div class="auth-stat-divider"></div>
                    <div class="auth-stat-item">
                        <span class="stat-num">50+</span>
                        <span class="stat-lbl">Materi</span>
                    </div>
                    <div class="auth-stat-divider"></div>
                    <div class="auth-stat-item">
                        <span class="stat-num">24/7</span>
                        <span class="stat-lbl">Akses</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- FORM SECTION -->
        <div class="auth-form-section">
            <div id="loginForm" class="auth-form-box">
                <div class="auth-form-title">
                    <h2>Masuk ke Akun</h2>
                    <p>Akses dashboard, materi, dan kartu digital Anda</p>
                </div>
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
                        <input type="password" id="loginPass" placeholder="Masukkan kata sandi">
                        <button type="button" class="toggle-pass" onclick="togglePasswordVisibility(this)"><i data-lucide="eye"></i></button>
                    </div>
                </div>
                <div class="auth-options">
                    <label class="remember-me">
                        <input type="checkbox"> <span>Ingat Saya</span>
                    </label>
                    <a href="#" class="forgot-link">Lupa Sandi?</a>
                </div>
                <button class="auth-submit-btn" onclick="handleLogin()">
                    <i data-lucide="log-in"></i>
                    <span>Masuk Sekarang</span>
                </button>
                <div class="auth-divider">
                    <span>atau</span>
                </div>
                <button class="auth-secondary-btn" onclick="toggleAuthMode('register')">
                    <i data-lucide="user-plus"></i>
                    <span>Buat Akun Baru</span>
                </button>
            </div>

            <div id="registerForm" class="auth-form-box" style="display: none;">
                <div class="auth-form-title">
                    <h2>Daftar Anggota</h2>
                    <p>Gabung dengan komunitas PMIK profesional Indonesia</p>
                </div>
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
                    <label>Nomor WhatsApp</label>
                    <div class="input-wrapper">
                        <i data-lucide="phone"></i>
                        <input type="tel" id="regPhone" placeholder="08xxxxxxxxxx">
                    </div>
                </div>
                <div class="input-group-premium">
                    <label>Kata Sandi</label>
                    <div class="input-wrapper">
                        <i data-lucide="lock"></i>
                        <input type="password" id="regPass" placeholder="Min. 8 karakter">
                    </div>
                </div>
                <button class="auth-submit-btn" onclick="handleRegister()">
                    <i data-lucide="user-check"></i>
                    <span>Daftar Sekarang</span>
                </button>
                <div class="auth-divider">
                    <span>atau</span>
                </div>
                <button class="auth-secondary-btn" onclick="toggleAuthMode('login')">
                    <i data-lucide="log-in"></i>
                    <span>Sudah Punya Akun? Masuk</span>
                </button>
            </div>

            <div class="auth-footer">
                <p>&copy; 2024 DPP PORMIKI</p>
                <p>Platform Pengembangan Profesional PMIK</p>
            </div>
        </div>
    </div>
`;
