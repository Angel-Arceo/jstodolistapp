
//description: This code defines a ClickEvent class that listens for click events on specified buttons and icons.
export default class ClickEvent {
    

    onClick(callback, btn, icon) {
        document.addEventListener('click', (event) => {
            if ((event.target && event.target.classList.contains(btn))) {
                const key = event.target.id;
                
                callback(key)


            }

            if((event.target && event.target.classList.contains(icon))) {
                const key = event.target.parentElement.id;
                callback(key);

            }
        });
    }
}