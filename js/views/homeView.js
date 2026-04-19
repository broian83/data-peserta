export const homeView = `
    <section id="homeView" class="view-section active">
        <div class="hero-banner">
            <div class="hero-content">
                <div class="hero-top-info">
                    <span id="currentDate" class="date-badge">Memuat Tanggal...</span>
                </div>
                <h2 id="greetingText">Halo, PMIK! 👋</h2>
                <p>Wujudkan digitalisasi kesehatan yang akurat dan profesional bersama PORMIKI.</p>
            </div>
        </div>

        <div class="section-header">
            <h3>Agenda Mendatang</h3>
            <a href="https://lms.kemkes.go.id" target="_blank" rel="noopener noreferrer" class="see-all">Ke LMS</a>
        </div>
        <div class="event-carousel">
            <a href="https://lms.kemkes.go.id/courses/46646913-62a7-434c-bf75-18557d7ccfbe" target="_blank" rel="noopener noreferrer"
                class="event-card hover-lift">
                <div class="event-tag">WEBINAR</div>
                <img src="https://be-lms.kemkes.go.id/v1/view?path=gp/uploads/images/1776327382645-fcf9ca20-7c7c-408e-96ec-7581cf1388a3.jpg"
                    alt="Poster webinar" loading="lazy">
                <div class="event-info">
                    <strong>PMIK sebagai Health Data Analyst</strong>
                    <span>Daftar melalui LMS Kemkes</span>
                </div>
            </a>
            <a href="https://lms.kemkes.go.id/courses/a79f23f4-78d6-408e-a7a5-b3722b356d2a" target="_blank" rel="noopener noreferrer"
                class="event-card hover-lift">
                <div class="event-tag">WEBINAR</div>
                <img src="https://be-lms.kemkes.go.id/v1/view?path=gp/uploads/images/1774846479631-79637f30-e1b0-4d7a-abe9-bc04c6b95e80.jpeg"
                    alt="Poster webinar" loading="lazy">
                <div class="event-info">
                    <strong>Penguatan Komunikasi Profesional</strong>
                    <span>Daftar melalui LMS Kemkes</span>
                </div>
            </a>
        </div>

        <div class="info-grid">
            <div class="info-card hover-lift" onclick="alert('Panduan Etika sedang dalam pembaruan')">
                <div class="ic-icon"><i data-lucide="shield-check"></i></div>
                <h4>Etika Profesi</h4>
                <p>Panduan perilaku PMIK.</p>
            </div>
            <div class="info-card hover-lift" onclick="alert('Detail STR sedang dalam pembaruan')">
                <div class="ic-icon gold"><i data-lucide="award"></i></div>
                <h4>STR & SKP</h4>
                <p>Update tata cara LMS.</p>
            </div>
        </div>

        <div class="resource-section">
            <div class="section-header" style="margin-top: 2rem;">
                <h3>Artikel & Berita</h3>
                <a href="#" class="see-all">Semua Artikel</a>
            </div>
            <div class="article-list">
                <div class="article-card hover-lift">
                    <img src="rme-article.png" alt="RME" class="article-img">
                    <div class="article-info">
                        <strong>Transformasi RME di Indonesia</strong>
                        <p>Langkah strategis percepatan Rekam Medis Elektronik...</p>
                        <div class="article-meta">
                            <span><i data-lucide="calendar"></i> 19 Apr 2024</span>
                            <span class="read-more">Baca <i data-lucide="arrow-right"></i></span>
                        </div>
                    </div>
                </div>
                <div class="article-card hover-lift">
                    <img src="career-article.png" alt="Karier" class="article-img">
                    <div class="article-info">
                        <strong>Masa Depan Karier PMIK</strong>
                        <p>Peluang baru PMIK sebagai Data Analyst di era digital...</p>
                        <div class="article-meta">
                            <span><i data-lucide="calendar"></i> 15 Apr 2024</span>
                            <span class="read-more">Baca <i data-lucide="arrow-right"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="resource-section" style="margin-top: 2rem;">
            <h3>Pusat Unduhan (PDF)</h3>
            <div class="resource-list">
                <div class="resource-item hover-lift">
                    <div class="res-icon"><i data-lucide="file-text"></i></div>
                    <div class="res-body">
                        <strong>PMK 24/2022 (Rekam Medis)</strong>
                        <span>Peraturan Menteri Kesehatan</span>
                    </div>
                    <a href="https://peraturan.bpk.go.id/Download/301563/Permenkes%20Nomor%2024%20Tahun%202022.pdf"
                        target="_blank" rel="noopener noreferrer" class="res-btn">
                        <i data-lucide="download"></i>
                    </a>
                </div>
                <div class="resource-item hover-lift">
                    <div class="res-icon"><i data-lucide="award"></i></div>
                    <div class="res-body">
                        <strong>Pedoman Pemenuhan SKP</strong>
                        <span>Petunjuk Pengelolaan SKP</span>
                    </div>
                    <a href="https://www.ipkindonesia.or.id/media/2025/03/KMK-HK-0107-1561-2024-Pedoman-Pengelolaan-Pemenuhan-Kecukupan-SKP-Tenaga-Medis-dan-Tenaga-Kesehatan.pdf"
                        target="_blank" rel="noopener noreferrer" class="res-btn">
                        <i data-lucide="download"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="quick-links" style="margin-top: 1rem;">
            <a href="https://pormiki.or.id" target="_blank" rel="noopener noreferrer" class="q-link hover-lift">
                <i data-lucide="layout"></i>
                <span>Website DPP</span>
            </a>
            <a href="https://lms.kemkes.go.id" target="_blank" rel="noopener noreferrer" class="q-link hover-lift">
                <i data-lucide="graduation-cap"></i>
                <span>LMS Kemkes</span>
            </a>
        </div>
    </section>
`;
