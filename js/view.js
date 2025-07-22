import Alert from './components/alert.js';


export default class View {
    constructor() {
        this.model = null;
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.addButton = document.getElementById('add');
        this.table = document.getElementById('table');

        this.alert = new Alert('alert');

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
                <input type="checkbox">
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

        this.removeTodos();
        tbody.innerHTML += row
    }

    
    /**
     * Remove todos from the table
     */
    removeTodos() {
      document.addEventListener('click', (event) => {
        if ((event.target && event.target.classList.contains('btn-danger'))) {
          const key = event.target.id;
          console.log('Removing todo with key:', key);
          this.model.removeTodos(key);
        }

        if((event.target && event.target.classList.contains('fa-trash'))) {
            const key = event.target.parentElement.id;
            console.log('Removing todo with key:', key);
            this.model.removeTodos(key);
        }
      });

        
    }
    addTodos() {
        if(this.title.value === '' || this.description.value === '') {
            this.alert.show('Please fill in all fields');
            return;
        }
        this.alert.hide();



        console.log(this.title.value);
        console.log(this.description.value);
        this.model.addTodo(this.title.value, this.description.value);
        
    }

    setModel(model) {
        this.model = model;
    }
}