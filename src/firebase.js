// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDC6Wh4agRyhJuWZybTy36F8pMpu78_xgM",
    authDomain: "restaurantplanner-8db8f.firebaseapp.com",
    projectId: "restaurantplanner-8db8f",
    storageBucket: "restaurantplanner-8db8f.appspot.com",
    messagingSenderId: "11539413384",
    appId: "1:11539413384:web:7fdd412622387eaaf6e23d"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;