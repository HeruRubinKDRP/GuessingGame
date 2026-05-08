import { useEffect, useMemo, useState } from "react";
import styles from "../App.module.css";
import { TimerVisualizer } from "./timerVisualizers/TimerVisualizer";
import { WorkoutOverviewBar } from "./timerVisualizers/WorkoutOverviewBar.jsx";

function expandWorkout(blocks) {
    return blocks.flatMap((block) => {
        if (block.type === "countdown") {
            return [
                {
                    blockId: block.id,
                    blockType: block.type,
                    block,
                    label: block.name,
                    seconds: block.seconds,
                    localStepIndex: 0,
                    phase: "countdown",
                    round: 1,
                },
            ];
        }

        if (block.type === "ladder") {
            return Array.from({ length: block.rounds }).map((_, index) => ({
                blockId: block.id,
                blockType: block.type,
                block,
                label: `${block.name} - Step ${index + 1}`,
                seconds: block.startSeconds + block.stepSeconds * index,
                localStepIndex: index,
                phase: "ladder",
                round: index + 1,
            }));
        }

        if (block.type === "rounds") {
            return Array.from({ length: block.rounds }).flatMap((_, index) => [
                {
                    blockId: block.id,
                    blockType: block.type,
                    block,
                    label: `${block.name} - Round ${index + 1}`,
                    seconds: block.roundSeconds,
                    localStepIndex: index * 2,
                    phase: "round",
                    round: index + 1,
                },
                {
                    blockId: block.id,
                    blockType: block.type,
                    block,
                    label: `${block.name} - Rest ${index + 1}`,
                    seconds: block.restSeconds,
                    localStepIndex: index * 2 + 1,
                    phase: "rest",
                    round: index + 1,
                },
            ]);
        }

        if (block.type === "interval") {
            //flatMap is same as calling .map and .flat
            return Array.from({ length: block.rounds }).flatMap((_, index) => [
                {
                    blockId: block.id,
                    blockType: block.type,
                    block,
                    label: `${block.name} - Work ${index + 1}`,
                    seconds: block.workSeconds,
                    localStepIndex: index * 2,
                    phase: "work",
                    phaseLabel: "Work",
                    round: index + 1,
                },
                {
                    blockId: block.id,
                    blockType: block.type,
                    block,
                    label: `${block.name} - Rest ${index + 1}`,
                    seconds: block.restSeconds,
                    localStepIndex: index * 2 + 1,
                    phase: "rest",
                    phaseLabel: "Rest",
                    round: index + 1,
                },
            ]);
        }

        return [];
    });
}

function getBlockSteps(timeline, blockId) {
    return timeline.filter((step) => step.blockId === blockId);
}

function getBlockElapsed(blockSteps, currentStep, secondsLeft) {
    let elapsed = 0;

    for (const step of blockSteps) {
        if (step === currentStep) {
            elapsed += step.seconds - secondsLeft;
            break;
        }

        elapsed += step.seconds;
    }

    return elapsed;
}

function formatTime(seconds) {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;

    return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function TimerRunner({ workout }) {
    const timeline = useMemo(() => expandWorkout(workout.blocks), [workout.blocks]);

    const [stepIndex, setStepIndex] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(timeline[0]?.seconds ?? 0);
    const [isRunning, setIsRunning] = useState(false);

    const currentStep = timeline[stepIndex];
    const activeBlock = currentStep?.block;

    const blockSteps = currentStep
        ? getBlockSteps(timeline, currentStep.blockId)
        : [];

    const blockDuration = blockSteps.reduce((total, step) => total + step.seconds, 0);
    const blockElapsed = currentStep
        ? getBlockElapsed(blockSteps, currentStep, secondsLeft)
        : 0;

    const currentStepElapsed = currentStep ? currentStep.seconds - secondsLeft : 0;
    const currentStepDuration = currentStep?.seconds ?? 0;

    const runtime = {
        globalStepIndex: stepIndex,
        totalGlobalSteps: timeline.length,

        currentStepIndex: currentStep?.localStepIndex ?? 0,
        currentStepElapsed,
        currentStepDuration,
        currentStepRemaining: secondsLeft,
        currentStepProgress: currentStepDuration
            ? currentStepElapsed / currentStepDuration
            : 0,

        blockElapsed,
        blockDuration,
        blockProgress: blockDuration ? blockElapsed / blockDuration : 0,

        phase: currentStep?.phase,
        phaseLabel: currentStep?.phaseLabel ?? currentStep?.phase,
        currentRound: currentStep?.round ?? 1,
        currentRoundProgress: currentStepDuration
            ? currentStepElapsed / currentStepDuration
            : 0,
    };

    useEffect(() => {
        setStepIndex(0);
        setSecondsLeft(timeline[0]?.seconds ?? 0);
        setIsRunning(false);
    }, [timeline]);

    useEffect(() => {
        if (!isRunning || !currentStep) return;

        const intervalId = setInterval(() => {
            setSecondsLeft((previousSeconds) => {
                if (previousSeconds > 1) {
                    return previousSeconds - 1;
                }

                const nextIndex = stepIndex + 1;

                if (nextIndex >= timeline.length) {
                    setIsRunning(false);
                    return 0;
                }

                setStepIndex(nextIndex);
                return timeline[nextIndex].seconds;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning, currentStep, stepIndex, timeline]);

    function resetTimer() {
        setStepIndex(0);
        setSecondsLeft(timeline[0]?.seconds ?? 0);
        setIsRunning(false);
    }

    function skipNext() {
        const nextIndex = stepIndex + 1;

        if (nextIndex >= timeline.length) {
            setIsRunning(false);
            setSecondsLeft(0);
            return;
        }

        setStepIndex(nextIndex);
        setSecondsLeft(timeline[nextIndex].seconds);
    }

    function skipPrevious() {
        const previousIndex = Math.max(0, stepIndex - 1);

        setStepIndex(previousIndex);
        setSecondsLeft(timeline[previousIndex].seconds);
    }

    if (!timeline.length) {
        return <section className={styles.panel}>Add timers before starting.</section>;
    }

    return (
        <section className={styles.runner}>
            <p className={styles.eyebrow}>
                Step {stepIndex + 1} of {timeline.length}
            </p>

            <h2>{currentStep?.label}</h2>

            <TimerVisualizer block={activeBlock} runtime={runtime} />

            <p className={styles.runnerMeta}>
                Full workout remaining:{" "}
                {formatTime(
                    timeline
                        .slice(stepIndex)
                        .reduce((total, step, index) => {
                            if (index === 0) return total + secondsLeft;
                            return total + step.seconds;
                        }, 0)
                )}
            </p>

            <div className={styles.runnerActions}>
                <button onClick={() => setIsRunning((value) => !value)}>
                    {isRunning ? "Pause" : "Start"}
                </button>

                <button onClick={skipPrevious}>Previous</button>
                <button onClick={skipNext}>Next</button>
                <button onClick={resetTimer}>Reset</button>
            </div>

            <WorkoutOverviewBar timeline={timeline} runtime={runtime} />
        </section>
    );
}