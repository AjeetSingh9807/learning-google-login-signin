// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkVMIFQSoqWsmxUzDSRRYiaacyNn3R5Bo",
  authDomain: "app-1b8f1.firebaseapp.com",
  projectId: "app-1b8f1",
  storageBucket: "app-1b8f1.firebasestorage.app",
  messagingSenderId: "866490687994",
  appId: "1:866490687994:web:0bcbc5cde6a7dddd208443",
  databaseUrl:"https://app-1b8f1-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);