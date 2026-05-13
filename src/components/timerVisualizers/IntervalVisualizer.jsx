import styles from "./TimerVisualizers.module.css";
import { NumericalDisplay } from "./NumericalDisplay";

/**
 * IntervalVisualizer
 * Displays a work/rest interval block across multiple rounds.
 *
 * How the UI works:
 * - top numerical readout shows current phase and round with remaining seconds
 * - each round is rendered as a pair of stacked segments (work + rest)
 * - completed rounds are fully filled; current round fills only the active phase
 *
 * Props:
 * - block: interval block configuration
 *   - workSeconds, restSeconds, rounds
 * - runtime: live state from TimerRunner
 *   - phase / phaseLabel, currentRound, currentStepRemaining, currentStepProgress
 */
export function IntervalVisualizer({ block, runtime }) {
    // Keep work/rest segment heights proportional to their durations.
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
                    // Round status controls whether segment fill is full, partial, or empty.
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