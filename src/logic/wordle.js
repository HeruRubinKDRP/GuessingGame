export const ROWS = 6;
export const COLS = 5;

export const KEYBOARD_ROWS = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
];

export function scoreGuess(guess, target) {
    const result = Array(guess.length).fill("absent");
    const remainingTargetLetters = target.split("");

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === target[i]) {
            result[i] = "correct";
            remainingTargetLetters[i] = null;
        }
    }

    for (let i = 0; i < guess.length; i++) {
        if (result[i] === "correct") continue;

        const matchIndex = remainingTargetLetters.indexOf(guess[i]);

        if (matchIndex !== -1) {
            result[i] = "present";
            remainingTargetLetters[matchIndex] = null;
        }
    }

    return result;
}

export function isBetterStatus(oldStatus, newStatus) {
    const rank = { absent: 1, present: 2, correct: 3 };
    return (rank[newStatus] || 0) > (rank[oldStatus] || 0);
}

export function buildLetterStatuses(guesses, target) {
    const statuses = {};

    for (const guess of guesses) {
        const score = scoreGuess(guess, target);

        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i];
            const next = score[i];
            const prev = statuses[letter];

            if (!prev || isBetterStatus(prev, next)) {
                statuses[letter] = next;
            }
        }
    }

    return statuses;
}