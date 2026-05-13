import { CountdownVisualizer } from "./CountdownVisualizer";
import { LadderVisualizer } from "./LadderVisualizer";
import { RoundsVisualizer } from "./RoundsVisualizer";
import { IntervalVisualizer } from "./IntervalVisualizer";

/**
 * TimerVisualizer
 * handdlesselecting the correct visualizer for the active block type in the
 * user's chain of timers.
 *
 * Props:
 * - block: current timer block object (must include `type`)
 * - runtime: shared live timer state from TimerRunner; forwarded unchanged to child visualizers
 *
 * Returns null when no block is active or type is unsupported.
 */
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