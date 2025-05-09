import { Modal } from 'bootstrap';
import { handleClickTodoForm } from './handlers';
import { saveDataToLocalstorage } from "./localStorage";
import { renderTodo } from './render';

export const todos = [];

const addTodoFormElement = document.querySelector('#todoForm');
export const cardContainer = document.querySelector('.trello__cards')


addTodoFormElement.addEventListener('click', handleClickTodoForm)

// класс содержащий структуру todo
class todoItemClass {
    id = Date.now();
    constructor(title, discription) {
        this.title = title
        this.discription = discription
    }
}

//функция создающая шаблон todo
export function createTemplate({ id, ceratedAt, title, discription }) {
    // const time = new Date(ceratedAt)
    return `
    <div class="card" id='${id}' style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${discription}</p>
            <a href="#" class="btn btn-primary">Перейти куда-нибудь</a>
        </div>
    </div>
`
}

// функция добавляет данные в todo и в localstorage
export function addTodo() {
    const title = document.querySelector('#title')
    const discription = document.querySelector('#discription').value;

    // document.querySelector('#title').value = '';
    // document.querySelector('#discription').value = '';

    const todoItem = new todoItemClass(title, discription)
    todos.push(todoItem)
    console.log(todos);
    saveDataToLocalstorage('todoList', todos)
    renderTodo();
}


