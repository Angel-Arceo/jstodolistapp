import { getDatabase, set, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js"

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
    async removeTodos(key) {
        // Logic to remove a todo item
        const todosId = key.substring(1)
        const refRemove = ref(this.db, `todos/${todosId}`); 
        try {
            await remove(refRemove)
        } catch (error) {
            return 'Error removing todo:', error;
        }

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