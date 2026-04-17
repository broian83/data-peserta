// Inject Confetti Script
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
document.head.appendChild(confettiScript);

let participants = [];

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
        participants = [
            { "Nama": "Budi Santoso", "Email": "budi@example.com", "Instansi": "RS Harapan", "Provinsi": "Jawa Tengah", "No HP": "08123456789" },
            { "Nama": "Siti Aminah", "Email": "siti@gmail.com", "Instansi": "Puskesmas Maju", "Provinsi": "DKI Jakarta", "No HP": "08129999999" },
            { "Nama": "Andi Wijaya", "Email": "andi@pormiki.or.id", "Instansi": "Universitas Sehat", "Provinsi": "Jawa Timur", "No HP": "08567777777" }
        ];
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
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#00b5a5', '#c4d600']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#00b5a5', '#c4d600']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

function searchParticipants() {
    const query = document.getElementById('emailSearch').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('resultsContainer');
    const skeleton = document.getElementById('skeletonLoader');
    
    if (!query) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <i data-lucide="mail-search" size="48"></i>
                <p>Silakan masukkan alamat email lengkap Anda</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    // Tampilkan Skeleton, Sembunyikan Hasil lama
    resultsContainer.innerHTML = '';
    skeleton.style.display = 'block';

    // Simulasi delay biar makin keren (layaknya loading database beneran)
    setTimeout(() => {
        const filtered = participants.filter(p => {
            const email = (getValueByPossibleKeys(p, ['Email', 'Email Address', 'Alamat Email', 'e-mail']) || '').toString().toLowerCase().trim();
            return email === query;
        });

        skeleton.style.display = 'none';

        if (filtered.length > 0) {
            runCelebration();
        }
        
        displayResults(filtered);
    }, 800);
}

function getValueByPossibleKeys(obj, possibleKeys) {
    for (let key of possibleKeys) {
        // Cek exact match
        if (obj[key] !== undefined && obj[key] !== null) return obj[key];
        // Cek case-insensitive
        const foundKey = Object.keys(obj).find(k => k.toLowerCase() === key.toLowerCase());
        if (foundKey && obj[foundKey] !== undefined) return obj[foundKey];
    }
    
    // Jika tidak ketemu, coba cari kunci yang mengandung kata kunci (fuzzy search)
    const fuzzyMatch = Object.keys(obj).find(k => {
        const lowerK = k.toLowerCase();
        return possibleKeys.some(pk => {
            const lowerPK = pk.toLowerCase();
            return lowerK.includes(lowerPK) || lowerPK.includes(lowerK);
        });
    });
    
    return fuzzyMatch ? obj[fuzzyMatch] : null;
}

function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="user-x" size="64"></i>
                <p>Alamat email tidak terdaftar.<br>Pastikan email sudah sesuai.</p>
            </div>
        `;
    } else {
        results.forEach((p, index) => {
            const name = getValueByPossibleKeys(p, ['Nama', 'Full Name', 'Nama Lengkap', 'Name', 'Lengkap']) || 'N/A';
            const email = getValueByPossibleKeys(p, ['Email', 'Email Address', 'Alamat Email', 'e-mail']) || 'N/A';
            const instansi = getValueByPossibleKeys(p, ['Instansi', 'Organization', 'Workplace', 'Unit Kerja', 'Institusi', 'RS', 'Kantor', 'Tempat Bekerja', 'Asal Instansi', 'Pekerjaan']) || '-';
            const phone = getValueByPossibleKeys(p, ['No HP', 'Phone', 'WhatsApp', 'Telepon', 'Mobile', 'Telp']) || '-';
            const idPeserta = (p.ID || p.id || p.No || index + 1001).toString().padStart(6, '0');

            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'ecard-container';
            
            cardWrapper.innerHTML = `
                <div class="virtual-card">
                    <div class="ecard-top">
                        <i data-lucide="activity" class="ecard-logo"></i>
                        <span class="ecard-title">Kartu Peserta Webinar</span>
                    </div>
                    <div class="ecard-body">
                        <div class="avatar-container">
                            <i data-lucide="user" size="48"></i>
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
                            <button class="btn-action" onclick="window.print()">
                                <i data-lucide="download" size="16"></i>
                                Simpan Kartu
                            </button>
                            <button class="btn-action" onclick="navigator.clipboard.writeText('${idPeserta}'); alert('ID Berhasil Disalin!')">
                                <i data-lucide="copy" size="16"></i>
                                Salin ID
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(cardWrapper);
        });
    }
    lucide.createIcons();
}

// Initializations
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('emailSearch');

    searchBtn.addEventListener('click', searchParticipants);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchParticipants();
        }
    });

    // Ripple effect simulation for links
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
// PWA LOGIC\r\nif ('serviceWorker' in navigator) {\r\n  window.addEventListener('load', () => {\r\n    navigator.serviceWorker.register('sw.js').then(reg => console.log('SW Registered'));\r\n  });\r\n}\r\n\r\nlet deferredPrompt;\r\nconst installBanner = document.getElementById('installBanner');\r\nconst installBtn = document.getElementById('installBtn');\r\n\r\nwindow.addEventListener('beforeinstallprompt', (e) => {\r\n  e.preventDefault();\r\n  deferredPrompt = e;\r\n  installBanner.style.display = 'flex';\r\n});\r\n\r\ninstallBtn.addEventListener('click', async () => {\r\n  if (deferredPrompt) {\r\n    deferredPrompt.prompt();\r\n    const { outcome } = await deferredPrompt.userChoice;\r\n    if (outcome === 'accepted') {\r\n      installBanner.style.display = 'none';\r\n    }\r\n    deferredPrompt = null;\r\n  }\r\n});
