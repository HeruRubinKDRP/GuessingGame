import styles from "./TimerVisualizers.module.css";
import { NumericalDisplay } from "./NumericalDisplay";

export function CountdownVisualizer({ block, runtime }) {
    return (
        <div className={styles.visualizer}>
            <NumericalDisplay label={block.name} seconds={runtime.currentStepRemaining} />

            <NumericalDisplay
                label="Total Remaining"
                seconds={runtime.blockDuration - runtime.blockElapsed}
            />

            <div className={styles.horizontalTrack}>
                <div
                    className={styles.horizontalFill}
                    style={{ width: `${runtime.blockProgress * 100}%` }}
                />
            </div>
        </div>
    );
}