import styles from "../App.module.css";
/**------
 * “The Block Editor”
 *
 * This is the UI for editing ONE timer block in the workout chain. It should allow you to edit all the relevant parameters for
 * that block type, and also have buttons to move the block up/down in the chain or remove it entirely.
 *
 *
 * **/
export function TimerBlockForm({ block, index, updateBlock, removeBlock, moveBlock }) {
    function numberField(label, key) {
        return (
            <label className={styles.label}>
                {label}
                <input
                    type="number"
                    min="1"
                    value={block[key]}
                    onChange={(e) => updateBlock(block.id, { [key]: Number(e.target.value) })}
                />
            </label>
        );
    }

    return (
        <article className={styles.timerCard}>
            <div className={styles.cardHeader}>
                <strong>{block.type}</strong>

                <div className={styles.cardActions}>
                    <button onClick={() => moveBlock(index, -1)}>↑</button>
                    <button onClick={() => moveBlock(index, 1)}>↓</button>
                    <button onClick={() => removeBlock(block.id)}>Remove</button>
                </div>
            </div>

            <label className={styles.label}>
                Name
                <input
                    value={block.name}
                    onChange={(e) => updateBlock(block.id, { name: e.target.value })}
                />
            </label>

            {block.type === "countdown" && numberField("Seconds", "seconds")}

            {block.type === "interval" && (
                <>
                    {numberField("Work Seconds", "workSeconds")}
                    {numberField("Rest Seconds", "restSeconds")}
                    {numberField("Rounds", "rounds")}
                </>
            )}

            {block.type === "rounds" && (
                <>
                    {numberField("Round Seconds", "roundSeconds")}
                    {numberField("Rest Seconds", "restSeconds")}
                    {numberField("Rounds", "rounds")}
                </>
            )}

            {block.type === "ladder" && (
                <>
                    {numberField("Start Seconds", "startSeconds")}
                    {numberField("Step Seconds", "stepSeconds")}
                    {numberField("Rounds", "rounds")}
                </>
            )}
        </article>
    );
}