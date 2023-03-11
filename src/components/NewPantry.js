import React, { useEffect, useState } from "react";
import { addNewPantry } from "../firebase";
import "./NewPantry.css";

function NewPantry() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [foodList, setFoodList] = useState("");
    const [add1, setAdd1] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [location, setLocation] = useState("");

    //runs every time any of the address components change
    useEffect(() => {
        setLocation(add1 + ", " + city + ", " + state + " " + zip);
    }, [add1, city, state, zip]);    

    //this is called when a user submits the form below
    const handleSubmit = () => {
        //adds a pantry using info from the form and puts out popup confirmation
        addNewPantry(name, location, foodList.toLowerCase(), quantity);
    };

    return (
        <div className="pantry">
            <h3>Add a Location</h3>
            {/*Form for adding a location*/}
            <input
                type="text"
                className="textbox"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Location Name"
            />
            <input
                type="text"
                className="textbox"
                value={add1}
                onChange={(e) => setAdd1(e.target.value)}
                placeholder="Address"
            />
            <div className="line2">
                <input
                    type="text"
                    className="textbox"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                />
                <input
                    type="text"
                    className="textbox"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                />
                <input
                    type="text"
                    className="textbox"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Zip Code"
                />
            </div>
            <input
                type="text"
                className="textbox"
                value={foodList}
                onChange={(e) => setFoodList(e.target.value)}
                placeholder="Requested Items (separate with commas | max of 3 items)"
            />
            <input
                type="text"
                className="textbox"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity (separate with commas with above order)"
            />

            {/* this button is disabled if at least one of the fields is not filled out */}
            <button
                className="button"
                type="submit"
                onClick={() => handleSubmit()}
                disabled={
                    !name ||
                    !add1 ||
                    !city ||
                    !state ||
                    !zip ||
                    !quantity ||
                    !foodList
                }
            >
                Add Pantry
            </button>
        </div>
    );
}

export default NewPantry;
