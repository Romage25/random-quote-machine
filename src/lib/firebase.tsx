// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxrhJSkemh5bq2zgykDYx5hSgvAF1W3a8",
  authDomain: "random-quote-machine-27d5f.firebaseapp.com",
  projectId: "random-quote-machine-27d5f",
  storageBucket: "random-quote-machine-27d5f.appspot.com",
  messagingSenderId: "223953076008",
  appId: "1:223953076008:web:f835a873d1539dee969a1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);