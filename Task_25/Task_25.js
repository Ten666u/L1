const container = document.getElementById("container")
const button = document.getElementById("button")

const createElem = () =>{
    //Создаём элемент
    let elem = document.createElement("div")
    
    //Добавляем в дерево
    container.append(elem)

    //Изменяем стили
    elem.style.padding = "5px"
    container.childNodes.length % 2 == 0 ? elem.style.color = "blue" : elem.style.color = "red"
    container.childNodes.length % 2 == 0 ? elem.style.background = "red" : elem.style.background = "blue"

    //Задаём текст
    elem.textContent = "Элемент №" + container.childNodes.length
}

//Навешиваем событие на кнопку
button.addEventListener("click", createElem)