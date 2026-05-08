import { CountdownVisualizer } from "./CountdownVisualizer";
import { LadderVisualizer } from "./LadderVisualizer";
import { RoundsVisualizer } from "./RoundsVisualizer";
import { IntervalVisualizer } from "./IntervalVisualizer";

export function TimerVisualizer({ block, runtime }) {
    if (!block) return null;

    if (block.type === "countdown") {
        return <CountdownVisualizer block={block} runtime={runtime} />;
    }

    if (block.type === "ladder") {
        return <LadderVisualizer block={block} runtime={runtime} />;
    }

    if (block.type === "rounds") {
        return <RoundsVisualizer block={block} runtime={runtime} />;
    }

    if (block.type === "interval") {
        return <IntervalVisualizer block={block} runtime={runtime} />;
    }

    return null;
}