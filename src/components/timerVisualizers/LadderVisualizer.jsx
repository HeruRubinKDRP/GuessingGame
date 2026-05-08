import styles from "./TimerVisualizers.module.css";
import { NumericalDisplay } from "./NumericalDisplay";

export function LadderVisualizer({ block, runtime }) {
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