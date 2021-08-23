import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/firestore";



  firebase.initializeApp(
    {
        apiKey: "AIzaSyDUW1kmDuA1j6mEAUm7adnDOTi9J9cQgr4",
    authDomain: "wbm-assignment.firebaseapp.com",
    projectId: "wbm-assignment",
    storageBucket: "wbm-assignment.appspot.com",
    messagingSenderId: "587206275022",
    appId: "1:587206275022:web:2c7933ef16d4241755459f",
    measurementId: "G-03B8G17WN9"
    }
    );

var db = firebase.firestore();

export default db;