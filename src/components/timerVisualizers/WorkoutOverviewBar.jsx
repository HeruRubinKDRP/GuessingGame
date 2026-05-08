import styles from "./TimerVisualizers.module.css";

function clampPercent(value) {
    return Math.max(0, Math.min(100, value));
}

export function WorkoutOverviewBar({ timeline, runtime }) {
    if (!timeline?.length) return null;

    const totalDuration = timeline.reduce((total, step) => total + Math.max(0, step.seconds), 0);

    return (
        <section className={styles.overviewWrap} aria-label="Workout timeline overview">
            <div className={styles.overviewTrack}>
                {timeline.map((step, index) => {
                    const safeStepSeconds = Math.max(0, step.seconds);
                    const widthPercent = totalDuration
                        ? (safeStepSeconds / totalDuration) * 100
                        : 100 / timeline.length;

                    const isPast = index < runtime.globalStepIndex;
                    const isCurrent = index === runtime.globalStepIndex;

                    let fillPercent = 0;
                    if (isPast) fillPercent = 100;
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

