// Importar SDKs do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } 
  from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// 🔑 Substitua aqui pelos dados do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9kT4M1Mq_K9hwOmZYcBhBFNpUDNicvkY",
  authDomain: "meu-site-859f3.firebaseapp.com",
  projectId: "meu-site-859f3",
  storageBucket: "meu-site-859f3.firebasestorage.app",
  messagingSenderId: "841925765587",
  appId: "1:841925765587:web:5a2b18aa37acbc2546e726",
  measurementId: "G-7EM5HGSP24"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Ação do botão Google
document.getElementById("googleLogin").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert(`Bem-vindo, ${user.displayName}!`);
    window.location.href = "perfil.html"; // Redireciona após login
  } catch (error) {
    console.error(error);
    alert("Erro ao fazer login com o Google!");
  }
});
