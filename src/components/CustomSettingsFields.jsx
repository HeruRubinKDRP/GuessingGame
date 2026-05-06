/**
 * CustomSettingsFields
 * Renders the custom difficulty settings for min number, max number, and number of guesses.
 *
 * Props:
 * - settings: current settings object with numeric min/max/guesses values.
 * - onFieldChange: callback(field, value) used to push input changes back to parent state.
 */


export default function CustomSettingsFields({ settings, onFieldChange }) {
    return (
        <div className="custom-settings">
            {/* Numeric stepper for lower bound of the guessing range */}
            <label>
                Min
                <input
                    type="number"
                    step="1"
                    value={settings.min}
                    onChange={(e) => onFieldChange("min", e.target.value)}
                />
            </label>

            {/* Numeric stepper for upper bound of the guessing range */}
            <label>
                Max
                <input
                    type="number"
                    step="1"
                    value={settings.max}
                    onChange={(e) => onFieldChange("max", e.target.value)}
                />
            </label>

            {/* Number of attempts the player gets in a round */}
            <label>
                Guesses
                <input
                    type="number"
                    step="1"
                    min="0"
                    value={settings.guesses}
                    onChange={(e) => onFieldChange("guesses", e.target.value)}
                />
            </label>
        </div>
    );
}

