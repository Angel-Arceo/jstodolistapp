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
                this.createRow(todo);
            }
        })



    }

    createRow(todo) {
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
                <button class="btn btn-primary mb-1">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btn-danger mb-1 ml-1">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>`

        tbody.innerHTML += row
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