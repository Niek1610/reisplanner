import { initializeApp, getApps, deleteApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDq9sYTpLl5z8lEZsM6zcwZSbcdKIHMnIc",
  authDomain: "reisplanner-71619.firebaseapp.com",
  projectId: "reisplanner-71619",
  storageBucket: "reisplanner-71619.appspot.com",
  messagingSenderId: "583737210043",
  appId: "1:583737210043:web:00e497fd2501761c9d259e"
};
initializeApp(firebaseConfig);
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}
getFirestore(firebaseApp);
getAuth(firebaseApp);
