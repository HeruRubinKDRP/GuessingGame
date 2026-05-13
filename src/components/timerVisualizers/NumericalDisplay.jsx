import styles from "./TimerVisualizers.module.css";

/**
 * Converts raw seconds into mm:ss for visual timer readouts.
 * It's clamped to 0+ and rounded down so no negative or fractional display haappens.
 */
function formatTime(seconds) {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;

    return `${mins}:${String(secs).padStart(2, "0")}`;
}

/**
 * NumericalDisplay
 * Reusable timer text used by all visualizers.
 * this way it's in one place to keep simpler rather than handling it in each timer
 *
 * Props:
 * - label: optional descriptor shown above the time
 * - seconds: numeric duration to render as mm:ss
 */
export function NumericalDisplay({ label, seconds }) {
    return (
        <div className={styles.numericalDisplay}>
            {label && <p>{label}</p>}
            <strong>{formatTime(seconds)}</strong>
        </div>
    );
}