
/**
 * NumberPad
 * Reusable numeric input control with 1–9, 0, clear, and backspace buttons.
 * Ideal for touch-friendly number entry in games or forms.
 *
 * Props:
 * - onDigit: callback(number) fired for 0–9 button clicks.
 * - onClear: callback() fired for the C-clear button.
 * - onBackspace: callback() fired for the backspace button.
 * - className: optional extra class can be passed in for layout overrides.
 * - disabled: boolean to disable all buttons, do't need it now but would come in handy for animations or secondary game modes/ mini games.
 * - backspaceContent: JSX/text to display in backspace button (icon or emoji or whatever).
 * - backspaceLabel: fallback text if backspaceContent not provided.
 */


export default function NumberPad({
    onDigit,
    onClear,
    onBackspace,
    className = "",
    disabled = false,
    backspaceContent,
    backspaceLabel = "Back",
}) {
    // Use provided JSX content if available; fall back to label text.
    const resolvedBackspaceContent = backspaceContent ?? backspaceLabel;

    return (
        <div className={`number-pad ${className}`.trim()}>
            {/* 1–9 digit buttons in a 3x3 grid. */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <button
                    key={number}
                    type="button"
                    disabled={disabled}
                    onClick={() => onDigit(String(number))}
                >
                    {number}
                </button>
            ))}

            {/* Clear input button. */}
            <button type="button" disabled={disabled} onClick={onClear}>
                C
            </button>
            {/* 0 digit button at bottom center. */}
            <button type="button" disabled={disabled} onClick={() => onDigit("0")}>
                0
            </button>
            {/* Backspace action with flexible content (icon or text). */}
            <button
                type="button"
                disabled={disabled}
                aria-label="Backspace"
                onClick={onBackspace}
            >
                {resolvedBackspaceContent}
            </button>
        </div>
    );
}
