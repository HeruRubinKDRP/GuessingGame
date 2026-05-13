import styles from "./TimerVisualizers.module.css";
import { NumericalDisplay } from "./NumericalDisplay";

/**
 * RoundsVisualizer
 * Visualizes a fixed-number rounds block as a grid of round cells.
 *
 * UI how it works:
 * - top area display shows current round countdown
 * - secondary readout shows total block time remaining
 * - each cell fills vertically as rounds complete/progress
 *
 * Props:
 * - block: rounds block configuration (uses `rounds`)
 * - runtime: live timer values from TimerRunner (TimeRunner handles time so each module
 * can be focused on its responsibility), using
 *   - currentRound
 *   - currentStepRemaining
 *   - blockDuration / blockElapsed
 *   - currentRoundProgress (0..1 progress through active round)
 */
export function RoundsVisualizer({ block, runtime }) {
    return (
        <div className={styles.visualizer}>
            <NumericalDisplay
                label={`Round ${runtime.currentRound} of ${block.rounds}`}
                seconds={runtime.currentStepRemaining}
            />

            <NumericalDisplay
                label="Total Remaining"
                seconds={runtime.blockDuration - runtime.blockElapsed}
            />

            <div className={styles.roundGrid}>
                {Array.from({ length: block.rounds }).map((_, index) => {
                    // Determine round state: complete, active, or upcoming.
                    const isPast = index < runtime.currentRound - 1;
                    const isCurrent = index === runtime.currentRound - 1;

                    // Fill is normalized 0..1 then mapped to CSS percentage height.
                    let fill = 0;

                    if (isPast) fill = 1;
                    if (isCurrent) fill = runtime.currentRoundProgress;

                    return (
                        <div className={styles.roundCube} key={index}>
                            <div
                                className={styles.roundFill}
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