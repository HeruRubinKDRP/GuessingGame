import styles from "./TimerVisualizers.module.css";

function formatTime(seconds) {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;

    return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function NumericalDisplay({ label, seconds }) {
    return (
        <div className={styles.numericalDisplay}>
            {label && <p>{label}</p>}
            <strong>{formatTime(seconds)}</strong>
        </div>
    );
}