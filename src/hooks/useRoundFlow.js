import {useState} from "react";
import formatNumber from "../utilities/FormatNumber.js";

/**
 * useRoundFlow
 * this is the gameplay engine
 * Manages the active round lifecycle: guess validation, life animation,
 * win/loss detection, result modal state, and post-game navigation.
 *
 * Dependencies that get passed in:
 * - game / setGame-- active round state from useGuessGame.
 * - finishGame---- saves completed round to history.
 * - startGame- begins a fresh round.
 * - clearCurrentGame-- abandons the active round without saving.
 * - navigate-- react-router navigation function.
 * - guessInput / setGuessInput-- current typed value from useGuessInput.
 * - remainingGuesses--- pre-computed remaining life count for animation targeting.
 *
 * Returns:
 * - message--- current feedback text shown to the player.
 * - removingLifeIndex-- index of the life item being animated out.
 * - roundResult-- result data object when a round ends, null during play.
 * - submitGuess--- validates and processes the current guess.
 * - finishThenViewStats- closes result and navigates to stats.
 * - finishThenPlayAgain-- closes result and starts a new round.
 * - goToSettings-- abandons round and navigates to game settings.
 */


export default function useRoundFlow({
    game,
    setGame,
    finishGame,
    startGame,
    clearCurrentGame,
    navigate,
    guessInput,
    setGuessInput,
    remainingGuesses,
}) {
    //this is the message hint - high or low
    const [message, setMessage] = useState("Enter your first guess.");
    //manage lives aka guesses
    const [removingLifeIndex, setRemovingLifeIndex] = useState(null);
    // object that has if you won or lost and how many guess used vs available
    const [roundResult, setRoundResult] = useState(null);

    function finishThenViewStats() {
        setRoundResult(null);
        navigate("/stats");
    }

    function finishThenPlayAgain() {
        setRoundResult(null);
        startGame();
    }

    function goToSettings() {
        setRoundResult(null);
        clearCurrentGame();
        navigate("/");
    }

    function useLifeThen(callback) {
        // Animate the last remaining life out before committing state changes.
        setRemovingLifeIndex(remainingGuesses - 1);

        setTimeout(() => {
            setRemovingLifeIndex(null);
            callback();
        }, 450);
    }

    function submitGuess() {
        // Guard: no-op if called without an active game.
        if (!game) {
            return;
        }

        const guess = Number(guessInput);

        // Validate- non-empty input required.
        if (guessInput === "") {
            setMessage("Type a number first.");
            return;
        }

        // Validate-- guess must fall within the configured range.
        if (guess < game.min || guess > game.max) {
            setMessage(
                `Guess must be between ${formatNumber(game.min)} and ${formatNumber(
                    game.max
                )}.`
            );
            return;
        }

        const nextGuesses = [...game.guesses, guess];
        const won = guess === game.target;
        const lost = !won && nextGuesses.length >= game.allowedGuesses;

        // Wait for life animation to finish before committing outcome.
        useLifeThen(() => {
            if (won || lost) {
                // Round is over — save to history and show result modal.
                const finalGame = {
                    ...game,
                    guesses: nextGuesses,
                    won,
                };

                finishGame(finalGame);

                setRoundResult({
                    won,
                    target: game.target,
                    guessesUsed: nextGuesses.length,
                });
                return;
            }

            // Round continues — append guess and update hint message.
            setGame((prev) => ({
                ...prev,
                guesses: nextGuesses,
            }));

            setMessage(
                guess < game.target
                    ? `${formatNumber(guess)} is too low.`
                    : `${formatNumber(guess)} is too high.`
            );

            setGuessInput("");
        });
    }

    return {
        message,
        removingLifeIndex,
        roundResult,
        submitGuess,
        finishThenViewStats,
        finishThenPlayAgain,
        goToSettings,
    };
}

