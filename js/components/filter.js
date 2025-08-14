import Alert from './alert.js';

export default class filter {
    constructor() {

        this.filters = document.getElementById('filters')
        this.searchBtn = document.getElementById('search');
        this.alert = new Alert('alert');

    }

    onClick(callback) {
        this.searchBtn.onclick = (event) => {
            event.preventDefault();

            const data = new FormData(this.filters);


            const words = data.get('words');
            const type = data.get('type');
            
            if(!type) {
                this.alert.show('Please fill in all fields', 'danger');
                return;
            }




            callback({
                words,
                type
            });
        };
    }
}