import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import { TimerChainEditor } from "../components/TimerChainEditor";
import { TimerRunner } from "../components/TimerRunner";

export function TimerPage({ workout, setWorkout }) {
    const [mode, setMode] = useState("edit");

    return (
        <main className={styles.app}>
            <header className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>Workout Builder</p>
                    <h1>{workout.name}</h1>
                </div>

                <div className={styles.headerActions}>
                    <Link to="/" className={styles.secondaryLink}>
                        Home
                    </Link>

                    <button
                        className={styles.primaryButton}
                        onClick={() => setMode(mode === "edit" ? "run" : "edit")}
                    >
                        {mode === "edit" ? "Start Workout" : "Edit Workout"}
                    </button>
                </div>
            </header>

            {mode === "edit" ? (
                <TimerChainEditor workout={workout} setWorkout={setWorkout} />
            ) : (
                <TimerRunner workout={workout} />
            )}
        </main>
    );
}

