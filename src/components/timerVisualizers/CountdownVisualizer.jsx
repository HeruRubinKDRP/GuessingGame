import styles from "./TimerVisualizers.module.css";
import { NumericalDisplay } from "./NumericalDisplay";

/**
 * CountdownVisualizer
 * Renders one simple countdown block with:
 * - current step time remaining
 * - total block time remaining
 * - a horizontal progress indicator for the block in the workout chain (haha not blockchain)
 *
 * Props:
 * - block: the countdown block definition (expects at least `name`)
 * - runtime: live timer runtime values from TimerRunner:
 *   - currentStepRemaining: seconds left in the active countdown step
 *   - blockDuration: total seconds for this block
 *   - blockElapsed: elapsed seconds inside this block
 *   - blockProgress: normalized block progress from 0 to 1
 */
export function CountdownVisualizer({ block, runtime }) {
    return (
        <div className={styles.visualizer}>
            <NumericalDisplay label={block.name} seconds={runtime.currentStepRemaining} />

            <NumericalDisplay
                label="Total Remaining"
                seconds={runtime.blockDuration - runtime.blockElapsed}
            />

            <div className={styles.horizontalTrack}>
                {/* Fill width is driven by normalized progress (0..1) from runtime. */}
                <div
                    className={styles.horizontalFill}
                    style={{ width: `${runtime.blockProgress * 100}%` }}
                />
            </div>
        </div>
    );
}