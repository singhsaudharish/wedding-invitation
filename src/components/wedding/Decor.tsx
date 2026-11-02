import { useEffect, useRef, useState, type ReactNode } from "react";
import { timeLeft } from "@/lib/events";

const PETALS = ["🌸", "🌹", "🏵️", "✿", "❀", "🌼"];

export function Petals({ count = 18, items = PETALS }: { count?: number; items?: string[] }) {
  const [list, setList] = useState<{ l: number; d: number; dl: number; s: number; c: string }[]>([]);
  useEffect(() => {
    const n = window.innerWidth < 640 ? Math.ceil(count / 2) : count;
    setList(
      Array.from({ length: n }, (_, i) => ({
        l: Math.random() * 100,
        d: 9 + Math.random() * 10,
        dl: -Math.random() * 18,
        s: 14 + Math.random() * 16,
        c: items[i % items.length] ?? "✿",
      })),
    );
  }, [count, items]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {list.map((p, i) => (
        <span
          key={i}
          className="petal text-rose"
          style={{ left: `${p.l}%`, animationDuration: `${p.d}s`, animationDelay: `${p.dl}s`, fontSize: p.s }}
        >
          {p.c}
        </span>
      ))}
    </div>
  );
}

export function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="0.8">
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse key={i} cx="100" cy="55" rx="12" ry="45" transform={`rotate(${i * 22.5} 100 100)`} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={`p${i}`} d="M100 30 Q110 60 100 75 Q90 60 100 30Z" transform={`rotate(${i * 45} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="95" />
        <circle cx="100" cy="100" r="25" />
        <circle cx="100" cy="100" r="12" />
      </g>
    </svg>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center justify-center gap-3 text-gold" aria-hidden>
      <span className="h-px w-16 bg-gold-gradient sm:w-28" />
      <span className="text-xl">❁</span>
      <span className="h-px w-16 bg-gold-gradient sm:w-28" />
    </div>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e?.isIntersecting && (el.classList.add("in"), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function Countdown({ target, tone = "primary" }: { target: string; tone?: "primary" | "haldi" }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const t = now == null ? null : timeLeft(target, now);
  if (t?.done) return <p className="font-script text-3xl text-primary">The celebration has begun! 🎉</p>;
  const units: [string, number | undefined][] = [
    ["Days", t?.days],
    ["Hours", t?.hours],
    ["Minutes", t?.minutes],
    ["Seconds", t?.seconds],
  ];
  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      {units.map(([l, v]) => (
        <div
          key={l}
          className={`w-16 rounded-xl border-2 border-gold/60 py-2 shadow-md sm:w-20 sm:py-3 ${tone === "haldi" ? "bg-haldi-soft" : "bg-card"}`}
        >
          <div className="font-display text-2xl text-primary sm:text-3xl">
            {v == null ? "--" : String(v).padStart(2, "0")}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">{l}</div>
        </div>
      ))}
    </div>
  );
}
