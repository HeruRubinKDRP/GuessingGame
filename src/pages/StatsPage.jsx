import {useNavigate} from "react-router-dom";
import formatNumber from "../utilities/FormatNumber.js";

export default function StatsPage({ stats, startGame, clearCurrentGame }) {
    const navigate = useNavigate();

    return (
        <main className="page stats-page">
            <section className="arcade-card stats-card">
                <h2>Stats</h2>

                <div className="stats-grid">
                    <div>
                        <span>Average Guesses</span>
                        <strong>{stats.averageGuesses.toFixed(1)}</strong>
                    </div>

                    <div>
                        <span>Rounds Won</span>
                        <strong>{stats.roundsWon}</strong>
                    </div>

                    <div>
                        <span>Rounds Lost</span>
                        <strong>{stats.roundsLost}</strong>
                    </div>
                </div>

                <h3>Last Ten Games</h3>

                <div className="game-list">
                    {stats.games.length === 0 && <p>No games played yet.</p>}

                    {stats.games.slice(0, 10).map((game, index) => (
                        <div className="game-history-item" key={index}>
                            <strong>{game.won ? "Won" : "Lost"}</strong>
                            <span>Target: {formatNumber(game.target)}</span>
                            <span>
                Guesses: {game.guesses.length} / {game.allowedGuesses}
              </span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="sticky-new-game-button">
                <button
                    className="primary-button"
                    onClick={() => {
                        startGame();
                        navigate("/game");
                    }}
                >
                    New Game
                </button>

                <button
                    className="secondary-button"
                    onClick={() => {
                        clearCurrentGame();
                        navigate("/");
                    }}
                >
                    Change Game Settings
                </button>
            </div>
        </main>
    );
}
