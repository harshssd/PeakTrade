// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6zOkzaaguNbhMd2iZkR9OQAWjOOeotZU",
  authDomain: "peaktrade-7a6f6.firebaseapp.com",
  projectId: "peaktrade-7a6f6",
  storageBucket: "peaktrade-7a6f6.appspot.com",
  messagingSenderId: "1052298830556",
  appId: "1:1052298830556:web:8a74f0af8bdac8e96fca19",
  measurementId: "G-25KT1RCKP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);