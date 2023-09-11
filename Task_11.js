const urlMaker = (baseUrl) =>{

    //Замыкающая функция, получаем доступ к внешней перенной baseUrl
    return (route) =>{

        //Формируем необходимый маршрут
        return baseUrl + route
    }
}

let urlRouter = urlMaker("https://www.wildberries.ru")