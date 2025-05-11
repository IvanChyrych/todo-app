import { todos } from "./app"
import { renderTodo } from "./render"

export function saveDataToLocalstorage(key, todoList) {
    localStorage.setItem(`${key}`, JSON.stringify(todoList))
}

export function getDataFromLocalStorage() {
    if (localStorage.getItem('todoList')) {
        const lsData = JSON.parse(localStorage.getItem('todoList'))
        for (let i = 0; i < lsData.length; i++) {
            todos[i] = lsData[i];
        }
        renderTodo()
    }
}