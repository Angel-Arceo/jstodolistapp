import Alert from './components/alert.js';
import Modal from './components/modal.js';
import ClickEvent from './components/click.js';

export default class View {
    constructor() {
        this.model = null;
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.addButton = document.getElementById('add');
        this.table = document.getElementById('table');



        this.alert = new Alert('alert');
        this.modal = new Modal()
        this.clickEvent = new ClickEvent();
   
        // Set up event listeners
        this.modal.onClick((key, todo) => { 
          this.model.editTodos(key, todo);
        });


        this.addButton.onclick = () => {
            this.addTodos()
        };

    }

     render() {
        const tbody = this.table.children[1]

        this.model.getTodos((data) => {
            //clean tble
            tbody.innerHTML = '';
            console.log(data)

            for(const key in data) { 
                const todo = data[key]
                this.createRow(todo, key);
            }
        })



    }

    async createRow(todo, key) {
        const tbody = this.table.children[1]
        

        const row = `
            <tr>
              <td>
                ${todo.title}
              </td>
              <td>
                ${todo.description}
              </td>
              <td class="text-center">
                <input type="checkbox" id="checked${key}">
              </td>
              <td class="text-right">
                <button class="btn btn-primary mb-1" id="e${key}">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btn-danger mb-1 ml-1" id="r${key}">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>`



        

        tbody.insertAdjacentHTML('beforeend', row);

        
        this.toggleCompleted(todo, key)
        this.removeTodos();
        this.editTodo();

        


    }

    editTodo() {
      this.clickEvent.onClick(async (key) => {
          const todo = await this.model.getTodo(key);
          console.log('btn clicked', key)
          this.modal.setValues(key, todo);

          $('#modal').modal('toggle');

      }, 'btn-primary', 'fa-pencil');
    }

    toggleCompleted(todo, key) {
      const checkbox = document.getElementById(`checked${key}`);


      if(!checkbox) return;

      checkbox.checked = todo.completed;

      checkbox.onclick = () => {
        console.log('Checkbox clicked:', checkbox.checked);
        this.model.toggleCompleted(key, todo);
      }
    }
    /**
     * Remove todos from the table
     */
    removeTodos() {


      this.clickEvent.onClick((key) => {
        console.log('Removing todo with key:', key);
        this.model.removeTodos(key);
      }, 'btn-danger', 'fa-trash');
        
    }
    
    addTodos() {
        if(this.title.value === '' || this.description.value === '') {
            this.alert.show('Please fill in all fields');
            return;
        }
        this.alert.hide();



        console.log(this.title.value);
        console.log(this.description.value);
        this.model.addTodo(this.title.value, this.description.value, false);
        
    }

    setModel(model) {
        this.model = model;
    }
}