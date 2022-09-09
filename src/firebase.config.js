// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3yBmJkQm7hbU406Z-N2Wh2B6AHxQa6dE",
    authDomain: "asaan-ghar.firebaseapp.com",
    projectId: "asaan-ghar",
    storageBucket: "asaan-ghar.appspot.com",
    messagingSenderId: "220986137542",
    appId: "1:220986137542:web:b7286226a6899b8e44b0c7",
    measurementId: "G-SZDVEW0DLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()