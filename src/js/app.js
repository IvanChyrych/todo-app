const saveTodoButtonElement=document.querySelector('#save-todo-button')
const titleTodoElement=document.querySelector('#title')
const discriptionTodoElement=document.querySelector('#discription')
const columnElement=document.querySelector('#column')
const trelloCardsElement=document.querySelector('.trello__cards')
const editSaveTodoButton=document.querySelector('#edit-save-todo-button')
const handleDeleteAllCardButton = document.querySelector('#trello__button-delete-all')
const todoCounterElement=document.querySelector('.trello__todo-counter')
const inprogressCounterElement=document.querySelector('.trello__inprogress-counter')
const doneCounterElement=document.querySelector('.trello__done-counter')

const data=getDataFromLocalStorage()
render(data)

let currentEditId=null

saveTodoButtonElement.addEventListener('click', handleSubmitForm)
trelloCardsElement.addEventListener('click',handleRemoveCard)
trelloCardsElement.addEventListener('click', handleEditCard)
editSaveTodoButton.addEventListener('click',handleSaveEditedCard)
handleDeleteAllCardButton.addEventListener('click', handleDeleteAllCard)

class Todo {
    constructor(id,column,title,discription) {
        this.id=id
        this.title=title
        this.discription=discription
        this.column=column
    }
}

function updateCounter() {
    let todoCount=0
    let inprogressCount=0
    let doneCount=0
    data.forEach((todo)=>{
        if (todo.column=='todo') {
            todoCount+=1
        }
        if (todo.column=='in-progress') {
            inprogressCount+=1
        }
        if (todo.column=='done') {
            doneCount+=1
        }
    })
    todoCounterElement.textContent=todoCount
    inprogressCounterElement.textContent=inprogressCount
    doneCounterElement.textContent=doneCount
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

function handleDeleteAllCard() {
    const confirmDeleteAll=confirm('Delete all cards?') 

    if (confirmDeleteAll) {
    const notDoneItems=data.filter(todo => todo.column!=='done');
    data.length=0
    notDoneItems.forEach((todo)=>data.push(todo))
    setDataToLocalStorage(data)
    render(data)
    } 
}

function handleEditCard({target}) {
if (target.dataset.role!=='edit') {
    return   
}
const parentElement=target.closest('.card')
const id=parentElement.dataset.id
const todo=data.find((todo)=>todo.id==id)

currentEditId=id

document.querySelector('#edit-title').value=todo.title
document.querySelector('#edit-discription').value=todo.discription
document.querySelector('#edit-column').value=todo.column

const modal = new bootstrap.Modal(document.getElementById('editModal'))
modal.show()
}


function handleSaveEditedCard() {
    const title=document.querySelector('#edit-title').value
    const discription=document.querySelector('#edit-discription').value
    const column=document.querySelector('#edit-column').value

    const index=data.findIndex((todo)=>todo.id==currentEditId)

    data[index].title=title
    data[index].discription=discription
    data[index].column=column

    setDataToLocalStorage(data)
    render(data)
    currentEditId=null
}


function buildTemplate({id,title,discription}) {
    return `
        <div data-id="${id}" class="card" style="width: 18rem;">
        <button data-role="remove" class="btn btn-close"></button>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${discription}</p>
            </div>
        <button data-role="edit" class="btn btn-warning">edit</button>
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
    updateCounter()
}
