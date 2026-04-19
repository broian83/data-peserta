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
            <!-- SOPHISTICATED QUICK ADD TASK -->
            <div class="advanced-add-card">
                <input type="text" id="newTaskInput" placeholder="Tulis tugas baru (misal: Coding 10 RM)...">
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
                        <input type="date" id="taskDateInput">
                    </div>
                    <button onclick="window.addTask()" class="btn-primary-add"><i data-lucide="plus"></i></button>
                </div>
            </div>

            <!-- FILTER TABS WITH HISTORY -->
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
                <button class="btn-clear-tasks" onclick="window.clearFinishedTasks()" title="Hapus Permanen yang selesai">
                    <i data-lucide="trash-2"></i> Hapus Semua
                </button>
            </div>

            <div class="task-list" id="taskListContainer">
                <!-- Dynamic Tasks -->
            </div>

            <div class="task-quote">
                <i data-lucide="quote"></i>
                <p id="dynamicQuote">"Efisiensi adalah melakukan hal dengan benar. Efektivitas adalah melakukan hal yang benar."</p>
            </div>
        </div>
    </section>
`;
