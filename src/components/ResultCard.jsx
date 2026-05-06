/**
 * ResultCard
 *  card that's shown at end of a round with quick next-up actions
 *
 * Props:
 * - title: game result text (e.g. "You Won!" / "You Lost!").
 * - subtitle: supporting details (target, guesses used, etc).
 * - onPlayAgain: callback for starting a new round.
 * - onViewStats: callback for navigating to stats.
 * - onGameSettings: optional callback for returning to settings.
 */


export default function ResultCard({
    title,
    subtitle,
    onPlayAgain,
    onViewStats,
    onGameSettings,
}) {
    return (
        <section className="arcade-card result-card">
            <h2>{title}</h2>
            <p className="result-subtitle">{subtitle}</p>

            {/* Primary post-game actions presented in one place. */}
            <div className="result-actions">
                <button className="primary-button" onClick={onPlayAgain}>
                    Play Again
                </button>
                <button className="secondary-button" onClick={onViewStats}>
                    View Stats
                </button>
                {/* Render only when settings navigation is supported in this flow. */}
                {onGameSettings && (
                    <button className="secondary-button" onClick={onGameSettings}>
                        Game Settings
                    </button>
                )}
            </div>
        </section>
    );
}

