import {useState} from "react";
import cleanNumber from "../utilities/cleanNumber.js";

export default function useGuessInput() {
    const [guessInput, setGuessInput] = useState("");

    function addDigit(digit) {
        setGuessInput((prev) => cleanNumber(prev + digit));
    }

    function backspace() {
        setGuessInput((prev) => prev.slice(0, -1));
    }

    function clearInput() {
        setGuessInput("");
    }

    function updateGuessInput(rawValue) {
        setGuessInput(cleanNumber(rawValue));
    }

    return {
        guessInput,
        addDigit,
        backspace,
        clearInput,
        updateGuessInput,
        setGuessInput,
    };
}

