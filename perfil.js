import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
  from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// 🔑 Mesmas credenciais do seu Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_MESSAGING_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Checa se o usuário está logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userPhoto").src = user.photoURL || "https://via.placeholder.com/120";
    document.getElementById("userName").textContent = user.displayName || "Usuário";
    document.getElementById("userEmail").textContent = user.email || "";
  } else {
    // Se não estiver logado, redireciona para login
    window.location.href = "login.html";
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
