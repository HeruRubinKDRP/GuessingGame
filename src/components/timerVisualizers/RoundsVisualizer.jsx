import styles from "./TimerVisualizers.module.css";
import { NumericalDisplay } from "./NumericalDisplay";

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
                    const isPast = index < runtime.currentRound - 1;
                    const isCurrent = index === runtime.currentRound - 1;

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