// Gravity Flip Oyun Motoru (js/games/gravity.js)
export function initGravityGame(canvasElement) {
    const ctx = canvasElement.getContext('2d');
    let score = 0;
    let highscore = 0;
    let isPlaying = true;
    let gravity = 0.6;

    const player = {
        x: 100,
        y: canvasElement.height / 2,
        size: 24,
        vy: 0,
        color: '#4cd7f6'
    };

    let obstacles = [];
    let particles = [];
    let frameCount = 0;

    function toggleGravity() {
        gravity = -gravity;
        player.vy = gravity * 6;
        for(let i = 0; i < 8; i++) {
            particles.push({
                x: player.x,
                y: player.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                color: '#d0bcff',
                life: 20
            });
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleGravity();
        }
    });

    canvasElement.addEventListener('click', () => {
        toggleGravity();
    });

    function spawnObstacle() {
        const height = 80 + Math.random() * 100;
        const isTop = Math.random() > 0.5;
        obstacles.push({
            x: canvasElement.width,
            y: isTop ? 0 : canvasElement.height - height,
            w: 35,
            h: height,
            color: '#f751a1'
        });
    }

    function update() {
        if (!isPlaying) return;

        frameCount++;
        score += 1;

        if (frameCount % 90 === 0) {
            spawnObstacle();
        }

        player.vy += gravity;
        player.y += player.vy;

        if (player.y < 0 || player.y > canvasElement.height) {
            isPlaying = false;
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].x -= 4.5;

            if (
                player.x < obstacles[i].x + obstacles[i].w &&
                player.x + player.size > obstacles[i].x &&
                player.y < obstacles[i].y + obstacles[i].h &&
                player.y + player.size > obstacles[i].y
            ) {
                isPlaying = false;
            }

            if (obstacles[i].x + obstacles[i].w < 0) {
                obstacles.splice(i, 1);
            }
        }
    }

    function draw() {
        ctx.fillStyle = '#0f0c19';
        ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

        // Oyuncu
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.arc(player.x + player.size/2, player.y + player.size/2, player.size/2, 0, Math.PI * 2);
        ctx.fill();

        // Engeller
        obstacles.forEach(obs => {
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        });
    }

    function loop() {
        if (!isPlaying) return;
        update();
        draw();
        requestAnimationFrame(loop);
    }

    loop();
}