export const taskView = `
    <section id="taskView" class="view-section">
        <div class="task-hero">
            <div class="task-hero-content">
                <span class="task-badge">Status Produktivitas</span>
                <h2>Target Hari Ini</h2>
                <div class="productivity-card">
                    <div class="prod-info">
                        <strong>Coding Berkas</strong>
                        <span>32 / 50 Selesai</span>
                    </div>
                    <div class="prod-progress-bar">
                        <div class="prod-progress-fill" style="width: 64%"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="task-container">
            <div class="section-header">
                <h3>Daftar Tugas</h3>
                <button class="btn-add-task" onclick="alert('Fitur tambah tugas sedang disiapkan')">
                    <i data-lucide="plus"></i>
                </button>
            </div>

            <div class="task-list">
                <div class="task-item prioritized">
                    <div class="task-checkbox"><i data-lucide="check"></i></div>
                    <div class="task-text">
                        <strong>Klaim BPJS - Berkas RJ</strong>
                        <span>Batas waktu: Pukul 15:00 WIB</span>
                    </div>
                    <div class="task-tag urgent">URGENT</div>
                </div>

                <div class="task-item">
                    <div class="task-checkbox active"><i data-lucide="check"></i></div>
                    <div class="task-text">
                        <strong>Analisis Kuantitatif RM</strong>
                        <span>Bangsal Melati - 15 Berkas</span>
                    </div>
                    <div class="task-tag">NORMAL</div>
                </div>

                <div class="task-item">
                    <div class="task-checkbox"><i data-lucide="check"></i></div>
                    <div class="task-text">
                        <strong>Update SIRS Online</strong>
                        <span>Laporan bulanan Maret</span>
                    </div>
                    <div class="task-tag routine">ROUTINE</div>
                </div>

                <div class="task-item">
                    <div class="task-checkbox"><i data-lucide="check"></i></div>
                    <div class="task-text">
                        <strong>Verifikasi SIP Dokter</strong>
                        <span>Update database kepegawaian</span>
                    </div>
                    <div class="task-tag routine">ROUTINE</div>
                </div>
            </div>

            <div class="task-quote">
                <i data-lucide="quote"></i>
                <p>"Data yang akurat menyelamatkan nyawa. Semangat bekerja, PMIK!"</p>
            </div>
        </div>
    </section>
`;
