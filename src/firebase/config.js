// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCae2Iy5-nyFqwnbordkjJLkmiuZMgssZs",
  authDomain: "react-cursos-cf142.firebaseapp.com",
  projectId: "react-cursos-cf142",
  storageBucket: "react-cursos-cf142.appspot.com",
  messagingSenderId: "1007684598617",
  appId: "1:1007684598617:web:092eb05477a7ec4ac42a48"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth (FirebaseApp);
export const FirebaseDB=getFirestore(FirebaseApp);