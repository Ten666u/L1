//Массив для проверки
obj = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    cars: [{color: "Синяя", power: 130}, {color: "Красный", power: 110}],
    wife: null,

    sayHi() { // будет пропущено
        alert("Hello");
      },
    [Symbol("id")]: 123, // также будет пропущено
    something: undefined // как и это - пропущено
}

const JSONtoString = (data) =>{
    
    //Проверка на объект
    if(typeof data == "object" && data !== null){

        //Проверка на массив
        if(Array.isArray(data)){

            //Фильтрация от функций, undefined и ссылочных переменных
            arrFilter = data.filter(value =>{
                if(typeof value == "function" || typeof value == "undefined" || typeof value == "symbol"){
                    return false
                }
                return true
            })

            //Запись переменных по JSON
            let arrJSON = arrFilter.map((value) => {
                //Двойные кавычки
                if(typeof value == "string"){
                    return `"${value}"`
                }

                //Рекурсивный вызов если элемент массива объект или внутренний массив
                else if(typeof value == "object" && value !== null){
                    return JSONtoString(value)
                }

                //Возвращаем без изменений boolean, Number и null
                else{
                    return value
                }
            })

            //Оборачиваем массив в строку с []
            return `[${arrJSON}]`
        }
        
        else{
            //Достаём ключи и значения объекта
            let objArray= Object.entries(data)

            //Фильтруем объект по JSON
            let objFilter = objArray.filter(([key, value]) =>{
                if(typeof value == "function" || typeof value == "undefined" || typeof key == "symbol" || typeof value == "symbol"){
                    return false
                }
                return true
            })

            //Запись переменных по JSON
            let objStr = objFilter.map(([key, value]) =>{

                //Оборачиваем в двойные скобни
                if(typeof value == "string"){
                    return `"${key}":"${value}"`
                }

                //Рекурсивный вызов если значение поля другой объект или массив
                else if(typeof value == "object" && value !== null){
                    return `"${key}":${JSONtoString(value)}`
                }

                //Возвращаем без изменений boolean, Number и null и оборачиваем ключ в двойные скобки
                return `"${key}":${value}`
            })

            //Преобразуем массив в JSON соединяя запятой элементы и оборачивая в {}
            return `{${objStr.join(",")}}`
        }
    }
}

console.log(JSONtoString(obj))