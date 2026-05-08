export const starterWorkout = {
    id: "local-starter",
    name: "Starter Workout",
    blocks: [
        {
            id: crypto.randomUUID(),
            type: "countdown",
            name: "Warmup",
            seconds: 300,
        },
        {
            id: crypto.randomUUID(),
            type: "interval",
            name: "Tabata Push",
            workSeconds: 20,
            restSeconds: 10,
            rounds: 8,
        },
        {
            id: crypto.randomUUID(),
            type: "countdown",
            name: "Cooldown",
            seconds: 180,
        },
    ],
};