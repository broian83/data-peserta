// Configuration & State
let participants = [];

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
        resultsContainer.innerHTML = `<div class="empty-state"><i data-lucide="mail-search" size="48"></i><p>Silakan masukkan alamat email lengkap Anda</p></div>`;
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
    }, 800);
}

function getValueByPossibleKeys(obj, possibleKeys) {
    for (let key of possibleKeys) {
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
        // Check for keys with trailing/leading spaces (common in spreadsheet exports)
        const trimmedKey = key.trim();
        for (let actualKey in obj) {
            if (actualKey.trim() === trimmedKey && obj[actualKey] !== "") return obj[actualKey];
        }
    }
    return null;
}

function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = `<div class="empty-state"><i data-lucide="user-x" size="64"></i><p>Alamat email tidak terdaftar.<br>Pastikan email sudah sesuai.</p></div>`;
    } else {
        results.forEach((p, index) => {
            const name = getValueByPossibleKeys(p, ['Nama', 'Full Name', 'Nama Lengkap', 'Name', 'Lengkap', 'Nama ']) || 'Peserta Webinar';
            const email = getValueByPossibleKeys(p, ['Email', 'Email Address', 'Alamat Email', 'e-mail']) || '-';
            const instansi = getValueByPossibleKeys(p, ['Instansi', 'Organization', 'Workplace', 'Unit Kerja', 'Institusi', 'RS', 'Kantor', 'Instansi ']) || '-';
            const phone = getValueByPossibleKeys(p, ['No HP', 'Phone', 'WhatsApp', 'Telepon', 'Mobile', 'No HP ']) || '-';
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
                            <img src="https://pormiki.or.id/wp-content/uploads/2025/07/logo-dpp-transparan-Tanpa-Nama-2019-2048x1872.png" alt="Logo PORMIKI" style="width: 70%; height: auto;">
                        </div>
                        <h2 class="p-name">${name}</h2>
                        <span class="p-status">PARTICIPANT</span>
                        <div class="details-grid">
                            <div class="detail-row">
                                <span class="detail-label">Email Address</span>
                                <span class="detail-value">${email}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Institution / Workplace</span>
                                <span class="detail-value">${instansi}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">WhatsApp Number</span>
                                <span class="detail-value">${phone}</span>
                            </div>
                        </div>
                        <div class="barcode-sim"></div>
                        <span class="id-number">REG-ID: ${idPeserta}</span>
                        <div class="actions-row">
                            <button class="btn-action" onclick="window.print()"><i data-lucide="download" size="16"></i>Simpan</button>
                            <button class="btn-action" onclick="navigator.clipboard.writeText('${idPeserta}'); alert('ID Disalin!')"><i data-lucide="copy" size="16"></i>Salin ID</button>
                        </div>
                    </div>
                </div>`;
            container.appendChild(cardWrapper);
        });
    }
    lucide.createIcons();
}

// DIGITAL TOUR
function initTour() {
    if (localStorage.getItem('pormiki_tour_seen')) return;

    const driver = window.driver.js.driver;
    const driverObj = driver({
        showProgress: true,
        onDestroyed: () => {
            localStorage.setItem('pormiki_tour_seen', 'true');
        },
        steps: [
            { element: '#tour-logo', popover: { title: 'Selamat Datang!', description: 'Ini adalah Portal Webinar PORMIKI. Ayo kita keliling sebentar!', side: "bottom", align: 'start' } },
            { element: '#totalStats', popover: { title: 'Statistik Peserta', description: 'Jumlah total peserta yang sudah terdaftar dalam sistem.', side: "bottom", align: 'start' } },
            { element: '.search-box', popover: { title: 'Cari Data', description: 'Masukkan email lengkap Anda di sini.', side: "top", align: 'start' } },
            { element: '.bottom-nav', popover: { title: 'Menu Navigasi', description: 'Akses cepat ke Zoom, WhatsApp, dan LMS.', side: "top", align: 'center' } },
            { popover: { title: 'Selesai!', description: 'Silakan cari email Anda dan cetak E-Card kebanggaan Anda!' } }
        ]
    });

    setTimeout(() => driverObj.drive(), 1500);
}

// Initializations
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initTour();
    
    document.getElementById('searchBtn').addEventListener('click', searchParticipants);
    document.getElementById('emailSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchParticipants();
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
