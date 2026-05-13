import styles from "./TimerVisualizers.module.css";

/** Keep  percentages in a correct 0..100 range. */
function clampPercent(value) {
    return Math.max(0, Math.min(100, value));
}

/**---
 * WorkoutOverviewBar
 * Renders a horizontal bottom gizmo overview of the full expanded workout timeline.
 *
 * Props:
 * - timeline: ordered step list from TimerRunner, where each step includes
 *   `seconds`, `label`, `blockId`, and `localStepIndex`
 * - runtime: live playback state from TimerRunner, using
 *   `globalStepIndex`, `currentStepDuration`, and `currentStepElapsed`
 *
 * Behavior:
 * - each segment width is proportional to that step's duration
 * - past segments are fully filled
 * - current segment fills by current step progress
 */
export function WorkoutOverviewBar({ timeline, runtime }) {
    if (!timeline?.length) return null;

    const totalDuration = timeline.reduce((total, step) => total + Math.max(0, step.seconds), 0);

    return (
        <section className={styles.overviewWrap} aria-label="Workout timeline overview">
            <div className={styles.overviewTrack}>
                {timeline.map((step, index) => {
                    const safeStepSeconds = Math.max(0, step.seconds);
                    // Segment width reflects this step's share of total workout time.
                    const widthPercent = totalDuration
                        ? (safeStepSeconds / totalDuration) * 100
                        : 100 / timeline.length;

                    const isPast = index < runtime.globalStepIndex;
                    const isCurrent = index === runtime.globalStepIndex;

                    let fillPercent = 0;
                    if (isPast) fillPercent = 100;
                    // Active segment fill reflects elapsed time in current step.
                    if (isCurrent) fillPercent = runtime.currentStepDuration
                        ? (runtime.currentStepElapsed / runtime.currentStepDuration) * 100
                        : 0;

                    return (
                        <div
                            key={`${step.blockId}-${step.localStepIndex}-${index}`}
                            className={styles.overviewSegment}
                            style={{ width: `${clampPercent(widthPercent)}%` }}
                            title={`${step.label} (${step.seconds}s)`}
                        >
                            <div
                                className={styles.overviewFill}
                                style={{ width: `${clampPercent(fillPercent)}%` }}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

