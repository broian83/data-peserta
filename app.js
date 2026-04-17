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

// SMART GREETING & DATE
function updateHomeInfo() {
    const greetingEl = document.getElementById('greetingText');
    const dateEl = document.getElementById('currentDate');
    
    if (!greetingEl || !dateEl) return;
    
    // Greeting logic
    const hour = new Date().getHours();
    let welcome = "Halo, Rekan PMIK! 👋";
    if (hour >= 5 && hour < 11) welcome = "Selamat Pagi, Rekan! 🌅";
    else if (hour >= 11 && hour < 15) welcome = "Selamat Siang, Rekan! ☀️";
    else if (hour >= 15 && hour < 18) welcome = "Selamat Sore, Rekan! 🌇";
    else welcome = "Selamat Malam, Rekan! 🌙";
    greetingEl.textContent = welcome;

    // Date logic
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('id-ID', options);
}

// VIEW SWITCHER
function switchView(viewName) {
    const homeView = document.getElementById('homeView');
    const ecardView = document.getElementById('ecardView');
    const viewTitle = document.getElementById('viewTitle');
    const navItems = document.querySelectorAll('.nav-item');
    const fab = document.getElementById('fabHelp');

    // Reset visibility
    homeView.style.display = 'none';
    ecardView.style.display = 'none';
    navItems.forEach(item => item.classList.remove('active'));

    if (viewName === 'home') {
        homeView.style.display = 'block';
        viewTitle.textContent = 'Portal Informasi PMIK';
        navItems[0].classList.add('active');
        if(fab) fab.style.display = 'flex';
        updateHomeInfo();
    } else if (viewName === 'ecard') {
        ecardView.style.display = 'block';
        viewTitle.textContent = 'Portal E-Card Peserta';
        navItems[1].classList.add('active');
        if(fab) fab.style.display = 'none'; // Hide FAB on search for focus
        setTimeout(updateStats, 100);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
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
    const actions = card.querySelector('.actions-row');
    const outlineBtn = card.querySelector('.btn-action-outline');
    
    const originalContent = btnElement.innerHTML;
    btnElement.innerHTML = '<i data-lucide="loader-2" class="animate-spin" size="16"></i> Tunggu...';
    lucide.createIcons();

    try {
        if(actions) actions.style.display = 'none';
        if(outlineBtn) outlineBtn.style.display = 'none';

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

// Initializations
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    window.switchView = switchView; // Expose to global scope
    updateHomeInfo();
    
    document.getElementById('searchBtn').addEventListener('click', searchParticipants);
    document.getElementById('emailSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchParticipants();
    });
});
