import { getDatabase, 
    set, 
    ref, 
    onValue, 
    push, 
    remove, 
    update, 
    get,
    query, 
    orderByChild,
    equalTo } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js"

export default class Model {
    constructor() {
        this.view = null
        this.db = getDatabase();
        this.todosRef = ref(this.db, 'todos/');
        
    }

    setView(view) {
        this.view = view;  
    }

    addTodo(title, description, completed) { 
        // Logic to add a todo item
        console.log(`Todo added: ${title} - ${description}`);

        const newTodoRef = push(this.todosRef);
        set(newTodoRef, {
            title: title,
            description: description,
            completed: completed
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

    editTodos(key, todo) {
        // Logic to edit a todo item  
        const todosId = key.substring(1)

        const updates = {};

        updates[`todos/${todosId}`] = {
            ...todo,
        }

        update(ref(this.db), updates);
        console.log(`Todo edited: ${key} - ${todo.title} - ${todo.description}`);
    }

    getTodos(callback) {
        // Logic to get all todo items
        //const todosRef = ref(this.db, 'todos/');

        onValue(this.todosRef, (snapshot) => {
            const data = snapshot.val();

            callback(data);
            //this.view.render(data);
        });
        

    }

    async getTodo(key) {
        const todosId = key.substring(1)

        const todoRef = ref(this.db, `todos/${todosId}`);
        const snapshot = await get(todoRef);
        return snapshot.val();
    }

    /** async filterTodos(type, words) {
        // Logic to filter todo items
        console.log(`Filtering todos by type: ${type} and words: ${words}`);

        const todos = query(this.todosRef, orderByChild('title'), equalTo(words));
        
        const snapshot = await get(todos);
        const data = snapshot.val();


        if(data) {
            console.log(data)

        }
        return;
    } **/

    toggleCompleted(todosId, todo) {
        const updates = {};

        console.log(todosId, todo.completed)
        updates[`todos/${todosId}`] = {
            ...todo,
            completed: !todo.completed
        }

        update(ref(this.db), updates);
        console.log(`Todo with ID ${todosId} completed status toggled to ${!todo.completed}`);

    }
}