export function setDataToLocalStorage(data) {
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