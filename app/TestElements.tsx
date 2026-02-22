"use client";

import SliderRow from "./components/SliderRow";

export default function TestElements() {
    return (
        <div
            className="w-screen "
        >
            <SliderRow
                leftLabel="Abstract"
                rightLabel="Realistic"
                tickPositions={[0, 25, 50, 75, 100]}
                knobPosition={30}
                onKnobPositionChange={() => { }}
                onKnobHover={() => { }}
            />
        </div>

    )
}
