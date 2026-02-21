import { useEffect, useRef } from 'react';

const GLOW_COLORS = [
  { r: 255, g: 120, b: 50 },   // Orange
  { r: 80, g: 150, b: 255 },   // Blue
  { r: 255, g: 140, b: 80 },   // Orange
  { r: 100, g: 170, b: 255 },  // Blue
  { r: 255, g: 130, b: 60 }    // Orange
];

interface GlowCanvasProps {
  knobPositions: { x: number; y: number }[];
  hoveredIndex: number | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function drawGlow(
  ctx: CanvasRenderingContext2D,
  positions: { x: number; y: number }[],
  hoveredIdx: number | null
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (positions.length > 1) {
    for (let i = 0; i < positions.length - 1; i++) {
      const start = positions[i];
      const end = positions[i + 1];

      const color1 = GLOW_COLORS[i];
      const color2 = GLOW_COLORS[i + 1];

      const isStartHovered = hoveredIdx === i;
      const isEndHovered = hoveredIdx === i + 1;

      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const steps = Math.ceil(dist / 6);

      for (let step = 0; step <= steps; step++) {
        const t = step / steps;
        const x = start.x + dx * t;
        const y = start.y + dy * t;

        const centerDistance = Math.abs(t - 0.5) * 2;
        const widthAtEnds = 35;
        const widthAtCenter = Math.max(10, 35 - (dist - 80) / 4);
        const width = widthAtCenter + (widthAtEnds - widthAtCenter) * Math.pow(centerDistance, 1.5);

        let finalWidth = width;
        if (t < 0.2 && isStartHovered) {
          finalWidth *= 1.15;
        } else if (t > 0.8 && isEndHovered) {
          finalWidth *= 1.15;
        }

        const r = Math.round(color1.r + (color2.r - color1.r) * t);
        const g = Math.round(color1.g + (color2.g - color1.g) * t);
        const b = Math.round(color1.b + (color2.b - color1.b) * t);

        const baseAlpha = 0.2 + 0.1 * centerDistance;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, finalWidth);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${baseAlpha})`);
        gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${baseAlpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, finalWidth, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

export default function GlowCanvas({ knobPositions, hoveredIndex, containerRef }: GlowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    canvas.width = containerRect.width + 200;
    canvas.height = containerRect.height + 200;

    drawGlow(ctx, knobPositions, hoveredIndex);
  }, [knobPositions, hoveredIndex, containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1,
        marginLeft: '-100px',
        marginTop: '-100px'
      }}
    />
  );
}
