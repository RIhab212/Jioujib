// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSj1FjxlMaryuEx8eZ9PuVtAF2P6L2FQA",
  authDomain: "jijib-c8cfb.firebaseapp.com",
  projectId: "jijib-c8cfb",
  storageBucket: "jijib-c8cfb.appspot.com",
  messagingSenderId: "640874144464",
  appId: "1:640874144464:web:b0a71c368dd9a81de474d5",
  measurementId: "G-58E2V3E4SN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app) 