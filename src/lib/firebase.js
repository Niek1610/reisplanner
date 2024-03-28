// Import the functions you need from the SDKs you need
import { deleteApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "reisplanner-71619.firebaseapp.com",
  projectId: "reisplanner-71619",
  storageBucket: "reisplanner-71619.appspot.com",
  messagingSenderId: "583737210043",
  appId: "1:583737210043:web:00e497fd2501761c9d259e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


let firebaseApp

if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig)
    } else {
        firebaseApp = getApps()
        deleteApp(firebaseApp)
        firebaseApp = initializeApp(firebaseConfig)
    }

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)