import {addTodo} from './app'

export function handleClickTodoForm(event) {
    if (event.target.id==='confirm') {
        addTodo()
    }
}