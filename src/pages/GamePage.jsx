import cleanNumber from "../utilities/cleanNumber.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import formatNumber from "../utilities/FormatNumber.js";
import Error from "../components/Error.jsx";
import {Modal} from "../components/Modal.jsx";
import ResultCard from "../components/ResultCard.jsx";

export default function GamePage({ game, setGame, finishGame, startGame, clearCurrentGame }) {
    const navigate = useNavigate();
    const [guessInput, setGuessInput] = useState("");
    const [message, setMessage] = useState("Enter your first guess.");
    const [removingLifeIndex, setRemovingLifeIndex] = useState(null);
    const [roundResult, setRoundResult] = useState(null);
    const [showSettingsConfirm, setShowSettingsConfirm] = useState(false);

    if (!game && !roundResult) {
        return <Error/>;
    }

    const remainingGuesses = game ? game.allowedGuesses - game.guesses.length : 0;
    const useHearts = game ? game.allowedGuesses <= 10 : false;

    function addDigit(digit) {
        setGuessInput((prev) => cleanNumber(prev + digit));
    }

    function backspace() {
        setGuessInput((prev) => prev.slice(0, -1));
    }

    function clearInput() {
        setGuessInput("");
    }

    function finishThenViewStats() {
        setRoundResult(null);
        navigate("/stats");
    }

    function finishThenPlayAgain() {
        setRoundResult(null);
        startGame();
    }

    function goToSettings() {
        setShowSettingsConfirm(false);
        setRoundResult(null);
        clearCurrentGame();
        navigate("/");
    }

    function useLifeThen(callback) {
        setRemovingLifeIndex(remainingGuesses - 1);

        setTimeout(() => {
            setRemovingLifeIndex(null);
            callback();
        }, 450);
    }

    function submitGuess() {
        const guess = Number(guessInput);

        if (guessInput === "") {
            setMessage("Type a number first.");
            return;
        }

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

        useLifeThen(() => {
            if (won || lost) {
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

    function handleKeyboardInput(e) {
        const allowedKeys = [
            "Backspace",
            "Enter",
            "Tab",
            "ArrowLeft",
            "ArrowRight",
            "Delete",
        ];

        if (e.key === "Enter") {
            e.preventDefault();
            submitGuess();
            return;
        }

        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    }

    return (
        <main className="page game-page">
            {game && (
                <section className="arcade-card game-card">
                    <div className="game-header">
                        <h2>Guess the Number</h2>
                        <p>
                            Range: {formatNumber(game.min)} - {formatNumber(game.max)}
                        </p>
                    </div>

                    <div className="life-bar">
                        {Array.from({ length: remainingGuesses }).map((_, index) => (
                            <span
                                key={index}
                                className={`life-item ${
                                    removingLifeIndex === index ? "life-used" : ""
                                } ${useHearts ? "heart" : "block-life"}`}
                            >
                  {useHearts ? "♥" : ""}
                </span>
                        ))}
                    </div>

                    <input
                        className="guess-input"
                        value={formatNumber(guessInput)}
                        onChange={(e) => setGuessInput(cleanNumber(e.target.value))}
                        onKeyDown={handleKeyboardInput}
                        inputMode="numeric"
                        placeholder="0"
                    />

                    <div className="number-pad">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                            <button key={number} onClick={() => addDigit(String(number))}>
                                {number}
                            </button>
                        ))}

                        <button onClick={clearInput}>C</button>
                        <button onClick={() => addDigit("0")}>0</button>
                        <button onClick={backspace}>⌫</button>
                    </div>

                    <button className="primary-button" onClick={submitGuess}>
                        Guess
                    </button>

                    <button
                        className="secondary-button"
                        onClick={() => setShowSettingsConfirm(true)}
                    >
                        Change Game Settings
                    </button>

                    <div className="result-area">{message}</div>
                </section>
            )}

            {roundResult && (
                <Modal onClose={finishThenViewStats}>
                    <ResultCard
                        title={roundResult.won ? "You Won!" : "You Lost!"}
                        subtitle={`Target: ${formatNumber(
                            roundResult.target
                        )}. Guesses used: ${formatNumber(roundResult.guessesUsed)}.`}
                        onPlayAgain={finishThenPlayAgain}
                        onViewStats={finishThenViewStats}
                    />
                </Modal>
            )}

            {showSettingsConfirm && (
                <Modal onClose={() => setShowSettingsConfirm(false)} showDismissButton={false}>
                    <section className="result-card">
                        <h2>Change Settings?</h2>
                        <p className="result-subtitle">
                            Your current round will end and you will return to the game setup
                            screen.
                        </p>

                        <div className="result-actions">
                            <button
                                className="secondary-button"
                                onClick={() => setShowSettingsConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button className="primary-button" onClick={goToSettings}>
                                Game Settings
                            </button>
                        </div>
                    </section>
                </Modal>
            )}
        </main>
    );
}