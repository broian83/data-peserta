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
                <input type="text" id="newTaskInput" placeholder="Tulis tugas baru (misal: Coding 20 RM)...">
                <select id="taskCategorySelect">
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="routine">Routine</option>
                </select>
                <button onclick="window.addTask()"><i data-lucide="plus"></i></button>
            </div>

            <div class="section-header" style="margin-top: 2rem;">
                <h3>Daftar Tugas Saya</h3>
                <button class="btn-clear-tasks" onclick="window.clearFinishedTasks()" title="Hapus yang selesai">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>

            <div class="task-list" id="taskListContainer">
                <!-- Dynamic Tasks will be injected here -->
                <div class="empty-state-tasks">
                    <i data-lucide="list-todo"></i>
                    <p>Belum ada tugas. Tambahkan sekarang!</p>
                </div>
            </div>

            <div class="task-quote">
                <i data-lucide="quote"></i>
                <p id="dynamicQuote">"Data yang akurat menyelamatkan nyawa. Semangat bekerja, PMIK!"</p>
            </div>
        </div>
    </section>
`;
