export default class View {
    constructor() {
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.addButton = document.getElementById('add');
        this.model = null;

        this.addButton.onclick = () => {
            this.addTodos();    
        }
    }


    addTodos() {
        if(this.title.value === '' || this.description.value === '') {
            console.log('Please fill in all fields');
            return;
        }
        console.log('Adding todos');

        console.log(this.title.value);
        console.log(this.description.value);
    }

    setModel(model) {
        this.model = model;
    }
}