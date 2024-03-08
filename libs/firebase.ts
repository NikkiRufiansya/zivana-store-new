import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCXMsGf83E697-Ah3-1L0mP0eEP3_naNak",
    authDomain: "pa-zivana.firebaseapp.com",
    projectId: "pa-zivana",
    storageBucket: "pa-zivana.appspot.com",
    messagingSenderId: "372935757783",
    appId: "1:372935757783:web:dbe4143109d347f0ba4592",
    measurementId: "G-H1XZ15V50R"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
