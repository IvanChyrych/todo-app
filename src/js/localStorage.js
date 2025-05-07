export function saveDataToLocalstorage(key,todoList) {
    localStorage.setItem(`${key}`, JSON.stringify(todoList))
}