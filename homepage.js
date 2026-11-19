// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCKzlWhb_r65qYHf1rQVJ8HxLtM93qy41s",
    authDomain: "openidconncet-6935f.firebaseapp.com",
    projectId: "openidconncet-6935f",
    storageBucket: "openidconncet-6935f.firebasestorage.app",
    messagingSenderId: "885365512866",
    appId: "1:885365512866:web:5becfac891fab10f7255fb",
    measurementId: "G-Y2GLPLFKCB"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); //configura o firebase authentication
const db = getFirestore(); //configura o firestore

//monitora o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    //busca o id do usuário autenticado salvo no localStorage
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    //se o ID estiver no localStorage, tenta obter os dados do Firestore
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId); //referência ao documento do usuário no firestore

        getDoc(docRef) //Busca o documento
        .then((docSnap) => {
            //se o documento existir, exibe os dados na interface
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                document.getElementById('loggedUserLName').innerText = userData.lastName;
            } else {
                console.log("ID não encontrado no Documento");
            }
        })
        .catch((error) => {
            console.log("documento não encontrado");
        });
    } else {
        console.log("ID de usuário não encontrado no localStorage");
    }
});

//Lógica de Logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId'); //remove o ID do LocalStorage
    signOut(auth) //realiza logout
    .then(() => {
        window.location.href = 'index.html'; //redireciona para a página de login
    })
    .catch((error) => {
        console.error('Error Signing out:', error);
    });
});