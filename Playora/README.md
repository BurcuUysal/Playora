# PLAYORA

React tabanlı oyun arayüzü, Vite geliştirme sunucusu ve Express tabanlı Node.js skor API'si.

## Geliştirme

```bash
npm install
npm run dev
```

Vite arayüzü `http://localhost:5173`, Node API'si `http://localhost:3000` adresinde çalışır. `/api` istekleri Vite üzerinden API sunucusuna yönlendirilir.

## Üretim

```bash
npm run build
npm start
```

Üretim sunucusu React uygulamasını ve API'yi `http://localhost:3000` üzerinden sunar.

## API

- `GET /api/health`: servis durumu
- `GET /api/scores`: oyun başına en iyi skorlar
- `POST /api/scores`: `{ "gameId": "gravity", "score": 300 }` biçiminde skor kaydı

Skor kayıtları ilk skor gönderiminde `data/scores.json` dosyasına yazılır.
