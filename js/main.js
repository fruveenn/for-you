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
    heart.text
