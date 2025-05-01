import { Modal } from 'bootstrap';

const todos = [];

const addTodoModalElement = document.querySelector('.addTodoButton');
const addTodoModalButton = document.querySelector('#addTodoModalButton');


addTodoModalElement.addEventListener('click', handleClickTodoForm);



addTodoModalButton.addEventListener('click', function () {

})

// handlers
function handleClickTodoForm(event) {
    console.log(event.targer);
}
