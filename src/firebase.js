import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
    doc,
    collection,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";

//config for firebase
const firebaseConfig = {
    apiKey: "AIzaSyDn4zdjDvFrwHiVgsZkC7LjCohj0duZOJ4",
    authDomain: "test-dc14d.firebaseapp.com",
    projectId: "test-dc14d",
    storageBucket: "test-dc14d.appspot.com",
    messagingSenderId: "757883155113",
    appId: "1:757883155113:web:655af51a5118e1bd09efb8",
    measurementId: "G-LHEGC6E740"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
//const timestamp = firebase.firestore.Timestamp.now().seconds;

//creates a new food bank by creating a new document in the firebase database
const addNewPantry = async (name, location, foodList, quantity) => {
    const user = firebase.auth().currentUser;
    const quer = query(collection(db, "users"), where("uid", "==", user?.uid));
    const snapshot = await getDocs(quer);
    const owner = snapshot.docs[0].data().user;
    await setDoc(doc(db, "banks", name), {
        uid: user.uid,
        owner: owner,
        name: name,
        location: location,
        foodList: foodList,
        quantity: quantity,
    });
};

//creates a new user by creating a new document in the firebase database
const userRegistration = async (name, email, password) => {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        const user = result.user;
        await db.collection("users").add({
            uid: user.uid,
            user: name,
            authProvide: "local",
            email,
        });
    } catch (err) {
        alert(err.message);
    }
};

//logs in a user by using their email and password
const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        alert(err.message);
    }
};

//sends password reset email to user
const resetPassword = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
    } catch (err) {
        alert(err.message);
    }
};

//logs user out
const logout = () => {
    auth.signOut();
};

export {
    auth,
    db,
    signInWithEmailAndPassword,
    userRegistration,
    resetPassword,
    logout,
    addNewPantry,
};
export default firebase;
