/**
 * ============================================
 * MAIN.JS — SEMUA LOGIKA WEBSITE FOR TISYA
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

// Generate initial particles
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

// Generate floating hearts periodically
if (floatingHeartsContainer) {
    setInterval(createFloatHeart, 2500);
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatHeart, i * 700);
    }
}

// ============================================
// MODAL FUNCTIONS
// ============================================

// Open main modal
function openModal() {
    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        createSparklesBurst();
    }
}

// Close main modal
function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Event Listeners for main modal
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

// Open "YES" modal
function openYesModal() {
    closeModal(); // Close main modal first
    setTimeout(() => {
        if (modalYesOverlay) {
            modalYesOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            createSparklesBurst();
        }
    }, 400);
}

// Close "YES" modal
function closeYesModal() {
    if (modalYesOverlay) {
        modalYesOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Open "SHY" modal
function openShyModal() {
    closeModal(); // Close main modal first
    setTimeout(() => {
        if (modalShyOverlay) {
            modalShyOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            createSparklesBurst();
        }
    }, 400);
}

// Close "SHY" modal
function closeShyModal() {
    if (modalShyOverlay) {
        modalShyOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Event Listeners for answer buttons
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

// Close answer modals when clicking overlay
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

// Sparkle on click
document.addEventListener('click', function(e) {
    createSparkle(e.clientX, e.clientY);
});

// Sparkle on mouse move (rare)
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.93) {
        createSparkle(e.clientX, e.clientY);
    }
});

// Sparkle burst for special moments
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

// ============================================
// SPARKLES ON HERO TITLE HOVER
// ============================================
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
// CONSOLE MESSAGE (EASTER EGG)
// ============================================
console.log(
    '%c💖 Website spesial buat Tisya! %c— %c',
    'font-size: 16px; color: #ff6b9d; font-weight: bold;',
    'font-size: 14px; color: #f0c87b;',
    ''
);
