"use client";

import { useEffect, useRef, useState } from "react";

const FRAMES = [
  `     .--
 .--'  '.
=\`..-.'_ \`---,
      \` \` .\\'
           \`'`,
  `     .--
 .--'  '.
=\`..-.'_ \`---,
      \` \` .\\'
          \`'`,
];

const SPEED = 0.5;
const BOB_AMPLITUDE = 8;
const BOB_PERIOD = 4000;
const BASE_OPACITY = 0.8;
const FRAME_INTERVAL = 800;
const TURN_RATE = 0.005; // gentle random steering
const FILL_DISTANCE = 300;

export default function AsciiDolphin() {
  const ref = useRef<HTMLPreElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    const el = ref.current;
    let mouseX = -9999;
    let mouseY = -9999;
    let x = window.innerWidth + 50;
    let y = window.innerHeight / 3;
    let angle = Math.PI; // start heading left
    let targetAngle = angle;
    let animFrame = 0;
    let lastFrameSwap = 0;
    let lastSteerChange = 0;
    let rafId: number;
    const startTime = performance.now();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const update = (now: number) => {
      // Pick a new random target direction every 3-6 seconds
      if (now - lastSteerChange > 3000 + Math.random() * 3000) {
        // Bias toward center of page to keep dolphin visible
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const cx = vw / 2;
        const cy = vh / 2;
        const toCenterAngle = Math.atan2(cy - y, cx - x);

        // Mix: 50% toward center + 50% random
        const randomAngle = Math.random() * Math.PI * 2;
        targetAngle = toCenterAngle * 0.5 + randomAngle * 0.5;
        lastSteerChange = now;
      }

      // Slowly steer toward target angle
      let diff = targetAngle - angle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      angle += diff * TURN_RATE;

      // Move at constant speed
      x += Math.cos(angle) * SPEED;
      y += Math.sin(angle) * SPEED;

      // Wrap around edges
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (x < -250) x = vw + 50;
      if (x > vw + 250) x = -50;
      if (y < -150) y = vh + 50;
      if (y > vh + 150) y = -50;

      // Bob
      const elapsed = now - startTime;
      const bob =
        Math.sin((elapsed / BOB_PERIOD) * Math.PI * 2) * BOB_AMPLITUDE;

      // Flip based on heading
      const facingLeft = Math.cos(angle) < 0;
      const flip = facingLeft ? "" : "scaleX(-1)";

      // Color: interpolate from text-secondary to teal based on mouse distance
      const dx = mouseX - x;
      const dy = mouseY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const t = Math.max(0, 1 - dist / FILL_DISTANCE);
      const r = Math.round(136 + (94 - 136) * t);
      const g = Math.round(136 + (168 - 136) * t);
      const b = Math.round(160 + (168 - 160) * t);
      el.style.color = `rgb(${r},${g},${b})`;

      el.style.transform = `translate(${x}px, ${y + bob}px) ${flip}`;
      el.style.opacity = String(BASE_OPACITY);

      // Frame swap
      if (now - lastFrameSwap > FRAME_INTERVAL) {
        animFrame = 1 - animFrame;
        el.textContent = FRAMES[animFrame];
        lastFrameSwap = now;
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 z-10 pointer-events-none select-none text-xs leading-tight will-change-transform"
      style={{
        opacity: 0,
        color: "var(--color-text-secondary)",
        fontFamily: "var(--font-jetbrains)",
      }}
    >
      {FRAMES[0]}
    </pre>
  );
}
