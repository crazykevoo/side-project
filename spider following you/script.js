const canvas = document.getElementById("spiderCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let points = [];

const POINTS_COUNT = 20;
const MAX_DISTANCE = 120;

for (let i = 0; i < POINTS_COUNT; i++) {
    points.push({
        x: mouse.x,
        y: mouse.y,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1
    });
}

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach(p => {
        p.x += (mouse.x - p.x) * 0.05 + p.vx;
        p.y += (mouse.y - p.y) * 0.05 + p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
    });

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let dx = points[i].x - points[j].x;
            let dy = points[i].y - points[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MAX_DISTANCE) {
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.strokeStyle = `rgba(255,255,255,${1 - dist / MAX_DISTANCE})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

draw();