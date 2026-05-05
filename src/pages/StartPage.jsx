import {useNavigate} from "react-router-dom";
import React from "react";
import {DIFFICULTIES} from "../Data/Settings.js";
import cleanNumber from "../utilities/cleanNumber.js";
import formatNumber from "../utilities/FormatNumber.js";

export default function StartPage({ settings, setSettings, stats, startGame }) {
    const navigate = useNavigate();

    function handleDifficultyChange(e) {
        const difficulty = e.target.value;
        setSettings({
            difficulty,
            ...DIFFICULTIES[difficulty],
        });
    }

    function updateCustomField(field, value) {
        setSettings((prev) => ({
            ...prev,
            difficulty: "custom",
            label: "Custom",
            [field]: Number(cleanNumber(value)) || 0,
        }));
    }

    return (
        <main className="page start-page">
            <section className="arcade-card hero-card">
                <h1 className="game-title">
                    <span>Guess</span>
                    <span>Quest</span>
                </h1>

                <p className="subtitle">Pick a range. Beat the machine.</p>

                <div className="difficulty-grid">
                    {Object.entries(DIFFICULTIES).map(([key, option]) => (
                        <label
                            key={key}
                            className={`difficulty-option ${
                                settings.difficulty === key ? "selected" : ""
                            }`}
                        >
                            <input
                                type="radio"
                                name="difficulty"
                                value={key}
                                checked={settings.difficulty === key}
                                onChange={handleDifficultyChange}
                            />
                            <strong>{option.label}</strong>
                            <span>
                {key === "custom"
                    ? "Set your own rules"
                    : `${option.min}-${formatNumber(option.max)} / ${
                        option.guesses
                    } guesses`}
              </span>
                        </label>
                    ))}
                </div>

                {settings.difficulty === "custom" && (
                    <div className="custom-settings">
                        <label>
                            Min
                            <input
                                value={formatNumber(settings.min)}
                                onChange={(e) => updateCustomField("min", e.target.value)}
                            />
                        </label>

                        <label>
                            Max
                            <input
                                value={formatNumber(settings.max)}
                                onChange={(e) => updateCustomField("max", e.target.value)}
                            />
                        </label>

                        <label>
                            Guesses
                            <input
                                value={formatNumber(settings.guesses)}
                                onChange={(e) => updateCustomField("guesses", e.target.value)}
                            />
                        </label>
                    </div>
                )}

                {stats.games.length > 0 && (
                    <div className="quick-stats">
                        Average guesses per round:
                        <strong> {stats.averageGuesses.toFixed(1)}</strong>
                    </div>
                )}

                <button
                    className="primary-button"
                    onClick={() => {
                        startGame();
                        navigate("/game");
                    }}
                >
                    Start Game
                </button>
            </section>
        </main>
    );
}