type FlowNode = { label: string; note?: string };

export const FlowDiagram = ({ nodes }: { nodes: FlowNode[] }) => (
  <div className="mt-8 -mx-1">
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-grey-text mb-4">
      Architecture Flow
    </p>
    <div className="overflow-x-auto pb-2">
      <div className="flex items-center gap-0 min-w-max">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1 min-w-[110px] max-w-[140px]">
              <div className="w-full border border-grey-mid bg-card rounded-sm px-3 py-2.5 text-center">
                <div className="font-mono text-[12px] font-medium text-foreground leading-tight">
                  {node.label}
                </div>
                {node.note && (
                  <div className="font-mono text-[10px] text-grey-text mt-1 leading-tight">
                    {node.note}
                  </div>
                )}
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex items-center shrink-0 px-1 text-grey-text">
                <div className="w-5 h-px bg-grey-mid" />
                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="text-grey-mid">
                  <path d="M0 0L6 4L0 8V0Z" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
