"use client";
import { useRef } from 'react';
import SliderTrack from './SliderTrack';
import SliderKnob from './SliderKnob';

interface SliderRowProps {
  leftLabel: string;
  rightLabel: string;
  tickPositions: number[];
  knobPosition: number;
  onKnobPositionChange: (position: number) => void;
  onKnobHover: (isHovered: boolean) => void;
}

export default function SliderRow({
  leftLabel,
  rightLabel,
  tickPositions,
  knobPosition,
  onKnobPositionChange,
  onKnobHover
}: SliderRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{
      position: 'relative',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '60px',
      zIndex: 2
    }}>
      <div style={{
        textTransform: 'uppercase',
        fontSize: '11px',
        letterSpacing: '0.3px',
        color: '#000',
        fontWeight: 500,
        width: '140px',
        textAlign: 'right',
        paddingRight: '40px',
        whiteSpace: 'nowrap'
      }}>
        {leftLabel}
      </div>

      <div ref={trackRef} style={{
        flex: 1,
        position: 'relative',
        height: '80px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <SliderTrack tickPositions={tickPositions} />
        <SliderKnob
          position={knobPosition}
          onPositionChange={onKnobPositionChange}
          tickPositions={tickPositions}
          onHover={onKnobHover}
          trackRef={trackRef}
        />
      </div>

      <div style={{
        textTransform: 'uppercase',
        fontSize: '11px',
        letterSpacing: '0.3px',
        color: '#000',
        fontWeight: 500,
        width: '140px',
        textAlign: 'left',
        paddingLeft: '40px',
        whiteSpace: 'nowrap'
      }}>
        {rightLabel}
      </div>
    </div>
  );
}
