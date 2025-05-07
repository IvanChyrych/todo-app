import { Modal } from 'bootstrap';
import { handleClickTodoForm } from './handlers';
import { saveDataToLocalstorage } from "./localStorage";

const todos = [];

const addTodoFormElement = document.querySelector('#todoForm');

addTodoFormElement.addEventListener('click', handleClickTodoForm)

// класс содержащий структуру todo
class todoItemClass {
    id = Date.now();
    constructor(title, discription) {
        this.title = title
        this.discription = discription
    }
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

}


