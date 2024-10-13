// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmi9eFmqWUDcNDnCInvA-UOOXnzeflX3U",
  authDomain: "stillss.firebaseapp.com",
  projectId: "stillss",
  storageBucket: "stillss.appspot.com",
  messagingSenderId: "525488695622",
  appId: "1:525488695622:web:e25bd439dfc59911875d47",
  measurementId: "G-1906Z5H24N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const UID = 'maxwelldhsu'
// const analytics = getAnalytics(app);
