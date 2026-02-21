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
        <div
          key={index}
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            background: '#000',
            borderRadius: '50%',
            top: '50%',
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
}
