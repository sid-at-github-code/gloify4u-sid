import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

export type FlowNode = { id?: string; label: string; note?: string; layer?: string };

type IndexedNode = FlowNode & { _key: string };
type LayerGroup  = { layer: string; nodes: IndexedNode[] };
type Connection  = { id: string; d: string };
type LayerStyle  = { border: string; bg: string; accent: string };

const LAYER_STYLES: Record<string, LayerStyle> = {
  "UI":             { border: "border-sky-500/30",     bg: "bg-sky-500/10",     accent: "text-sky-400" },
  "Frontend":       { border: "border-sky-500/30",     bg: "bg-sky-500/10",     accent: "text-sky-400" },
  "Backend":        { border: "border-indigo-400/30",  bg: "bg-indigo-500/10",  accent: "text-indigo-400" },
  "API":            { border: "border-indigo-400/30",  bg: "bg-indigo-500/10",  accent: "text-indigo-400" },
  "AI Core":        { border: "border-violet-500/40",  bg: "bg-violet-500/10",  accent: "text-violet-400" },
  "AI":             { border: "border-violet-500/40",  bg: "bg-violet-500/10",  accent: "text-violet-400" },
  "Data":           { border: "border-emerald-500/30", bg: "bg-emerald-500/10", accent: "text-emerald-400" },
  "Database":       { border: "border-emerald-500/30", bg: "bg-emerald-500/10", accent: "text-emerald-400" },
  "Infrastructure": { border: "border-slate-400/30",   bg: "bg-slate-500/10",   accent: "text-slate-400" },
  "Infra":          { border: "border-slate-400/30",   bg: "bg-slate-500/10",   accent: "text-slate-400" },
};
const DEFAULT_STYLE: LayerStyle = { border: "border-grey-mid", bg: "bg-card", accent: "text-grey-text" };
const getStyle = (l: string) => LAYER_STYLES[l] ?? DEFAULT_STYLE;

/** Group raw nodes into layers, assigning stable keys */
function buildGroups(raw: FlowNode[]): LayerGroup[] {
  const order: string[] = [];
  const map: Record<string, IndexedNode[]> = {};
  raw.forEach((n, i) => {
    const layer = n.layer ?? "Other";
    const key   = n.id ?? `n${i}`;
    if (!map[layer]) { map[layer] = []; order.push(layer); }
    map[layer].push({ ...n, _key: key });
  });
  return order.map((l) => ({ layer: l, nodes: map[l] }));
}

/** Fallback: connect adjacent layers (old behaviour) */
function autoEdges(groups: LayerGroup[]): [string, string][] {
  const edges: [string, string][] = [];
  for (let g = 0; g < groups.length - 1; g++) {
    const a = groups[g].nodes, b = groups[g + 1].nodes;
    if (a.length === b.length) {
      a.forEach((n, i) => edges.push([n._key, b[i]._key]));
    } else {
      for (const na of a) for (const nb of b) edges.push([na._key, nb._key]);
    }
  }
  return edges;
}

/**
 * Pick the best exit / entry point on each node based on
 * the relative direction between their centres.
 */
function connPoints(a: DOMRect, b: DOMRect, cr: DOMRect) {
  const toLocal = (r: DOMRect) => ({
    l: r.left - cr.left,
    t: r.top  - cr.top,
    r: r.right  - cr.left,
    b: r.bottom - cr.top,
    cx: r.left - cr.left + r.width  / 2,
    cy: r.top  - cr.top  + r.height / 2,
  });
  const A = toLocal(a), B = toLocal(b);
  const dx = B.cx - A.cx, dy = B.cy - A.cy;

  if (Math.abs(dy) >= Math.abs(dx)) {
    // Vertical dominant — exit bottom / enter top (or vice-versa)
    return dy >= 0
      ? { x1: A.cx, y1: A.b,  x2: B.cx, y2: B.t  }
      : { x1: A.cx, y1: A.t,  x2: B.cx, y2: B.b  };
  } else {
    // Horizontal dominant — exit right / enter left (or vice-versa)
    return dx >= 0
      ? { x1: A.r,  y1: A.cy, x2: B.l,  y2: B.cy }
      : { x1: A.l,  y1: A.cy, x2: B.r,  y2: B.cy };
  }
}

/** Smooth cubic bezier that adapts to the dominant direction */
function makePath(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1, dy = y2 - y1;
  if (Math.abs(dy) >= Math.abs(dx)) {
    const cy = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${cy} ${x2} ${cy} ${x2} ${y2}`;
  } else {
    const cx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${cx} ${y1} ${cx} ${y2} ${x2} ${y2}`;
  }
}

// Deterministic animation stagger
const DURS   = [1.6, 2.1, 1.4, 1.9, 2.4, 1.7, 2.0, 1.5, 2.2, 1.8];
const BEGINS = [0, 0.7, 1.3, 0.4, 1.0, 1.6, 0.2, 0.9, 1.5, 0.6];
const anim   = (i: number) => ({ dur: DURS[i % DURS.length], begin: BEGINS[i % BEGINS.length] });

// ─────────────────────────────────────────────────────────────────────────────

export const FlowDiagram = ({
  nodes: propNodes,
  edges: propEdges,
  flow,            // backward-compat: old "flow" array (no explicit edges)
  title,
}: {
  nodes?: FlowNode[];
  edges?: [string, string][];
  flow?:  FlowNode[];
  title?: string;
}) => {
  const rawNodes       = propNodes ?? flow ?? [];
  const groups         = useMemo(() => buildGroups(rawNodes),              [rawNodes]);
  const resolvedEdges  = useMemo(() => propEdges ?? autoEdges(groups),     [propEdges, groups]);

  const container = useRef<HTMLDivElement>(null);
  const refs      = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [conns,   setConns]   = useState<Connection[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const measure = () => {
      if (!container.current) return;
      const cr  = container.current.getBoundingClientRect();
      const out: Connection[] = [];

      resolvedEdges.forEach(([aid, bid], i) => {
        const aEl = refs.current.get(aid);
        const bEl = refs.current.get(bid);
        if (!aEl || !bEl) return;
        const { x1, y1, x2, y2 } = connPoints(
          aEl.getBoundingClientRect(),
          bEl.getBoundingClientRect(),
          cr,
        );
        out.push({ id: `e${i}-${aid}-${bid}`, d: makePath(x1, y1, x2, y2) });
      });

      setConns(out);
      setSvgSize({ w: container.current.offsetWidth, h: container.current.offsetHeight });
    };

    const t   = setTimeout(measure, 400);
    const obs = new ResizeObserver(measure);
    if (container.current) obs.observe(container.current);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [groups, resolvedEdges]);

  return (
    <motion.div
      ref={container}
      className="relative mt-8 rounded-sm border border-grey-mid/60 bg-background/50 not-prose"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y:  0 }}
      transition={{ duration: 0.45 }}
    >
      {/* Header */}
      <div className="px-4 pt-3 pb-2.5 border-b border-grey-mid/40 flex items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary font-medium">
          Architecture
        </span>
        {title && (
          <>
            <span className="text-grey-mid/40 text-[9px]">·</span>
            <span className="font-mono text-[9px] text-grey-text truncate">{title}</span>
          </>
        )}
      </div>

      {/* SVG overlay: dashed lines + animated particles */}
      {conns.length > 0 && (
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          width={svgSize.w}
          height={svgSize.h}
          style={{ overflow: "visible", zIndex: 0 }}
        >
          <defs>
            {conns.map((c) => <path key={`d-${c.id}`} id={`fp-${c.id}`} d={c.d} />)}
          </defs>

          {/* Visible dashed lines */}
          {conns.map((c) => (
            <path
              key={`l-${c.id}`}
              d={c.d}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 4"
              fill="none"
              className="text-grey-mid/30"
            />
          ))}

          {/* Glowing particles travelling along each path */}
          {conns.map((c, i) => {
            const p = anim(i);
            return (
              <g key={`g-${c.id}`}>
                {/* Glow halo */}
                <circle r="4" fill="currentColor" className="text-primary/15">
                  {/* @ts-expect-error animateMotion children */}
                  <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.begin}s`}>
                    <mpath href={`#fp-${c.id}`} />
                  </animateMotion>
                </circle>
                {/* Core dot */}
                <circle r="2" fill="currentColor" className="text-primary/80">
                  {/* @ts-expect-error animateMotion children */}
                  <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.begin}s`}>
                    <mpath href={`#fp-${c.id}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}
        </svg>
      )}

      {/* Node layers — rendered above SVG overlay */}
      <div className="px-4 py-5 space-y-8" style={{ position: "relative", zIndex: 1 }}>
        {groups.map((group) => {
          const s = getStyle(group.layer);
          return (
            <div key={group.layer} className="flex items-start gap-3">
              {/* Layer label */}
              <div className="w-[72px] shrink-0 pt-2.5">
                <span className={`font-mono text-[9px] uppercase tracking-[0.1em] font-semibold ${s.accent}`}>
                  {group.layer}
                </span>
              </div>
              {/* Node cards — wrap into multiple rows for dense layers */}
              <div className="flex flex-wrap gap-3 flex-1">
                {group.nodes.map((node) => (
                  <div
                    key={node._key}
                    ref={(el) => { refs.current.set(node._key, el); }}
                    className={`border ${s.border} ${s.bg} bg-background rounded-sm px-3 py-2.5 min-w-[96px] max-w-[160px]`}
                  >
                    <div className={`font-mono text-[11px] font-semibold ${s.accent} leading-snug`}>
                      {node.label}
                    </div>
                    {node.note && (
                      <div className={`font-mono text-[10px] ${s.accent} opacity-50 mt-0.5 leading-tight`}>
                        {node.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
