"use client";
import { useRef, useEffect, useState } from "react";

interface SliderKnobProps {
  position: number;
  onPositionChange: (position: number) => void;
  tickPositions: number[];
  onHover: (isHovered: boolean) => void;
  trackRef: React.RefObject<HTMLDivElement | null>;
}

export default function SliderKnob({
  position,
  onPositionChange,
  tickPositions,
  onHover,
  trackRef,
}: SliderKnobProps) {
  const [currentPosition, setCurrentPosition] = useState(position);
  const isDraggingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  const snapToNearestTick = (percentage: number): number => {
    let nearest = tickPositions[0];
    let minDiff = Math.abs(percentage - nearest);

    for (let i = 1; i < tickPositions.length; i++) {
      const diff = Math.abs(percentage - tickPositions[i]);
      if (diff < minDiff) {
        minDiff = diff;
        nearest = tickPositions[i];
      }
    }

    return nearest;
  };

  const animateToSnap = (targetPercentage: number) => {
    const targetSnapped = snapToNearestTick(targetPercentage);
    const startPercentage = currentPosition;
    const startTime = Date.now();
    const duration = 250;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const current =
        startPercentage + (targetSnapped - startPercentage) * easeProgress;
      setCurrentPosition(current);
      onPositionChange(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !trackRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      const x = e.clientX - trackRect.left;
      const percentage = Math.max(
        0,
        Math.min(100, (x / trackRect.width) * 100),
      );

      setCurrentPosition(percentage);
      onPositionChange(percentage);
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        animateToSnap(currentPosition);
        isDraggingRef.current = false;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentPosition, onPositionChange, trackRef, tickPositions]);

  return (
    <div
      className="knob-container"
      style={{
        position: "absolute",
        top: "50%",
        left: `${currentPosition}%`,
        width: "40px",
        height: "40px",
        transform: "translate(-50%, -50%)",
        cursor: isDraggingRef.current ? "grabbing" : "grab",
        zIndex: 10,
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => !isDraggingRef.current && onHover(false)}>
      <div
        style={{
          width: "24px",
          height: "24px",
          background: "transparent",
          border: "1.5px solid #000",
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "all 0.05s ease-out",
        }}
      />
    </div>
  );
}
