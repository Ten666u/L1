const password = document.getElementById("password")
const passwordStatusTxt = document.getElementById("passwordStatusTxt")
const passwordStatus = document.getElementById("passwordStatus")

function checkPassword(){
    //Прогресс
    let progress = 0

    //Убираем пробелы
    str = password.value
    str = str.trim()
    password.value = str

    //Делаем проверки
    const lowerCase = /[a-z]/.test(str)
    const upperCase = /[A-Z]/.test(str)
    const numbers = /\d/.test(str)
    const specialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(str)

    //Считаем прогресс
    //Проверяем регистры
    lowerCase && upperCase ? progress++ : progress = progress

    //Проверяем на числа
    numbers ? progress++ : progress = progress

    //Проверяем спец символы
    specialChar ? progress += 2 : progress = progress

    //Проверяем длину
    str.length > 8 ? progress++ : progress = 0

    //Вставляем прогресс
    passwordStatus.value = progress

    //Делаем пользователю подсказки исходя из проверок
    if(str.length < 8){
        passwordStatusTxt.textContent = "Нехватает символов" 
        passwordStatusTxt.style.color = "red"
        return
    }

    if(!lowerCase || !upperCase){
        passwordStatusTxt.textContent = "Нехватает регистра"
        passwordStatusTxt.style.color = "red"
        return
    }

    if(!numbers){
        passwordStatusTxt.textContent = "Нехватает чисел"
        passwordStatusTxt.style.color = "red"
        return
    }

    if(!specialChar){
        passwordStatusTxt.textContent = "Добавьте специальные символы"
        passwordStatusTxt.style.color = "orange"
        return
    }

    //В конечном итоге получаем отличный пароль
    passwordStatusTxt.textContent = "Отличный пароль!!!"
    passwordStatusTxt.style.color = "green"
    return
}

//Функция дебаунсер
const debounce = (func, waitTime) => {
    let timeout;

    return () => {
        //Очищаем таймер и задаём новый
        clearTimeout(timeout);
        timeout = setTimeout(func, waitTime);
    };
};

//Навешиваем событие
password.addEventListener("input", debounce(checkPassword, 500))


