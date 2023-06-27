
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDU95mBEwswXTrehr6-awwFxPNMOqnEscM",
    authDomain: "peak-suprstate-384109.firebaseapp.com",
    projectId: "peak-suprstate-384109",
    storageBucket: "peak-suprstate-384109.appspot.com",
    messagingSenderId: "764256186835",
    appId: "1:764256186835:web:4909fd24ce579bfc1e7f26",
    measurementId: "G-PYH257NGEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);