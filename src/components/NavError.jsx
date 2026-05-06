import {useNavigate} from "react-router-dom";

/**
 * NavError
 * Error just in case the user navigates to /game without an active game session.
 * Provides a button to return to the game setup screen.
 */

export default function NavError() {
    const navigate = useNavigate();

    return (
        <main className="page">
            <section className="arcade-card">
                <h2>No game started</h2>
                {/* Route back to the start page to create a new game. */}
                <button className="primary-button" onClick={() => navigate("/")}>
                    Go to Start
                </button>
            </section>
        </main>
    );
}