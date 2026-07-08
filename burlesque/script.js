const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
addEventListener("resize", resize);
resize();

const particles = [];
let clicks = 0;

class Particle {
    constructor(x, y, vx, vy, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = life;
        this.max = life;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.02;
        this.life--;
    }

    draw() {
        ctx.globalAlpha = this.life / this.max;
        ctx.fillStyle = "#fff";
        ctx.fillRect(
            Math.round(this.x),
            Math.round(this.y),
            3,
            3
        );
        ctx.globalAlpha = 1;
    }
}

function burst(x, y, amount = 60, speed = 5) {
    for (let i = 0; i < amount; i++) {

        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * speed;

        particles.push(
            new Particle(
                x,
                y,
                Math.cos(a) * s,
                Math.sin(a) * s,
                40 + Math.random() * 25
            )
        );
    }
}

function firework(x, y) {

    let rocket = {
        x,
        y,
        vy: -8,
        exploded: false
    };

    function tick() {

        if (!rocket.exploded) {

            ctx.fillStyle = "#fff";
            ctx.fillRect(
                rocket.x,
                rocket.y,
                4,
                8
            );

            burst(
                rocket.x + 2,
                rocket.y + 8,
                2,
                0.5
            );

            rocket.y += rocket.vy;

            if (rocket.y < innerHeight * 0.3) {

                rocket.exploded = true;

                // BIG EXPLOSION
                burst(
                    rocket.x,
                    rocket.y,
                    400,
                    7
                );

                document.body.animate(
                    [
                        { transform: "translate(3px,2px)" },
                        { transform: "translate(-3px,-2px)" },
                        { transform: "translate(2px,-2px)" },
                        { transform: "translate(0,0)" }
                    ],
                    {
                        duration: 180
                    }
                );

                return;
            }

            requestAnimationFrame(tick);
        }

    }

    tick();
}

document.addEventListener("click", e => {

    // Ignore clicks on the album cover
    if (e.target.id === "cover") return;

    clicks++;

    if (clicks >= 10) {

        clicks = 0;

        firework(
            e.clientX,
            e.clientY
        );

    } else {

        // Bigger star burst
        burst(
            e.clientX,
            e.clientY,
            60,
            5
        );

    }

});

function loop() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (let i = particles.length - 1; i >= 0; i--) {

        const p = particles[i];

        p.update();
        p.draw();

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(loop);

}

loop();
