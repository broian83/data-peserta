export const homeView = `
    <section id="homeView" class="view-section active">
        <!-- HEADER / USER PROFILE -->
        <header class="home-header">
            <div class="user-info">
                <div class="user-avatar-small grad-primary" id="homeAvatar">
                    <span id="homeInitial">P</span>
                </div>
                <div class="user-welcome">
                    <p>Selamat Datang,</p>
                    <h3 id="userNameDisplay">Rekan PMIK</h3>
                </div>
            </div>
        </header>

        <!-- DASHBOARD BODY CONTAINER -->
        <div class="dashboard-body">
            
            <!-- PRODUCTIVITY WIDGET (SUMMARY TASK) -->
            <div class="home-task-widget" id="homeTaskWidget">
                <div class="widget-header">
                    <h4>Tugas Penting Hari Ini</h4>
                    <button class="btn-text" onclick="window.navigateTo('task')">Lihat Semua <i data-lucide="chevron-right"></i></button>
                </div>
                <div class="home-task-list" id="homeSummaryTasks">
                    <!-- Top 2-3 Urgent/Normal tasks injected here -->
                    <div class="empty-mini-task">
                        <p>Memuat tugas Anda...</p>
                    </div>
                </div>
            </div>

            <!-- QUICK ACCESS GRID -->
            <div class="quick-grid">
                <div class="quick-item" onclick="window.navigateTo('materi')">
                    <div class="icon-box color-1">
                        <i data-lucide="book-open"></i>
                    </div>
                    <span>Materi Akreditasi</span>
                </div>
                <div class="quick-item" onclick="window.navigateTo('task')">
                    <div class="icon-box color-2">
                        <i data-lucide="clipboard-list"></i>
                    </div>
                    <span>Manajemen Tugas</span>
                </div>
                <div class="quick-item" onclick="window.navigateTo('profile')">
                    <div class="icon-box color-3">
                        <i data-lucide="user"></i>
                    </div>
                    <span>Profil ID</span>
                </div>
                <div class="quick-item" onclick="window.showHelp()">
                    <div class="icon-box color-4">
                        <i data-lucide="help-circle"></i>
                    </div>
                    <span>Pusat Bantuan</span>
                </div>
            </div>

            <!-- NEWS / BANNER SLIDER -->
            <div class="news-slider">
                <div class="slide">
                    <div class="slide-content grad-purple">
                        <div class="slide-text">
                            <span class="badge">Terbaru</span>
                            <h4>Modul Rekam Medis Elektronik (RME)</h4>
                            <p>Pelajari standar terbaru kebijakan RME 2024</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=250&fit=crop" alt="News">
                    </div>
                </div>
            </div>

            <!-- RECENT ACTIVITIES -->
            <div class="section-title">
                <h4>Aktivitas Materi</h4>
                <div class="title-line"></div>
            </div>

            <div class="activities-list">
                <div class="activity-card" onclick="window.navigateTo('materi')">
                    <div class="activity-icon bg-soft-primary">
                        <i data-lucide="book-open"></i>
                    </div>
                    <div class="activity-detail">
                        <p class="act-title">Standar MRMIK 1-13</p>
                        <p class="act-time">Diperbarui: 2 jam yang lalu</p>
                    </div>
                    <div class="act-badge premium">Baru</div>
                </div>
                <div class="activity-card" onclick="window.navigateTo('task')">
                    <div class="activity-icon bg-soft-success">
                        <i data-lucide="check-circle-2"></i>
                    </div>
                    <div class="activity-detail">
                        <p class="act-title">Laporan Kinerja Bulanan</p>
                        <p class="act-time">Siap untuk diekspor</p>
                    </div>
                    <div class="act-badge success">Ready</div>
                </div>
                <div class="activity-card" onclick="window.showHelp()">
                    <div class="activity-icon bg-soft-purple">
                        <i data-lucide="sparkles"></i>
                    </div>
                    <div class="activity-detail">
                        <p class="act-title">Update Fitur Global Search</p>
                        <p class="act-time">Coba cari materi apapun</p>
                    </div>
                    <div class="act-badge info">Info</div>
                </div>
            </div>

            <!-- FOOTER SPACING -->
            <div style="height: 100px;"></div>
        </div>
    </section>
`;
