import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

// Viewport: 900 × 490
const NODES = {
  inputs: [
    { x: 20,  y: 30, w: 248, h: 60, label: "Documents",  sub: "PDF · Notion · Drive"    },
    { x: 326, y: 30, w: 248, h: 60, label: "Live APIs",   sub: "REST · GraphQL · gRPC"   },
    { x: 632, y: 30, w: 248, h: 60, label: "Databases",   sub: "SQL · NoSQL · Vector"     },
  ],
  process: { x: 20, y: 158, w: 860, h: 64, label: "Data Pipeline", sub: "Ingest · Chunk · Embed · Normalise" },
  intel:   { x: 20, y: 282, w: 860, h: 80, label: "AI Intelligence", sub: "LLMs · Agents · RAG · Memory · Tool Use" },
  outputs: [
    { x: 20,  y: 414, w: 248, h: 60, label: "Dashboards", sub: "Real-time · Interactive" },
    { x: 326, y: 414, w: 248, h: 60, label: "Webhooks",   sub: "Slack · Email · CRM"     },
    { x: 632, y: 414, w: 248, h: 60, label: "API Output", sub: "REST · Streaming · SDK"  },
  ],
};

// Centre x of each input/output (mid of rect)
const cx = (n: { x: number; w: number }) => n.x + n.w / 2;

const pathVariants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: (d: number) => ({ pathLength: 1, opacity: 1, transition: { duration: 1.2, delay: d, ease: "easeInOut" as const } }),
};

const nodeVariants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: (d: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } }),
};

function Box({ x, y, w, h, label, sub, delay }: { x:number; y:number; w:number; h:number; label:string; sub:string; delay:number }) {
  const midX = x + w / 2;
  const midY = y + h / 2;
  return (
    <motion.g custom={delay} variants={nodeVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <rect x={x} y={y} width={w} height={h} rx={2}
        fill="hsl(var(--card))" stroke="hsl(var(--grey-mid))" strokeWidth="1" />
      <text x={midX} y={midY - 7} textAnchor="middle" fontFamily="'IBM Plex Mono'" fontSize="11"
        fill="hsl(var(--foreground))" fontWeight="500">{label}</text>
      <text x={midX} y={midY + 10} textAnchor="middle" fontFamily="'IBM Plex Mono'" fontSize="8.5"
        fill="hsl(var(--grey-text))">{sub}</text>
    </motion.g>
  );
}

function WideBox({ node, delay, accent }: { node: typeof NODES.process; delay: number; accent?: boolean }) {
  const { x, y, w, h, label, sub } = node;
  const midX = x + w / 2;
  const midY = y + h / 2;
  return (
    <motion.g custom={delay} variants={nodeVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <rect x={x} y={y} width={w} height={h} rx={2}
        fill={accent ? "hsl(var(--primary)/0.06)" : "hsl(var(--grey-light))"}
        stroke={accent ? "hsl(var(--primary)/0.4)" : "hsl(var(--grey-mid))"} strokeWidth="1" />
      <text x={midX} y={midY - 8} textAnchor="middle" fontFamily="'IBM Plex Mono'" fontSize="12"
        fill={accent ? "hsl(var(--primary))" : "hsl(var(--foreground))"} fontWeight="500">{label}</text>
      <text x={midX} y={midY + 10} textAnchor="middle" fontFamily="'IBM Plex Mono'" fontSize="9"
        fill="hsl(var(--grey-text))">{sub}</text>
    </motion.g>
  );
}

export default function ArchDiagram() {
  const n = NODES;
  const procTop    = n.process.y;
  const procBot    = n.process.y + n.process.h;
  const intelTop   = n.intel.y;
  const intelBot   = n.intel.y + n.intel.h;

  const CONNECTIONS = [
    // Inputs → Process
    { d: `M ${cx(n.inputs[0])} 90 L ${cx(n.inputs[0])} ${procTop}`, delay: 0.5 },
    { d: `M ${cx(n.inputs[1])} 90 L ${cx(n.inputs[1])} ${procTop}`, delay: 0.6 },
    { d: `M ${cx(n.inputs[2])} 90 L ${cx(n.inputs[2])} ${procTop}`, delay: 0.7 },
    // Process → Intel
    { d: `M ${cx(n.process)} ${procBot} L ${cx(n.process)} ${intelTop}`, delay: 0.9 },
    // Intel → Outputs
    { d: `M ${cx(n.outputs[0])} ${intelBot} L ${cx(n.outputs[0])} 414`, delay: 1.1 },
    { d: `M ${cx(n.outputs[1])} ${intelBot} L ${cx(n.outputs[1])} 414`, delay: 1.2 },
    { d: `M ${cx(n.outputs[2])} ${intelBot} L ${cx(n.outputs[2])} 414`, delay: 1.3 },
  ];

  return (
    <section className="section-padding bg-grey-light">
      <div className="max-w-[1200px] mx-auto">

        <ScrollReveal>
          <p className="section-label mb-5">System Architecture</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <h2 className="font-display text-[38px] md:text-[52px] font-medium text-foreground leading-[1.02] max-w-[480px]">
              Every system we build follows a four-layer model.
            </h2>
            <p className="font-body text-[15px] text-grey-text max-w-[360px] leading-[1.7]">
              Data in. Intelligence through the middle. Useful output at the
              edge — integrated directly into the tools your team already uses.
            </p>
          </div>
        </ScrollReveal>

        {/* Diagram */}
        <div className="bg-card border border-grey-mid p-6 md:p-10 overflow-x-auto">
          <svg
            viewBox="0 0 900 490"
            preserveAspectRatio="xMidYMid meet"
            className="w-full"
            style={{ minWidth: 480 }}
          >
            {/* Connection paths */}
            {CONNECTIONS.map((c, i) => (
              <motion.path
                key={i}
                d={c.d}
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                fill="none"
                strokeDasharray="3 3"
                custom={c.delay}
                variants={pathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            ))}

            {/* Row labels */}
            {[
              { label: "INPUT",        y: 16 },
              { label: "PROCESSING",   y: 150 },
              { label: "INTELLIGENCE", y: 274 },
              { label: "OUTPUT",       y: 400 },
            ].map((r) => (
              <text key={r.label} x={900} y={r.y}
                textAnchor="end" fontFamily="'IBM Plex Mono'" fontSize="8"
                fill="hsl(var(--grey-text))" letterSpacing="0.1em">{r.label}</text>
            ))}

            {/* Input boxes */}
            {n.inputs.map((node, i) => (
              <Box key={i} {...node} delay={i * 0.1} />
            ))}

            {/* Processing box */}
            <WideBox node={n.process} delay={0.4} />

            {/* Intelligence box */}
            <WideBox node={n.intel} delay={0.8} accent />

            {/* Output boxes */}
            {n.outputs.map((node, i) => (
              <Box key={i} {...node} delay={1.1 + i * 0.1} />
            ))}
          </svg>
        </div>

        {/* Footnote */}
        <ScrollReveal delay={0.2}>
          <p className="font-mono text-[11px] text-grey-text mt-6 text-center uppercase tracking-[0.1em]">
            Adapted per project — model selection, infra, and integration points vary by client
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
