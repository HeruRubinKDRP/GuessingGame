import {useEffect} from "react";

/**
 * useNumericKeyboardInput
 * Registers global keyboard handlers for numeric entry controls.
 * Useful when keypad behavior should work without input focus.
 *
 * Config callbacks:
 * - onDigit(key): called for number keys 0-9.
 * - onBackspace(): called for Backspace.
 * - onClear(): called for Delete.
 * - onEnter(): called for Enter.
 * - isEnabled: toggles listener registration.
 */


export default function useNumericKeyboardInput({
    onEnter,
    onDigit,
    onBackspace,
    onClear,
    isEnabled = true,
} = {}) {
    useEffect(() => {
        // Skip registering listeners when the feature is disabled.
        if (!isEnabled) {
            return;
        }

        function handleGlobalKeyDown(e) {
            // Ignore browser/application shortcut combinations.
            if (e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }

            // Append digit input.
            if (/^[0-9]$/.test(e.key)) {
                e.preventDefault();
                if (onDigit) {
                    onDigit(e.key);
                }
                return;
            }

            // Remove one character from current value.
            // very simplified keyboard interaction to support gameplay
            // not making MS Word so just removing the last number
            if (e.key === "Backspace") {
                e.preventDefault();
                if (onBackspace) {
                    onBackspace();
                }
                return;
            }

            // Clear current value totally.
            if (e.key === "Delete") {
                e.preventDefault();
                if (onClear) {
                    onClear();
                }
                return;
            }

            // Submit action.
            if (e.key === "Enter") {
                e.preventDefault();
                if (onEnter) {
                    onEnter();
                }
            }
        }

        // Register/unregister global handler with the effect lifecycle.
        // this way it's the best of both worlds, I can keep all the
        //keyboard related stuff managed by this hook, in one place
        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => {
            window.removeEventListener("keydown", handleGlobalKeyDown);
        };
    }, [isEnabled, onBackspace, onClear, onDigit, onEnter]);
}

