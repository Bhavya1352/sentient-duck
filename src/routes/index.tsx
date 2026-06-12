import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import duckLogo from "@/assets/duck-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RubberDuck.ai — The Sentient Co-Pilot" },
      { name: "description", content: "Speak your logic out loud. RubberDuck listens, understands your repository context, and writes the patch before you finish your sentence." },
      { property: "og:title", content: "RubberDuck.ai — The Sentient Co-Pilot" },
      { property: "og:description", content: "Speak your logic out loud. RubberDuck listens, understands your repository context, and writes the patch before you finish your sentence." },
    ],
  }),
  component: Index,
});

const transcriptLines = [
  { text: "Initializing audio stream...", style: "text-muted-foreground/40 opacity-50" as const },
  { text: "Okay, so the user login is failing on the production build. The payload looks fine...", style: "text-muted-foreground" as const },
  { text: "Wait, is the JWT middleware actually stripping the Auth header? Let me check the config.", style: "text-foreground" as const },
  { text: "Checking auth_middleware.go for header key mismatch", style: "text-foreground border-l-2 border-accent pl-3" as const },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <img src={duckLogo} alt="RubberDuck.ai" width={28} height={28} className="rounded-full" />
        <span className="font-semibold tracking-tight text-lg">
          RubberDuck<span className="text-accent">.ai</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <a href="#architecture" className="hover:text-foreground transition-colors">Architecture</a>
        <a href="#security" className="hover:text-foreground transition-colors">Security</a>
        <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        <button className="px-4 py-1.5 rounded-full bg-foreground text-background hover:bg-primary-foreground transition-all active:scale-95">
          Dashboard
        </button>
      </div>
    </nav>
  );
}

function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative pt-24 pb-16 px-6 text-center overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full pointer-events-none opacity-50"
        style={{ filter: "blur(120px)" }}
      />

      <div className="relative max-w-3xl mx-auto" style={{ animation: "stream-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
        <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-balance leading-[0.9] font-sans">
          The sentient{" "}
          <span className="font-serif italic">confidant</span>{" "}
          for your codebase.
        </h1>
        <p className="mt-8 text-xl text-muted-foreground max-w-xl mx-auto text-pretty font-light">
          Speak your logic out loud. RubberDuck listens, understands your repository context, and writes the patch before you finish your sentence.
        </p>

        <div className="mt-12 flex flex-col items-center gap-6">
          <button
            onClick={onStart}
            className="group relative flex items-center gap-4 px-8 py-5 bg-panel border border-border rounded-2xl hover:border-accent/50 transition-all duration-500 active:scale-95"
            style={{ boxShadow: "0 0 40px oklch(0.72 0.16 55 / 0.15)" }}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20" />
              <div className="size-12 bg-accent rounded-full flex items-center justify-center">
                <div className="size-4 bg-background rounded-full" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-xs uppercase tracking-widest text-accent font-bold">Live Interface</div>
              <div className="text-xl font-medium">Start Listening</div>
            </div>
          </button>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Hardware access required &bull; 128-bit Encryption
          </span>
        </div>
      </div>
    </section>
  );
}

function TranscriptRail({ visibleCount }: { visibleCount: number }) {
  return (
    <aside className="col-span-12 lg:col-span-3 space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Live Stream</h3>
        <div className="flex gap-1">
          <div className="size-1 bg-accent rounded-full animate-pulse" />
          <div className="size-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
        </div>
      </div>
      <div className="h-[400px] bg-panel/50 border border-border rounded-2xl p-4 overflow-hidden relative">
        <div className="space-y-6 font-mono text-sm leading-relaxed">
          {transcriptLines.slice(0, visibleCount).map((line, i) => (
            <p
              key={i}
              className={line.style}
              style={{
                animation: `stream-in 0.5s ease-out both`,
                animationDelay: `${i * 0.6}s`,
              }}
            >
              {line.text}
            </p>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-panel to-transparent" />
      </div>
    </aside>
  );
}

function OrbCenter({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const animate = (t: number) => {
      setPhase(t);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2;

    // Draw orbital rings
    const ringCount = 3;
    for (let i = 0; i < ringCount; i++) {
      const radius = 60 + i * 45;
      const pulse = active ? Math.sin(phase * 0.003 + i) * 8 : 0;
      ctx.beginPath();
      ctx.arc(cx, cy, radius + pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `oklch(0.72 0.16 55 / ${0.08 + i * 0.04})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw waveform bars around the orb
    if (active) {
      const barCount = 32;
      const innerR = 150;
      const outerR = 190;
      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2 + phase * 0.002;
        const noise = Math.sin(phase * 0.008 + i * 0.5) * 0.5 + 0.5;
        const barLen = noise * (outerR - innerR);
        const x1 = cx + Math.cos(angle) * innerR;
        const y1 = cy + Math.sin(angle) * innerR;
        const x2 = cx + Math.cos(angle) * (innerR + barLen);
        const y2 = cy + Math.sin(angle) * (innerR + barLen);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `oklch(0.72 0.16 55 / ${0.15 + noise * 0.25})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }
  }, [phase, active]);

  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center min-h-[500px] bg-panel rounded-[2rem] border border-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.72 0.16 55 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex items-center justify-center">
        {/* Outer glow layers */}
        <div
          className="absolute size-64 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.72 0.16 55 / 0.2)",
            filter: "blur(60px)",
            animation: active
              ? "pulse-orb 2s ease-in-out infinite"
              : "pulse-orb 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute size-64 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.72 0.16 55 / 0.1)",
            filter: "blur(40px)",
            animation: active
              ? "pulse-orb 3s ease-in-out infinite reverse"
              : "pulse-orb 6s ease-in-out infinite reverse",
          }}
        />

        {/* Concentric rings */}
        <div className="relative size-64 rounded-full border border-accent/20 flex items-center justify-center backdrop-blur-sm">
          <div className="size-32 rounded-full border border-accent/40 flex items-center justify-center">
            <div className="size-16 rounded-full bg-accent/10 border border-accent animate-pulse" />
          </div>
        </div>

        {/* Canvas waveform overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: "400px", height: "400px", margin: "auto", left: "-28px", top: "-28px" }}
        />
      </div>

      {/* Status */}
      <div className="absolute bottom-12 text-center space-y-2">
        <div className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase font-bold">
          {active ? "Processing Context" : "Awaiting Input"}
        </div>
        <div className="text-2xl font-light tracking-tight">
          Analyzing <span className="text-accent italic">auth_middleware.go</span>
        </div>
      </div>
    </div>
  );
}

function AiSuggestionCard({ visible }: { visible: boolean }) {
  const [applied, setApplied] = useState(false);

  return (
    <div className="col-span-12 lg:col-span-3 space-y-4">
      <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground px-2">
        AI Suggestions
      </h3>

      <div
        className={`bg-panel border rounded-2xl p-4 transition-all duration-700 ${
          visible ? "border-accent/30 opacity-100 translate-y-0" : "border-border opacity-0 translate-y-4"
        }`}
        style={{ boxShadow: "0 8px 32px oklch(0 0 0 / 0.4)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="size-2 bg-accent rounded-full" />
          <span className="text-xs font-bold uppercase tracking-wider">Header Mismatch Found</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          The middleware expects <code className="text-foreground">X-Auth-Token</code> but the client sends{" "}
          <code className="text-foreground">Authorization</code>.
        </p>

        {/* Code Diff */}
        <div className="bg-background/60 rounded-lg p-3 font-mono text-[11px] leading-tight mb-4 border border-white/5">
          <div className="text-diff-remove">- const KEY = &quot;Authorization&quot;</div>
          <div className="text-diff-add">+ const KEY = &quot;X-Auth-Token&quot;</div>
        </div>

        <button
          onClick={() => setApplied(true)}
          disabled={applied}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
            applied
              ? "bg-diff-add text-background cursor-default"
              : "bg-accent text-accent-foreground hover:brightness-110"
          }`}
        >
          {applied ? "Patch Applied ✓" : "Apply Fix"}
        </button>
      </div>

      <div className="bg-panel/40 border border-border rounded-2xl p-4 opacity-50">
        <span className="text-[10px] font-mono uppercase text-muted-foreground">Context Search</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono">jwt.io</span>
          <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono">config/auth.yml</span>
          <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono">middleware.ts</span>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Connect Your Repo",
      desc: "Index your entire codebase into a semantic vector space. Every function, comment, and config file becomes searchable context.",
    },
    {
      num: "02",
      title: "Talk Out Loud",
      desc: "Use the Web Speech API to stream your stream-of-consciousness debugging narrative. No typing. No context switching.",
    },
    {
      num: "03",
      title: "Get The Fix",
      desc: "RubberDuck cross-references your hypothesis against the codebase, identifies the bug, and generates the exact patch.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-balance">
          How it <span className="font-serif italic">works</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-panel border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent">{step.num}</span>
            <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterStrip() {
  return (
    <footer className="border-t border-border bg-panel/30">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-accent">●</span>
            <span>Project: hyper-engine-v2</span>
          </div>
          <div className="hidden md:block">
            Branch: <span className="text-foreground">feature/auth-debug</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>2,412 Files Indexed</span>
          <span className="hidden md:inline-block">Latency: 42ms</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  const [listening, setListening] = useState(false);
  const [transcriptVisible, setTranscriptVisible] = useState(1);
  const [suggestionVisible, setSuggestionVisible] = useState(false);

  useEffect(() => {
    if (!listening) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => setTranscriptVisible(2), 800),
      setTimeout(() => setTranscriptVisible(3), 2000),
      setTimeout(() => setTranscriptVisible(4), 3500),
      setTimeout(() => setSuggestionVisible(true), 4500)
    );

    return () => timers.forEach(clearTimeout);
  }, [listening]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Navbar />
      <HeroSection onStart={() => setListening(true)} />

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-6 pb-24">
        <TranscriptRail visibleCount={transcriptVisible} />
        <OrbCenter active={listening} />
        <AiSuggestionCard visible={suggestionVisible} />
      </main>

      <HowItWorks />
      <FooterStrip />
    </div>
  );
}
