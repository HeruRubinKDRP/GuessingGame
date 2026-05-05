export default function ResultCard({ title, subtitle, onPlayAgain, onViewStats }) {
    return (
        <section className="arcade-card result-card">
            <h2>{title}</h2>
            <p className="result-subtitle">{subtitle}</p>

            <div className="result-actions">
                <button className="primary-button" onClick={onPlayAgain}>
                    Play Again
                </button>
                <button className="secondary-button" onClick={onViewStats}>
                    View Stats
                </button>
            </div>
        </section>
    );
}

