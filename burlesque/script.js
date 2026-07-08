/* ==========================================
    BURLESQUE
    2001 PROMO
========================================== */

const body = document.body;

const cursor = document.querySelector(".cursor-glow");
const hero = document.querySelector(".hero");
const cover = document.querySelector(".cover");
const cd = document.querySelector(".cd");
const stars = document.querySelector(".stars");
const eqBars = document.querySelectorAll(".eq span");

/*==========================================
CURSOR
==========================================*/

document.addEventListener("mousemove",(e)=>{

    cursor.style.left=e.clientX+"px";
    cursor.style.top=e.clientY+"px";

});

/*==========================================
PARALLAX
==========================================*/

document.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth)-0.5;
    const y=(e.clientY/window.innerHeight)-0.5;

    hero.style.transform=
    `translate(${x*20}px,${y*20}px)`;

    stars.style.transform=
    `translate(${x*-40}px,${y*-40}px)`;

});

/*==========================================
SPARKLES
==========================================*/

function sparkle(){

    const star=document.createElement("div");

    star.className="spark";

    star.style.left=Math.random()*window.innerWidth+"px";
    star.style.top=Math.random()*window.innerHeight+"px";

    star.style.animationDuration=
    2+Math.random()*4+"s";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },5000);

}

setInterval(sparkle,120);

/*==========================================
SHOOTING STARS
==========================================*/

function shootingStar(){

    const s=document.createElement("div");

    s.className="shooting-star";

    s.style.left=Math.random()*window.innerWidth+"px";
    s.style.top=Math.random()*250+"px";

    document.body.appendChild(s);

    setTimeout(()=>{

        s.remove();

    },2200);

}

setInterval(shootingStar,7000);

/*==========================================
FLOATING PARTICLES
==========================================*/

for(let i=0;i<80;i++){

    const p=document.createElement("div");

    p.className="particle";

    p.style.left=Math.random()*100+"vw";
    p.style.top=Math.random()*100+"vh";

    p.style.animationDelay=Math.random()*12+"s";

    p.style.animationDuration=
    8+Math.random()*14+"s";

    p.style.opacity=Math.random();

    document.body.appendChild(p);

}

/*==========================================
RANDOM EQUALIZER
==========================================*/

setInterval(()=>{

    eqBars.forEach(bar=>{

        bar.style.height=
        10+Math.random()*60+"px";

    });

},120);

/*==========================================
ALBUM DRIFT
==========================================*/

let t=0;

function animate(){

    t+=0.01;

    cover.style.transform=

    `translateY(${Math.sin(t)*10}px)
     rotate(${Math.sin(t*.4)*1.2}deg)`;

    cd.style.transform=

    `rotate(${t*40}deg)
     translateX(${Math.sin(t)*8}px)`;

    requestAnimationFrame(animate);

}

animate();

/*==========================================
CRT FLICKER
==========================================*/

setInterval(()=>{

    body.style.filter=
    `brightness(${0.95+Math.random()*0.08})`;

},120);

/*==========================================
TWINKLE
==========================================*/

setInterval(()=>{

    document.querySelectorAll(".spark").forEach(s=>{

        s.style.opacity=Math.random();

    });

},300);

/*==========================================
CLICK BURST
==========================================*/

document.addEventListener("click",(e)=>{

    for(let i=0;i<18;i++){

        const b=document.createElement("div");

        b.className="burst";

        b.style.left=e.clientX+"px";
        b.style.top=e.clientY+"px";

        b.style.setProperty("--dx",
            (Math.random()*220-110)+"px");

        b.style.setProperty("--dy",
            (Math.random()*220-110)+"px");

        document.body.appendChild(b);

        setTimeout(()=>{

            b.remove();

        },1000);

    }

});

/*==========================================
LOGO HUE SHIFT
==========================================*/

const logo=document.querySelector(".logo");

let hue=0;

setInterval(()=>{

    hue+=0.5;

    logo.style.filter=
    `hue-rotate(${hue}deg)`;

},40);

/*==========================================
WELCOME
==========================================*/

console.log(`
************************************

 BURLESQUE

 2001 PROMO EXPERIENCE

************************************
`);
