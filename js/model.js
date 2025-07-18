import { getDatabase, set, ref, onValue, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js"

export default class Model {
    constructor() {
        this.view = null
        this.db = getDatabase();
        this.todosRef = ref(this.db, 'todos/');
        
    }

    setView(view) {
        this.view = view;  
    }

    addTodo(title, description) { 
        // Logic to add a todo item
        console.log(`Todo added: ${title} - ${description}`);

        const newTodoRef = push(this.todosRef);
        set(newTodoRef, {
            title: title,
            description: description
        });


    }

    getTodos(callback) {
        // Logic to get all todo items
        const todosRef = ref(this.db, 'todos/');

        onValue(todosRef, (snapshot) => {
            const data = snapshot.val();

            callback(data);
            //this.view.render(data);
        });
        

    }
}