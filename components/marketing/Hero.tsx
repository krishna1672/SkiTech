"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const HEADLINE = "One platform for every property operation";
const SPEED_MS = 40;

function BlinkingCursor({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
      className="inline-block ml-[3px] w-[2px] h-[0.85em] bg-black rounded"
    />
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const [displayed, setDisplayed] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [showPill, setShowPill] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showCTAs, setShowCTAs] = useState(false);

  // Mouse spotlight state
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });

  /* MOUSE TRACKING */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleLeave = () => {
      setMouse({ x: -9999, y: -9999 });
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  /* TYPEWRITER */
  useEffect(() => {
    let idx = 0;
    const tick = () => {
      idx += 1;
      setDisplayed(HEADLINE.slice(0, idx));
      if (idx < HEADLINE.length) {
        const jitter = Math.random() * 18 - 9;
        setTimeout(tick, SPEED_MS + jitter);
      } else {
        setTimeout(() => setTypingDone(true), 100);
        setTimeout(() => setShowPill(true), 200);
        setTimeout(() => setShowSub(true), 500);
        setTimeout(() => setShowCTAs(true), 800);
      }
    };
    const start = setTimeout(tick, 300);
    return () => clearTimeout(start);
  }, []);

  /* SPLIT TEXT */
  const splitIndex = displayed.toLowerCase().indexOf("every");

  const line1 =
    splitIndex === -1
      ? displayed
      : displayed.slice(0, splitIndex).trim();

  const line2 =
    splitIndex === -1
      ? ""
      : displayed.slice(splitIndex);

  /* LIQUID GRADIENT CANVAS */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W: number, H: number;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { xPhase: 0.0,  yPhase: 0.0,  xAmp: 0.28, yAmp: 0.22, xFreq: 0.00018, yFreq: 0.00013, r: 0.48, opacity: 0.55 },
      { xPhase: 2.1,  yPhase: 1.4,  xAmp: 0.22, yAmp: 0.30, xFreq: 0.00014, yFreq: 0.00020, r: 0.40, opacity: 0.45 },
      { xPhase: 4.2,  yPhase: 3.1,  xAmp: 0.32, yAmp: 0.18, xFreq: 0.00022, yFreq: 0.00016, r: 0.38, opacity: 0.40 },
      { xPhase: 1.0,  yPhase: 5.0,  xAmp: 0.18, yAmp: 0.26, xFreq: 0.00016, yFreq: 0.00012, r: 0.35, opacity: 0.35 },
    ];

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);

      blobs.forEach((b) => {
        const cx = W * (0.5 + Math.sin(t * b.xFreq + b.xPhase) * b.xAmp);
        const cy = H * (0.5 + Math.cos(t * b.yFreq + b.yPhase) * b.yAmp);
        const radius = Math.min(W, H) * b.r;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0,   `rgba(255,255,255,${b.opacity})`);
        grad.addColorStop(0.4, `rgba(255,255,255,${b.opacity * 0.5})`);
        grad.addColorStop(1,   `rgba(255,255,255,0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#f8f7f4] overflow-hidden px-4 pt-32 pb-24 flex flex-col justify-center"
    >

      {/* ── MOUSE SPOTLIGHT ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px,
            rgba(0,0,0,0.045) 0%,
            rgba(0,0,0,0.02)  35%,
            transparent       70%)`,
        }}
      />

      {/* Dot Grid Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" x="30" y="30" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1.5" fill="rgba(0,0,0,0.08)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Liquid Gradient Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">

        {/* Pill */}
        <AnimatePresence>
          {showPill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-5 py-2 rounded-full border border-black/10 bg-white/70 backdrop-blur-sm text-xs text-neutral-700"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Built for Owners. Made for Growth
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADLINE */}
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-black">

          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="block font-medium"
          >
            {line1}
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="block italic text-neutral-500 font-light"
          >
            {line2}
          </motion.span>

          <BlinkingCursor visible={!typingDone} />
        </h1>

        {/* Subtext */}
        <AnimatePresence>
          {showSub && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-neutral-600 max-w-xl leading-relaxed"
            >
              Centralise property management, workforce, SOPs, finance, and
              reporting — in one elegant, automated workspace.
            </motion.p>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {showCTAs && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10"
            >
              <Link
                href="/demo"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition shadow-lg shadow-black/10 hover:shadow-xl"
              >
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TRUST BADGES */}
        <AnimatePresence>
          {showCTAs && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <AnimatePresence>
                {showCTAs && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6"
                  >
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">

                      {/* Fast Setup */}
                      <motion.div
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/70 border border-black/10 backdrop-blur-md hover:border-black/20 transition shadow-sm"
                      >
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                        </svg>
                        <span className="text-sm font-medium text-black">Fast Setup</span>
                      </motion.div>

                      {/* Security */}
                      <motion.div
                        whileHover={{ scale: 1.05, y: -4 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/70 border border-black/10 backdrop-blur-md hover:border-black/20 transition shadow-sm"
                      >
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z" />
                        </svg>
                        <span className="text-sm font-medium text-black">Enterprise Security</span>
                      </motion.div>

                      {/* Analytics */}
                      <motion.div
                        whileHover={{ scale: 1.05, y: -4 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/70 border border-black/10 backdrop-blur-md hover:border-black/20 transition shadow-sm"
                      >
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3v18h18M7 13l3-3 4 4 5-5" />
                        </svg>
                        <span className="text-sm font-medium text-black">Real-Time Analytics</span>
                      </motion.div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* DASHBOARD IMAGE */}
      <AnimatePresence>
        {showCTAs && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
            className="mt-8 md:mt-10 w-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-7xl px-4"
            >
              {/* ── BLACK GRADIENT GLOW (replaces coloured glows) ── */}
              {/* Outer ambient shadow */}
              <div className="absolute inset-x-8 -bottom-6 top-10 bg-black/30 blur-3xl rounded-3xl -z-10" />
              {/* Tight drop-shadow directly under the card */}
              <div className="absolute inset-x-16 -bottom-2 top-16 bg-black/20 blur-2xl rounded-3xl -z-10" />

              {/* Glass morphism container */}
              <div className="relative backdrop-blur-sm bg-white/10 rounded-3xl p-1 border border-white/20 shadow-2xl">
                {/* Inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl pointer-events-none" />

                {/* Dashboard image */}
                <motion.img
                  src="/dashboard.png"
                  alt="Dashboard Preview"
                  className="relative w-full rounded-3xl shadow-[0_80px_160px_rgba(0,0,0,0.45)] border border-white/30"
                  initial={{ scale: 0.94 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              {/* Bottom page fade */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f8f7f4] to-transparent rounded-b-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
