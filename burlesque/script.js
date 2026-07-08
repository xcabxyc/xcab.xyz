const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
addEventListener("resize", resize);
resize();

ctx.imageSmoothingEnabled = false;

const particles = [];
let clicks = 0;

/* ==========================
   PARTICLE
========================== */

class Particle {

    constructor(x, y, vx, vy, life, size = 2) {

        this.x = x;
        this.y = y;

        this.vx = vx;
        this.vy = vy;

        this.life = life;
        this.maxLife = life;

        this.size = size;

        this.twinkle = Math.random() * Math.PI * 2;

    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        // gravity
        this.vy += 0.045;

        // tiny drag
        this.vx *= 0.995;
        this.vy *= 0.995;

        this.life--;

    }

    draw() {

        const alpha = this.life / this.maxLife;

        ctx.globalAlpha = alpha;

        ctx.fillStyle = "#fff";

        const s = this.size;

        // little pixel star instead of square

        ctx.fillRect(this.x, this.y, s, s);

        if (Math.sin(this.twinkle + performance.now() * 0.02) > 0) {

            ctx.fillRect(this.x - s, this.y, s, s);
            ctx.fillRect(this.x + s, this.y, s, s);
            ctx.fillRect(this.x, this.y - s, s, s);
            ctx.fillRect(this.x, this.y + s, s, s);

        }

        ctx.globalAlpha = 1;

    }

}

/* ==========================
   PERFECT BURST
========================== */

function burst(x, y, count = 80, power = 6) {

    for (let i = 0; i < count; i++) {

        const angle = (Math.PI * 2 / count) * i;

        const speed = power * (0.6 + Math.random() * 0.4);

        particles.push(

            new Particle(

                x,
                y,

                Math.cos(angle) * speed,

                Math.sin(angle) * speed,

                70 + Math.random() * 25,

                2

            )

        );

    }

}
