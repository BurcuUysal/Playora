import express from 'express';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT) || 3000;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scoresFile = path.join(root, 'data', 'scores.json');
const gameTitles = {
    hyperpulse: 'HyperPulse 2084',
    chrono: 'Chrono Rift',
    vapor: 'Vapor Dash',
    dungeon: 'Pixel Dungeon Crawler',
    pinball: 'Cosmic Pinball DX',
    aether: 'Aether Strike',
    zen: 'Zen Matrix',
    neon: 'Neon Overdrive',
    gravity: 'Gravity Flip Tactics',
    boba: 'Boba Blast Rush'
};

app.use(express.json({ limit: '16kb' }));

async function readScores() {
    try {
        return JSON.parse(await readFile(scoresFile, 'utf8'));
    } catch (error) {
        if (error.code === 'ENOENT') return {};
        throw error;
    }
}

app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});

app.get('/api/scores', async (_request, response, next) => {
    try {
        const scores = await readScores();
        response.json(Object.values(scores).sort((left, right) => right.score - left.score));
    } catch (error) {
        next(error);
    }
});

app.post('/api/scores', async (request, response, next) => {
    try {
        const { gameId, score } = request.body ?? {};
        if (!Object.hasOwn(gameTitles, gameId) || !Number.isSafeInteger(score) || score < 0) {
            return response.status(400).json({ error: 'Geçerli bir oyun ve skor gerekli.' });
        }

        const scores = await readScores();
        const previous = scores[gameId]?.score ?? 0;
        const best = Math.max(previous, score);
        scores[gameId] = {
            gameId,
            title: gameTitles[gameId],
            score: best,
            updatedAt: new Date().toISOString()
        };

        await mkdir(path.dirname(scoresFile), { recursive: true });
        const temporaryFile = `${scoresFile}.tmp`;
        await writeFile(temporaryFile, `${JSON.stringify(scores, null, 2)}\n`);
        await rename(temporaryFile, scoresFile);
        response.status(201).json(scores[gameId]);
    } catch (error) {
        next(error);
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(root, 'dist')));
    app.use((_request, response) => response.sendFile(path.join(root, 'dist', 'index.html')));
}

app.listen(port, () => {
    console.log(`PLAYORA Node API listening on http://localhost:${port}`);
});
