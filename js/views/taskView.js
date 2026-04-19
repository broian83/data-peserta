export const taskView = `
    <section id="taskView" class="view-section">
        <div class="task-hero">
            <div class="task-hero-content">
                <span class="task-badge">Status Produktivitas</span>
                <h2>Target Hari Ini</h2>
                <div class="productivity-card">
                    <div class="prod-info" id="taskStats">
                        <strong>Target Berkas</strong>
                        <span>0 / 0 Selesai</span>
                    </div>
                    <div class="prod-progress-bar">
                        <div class="prod-progress-fill" id="taskProgressBar" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="task-container">
            <!-- WEEKLY STATS CHART -->
            <div class="weekly-stats-container">
                <div class="stats-header">
                    <h4>Aktivitas 7 Hari Terakhir</h4>
                    <span id="totalWeeklyDone">0 Tugas Selesai</span>
                </div>
                <div class="mini-bar-chart" id="weeklyChartContainer">
                    <!-- Day bars injected here -->
                </div>
            </div>

            <!-- FULL VERTICAL QUICK ADD -->
            <div class="advanced-add-card" style="margin-top: 1.5rem;">
                <input type="text" id="newTaskInput" placeholder="Tulis tugas baru (misal: Coding 10 RM)...">
                
                <!-- QUICK TAG CHIPS -->
                <div class="quick-tags-scroll">
                    <div class="quick-tags-list">
                        <button class="tag-chip" onclick="window.setQuickTask('Coding Berkas ')"><i data-lucide="code-2"></i> Coding</button>
                        <button class="tag-chip" onclick="window.setQuickTask('Assembling RM ')"><i data-lucide="files"></i> Assembling</button>
                        <button class="tag-chip" onclick="window.setQuickTask('Klaim BPJS ')"><i data-lucide="shield-check"></i> Klaim</button>
                        <button class="tag-chip" onclick="window.setQuickTask('Laporan SIRS ')"><i data-lucide="area-chart"></i> SIRS</button>
                        <button class="tag-chip" onclick="window.setQuickTask('Indeksing ')"><i data-lucide="list-ordered"></i> Indeksing</button>
                    </div>
                </div>

                <div class="add-options-row">
                    <div class="opt-group">
                        <i data-lucide="tag"></i>
                        <select id="taskCategorySelect">
                            <option value="normal">Normal</option>
                            <option value="urgent">Urgent</option>
                            <option value="routine">Routine</option>
                        </select>
                    </div>
                    <div class="opt-group">
                        <i data-lucide="calendar"></i>
                        <input type="datetime-local" id="taskDateInput">
                    </div>
                </div>

                <button onclick="window.addTask()" class="btn-primary-add">
                    <i data-lucide="plus"></i> Tambah Tugas
                </button>
            </div>

            <!-- SEARCH BAR -->
            <div class="task-search-wrapper">
                <i data-lucide="search"></i>
                <input type="text" id="taskSearchInput" placeholder="Cari tugas atau kategori..." oninput="window.handleTaskSearch(this.value)">
            </div>

            <!-- FILTER TABS -->
            <div class="task-filters-scroll">
                <div class="task-filter-tabs">
                    <button class="filter-tab active" onclick="window.filterTasks('all', this)">Semua</button>
                    <button class="filter-tab" onclick="window.filterTasks('urgent', this)">Urgent</button>
                    <button class="filter-tab" onclick="window.filterTasks('normal', this)">Normal</button>
                    <button class="filter-tab" onclick="window.filterTasks('routine', this)">Routine</button>
                    <button class="filter-tab history-tab" onclick="window.filterTasks('completed', this)">
                        <i data-lucide="history"></i> Selesai
                    </button>
                </div>
            </div>

            <div class="section-header" style="margin-top: 1rem;">
                <h3 id="currentFilterTitle">Daftar Tugas Anda</h3>
                <button class="btn-clear-tasks" onclick="window.clearFinishedTasks()" title="Hapus yang selesai">
                    <i data-lucide="trash-2"></i> Hapus Semua
                </button>
            </div>

            <div class="task-list" id="taskListContainer">
                <!-- Dynamic Tasks -->
            </div>

            <div class="task-quote">
                <i data-lucide="quote"></i>
                <p id="dynamicQuote">"Satu berkas yang lengkap adalah awal dari pelayanan yang hebat."</p>
            </div>
        </div>
    </section>
`;
