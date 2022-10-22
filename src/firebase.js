// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyDhjvhVAwnQQ29__SM1prFdWYGY-adMD0A",

    authDomain: "listapp-4c442.firebaseapp.com",

    projectId: "listapp-4c442",

    storageBucket: "listapp-4c442.appspot.com",

    messagingSenderId: "569443207301",

    appId: "1:569443207301:web:b3e58b5c305c3e51aa41ec",

    measurementId: "G-BEM5GWLGGV"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
// const analytics = getAnalytics(app);