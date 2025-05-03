import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <- IMPORTANTE
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgfV1EIvQDyj6ecFWgCOUEAtDHEI23BhA",
  authDomain: "furia-pulse.firebaseapp.com",
  projectId: "furia-pulse",
  storageBucket: "furia-pulse.firebasestorage.app",
  messagingSenderId: "835356853938",
  appId: "1:835356853938:web:26d0a5ad95fdc77cfc2bab",
  measurementId: "G-XJNN5ZT7HN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // <- banco ta aq

// Inicializa o Firebase Storage
const storage = getStorage(app);

export { auth, provider, db, storage }; // exportar o storage
