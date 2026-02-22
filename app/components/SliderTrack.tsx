import BlackDot from "./BlackDot";

interface SliderTrackProps {
  tickPositions: number[];
}

export default function SliderTrack({ tickPositions }: SliderTrackProps) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '2px',
      background: '#D8D8D8'
    }}>
      {tickPositions.map((position, index) => (
        <BlackDot
          key={index}
          style={{ left: `${position}%` }}
          className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
          size={12}
        />
      ))}
    </div>
  );
}
