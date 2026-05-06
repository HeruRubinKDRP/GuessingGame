import {useNavigate} from "react-router-dom";
import formatNumber from "../utilities/FormatNumber.js";
import NavError from "../components/NavError.jsx";
import NumberPad from "../components/NumberPad.jsx";
import BackIcon from "../components/Graphics/BackIcon.jsx";
import GameModals from "../components/GameModals.jsx";
import LifeBar from "../components/LifeBar.jsx";
import useGuessInput from "../hooks/useGuessInput.js";
import useNumericKeyboardInput from "../hooks/useNumericKeyboardInput.js";
import useRoundFlow from "../hooks/useRoundFlow.js";

/**
 * GamePage
 * Main gameplay screen. Renders the active round UI, this life bar, guess input,
 * number pad, and result/settings modals.
 * each of these elements are encapsulated separately in their own components
 * repsonsible for their rendering their own individual UI
 *
 * Props:
 * - game / setGame-- active round state managed by useGuessGame.
 * - finishGame--- saves the completed round to history.
 * - startGame-- begins a new round with current settings.
 * - clearCurrentGame--- abandons the round without saving. technically the asignment doesn't allow it, but I included  as an option
 * in a real game you should always allow the player to quit gracefully - some habits learned in Harvard's GD50
 */



export default function GamePage({ game, setGame, finishGame, startGame, clearCurrentGame }) {
    const navigate = useNavigate();

    const remainingGuesses = game ? game.allowedGuesses - game.guesses.length : 0;
    // Rounds with 10 or fewer guesses use heart icons; higher counts use block indicators.
    const useHearts = game ? game.allowedGuesses <= 10 : false;

    // Manages guess input value and number pad interactions.
    const {
        guessInput,
        addDigit,
        backspace,
        clearInput,
        updateGuessInput,
        setGuessInput,
    } = useGuessInput();

    // Manages round logic: validation, life animation, win/loss, and navigation.
    const {
        message,
        removingLifeIndex,
        roundResult,
        submitGuess,
        finishThenViewStats,
        finishThenPlayAgain,
        goToSettings,
    } = useRoundFlow({
        game,
        setGame,
        finishGame,
        startGame,
        clearCurrentGame,
        navigate,
        guessInput,
        setGuessInput,
        remainingGuesses,
    });

    // HOOk Listen globally so keyboard input works without focus on the input field.
    //don't need to give input element focus to type, less tedious that way
    useNumericKeyboardInput({
        onEnter: submitGuess,
        onDigit: addDigit,
        onBackspace: backspace,
        onClear: clearInput,
        isEnabled: Boolean(game),
    });

    if (!game && !roundResult) {
        // No active game — show recovery UI with a link back to the start page.
        // since tI'm suing the react router player might visit a page out of sequence -
        // I didn't do a redirect becuase that would be confusing for user - this way they understand why the game isn't available on the route the visited
        return <NavError/>;
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

                    <LifeBar
                        remainingGuesses={remainingGuesses}
                        removingLifeIndex={removingLifeIndex}
                        useHearts={useHearts}
                    />

                    <input
                        className="guess-input"
                        value={formatNumber(guessInput)}
                        onChange={(e) => updateGuessInput(e.target.value)}
                        inputMode="numeric"
                        placeholder="0"
                    />

                    <NumberPad
                        onDigit={addDigit}
                        onClear={clearInput}
                        onBackspace={backspace}
                        backspaceContent={<span aria-hidden="true"><BackIcon/></span>}
                    />

                    <button className="primary-button" onClick={submitGuess}>
                        Guess
                    </button>

                    <div className="result-area">{message}</div>
                </section>
            )}

            <GameModals
                roundResult={roundResult}
                onViewStats={finishThenViewStats}
                onPlayAgain={finishThenPlayAgain}
                onConfirmSettings={goToSettings}
            />
        </main>
    );
}