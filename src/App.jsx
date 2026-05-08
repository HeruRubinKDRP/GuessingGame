import { useState } from "react";
import styles from "./App.module.css";
import { starterWorkout } from "./data/starterWorkout";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { TimerChainEditor } from "./components/TimerChainEditor";
import { TimerRunner } from "./components/TimerRunner";

export default function App() {
    const [workout, setWorkout] = useLocalStorage("workout-timer-chain", starterWorkout);
    const [mode, setMode] = useState("edit");

    return (
        <main className={styles.app}>
            <header className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>Workout Builder</p>
                    <h1>{workout.name}</h1>
                </div>

                <button
                    className={styles.primaryButton}
                    onClick={() => setMode(mode === "edit" ? "run" : "edit")}
                >
                    {mode === "edit" ? "Start Workout" : "Edit Workout"}
                </button>
            </header>

            {mode === "edit" ? (
                <TimerChainEditor workout={workout} setWorkout={setWorkout} />
            ) : (
                <TimerRunner workout={workout} />
            )}
        </main>
    );
}