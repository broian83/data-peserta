import { homeView } from './js/views/homeView.js';
import { materiView } from './js/views/materiView.js';
import { profileView } from './js/views/profileView.js';
import { authView } from './js/views/authView.js';

let participants = [];
let isLoggedIn = false; // Simulation state
let currentMateriCategory = 'all';
let materiLimit = 4; // Tampilkan 4 materi awal

// Toast Notification System
function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-triangle',
        info: 'info'
    };

    toast.innerHTML = `
        <i data-lucide="${icons[type]}" class="toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Tutup">
            <i data-lucide="x" style="width:16px;height:16px;"></i>
        </button>
    `;

    container.appendChild(toast);
    window.lucide.createIcons();

    // Close button
    toast.querySelector('.toast-close').onclick = () => removeToast(toast);

    // Auto remove
    setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
    toast.style.animation = 'toastSlideOut 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
}

// Replace alert with toast
const originalAlert = window.alert;
window.alert = function(message) {
    // Check if it's a navigation alert
    if (message.includes('Belum ada') || message.includes('sedang dalam pembaruan')) {
        showToast(message, 'info');
    } else {
        originalAlert(message);
    }
};

// Inject Confetti Script
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
document.head.appendChild(confettiScript);

// Load data from data.json
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        participants = Array.isArray(data) ? data : (data.participants || []);
        updateStats();
    } catch (error) {
        console.error('Error loading data:', error);
        updateStats();
    }
}

function updateStats() {
    const statsEl = document.getElementById('totalStats');
    if (statsEl) {
        statsEl.textContent = `${participants.length.toLocaleString()} Peserta Terdaftar`;
    }
}

// SMART GREETING & DATE
function updateHomeInfo() {
    const greetingEl = document.getElementById('greetingText');
    const dateEl = document.getElementById('currentDate');

    if (!greetingEl || !dateEl) return;

    const hour = new Date().getHours();
    let welcome = "Halo, Rekan PMIK! 👋";
    if (hour >= 0 && hour < 3) welcome = "Selamat Dini Hari, Rekan PMIK! 🌌";
    else if (hour >= 3 && hour < 5) welcome = "Selamat Subuh, Rekan PMIK! 🕌";
    else if (hour >= 5 && hour < 11) welcome = "Selamat Pagi, Rekan PMIK! 🌅";
    else if (hour >= 11 && hour < 15) welcome = "Selamat Siang, Rekan PMIK! ☀️";
    else if (hour >= 15 && hour < 18) welcome = "Selamat Sore, Rekan PMIK! 🌇";
    else welcome = "Selamat Malam, Rekan PMIK! 🌙";
    greetingEl.textContent = welcome;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('id-ID', options);
}


// VIEW SWITCHER
function switchView(viewId, btn) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(viewId + 'View');
    if (target) {
        target.classList.add('active');
        target.style.display = 'block'; // Ensure it's visible if manually hidden
    }

    // Hide other views explicitly just in case
    document.querySelectorAll('.view-section').forEach(s => {
        if (s.id !== viewId + 'View') s.style.display = 'none';
    });

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    // Handle bottom nav button highlight
    if (btn) {
        btn.classList.add('active');
    } else {
        // Find matching nav item if btn is not provided
        const navItems = document.querySelectorAll('.nav-item');
        if (viewId === 'home') navItems[0].classList.add('active');
        else if (viewId === 'materi') navItems[1].classList.add('active');
        else if (viewId === 'profile') navItems[2].classList.add('active');
    }

    // Update Header Text
    const titles = { 'home': 'Dashboard', 'materi': 'Materi Webinar', 'profile': 'Profil Anggota' };
    const titleEl = document.querySelector('.view-indicator');
    if (titleEl) titleEl.textContent = titles[viewId] || 'Dashboard';

    if (viewId === 'materi') renderMateri();
    if (viewId === 'profile') renderECard();
    if (viewId === 'home') updateHomeInfo();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) window.lucide.createIcons();
}

function runCelebration() {
    if (typeof confetti === 'function') {
        const duration = 2 * 1000;
        const end = Date.now() + duration;
        (function frame() {
            confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#00b5a5', '#c4d600'] });
            confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#00b5a5', '#c4d600'] });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }
}

function searchParticipants() {
    const query = document.getElementById('emailSearch').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('resultsContainer');
    const skeleton = document.getElementById('skeletonLoader');

    if (!query) {
        resultsContainer.innerHTML = `
            <div class="welcome-card-new">
                <div class="welcome-illustration">
                    <img src="pormiki-logo.png" alt="PORMIKI">
                </div>
                <h3>Mencari Sertifikat?</h3>
                <p>Pastikan email yang Anda masukkan sama dengan saat pendaftaran webinar.</p>
                <div class="step-guide-horizontal">
                    <div class="step-item">
                        <div class="step-num">1</div>
                        <span>Input Email</span>
                    </div>
                    <div class="step-sep"></div>
                    <div class="step-item">
                        <div class="step-num">2</div>
                        <span>Cari Data</span>
                    </div>
                </div>
            </div>`;
        lucide.createIcons();
        return;
    }

    resultsContainer.innerHTML = '';
    skeleton.style.display = 'block';

    setTimeout(() => {
        const filtered = participants.filter(p => {
            const email = (getValueByPossibleKeys(p, ['Email', 'Email Address', 'Alamat Email', 'e-mail', 'EMAIL']) || '').toString().toLowerCase().trim();
            return email === query;
        });

        skeleton.style.display = 'none';
        if (filtered.length > 0) runCelebration();
        displayResults(filtered);
    }, 400);
}

function getValueByPossibleKeys(obj, possibleKeys) {
    for (let key of possibleKeys) {
        const trimmedKey = key.trim();
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
        for (let actualKey in obj) {
            if (actualKey.trim() === trimmedKey && obj[actualKey] !== "") return obj[actualKey];
        }
    }
    return null;
}

async function shareCard(btnElement) {
    const card = btnElement.closest('.virtual-card');
    const shareElements = card.querySelectorAll('.actions-row, .btn-action-outline');

    const originalContent = btnElement.innerHTML;
    btnElement.innerHTML = '<i data-lucide="loader-2" class="animate-spin" size="16"></i> Tunggu...';
    lucide.createIcons();

    try {
        shareElements.forEach(el => el.style.setProperty('display', 'none', 'important'));

        const canvas = await html2canvas(card, {
            useCORS: true,
            allowTaint: true,
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
                const clonedName = clonedDoc.querySelector('.p-name');
                if (clonedName) {
                    clonedName.style.letterSpacing = 'normal';
                    clonedName.style.wordSpacing = '4px';
                }
            }
        });

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], 'E-Card-PORMIKI.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'E-Card Peserta Webinar PORMIKI',
                text: 'Saya sudah terdaftar di *Webinar Penguatan Komunikasi Profesional pada Perekam Medis dan informasi kesehatan dalam Pelayanan dan Pengelolaan Rekam Medis*\n\nCek juga E-Card kamu di sini\n\nhttps://pormiki.netlify.app/'
            });
        } else {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'E-Card-PORMIKI.png';
            link.click();
            showToast('Gambar berhasil diunduh! Silakan bagikan ke WhatsApp Status Anda.', 'success');
        }
    } catch (err) {
        console.error('Error sharing:', err);
        showToast('Gagal membagikan gambar. Silakan coba simpan secara manual atau screenshot.', 'error');
    } finally {
        shareElements.forEach(el => el.style.display = '');
        btnElement.innerHTML = originalContent;
        lucide.createIcons();
    }
}

function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = `<div class="empty-state"><i data-lucide="user-x" size="64"></i><p>Alamat email tidak terdaftar.<br>Pastikan email sudah sesuai.</p></div>`;
    } else {
        results.forEach((p, index) => {
            let rawName = getValueByPossibleKeys(p, ['Nama Anggota', 'Nama', 'Full Name', 'Nama Lengkap', 'Name', 'Lengkap']) || 'Peserta Webinar';
            const cleanName = rawName.trim().replace(/\s+/g, ' ');
            const htmlName = cleanName.split(' ').join('&nbsp;');

            const email = getValueByPossibleKeys(p, ['Email', 'Email Address', 'Alamat Email', 'e-mail']) || '-';
            const instansi = getValueByPossibleKeys(p, ['Instansi', 'Organization', 'Workplace', 'Unit Kerja', 'Institusi', 'RS', 'Kantor', 'Institution / Workplace']) || '-';
            const phone = getValueByPossibleKeys(p, ['No HP', 'Phone', 'WhatsApp', 'Telepon', 'Mobile']) || '-';

            const originalIndex = participants.indexOf(p);
            const idPeserta = (p.ID || p.id || p.No || (originalIndex !== -1 ? originalIndex + 1001 : index + 1001)).toString().padStart(6, '0');

            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'ecard-container';
            cardWrapper.innerHTML = `
                <div class="virtual-card">
                    <div class="ecard-top">
                        <span class="ecard-title">KARTU PESERTA WEBINAR</span>
                    </div>
                    <div class="ecard-body">
                        <div class="avatar-container">
                            <img src="pormiki-logo.png" alt="PORMIKI" style="width: 70%; height: auto;">
                        </div>
                        <h2 class="p-name">${htmlName}</h2>
                        <span class="p-status">PARTICIPANT</span>
                        <div class="details-grid">
                            <div class="detail-row"><span class="detail-label">Email Address</span><span class="detail-value">${email}</span></div>
                            <div class="detail-row"><span class="detail-label">Institution / Workplace</span><span class="detail-value">${instansi}</span></div>
                            <div class="detail-row"><span class="detail-label">WhatsApp Number</span><span class="detail-value">${phone}</span></div>
                        </div>
                        <div class="barcode-sim"></div>
                        <span class="id-number">REG-ID: ${idPeserta}</span>
                        
                        <div class="actions-row">
                            <button class="btn-action primary-action" onclick="shareCard(this)">
                                <i data-lucide="share-2" size="20"></i> Bagikan Ke Pesan
                            </button>
                            <button class="btn-action secondary-action" onclick="window.print()">
                                <i data-lucide="download-cloud" size="20"></i> Simpan Sebagai PDF
                            </button>
                        </div>
                        
                        <button class="btn-action-outline" onclick="navigator.clipboard.writeText('${idPeserta}'); showToast('ID ${idPeserta} disalin!', 'success')">
                            <i data-lucide="copy" size="16"></i> Salin ID: ${idPeserta}
                        </button>
                    </div>
                </div>`;
            container.appendChild(cardWrapper);
        });
    }
    lucide.createIcons();
}

// Initializations
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    window.switchView = switchView; // Expose to global scope
    updateHomeInfo();

    // PWA & NOTIFICATION SYSTEM
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(reg => {
            console.log('SW Registered!', reg);
            
            // Listen for updates
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateToast();
                    }
                });
            });
        }).catch(err => console.error('SW Registration Failed!', err));
    }

    // Request Notification Permission
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') console.log('Notification permission granted.');
        });
    }

    function showUpdateToast() {
        if (document.getElementById('updateToast')) return;
        const toast = document.createElement('div');
        toast.id = 'updateToast';
        toast.className = 'update-toast';
        toast.innerHTML = `
            <span>✨ Versi baru tersedia!</span>
            <button class="btn-refresh-app" onclick="location.reload()">Refresh</button>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
    }

    // AI CHATBOT LOGIC (SECURED VIA NETLIFY FUNCTIONS)
    const aiToggle = document.getElementById('aiToggle');
    const aiModal = document.getElementById('aiModal');
    const aiClose = document.getElementById('aiClose');
    const aiMessages = document.getElementById('aiMessages');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');

    if (aiToggle) {
        aiToggle.addEventListener('click', () => {
            aiModal.classList.add('active');
            aiModal.hidden = false;
            aiInput?.focus();
            if (aiMessages.children.length <= 1) {
                const welcome = document.createElement('div');
                welcome.className = 'ai-msg bot';
                welcome.innerHTML = 'Halo Rekan PMIK! 👋 Saya Aura, asisten AI PORMIKI. Ada yang bisa saya bantu terkait E-Card atau Webinar hari ini?';
                aiMessages.appendChild(welcome);
            }
        });
    }

    if (aiClose) aiClose.addEventListener('click', () => {
        aiModal.classList.remove('active');
        aiModal.hidden = true;
    });

    // Keyboard accessibility - Escape to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiModal.classList.contains('active')) {
            aiModal.classList.remove('active');
            aiModal.hidden = true;
        }
    });

    const handleSendMessage = async () => {
        const text = aiInput.value.trim();
        if (!text) return;

        // User Message
        const getChatTime = () => {
            const now = new Date();
            return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        };

        const userMsg = document.createElement('div');
        userMsg.className = 'ai-msg user';
        userMsg.innerHTML = `${text}<span class="ai-time">${getChatTime()}</span>`;
        aiMessages.appendChild(userMsg);
        aiInput.value = '';
        aiMessages.scrollTop = aiMessages.scrollHeight;

        // Add Loading State
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'ai-msg bot';
        loadingMsg.innerHTML = '<em>Aura sedang mengetik...</em>';
        aiMessages.appendChild(loadingMsg);
        aiMessages.scrollTop = aiMessages.scrollHeight;

        try {
            // PANGGILAN AMAN KE NETLIFY FUNCTION
            const response = await fetch('/.netlify/functions/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            // Cek jika respon server bermasalah (misal 500)
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Server Error (${response.status})`);
            }

            const data = await response.json();

            // Hapus loading
            if (loadingMsg && loadingMsg.parentNode) loadingMsg.remove();

            if (data.choices && data.choices[0]) {
                const botMsg = document.createElement('div');
                botMsg.className = 'ai-msg bot';
                // Render Markdown menggunakan marked.js
                const rawContent = data.choices[0].message.content;
                botMsg.innerHTML = marked.parse(rawContent) + `<span class="ai-time">${getChatTime()}</span>`;
                aiMessages.appendChild(botMsg);
                aiMessages.scrollTop = aiMessages.scrollHeight;
            }

        } catch (error) {
            // Hapus loading
            if (loadingMsg && loadingMsg.parentNode) loadingMsg.remove();

            const errorMsg = document.createElement('div');
            errorMsg.className = 'ai-msg bot';
            // Tampilkan pesan error yang lebih informatif
            if (error.message.includes('API Key')) {
                errorMsg.innerHTML = `🛡️ <strong>Aura:</strong> API Key belum dikonfigurasi.<span class="ai-time">${getChatTime()}</span>`;
            } else {
                errorMsg.innerHTML = `⚠️ Gangguan teknis: ${error.message}<span class="ai-time">${getChatTime()}</span>`;
            }
            aiMessages.appendChild(errorMsg);
        }
    };

    window.askAI = (q) => {
        aiInput.value = q;
        handleSendMessage();
    };

    // 3. DARK MODE ENGINE
    const darkModeToggle = document.getElementById('darkModeToggle');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    const currentTheme = localStorage.getItem('theme') || 'light';

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    };

    setTheme(currentTheme);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(theme);
        });
    }

    if (aiSend) aiSend.addEventListener('click', handleSendMessage);
    if (aiInput) aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
});

// 5. RESOURCE CENTER ENGINE
const materiData = [
    { title: "Komunikasi Profesional PMIK", speaker: "Dr. Budi Santoso", type: "PDF", category: "Komunikasi", link: "https://pormiki.netlify.app/", icon: "file-text", size: "2.4 MB" },
    { title: "Standardisasi RME 2024", speaker: "Siti Aminah, M.Kom", type: "PPTX", category: "Rekam Medis", link: "https://pormiki.netlify.app/", icon: "presentation", size: "5.1 MB" },
    { title: "Aspek Hukum Informasi Kesehatan", speaker: "Adv. Robertus Lee", type: "PDF", category: "Hukum", link: "https://pormiki.netlify.app/", icon: "file-text", size: "1.8 MB" },
    { title: "Audit Medis Berbasis Data", speaker: "Dra. Elly Risman", type: "VIDEO", category: "Audit", link: "https://pormiki.netlify.app/", icon: "video", size: "45 MB" },
    { title: "Manajemen Resiko Klinis", speaker: "Dr. H. Siswanto", type: "PDF", category: "Manajemen", link: "https://pormiki.netlify.app/", icon: "shield", size: "3.2 MB" }
];

function renderMateri(filter = '', category = 'all') {
    const list = document.getElementById('materiList');
    if (!list) return;

    let filtered = materiData.filter(m =>
        (m.title.toLowerCase().includes(filter.toLowerCase()) ||
        m.speaker.toLowerCase().includes(filter.toLowerCase())) &&
        (category === 'all' || m.type === category)
    );

    const totalResults = filtered.length;
    const paginated = filtered.slice(0, materiLimit);

    if (totalResults === 0) {
        list.innerHTML = `
            <div class="empty-state-mini">
                <i data-lucide="search-x"></i>
                <p>Materi tidak ditemukan</p>
            </div>
        `;
    } else {
        let html = paginated.map((m, idx) => `
            <div class="materi-card-premium hover-lift" style="--card-color: ${getTypeColor(m.type)}" onclick="showMateriDetail(${idx})">
                <div class="m-card-header">
                    <span class="m-badge">${m.category}</span>
                    <span class="m-size">${m.size}</span>
                </div>
                <div class="m-card-body">
                    <div class="m-icon-box">
                        <i data-lucide="${m.icon}"></i>
                    </div>
                    <div class="m-text-box">
                        <h4>${m.title}</h4>
                        <p><i data-lucide="user"></i> ${m.speaker}</p>
                    </div>
                </div>
                <div class="m-card-footer">
                    <div class="m-type-label">
                        <span class="type-dot"></span>
                        ${m.type}
                    </div>
                </div>
            </div>
        `).join('');

        if (totalResults > materiLimit) {
            html += `
                <div class="load-more-container">
                    <button class="btn-load-more" onclick="loadMoreMateri()">
                        Tampilkan Lebih Banyak (${totalResults - materiLimit})
                        <i data-lucide="chevron-down"></i>
                    </button>
                </div>
            `;
        }

        list.innerHTML = html;
    }
    if (window.lucide) window.lucide.createIcons();
}

window.showMateriDetail = (index) => {
    const m = materiData[index];
    const modal = document.getElementById('materiDetailModal');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;

    body.innerHTML = `
        <div class="modal-header-premium">
            <div class="m-badge" style="background: var(--bg-card); color: var(--primary); padding: 0.5rem 1rem;">${m.category}</div>
            <button class="close-modal-btn" onclick="closeMateriDetail()"><i data-lucide="x"></i></button>
        </div>
        <div class="detail-cover">
            <i data-lucide="${m.icon}"></i>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 850; margin-bottom: 0.5rem;">${m.title}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Oleh <strong>${m.speaker}</strong></p>
        
        <div class="detail-meta-row">
            <div class="meta-item-box"><span>Tipe File</span><strong>${m.type}</strong></div>
            <div class="meta-item-box"><span>Ukuran</span><strong>${m.size}</strong></div>
            <div class="meta-item-box"><span>Akses</span><strong>Anggota</strong></div>
        </div>

        <p class="detail-desc">Materi ini merupakan bagian dari rangkaian pengembangan berkelanjutan PORMIKI. Silakan unduh untuk referensi belajar atau materi di fasyankes Anda.</p>
        
        <div class="detail-actions">
            <a href="${m.link}" class="btn-action primary-action" style="width: 100%; border-radius: 1rem;" target="_blank">
                <i data-lucide="download"></i> Unduh File Materi
            </a>
            <button class="btn-action" style="width: 100%; border-radius: 1rem; border: 1px solid var(--border-color); background: none; color: var(--text-main)" onclick="closeMateriDetail()">
                Kembali
            </button>
        </div>
    `;

    modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
};

window.closeMateriDetail = () => {
    document.getElementById('materiDetailModal')?.classList.remove('active');
};

// 7. AUTHENTICATION LOGIC
function checkAuth() {
    const loginView = document.getElementById('loginView');
    const bottomNav = document.querySelector('.bottom-nav');

    if (!isLoggedIn) {
        if (loginView) {
            loginView.innerHTML = authView;
            loginView.style.display = 'flex';
        }
        if (bottomNav) bottomNav.style.setProperty('display', 'none', 'important');
    } else {
        if (loginView) loginView.style.display = 'none';
        if (bottomNav) bottomNav.style.display = 'flex';
        renderECard(); 
    }
    if (window.lucide) window.lucide.createIcons();
}

window.toggleAuthMode = (mode) => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (mode === 'login') {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        loginForm.style.animation = 'authFadeIn 0.4s ease';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        registerForm.style.animation = 'authFadeIn 0.4s ease';
    }
    if (window.lucide) window.lucide.createIcons();
};

window.togglePasswordVisibility = (btn) => {
    const input = btn.parentElement.querySelector('input');
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i data-lucide="eye-off"></i>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<i data-lucide="eye"></i>';
    }
    if (window.lucide) window.lucide.createIcons();
};

window.handleLogin = () => {
    showToast('Mengecek Kredensial...', 'info');
    setTimeout(() => {
        isLoggedIn = true;
        checkAuth();
        showToast('Selamat Datang Kembali!', 'success');
    }, 1500);
};

window.handleRegister = () => {
    showToast('Mendaftarkan Akun...', 'info');
    setTimeout(() => {
        showToast('Pendaftaran Berhasil! Silakan Masuk.', 'success');
        window.toggleAuthMode('login');
    }, 1500);
};

window.loadMoreMateri = () => {
    materiLimit += 4;
    const searchVal = document.getElementById('materiSearch')?.value || '';
    renderMateri(searchVal, currentMateriCategory);
};

window.updateMateriFilter = (category, btn) => {
    currentMateriCategory = category;
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const searchVal = document.getElementById('materiSearch')?.value || '';
    renderMateri(searchVal, category);
};

function getTypeColor(type) {
    const colors = {
        'PDF': '#ff4757',
        'PPTX': '#ffa502',
        'VIDEO': '#3742fa',
        'ZIP': '#2f3542'
    };
    return colors[type] || '#2ed573';
}

function renderECard() {
    const area = document.getElementById('profileECardArea');
    if (!area) return;

    // Simulasi data member yang login
    const member = {
        id: "POR-2024-001",
        name: "Brian",
        role: "Perekam Medis",
        instansi: "RS Umum Daerah Jakarta",
        wa: "081234567890",
        status: "VERIFIED MEMBER",
        tglDaftar: "15 Jan 2024",
        masaBerlaku: "Seumur Hidup"
    };

    const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    area.innerHTML = `
        <div class="ecard-flip-wrapper" onclick="this.classList.toggle('flipped')">
            <div class="ecard-inner">
                <!-- FRONT FACE -->
                <div class="ecard-v2 front">
                    <div class="ecard-v2-header">
                        <div class="ecard-v2-brand">
                            <img src="pormiki-logo.png" alt="PORMIKI" class="ecard-v2-logo">
                            <div class="ecard-v2-org">
                                <strong>PORMIKI</strong>
                                <span>DPC Jakarta Timur</span>
                            </div>
                        </div>
                        <div class="ecard-v2-badge">
                            <i data-lucide="shield-check" style="width:12px;height:12px;"></i>
                        </div>
                    </div>

                    <div class="ecard-v2-avatar-area">
                        <div class="ecard-v2-avatar">${initials}</div>
                        <div class="ecard-v2-name-block">
                            <h3>${member.name}</h3>
                            <span>${member.role}</span>
                        </div>
                    </div>

                    <div class="ecard-v2-details">
                        <div class="ecard-v2-row">
                            <div class="ecard-v2-label"><i data-lucide="id-card" style="width:13px;height:13px;"></i> ID Anggota</div>
                            <div class="ecard-v2-value">${member.id}</div>
                        </div>
                        <div class="ecard-v2-row">
                            <div class="ecard-v2-label"><i data-lucide="building-2" style="width:13px;height:13px;"></i> Instansi</div>
                            <div class="ecard-v2-value">${member.instansi}</div>
                        </div>
                        <div class="ecard-v2-row">
                            <div class="ecard-v2-label"><i data-lucide="calendar" style="width:13px;height:13px;"></i> Terdaftar</div>
                            <div class="ecard-v2-value">${member.tglDaftar}</div>
                        </div>
                    </div>

                    <div class="ecard-v2-footer">
                        <div class="ecard-v2-status">
                            <i data-lucide="check-circle" style="width:13px;height:13px;"></i>
                            ${member.status}
                        </div>
                        <div class="ecard-v2-flip-hint">
                            <i data-lucide="rotate-3d" style="width:14px;height:14px;"></i>
                            Balik
                        </div>
                    </div>
                </div>

                <!-- BACK FACE -->
                <div class="ecard-v2 back">
                    <div class="ecard-v2-back-top">
                        <div class="ecard-v2-magstripe"></div>
                    </div>

                    <div class="ecard-v2-back-body">
                        <div class="ecard-v2-qr">
                            <svg viewBox="0 0 29 29" width="110" height="110" style="background:white;border-radius:10px;padding:8px;display:block;margin:0 auto 0.6rem;">
                                <rect x="0" y="0" width="7" height="7" fill="#0f172a"/>
                                <rect x="1" y="1" width="5" height="5" fill="white"/>
                                <rect x="2" y="2" width="3" height="3" fill="#0f172a"/>
                                <rect x="22" y="0" width="7" height="7" fill="#0f172a"/>
                                <rect x="23" y="1" width="5" height="5" fill="white"/>
                                <rect x="24" y="2" width="3" height="3" fill="#0f172a"/>
                                <rect x="0" y="22" width="7" height="7" fill="#0f172a"/>
                                <rect x="1" y="23" width="5" height="5" fill="white"/>
                                <rect x="2" y="24" width="3" height="3" fill="#0f172a"/>
                                <rect x="8" y="0" width="1" height="1" fill="#0f172a"/>
                                <rect x="10" y="0" width="1" height="1" fill="#0f172a"/>
                                <rect x="11" y="1" width="1" height="1" fill="#0f172a"/>
                                <rect x="9" y="2" width="2" height="1" fill="#0f172a"/>
                                <rect x="12" y="2" width="1" height="1" fill="#0f172a"/>
                                <rect x="8" y="4" width="1" height="1" fill="#0f172a"/>
                                <rect x="10" y="4" width="3" height="1" fill="#0f172a"/>
                                <rect x="9" y="6" width="1" height="1" fill="#0f172a"/>
                                <rect x="11" y="5" width="2" height="1" fill="#0f172a"/>
                                <rect x="14" y="0" width="1" height="1" fill="#0f172a"/>
                                <rect x="16" y="1" width="1" height="1" fill="#0f172a"/>
                                <rect x="18" y="0" width="1" height="1" fill="#0f172a"/>
                                <rect x="15" y="3" width="1" height="1" fill="#0f172a"/>
                                <rect x="17" y="2" width="2" height="1" fill="#0f172a"/>
                                <rect x="19" y="4" width="1" height="1" fill="#0f172a"/>
                                <rect x="14" y="5" width="2" height="1" fill="#0f172a"/>
                                <rect x="17" y="5" width="1" height="1" fill="#0f172a"/>
                                <rect x="19" y="6" width="1" height="1" fill="#0f172a"/>
                                <rect x="0" y="8" width="1" height="1" fill="#0f172a"/>
                                <rect x="2" y="8" width="2" height="1" fill="#0f172a"/>
                                <rect x="5" y="9" width="1" height="1" fill="#0f172a"/>
                                <rect x="0" y="10" width="1" height="1" fill="#0f172a"/>
                                <rect x="3" y="10" width="2" height="1" fill="#0f172a"/>
                                <rect x="6" y="10" width="1" height="1" fill="#0f172a"/>
                                <rect x="1" y="12" width="1" height="1" fill="#0f172a"/>
                                <rect x="4" y="11" width="1" height="1" fill="#0f172a"/>
                                <rect x="6" y="12" width="1" height="1" fill="#0f172a"/>
                                <rect x="8" y="8" width="1" height="1" fill="#0f172a"/>
                                <rect x="10" y="8" width="2" height="1" fill="#0f172a"/>
                                <rect x="9" y="10" width="1" height="1" fill="#0f172a"/>
                                <rect x="11" y="9" width="1" height="1" fill="#0f172a"/>
                                <rect x="13" y="9" width="1" height="1" fill="#0f172a"/>
                                <rect x="8" y="12" width="2" height="1" fill="#0f172a"/>
                                <rect x="12" y="11" width="1" height="1" fill="#0f172a"/>
                                <rect x="14" y="8" width="1" height="2" fill="#0f172a"/>
                                <rect x="16" y="9" width="1" height="1" fill="#0f172a"/>
                                <rect x="18" y="8" width="1" height="1" fill="#0f172a"/>
                                <rect x="20" y="9" width="1" height="1" fill="#0f172a"/>
                                <rect x="15" y="11" width="1" height="1" fill="#0f172a"/>
                                <rect x="17" y="10" width="2" height="1" fill="#0f172a"/>
                                <rect x="14" y="12" width="1" height="1" fill="#0f172a"/>
                                <rect x="16" y="12" width="2" height="1" fill="#0f172a"/>
                                <rect x="22" y="8" width="1" height="1" fill="#0f172a"/>
                                <rect x="24" y="8" width="2" height="1" fill="#0f172a"/>
                                <rect x="27" y="8" width="1" height="1" fill="#0f172a"/>
                                <rect x="23" y="10" width="1" height="1" fill="#0f172a"/>
                                <rect x="25" y="9" width="1" height="1" fill="#0f172a"/>
                                <rect x="28" y="10" width="1" height="1" fill="#0f172a"/>
                                <rect x="22" y="12" width="2" height="1" fill="#0f172a"/>
                                <rect x="26" y="11" width="1" height="1" fill="#0f172a"/>
                                <rect x="28" y="12" width="1" height="1" fill="#0f172a"/>
                                <rect x="0" y="14" width="1" height="1" fill="#0f172a"/>
                                <rect x="2" y="14" width="2" height="1" fill="#0f172a"/>
                                <rect x="5" y="14" width="1" height="1" fill="#0f172a"/>
                                <rect x="8" y="14" width="1" height="2" fill="#0f172a"/>
                                <rect x="10" y="14" width="2" height="1" fill="#0f172a"/>
                                <rect x="14" y="14" width="1" height="1" fill="#0f172a"/>
                                <rect x="16" y="15" width="1" height="1" fill="#0f172a"/>
                                <rect x="18" y="14" width="2" height="1" fill="#0f172a"/>
                                <rect x="22" y="14" width="1" height="1" fill="#0f172a"/>
                                <rect x="25" y="14" width="1" height="1" fill="#0f172a"/>
                                <rect x="27" y="15" width="1" height="1" fill="#0f172a"/>
                                <rect x="8" y="16" width="1" height="1" fill="#0f172a"/>
                                <rect x="10" y="17" width="1" height="1" fill="#0f172a"/>
                                <rect x="12" y="16" width="2" height="1" fill="#0f172a"/>
                                <rect x="9" y="18" width="2" height="1" fill="#0f172a"/>
                                <rect x="14" y="18" width="1" height="1" fill="#0f172a"/>
                                <rect x="16" y="17" width="1" height="1" fill="#0f172a"/>
                                <rect x="18" y="18" width="2" height="1" fill="#0f172a"/>
                                <rect x="8" y="20" width="1" height="1" fill="#0f172a"/>
                                <rect x="12" y="19" width="1" height="1" fill="#0f172a"/>
                                <rect x="10" y="20" width="2" height="1" fill="#0f172a"/>
                                <rect x="22" y="16" width="1" height="1" fill="#0f172a"/>
                                <rect x="24" y="17" width="2" height="1" fill="#0f172a"/>
                                <rect x="27" y="16" width="1" height="1" fill="#0f172a"/>
                                <rect x="23" y="18" width="1" height="1" fill="#0f172a"/>
                                <rect x="26" y="18" width="1" height="1" fill="#0f172a"/>
                                <rect x="28" y="19" width="1" height="1" fill="#0f172a"/>
                                <rect x="22" y="20" width="2" height="1" fill="#0f172a"/>
                                <rect x="25" y="20" width="1" height="1" fill="#0f172a"/>
                                <rect x="28" y="20" width="1" height="1" fill="#0f172a"/>
                                <rect x="8" y="22" width="1" height="1" fill="#0f172a"/>
                                <rect x="10" y="22" width="2" height="1" fill="#0f172a"/>
                                <rect x="13" y="22" width="1" height="1" fill="#0f172a"/>
                                <rect x="9" y="24" width="1" height="1" fill="#0f172a"/>
                                <rect x="11" y="23" width="1" height="1" fill="#0f172a"/>
                                <rect x="13" y="24" width="1" height="1" fill="#0f172a"/>
                                <rect x="8" y="26" width="2" height="1" fill="#0f172a"/>
                                <rect x="12" y="25" width="1" height="1" fill="#0f172a"/>
                                <rect x="10" y="27" width="1" height="1" fill="#0f172a"/>
                                <rect x="12" y="28" width="1" height="1" fill="#0f172a"/>
                                <rect x="14" y="22" width="1" height="1" fill="#0f172a"/>
                                <rect x="16" y="23" width="1" height="1" fill="#0f172a"/>
                                <rect x="18" y="22" width="2" height="1" fill="#0f172a"/>
                                <rect x="15" y="24" width="1" height="1" fill="#0f172a"/>
                                <rect x="17" y="25" width="1" height="1" fill="#0f172a"/>
                                <rect x="19" y="24" width="1" height="1" fill="#0f172a"/>
                                <rect x="14" y="26" width="2" height="1" fill="#0f172a"/>
                                <rect x="18" y="26" width="1" height="1" fill="#0f172a"/>
                                <rect x="16" y="28" width="1" height="1" fill="#0f172a"/>
                                <rect x="18" y="27" width="1" height="1" fill="#0f172a"/>
                                <rect x="22" y="22" width="1" height="1" fill="#0f172a"/>
                                <rect x="24" y="22" width="2" height="1" fill="#0f172a"/>
                                <rect x="28" y="22" width="1" height="1" fill="#0f172a"/>
                                <rect x="23" y="24" width="1" height="1" fill="#0f172a"/>
                                <rect x="25" y="23" width="1" height="1" fill="#0f172a"/>
                                <rect x="27" y="24" width="1" height="1" fill="#0f172a"/>
                                <rect x="22" y="26" width="2" height="1" fill="#0f172a"/>
                                <rect x="26" y="25" width="1" height="1" fill="#0f172a"/>
                                <rect x="28" y="26" width="1" height="1" fill="#0f172a"/>
                                <rect x="24" y="28" width="1" height="1" fill="#0f172a"/>
                                <rect x="26" y="27" width="2" height="1" fill="#0f172a"/>
                            </svg>
                            <p>Pindai untuk Validasi Anggota</p>
                        </div>

                        <div class="ecard-v2-back-info">
                            <div class="ecard-v2-row">
                                <div class="ecard-v2-label"><i data-lucide="phone" style="width:13px;height:13px;"></i> WhatsApp</div>
                                <div class="ecard-v2-value">${member.wa}</div>
                            </div>
                            <div class="ecard-v2-row">
                                <div class="ecard-v2-label"><i data-lucide="clock" style="width:13px;height:13px;"></i> Masa Berlaku</div>
                                <div class="ecard-v2-value">${member.masaBerlaku}</div>
                            </div>
                        </div>
                    </div>

                    <div class="ecard-v2-back-footer">
                        <img src="pormiki-logo.png" alt="" style="width:24px;height:24px;border-radius:6px;">
                        <div>
                            <strong>PORMIKI</strong>
                            <span>Versi 1.0.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="actions-row" style="margin-top: 1.5rem; margin-bottom: 2rem;">
            <button class="btn-action primary-action" onclick="event.stopPropagation(); downloadProfileCard()">
                <i data-lucide="download"></i>
                Simpan Kartu (Gambar)
            </button>
        </div>
    `;
    if (window.lucide) window.lucide.createIcons();
}


window.downloadProfileCard = () => {
    showToast('Sedang menyiapkan gambar...', 'info');
    setTimeout(() => {
        showToast('Kartu digital berhasil disimpan!', 'success');
    }, 1500);
};

document.addEventListener('DOMContentLoaded', () => {
    // Inject Modular Views
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.innerHTML = homeView + materiView + profileView;
    }

    checkAuth(); // Cek status login pertama kali
    loadData();
    window.switchView = switchView;
    updateHomeInfo();

    document.getElementById('materiSearch')?.addEventListener('input', (e) => {
        renderMateri(e.target.value, currentMateriCategory);
    });

    setTimeout(() => {
        const aiChatFooter = document.querySelector('.ai-chat-footer');
        if (aiChatFooter) {
            const voiceBtn = document.createElement('button');
            voiceBtn.className = 'icon-btn voice-trigger';
            voiceBtn.innerHTML = '<i data-lucide="mic"></i>';
            voiceBtn.style.marginRight = '8px';
            aiChatFooter.prepend(voiceBtn);
            if (window.lucide) window.lucide.createIcons();

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.lang = 'id-ID';

                voiceBtn.onclick = () => {
                    recognition.start();
                    voiceBtn.style.color = '#ff007b';
                };

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    const aiInput = document.getElementById('aiInput');
                    if (aiInput) {
                        aiInput.value = transcript;
                        handleSendMessage();
                    }
                    voiceBtn.style.color = '';
                };

                recognition.onerror = () => { voiceBtn.style.color = ''; };
                recognition.onend = () => { voiceBtn.style.color = ''; };
            }
        }
    }, 1000);
});
