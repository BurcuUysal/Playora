// PLAYORA - Ana Rota ve Sayfa Yöneticisi

const gamesData = [
    { id: 'gravity', title: 'Gravity Flip', cat: 'Arcade', diff: 'Orta', desc: 'Yerçekimini ters çevir, uzay engellerini atlat!', icon: '🪐', score: 840 },
    { id: 'magnet', title: 'Magnet Rush', cat: 'Arcade', diff: 'Zor', desc: 'Manyetik kutupları yönet, mayınlardan kaç.', icon: '🧲', score: 720 },
    { id: 'mirror', title: 'Mirror Escape', cat: 'Aksiyon', diff: 'Uzman', desc: 'Bölünmüş ekranda iki karakteri aynı anda yönet.', icon: '🪞', score: 950 },
    { id: 'wind', title: 'Wind Runner', cat: 'Arcade', diff: 'Orta', desc: 'Fırtınalı gökyüzünde rüzgara karşı uç.', icon: '🌪️', score: 680 },
    { id: 'potion', title: 'Potion Panic', cat: 'Bulmaca', diff: 'Kolay', desc: 'Doğru tarifleri birleştir, iksirleri hazırla.', icon: '🧪', score: 1120 },
    { id: 'traffic', title: 'Traffic Switch', cat: 'Strateji', diff: 'Zor', desc: 'Kavşaktaki ışıkları kontrol et, kazaları önle.', icon: '🚦', score: 890 },
    { id: 'detective', title: 'Fake Detective', cat: 'Bulmaca', diff: 'Kolay', desc: 'Değişen detayları fark et, gizemi çöz.', icon: '🕵', score: 760 },
    { id: 'octo', title: 'Octo Grab', cat: 'Günlük', diff: 'Kolay', desc: 'Sevimli ahtapotla deniz incilerini topla.', icon: '🐙', score: 1040 },
    { id: 'island', title: 'Island Builder', cat: 'Strateji', diff: 'Orta', desc: 'Kaynakları yönet, adanı sıfırdan inşa et.', icon: '🏝️', score: 920 },
    { id: 'alien', title: 'Alien Delivery', cat: 'Macera', diff: 'Zor', desc: 'Uzayda paketleri doğru gezegenlere teslim et.', icon: '👽', score: 810 }
];

function switchPage(page) {
    const app = document.getElementById('app');
    window.scrollTo(0, 0);
    
    if (page === 'home') {
        app.innerHTML = renderHome();
    } else if (page === 'games') {
        app.innerHTML = renderGames();
    } else if (page === 'leaderboard') {
        app.innerHTML = renderLeaderboard();
    } else if (page === 'profile') {
        app.innerHTML = renderProfile();
    } else if (page.startsWith('detail-')) {
        const gameId = page.split('-')[1];
        app.innerHTML = renderGameDetail(gameId);
    }
}

function renderHome() {
    return `
        <div class="relative overflow-hidden rounded-3xl glass-card p-8 md:p-12 mb-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="max-w-lg text-center md:text-left">
                <span class="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold mb-4 tracking-wider uppercase">✨ Yeni Nesil Indie Arcade</span>
                <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-none">Pick a game.<br><span class="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-500 bg-clip-text text-transparent">Make it yours.</span></h1>
                <p class="text-slate-400 text-sm md:text-base mb-8 leading-relaxed">Hızlı eğlence anları için tasarlanmış 10 özgün mini oyun. Tek tıkla oyna, rekorunu kır.</p>
                <div class="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                    <button onclick="switchPage('games')" class="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-purple-600/30 transition hover:scale-105 active:scale-95">PLAY NOW</button>
                    <button onclick="switchPage('games')" class="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold px-6 py-4 rounded-2xl border border-slate-700/80 transition">Explore Games</button>
                </div>
            </div>
            <div class="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-pink-600/30 border border-purple-500/30 flex items-center justify-center text-7xl shadow-2xl animate-pulse">
                🕹️
            </div>
        </div>

        <div class="mb-12">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-black tracking-wide">Öne Çıkan Oyunlar</h2>
                <button onclick="switchPage('games')" class="text-sm font-semibold text-purple-400 hover:text-purple-300 transition">Tümünü Gör →</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${gamesData.slice(0, 3).map(g => `
                    <div onclick="switchPage('detail-${g.id}')" class="glass-card rounded-3xl p-6 transition cursor-pointer group flex flex-col justify-between">
                        <div>
                            <div class="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition shadow-inner">${g.icon}</div>
                            <span class="text-[11px] font-extrabold text-purple-400 uppercase tracking-widest">${g.cat}</span>
                            <h3 class="text-xl font-bold mt-1 mb-2 group-hover:text-purple-300 transition">${g.title}</h3>
                            <p class="text-slate-400 text-xs mb-6 leading-relaxed line-clamp-2">${g.desc}</p>
                        </div>
                        <div class="flex items-center justify-between pt-4 border-t border-slate-800/80">
                            <span class="text-xs text-slate-500">Zorluk: <strong class="text-slate-300">${g.diff}</strong></span>
                            <span class="text-xs font-bold text-purple-400 group-hover:translate-x-1 transition">Hemen Oyna →</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderGames() {
    return `
        <div class="mb-8">
            <h1 class="text-4xl font-black mb-2 tracking-tight">Choose Your Game</h1>
            <p class="text-slate-400 text-sm">Pick your favorite challenge and start playing.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${gamesData.map(g => `
                <div onclick="switchPage('detail-${g.id}')" class="glass-card rounded-3xl p-6 transition cursor-pointer group flex flex-col justify-between">
                    <div>
                        <div class="flex items-start justify-between mb-5">
                            <div class="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-3xl group-hover:scale-110 transition shadow-inner">${g.icon}</div>
                            <span class="text-[10px] font-black px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">${g.cat}</span>
                        </div>
                        <h3 class="text-xl font-bold mb-2 group-hover:text-purple-300 transition">${g.title}</h3>
                        <p class="text-slate-400 text-xs mb-6 leading-relaxed">${g.desc}</p>
                    </div>
                    <div class="flex items-center justify-between pt-4 border-t border-slate-800/80">
                        <span class="text-xs text-slate-500">En İyi: <strong class="text-amber-400">${g.score}</strong></span>
                        <span class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md shadow-purple-600/20">İncele</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderGameDetail(id) {
    const game = gamesData.find(g => g.id === id) || gamesData[0];
    return `
        <div class="max-w-2xl mx-auto glass-card rounded-3xl p-8 md:p-10 shadow-2xl animate-fade">
            <button onclick="switchPage('games')" class="text-xs font-semibold text-slate-400 hover:text-white mb-6 flex items-center gap-1 transition">← Oyunlara Dön</button>
            
            <div class="flex items-center gap-5 mb-6">
                <div class="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-5xl shadow-inner">${game.icon}</div>
                <div>
                    <span class="text-xs font-extrabold text-purple-400 uppercase tracking-widest">${game.cat} • Zorluk: ${game.diff}</span>
                    <h1 class="text-3xl font-black mt-1">${game.title}</h1>
                </div>
            </div>

            <p class="text-slate-300 text-sm mb-8 leading-relaxed">${game.desc} Bu oyunun oynanış motoru modüler olarak ekleniyor. Hazır olduğunda ilk oyunu bu ekrandan başlatabileceksin!</p>

            <div class="flex gap-4">
                <button onclick="alert('Modüler oyun motoru sıradaki adımda eklenecektir!')" class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-purple-600/30 transition text-center">PLAY NOW</button>
                <button onclick="switchPage('games')" class="bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold px-6 py-4 rounded-2xl border border-slate-800 transition">Geri</button>
            </div>
        </div>
    `;
}

function renderLeaderboard() {
    return `
        <div class="mb-8">
            <h1 class="text-4xl font-black mb-2 tracking-tight">Top Players</h1>
            <p class="text-slate-400 text-sm">Global sıralama ve kişisel en iyi rekorların.</p>
        </div>
        <div class="glass-card rounded-3xl p-6 shadow-xl max-w-2xl mx-auto">
            <h3 class="font-bold mb-5 text-sm text-purple-400">🏆 Global Liderler Tablosu</h3>
            <div class="space-y-3">
                ${[ {r:1, n:'Burcu', s:1420, g:'Potion Panic'}, {r:2, n:'Efe', s:1280, g:'Mirror Escape'}, {r:3, n:'Zeynep', s:1150, g:'Octo Grab'} ].map(l => `
                    <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-sm">
                        <div class="flex items-center gap-4">
                            <span class="w-6 text-center font-black text-xs text-amber-400">#${l.r}</span>
                            <span class="font-bold">${l.n}</span>
                        </div>
                        <span class="font-black text-purple-400">${l.s} Puan</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderProfile() {
    return `
        <div class="max-w-2xl mx-auto glass-card rounded-3xl p-8 md:p-10 shadow-2xl animate-fade">
            <div class="flex items-center gap-5 mb-8 pb-8 border-b border-slate-800/80">
                <div class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-3xl font-black text-white shadow-xl">BU</div>
                <div>
                    <h1 class="text-3xl font-black">Burcu Uysal</h1>
                    <p class="text-purple-400 text-xs font-semibold mt-1">Player • Seviye 14 Arcade Ustası</p>
                </div>
            </div>
        </div>
    `;
}

const arcadeGames = [
    { id: 'hyperpulse', title: 'HyperPulse 2084', type: 'rhythm', description: 'Dört şeritte ritmi yakala. Notayı çizgiye geldiğinde doğru tuşla karşıla.', controls: 'A / S / D / F veya dokunmatik şeritler', goal: '25 nota isabeti' },
    { id: 'chrono', title: 'Chrono Rift', type: 'sliding', description: 'Zamanı doğru sıraya getir. Taşları boş kareye kaydırıp 1’den 15’e diz.', controls: 'Ok tuşları veya taşlara tıkla', goal: 'Bulmacayı çöz' },
    { id: 'vapor', title: 'Vapor Dash', type: 'dash', description: 'Neon engellerden kaç ve enerji kürelerini topla. Her saniye hızlanırsın.', controls: 'A / D veya ← / →', goal: '30 saniye dayan' },
    { id: 'dungeon', title: 'Pixel Dungeon Crawler', type: 'dungeon', description: 'Zindanda anahtarı bul, yaratıklardan kaç ve çıkışa ulaş.', controls: 'WASD veya ok tuşları', goal: 'Anahtarı alıp çıkışa ulaş' },
    { id: 'pinball', title: 'Cosmic Pinball DX', type: 'pinball', description: 'Topu paletle oyunda tut, kozmik hedeflere çarptır ve puan topla.', controls: '← / → veya fare; boşluk ile topu fırlat', goal: '3 top hakkını kullan' },
    { id: 'aether', title: 'Aether Strike', type: 'shooter', description: 'Gemini uzay geminle düşman dalgalarını temizle.', controls: 'WASD / ok tuşları; boşluk ile ateş', goal: '20 düşman vur' },
    { id: 'zen', title: 'Zen Matrix', type: 'merge', description: 'Aynı sayıları birleştir, 256 taşına ulaş.', controls: 'WASD veya ok tuşları', goal: '256 oluştur' },
    { id: 'neon', title: 'Neon Overdrive', type: 'drift', description: 'Kıvrılan otoyolda trafiği aş, yakıt hücrelerini topla.', controls: '← / → veya A / D', goal: '40 saniye dayan' },
    { id: 'gravity', title: 'Gravity Flip Tactics', type: 'gravity', description: 'Yerçekimini değiştirerek yıldızları topla ve kapıya ulaş.', controls: '← / → hareket; boşluk ile yerçekimini çevir', goal: '3 yıldız ve çıkış' },
    { id: 'boba', title: 'Boba Blast Rush', type: 'match', description: 'Yan yana iki boba taşını değiştir. Üç veya fazlasını eşleştir.', controls: 'İki komşu taşa tıkla', goal: '400 puan / 60 saniye' }
];

const gameById = Object.fromEntries(arcadeGames.map(game => [game.id, game]));
const coverArtCache = new Map();
const gameAliases = {
    'hyperpulse 2084': 'hyperpulse',
    'chrono rift': 'chrono',
    'vapor dash': 'vapor',
    'pixel dungeon crawler': 'dungeon',
    'cosmic pinball dx': 'pinball',
    'aether strike': 'aether',
    'zen matrix': 'zen',
    'neon overdrive': 'neon',
    'gravity flip tactics': 'gravity',
    'boba blast rush': 'boba'
};

const canvasWidth = 960;
const canvasHeight = 540;
const heldKeys = new Set();
let activeGame;
let gameState;
let lastFrame = 0;
let lastHudUpdate = 0;
let animationId = 0;
let canvasPointerStart;

function readBestScores() {
    try {
        return JSON.parse(localStorage.getItem('playora-best-scores') || '{}');
    } catch {
        return {};
    }
}

function saveBestScore(gameId, score) {
    const scores = readBestScores();
    scores[gameId] = Math.max(scores[gameId] || 0, score);
    try {
        localStorage.setItem('playora-best-scores', JSON.stringify(scores));
    } catch {
        return score;
    }
    return scores[gameId];
}

function bootPlayora() {
    document.querySelectorAll('.game-card').forEach(card => {
        const title = card.dataset.title || card.querySelector('h2')?.textContent.trim().toLowerCase();
        const gameId = gameAliases[title?.toLowerCase()];
        const link = card.querySelector('a[href="detail.html"]');
        if (link && gameId) {
            link.href = `detail.html?game=${gameId}`;
            link.dataset.gameId = gameId;
        }
        if (gameId) card.dataset.gameId = gameId;
    });

    renderGameArtwork();
    if (document.getElementById('launch-btn')) mountGamePage();
    if (window.location.pathname.endsWith('/leaderboard.html')) {
        let scoresPanel = document.getElementById('leaderboard-scores');
        if (!scoresPanel) {
            scoresPanel = document.createElement('section');
            scoresPanel.id = 'leaderboard-scores';
            scoresPanel.className = 'arcade-stage';
            document.querySelector('main').append(scoresPanel);
        }
        renderLocalLeaderboard();
    }
}

function renderGameArtwork() {
    document.querySelectorAll('.game-card').forEach(card => {
        const image = card.querySelector('img');
        const gameId = card.dataset.gameId;
        if (image && gameId) image.src = createGameArtwork(gameId);
    });
    if (window.location.pathname.endsWith('/index.html')) {
        const heroImage = document.querySelector('main img');
        if (heroImage) heroImage.src = createGameArtwork('hyperpulse');
    }
    const detailHero = document.querySelector('main .bg-cover');
    if (detailHero) detailHero.style.backgroundImage = `url("${createGameArtwork(new URLSearchParams(window.location.search).get('game') || 'hyperpulse')}")`;
}

function createGameArtwork(gameId) {
    if (coverArtCache.has(gameId)) return coverArtCache.get(gameId);
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    const ctx = canvas.getContext('2d');
    const base = ctx.createLinearGradient(0, 0, 960, 540);
    base.addColorStop(0, '#101d24');
    base.addColorStop(0.55, '#0a1118');
    base.addColorStop(1, '#19241b');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 960, 540);

    const glow = ctx.createRadialGradient(690, 250, 12, 690, 250, 390);
    glow.addColorStop(0, 'rgba(72, 159, 82, 0.28)');
    glow.addColorStop(0.5, 'rgba(211, 173, 42, 0.09)');
    glow.addColorStop(1, 'rgba(8, 13, 19, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 960, 540);
    ctx.strokeStyle = 'rgba(174, 197, 156, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 960; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 540); ctx.stroke(); }
    for (let y = 0; y <= 540; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(960, y); ctx.stroke(); }
    ctx.fillStyle = '#f1cc42';
    for (let i = 0; i < 42; i += 1) {
        const x = (i * 197 + 59) % 960;
        const y = (i * 113 + 31) % 540;
        ctx.globalAlpha = ((i % 4) + 1) * 0.12;
        ctx.fillRect(x, y, i % 5 === 0 ? 4 : 2, i % 5 === 0 ? 4 : 2);
    }
    ctx.globalAlpha = 1;

    switch (gameId) {
        case 'hyperpulse': drawRhythmCover(ctx); break;
        case 'chrono': drawPuzzleCover(ctx); break;
        case 'vapor': drawRoadCover(ctx, false); break;
        case 'dungeon': drawDungeonCover(ctx); break;
        case 'pinball': drawPinballCover(ctx); break;
        case 'aether': drawSpaceCover(ctx); break;
        case 'zen': drawNumberCover(ctx); break;
        case 'neon': drawRoadCover(ctx, true); break;
        case 'gravity': drawGravityCover(ctx); break;
        case 'boba': drawBobaCover(ctx); break;
    }

    const artwork = canvas.toDataURL('image/jpeg', 0.9);
    coverArtCache.set(gameId, artwork);
    return artwork;
}

function drawRhythmCover(ctx) {
    for (let lane = 0; lane < 4; lane += 1) {
        const x = 255 + lane * 120;
        ctx.fillStyle = lane % 2 ? 'rgba(47, 81, 55, 0.45)' : 'rgba(26, 52, 56, 0.55)';
        ctx.fillRect(x, 34, 82, 470);
        ctx.strokeStyle = lane % 2 ? '#55cf72' : '#f1cc42';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(x + 41, 421, 31, 0, Math.PI * 2); ctx.stroke();
        for (let note = 0; note < 3; note += 1) {
            ctx.globalAlpha = 0.45 + note * 0.2;
            ctx.fillStyle = lane % 2 ? '#a9d46a' : '#f1cc42';
            ctx.beginPath(); ctx.arc(x + 41, 104 + note * 93 + lane * 7, 14 + note * 2, 0, Math.PI * 2); ctx.fill();
        }
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(241, 204, 66, 0.16)'; ctx.fillRect(166, 417, 630, 4);
}

function drawPuzzleCover(ctx) {
    const tiles = [4, 1, 8, 2, 5, 3, 7, 6, 0];
    tiles.forEach((value, index) => {
        const x = 294 + index % 3 * 126, y = 65 + Math.floor(index / 3) * 126;
        ctx.fillStyle = value ? (value % 2 ? '#426c43' : '#b89a31') : 'rgba(6, 12, 17, 0.7)';
        ctx.fillRect(x, y, 112, 112);
        ctx.strokeStyle = 'rgba(242, 237, 207, 0.36)'; ctx.lineWidth = 2; ctx.strokeRect(x, y, 112, 112);
        if (value) { ctx.fillStyle = '#f5f0dc'; ctx.font = '700 46px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(value, x + 56, y + 72); }
    });
    ctx.strokeStyle = '#f1cc42'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(676, 186); ctx.lineTo(784, 186); ctx.lineTo(784, 294); ctx.stroke();
}

function drawRoadCover(ctx, drift) {
    ctx.fillStyle = 'rgba(41, 67, 42, 0.68)';
    ctx.beginPath(); ctx.moveTo(108, 540); ctx.lineTo(397, 52); ctx.lineTo(562, 52); ctx.lineTo(854, 540); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#f1cc42'; ctx.globalAlpha = 0.8; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(397, 52); ctx.lineTo(108, 540); ctx.moveTo(562, 52); ctx.lineTo(854, 540); ctx.stroke();
    ctx.setLineDash([28, 24]); ctx.strokeStyle = '#e6ebd8'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(480, 58); ctx.lineTo(drift ? 445 : 480, 540); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    drawCoverCar(ctx, drift ? 548 : 420, 365, drift ? '#f1cc42' : '#58c875');
    for (let i = 0; i < 6; i += 1) {
        ctx.globalAlpha = 0.18 + i * 0.07; ctx.strokeStyle = i % 2 ? '#55cf72' : '#f1cc42'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(160 + i * 55, 60 + i * 14); ctx.lineTo(80 + i * 36, 156 + i * 21); ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

function drawCoverCar(ctx, x, y, color) {
    ctx.fillStyle = '#080d12'; ctx.beginPath(); ctx.ellipse(x, y + 66, 128, 22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x - 104, y + 48); ctx.lineTo(x - 74, y + 8); ctx.lineTo(x - 30, y - 14); ctx.lineTo(x + 44, y - 14); ctx.lineTo(x + 90, y + 8); ctx.lineTo(x + 112, y + 48); ctx.lineTo(x + 94, y + 61); ctx.lineTo(x - 96, y + 61); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#172833'; ctx.beginPath(); ctx.moveTo(x - 48, y + 2); ctx.lineTo(x - 24, y - 12); ctx.lineTo(x + 34, y - 12); ctx.lineTo(x + 62, y + 2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#101419'; ctx.beginPath(); ctx.arc(x - 66, y + 53, 20, 0, Math.PI * 2); ctx.arc(x + 69, y + 53, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f5eed4'; ctx.fillRect(x - 90, y + 29, 18, 8); ctx.fillRect(x + 74, y + 29, 18, 8);
}

function drawDungeonCover(ctx) {
    const map = ['#########', '#..#....#', '#..#.#..#', '#....#..#', '##.#....#', '#########'];
    map.forEach((line, row) => [...line].forEach((tile, col) => {
        const x = 268 + col * 62, y = 84 + row * 62;
        ctx.fillStyle = tile === '#' ? '#38463f' : '#10191d'; ctx.fillRect(x, y, 56, 56);
        ctx.strokeStyle = 'rgba(232, 224, 181, 0.13)'; ctx.strokeRect(x, y, 56, 56);
    }));
    ctx.fillStyle = '#f1cc42'; ctx.beginPath(); ctx.arc(750, 387, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#55cf72'; ctx.fillRect(738, 86, 46, 8); ctx.fillRect(738, 86, 8, 72); ctx.fillRect(776, 86, 8, 72);
    ctx.fillStyle = '#dae7c9'; ctx.beginPath(); ctx.arc(398, 327, 19, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f1cc42'; ctx.shadowColor = '#f1cc42'; ctx.shadowBlur = 28; ctx.beginPath(); ctx.arc(398, 327, 7, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
}

function drawPinballCover(ctx) {
    ctx.strokeStyle = '#55cf72'; ctx.lineWidth = 9; ctx.strokeRect(282, 34, 396, 474);
    [{ x: 382, y: 145, r: 44, c: '#f1cc42' }, { x: 570, y: 196, r: 58, c: '#55cf72' }, { x: 382, y: 294, r: 37, c: '#b5de78' }].forEach(item => {
        ctx.fillStyle = item.c; ctx.beginPath(); ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#e8eddd'; ctx.lineWidth = 4; ctx.stroke();
    });
    ctx.fillStyle = '#f2f0df'; ctx.shadowColor = '#f1cc42'; ctx.shadowBlur = 24; ctx.beginPath(); ctx.arc(520, 344, 12, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = '#a9d46a'; ctx.save(); ctx.translate(384, 442); ctx.rotate(-0.24); ctx.fillRect(-67, -11, 134, 22); ctx.restore();
    ctx.save(); ctx.translate(576, 442); ctx.rotate(0.24); ctx.fillRect(-67, -11, 134, 22); ctx.restore();
}

function drawSpaceCover(ctx) {
    ctx.fillStyle = 'rgba(35, 61, 48, 0.55)'; ctx.beginPath(); ctx.arc(704, 194, 106, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#a9d46a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(704, 194, 155, 42, -0.22, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#55cf72'; ctx.beginPath(); ctx.arc(704, 194, 72, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f1cc42'; ctx.beginPath(); ctx.moveTo(398, 178); ctx.lineTo(314, 369); ctx.lineTo(404, 328); ctx.lineTo(484, 373); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#eaf1d4'; ctx.beginPath(); ctx.arc(401, 286, 23, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f1cc42'; ctx.fillRect(430, 383, 8, 48); ctx.fillRect(512, 89, 6, 35); ctx.fillRect(194, 214, 6, 28);
    ctx.strokeStyle = 'rgba(241, 204, 66, 0.48)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(430, 390); ctx.lineTo(430, 472); ctx.stroke();
}

function drawNumberCover(ctx) {
    const values = [2, 4, 8, 16, 32, 64, 128, 256, 8, 4, 2, 16];
    values.forEach((value, index) => {
        const col = index % 4, row = Math.floor(index / 4);
        const x = 256 + col * 119, y = 98 + row * 119;
        ctx.fillStyle = value >= 32 ? '#c5b544' : value >= 8 ? '#56884b' : '#344b40';
        ctx.fillRect(x, y, 104, 104);
        ctx.fillStyle = '#f1f0dd'; ctx.font = `700 ${value > 99 ? 27 : 34}px sans-serif`; ctx.textAlign = 'center';
        ctx.fillText(value, x + 52, y + 65);
    });
}

function drawGravityCover(ctx) {
    const walls = new Set(['0,0', '1,0', '2,0', '5,0', '6,0', '1,1', '4,1', '7,1', '0,2', '3,2', '6,2', '2,3', '5,3', '8,3', '0,4', '4,4', '7,4']);
    for (let row = 0; row < 5; row += 1) for (let col = 0; col < 9; col += 1) {
        const x = 214 + col * 61, y = 114 + row * 61;
        if (walls.has(`${col},${row}`)) { ctx.fillStyle = '#52624a'; ctx.fillRect(x, y, 54, 54); }
    }
    [[2, 1], [5, 2], [7, 3]].forEach(([col, row]) => {
        ctx.fillStyle = '#f1cc42'; ctx.shadowColor = '#f1cc42'; ctx.shadowBlur = 15;
        ctx.beginPath(); ctx.moveTo(214 + col * 61 + 27, 114 + row * 61 + 10); ctx.lineTo(214 + col * 61 + 34, 114 + row * 61 + 24); ctx.lineTo(214 + col * 61 + 50, 114 + row * 61 + 26); ctx.lineTo(214 + col * 61 + 38, 114 + row * 61 + 37); ctx.lineTo(214 + col * 61 + 42, 114 + row * 61 + 51); ctx.lineTo(214 + col * 61 + 27, 114 + row * 61 + 42); ctx.lineTo(214 + col * 61 + 12, 114 + row * 61 + 51); ctx.lineTo(214 + col * 61 + 16, 114 + row * 61 + 37); ctx.lineTo(214 + col * 61 + 4, 114 + row * 61 + 26); ctx.lineTo(214 + col * 61 + 20, 114 + row * 61 + 24); ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
    });
    ctx.fillStyle = '#55cf72'; ctx.beginPath(); ctx.arc(336, 388, 18, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#f1cc42'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(758, 164); ctx.lineTo(758, 342); ctx.moveTo(740, 325); ctx.lineTo(758, 344); ctx.lineTo(776, 325); ctx.stroke();
}

function drawBobaCover(ctx) {
    const cups = [{ x: 382, y: 235, color: '#c9a24c' }, { x: 566, y: 205, color: '#77a951' }];
    cups.forEach((cup, index) => {
        ctx.fillStyle = cup.color; ctx.beginPath(); ctx.moveTo(cup.x - 54, cup.y); ctx.lineTo(cup.x + 54, cup.y); ctx.lineTo(cup.x + 39, cup.y + 178); ctx.lineTo(cup.x - 39, cup.y + 178); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#e9e4d1'; ctx.fillRect(cup.x - 59, cup.y - 12, 118, 18);
        ctx.strokeStyle = '#f1cc42'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(cup.x + 10, cup.y - 12); ctx.lineTo(cup.x + 36, cup.y - 104); ctx.stroke();
        ctx.fillStyle = '#10181c';
        for (let pearl = 0; pearl < 7; pearl += 1) {
            const px = cup.x - 25 + (pearl % 3) * 25;
            const py = cup.y + 118 + Math.floor(pearl / 3) * 20 + (index ? 4 : 0);
            ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();
        }
    });
    ctx.fillStyle = '#f1cc42'; ctx.beginPath(); ctx.arc(740, 179, 39, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#55cf72'; ctx.beginPath(); ctx.arc(748, 172, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e9e4d1'; ctx.font = '700 28px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('BOBA', 475, 483);
}

function mountGamePage() {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('game') || 'hyperpulse';
    activeGame = gameById[requestedId] || arcadeGames[0];
    const heading = document.querySelector('main h1');
    const subtitle = heading?.parentElement.querySelector('p');
    if (heading) heading.textContent = activeGame.title;
    if (subtitle) subtitle.textContent = activeGame.description;
    document.title = `${activeGame.title} | PLAYORA`;

    const stage = document.createElement('section');
    stage.className = 'arcade-stage';
    stage.id = 'arcade-game';
    stage.innerHTML = `
        <div class="arcade-heading">
            <div><span class="arcade-kicker">PLAYORA ARCADE</span><h2>${activeGame.title}</h2><p>${activeGame.description}</p></div>
            <a class="arcade-back" href="games.html">← Oyun kasasına dön</a>
        </div>
        <div class="arcade-stats" aria-live="polite">
            <div><span>SKOR</span><strong id="game-score">0</strong></div>
            <div><span>EN İYİ</span><strong id="game-best">0</strong></div>
            <div><span>HEDEF</span><strong id="game-goal">${activeGame.goal}</strong></div>
            <div><span>DURUM</span><strong id="game-status">Hazır</strong></div>
        </div>
        <div class="arcade-board">
            <canvas id="game-canvas" width="${canvasWidth}" height="${canvasHeight}" aria-label="${activeGame.title} oyun alanı"></canvas>
            <div class="arcade-overlay" id="game-overlay">
                <div class="arcade-overlay-panel"><span class="arcade-kicker" id="overlay-kicker">OYUNA HAZIR</span><h3 id="overlay-title">${activeGame.title}</h3><p id="overlay-message">${activeGame.controls}</p><button id="overlay-action" type="button">OYUNU BAŞLAT</button></div>
            </div>
        </div>
        <div class="arcade-controls"><span>${activeGame.controls}</span><div id="touch-controls" aria-label="Dokunmatik oyun kontrolleri"></div><button class="arcade-reset" id="game-reset" type="button" title="Oyunu yeniden başlat">↻ Yeniden başlat</button></div>
    `;
    document.querySelector('main').append(stage);

    const scores = readBestScores();
    document.getElementById('game-best').textContent = scores[activeGame.id] || '0';
    document.getElementById('launch-btn').addEventListener('click', startGame);
    document.getElementById('overlay-action').addEventListener('click', startGame);
    document.getElementById('game-reset').addEventListener('click', startGame);
    buildTouchControls();

    const canvas = document.getElementById('game-canvas');
    canvas.addEventListener('pointerdown', onCanvasPointerDown);
    canvas.addEventListener('pointermove', onCanvasPointerMove);
    canvas.addEventListener('pointerup', onCanvasPointerUp);
    window.addEventListener('keydown', onGameKeyDown);
    window.addEventListener('keyup', onGameKeyUp);
    window.addEventListener('blur', () => heldKeys.clear());
    drawGame(0);
}

function buildTouchControls() {
    const controlRoot = document.getElementById('touch-controls');
    if (activeGame.type === 'match') {
        controlRoot.hidden = true;
        controlRoot.style.display = 'none';
        return;
    }
    const controls = activeGame.type === 'rhythm'
        ? [['A', 'a'], ['S', 's'], ['D', 'd'], ['F', 'f']]
        : activeGame.type === 'sliding' || activeGame.type === 'merge' || activeGame.type === 'dungeon'
            ? [['↑', 'ArrowUp'], ['←', 'ArrowLeft'], ['↓', 'ArrowDown'], ['→', 'ArrowRight']]
            : activeGame.type === 'gravity'
                ? [['←', 'ArrowLeft'], ['FLIP', ' '], ['→', 'ArrowRight']]
                : activeGame.type === 'shooter'
                    ? [['←', 'ArrowLeft'], ['↑', 'ArrowUp'], ['FIRE', ' '], ['→', 'ArrowRight'], ['↓', 'ArrowDown']]
                    : [['←', 'ArrowLeft'], ['BOOST', ' '], ['→', 'ArrowRight']];
    controlRoot.innerHTML = controls.map(([label, key]) => `<button type="button" class="arcade-control" data-key="${key}" aria-label="${label}">${label}</button>`).join('');
    controlRoot.querySelectorAll('[data-key]').forEach(button => {
        const key = button.dataset.key;
        button.addEventListener('pointerdown', event => {
            event.preventDefault();
            heldKeys.add(key.toLowerCase());
            if (activeGame.type === 'rhythm') hitRhythmLane('asdf'.indexOf(key));
            if (activeGame.type === 'sliding' || activeGame.type === 'merge' || activeGame.type === 'dungeon') moveGridGame(key);
            if (activeGame.type === 'gravity' && key === ' ') flipGravity();
        });
        button.addEventListener('pointerup', () => heldKeys.delete(key.toLowerCase()));
        button.addEventListener('pointerleave', () => heldKeys.delete(key.toLowerCase()));
    });
}

function startGame() {
    heldKeys.clear();
    gameState = createGameState(activeGame.type);
    document.getElementById('game-overlay').classList.add('is-hidden');
    document.getElementById('game-status').textContent = 'Oynanıyor';
    lastFrame = performance.now();
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
}

function showGameOverlay(kicker, title, message, buttonText) {
    const overlay = document.getElementById('game-overlay');
    if (!overlay) return;
    document.getElementById('overlay-kicker').textContent = kicker;
    document.getElementById('overlay-title').textContent = title;
    document.getElementById('overlay-message').textContent = message;
    document.getElementById('overlay-action').textContent = buttonText;
    overlay.classList.remove('is-hidden');
}

function finishGame(won, message) {
    if (!gameState || gameState.done) return;
    gameState.done = true;
    gameState.won = won;
    const best = saveBestScore(activeGame.id, gameState.score);
    document.getElementById('game-best').textContent = best;
    document.getElementById('game-status').textContent = won ? 'Tamamlandı' : 'Oyun bitti';
    showGameOverlay(won ? 'GÜZEL OYUN' : 'TEKRAR DENE', won ? 'Başardın!' : 'Oyun bitti', `${message} Skorun: ${gameState.score}`, 'YENİDEN OYNA');
}

function gameLoop(now) {
    if (!gameState || gameState.done) return;
    const dt = Math.min((now - lastFrame) / 1000, 0.04);
    lastFrame = now;
    updateGame(dt);
    drawGame(now);
    if (now - lastHudUpdate > 120) {
        document.getElementById('game-score').textContent = Math.floor(gameState.score).toLocaleString('tr-TR');
        if (gameState.timeLimit) document.getElementById('game-status').textContent = `${Math.max(0, Math.ceil(gameState.timeLimit - gameState.elapsed))} sn`;
        lastHudUpdate = now;
    }
    if (!gameState.done) animationId = requestAnimationFrame(gameLoop);
}

function createGameState(type) {
    const state = { score: 0, elapsed: 0, done: false, timeLimit: 0 };
    if (type === 'rhythm') Object.assign(state, { notes: [], spawn: 0.5, hits: 0, misses: 0, timeLimit: 60 });
    if (type === 'sliding') Object.assign(state, { tiles: Array.from({ length: 16 }, (_, i) => (i + 1) % 16), moves: 0 });
    if (type === 'dash') Object.assign(state, { lane: 1, obstacles: [], spawn: 0.6, orbs: [], timeLimit: 30 });
    if (type === 'dungeon') Object.assign(state, { player: { x: 0, y: 0 }, hp: 3, key: false, exit: { x: 8, y: 5 }, keyAt: { x: 7, y: 4 }, enemies: [{ x: 5, y: 1 }, { x: 2, y: 4 }, { x: 7, y: 2 }], walls: new Set(['2,0', '2,1', '4,1', '4,2', '1,3', '3,3', '5,3', '6,3', '3,5', '5,5', '6,5', '8,3']) });
    if (type === 'pinball') Object.assign(state, { ball: { x: 480, y: 390, vx: 175, vy: -30 }, paddle: 480, bumpers: [{ x: 300, y: 180, r: 34 }, { x: 480, y: 130, r: 44 }, { x: 660, y: 180, r: 34 }], lives: 3, launched: false });
    if (type === 'shooter') Object.assign(state, { player: { x: 480, y: 470 }, bullets: [], enemies: [], spawn: 0.3, kills: 0, timeLimit: 70, hp: 3, fireCooldown: 0 });
    if (type === 'merge') Object.assign(state, { board: Array(16).fill(0), moves: 0, target: 256 });
    if (type === 'drift') Object.assign(state, { player: 480, obstacles: [], fuel: [], spawn: 0.7, timeLimit: 40, roadShift: 0, crashes: 0 });
    if (type === 'gravity') Object.assign(state, { player: { x: 1, y: 4 }, gravity: 1, stars: new Set(['3,4', '5,2', '7,4']), walls: new Set(['0,5', '1,5', '2,5', '3,5', '4,5', '5,5', '6,5', '7,5', '8,5', '0,0', '1,0', '2,0', '4,0', '5,0', '6,0', '8,0', '3,3', '5,1', '2,2', '7,2']), exit: { x: 8, y: 4 } });
    if (type === 'match') Object.assign(state, { board: makeMatchBoard(), selected: null, timeLimit: 60, matches: 0 });
    if (type === 'sliding') shuffleSliding(state);
    if (type === 'merge') { addMergeTile(state); addMergeTile(state); }
    return state;
}

function updateGame(dt) {
    const state = gameState;
    if (state.paused || state.done) return;
    state.elapsed += dt;
    switch (activeGame.type) {
        case 'rhythm': updateRhythm(dt); break;
        case 'dash': updateDash(dt); break;
        case 'pinball': updatePinball(dt); break;
        case 'shooter': updateShooter(dt); break;
        case 'drift': updateDrift(dt); break;
        case 'gravity': updateGravity(dt); break;
        case 'match': updateMatch(dt); break;
    }
    if (state.timeLimit && state.elapsed >= state.timeLimit && !state.done) {
        const survived = ['dash', 'drift'].includes(activeGame.type);
        finishGame(survived, survived ? 'Hedef süre boyunca dayanmayı başardın.' : 'Süre doldu, hedef tamamlanamadı.');
    }
}

function onGameKeyDown(event) {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'a', 's', 'd', 'f', 'j', 'k', 'l', 'w'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    if (event.repeat) return;
    heldKeys.add(event.key.toLowerCase());
    const key = event.key.toLowerCase();
    if (activeGame.type === 'rhythm' && 'asdf'.includes(key)) hitRhythmLane('asdf'.indexOf(key));
    if (['sliding', 'merge', 'dungeon'].includes(activeGame.type)) moveGridGame(event.key);
    if (activeGame.type === 'gravity') {
        if (event.key === 'ArrowLeft' || key === 'a') moveGravity(-1);
        if (event.key === 'ArrowRight' || key === 'd') moveGravity(1);
        if (event.key === ' ') flipGravity();
    }
    if (activeGame.type === 'pinball' && event.key === ' ' && gameState && !gameState.launched) gameState.launched = true;
}

function onGameKeyUp(event) {
    heldKeys.delete(event.key.toLowerCase());
}

function onCanvasPointerMove(event) {
    if (!gameState || gameState.done) return;
    const point = canvasPoint(event);
    if (activeGame.type === 'pinball') gameState.paddle = point.x;
    if (activeGame.type === 'shooter') gameState.player.x = clamp(point.x, 55, canvasWidth - 55);
}

function onCanvasPointerDown(event) {
    if (!gameState || gameState.done) return;
    const point = canvasPoint(event);
    if (activeGame.type === 'sliding') {
        const cell = boardCell(point, 16, 4, 4, 240, 60, 480);
        if (cell >= 0) slideTile(gameState, cell);
    }
    if (activeGame.type === 'merge') {
        canvasPointerStart = point;
        event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (activeGame.type === 'match') selectMatchTile(point);
    if (activeGame.type === 'pinball' && !gameState.launched) gameState.launched = true;
    if (activeGame.type === 'shooter') fireBullet();
}

function onCanvasPointerUp(event) {
    if (activeGame.type !== 'merge' || !canvasPointerStart) return;
    const point = canvasPoint(event);
    const dx = point.x - canvasPointerStart.x;
    const dy = point.y - canvasPointerStart.y;
    canvasPointerStart = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    moveMerge(Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'arrowleft' : 'arrowright') : (dy < 0 ? 'arrowup' : 'arrowdown'));
}

function canvasPoint(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * canvasWidth / rect.width, y: (event.clientY - rect.top) * canvasHeight / rect.height };
}

function moveGridGame(key) {
    if (!gameState || gameState.done) return;
    const normalized = key.toLowerCase();
    if (activeGame.type === 'sliding') {
        const blank = gameState.tiles.indexOf(0);
        let target = -1;
        if (normalized === 'arrowleft' || normalized === 'a') target = blank % 4 < 3 ? blank + 1 : -1;
        if (normalized === 'arrowright' || normalized === 'd') target = blank % 4 > 0 ? blank - 1 : -1;
        if (normalized === 'arrowup' || normalized === 'w') target = blank < 12 ? blank + 4 : -1;
        if (normalized === 'arrowdown' || normalized === 's') target = blank >= 4 ? blank - 4 : -1;
        if (target >= 0) slideTile(gameState, target);
    } else if (activeGame.type === 'merge') {
        moveMerge(normalized);
    } else if (activeGame.type === 'dungeon') {
        const direction = { ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0], ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1] }[key] || { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[key];
        if (direction) moveDungeon(...direction);
    }
}

function slideTile(state, tileIndex) {
    const blank = state.tiles.indexOf(0);
    if (Math.abs(blank % 4 - tileIndex % 4) + Math.abs(Math.floor(blank / 4) - Math.floor(tileIndex / 4)) !== 1) return;
    [state.tiles[blank], state.tiles[tileIndex]] = [state.tiles[tileIndex], state.tiles[blank]];
    state.moves += 1;
    state.score = Math.max(0, 5000 - state.moves * 10);
    if (state.tiles.every((value, index) => value === (index + 1) % 16)) finishGame(true, `${state.moves} hamlede çözdün.`);
}

function shuffleSliding(state) {
    for (let i = 0; i < 130; i += 1) {
        const blank = state.tiles.indexOf(0);
        const options = [blank - 4, blank + 4, blank - 1, blank + 1].filter(index => index >= 0 && index < 16 && Math.abs(index % 4 - blank % 4) + Math.abs(Math.floor(index / 4) - Math.floor(blank / 4)) === 1);
        const target = options[Math.floor(Math.random() * options.length)];
        [state.tiles[blank], state.tiles[target]] = [state.tiles[target], state.tiles[blank]];
    }
}

function addMergeTile(state) {
    const empty = state.board.map((value, index) => value === 0 ? index : -1).filter(index => index >= 0);
    if (!empty.length) return;
    state.board[empty[Math.floor(Math.random() * empty.length)]] = Math.random() < 0.85 ? 2 : 4;
}

function moveMerge(direction) {
    const state = gameState;
    const before = state.board.join(',');
    const lines = [];
    for (let i = 0; i < 4; i += 1) {
        const indices = direction === 'arrowleft' || direction === 'a' ? [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3]
            : direction === 'arrowright' || direction === 'd' ? [i * 4 + 3, i * 4 + 2, i * 4 + 1, i * 4]
                : direction === 'arrowup' || direction === 'w' ? [i, i + 4, i + 8, i + 12]
                    : direction === 'arrowdown' || direction === 's' ? [i + 12, i + 8, i + 4, i] : null;
        if (indices) lines.push(indices);
    }
    for (const indices of lines) {
        const values = indices.map(index => state.board[index]).filter(Boolean);
        for (let i = 0; i < values.length - 1; i += 1) {
            if (values[i] === values[i + 1]) {
                values[i] *= 2;
                state.score += values[i];
                values.splice(i + 1, 1);
                if (values[i] >= state.target) finishGame(true, `${state.target} taşına ulaştın.`);
            }
        }
        while (values.length < 4) values.push(0);
        indices.forEach((index, position) => { state.board[index] = values[position]; });
    }
    if (state.board.join(',') !== before) {
        state.moves += 1;
        addMergeTile(state);
        if (!state.board.some((value, index) => value === 0 || [index % 4 !== 3 ? index + 1 : -1, index < 12 ? index + 4 : -1].some(next => next >= 0 && state.board[next] === value))) finishGame(false, 'Tahta doldu, hamle kalmadı.');
    }
}

function moveDungeon(dx, dy) {
    const state = gameState;
    const nx = state.player.x + dx;
    const ny = state.player.y + dy;
    if (nx < 0 || nx > 8 || ny < 0 || ny > 5 || state.walls.has(`${nx},${ny}`)) return;
    const enemyIndex = state.enemies.findIndex(enemy => enemy.x === nx && enemy.y === ny);
    if (enemyIndex >= 0) {
        state.enemies.splice(enemyIndex, 1);
        state.hp -= 1;
        if (state.hp <= 0) return finishGame(false, 'Zindandaki yaratıklar seni yakaladı.');
    }
    state.player = { x: nx, y: ny };
    state.score += 10;
    if (nx === state.keyAt.x && ny === state.keyAt.y) { state.key = true; state.score += 100; }
    if (nx === state.exit.x && ny === state.exit.y && state.key) return finishGame(true, 'Anahtarla zindandan çıktın.');
    state.enemies.forEach(enemy => {
        const options = [[Math.sign(state.player.x - enemy.x), 0], [0, Math.sign(state.player.y - enemy.y)]];
        const [mx, my] = options[Math.floor(Math.random() * options.length)];
        if (mx || my) {
            const ex = enemy.x + mx, ey = enemy.y + my;
            if (ex >= 0 && ex <= 8 && ey >= 0 && ey <= 5 && !state.walls.has(`${ex},${ey}`)) { enemy.x = ex; enemy.y = ey; }
        }
    });
    if (state.enemies.some(enemy => enemy.x === nx && enemy.y === ny)) {
        state.hp -= 1;
        if (state.hp <= 0) finishGame(false, 'Zindandaki yaratıklar seni yakaladı.');
    }
}

function moveGravity(dx) {
    const state = gameState;
    const nx = state.player.x + dx;
    if (nx < 0 || nx > 8 || state.walls.has(`${nx},${state.player.y}`)) return;
    state.player.x = nx;
    settleGravity();
    collectGravityStar();
    checkGravityWin();
}

function flipGravity() {
    if (!gameState || gameState.done) return;
    gameState.gravity *= -1;
    settleGravity();
    collectGravityStar();
    checkGravityWin();
}

function settleGravity() {
    const state = gameState;
    for (let i = 0; i < 6; i += 1) {
        const nextY = state.player.y + state.gravity;
        if (nextY < 0 || nextY > 5 || state.walls.has(`${state.player.x},${nextY}`)) break;
        state.player.y = nextY;
        collectGravityStar();
    }
}

function collectGravityStar() {
    const key = `${gameState.player.x},${gameState.player.y}`;
    if (gameState.stars.delete(key)) gameState.score += 100;
}

function checkGravityWin() {
    if (gameState.stars.size === 0 && gameState.player.x === gameState.exit.x && gameState.player.y === gameState.exit.y) finishGame(true, 'Tüm yıldızları toplayıp kapıya ulaştın.');
}

function makeMatchBoard() {
    const board = Array.from({ length: 64 }, () => Math.floor(Math.random() * 5));
    for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
            while ((j > 1 && board[i * 8 + j] === board[i * 8 + j - 1] && board[i * 8 + j] === board[i * 8 + j - 2]) || (i > 1 && board[i * 8 + j] === board[(i - 1) * 8 + j] && board[i * 8 + j] === board[(i - 2) * 8 + j])) board[i * 8 + j] = Math.floor(Math.random() * 5);
        }
    }
    return board;
}

function selectMatchTile(point) {
    const column = Math.floor((point.x - 194) / 72);
    const row = Math.floor((point.y - 28) / 62);
    if (column < 0 || column >= 8 || row < 0 || row >= 8) return;
    const cell = row * 8 + column;
    if (cell < 0) return;
    if (gameState.selected === null) { gameState.selected = cell; return; }
    const first = gameState.selected;
    gameState.selected = null;
    if (Math.abs(first % 8 - cell % 8) + Math.abs(Math.floor(first / 8) - Math.floor(cell / 8)) !== 1) { gameState.selected = cell; return; }
    [gameState.board[first], gameState.board[cell]] = [gameState.board[cell], gameState.board[first]];
    if (!clearMatches()) [gameState.board[first], gameState.board[cell]] = [gameState.board[cell], gameState.board[first]];
}

function findMatches() {
    const found = new Set();
    for (let row = 0; row < 8; row += 1) {
        for (let col = 0; col < 8; col += 1) {
            const value = gameState.board[row * 8 + col];
            if (col < 6 && value === gameState.board[row * 8 + col + 1] && value === gameState.board[row * 8 + col + 2]) {
                let end = col + 2;
                while (end < 7 && gameState.board[row * 8 + end + 1] === value) end += 1;
                for (let x = col; x <= end; x += 1) found.add(row * 8 + x);
            }
            if (row < 6 && value === gameState.board[(row + 1) * 8 + col] && value === gameState.board[(row + 2) * 8 + col]) {
                let end = row + 2;
                while (end < 7 && gameState.board[(end + 1) * 8 + col] === value) end += 1;
                for (let y = row; y <= end; y += 1) found.add(y * 8 + col);
            }
        }
    }
    return found;
}

function clearMatches() {
    let matches = findMatches();
    if (!matches.size) return false;
    while (matches.size) {
        gameState.score += matches.size * 10;
        matches.forEach(index => { gameState.board[index] = -1; });
        for (let col = 0; col < 8; col += 1) {
            const values = [];
            for (let row = 7; row >= 0; row -= 1) if (gameState.board[row * 8 + col] >= 0) values.push(gameState.board[row * 8 + col]);
            while (values.length < 8) values.push(Math.floor(Math.random() * 5));
            for (let row = 7; row >= 0; row -= 1) gameState.board[row * 8 + col] = values[7 - row];
        }
        matches = findMatches();
    }
    gameState.matches += 1;
    if (gameState.score >= 400) finishGame(true, `${gameState.matches} eşleşmeyle hedefi tamamladın.`);
    return true;
}

function boardCell(point, count, columns, rows, x, y, size) {
    const cellSize = size / columns;
    const col = Math.floor((point.x - x) / cellSize);
    const row = Math.floor((point.y - y) / cellSize);
    if (col < 0 || col >= columns || row < 0 || row >= rows) return -1;
    return Math.min(count - 1, row * columns + col);
}

function hitRhythmLane(lane) {
    if (!gameState || gameState.done || !gameState.notes || lane < 0) return;
    const note = gameState.notes.filter(item => item.lane === lane && !item.hit).sort((a, b) => Math.abs(a.y - 440) - Math.abs(b.y - 440))[0];
    if (note && Math.abs(note.y - 440) < 62) {
        note.hit = true;
        gameState.hits += 1;
        const points = Math.abs(note.y - 440) < 25 ? 100 : 60;
        gameState.score += points;
        if (gameState.hits >= 25) finishGame(true, 'Ritmi kusursuz yakaladın.');
    } else {
        gameState.misses += 1;
        gameState.score = Math.max(0, gameState.score - 20);
    }
}

function updateRhythm(dt) {
    const state = gameState;
    state.spawn -= dt;
    if (state.spawn <= 0) {
        state.notes.push({ lane: Math.floor(Math.random() * 4), y: 40, hit: false });
        state.spawn = Math.max(0.42, 0.82 - state.elapsed * 0.004);
    }
    state.notes.forEach(note => { note.y += dt * 270; if (note.y > 490 && !note.hit) { note.hit = true; state.misses += 1; } });
    state.notes = state.notes.filter(note => note.y < 520);
    if (state.misses >= 10) finishGame(false, 'Çok fazla notayı kaçırdın.');
}

function updateDash(dt) {
    const state = gameState;
    if (heldKeys.has('arrowleft') || heldKeys.has('a')) state.lane = Math.max(0, state.lane - dt * 4);
    if (heldKeys.has('arrowright') || heldKeys.has('d')) state.lane = Math.min(2, state.lane + dt * 4);
    state.spawn -= dt;
    if (state.spawn <= 0) {
        const lane = Math.floor(Math.random() * 3);
        (Math.random() < 0.72 ? state.obstacles : state.orbs).push({ lane, y: -30, hit: false });
        state.spawn = Math.max(0.35, 0.92 - state.elapsed * 0.012);
    }
    const speed = 240 + state.elapsed * 7;
    state.obstacles.forEach(item => {
        item.y += speed * dt;
        if (!item.hit && item.y > 390 && item.y < 470 && Math.round(state.lane) === item.lane) { item.hit = true; finishGame(false, 'Bir engele çarptın.'); }
    });
    state.orbs.forEach(item => {
        item.y += speed * dt;
        if (!item.hit && item.y > 390 && item.y < 470 && Math.round(state.lane) === item.lane) { item.hit = true; state.score += 50; }
    });
    state.obstacles = state.obstacles.filter(item => item.y < 560);
    state.orbs = state.orbs.filter(item => item.y < 560);
    state.score += dt * 2;
}

function updatePinball(dt) {
    const state = gameState;
    state.paddle += ((heldKeys.has('arrowleft') ? -300 : 0) + (heldKeys.has('arrowright') ? 300 : 0)) * dt;
    state.paddle = clamp(state.paddle, 120, 840);
    if (!state.launched) return;
    const ball = state.ball;
    ball.vy += 520 * dt;
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    if (ball.x < 48 || ball.x > 912) ball.vx *= -1;
    if (ball.y < 34) ball.vy = Math.abs(ball.vy);
    state.bumpers.forEach(bumper => {
        const dx = ball.x - bumper.x, dy = ball.y - bumper.y;
        const distance = Math.hypot(dx, dy);
        if (distance < bumper.r + 14) {
            const angle = Math.atan2(dy, dx);
            ball.vx = Math.cos(angle) * 300;
            ball.vy = Math.sin(angle) * 300;
            state.score += 100;
        }
    });
    if (ball.y > 452 && ball.y < 490 && Math.abs(ball.x - state.paddle) < 94 && ball.vy > 0) {
        ball.vy = -Math.abs(ball.vy) - 100;
        ball.vx += (ball.x - state.paddle) * 2;
        state.score += 25;
    }
    if (ball.y > 560) {
        state.lives -= 1;
        if (state.lives <= 0) finishGame(false, 'Tüm toplarını kullandın.');
        else { Object.assign(ball, { x: 480, y: 390, vx: 175 * (Math.random() < 0.5 ? -1 : 1), vy: -30 }); state.launched = false; }
    }
}

function fireBullet() {
    if (!gameState || gameState.done || gameState.fireCooldown > 0) return;
    gameState.bullets.push({ x: gameState.player.x, y: gameState.player.y - 24 });
    gameState.fireCooldown = 0.18;
}

function updateShooter(dt) {
    const state = gameState;
    const player = state.player;
    player.x += ((heldKeys.has('arrowright') || heldKeys.has('d') ? 1 : 0) - (heldKeys.has('arrowleft') || heldKeys.has('a') ? 1 : 0)) * 360 * dt;
    player.y += ((heldKeys.has('arrowdown') || heldKeys.has('s') ? 1 : 0) - (heldKeys.has('arrowup') || heldKeys.has('w') ? 1 : 0)) * 300 * dt;
    player.x = clamp(player.x, 40, 920);
    player.y = clamp(player.y, 250, 500);
    state.fireCooldown -= dt;
    if (heldKeys.has(' ') || heldKeys.has('f')) fireBullet();
    state.spawn -= dt;
    if (state.spawn <= 0) {
        state.enemies.push({ x: 60 + Math.random() * 840, y: -20, vx: (Math.random() - 0.5) * 100 });
        state.spawn = Math.max(0.35, 0.95 - state.elapsed * 0.006);
    }
    state.bullets.forEach(bullet => { bullet.y -= 480 * dt; });
    state.enemies.forEach(enemy => { enemy.y += (100 + state.elapsed * 2) * dt; enemy.x += enemy.vx * dt; });
    state.bullets = state.bullets.filter(bullet => bullet.y > -20);
    state.enemies = state.enemies.filter(enemy => {
        const hitIndex = state.bullets.findIndex(bullet => Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < 30);
        if (hitIndex >= 0) { state.bullets.splice(hitIndex, 1); state.kills += 1; state.score += 100; }
        if (Math.hypot(player.x - enemy.x, player.y - enemy.y) < 34) { state.hp -= 1; enemy.y = 600; if (state.hp <= 0) finishGame(false, 'Geminin kalkanı tükendi.'); }
        return enemy.y < 560;
    });
    if (state.kills >= 20) finishGame(true, 'Düşman filosunu temizledin.');
}

function updateDrift(dt) {
    const state = gameState;
    const move = (heldKeys.has('arrowright') || heldKeys.has('d') ? 1 : 0) - (heldKeys.has('arrowleft') || heldKeys.has('a') ? 1 : 0);
    state.player = clamp(state.player + move * 380 * dt, 260, 700);
    state.roadShift = Math.sin(state.elapsed * 0.75) * 70;
    state.spawn -= dt;
    if (state.spawn <= 0) {
        (Math.random() < 0.22 ? state.fuel : state.obstacles).push({ x: 320 + Math.random() * 320, y: -50 });
        state.spawn = Math.max(0.48, 1 - state.elapsed * 0.009);
    }
    const speed = 220 + state.elapsed * 2.5;
    state.obstacles.forEach(item => { item.y += speed * dt; if (item.y > 410 && item.y < 488 && Math.abs(item.x + state.roadShift - state.player) < 38) { item.y = 600; state.crashes += 1; if (state.crashes >= 3) finishGame(false, 'Üç kez trafiğe çarptın.'); } });
    state.fuel.forEach(item => { item.y += speed * dt; if (item.y > 410 && item.y < 488 && Math.abs(item.x + state.roadShift - state.player) < 40) { item.y = 600; state.score += 100; } });
    state.obstacles = state.obstacles.filter(item => item.y < 570);
    state.fuel = state.fuel.filter(item => item.y < 570);
    state.score += dt * 3;
}

function updateGravity(dt) {
    gameState.gravityPulse = (gameState.gravityPulse || 0) + dt;
    if (gameState.gravityPulse > 0.12) {
        const nextY = gameState.player.y + gameState.gravity;
        if (nextY >= 0 && nextY <= 5 && !gameState.walls.has(`${gameState.player.x},${nextY}`)) gameState.player.y = nextY;
        gameState.gravityPulse = 0;
        collectGravityStar();
        checkGravityWin();
    }
}

function updateMatch(dt) {
    if (gameState.elapsed >= gameState.timeLimit && gameState.score < 400) finishGame(false, 'Süre doldu.');
}

function drawGame(now) {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#080d13';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    if (!gameState) return drawIntro(context);
    context.save();
    context.fillStyle = '#0c141b';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    switch (activeGame.type) {
        case 'rhythm': drawRhythm(context); break;
        case 'sliding': drawSliding(context); break;
        case 'dash': drawDash(context); break;
        case 'dungeon': drawDungeon(context); break;
        case 'pinball': drawPinball(context); break;
        case 'shooter': drawShooter(context, now); break;
        case 'merge': drawMerge(context); break;
        case 'drift': drawDrift(context); break;
        case 'gravity': drawGravity(context); break;
        case 'match': drawMatch(context); break;
    }
    context.restore();
}

function drawIntro(ctx) {
    ctx.fillStyle = '#0c131a'; ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#55cf72'; ctx.font = '700 18px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(activeGame ? activeGame.controls : 'Bir oyun seç', canvasWidth / 2, canvasHeight / 2);
}

function drawRhythm(ctx) {
    const labels = ['A', 'S', 'D', 'F'];
    for (let lane = 0; lane < 4; lane += 1) {
        const x = 250 + lane * 115;
        ctx.fillStyle = lane % 2 ? '#14202a' : '#101b25'; ctx.fillRect(x, 35, 88, 470);
        ctx.strokeStyle = '#55cf72'; ctx.globalAlpha = 0.7; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + 44, 440, 27, 0, Math.PI * 2); ctx.stroke(); ctx.globalAlpha = 1;
        ctx.fillStyle = '#a9a5b9'; ctx.font = '700 16px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(labels[lane], x + 44, 490);
    }
    gameState.notes.forEach(note => { if (!note.hit) { ctx.fillStyle = ['#f1cc42', '#55cf72', '#a9d46a', '#e7d77a'][note.lane]; ctx.beginPath(); ctx.arc(294 + note.lane * 115, note.y, 18, 0, Math.PI * 2); ctx.fill(); } });
    ctx.fillStyle = '#ddd9ea'; ctx.font = '16px sans-serif'; ctx.fillText(`İsabet ${gameState.hits}   Kaçan ${gameState.misses}`, 480, 30);
}

function drawSliding(ctx) {
    ctx.fillStyle = '#ddd9ea'; ctx.font = '18px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(`Hamle: ${gameState.moves}`, 480, 34);
    gameState.tiles.forEach((value, index) => {
        const x = 240 + index % 4 * 120, y = 60 + Math.floor(index / 4) * 120;
        ctx.fillStyle = value ? '#1c2b34' : '#080d13'; ctx.fillRect(x + 4, y + 4, 112, 112);
        if (value) { ctx.fillStyle = '#55cf72'; ctx.font = '700 32px sans-serif'; ctx.fillText(value, x + 60, y + 71); }
    });
}

function drawDash(ctx) {
    ctx.fillStyle = '#101b23'; ctx.fillRect(270, 0, 420, canvasHeight);
    for (let lane = 1; lane < 3; lane += 1) { ctx.setLineDash([22, 20]); ctx.strokeStyle = '#555164'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(270 + lane * 140, 0); ctx.lineTo(270 + lane * 140, 540); ctx.stroke(); }
    ctx.setLineDash([]);
    gameState.obstacles.forEach(item => { ctx.fillStyle = '#d08b2b'; ctx.fillRect(294 + item.lane * 140, item.y, 92, 28); });
    gameState.orbs.forEach(item => { ctx.fillStyle = '#f7d469'; ctx.beginPath(); ctx.arc(340 + item.lane * 140, item.y, 12, 0, Math.PI * 2); ctx.fill(); });
    const x = 340 + gameState.lane * 140;
    ctx.fillStyle = '#64d8ee'; ctx.beginPath(); ctx.moveTo(x, 400); ctx.lineTo(x - 30, 458); ctx.lineTo(x + 30, 458); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#c4bfd4'; ctx.font = '15px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ŞERİT DEĞİŞTİR • ENGELLERDEN KAÇ', 480, 30);
}

function drawDungeon(ctx) {
    const size = 56, ox = 228, oy = 90;
    for (let y = 0; y < 6; y += 1) for (let x = 0; x < 9; x += 1) {
        ctx.fillStyle = gameState.walls.has(`${x},${y}`) ? '#34444b' : '#111b22'; ctx.fillRect(ox + x * size + 2, oy + y * size + 2, size - 4, size - 4);
    }
    if (!gameState.key) drawEmoji(ctx, '🗝️', ox + gameState.keyAt.x * size + 28, oy + gameState.keyAt.y * size + 36, 28);
    drawEmoji(ctx, '🚪', ox + gameState.exit.x * size + 28, oy + gameState.exit.y * size + 36, 30);
    gameState.enemies.forEach(enemy => drawEmoji(ctx, '👾', ox + enemy.x * size + 28, oy + enemy.y * size + 36, 28));
    drawEmoji(ctx, '🧑‍🚀', ox + gameState.player.x * size + 28, oy + gameState.player.y * size + 36, 30);
    ctx.fillStyle = '#f5e7a5'; ctx.font = '18px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(`Can ${'♥'.repeat(gameState.hp)}   ${gameState.key ? 'Anahtar sende' : 'Anahtar: ?'}`, 480, 52);
}

function drawPinball(ctx) {
    ctx.strokeStyle = '#615d74'; ctx.lineWidth = 8; ctx.strokeRect(44, 22, 872, 496);
    gameState.bumpers.forEach((bumper, index) => { ctx.fillStyle = ['#f1cc42', '#55cf72', '#a9d46a'][index]; ctx.beginPath(); ctx.arc(bumper.x, bumper.y, bumper.r, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#fff2'; ctx.lineWidth = 5; ctx.stroke(); });
    ctx.fillStyle = '#e6e1ef'; ctx.fillRect(gameState.paddle - 76, 462, 152, 15);
    ctx.fillStyle = '#fcfafc'; ctx.beginPath(); ctx.arc(gameState.ball.x, gameState.ball.y, 13, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ddd9ea'; ctx.font = '18px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(`Top: ${gameState.lives}`, 64, 52);
    if (!gameState.launched) { ctx.textAlign = 'center'; ctx.fillText('Boşluk veya dokun: topu fırlat', 480, 420); }
}

function drawShooter(ctx, now) {
    ctx.fillStyle = '#252333'; ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < 60; i += 1) { ctx.fillStyle = '#ffffff66'; ctx.fillRect((i * 173) % canvasWidth, (i * 97 + now * 0.025) % canvasHeight, 2, 2); }
    gameState.bullets.forEach(bullet => { ctx.fillStyle = '#ffe287'; ctx.fillRect(bullet.x - 3, bullet.y, 6, 18); });
    gameState.enemies.forEach(enemy => drawEmoji(ctx, '☄️', enemy.x, enemy.y, 30));
    drawEmoji(ctx, '🚀', gameState.player.x, gameState.player.y, 38);
    ctx.fillStyle = '#e5e1ef'; ctx.font = '16px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(`Kalkan: ${'♥'.repeat(gameState.hp)}`, 30, 34);
}

function drawMerge(ctx) {
    ctx.fillStyle = '#2a2736'; ctx.fillRect(238, 58, 484, 484);
    gameState.board.forEach((value, index) => {
        const x = 246 + index % 4 * 118, y = 66 + Math.floor(index / 4) * 118;
        ctx.fillStyle = value ? mergeColor(value) : '#191722'; ctx.fillRect(x, y, 108, 108);
        if (value) { ctx.fillStyle = value > 32 ? '#191722' : '#e9e5f1'; ctx.font = `700 ${value > 99 ? 27 : 34}px sans-serif`; ctx.textAlign = 'center'; ctx.fillText(value, x + 54, y + 65); }
    });
}

function drawDrift(ctx) {
    const road = 280 + gameState.roadShift;
    ctx.fillStyle = '#26322e'; ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#252333'; ctx.beginPath(); ctx.moveTo(road, 0); ctx.lineTo(road + 400, 0); ctx.lineTo(road + 490, 540); ctx.lineTo(road - 90, 540); ctx.closePath(); ctx.fill();
    ctx.setLineDash([35, 30]); ctx.strokeStyle = '#d8d2bc'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(road + 200, 0); ctx.lineTo(road + 200, 540); ctx.stroke(); ctx.setLineDash([]);
    gameState.obstacles.forEach(item => drawEmoji(ctx, '🚙', item.x + gameState.roadShift, item.y, 36));
    gameState.fuel.forEach(item => drawEmoji(ctx, '🔋', item.x + gameState.roadShift, item.y, 26));
    drawEmoji(ctx, '🏎️', gameState.player, 450, 42);
    ctx.fillStyle = '#ddd9ea'; ctx.font = '16px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(`Çarpışma: ${gameState.crashes}/3`, 24, 32);
}

function drawGravity(ctx) {
    const size = 58, ox = 219, oy = 82;
    for (let y = 0; y < 6; y += 1) for (let x = 0; x < 9; x += 1) {
        ctx.fillStyle = gameState.walls.has(`${x},${y}`) ? '#5b526c' : '#262432'; ctx.fillRect(ox + x * size + 2, oy + y * size + 2, size - 4, size - 4);
    }
    gameState.stars.forEach(key => { const [x, y] = key.split(',').map(Number); drawEmoji(ctx, '⭐', ox + x * size + size / 2, oy + y * size + size / 2, 24); });
    drawEmoji(ctx, '🚪', ox + gameState.exit.x * size + size / 2, oy + gameState.exit.y * size + size / 2, 30);
    drawEmoji(ctx, '🧑‍🚀', ox + gameState.player.x * size + size / 2, oy + gameState.player.y * size + size / 2, 30);
    ctx.fillStyle = '#e5e1ef'; ctx.font = '18px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(`Yerçekimi: ${gameState.gravity > 0 ? '↓' : '↑'}     Kalan yıldız: ${gameState.stars.size}`, 480, 42);
}

function drawMatch(ctx) {
    const symbols = ['🧋', '🍓', '🫐', '🍋', '🍡'];
    gameState.board.forEach((value, index) => {
        const x = 194 + index % 8 * 72, y = 28 + Math.floor(index / 8) * 62;
        ctx.fillStyle = index === gameState.selected ? '#56506d' : '#272534'; ctx.fillRect(x + 2, y + 2, 68, 58);
        drawEmoji(ctx, symbols[value], x + 36, y + 32, 28);
    });
    ctx.fillStyle = '#e5e1ef'; ctx.font = '17px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('İki komşu taşı seçerek yer değiştir', 480, 530);
}

function drawEmoji(ctx, emoji, x, y, size) {
    ctx.font = `${size}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(emoji, x, y); ctx.textBaseline = 'alphabetic';
}

function mergeColor(value) {
    return ({ 2: '#344b40', 4: '#426c43', 8: '#56884b', 16: '#78a84f', 32: '#a0bf4f', 64: '#c5b544', 128: '#d5a83b', 256: '#edcd4c' })[value] || '#a8cf64';
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function renderLocalLeaderboard() {
    const root = document.getElementById('leaderboard-scores');
    if (!root) return;
    const scores = readBestScores();
    const rows = arcadeGames.map(game => ({ ...game, score: scores[game.id] || 0 })).filter(game => game.score > 0).sort((a, b) => b.score - a.score);
    root.innerHTML = `<h2 class="arcade-kicker">SENİN REKORLARIN</h2>${rows.length ? rows.map((game, index) => `<div class="local-score-row"><span>#${index + 1} ${game.title}</span><strong>${game.score.toLocaleString('tr-TR')}</strong></div>`).join('') : '<p>Henüz kayıtlı skorun yok. Bir oyun başlatıp ilk rekorunu oluştur.</p>'}`;
}

document.addEventListener('DOMContentLoaded', bootPlayora);