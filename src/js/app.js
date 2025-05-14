const data=getDataFromLocalStorage()
render(data)

const saveTodoButtonElement=document.querySelector('#save-todo-button')
const titleTodoElement=document.querySelector('#title')
const discriptionTodoElement=document.querySelector('#discription')
const columnElement=document.querySelector('#column')
const trlloCardsElement=document.querySelector('.trello__cards')

saveTodoButtonElement.addEventListener('click', handleSubmitForm)
trlloCardsElement.addEventListener('click',handleRemoveCard)

class Todo {
    constructor(id,column,title,discription) {
        this.id=id
        this.title=title
        this.discription=discription
        this.column=column
    }
}

function handleSubmitForm() {
    const id=Date.now()
    const column=columnElement.value
    const title=titleTodoElement.value
    const discription = discriptionTodoElement.value 

    const newTodo=new Todo(id,column,title,discription)
    data.push(newTodo)

    setDataToLocalStorage(data)
    render(data)
}

function handleRemoveCard({target}) {
    const {role}=target.dataset
    if (role!=='remove') {
        return
    }
    const rootElement=target.closest('.card')
    const {id}=rootElement.dataset
    const index=data.findIndex((todo)=>todo.id==id)
    data.splice(index,1)
    setDataToLocalStorage(data)
    render(data)
}

function buildTemplate({id,title,discription}) {
    return `
        <div data-id="${id}" class="card" style="width: 18rem;">
        <button data-role="remove" class="btn btn-close"></button>
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

    document.querySelector('.trello__todo-container').innerHTML=''
    document.querySelector('.trello__inprogress-container').innerHTML=''
    document.querySelector('.trello__done-container').innerHTML=''

    data.forEach((todo)=>{
        let containerSelector=''
        if (todo.column==='todo') {
            containerSelector='.trello__todo-container'
        }
        else if (todo.column==='in-progress') {
            containerSelector='.trello__inprogress-container'
        }
        else if (todo.column==='done') {
            containerSelector='.trello__done-container'
        }
        const container=document.querySelector(containerSelector)
        const template=buildTemplate(todo)
        container.insertAdjacentHTML('beforeend',template)
    })
}
