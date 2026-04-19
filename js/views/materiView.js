export const materiView = `
    <section id="materiView" class="view-section">
        <div class="section-intro" style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.4rem; font-weight: 850; margin-bottom: 0.5rem;">Pusat Materi</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Unduh file presentasi, video, dan dokumen resmi webinar.</p>
        </div>

        <div class="search-container-box hover-lift">
            <div class="search-input-wrapper">
                <i data-lucide="search" class="si-icon"></i>
                <input type="text" id="materiSearch" placeholder="Cari materi atau pembicara...">
            </div>
        </div>

        <div class="materi-filters">
            <button class="filter-chip active" onclick="updateMateriFilter('all', this)">Semua</button>
            <button class="filter-chip" onclick="updateMateriFilter('PDF', this)">PDF</button>
            <button class="filter-chip" onclick="updateMateriFilter('PPTX', this)">PowerPoint</button>
            <button class="filter-chip" onclick="updateMateriFilter('VIDEO', this)">Video</button>
        </div>

        <div class="materi-list" id="materiList">
            <!-- Materi akan diisi via JS via renderMateri() -->
        </div>
    </section>
`;
