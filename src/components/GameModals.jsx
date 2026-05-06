import {Modal} from "./Modal.jsx";
import ResultCard from "./ResultCard.jsx";
import formatNumber from "../utilities/FormatNumber.js";

/**
 * GameModals
 * Renders end of each round modal UI for the game page.
 *
 * Props:
 * - roundResult: object with { won, target, guessesUsed } when a round ends.
 * - onViewStats: handler for closing/continuing to stats.
 * - onPlayAgain: handler to immediately start another round.
 * - onConfirmSettings: handler to return to game settings from the result modal.
 */


export default function GameModals({
    roundResult,
    onViewStats,
    onPlayAgain,
    onConfirmSettings,
}) {
    return (
        <>
            {/* Show the result modal only after a win/loss has been recorded. */}
            {roundResult && (
                <Modal onClose={onViewStats}>
                    <ResultCard
                        title={roundResult.won ? "You Won!" : "You Lost!"}
                        subtitle={`Target: ${formatNumber(
                            roundResult.target
                        )}. Guesses used: ${formatNumber(roundResult.guessesUsed)}.`}
                        onPlayAgain={onPlayAgain}
                        onViewStats={onViewStats}
                        onGameSettings={onConfirmSettings}
                    />
                </Modal>
            )}
        </>
    );
}

