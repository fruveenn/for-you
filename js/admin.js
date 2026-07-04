/**
 * ============================================
 * ADMIN.JS — PANEL BUAT ANAS LIAT RESPONSE
 * REAL-TIME DARI FIREBASE
 * ============================================
 */

// ============================================
// DOM ELEMENTS
// ============================================
const timeline = document.getElementById('timeline');
const emptyState = document.getElementById('emptyState');
const rawData = document.getElementById('rawData');
const statTotal = document.getElementById('statTotal');
const statYes = document.getElementById('statYes');
const statShy = document.getElementById('statShy');
const statView = document.getElementById('statView');
const statusDot = document.querySelector('.status-dot');
const statusText = document.getElementById('statusText');
const btnRefresh = document.getElementById('btnRefresh');

// ============================================
// FIREBASE STATUS
// ============================================
function setFirebaseStatus(status) {
    if (!statusDot || !statusText) return;
    
    statusDot.classList.remove('connected', 'disconnected');
    if (status === 'connected') {
        statusDot.classList.add('connected');
        statusText.textContent = 'Connected';
    } else if (status === 'disconnected') {
        statusDot.classList.add('disconnected');
        statusText.textContent = 'Disconnected';
    } else {
        statusText.textContent = 'Connecting...';
    }
}

if (typeof database !== 'undefined') {
    database.ref('.info/connected').on('value', (snap) => {
        if (snap.val() === true) {
            setFirebaseStatus('connected');
            console.log('🔥 Firebase Connected!');
        } else {
            setFirebaseStatus('disconnected');
            console.log('❌ Firebase Disconnected!');
        }
    });
} else {
    console.error('❌ database is not defined! Check firebase-config.js');
    setFirebaseStatus('disconnected');
}

// ============================================
// LOAD RESPONSES REAL-TIME
// ============================================
let allResponses = [];

function loadResponses() {
    if (typeof responsesRef === 'undefined') {
        console.error('❌ responsesRef not found! Check firebase-config.js');
        if (timeline) {
            timeline.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">⚠️</div>
                    <h3>Firebase Config Error</h3>
                    <p>Cek file firebase-config.js ya! Pastiin udah bener config-nya.</p>
                </div>
            `;
        }
        return;
    }

    responsesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        allResponses = [];
        
        if (data) {
            Object.keys(data).forEach((key) => {
                allResponses.push({
                    id: key,
                    ...data[key]
                });
            });
            
            allResponses.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
            
            renderTimeline(allResponses);
            updateStats(allResponses);
            updateRawData(data);
            
            if (emptyState) emptyState.style.display = 'none';
        } else {
            renderTimeline([]);
            updateStats([]);
            updateRawData(null);
            if (emptyState) emptyState.style.display = 'block';
        }
    }, (error) => {
        console.error('❌ Error loading responses:', error);
        if (timeline) {
            timeline.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">❌</div>
                    <h3>Error Loading Data</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    });
}

// ============================================
// RENDER TIMELINE
// ============================================
function renderTimeline(responses) {
    if (!timeline) return;
    
    if (responses.length === 0) {
        timeline.innerHTML = `
            <div class="empty-state" id="emptyState">
                <div class="empty-icon">🔮</div>
                <h3>Belum ada response</h3>
                <p>Nunggu Tisya buka websitenya dulu ya...</p>
                <p class="empty-hint">Kalo dia udah klik tombol jawaban, datanya bakal muncul disini real-time!</p>
            </div>
        `;
        return;
    }
    
    const es = timeline.querySelector('#emptyState');
    if (es) es.remove();
    
    timeline.innerHTML = responses.map((res, index) => {
        let icon = '👀';
        let responseClass = 'response-view';
        let responseLabel = 'Page View';
        
        if (res.response && res.response.includes('IYA')) {
            icon = '💖';
            responseClass = 'response-yes';
            responseLabel = 'JAWABAN: IYA! 🎉';
        } else if (res.response && res.response.includes('MALU')) {
            icon = '🫣';
            responseClass = 'response-shy';
            responseLabel = 'JAWABAN: MALU';
        }
        
        return `
            <div class="timeline-item ${responseClass}" style="animation-delay: ${index * 0.05}s;">
                <div class="timeline-icon">${icon}</div>
                <div class="timeline-content">
                    <div class="timeline-response">${responseLabel}</div>
                    <div class="timeline-message">${res.message || 'No message'}</div>
                    <div class="timeline-meta">
                        <span>🕐 ${res.timestampReadable || res.timestamp}</span>
                        <span>📱 ${res.device || 'Unknown'}</span>
                        <span>🌐 ${res.browser || 'Unknown'}</span>
                        <span>🖥️ ${res.screenResolution || 'Unknown'}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// UPDATE STATS
// ============================================
function updateStats(responses) {
    const total = responses.length;
    let yesCount = 0;
    let shyCount = 0;
    let viewCount = 0;
    
    responses.forEach(res => {
        if (res.response && res.response.includes('IYA')) yesCount++;
        else if (res.response && res.response.includes('MALU')) shyCount++;
        else if (res.response && res.response.includes('PAGE_VIEW')) viewCount++;
    });
    
    if (statTotal) statTotal.textContent = total;
    if (statYes) statYes.textContent = yesCount;
    if (statShy) statShy.textContent = shyCount;
    if (statView) statView.textContent = viewCount;
}

// ============================================
// UPDATE RAW DATA
// ============================================
function updateRawData(data) {
    if (!rawData) return;
    
    if (data) {
        rawData.textContent = JSON.stringify(data, null, 2);
    } else {
        rawData.textContent = 'No data yet...';
    }
}

// ============================================
// REFRESH DATA
// ============================================
function refreshData() {
    if (btnRefresh) {
        btnRefresh.textContent = '🔄 Refreshing...';
        btnRefresh.disabled = true;
    }
    
    loadResponses();
    
    setTimeout(() => {
        if (btnRefresh) {
            btnRefresh.textContent = '🔄 Refresh';
            btnRefresh.disabled = false;
        }
    }, 1000);
}

// ============================================
// TOGGLE RAW DATA
// ============================================
function toggleRawData() {
    const rawDataEl = document.getElementById('rawData');
    const rawToggle = document.getElementById('rawToggle');
    
    if (rawDataEl.style.display === 'none') {
        rawDataEl.style.display = 'block';
        if (rawToggle) rawToggle.textContent = '[Hide]';
    } else {
        rawDataEl.style.display = 'none';
        if (rawToggle) rawToggle.textContent = '[Show]';
    }
}

// ============================================
// AUTO REFRESH (EVERY 10 SECONDS)
// ============================================
setInterval(() => {
    console.log('🔄 Auto-refreshing data...');
    loadResponses();
}, 10000);

// ============================================
// INIT
// ============================================
console.log('%c🔐 Admin Panel Ready! %c— Anas', 
    'font-size: 16px; color: #c44dff; font-weight: bold;',
    'font-size: 14px; color: #f0c87b;'
);
console.log('%c📊 Nunggu response dari Tisya...', 'color: #9e9eb8;');

window.addEventListener('load', () => {
    setTimeout(loadResponses, 1000);
});