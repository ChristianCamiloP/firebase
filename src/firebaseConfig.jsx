import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAOuYg5MAFDFse6JQ-jfkVYgdJRcdEimDk",
    authDomain: "fir-c862e.firebaseapp.com",
    projectId: "fir-c862e",
    storageBucket: "fir-c862e.firebasestorage.app",
    messagingSenderId: "231968804737",
    appId: "1:231968804737:web:25edf4b2397a9b75672280",
    measurementId: "G-MTY7MBMJ6L"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

