import { Routes, Route } from "react-router-dom";
import { starterWorkout } from "./Data/starterWorkout";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { HomePage } from "./pages/HomePage";
import { TimerPage } from "./pages/TimerPage";

export default function App() {
    const [workout, setWorkout] = useLocalStorage("workout-timer-chain", starterWorkout);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
                path="/timer"
                element={<TimerPage workout={workout} setWorkout={setWorkout} />}
            />
        </Routes>
    );
}