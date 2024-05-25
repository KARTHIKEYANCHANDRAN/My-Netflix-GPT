// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi2vjLes4LsgCZlXWXdNEyYlCevXruxvs",
  authDomain: "netflix-gpt-83487.firebaseapp.com",
  projectId: "netflix-gpt-83487",
  storageBucket: "netflix-gpt-83487.appspot.com",
  messagingSenderId: "215253806343",
  appId: "1:215253806343:web:23e7444480e90725b269a2",
  measurementId: "G-2Z2WTKQ148"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();