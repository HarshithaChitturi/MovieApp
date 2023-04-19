// Import the functions you need from the SDKs you need
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    getAdditionalUserInfo,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB960jnh1w-kCfy0u6z2Bxpoyy26pjCUGQ",
    authDomain: "movietiketbookingapp.firebaseapp.com",
    projectId: "movietiketbookingapp",
    storageBucket: "movietiketbookingapp.appspot.com",
    messagingSenderId: "996481068",
    appId: "1:996481068:web:b2b2a271e28e305ee19989",
    measurementId: "G-EEF05L5YQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(app);
const firebaseAuth = getAuth(app);

export {
    firebaseDB,
    firebaseAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    getAdditionalUserInfo,
};
