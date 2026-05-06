import {useMemo, useState} from "react";
import {DIFFICULTIES} from "../Data/Settings.js";
import getRandomNumber from "../utilities/GetRandomNumber.js";

/**
 * useGuessGame
 * main state hook for the guessing game app.
 * Keeps track of settings, active round, game history, and derived stats.
 *
 * Returns:
 * - settings / setSettings: current difficulty configuration.
 * - game / setGame: active round state.
 * - stats: derived history stats for UI display.
 * - startGame: creates a fresh round from current settings.
 * - finishGame: stores completed round and clears active game.
 * - clearCurrentGame: cancels the active round.
 */


export default function useGuessGame() {
    const [settings, setSettings] = useState({
        difficulty: "normal",
        ...DIFFICULTIES.normal,
    });

    const [game, setGame] = useState(null);
    const [games, setGames] = useState([]);

    function startGame() {
        // Normalize the custom ranges so min/max are always in the expected order.
        const min = Math.min(settings.min, settings.max);
        const max = Math.max(settings.min, settings.max);

        setGame({
            min,
            max,
            // makes sure every round has at least one attempt.
            allowedGuesses: Math.max(1, settings.guesses),
            target: getRandomNumber(min, max),
            guesses: [],
        });
    }

    function finishGame(finalGame) {
        // Keep only the latest 10 completed rounds for stats history UI.
        setGames((prev) => [finalGame, ...prev].slice(0, 10));
        setGame(null);
    }

    function clearCurrentGame() {
        setGame(null);
    }

    const stats = useMemo(() => {
        // Average guesses is based on winning rounds only.
        const wonGames = games.filter((currentGame) => currentGame.won);
        const totalWinningGuesses = wonGames.reduce(
            (sum, currentGame) => sum + currentGame.guesses.length,
            0
        );

        return {
            games,
            averageGuesses: wonGames.length ? totalWinningGuesses / wonGames.length : 0,
            roundsWon: wonGames.length,
            roundsLost: games.filter((currentGame) => !currentGame.won).length,
        };
    }, [games]);

    return {
        settings,
        setSettings,
        game,
        setGame,
        stats,
        startGame,
        finishGame,
        clearCurrentGame,
    };
}

