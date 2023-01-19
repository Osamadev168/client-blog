// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkR0pM6Iy22ERQqgbpAOukhjaxIjDe9jc",
  authDomain: "blog-application-68073.firebaseapp.com",
  projectId: "blog-application-68073",
  storageBucket: "blog-application-68073.appspot.com",
  messagingSenderId: "972305245984",
  appId: "1:972305245984:web:3900760e7e92480232d945",
  measurementId: "G-5XYLM56TXX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
