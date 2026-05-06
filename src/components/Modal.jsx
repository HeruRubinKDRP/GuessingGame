import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button.jsx";

/**
 * Modal
 * Renders modal content above the app using a portal and plays a short
 * close animation before notifying the parent to unmount.
 *
 * Props:
 * - children: modal body content.
 * - onClose: callback fired after close animation finishes.
 * - showDismissButton: toggles the footer dismiss button.
 */



export function Modal({ children, onClose, showDismissButton = true }) {
    const [isClosing, setIsClosing] = useState(false);

    function handleClose() {
        // Trigger CSS closing state first so the exit animation can play.
        setIsClosing(true);

        setTimeout(() => {
            onClose();
        }, 250);
    }

    return createPortal(
        <div className={`modalOverlay ${isClosing ? "closing" : ""}`}>
            <div className={`modalCard ${isClosing ? "closing" : ""}`}>
                <button className="modalXButton" onClick={handleClose}>
                    ×
                </button>

                <div className="modalContent">{children}</div>

                {/* Optional footer action for modals that support plain dismiss. */}
                {showDismissButton && (
                    <Button className="dismissButton" onClick={handleClose}>
                        Dismiss
                    </Button>
                )}
            </div>
        </div>,
        // Render at document root level to avoid parent stacking/overflow issues.
        document.body
    );
}