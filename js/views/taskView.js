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
            <!-- QUICK ADD TASK -->
            <div class="quick-add-task-card">
                <input type="text" id="newTaskInput" placeholder="Tulis tugas baru...">
                <select id="taskCategorySelect">
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="routine">Routine</option>
                </select>
                <button onclick="window.addTask()"><i data-lucide="plus"></i></button>
            </div>

            <!-- FILTER TABS -->
            <div class="task-filters-scroll">
                <div class="task-filter-tabs">
                    <button class="filter-tab active" onclick="window.filterTasks('all', this)">Semua</button>
                    <button class="filter-tab" onclick="window.filterTasks('urgent', this)">Urgent</button>
                    <button class="filter-tab" onclick="window.filterTasks('normal', this)">Normal</button>
                    <button class="filter-tab" onclick="window.filterTasks('routine', this)">Routine</button>
                </div>
            </div>

            <div class="section-header" style="margin-top: 1rem;">
                <h3 id="currentFilterTitle">Daftar Tugas</h3>
                <button class="btn-clear-tasks" onclick="window.clearFinishedTasks()" title="Hapus yang selesai">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>

            <div class="task-list" id="taskListContainer">
                <!-- Dynamic Tasks will be injected here -->
            </div>

            <div class="task-quote">
                <i data-lucide="quote"></i>
                <p id="dynamicQuote">"Satu berkas yang lengkap adalah awal dari pelayanan yang hebat."</p>
            </div>
        </div>
    </section>
`;
