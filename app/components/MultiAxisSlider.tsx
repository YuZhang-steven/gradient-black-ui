import { useState, useRef, useEffect } from 'react';
import SliderRow from './SliderRow';
import GlowCanvas from './GlowCanvas';

interface SliderConfig {
  leftLabel: string;
  rightLabel: string;
  ticks: number[];
  defaultPosition: number;
}

const SLIDER_DATA: SliderConfig[] = [
  { leftLabel: 'Abstract', rightLabel: 'Realistic', ticks: [0, 25, 50, 75, 100], defaultPosition: 30 },
  { leftLabel: 'Warm', rightLabel: 'Cool', ticks: [0, 33, 66, 100], defaultPosition: 65 },
  { leftLabel: 'Bold', rightLabel: 'Subtle', ticks: [0, 25, 50, 75, 100], defaultPosition: 75 },
  { leftLabel: 'Textured', rightLabel: 'Smooth', ticks: [0, 33, 66, 100], defaultPosition: 45 },
  { leftLabel: 'Expressive', rightLabel: 'Controlled', ticks: [0, 25, 50, 75, 100], defaultPosition: 55 }
];

export default function MultiAxisSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [knobPositions, setKnobPositions] = useState<number[]>(
    SLIDER_DATA.map(slider => slider.defaultPosition)
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [knobScreenPositions, setKnobScreenPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const updateKnobScreenPositions = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const knobElements = containerRef.current.querySelectorAll('.knob-container');

      const positions = Array.from(knobElements).map(knobEl => {
        const rect = knobEl.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left + 100,
          y: rect.top + rect.height / 2 - containerRect.top + 100
        };
      });

      setKnobScreenPositions(positions);
    };

    updateKnobScreenPositions();
    const interval = setInterval(updateKnobScreenPositions, 16);

    window.addEventListener('resize', updateKnobScreenPositions);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateKnobScreenPositions);
    };
  }, [knobPositions]);

  const handleKnobPositionChange = (index: number, position: number) => {
    const newPositions = [...knobPositions];
    newPositions[index] = position;
    setKnobPositions(newPositions);
  };

  const handleKnobHover = (index: number, isHovered: boolean) => {
    setHoveredIndex(isHovered ? index : null);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '900px',
        position: 'relative',
        paddingTop: '100px',
        paddingBottom: '100px'
      }}
    >
      <GlowCanvas
        knobPositions={knobScreenPositions}
        hoveredIndex={hoveredIndex}
        containerRef={containerRef}
      />

      {SLIDER_DATA.map((slider, index) => (
        <SliderRow
          key={index}
          leftLabel={slider.leftLabel}
          rightLabel={slider.rightLabel}
          tickPositions={slider.ticks}
          knobPosition={knobPositions[index]}
          onKnobPositionChange={(pos) => handleKnobPositionChange(index, pos)}
          onKnobHover={(isHovered) => handleKnobHover(index, isHovered)}
        />
      ))}
    </div>
  );
}
