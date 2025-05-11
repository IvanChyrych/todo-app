import { cardContainer, todos, createTemplate } from './app'

export function renderTodo() {
    let html = ''
    for (let i = 0; i < todos.length; i++) {
        html += createTemplate(todos[i])
    }
    cardContainer.innerHTML = html
}

