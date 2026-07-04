/**
 * ============================================
 * MAIN.JS — SEMUA LOGIKA WEBSITE FOR TISYA
 * DENGAN FITUR TRACKING RESPONSE KE FIREBASE
 * ============================================
 */

// ============================================
// DOM ELEMENTS
// ============================================
const preloader = document.getElementById('preloader');
const modalOverlay = document.getElementById('modalOverlay');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnPlayMusic = document.getElementById('btnPlayMusic');
const bgMusic = document.getElementById('bgMusic');
const particlesContainer = document.getElementById('particlesContainer');
const floatingHeartsContainer = document.getElementById('floatingHearts');
const heroSection = document.getElementById('heroSection');
const btnAnswerYes = document.getElementById('btnAnswerYes');
const btnAnswerShy = document.getElementById('btnAnswerShy');
const modalYesOverlay = document.getElementById('modalYesOverlay');
const modalShyOverlay = document.getElementById('modalShyOverlay');
const btnCloseYesModal = document.getElementById('btnCloseYesModal');
const btnCloseShyModal = document.getElementById('btnCloseShyModal');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 1800);
});

// ============================================
// PARTICLES GENERATOR
// ============================================
const particleColors = [
    '#ff6b9d', '#c44dff', '#f0c87b', 
    '#ff4081', '#ffb3d0', '#ffffff', 
    '#ff9ec4', '#d4a5ff'
];

function createParticle() {
    if (!particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 5 + 2;
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    const duration = Math.random() * 8 + 8;
    const delay = Math.random() * 5;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.background = color;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
    
    particlesContainer.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, (duration + delay) * 1000);
}

if (particlesContainer) {
    setInterval(createParticle, 400);
    for (let i = 0; i < 35; i++) {
        setTimeout(createParticle, i * 140);
    }
}

// ============================================
// FLOATING HEARTS
// ============================================
const heartEmojis = [
    '💕', '💖', '💗', '💝', '💘', 
    '✨', '💫', '🩷', '🌸', '💐',
    '🦋', '🌷', '💞', '💓', '🪷'
];

function createFloatHeart() {
    if (!floatingHeartsContainer) return;
    
    const heart = document.createElement('span');
    heart.classList.add('float-heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 90 + '%';
    heart.style.bottom = '-30px';
    
    const duration = Math.random() * 6 + 6;
    const delay = Math.random() * 3;
    
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';
    heart.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
    
    floatingHeartsContainer.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, (duration + delay) * 1000);
}

if (floatingHeartsContainer) {
    setInterval(createFloatHeart, 2500);
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatHeart, i * 700);
    }
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message, duration = 3000) {
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ============================================
// DAPATKAN INFO DEVICE TISYA
// ============================================
function getDeviceInfo() {
    const ua = navigator.userAgent;
    let device = 'Unknown';
    let browser = 'Unknown';
    
    if (/Android/i.test(ua)) device = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) device = 'iOS';
    else if (/Windows/i.test(ua)) device = 'Windows';
    else if (/Mac/i.test(ua)) device = 'Mac';
    else if (/Linux/i.test(ua)) device = 'Linux';
    
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Edg/i.test(ua)) browser = 'Edge';
    else if (/OPR|Opera/i.test(ua)) browser = 'Opera';
    
    return { device, browser };
}

// ============================================
// KIRIM RESPONSE KE FIREBASE
// ============================================
function sendResponseToFirebase(responseType, message) {
    const deviceInfo = getDeviceInfo();
    const timestamp = new Date().toISOString();
    const timestampReadable = new Date().toLocaleString('id-ID', { 
        timeZone: 'Asia/Jakarta',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const responseData = {
        response: responseType,
        message: message,
        timestamp: timestamp,
        timestampReadable: timestampReadable,
        device: deviceInfo.device,
        browser: deviceInfo.browser,
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language
    };
    
    if (typeof responsesRef !== 'undefined') {
        responsesRef.push(responseData)
            .then(() => {
                console.log('✅ Response berhasil dikirim ke Firebase!', responseData);
                showToast('✅ Response berhasil dikirim! 💕');
            })
            .catch((error) => {
                console.error('❌ Gagal kirim response:', error);
                const fallbackData = JSON.parse(localStorage.getItem('tisyaResponses') || '[]');
                fallbackData.push(responseData);
                localStorage.setItem('tisyaResponses', JSON.stringify(fallbackData));
                showToast('⚠️ Response tersimpan di lokal!');
            });
    } else {
        console.warn('⚠️ Firebase belum siap, simpan ke lokal');
        const fallbackData = JSON.parse(localStorage.getItem('tisyaResponses') || '[]');
        fallbackData.push(responseData);
        localStorage.setItem('tisyaResponses', JSON.stringify(fallbackData));
        showToast('⚠️ Response tersimpan di lokal!');
    }
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function openModal() {
    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        createSparklesBurst();
    }
}

function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (btnOpenModal) {
    btnOpenModal.addEventListener('click', openModal);
}

if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// ============================================
// ANSWER MODALS
// ============================================
function openYesModal() {
    sendResponseToFirebase('IYA - Mau Jadi Pacar!', '💖 Tisya jawab IYA! Dia mau jadi pacar Anas!');
    
    closeModal();
    setTimeout(() => {
        if (modalYesOverlay) {
            modalYesOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            createSparklesBurst();
        }
    }, 400);
}

function closeYesModal() {
    if (modalYesOverlay) {
        modalYesOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openShyModal() {
    sendResponseToFirebase('MALU - Butuh Waktu', '🫣 Tisya malu-malu, dia butuh waktu buat jawab.');
    
    closeModal();
    setTimeout(() => {
        if (modalShyOverlay) {
            modalShyOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            createSparklesBurst();
        }
    }, 400);
}

function closeShyModal() {
    if (modalShyOverlay) {
        modalShyOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (btnAnswerYes) {
    btnAnswerYes.addEventListener('click', openYesModal);
}

if (btnAnswerShy) {
    btnAnswerShy.addEventListener('click', openShyModal);
}

if (btnCloseYesModal) {
    btnCloseYesModal.addEventListener('click', closeYesModal);
}

if (btnCloseShyModal) {
    btnCloseShyModal.addEventListener('click', closeShyModal);
}

if (modalYesOverlay) {
    modalYesOverlay.addEventListener('click', function(e) {
        if (e.target === modalYesOverlay) {
            closeYesModal();
        }
    });
}

if (modalShyOverlay) {
    modalShyOverlay.addEventListener('click', function(e) {
        if (e.target === modalShyOverlay) {
            closeShyModal();
        }
    });
}

// ============================================
// ESC KEY TO CLOSE ALL MODALS
// ============================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeYesModal();
        closeShyModal();
        document.body.style.overflow = '';
    }
});

// ============================================
// MUSIC PLAYER
// ============================================
let musicPlaying = false;

function toggleMusic() {
    if (!bgMusic) return;
    
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
        if (btnPlayMusic) {
            btnPlayMusic.innerHTML = '🎵 Putar Musik Romantis';
        }
    } else {
        bgMusic.play().catch((err) => {
            console.log('Klik lagi ya buat play musiknya! 🎵', err);
        });
        musicPlaying = true;
        if (btnPlayMusic) {
            btnPlayMusic.innerHTML = '⏸️ Jeda Musik';
        }
    }
}

if (btnPlayMusic) {
    btnPlayMusic.addEventListener('click', toggleMusic);
}

// ============================================
// SPARKLE CURSOR EFFECT
// ============================================
function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    
    const symbols = ['✦', '✧', '⋆', '·', '˚', '✶', '⊹'];
    sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.setProperty('--dx', (Math.random() - 0.5) * 60 + 'px');
    sparkle.style.setProperty('--dy', (Math.random() - 0.5) * 60 + 'px');
    sparkle.style.color = particleColors[Math.floor(Math.random() * particleColors.length)];
    
    document.body.appendChild(sparkle);

    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 1000);
}

document.addEventListener('click', function(e) {
    createSparkle(e.clientX, e.clientY);
});

document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.93) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparklesBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            createSparkle(
                centerX + (Math.random() - 0.5) * 350,
                centerY + (Math.random() - 0.5) * 250
            );
        }, i * 18);
    }
}

if (heroSection) {
    const heroTitle = heroSection.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', function() {
            const rect = heroTitle.getBoundingClientRect();
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    createSparkle(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height
                    );
                }, i * 25);
            }
        });
    }
}

// ============================================
// KIRIM DATA AWAL SAAT HALAMAN DIBUKA
// ============================================
function sendPageView() {
    const deviceInfo = getDeviceInfo();
    const viewData = {
        response: 'PAGE_VIEW',
        message: '👀 Tisya udah buka websitenya!',
        timestamp: new Date().toISOString(),
        timestampReadable: new Date().toLocaleString('id-ID', { 
            timeZone: 'Asia/Jakarta',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }),
        device: deviceInfo.device,
        browser: deviceInfo.browser,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language
    };
    
    setTimeout(() => {
        if (typeof responsesRef !== 'undefined') {
            responsesRef.push(viewData)
                .then(() => console.log('✅ Page view logged!'))
                .catch((err) => console.log('⚠️ Page view saved locally', err));
        } else {
            const fallbackData = JSON.parse(localStorage.getItem('tisyaResponses') || '[]');
            fallbackData.push(viewData);
            localStorage.setItem('tisyaResponses', JSON.stringify(fallbackData));
        }
    }, 2000);
}

window.addEventListener('load', () => {
    sendPageView();
});

// ============================================
// CONSOLE MESSAGE (EASTER EGG)
// ============================================
console.log(
    '%c💖 Website spesial buat Tisya udah siap! %c— Anas %c',
    'font-size: 16px; color: #ff6b9d; font-weight: bold;',
    'font-size: 14px; color: #f0c87b;',
    ''
);
console.log(
    '%c✨ Semoga lancar ya bro! Jangan lupa senyum pas dia buka ini 😉🫶',
    'font-size: 13px; color: #9e9eb8;'
);
console.log(
    '%c🔮 Semua response Tisya bakal ke-track di Firebase! Cek admin.html ya! 😈💕',
    'font-size: 12px; color: #c44dff; font-style: italic;'
);
