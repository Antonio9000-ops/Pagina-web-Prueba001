import { gsap } from "gsap";

const cursor = document.querySelector("#cursor") as HTMLImageElement;

// Centrar la imagen en el mouse
gsap.set(cursor, {
  xPercent: -50,
  yPercent: -50,
});

// Movimiento optimizado
const xTo = gsap.quickTo(cursor, "x", {
  duration: 0.15,
  ease: "power3.out",
});

const yTo = gsap.quickTo(cursor, "y", {
  duration: 0.15,
  ease: "power3.out",
});

let lastX = window.innerWidth / 2;
let lastY = window.innerHeight / 2;

window.addEventListener("mousemove", (e) => {
  // -------------------------
  // Movimiento
  // -------------------------
  xTo(e.clientX);
  yTo(e.clientY);

  // -------------------------
  // Rotación
  // -------------------------
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  gsap.to(cursor, {
    rotation: angle,
    duration: 0.25,
    ease: "power2.out",
  });

  lastX = e.clientX;
  lastY = e.clientY;

  // -------------------------
  // Partículas
  // -------------------------
  createParticle(e.clientX, e.clientY);
});

// ==========================
// Rebote al hacer click
// ==========================

window.addEventListener("mousedown", () => {
  gsap.to(cursor, {
    scale: 0.75,
    duration: 0.08,
  });
});

window.addEventListener("mouseup", () => {
  gsap.to(cursor, {
    scale: 1,
    duration: 0.5,
    ease: "elastic.out(1,0.4)",
  });
});

// ==========================
// Partículas
// ==========================

const colors = ["#22d3ee", "#38bdf8", "#60a5fa", "#ffffff"];

function createParticle(x: number, y: number) {
  const particle = document.createElement("div");

  particle.className = `
        fixed
        w-2
        h-2
        rounded-full
        pointer-events-none
        z-[9998]
    `;

  particle.style.left = x + "px";
  particle.style.top = y + "px";

  particle.style.background = colors[Math.floor(Math.random() * colors.length)];

  document.body.appendChild(particle);

  gsap.to(particle, {
    x: gsap.utils.random(-40, 40),

    y: gsap.utils.random(-40, 40),

    scale: 0,

    opacity: 0,

    duration: 0.6,

    ease: "power2.out",

    onComplete() {
      particle.remove();
    },
  });
}
const botones = document.querySelectorAll("button");

botones.forEach((boton) => {
  boton.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 1.5,
      duration: 0.25,
      ease: "power2.out",
    });
  });

  boton.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  });
});
