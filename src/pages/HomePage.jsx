import { Link } from "react-router-dom";
import styles from "../App.module.css";

export function HomePage() {
    return (
        <main className={styles.app}>
            <section className={styles.homePanel}>
                <p className={styles.eyebrow}>TempoMo Timer Chains</p>
                <h1>Build and run custom workout timers</h1>

                <p className={styles.homeCopy}>
                    Create a chain of timer blocks for warmups, intervals, rounds, ladders,
                    and cooldowns. Reorder or edit each block, then switch to run mode when
                    you are ready to train.
                </p>

                <Link to="/timer" className={styles.primaryLink}>
                    Create a Timer Chain
                </Link>
            </section>
        </main>
    );
}

