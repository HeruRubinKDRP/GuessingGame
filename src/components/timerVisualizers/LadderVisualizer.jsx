import styles from "./TimerVisualizers.module.css";
import { NumericalDisplay } from "./NumericalDisplay";

/**
 * LadderVisualizer
 * Renders a ladder timer where each step gets longer by a fixed increment.
 *
 * How it works:
 * - top display shows the active step label and remaining seconds
 * - each bar represents one ladder step in order
 * - completed steps render as fully filled bars
 * - active step renders a partial fill based on current progress
 *
 * Props:
 * - block: ladder configuration with `name`, `rounds`, `startSeconds`, `stepSeconds`
 * - runtime: live values from TimerRunner, using
 *   - currentStepRemaining
 *   - currentStepIndex
 *   - currentStepElapsed
 */
export function LadderVisualizer({ block, runtime }) {
    // Build each ladder step duration: start + (step increment * index).
    const steps = Array.from({ length: block.rounds }).map((_, index) => {
        const duration = block.startSeconds + block.stepSeconds * index;
        return { index, duration };
    });

    return (
        <div className={styles.visualizer}>
            <NumericalDisplay label={block.name} seconds={runtime.currentStepRemaining} />

            <div className={styles.ladderBars}>
                {steps.map((step, index) => {
                    const isPast = index < runtime.currentStepIndex;
                    const isCurrent = index === runtime.currentStepIndex;

                    // Fill is normalized to 0..1, then converted to percent for CSS height.
                    let fill = 0;

                    if (isPast) fill = 1;
                    if (isCurrent) fill = runtime.currentStepElapsed / step.duration;

                    return (
                        <div className={styles.ladderBar} key={step.index}>
                            <div
                                className={styles.verticalFill}
                                style={{ height: `${fill * 100}%` }}
                            />
                            <span>{index + 1}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}