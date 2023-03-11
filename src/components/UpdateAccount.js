import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./UpdateAccount.css";
import { useNavigate } from "react-router-dom";



function UpdateAccount() {

    //Creates an instance of the current user - you can get their uid and name from this
    const [user] = useAuthState(auth);
    const [currentName, setCurrentName] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const navigate = useNavigate();

    //on every change of the user or navigate variables, run this function and reload the component
    useEffect(() => {
        //sets current users name and email from firebase
        const fetchUserName = async () => {
            try {
                const snapshot = query(
                    collection(db, "users"),
                    where("uid", "==", user?.uid)
                );
                const doc = await getDocs(snapshot);
                setCurrentName(doc.docs[0].data().user);
                setCurrentEmail(doc.docs[0].data().email);
            } catch (err) {
                console.error(err);
            }
        };
        if (!user) navigate("/"); //if no user send to hompage
        fetchUserName();
    }, [user, navigate]);

    return (
        <div className="updateAccount">
            <h3>Account Information</h3>
            <h3>{currentName}</h3>
            <h3>{currentEmail}</h3>
            <button className="button" onClick={logout}>
                Log Out
            </button>
        </div>
    );
}

export default UpdateAccount;
