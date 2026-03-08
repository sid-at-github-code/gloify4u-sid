import { useEffect, useState } from "react";

const G = "#1C4A2A";
const B = "#0E0E0C";
const BG = "#FAFAF8";
const GM = "#C8C5BC";
const GT = "#6B6860";
const W = "#FFFFFF";

// ── V1: Constellation
function V1() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => setPhase(3), 1800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const nodes = [
    { id: "core", x: 220, y: 170, r: 14, label: "Gloify", main: true },
    { id: "mob", x: 98, y: 82, r: 8, label: "Mobile", main: false },
    { id: "web", x: 340, y: 76, r: 8, label: "Web", main: false },
    { id: "ai", x: 84, y: 265, r: 8, label: "AI", main: false },
    { id: "stack", x: 352, y: 262, r: 8, label: "Full-Stack", main: false },
    { id: "cloud", x: 220, y: 308, r: 7, label: "Cloud", main: false },
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const edges: [string, string][] = [
    ["core", "mob"], ["core", "web"], ["core", "ai"], ["core", "stack"],
    ["core", "cloud"], ["mob", "web"], ["ai", "cloud"], ["stack", "cloud"],
  ];

  return (
    <svg viewBox="0 0 440 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 14 }).map((_, r) =>
        Array.from({ length: 18 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={24 + c * 24} cy={20 + r * 24} r="1" fill={GM} fillOpacity="0.35" />
        ))
      )}
      {edges.map(([a, b], i) => {
        const na = byId[a], nb = byId[b];
        const len = Math.hypot(nb.x - na.x, nb.y - na.y);
        return (
          <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={G} strokeWidth="1" strokeOpacity="0.18"
            strokeDasharray={len}
            strokeDashoffset={phase >= 1 ? 0 : len}
            style={{ transition: `stroke-dashoffset 0.55s ease ${i * 0.09}s` }} />
        );
      })}
      {nodes.map((n, i) => (
        <g key={n.id} style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "scale(1)" : "scale(0.2)",
          transformOrigin: `${n.x}px ${n.y}px`,
          transition: `opacity 0.35s ease ${i * 0.07}s, transform 0.35s cubic-bezier(0.34,1.4,0.64,1) ${i * 0.07}s`,
        }}>
          {n.main && <circle cx={n.x} cy={n.y} r={n.r + 6} fill="none" stroke={G} strokeWidth="0.5" strokeOpacity="0.2" />}
          <circle cx={n.x} cy={n.y} r={n.r} fill={BG} stroke={G} strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r={n.r - 3} fill={G} fillOpacity="0.08" />
          {n.main && (
            <>
              <line x1={n.x - 5} y1={n.y} x2={n.x + 5} y2={n.y} stroke={G} strokeWidth="1.2" />
              <line x1={n.x} y1={n.y - 5} x2={n.x} y2={n.y + 5} stroke={G} strokeWidth="1.2" />
              <circle cx={n.x} cy={n.y} r={n.r + 14} fill="none" stroke={G} strokeWidth="0.3" strokeOpacity="0.12" strokeDasharray="3 3" />
              <circle cx={n.x} cy={n.y} r={n.r + 24} fill="none" stroke={G} strokeWidth="0.3" strokeOpacity="0.06" strokeDasharray="2 4" />
            </>
          )}
          <text x={n.x} y={n.y + n.r + 14} textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono" fill={GT}
            style={{ opacity: phase >= 3 ? 1 : 0, transition: `opacity 0.5s ease ${0.2 + i * 0.06}s` }}>
            {n.label}
          </text>
        </g>
      ))}
      {([[8, 8], [432, 8], [8, 352], [432, 352]] as [number, number][]).map(([x, y], i) => (
        <g key={i} style={{ opacity: phase >= 3 ? 0.25 : 0, transition: "opacity 0.6s ease 0.8s" }}>
          <line x1={x} y1={y} x2={x + 12} y2={y} stroke={GM} strokeWidth="0.5" />
          <line x1={x} y1={y} x2={x} y2={y + 12} stroke={GM} strokeWidth="0.5" />
        </g>
      ))}
    </svg>
  );
}

// ── V2: Blueprint Grid
function V2() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);

  const rooms = [
    { x: 40, y: 40, w: 130, h: 95, label: "MOBILE" },
    { x: 178, y: 40, w: 130, h: 95, label: "WEB" },
    { x: 316, y: 40, w: 100, h: 95, label: "AI" },
    { x: 40, y: 143, w: 268, h: 95, label: "FULL-STACK" },
    { x: 316, y: 143, w: 100, h: 95, label: "AUTOMATION" },
    { x: 40, y: 246, w: 376, h: 80, label: "INFRASTRUCTURE" },
  ];

  return (
    <svg viewBox="0 0 456 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 15 }).map((_, r) =>
        Array.from({ length: 19 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={24 + c * 24} cy={12 + r * 24} r="1" fill={GM} fillOpacity="0.3" />
        ))
      )}
      <rect x="36" y="36" width="384" height="294" fill="none" stroke={GM} strokeWidth="0.5" strokeDasharray="4 3"
        style={{ opacity: on ? 0.4 : 0, transition: "opacity 0.5s ease 0.2s" }} />
      {rooms.map((r, i) => (
        <g key={i} style={{
          opacity: on ? 1 : 0,
          transform: on ? "scale(1)" : "scale(0.96)",
          transformOrigin: `${r.x + r.w / 2}px ${r.y + r.h / 2}px`,
          transition: `opacity 0.4s ease ${0.3 + i * 0.1}s, transform 0.4s ease ${0.3 + i * 0.1}s`,
        }}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={G} fillOpacity="0.04" stroke={G} strokeWidth="1" strokeOpacity="0.25" />
          <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 4} textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono" fill={GT} fillOpacity="0.7">
            {r.label}
          </text>
        </g>
      ))}
      <line x1="36" y1="350" x2="420" y2="350" stroke={GM} strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="40" y="348" fontSize="8" fontFamily="IBM Plex Mono" fill={GT} fillOpacity="0.4"
        style={{ opacity: on ? 1 : 0, transition: "opacity 0.5s ease 1s" }}>
        SYSTEM LAYOUT v2.4
      </text>
      {([[36, 36], [420, 36], [36, 330], [420, 330]] as [number, number][]).map(([cx, cy], i) => (
        <g key={i} style={{ opacity: on ? 0.3 : 0, transition: `opacity 0.4s ease ${0.6 + i * 0.1}s` }}>
          <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke={G} strokeWidth="0.5" />
          <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke={G} strokeWidth="0.5" />
        </g>
      ))}
    </svg>
  );
}

// ── V3: Circuit Trace
function V3() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);

  const segs: [number, number, number, number][] = [
    [60, 80, 60, 180], [60, 180, 180, 180], [180, 180, 180, 100], [180, 100, 320, 100],
    [320, 100, 320, 220], [320, 220, 420, 220], [420, 220, 420, 140],
    [60, 180, 60, 300], [60, 300, 240, 300], [240, 300, 240, 240], [240, 240, 320, 240],
    [420, 140, 440, 140], [160, 80, 180, 80], [180, 80, 180, 100],
  ];
  const pads: [number, number, string][] = [
    [60, 80, "IN"], [180, 100, "WEB"], [180, 180, "API"], [320, 100, "MOB"],
    [320, 220, "DATA"], [420, 140, "AI"], [420, 220, "AUTO"],
    [60, 300, "OUT"], [240, 240, "CORE"], [240, 300, "DEPLOY"],
  ];

  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 15 }).map((_, r) =>
        Array.from({ length: 19 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={24 + c * 26} cy={12 + r * 24} r="1" fill={GM} fillOpacity="0.25" />
        ))
      )}
      <text x="400" y="20" fontSize="7" fontFamily="IBM Plex Mono" fill={GT} fillOpacity="0.3"
        style={{ opacity: on ? 1 : 0, transition: "opacity 0.5s ease 1.2s" }}>
        REV 3.1
      </text>
      <text x="400" y="30" fontSize="7" fontFamily="IBM Plex Mono" fill={GT} fillOpacity="0.3"
        style={{ opacity: on ? 1 : 0, transition: "opacity 0.5s ease 1.3s" }}>
        GLOIFY PCB
      </text>
      {segs.map(([x1, y1, x2, y2], i) => {
        const len = Math.hypot(x2 - x1, y2 - y1);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={G} strokeWidth="1.2" strokeOpacity="0.3"
            strokeDasharray={len}
            strokeDashoffset={on ? 0 : len}
            style={{ transition: `stroke-dashoffset 0.5s ease ${0.2 + i * 0.08}s` }} />
        );
      })}
      {pads.map(([px, py, lbl], i) => (
        <g key={i} style={{
          opacity: on ? 1 : 0,
          transition: `opacity 0.35s ease ${0.5 + i * 0.07}s`,
        }}>
          <circle cx={px} cy={py} r="6" fill={BG} stroke={G} strokeWidth="1.2" />
          <circle cx={px} cy={py} r="2.5" fill={G} fillOpacity="0.15" />
          <text x={px} y={py + 16} textAnchor="middle" fontSize="8" fontFamily="IBM Plex Mono" fill={GT}>
            {lbl}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── V4: Org Network
function V4() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);

  const nodes = [
    { x: 228, y: 60, label: "Gloify", sub: "Core", main: true },
    { x: 90, y: 175, label: "Mobile", sub: "iOS / Android", main: false },
    { x: 228, y: 175, label: "Web", sub: "Frontend / API", main: false },
    { x: 366, y: 175, label: "AI", sub: "LLMs / Pipelines", main: false },
    { x: 140, y: 295, label: "Full-Stack", sub: "End-to-End", main: false },
    { x: 316, y: 295, label: "Automation", sub: "Workflows", main: false },
  ];
  const edges: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [2, 5], [3, 5]];

  return (
    <svg viewBox="0 0 456 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 14 }).map((_, r) =>
        Array.from({ length: 18 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={24 + c * 24} cy={20 + r * 24} r="1" fill={GM} fillOpacity="0.3" />
        ))
      )}
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const len = Math.hypot(nb.x - na.x, nb.y - na.y);
        return (
          <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={G} strokeWidth="1" strokeOpacity="0.15"
            strokeDasharray={len}
            strokeDashoffset={on ? 0 : len}
            style={{ transition: `stroke-dashoffset 0.6s ease ${0.2 + i * 0.1}s` }} />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i} style={{
          opacity: on ? 1 : 0,
          transform: on ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.4s ease ${0.4 + i * 0.08}s, transform 0.4s ease ${0.4 + i * 0.08}s`,
        }}>
          <rect x={n.x - 44} y={n.y - 18} width="88" height="36" rx="2"
            fill={n.main ? G : BG} fillOpacity={n.main ? 0.06 : 1}
            stroke={G} strokeWidth={n.main ? "1.5" : "1"} strokeOpacity={n.main ? 0.4 : 0.2} />
          <text x={n.x} y={n.y - 2} textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="500" fill={B}>
            {n.label}
          </text>
          <text x={n.x} y={n.y + 10} textAnchor="middle" fontSize="8" fontFamily="IBM Plex Mono" fill={GT}>
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── V5: Data Plot
function V5() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);

  const pts = [
    { x: 80, y: 260, label: "2019", sub: "Founded" },
    { x: 140, y: 210, label: "2020", sub: "First Client" },
    { x: 210, y: 185, label: "2021", sub: "10 Projects" },
    { x: 280, y: 148, label: "2022", sub: "AI Practice" },
    { x: 350, y: 108, label: "2023", sub: "30 Projects" },
    { x: 400, y: 72, label: "2024", sub: "50+ Delivered" },
  ];

  return (
    <svg viewBox="0 0 460 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 14 }).map((_, r) =>
        Array.from({ length: 18 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={24 + c * 24} cy={20 + r * 24} r="1" fill={GM} fillOpacity="0.25" />
        ))
      )}
      <line x1="60" y1="295" x2="420" y2="295" stroke={GM} strokeWidth="0.5" />
      <line x1="60" y1="55" x2="60" y2="295" stroke={GM} strokeWidth="0.5" />
      {[295, 235, 175, 115, 55].map((y, i) => (
        <g key={i} style={{ opacity: on ? 0.3 : 0, transition: `opacity 0.4s ease ${0.2 + i * 0.05}s` }}>
          <line x1="60" y1={y} x2="420" y2={y} stroke={GM} strokeWidth="0.3" strokeDasharray="3 3" />
          <text x="52" y={y + 3} textAnchor="end" fontSize="7" fontFamily="IBM Plex Mono" fill={GT}>{i * 25}</text>
        </g>
      ))}
      <polyline
        points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none" stroke={B} strokeWidth="1.2" strokeOpacity="0.25"
        strokeDasharray="650"
        style={{ strokeDashoffset: on ? 0 : 650, transition: "stroke-dashoffset 1.4s ease 0.5s" }}
      />
      <polygon
        points={`${pts.map((p) => `${p.x},${p.y}`).join(" ")} 400,295 80,295`}
        fill={B} fillOpacity="0.025"
        style={{ opacity: on ? 1 : 0, transition: "opacity 0.8s ease 1.4s" }}
      />
      {pts.map((p, i) => (
        <g key={i} style={{
          opacity: on ? 1 : 0,
          transition: `opacity 0.35s ease ${0.7 + i * 0.1}s`,
        }}>
          <circle cx={p.x} cy={p.y} r="4" fill={BG} stroke={G} strokeWidth="1.2" />
          <circle cx={p.x} cy={p.y} r="1.5" fill={G} fillOpacity="0.3" />
          <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono" fill={B} fontWeight="500">
            {p.label}
          </text>
          <text x={p.x} y={p.y - 1} textAnchor="middle" fontSize="7" fontFamily="IBM Plex Mono" fill={GT} dy="22">
            {p.sub}
          </text>
        </g>
      ))}
      <text x="420" y="340" textAnchor="end" fontSize="8" fontFamily="IBM Plex Mono" fill={GT} fillOpacity="0.4"
        style={{ opacity: on ? 1 : 0, transition: "opacity 0.5s ease 1.5s" }}>
        GROWTH TRAJECTORY
      </text>
    </svg>
  );
}

// ── Main Export
const VARIANTS = [
  { id: 1, name: "Constellation", C: V1 },
  { id: 2, name: "Blueprint Grid", C: V2 },
  { id: 3, name: "Circuit Trace", C: V3 },
  { id: 4, name: "Org Network", C: V4 },
  { id: 5, name: "Data Plot", C: V5 },
];

const ANIM_DURATION = 2600;
const IDLE_DURATION = 4000;
const FADE_DURATION = 500;

export default function HeroVisualization() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        setMounted(false);
        setTimeout(() => {
          setCurrent((prev) => (prev + 1) % VARIANTS.length);
          setMounted(true);
          setTimeout(() => setVisible(true), 30);
        }, 80);
      }, FADE_DURATION);
    };

    const timer = setTimeout(cycle, ANIM_DURATION + IDLE_DURATION);
    return () => clearTimeout(timer);
  }, [current]);

  const cur = VARIANTS[current];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Animation area */}
      <div
        className="w-full aspect-[456/360]"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_DURATION}ms ease`,
        }}
      >
        {mounted && <cur.C />}
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-3">
        {VARIANTS.map((v, i) => (
          <button
            key={v.id}
            className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: i === current ? G : GM,
              transform: i === current ? "scale(1.4)" : "scale(1)",
            }}
            onClick={() => {
              setVisible(false);
              setTimeout(() => {
                setMounted(false);
                setTimeout(() => {
                  setCurrent(i);
                  setMounted(true);
                  setTimeout(() => setVisible(true), 30);
                }, 80);
              }, FADE_DURATION);
            }}
          />
        ))}
        <span style={{ fontFamily: "IBM Plex Mono", fontSize: "10px", color: GT, marginLeft: "8px" }}>
          {String(current + 1).padStart(2, "0")} / 05
        </span>
      </div>

      {/* Current label */}
      <div style={{ fontFamily: "IBM Plex Mono", fontSize: "10px", color: GT, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
        {cur.name}
      </div>
    </div>
  );
}
