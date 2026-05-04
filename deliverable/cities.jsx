import React, { useState, useRef } from "react";
import "./cities.css";
import { Modal } from "./components/Modal.jsx";
import { Button } from "./components/Button.jsx";

export function MyApp() {
    //city states, current city and array of cities
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);

    // keep track of the added city so value is stable even after the input is cleared
    // for a better ux i want to clear the text input and state so adding the next city is smoother experience.
    const [addedCity, setAddedCity] = useState("");

    //keep track of the modal
    const [showModal, setShowModal] = useState(false);

    // validation
    const [showError, setShowError] = useState(false);
    const [errorClosing, setErrorClosing] = useState(false);

    //this will make a reference so i can shift the focus back to the text box after adding a city
    const inputRef = useRef(null);

// this will get called on text input change
    function handleCityChange(event) {
        setCity(event.target.value);
    }
    // when you cliock the button to add
    function handleAddCity(event) {
        event.preventDefault();

        const trimmedCity = city.trim();

        if (!trimmedCity) {
            setShowError(true);
            setErrorClosing(false);
            //* I need to have a timeout becuase I wanted to give some time for the
            //* cool animations to play out
            setTimeout(() => {
                setErrorClosing(true);
            }, 3500);

            setTimeout(() => {
                setShowError(false);
            }, 4000);

            return;
        }

        //this part handles putting the user input into the city related state objects
        setCities([...cities, trimmedCity]);
        setAddedCity(trimmedCity);

        // show the modal so we can see the confirmation ui
        setShowModal(true);

        //clear the city so everything is ready for a clean experience when adding multiple cities
        setCity("");
    }

    return (
        <main className="appShell">
            <section className="cityCard">
                <h1>City Builder</h1>
                <p>Add cities to your list.</p>

                <form className="cityForm" onSubmit={handleAddCity}>
                    {/*reference here on the text input to shift focus back to textbox after adding city*/}
                    <input
                        ref={inputRef}
                        type="text"
                        value={city}
                        onChange={handleCityChange}
                        placeholder="Enter a city"
                    />

                    {/*reusable button component, maybe not neded now but simpler to encapsulate button-ish things*/}
                    <div className="formActions">
                        {showError && (
                            <p className={`cityError ${errorClosing ? "closing" : ""}`}>
                                Please input a city name
                            </p>
                        )}

                        <Button type="submit">Add City</Button>
                    </div>
                </form>

                <ul className="cityList">
                    {cities.length === 0 ? (
                        <li>No cities added yet.</li>
                    ) : (
                        cities.map((cityName, index) => (
                            <li key={`${cityName}-${index}`}>{cityName}</li>
                        ))
                    )}
                </ul>
            </section>

            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false);
                    inputRef.current?.focus();
                }}>

                    <h1>Adding a city</h1>
                    <p>Adding City: {addedCity}</p>
                </Modal>
            )}
        </main>
    );
}