export const profileView = `
    <section id="profileView" class="view-section">
        <div class="section-header" style="margin: 0 0 1rem 0; padding-top: 1rem;">
            <h3>Identitas Digital</h3>
        </div>
        
        <div id="profileECardArea">
            <!-- E-Card akan di-render di sini via renderECard() -->
        </div>

        <div class="profile-menu-list">
            <p class="menu-group-label">Pengaturan Akun</p>
            <a href="#" class="profile-menu-item">
                <div class="p-icon blue"><i data-lucide="edit-3"></i></div>
                <span>Edit Profil Pribadi</span>
                <i data-lucide="chevron-right"></i>
            </a>
            <a href="#" class="profile-menu-item">
                <div class="p-icon pink"><i data-lucide="lock"></i></div>
                <span>Ubah Kata Sandi</span>
                <i data-lucide="chevron-right"></i>
            </a>
            
            <p class="menu-group-label">Lainnya</p>
            <a href="#" class="profile-menu-item logout" onclick="showToast('Logout Berhasil', 'success')">
                <div class="p-icon red"><i data-lucide="log-out"></i></div>
                <span>Keluar Akun</span>
                <i data-lucide="chevron-right"></i>
            </a>
        </div>
    </section>
`;
