import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, 
         GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1l1CsS8I6il0QDdl4CeO0n_hVNxEOqxg",
  authDomain: "calgary-hacks-2026.firebaseapp.com",
  projectId: "calgary-hacks-2026",
  storageBucket: "calgary-hacks-2026.firebasestorage.app",
  messagingSenderId: "356058640651",
  appId: "1:356058640651:web:91cdf98578b1c73bcd320e",
  measurementId: "G-5WNDVYWCN7"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, provider, db };