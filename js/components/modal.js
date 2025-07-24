import Alert from './alert.js'



export default class Modal {
    constructor() {
        this.alert = new Alert('modal-alert');
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.completed = document.getElementById('modal-completed');
        this.saveButton = document.getElementById('modal-btn');

        this.key = null;
       
    }

    setValues(key, todo) {
        this.key = key;
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.completed.checked = todo.completed;
    }

    onClick(callback) {


        this.saveButton.onclick = () => {
            if(this.title.value === '' || this.description.value === '') {
                this.alert.show('Please fill in all fields');
                return;
            }
            this.alert.hide();
            
            $('#modal').modal('toggle');

            callback(this.key, {
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked
            });
        };
    }
}