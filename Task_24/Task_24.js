const url = "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true";

const tableBody = document.getElementById("tableBody");
const previousBtn = document.getElementById("previousBtn")
const nextBtn = document.getElementById("nextBtn")
const pageNumber = document.getElementById("pageNumber")
const header = document.querySelectorAll("th")

//Переменные состояния
const itemsPagination = 50;
let page = 1
let itemsArr = [];
let itemsPage = []

//Функция отправления данных
const dataRequest = async (page) => {
    try {
        let response = await fetch(url);
        itemsArr = await response.json();
        itemsPage = itemsArr.slice(0, itemsPagination)

        renderBody(itemsPage)
    } catch (error) {
        console.error("Запрос не прошел", error);
    }
};

//Рендерим таблицу
const renderBody = (arrItems) => {
    tableBody.innerHTML = "";

    arrItems.forEach((item, index) => {
        let itemRow = `<tr>
        <td>${item.fname}</td>
        <td>${item.lname}</td>
        <td>${item.tel}</td>
        <td>${item.address}</td>
        <td>${item.city}</td>
        <td>${item.state}</td>
        <td>${item.zip}</td>
    </tr>`;
        tableBody.insertAdjacentHTML("beforeend", itemRow);
    });
};

//Функция кнопки увеличения
const nextPage = () =>{

    //Увеличиваем страницу
    page++
    pageNumber.textContent = page

    //Отключаем и включаем кнопки по условию
    if(page == 20){
        nextBtn.disabled = true
    }
    if(page == 2){
        previousBtn.disabled = false
    }

    itemsPage = itemsArr.slice(page * itemsPagination - 50, page * itemsPagination)
    //Рендерим таблицу
    renderBody(itemsPage)
}

//Функция кнопки уменьшения
const previousPage = () =>{

    //Уменьшаем страницу
    page--

    pageNumber.textContent = page

    if(page == 19){
        nextBtn.disabled = false
    }

    if(page == 1){
        previousBtn.disabled = true
    }

    itemsPage = itemsArr.slice(page * itemsPagination - 50, page * itemsPagination)
    //Рендерим таблицу
    renderBody(itemsPage)
}

//Сортировка таблицы
const sortItems = (e) =>{
    //Получаем id элемента, в тоже время и поле объекта
    let id = e.target.id

    if(e.target.classList.contains("sortedUp")){
        e.target.classList.remove("sortedUp")
        e.target.classList.add("sortedDown")
        
        let sortArr = Array.from(itemsPage)

        sortArr.sort((elem1, elem2) =>{
            txtElem1 = elem1[id].toString()
            txtElem2 = elem2[id].toString()
            return txtElem2.localeCompare(txtElem1)
        })

        renderBody(sortArr)

        return
    }

    //В случае если был отсортирован по убыванию
    if(e.target.classList.contains("sortedDown")){
        e.target.classList.remove("sortedDown")

        renderBody(itemsPage)
        return
    }

    //Если была нажата кнопка впервые
    if(e.target.classList == ""){
        header.forEach(elem=>{
            elem.classList = ""
        })

        e.target.classList.add("sortedUp")

        let sortArr = Array.from(itemsPage)

        sortArr.sort((elem1, elem2) =>{
            txtElem1 = elem1[id].toString()
            txtElem2 = elem2[id].toString()
            return txtElem1.localeCompare(txtElem2)
        })

        renderBody(sortArr) 
    }
}

//Навешиваем функции на кнопки
header.forEach(elem =>{
    elem.addEventListener("click", sortItems)
})

nextBtn.addEventListener("click", nextPage)
previousBtn.addEventListener("click", previousPage)

//По загрузке страницы выполняем асинхронный запрос
window.onload = () => {
    dataRequest()
};
