import React, { useEffect, useState } from "react";
import FoodBank from "./components/FoodBank";
import { db } from "./firebase";
import { query, collection, getDocs } from "firebase/firestore";
import "./AllBanks.css";

function AllBanks() {
    //initializes state variables
    const [banks, setBanks] = useState([]);

    //gets all banks from firebase
    const getBanks = async () => {
        try {
            const quer = query(collection(db, "banks")); 
            const snapshot = await getDocs(quer);
            setBanks(snapshot.docs.map((doc) => doc.data()));
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        getBanks();
    }, []);

    return (
        <div className="listing">
            {/* loops through each bank and creates a bank component for it */}
            {banks?.map((bank, index) => (
                <div key={index}>
                    <FoodBank
                        className="bank"
                        owner={bank.owner}
                        name={bank.name}
                        location={bank.location}
                        quantity={bank.quantity}
                        foodList={bank.foodList}
                    />
                </div>
            ))}
        </div>
    );
}

export default AllBanks;
