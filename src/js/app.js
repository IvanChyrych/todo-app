import { getDataFromLocalStorage, setDataToLocalStorage } from './localStorage.js'

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
const hoursTimeElement=document.querySelector('.trello__clock-hours')
const minutesTimeElement=document.querySelector('.trello__clock-minutes')
const selectUserElement=document.querySelector('.select__user')
const selectUserEditElement=document.querySelector('.select__user-edit')

let usersList=[]

const data=getDataFromLocalStorage()
render(data)

let currentEditId=null

saveTodoButtonElement.addEventListener('click', handleSubmitForm)
trelloCardsElement.addEventListener('click',handleRemoveCard)
trelloCardsElement.addEventListener('click', handleEditCard)
editSaveTodoButton.addEventListener('click',handleSaveEditedCard)
handleDeleteAllCardButton.addEventListener('click', handleDeleteAllCard)

class Todo {
    constructor(id,column,title,discription,userId) {
        this.id=id
        this.title=title
        this.discription=discription
        this.column=column
        this.createdAt=new Date()
        this.user=userId
    }
}

fetch('https://jsonplaceholder.typicode.com/users')
.then((response)=>response.json())
.then((users)=>{renderUsers(users)
})

function buildTemplateUsers({id,name}) {
    return `
    <option value="${id}">${name}</option>
    `
}

function renderUsers(users) {
    usersList=users
    let html=''

    users.forEach((users)=>{
        const template=buildTemplateUsers(users)
        html+=template
    })
    selectUserElement.insertAdjacentHTML('beforeend',html)
    selectUserEditElement.insertAdjacentHTML('beforeend',html)
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
    const userId=selectUserElement.value

    const newTodo=new Todo(id,column,title,discription,userId)

if (column==='in-progress') {
    const inProgressTask=data.filter((todo)=>todo.column==='in-progress')
    if (inProgressTask.length>=6) {
        alert('too much tasks!')
        return
    }
}

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
document.querySelector('.select__user-edit').value=todo.user
const modal = new bootstrap.Modal(document.getElementById('editModal'))
modal.show()
}


function handleSaveEditedCard() {
    const title=document.querySelector('#edit-title').value
    const discription=document.querySelector('#edit-discription').value
    const column=document.querySelector('#edit-column').value
    const userId=document.querySelector('.select__user-edit').value
    const index=data.findIndex((todo)=>todo.id==currentEditId)

    if (index === -1) {
        alert('Ошибка: задача не найдена!')
        return
    }

    data[index].title=title
    data[index].discription=discription
    data[index].column=column
    data[index].user=userId

    setDataToLocalStorage(data)
    render(data)
    currentEditId=null
}

function buildTemplate({id,title,discription,createdAt,user}) {
    const date=new Date(createdAt)
    const userObj=usersList.find(u=>u.id==user)
    const userName=userObj?userObj.name:'unknown user'

    return `
        <div  data-id="${id}" class="card m-2 w-90" style="max-width:400px;">
        <button data-role="remove" class="btn btn-close"></button>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${discription}</p>
                <p class="card-text">${userName}</p>
                <div class="card__time d-flex">
                    <div class="card__time-day d-flex p-2">
                        <div class="card-createdAt">${date.getFullYear()}</div>
                        <div class="card-createdAt">.</div>
                        <div class="card-createdAt">${ date.getMonth()}</div>
                        <div class="card-createdAt">.</div>
                        <div class="card-createdAt">${date.getDay()}</div>
                    </div>
                    <div class="card__time-hours d-flex p-2">
                        <div class="card-createdAt">${ date.getHours().toString().padStart(2,'0')}</div>
                        <div class="card-createdAt">:</div>
                        <div class="card-createdAt">${date.getMinutes().toString().padStart(2,'0')}</div>
                    </div>
                </div>
            </div>
        <button data-role="edit" class="btn btn-warning">edit</button>
        </div>
    `
}

function currentTime() {
    const time=new Date()
    let hours=time.getHours().toString().padStart(2,'0')
    let minutes=time.getMinutes().toString().padStart(2,'0')
    hoursTimeElement.textContent=`${hours}`
    minutesTimeElement.textContent=`${minutes}`
}
setInterval(currentTime,100)

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
