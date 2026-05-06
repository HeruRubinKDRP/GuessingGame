import {useNavigate} from "react-router-dom";
import React from "react";
import {DIFFICULTIES} from "../Data/Settings.js";
import cleanNumber from "../utilities/cleanNumber.js";
import formatNumber from "../utilities/FormatNumber.js";
import CustomSettingsFields from "../components/CustomSettingsFields.jsx";
import ImageWithPreview from "../components/ImageWithPreview.jsx";
import titleImage from "../assets/title.png";
import knightImage from "../assets/knight.png";
import dragonImage from "../assets/dragon.png";


/**
 * StartPage
 * Game setup screen where players can do the difficulty setting and start a round.
 * Displays a nifty animated title graphic with characters I created for another project, difficulty presets, optional custom
 * settings fields, a quick stats summary, and the Start Game button.
 *
 * Props:
 * - settings / setSettings--- current difficulty/game configuration.
 * - stats-- get game history stats from useGuessGame.
 * - startGame-- initialises a new round from current settings.
 */

export default function StartPage({ settings, setSettings, stats, startGame }) {
    const navigate = useNavigate();

    function handleDifficultyChange(e) {
        // Swap to a preset difficulty and overwrite its default settings.
        const difficulty = e.target.value;
        setSettings({
            difficulty,
            ...DIFFICULTIES[difficulty],
        });
    }

    function updateCustomField(field, value) {
        // Update a single custom field while keeping the rest of settings intact.
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
                <div className="title-graphic-container" aria-label="Guess Quest">
                    {/* Three-image animated title graphic: title text, knight, dragon. */}
                    <ImageWithPreview
                        src={titleImage}
                        previewSrc={titleImage}
                        alt="Guess Quest"
                        className="title-graphic title-graphic-main"
                        imgClassName="title-graphic-image"
                    />
                    <ImageWithPreview
                        src={knightImage}
                        previewSrc={knightImage}
                        alt="Knight"
                        className="title-graphic title-graphic-knight"
                        imgClassName="title-graphic-image"
                    />
                    <ImageWithPreview
                        src={dragonImage}
                        previewSrc={dragonImage}
                        alt="Dragon"
                        className="title-graphic title-graphic-dragon"
                        imgClassName="title-graphic-image"
                    />
                </div>

                <p className="subtitle">Pick a number. Beat the dragon's riddle.</p>

                {/* Difficulty radio grid — selecting a preset resets all settings fields. */}
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
                    // Reveal numeric steppers only when the custom difficulty is selected.
                    <CustomSettingsFields
                        settings={settings}
                        onFieldChange={updateCustomField}
                    />
                )}

                {stats.games.length > 0 && (
                    // Only display average once at least one game has been completed.
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