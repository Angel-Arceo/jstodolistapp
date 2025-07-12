import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js"
import { getDatabase, set, ref, remove } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js"


 const firebaseConfig = {
    apiKey: "AIzaSyBdCOtZzr3a-lsBIOvx6AMTdRuUZd2mKj4",
    authDomain: "todolist-52ea7.firebaseapp.com",
    projectId: "todolist-52ea7",
    storageBucket: "todolist-52ea7.firebasestorage.app",
    messagingSenderId: "548322131238",
    appId: "1:548322131238:web:394be2eaede77255ec15e7",
    measurementId: "G-DE6NT42QG4",
    databaseURL: "https://todolist-52ea7-default-rtdb.firebaseio.com/",
};

initializeApp(firebaseConfig);

function writeUserData(userId, name, email) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email
  });

  console.log('adding users')
}

function deleteUserData(userId) { 
    const db = getDatabase();
    remove(ref(db, 'users/' + userId));
    console.log('deleted user')
}
document.addEventListener('DOMContentLoaded', () => {
    const userId = "12345"; // Example user ID
    const name = "John Doe";
    const email = "johndoe@example.com";

    document.getElementById('add').onclick = () => {
        deleteUserData(userId);
    }
});