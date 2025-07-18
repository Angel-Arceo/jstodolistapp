import View from "./view.js"
import Model from "./model.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js"
//import { getDatabase, set, ref, remove } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js"


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


document.addEventListener('DOMContentLoaded', () => { 
    const view = new View();
    const model = new Model();

    view.setModel(model);
    model.setView(view);
    view.render();
});