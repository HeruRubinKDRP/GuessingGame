import React, { useMemo, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import "./guess.css";
import getRandomNumber from "./utilities/GetRandomNumber.js";
import StatsPage from "./pages/StatsPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import {DIFFICULTIES} from "./Data/Settings.js";
import StartPage from "./pages/StartPage.jsx";

function AppRoutes() {
    const [settings, setSettings] = useState({
        difficulty: "normal",
        ...DIFFICULTIES.normal,
    });

    const [game, setGame] = useState(null);
    const [games, setGames] = useState([]);

    function startGame() {
        const min = Math.min(settings.min, settings.max);
        const max = Math.max(settings.min, settings.max);

        setGame({
            min,
            max,
            allowedGuesses: Math.max(1, settings.guesses),
            target: getRandomNumber(min, max),
            guesses: [],
        });
    }

    function finishGame(finalGame) {
        setGames((prev) => [finalGame, ...prev].slice(0, 10));
        setGame(null);
    }

    function clearCurrentGame() {
        setGame(null);
    }

    const stats = useMemo(() => {
        const totalGuesses = games.reduce(
            (sum, game) => sum + game.guesses.length,
            0
        );

        return {
            games,
            averageGuesses: games.length ? totalGuesses / games.length : 0,
            roundsWon: games.filter((game) => game.won).length,
            roundsLost: games.filter((game) => !game.won).length,
        };
    }, [games]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <StartPage
                        settings={settings}
                        setSettings={setSettings}
                        stats={stats}
                        startGame={startGame}
                    />
                }
            />

            <Route
                path="/game"
                element={
                    <GamePage
                        game={game}
                        setGame={setGame}
                        finishGame={finishGame}
                        startGame={startGame}
                        clearCurrentGame={clearCurrentGame}
                    />
                }
            />

            <Route
                path="/stats"
                element={
                    <StatsPage
                        stats={stats}
                        startGame={startGame}
                        clearCurrentGame={clearCurrentGame}
                    />
                }
            />
        </Routes>
    );
}

export default function MyApp() {
    return (
        <BrowserRouter basename="/GuessingGame">
            <AppRoutes />
        </BrowserRouter>
    );
}