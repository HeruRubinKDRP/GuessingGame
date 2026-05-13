import styles from "../App.module.css";
import { TimerBlockForm } from "./TimerBlockForm";

/**-----
 * “The Workout Builder”
 *
 * This is the main editor UI for the entire workout chain. It should allow you to:
 * - Edit the workout name
 * - Add new timer blocks of any type to the chain
 *
 *
 * **/



function createBlock(type) {
    const base = {
        id: crypto.randomUUID(),
        type,
        name: type[0].toUpperCase() + type.slice(1),
    };

    if (type === "countdown") return { ...base, seconds: 60 };
    if (type === "interval") return { ...base, workSeconds: 20, restSeconds: 10, rounds: 8 };
    if (type === "rounds") return { ...base, roundSeconds: 180, restSeconds: 60, rounds: 3 };
    if (type === "ladder") return { ...base, startSeconds: 30, stepSeconds: 15, rounds: 5 };

    return base;
}

export function TimerChainEditor({ workout, setWorkout }) {
    function updateWorkoutName(name) {
        setWorkout({ ...workout, name });
    }

    function addBlock(type) {
        setWorkout({
            ...workout,
            blocks: [...workout.blocks, createBlock(type)],
        });
    }

    function updateBlock(id, updates) {
        setWorkout({
            ...workout,
            blocks: workout.blocks.map((block) =>
                block.id === id ? { ...block, ...updates } : block
            ),
        });
    }

    function removeBlock(id) {
        setWorkout({
            ...workout,
            blocks: workout.blocks.filter((block) => block.id !== id),
        });
    }

    function moveBlock(index, direction) {
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= workout.blocks.length) return;

        const reordered = [...workout.blocks];
        const [moved] = reordered.splice(index, 1);
        reordered.splice(nextIndex, 0, moved);

        setWorkout({ ...workout, blocks: reordered });
    }

    return (
        <section className={styles.panel}>
            <label className={styles.label}>
                Workout Name
                <input
                    value={workout.name}
                    onChange={(e) => updateWorkoutName(e.target.value)}
                />
            </label>

            <div className={styles.addButtons}>
                <button onClick={() => addBlock("countdown")}>+ Countdown</button>
                <button onClick={() => addBlock("interval")}>+ Interval</button>
                <button onClick={() => addBlock("rounds")}>+ Rounds</button>
                <button onClick={() => addBlock("ladder")}>+ Ladder</button>
            </div>

            <div className={styles.chain}>
                {workout.blocks.map((block, index) => (
                    <TimerBlockForm
                        key={block.id}
                        block={block}
                        index={index}
                        updateBlock={updateBlock}
                        removeBlock={removeBlock}
                        moveBlock={moveBlock}
                    />
                ))}
            </div>
        </section>
    );
}