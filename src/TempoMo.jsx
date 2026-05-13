import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import "./guess.css";


/**
 * AppRoutes
 * Declaring the client-side routes and wires up the shared game state
 * from useGuessGame down to each page via props.
 *
 * Routes:

 */
function AppRoutes() {


    return (
        <Routes>
            <Route
                path="/"
                element={

                }
            />

            <Route
                path="/game"
                element={

                }
            />

            <Route
                path="/stats"
                element={

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