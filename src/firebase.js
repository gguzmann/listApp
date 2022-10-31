// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyDifYJnzrMnxiyOStLDCnnAJzEI_0yb5V0",
  
    authDomain: "list-app-f2303.firebaseapp.com",
  
    projectId: "list-app-f2303",
  
    storageBucket: "list-app-f2303.appspot.com",
  
    messagingSenderId: "487137252932",
  
    appId: "1:487137252932:web:6aaa6cb1c89045cff58e11",
  
    measurementId: "G-YCJSD8X8JM"
  
  };
  


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)
// const analytics = getAnalytics(app);