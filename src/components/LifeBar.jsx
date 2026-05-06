import HeartIcon from "./Graphics/HeartIcon.jsx";

/**
 * LifeBar
 * Displays the player's remaining guesses as zelda style hearts (for low guess counts)
 * or blocks (higher guess counts I'm showing blocks just for the sake of spacing).
 *
 * Props:
 * - remainingGuesses: number of life items to render.
 * - removingLifeIndex: index currently animating out after a guess.
 * - useHearts: toggles heart icons vs block indicators.
 * - className: optional extra class for layout overrides.
 */

export default function LifeBar({
    remainingGuesses,
    removingLifeIndex,
    useHearts,
    className = "",
}) {
    return (
        <div className={`life-bar ${className}`.trim()}>
            {/* Render one life item per remaining guess and animate the consumed one out. */}
            {Array.from({ length: remainingGuesses }).map((_, index) => (
                <span
                    key={index}
                    className={`life-item ${
                        removingLifeIndex === index ? "life-used" : ""
                    } ${useHearts ? "heart" : "block-life"}`}
                >
                    {/* Heart icon mode for short games; blocks are styled via CSS class. */}
                    {useHearts ? <HeartIcon/> : ""}
                </span>
            ))}
        </div>
    );
}

