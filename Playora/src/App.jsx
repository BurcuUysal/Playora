import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { arcadeGames, bootPlayora, createGameArtwork, unmountGamePage } from '../js/app.js';

function Header() {
    return (
        <header className="site-header">
            <Link className="brand" to="/" aria-label="Playora ana sayfa">
                <span className="brand-icon material-symbols-outlined">sports_esports</span>
                <span><strong>PLAYORA</strong><small>Bir oyun seç. Kendinin yap.</small></span>
            </Link>
            <nav className="site-nav" aria-label="Ana gezinme">
                <Link to="/">Ana Sayfa</Link>
                <Link to="/games">Oyunlar</Link>
                <Link to="/leaderboard">Lider Tablosu</Link>
                <Link to="/profile">Profil</Link>
            </nav>
            <Link className="button button-primary header-play" to="/games">
                <span className="material-symbols-outlined">sports_esports</span> Hemen oyna
            </Link>
        </header>
    );
}

function PageFrame({ children }) {
    return (
        <>
            <Header />
            {children}
            <footer className="site-footer">PLAYORA ARCADE <span>Tarayıcıda oyna. Rekorunu geliştir.</span></footer>
        </>
    );
}

function GameCard({ game }) {
    return (
        <article className="game-card" data-title={game.title.toLowerCase()}>
            <Link className="game-art-link" to={`/detail?game=${game.id}`} aria-label={`${game.title} oyun detayını aç`}>
                <img className="game-art" src={createGameArtwork(game.id)} alt={`${game.title} oyun kapağı`} />
                <span className="game-art-overlay"><span>{game.category || game.type}</span><strong>{game.title}</strong></span>
            </Link>
            <div className="game-card-info">
                <p>{game.description}</p>
                <div><span>{game.goal}</span><Link to={`/detail?game=${game.id}`}>Oyna <span aria-hidden="true">↗</span></Link></div>
            </div>
        </article>
    );
}

function HomePage() {
    return (
        <main>
            <section className="home-hero">
                <div className="home-copy">
                    <span className="eyebrow"><i /> SEZON 03 · PLAYORA ARCADE</span>
                    <h1>Bir oyun seç.<br /><span>Akışa kapıl.</span></h1>
                    <p>Hızlı turlar, net hedefler, yeni rekorlar. İndirmeden oyna ve en sevdiğin mücadeleye geri dön.</p>
                    <div className="hero-actions">
                        <Link className="button button-primary" to="/games">Oyunlara göz at <span aria-hidden="true">↗</span></Link>
                        <Link className="button button-quiet" to={`/detail?game=${arcadeGames[0].id}`}>Hızlı başlat</Link>
                    </div>
                    <div className="hero-meta"><strong>10</strong><span>oynanabilir mini oyun</span><i /> <span>Ücretsiz · Tarayıcıda</span></div>
                </div>
                <Link className="feature-art" to={`/detail?game=${arcadeGames[0].id}`}>
                    <img src={createGameArtwork('hyperpulse')} alt="HyperPulse 2084 ritim oyunu için özgün neon şerit illüstrasyonu" />
                    <div className="feature-copy"><span>ÖNE ÇIKAN · RİTİM</span><h2>HyperPulse 2084</h2><p>Ritmi yakala. Zinciri bozma.</p></div>
                    <span className="feature-play material-symbols-outlined" aria-hidden="true">play_arrow</span>
                </Link>
            </section>
            <section className="content-section">
                <div className="section-heading"><div><span className="eyebrow">BUGÜNÜN SEÇKİSİ</span><h2>Hemen oyna</h2></div><Link to="/games">Tüm oyunlar <span aria-hidden="true">↗</span></Link></div>
                <div className="game-grid featured-grid">{arcadeGames.slice(0, 3).map(game => <GameCard game={game} key={game.id} />)}</div>
            </section>
        </main>
    );
}

function GamesPage() {
    useEffect(() => { bootPlayora(); }, []);
    return (
        <main className="page-main">
            <section className="page-heading"><span className="eyebrow"><i /> OYUN KÜTÜPHANESİ</span><h1>Oyun kasası</h1><p>Bir mod seç, oyuna gir. Her tur yeni bir rekor fırsatı.</p></section>
            <div className="game-grid">{arcadeGames.map(game => <GameCard game={game} key={game.id} />)}</div>
        </main>
    );
}

function GameDetailPage() {
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get('game') || arcadeGames[0].id;
    const game = arcadeGames.find(item => item.id === gameId) || arcadeGames[0];

    useEffect(() => {
        bootPlayora();
        return () => unmountGamePage();
    }, [game.id]);

    return (
        <main className="page-main game-detail-main">
            <Link className="back-link" to="/games">← Oyun kasasına dön</Link>
            <section className="detail-hero bg-cover">
                <div className="detail-shade" />
                <div className="detail-copy">
                    <span className="eyebrow">{game.type.toUpperCase()} · PLAYORA ORIGINAL</span>
                    <h1>{game.title}</h1>
                    <p>{game.description}</p>
                    <button className="button button-primary" id="launch-btn" type="button"><span className="material-symbols-outlined">play_arrow</span> Oyunu başlat</button>
                </div>
            </section>
        </main>
    );
}

function useScores() {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let current = true;
        fetch('/api/scores')
            .then(response => response.ok ? response.json() : [])
            .then(value => { if (current) setScores(value); })
            .catch(() => { if (current) setScores([]); })
            .finally(() => { if (current) setLoading(false); });
        return () => { current = false; };
    }, []);
    return { scores, loading };
}

function LeaderboardPage() {
    const { scores, loading } = useScores();
    return (
        <main className="page-main">
            <section className="page-heading"><span className="eyebrow">KİŞİSEL REKORLAR</span><h1>Lider tablosu</h1><p>Her oyundaki en yüksek skorların.</p></section>
            <section className="score-table" aria-live="polite">
                <div className="score-table-head"><span>OYUN</span><span>EN İYİ SKOR</span></div>
                {loading ? <p className="empty-state">Skorlar yükleniyor...</p> : scores.length ? scores.map((entry, index) => (
                    <div className="score-row" key={entry.gameId}><span className="score-rank">{String(index + 1).padStart(2, '0')}</span><span className="score-game">{entry.title}</span><strong>{entry.score.toLocaleString('tr-TR')}</strong></div>
                )) : <p className="empty-state">Henüz skor kaydı yok. İlk oyunu bitirip tabloya adını yazdır.</p>}
            </section>
        </main>
    );
}

function ProfilePage() {
    const { scores, loading } = useScores();
    const total = scores.reduce((sum, entry) => sum + entry.score, 0);
    return (
        <main className="page-main profile-main">
            <section className="profile-heading"><div className="profile-avatar">P</div><div><span className="eyebrow">OYUNCU KARTI</span><h1>Playora oyuncusu</h1><p>Rekorların bu tarayıcıda saklanır ve Node sunucusuna kaydedilir.</p></div></section>
            <section className="profile-stats"><div><span>KAYITLI REKOR</span><strong>{loading ? '...' : scores.length}</strong></div><div><span>TOPLAM SKOR</span><strong>{loading ? '...' : total.toLocaleString('tr-TR')}</strong></div><div><span>OYUN HAVUZU</span><strong>{arcadeGames.length}</strong></div></section>
            <Link className="button button-primary" to="/games">Oyunlara dön <span aria-hidden="true">↗</span></Link>
        </main>
    );
}

export default function App() {
    return (
        <PageFrame>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/detail" element={<GameDetailPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </PageFrame>
    );
}
