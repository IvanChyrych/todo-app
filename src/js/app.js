const data=getDataFromLocalStorage()

const saveTodoButtonElement=document.querySelector('#save-todo-button')
const titleTodoElement=document.querySelector('#title')
const discriptionTodoElement=document.querySelector('#discription')
const todoContainerElement=document.querySelector('.trello__todo-container')

saveTodoButtonElement.addEventListener('click', handleSubmitForm)

class Todo {
    constructor(title,discription) {
        this.title=title
        this.discription=discription
    }
}

function handleSubmitForm() {
    const title=titleTodoElement.value
    const discription = discriptionTodoElement.value 

    const newTodo=new Todo(title,discription)
    data.push(newTodo)

    setDataToLocalStorage(data)
    render(data)
}

function buildTemplate({title,discription}) {
    return `
        <div class="card" style="width: 18rem;">
        <button class="btn btn-close"></button>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${discription}</p>
            </div>
        </div>
    `
}

function setDataToLocalStorage(data) {
    localStorage.setItem('todoItem', JSON.stringify(data))
}

export function getDataFromLocalStorage() {
    const data=localStorage.getItem('todoItem')
    if (data) {
        const dataFromStorage=JSON.parse(data)
        return dataFromStorage.map((todo)=>{
            return todo
        })
    }else{
        return[]
    }
}

function render(data) {
    todoContainerElement.innerHTML=''
    data.forEach((todo)=>{
        const template=buildTemplate(todo)
        todoContainerElement.insertAdjacentHTML('beforeend',template)
    })
}

render(data)