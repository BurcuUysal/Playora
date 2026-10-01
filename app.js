// PLAYORA - Ana Uygulama ve Oyun Motorları Katmanı

// 10 Özgün Oyun Verisi
const gamesData = [
    { id: 'gravity', title: 'Gravity Flip', cat: 'Arcade', diff: 'Orta', desc: 'Yerçekimini ters çevir, uzay engellerini atlat!', icon: '🪐', score: localStorage.getItem('playora_gravity_score') || 840 },
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

// Sayfalar Arası Geçiş Motoru
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
    } else if (page.startsWith('play-')) {
        const gameId = page.split('-')[1];
        if (gameId === 'gravity') {
            app.innerHTML = renderGravityFlipGame();
            initGravityFlip();
        } else {
            alert('Bu oyunun motoru sıradaki adımda ekleniyor! Şimdilik Gravity Flip ile test edebilirsin.');
            switchPage('detail-' + gameId);
        }
    }
}

// --- RENDER: ANA SAYFA ---
function renderHome() {
    return `
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-indigo-950/30 border border-purple-500/20 p-8 md:p-12 mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div class="max-w-lg">
                <span class="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">Yeni Nesil Arcade Platformu</span>
                <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">Pick a game.<br><span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Make it yours.</span></h1>
                <p class="text-slate-400 text-sm md:text-base mb-8">Ten original mini games. One place to play. Hızlı eğlence anları için tasarlanmış tamamen özgün oyunları keşfet.</p>
                <div class="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                    <button onclick="switchPage('games')" class="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-purple-600/30 transition hover:scale-105 active:scale-95">PLAY NOW</button>
                    <button onclick="switchPage('games')" class="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-semibold px-6 py-3.5 rounded-2xl border border-slate-700 transition">Explore Games</button>
                </div>
            </div>
            <div class="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-tr from-purple-600/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center text-7xl shadow-2xl animate-pulse">
                🕹️
            </div>
        </div>

        <div class="mb-12">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-bold">What are you playing today?</h2>
                <button onclick="switchPage('games')" class="text-sm text-purple-400 hover:underline">Tümünü Gör →</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                ${gamesData.slice(0, 3).map(g => `
                    <div onclick="switchPage('detail-${g.id}')" class="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 hover:border-purple-500/40 transition cursor-pointer group flex flex-col justify-between shadow-lg">
                        <div>
                            <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">${g.icon}</div>
                            <span class="text-xs font-semibold text-purple-400 uppercase tracking-wider">${g.cat}</span>
                            <h3 class="text-lg font-bold mt-1 mb-2">${g.title}</h3>
                            <p class="text-slate-400 text-xs mb-4 line-clamp-2">${g.desc}</p>
                        </div>
                        <div class="flex items-center justify-between pt-3 border-t border-slate-800/80">
                            <span class="text-xs text-slate-500">Zorluk: <strong class="text-slate-300">${g.diff}</strong></span>
                            <span class="text-xs font-bold text-purple-400 group-hover:translate-x-1 transition">Oyna →</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// --- RENDER: OYUNLAR SAYFASI ---
function renderGames() {
    return `
        <div class="mb-8">
            <h1 class="text-3xl font-black mb-2">Choose Your Game</h1>
            <p class="text-slate-400 text-sm">Pick your favorite challenge and start playing.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            ${gamesData.map(g => `
                <div onclick="switchPage('detail-${g.id}')" class="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 hover:border-purple-500/40 transition cursor-pointer group flex flex-col justify-between shadow-lg">
                    <div>
                        <div class="flex items-start justify-between mb-4">
                            <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition">${g.icon}</div>
                            <span class="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-purple-300 border border-slate-700">${g.cat}</span>
                        </div>
                        <h3 class="text-lg font-bold mb-1">${g.title}</h3>
                        <p class="text-slate-400 text-xs mb-4">${g.desc}</p>
                    </div>
                    <div class="flex items-center justify-between pt-3 border-t border-slate-800/80">
                        <span class="text-xs text-slate-500">En İyi: <strong class="text-amber-400">${g.score}</strong></span>
                        <span class="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition">Oyna</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// --- RENDER: OYUN DETAY SAYFASI ---
function renderGameDetail(id) {
    const game = gamesData.find(g => g.id === id) || gamesData[0];
    return `
        <div class="max-w-2xl mx-auto bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl">
            <button onclick="switchPage('games')" class="text-xs text-slate-400 hover:text-white mb-6 flex items-center gap-1 transition">← Oyunlara Dön</button>
            
            <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-4xl shadow-inner">${game.icon}</div>
                <div>
                    <span class="text-xs font-semibold text-purple-400 uppercase tracking-wide">${game.cat} • Zorluk: ${game.diff}</span>
                    <h1 class="text-2xl md:text-3xl font-black">${game.title}</h1>
                </div>
            </div>

            <p class="text-slate-300 text-sm mb-6 leading-relaxed">${game.desc} Ekrana dokunarak veya tıklayarak karakterin yerçekimini yönet, engellerden kaç ve yıldızları topla!</p>

            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6 flex items-center justify-between shadow-inner">
                <div>
                    <span class="text-xs text-slate-500 block">Kişisel En İyi Skor</span>
                    <span class="text-xl font-bold text-amber-400">${game.score} Puan</span>
                </div>
                <div class="text-right">
                    <span class="text-xs text-slate-500 block">Durum</span>
                    <span class="text-xs font-semibold text-emerald-400">Oynanabilir 🚀</span>
                </div>
            </div>

            <div class="flex gap-4">
                <button onclick="switchPage('play-${game.id}')" class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-600/30 transition text-center hover:scale-[1.02] active:scale-[0.98]">PLAY NOW</button>
                <button onclick="switchPage('games')" class="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-6 py-3.5 rounded-xl transition">Geri</button>
            </div>
        </div>
    `;
}

// --- OYUN 1: GRAVITY FLIP İNTERAKTİF MOTORU ---
function renderGravityFlipGame() {
    return `
        <div class="max-w-md mx-auto bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-2xl text-center relative overflow-hidden select-none">
            <!-- Üst Bilgi Barı -->
            <div class="flex justify-between items-center mb-4 px-2">
                <button onclick="switchPage('games')" class="text-xs text-slate-400 hover:text-white">✕ Çıkış</button>
                <div class="flex gap-4 text-xs font-mono">
                    <div>Skor: <span id="gf-score" class="text-purple-400 font-bold">0</span></div>
                    <div>Yıldız: <span id="gf-stars" class="text-amber-400 font-bold">⭐ 0</span></div>
                </div>
            </div>

            <!-- Oyun Alanı (Canvas veya Alan) -->
            <div id="gf-canvas-container" class="relative w-full h-80 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 mb-4 cursor-pointer flex items-center justify-center shadow-inner">
                <div id="gf-instruction" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 z-10 p-4">
                    <span class="text-4xl mb-2">🪐</span>
                    <h3 class="text-lg font-black mb-1">Gravity Flip</h3>
                    <p class="text-slate-400 text-xs mb-4">Yerçekimini değiştirmek için ekrana tıkla!</p>
                    <button onclick="startGravityGame()" class="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-lg shadow-purple-600/30">Oyunu Başlat</button>
                </div>

                <!-- Karakter -->
                <div id="gf-player" class="absolute left-10 w-8 h-8 bg-purple-500 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all duration-75 flex items-center justify-center text-sm">🚀</div>
                
                <!-- Engel ve Yıldızların Üreteceği Alan -->
                <div id="gf-obstacles-area" class="absolute inset-0 pointer-events-none"></div>
            </div>

            <p class="text-[11px] text-slate-500">💡 İpucu: Boşluğa tıklayarak yer/tavan değiştirebilirsin.</p>
        </div>
    `;
}

// Gravity Flip Oyun Mantığı
let gfInterval, gfGameLoop;
function startGravityGame() {
    document.getElementById('gf-instruction').style.display = 'none';
    
    let score = 0;
    let stars = 0;
    let isGravityTop = false;
    let playerY = 220; // Başlangıç taban konumu
    const player = document.getElementById('gf-player');
    const scoreEl = document.getElementById('gf-score');
    const starsEl = document.getElementById('gf-stars');
    const container = document.getElementById('gf-canvas-container');

    // Tıklama ile yerçekimi değiştirme
    container.onclick = () => {
        isGravityTop = !isGravityTop;
        player.style.top = isGravityTop ? '20px' : '220px';
    };

    // Oyun döngüsü (Skor ve engeller)
    gfGameLoop = setInterval(() => {
        score += 10;
        scoreEl.textContent = score;

        // Rastgele yıldız/engel üretimi simülasyonu
        if (Math.random() < 0.25) {
            stars++;
            starsEl.textContent = '⭐ ' + stars;
        }

        // Skor 300 olunca kazanma veya hızlanma simülasyonu
        if (score >= 300) {
            clearInterval(gfGameLoop);
            endGravityGame(score, stars, true);
        }
    }, 400);
}

function endGravityGame(score, stars, isWin) {
    clearInterval(gfGameLoop);
    const container = document.getElementById('gf-canvas-container');
    
    // En yüksek skoru güncelle
    let best = localStorage.getItem('playora_gravity_score') || 0;
    if (score > best) {
        localStorage.setItem('playora_gravity_score', score);
    }

    container.innerHTML = `
        <div class="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 z-10 p-6 text-center animate-fade">
            <span class="text-3xl mb-1">${isWin ? '🎉' : '💥'}</span>
            <h3 class="text-xl font-black mb-1">${isWin ? 'NICE RUN!' : 'GRAVITY OVER!'}</h3>
            <p class="text-slate-400 text-xs mb-4">Final Skorun: <strong class="text-purple-400">${score}</strong></p>
            <div class="flex gap-3 w-full">
                <button onclick="switchPage('play-gravity')" class="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl text-xs transition">Yeniden Oyna</button>
                <button onclick="switchPage('games')" class="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs transition">Geri</button>
            </div>
        </div>
    `;
}

// --- RENDER: SKOR TABLOSU ---
function renderLeaderboard() {
    return `
        <div class="mb-8">
            <h1 class="text-3xl font-black mb-2">Top Players</h1>
            <p class="text-slate-400 text-sm">Global sıralama ve kişisel en iyi rekorların.</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 bg-slate-900/80 rounded-2xl p-5 border border-slate-800 shadow-xl">
                <h3 class="font-bold mb-4 text-sm text-purple-400">🏆 Global Liderler</h3>
                <div class="space-y-3">
                    ${[ {r:1, n:'Burcu', s:1420, g:'Potion Panic'}, {r:2, n:'Efe', s:1280, g:'Mirror Escape'}, {r:3, n:'Zeynep', s:1150, g:'Octo Grab'}, {r:4, n:'Kerem', s:1090, g:'Island Builder'} ].map(l => `
                        <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm">
                            <div class="flex items-center gap-3">
                                <span class="w-6 text-center font-bold text-xs ${l.r === 1 ? 'text-amber-400' : l.r === 2 ? 'text-slate-300' : 'text-amber-600'}">#${l.r}</span>
                                <span class="font-medium">${l.n}</span>
                            </div>
                            <div class="text-right">
                                <span class="font-bold text-purple-400">${l.s}</span>
                                <span class="text-[10px] text-slate-500 block">${l.g}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 shadow-xl">
                <h3 class="font-bold mb-4 text-sm text-amber-400">🎯 Your Best Scores</h3>
                <div class="space-y-2.5 text-xs">
                    ${gamesData.map(g => `
                        <div class="flex justify-between items-center py-2 border-b border-slate-800/50">
                            <span class="text-slate-400">${g.title}</span>
                            <strong class="text-slate-200">${g.score}</strong>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// --- RENDER: PROFİL SAYFASI ---
function renderProfile() {
    return `
        <div class="max-w-2xl mx-auto bg-slate-900/80 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl">
            <div class="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                <div class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-3xl font-black text-white shadow-lg">BU</div>
                <div>
                    <h1 class="text-2xl font-black">Burcu Uysal</h1>
                    <p class="text-purple-400 text-xs font-medium">Player • Seviye 14 Arcade Ustası</p>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-3 mb-6">
                <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center shadow-inner">
                    <span class="text-xs text-slate-500 block mb-1">Oynanan</span>
                    <span class="text-xl font-black text-purple-400">142</span>
                </div>
                <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center shadow-inner">
                    <span class="text-xs text-slate-500 block mb-1">Toplam Skor</span>
                    <span class="text-xl font-black text-amber-400">9,840</span>
                </div>
                <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center shadow-inner">
                    <span class="text-xs text-slate-500 block mb-1">Favori Oyun</span>
                    <span class="text-xs font-bold text-slate-200 mt-1 block truncate">Gravity Flip</span>
                </div>
            </div>

            <h3 class="font-bold text-sm mb-3 text-slate-300">🏆 Başarımlar</h3>
            <div class="grid grid-cols-2 gap-3 mb-6">
                <div class="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
                    <span class="text-2xl">🥇</span>
                    <div>
                        <h4 class="text-xs font-bold">First Game</h4>
                        <p class="text-[10px] text-slate-500">İlk oyununu başarıyla tamamladın.</p>
                    </div>
                </div>
                <div class="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
                    <span class="text-2xl">🔥</span>
                    <div>
                        <h4 class="text-xs font-bold">Arcade Master</h4>
                        <p class="text-[10px] text-slate-500">10 farklı oyunda rekor kırdın.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// İlk açılışta ana sayfayı yükle
switchPage('home');