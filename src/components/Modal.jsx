import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button.jsx";

export function Modal({ children, onClose, showDismissButton = true }) {
    const [isClosing, setIsClosing] = useState(false);

    function handleClose() {
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

                {showDismissButton && (
                    <Button className="dismissButton" onClick={handleClose}>
                        Dismiss
                    </Button>
                )}
            </div>
        </div>,
        document.body
    );
}