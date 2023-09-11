//https://oauth.vk.com/authorize?client_id=51742158&display=page&redirect_uri=https://ten666u.github.io/Task_19&scope=wall&response_type=token&v=5.131&state=123456

//Получаем ключ из хэша страницы
const token = window.location.hash.split("=")[1].split("&")[0];

const postsContainer = document.getElementById("posts_container");

//Посты, количество постов при запросе, сдвиг постов при запросе
let posts = [];
const count = 10;
let offset = 0;

const loadPosts = () => {

    //Запрос данных постов из группы
    VK.Api.call(
        "wall.get",
        {
            owner_id: -29534144,
            domain: "lentach",
            count: count,
            offset: offset,
            access_token: token,
            v: 5.131,
        },

        //Обрабатываем callback
        (r) => {

            //Если пришел ответ, обрабатываем его
            if (r.response) {
                let postsArr = r.response.items;

                //Рендерим посты
                renderPosts(postsArr);
                
                //Добавляем посты и увеличиваем отступ
                posts = posts.concat(postsArr);
                offset += count;

                //Сохраняем в хранилище
                savePosts(posts, offset);
            }
        }
    );
}

const renderPosts = (postsArr) => {

    //В зависимости от поста, получаем ссылку на картинку
    const loadImg = (obj) => {
        if (obj.attachments[0]?.type == "photo") {
            return `<img class="post_img" src=${obj.attachments[0]["photo"].sizes[4].url}></img>`;
        }
        if (obj.attachments[0]?.type == "video") {
            return `<img class="post_img" src=${obj.attachments[0]["video"]["image"][3].url}></img>`;
        }
        return `<div></div>`;
    };

    //Формируем html код из массива
    let html = postsArr
        .map(
            (post) => `
  <div class="post">
    <div class="post_date">${new Date(
        post.date * 1000
    ).toLocaleDateString()}</div>
    <div class="post_txt">${post.text}</div>
    ${loadImg(post)}
  </div>
`
        )
        .join("");

    //Добавляем посты
    postsContainer.insertAdjacentHTML("beforeend", html);
};


const savePosts = (postsArr, offset) => {

    //Пытаемся сохранить посты
    try{
        localStorage.setItem("posts", JSON.stringify(postsArr));
        localStorage.setItem("offset", offset);
    }

    //В противном случае удаляем последние 10-ть постов и перезаписываем
    catch(e){
        postsArr.splice(0, count)
        localStorage.removeItem("posts")
        localStorage.setItem("posts", JSON.stringify(postsArr));
        localStorage.setItem("offset", offset);
    }

    //Подсчитываем занятый объем
    let lengthKeys = 0

    for(key of Object.keys(localStorage)){
        let value = localStorage.getItem(key)
        lengthKeys += value.length
    }

    console.log((lengthKeys / (512 * 1024)).toFixed(3) + "Мб/" + localStorage.getItem("size"))
};

//Проверка записей в хранилище
const checkLocalStorage = () => {
    //ПРоверяем наличие ключа
    if (!localStorage.hasOwnProperty("posts")) {
        return false;
    }

    let savedPosts = localStorage.getItem("posts");
    let savedOffset = localStorage.getItem("offset");

    //Присваиваем переменным значения из хранилища
    posts = JSON.parse(savedPosts);
    offset = JSON.parse(savedOffset);

    return true;
};

//Функция догрузки постов
const checkPosition = () => {
    //Получаем высоту просмотра и высоту всего скрола
    const height = postsContainer.scrollHeight;
    const screenHeight = postsContainer.clientHeight;

    //Записываем, сколько пикселей пользователь уже проскроллил
    const scrolled = postsContainer.scrollTop;

    const threshold = height - screenHeight / 4;

    // Отслеживаем, где находится низ экрана относительно страницы
    const position = scrolled + screenHeight;

    if (position >= threshold) {
        loadPosts();
    }
};

//Функция защиты от троттлинга
function throttle(callee, timeout) {
    let timer = null;

    return function perform(...args) {
        if (timer) return;

        timer = setTimeout(() => {
            callee(...args);

            clearTimeout(timer);
            timer = null;
        }, timeout);
    };
}

postsContainer.addEventListener("scroll", throttle(checkPosition, 300));

//Функция получения доступного объема в хранилище
const getMaxLocalStorageSize = () => {
    let testKey = "test";
    let testData = "";
    try {
        //Строка в 0.5Мб, символ UTF-16 хранит в себе 2 байта, поэтому 512
        let stringHalfMb = "a".repeat(512 * 512);

        // Заполняем данные до тех пор, пока не будет выброшено исключение
        while (true) {
            localStorage.setItem(testKey, testData);
            testData += stringHalfMb; // Увеличиваем объем данных

            //Записываем каждые 0.5Мб в LocalStorage значение занимаемого размера
            if (testData.length % (512 * 512) == 0) {
                localStorage.setItem(
                    "size",
                    testData.length / (512 * 1024) + "Мб"
                );
            }
        }
    } catch (e) {
        // Обработка исключения - вышли за пределы доступного пространства
        localStorage.removeItem("test"); // Удаляем тестовые данные
        return localStorage.getItem("size"); // Возвращаем максимальный размер данных
    }
}


//Функция для запуска
const init = () => {
    //Если объем хранилища не вычислен, вычисляем)
    if(!localStorage.hasOwnProperty("size")){
        getMaxLocalStorageSize()
    }

    //Проверяем наличие записанных постов в хранилище
    if (checkLocalStorage()) {
        renderPosts(posts);
        return 
    }
    loadPosts();
};

init()


