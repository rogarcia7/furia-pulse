import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <- IMPORTANTE
import { getStorage } from "firebase/storage"; // Adiciona o Firebase Storage

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgfV1EIvQDyj6ecFWgCOUEAtDHEI23BhA",
  authDomain: "furia-pulse.firebaseapp.com",
  projectId: "furia-pulse",
  storageBucket: "furia-pulse.firebasestorage.app",
  messagingSenderId: "835356853938",
  appId: "1:835356853938:web:26d0a5ad95fdc77cfc2bab",
  measurementId: "G-XJNN5ZT7HN"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa a autenticação, o provedor do Google e o Firestore
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // <- AQUI ESTÁ O BANCO

// Inicializa o Firebase Storage
const storage = getStorage(app);

export { auth, provider, db, storage }; // Exporta o Storage
