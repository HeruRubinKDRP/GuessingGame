import styles from "./TimerVisualizers.module.css";
import { NumericalDisplay } from "./NumericalDisplay";

export function IntervalVisualizer({ block, runtime }) {
    const pairDuration = block.workSeconds + block.restSeconds;
    const workPercent = (block.workSeconds / pairDuration) * 100;
    const restPercent = (block.restSeconds / pairDuration) * 100;

    return (
        <div className={styles.visualizer}>
            <NumericalDisplay
                label={`${runtime.phaseLabel} ${runtime.currentRound} of ${block.rounds}`}
                seconds={runtime.currentStepRemaining}
            />

            <div className={styles.intervalBars}>
                {Array.from({ length: block.rounds }).map((_, index) => {
                    const isPast = index < runtime.currentRound - 1;
                    const isCurrent = index === runtime.currentRound - 1;

                    return (
                        <div className={styles.intervalPair} key={index}>
                            <div
                                className={styles.workSegment}
                                style={{ height: `${workPercent}%` }}
                            >
                                {(isPast || (isCurrent && runtime.phase === "work")) && (
                                    <div
                                        className={styles.segmentFill}
                                        style={{
                                            height: isPast
                                                ? "100%"
                                                : `${runtime.currentStepProgress * 100}%`,
                                        }}
                                    />
                                )}
                            </div>

                            <div
                                className={styles.restSegment}
                                style={{ height: `${restPercent}%` }}
                            >
                                {(isPast || (isCurrent && runtime.phase === "rest")) && (
                                    <div
                                        className={styles.segmentFill}
                                        style={{
                                            height: isPast
                                                ? "100%"
                                                : `${runtime.currentStepProgress * 100}%`,
                                        }}
                                    />
                                )}
                            </div>

                            <span>{index + 1}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}