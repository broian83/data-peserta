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
        resultsContainer.innerHTML = `<div class="welcome-card">
                    <div class="welcome-icon">
                        <img src="pormiki-logo.png" alt="PORMIKI" style="width: 80%; height: auto;">
                    </div>
                    <h3>Siap Mencari?</h3>
                    <p>Masukkan email yang terdaftar untuk menemukan E-Card dan ID Peserta Anda.</p>
                    <div class="step-guide">
                        <span><i data-lucide="check-circle-2"></i> Ketik Email</span>
                        <span><i data-lucide="check-circle-2"></i> Klik Cari</span>
                        <span><i data-lucide="check-circle-2"></i> Unduh Kartu</span>
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
    }, 400); // Faster search
}

function getValueByPossibleKeys(obj, possibleKeys) {
    for (let key of possibleKeys) {
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
        const trimmedKey = key.trim();
        for (let actualKey in obj) {
            if (actualKey.trim() === trimmedKey && obj[actualKey] !== "") return obj[actualKey];
        }
    }
    return null;
}

async function shareCard(btnElement) {
    const card = btnElement.closest('.virtual-card');
    const actions = card.querySelector('.actions-row');
    const outlineBtn = card.querySelector('.btn-action-outline');
    
    // UI state for loading
    const originalContent = btnElement.innerHTML;
    btnElement.innerHTML = '<i data-lucide="loader-2" class="animate-spin" size="16"></i> Tunggu...';
    lucide.createIcons();

    try {
        // Prepare card for image capture (Hide buttons)
        if(actions) actions.style.display = 'none';
        if(outlineBtn) outlineBtn.style.display = 'none';

        const canvas = await html2canvas(card, {
            useCORS: true,
            allowTaint: true,
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false
        });

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], 'E-Card-PORMIKI.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'E-Card Peserta Webinar PORMIKI',
                text: 'Saya sudah terdaftar di Webinar Nasional PORMIKI! Cek juga E-Card kamu di sini.'
            });
        } else {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'E-Card-PORMIKI.png';
            link.click();
            alert('Gambar berhasil diunduh! Silakan bagikan ke WhatsApp Status Anda.');
        }
    } catch (err) {
        console.error('Error sharing:', err);
        alert('Gagal membagikan gambar. Silakan coba simpan secara manual atau screenshot.');
    } finally {
        // Restore UI
        if(actions) actions.style.display = 'flex';
        if(outlineBtn) outlineBtn.style.display = 'flex';
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
            // Updated mappings to prioritize "Nama Anggota"
            const name = getValueByPossibleKeys(p, ['Nama Anggota', 'Nama', 'Full Name', 'Nama Lengkap', 'Name', 'Lengkap']) || 'Peserta Webinar';
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
                        <h2 class="p-name">${name}</h2>
                        <span class="p-status">PARTICIPANT</span>
                        <div class="details-grid">
                            <div class="detail-row"><span class="detail-label">Email Address</span><span class="detail-value">${email}</span></div>
                            <div class="detail-row"><span class="detail-label">Institution / Workplace</span><span class="detail-value">${instansi}</span></div>
                            <div class="detail-row"><span class="detail-label">WhatsApp Number</span><span class="detail-value">${phone}</span></div>
                        </div>
                        <div class="barcode-sim"></div>
                        <span class="id-number">REG-ID: ${idPeserta}</span>
                        <div class="actions-row">
                            <button class="btn-action" style="background: var(--primary); color: white; border: none;" onclick="shareCard(this)"><i data-lucide="share-2" size="16"></i>Bagikan</button>
                            <button class="btn-action" onclick="window.print()"><i data-lucide="download" size="16"></i>Simpan</button>
                        </div>
                        <button class="btn-action-outline" onclick="navigator.clipboard.writeText('${idPeserta}'); alert('ID Disalin!')">
                            <i data-lucide="copy" size="16"></i> Salin ID Peserta
                        </button>
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
