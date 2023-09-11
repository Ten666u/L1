//Функция отправки запроса в ЯндексГеокодер
const sendRequest = async (str) => {
    let url = `https://suggest-maps.yandex.ru/v1/suggest?apikey=3507549b-4fa0-4a0b-9021-85dca5124a30&text=${str}`;
    let request = await fetch(url);
    let data = await request.json();
    return data.results;
};

//Получаем input и блок с подсказками
const input = document.getElementById("searchInput");
const inputHints = document.getElementById("inputHints");

//Функция рендера подсказок
const renderHint = async () => {
    //Отправляем запрос Геокодеру
    let arrHint = await sendRequest(input.value);

    //Выделяем до 3-ех подсказок
    arrHint = arrHint.slice(0, 3);
    //Очищаем блок подсказок
    inputHints.innerHTML = "";

    //Генерация подсказок
    for (let i = 0; i <= arrHint.length - 1; i++) {
        let obj = arrHint[i];

        let hint = document.createElement("div");

        hint.classList.add("hint");

        //Функция для генерации строки, в некоторых моментах подводит, в руководстве не понял(
        if (obj.subtitle) {
            hint.textContent = obj.subtitle.text + " " + obj.title.text;
        } else {
            hint.textContent = obj.title.text;
        }

        //Присваиваем функцию выбора адреса
        hint.onclick = function () {
            input.value = this.textContent;
            inputHints.innerHTML = "";
        };

        //Добавляем подсказку на страницу
        inputHints.append(hint);
    }
};

//Debounce
const debounce = (func, waitTime) => {
    let timeout;

    return () => {
        //Очищаем таймер и задаём новый
        clearTimeout(timeout);
        timeout = setTimeout(func, waitTime);
    };
};

//Троттлинг
const throttle = (func, waitTime) => {
    
    //Флаг для установки таймера
    let isThrottled = false;

    return function () {
        
        //Если таймер не установлен
        if (!isThrottled) {

            //Ставим флажок и выполняем функцию
            isThrottled = true;
            func()

            //По истечению таймера сбрасываем флаг и заново
            setTimeout(() =>{
                isThrottled = false;
            }, waitTime);
        }
    };
};

input.addEventListener("input", throttle(renderHint, 1000));
