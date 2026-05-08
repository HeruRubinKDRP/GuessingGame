import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import "./guess.css";
import StatsPage from "./pages/StatsPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import StartPage from "./pages/StartPage.jsx";
import useGuessGame from "./hooks/useGuessGame.js";

/**
 * AppRoutes
 * Declaring the client-side routes and wires up the shared game state
 * from useGuessGame down to each page via props.
 *
 * Routes:
 * - /        → StartPage  difficulty selection and game setup
 * - /game    → GamePage   active round guessing UI
 * - /stats   → StatsPage  history and guess success summary
 */
function AppRoutes() {
    const {
        settings,
        setSettings,
        game,
        setGame,
        stats,
        startGame,
        finishGame,
        clearCurrentGame,
    } = useGuessGame();

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
    // Wrap the app in BrowserRouter scoped to the /GuessingGame base path.
    return (
        <BrowserRouter basename="/GuessingGame">
            <AppRoutes />
        </BrowserRouter>
    );
}