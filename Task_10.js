const JSONparse = (json) =>{

    //Проверяем тип данных
    if(typeof json !== 'string'){ 
        throw Error('Not JSON type');
    }

    // Удаляем пробелы
    json = json.trim();

    // Обрабатывем пустую строку
    if(json == ""){
        throw Error('JSON Empty')
    }

    let index = 0;

    // Функция парсинга Object
    const objParse = () =>{
        index++
        let obj = {}

        while (index <= json.length - 1) {
            //Возвращаем объект если найдена закрывающая скобка
            if(json[index] == "}"){
                index++
                return obj
            }

            //Полученаем ключ
            let key = strParse()

            //Проходим :
            if(json[index] == ":"){
                index++
            }
            //Иначе ошибка
            else{
                throw Error(`Unexpected token '${json[index]}'`)
            }

            // Парсим значение
            let value = valueParse()

            //Сохраняем данные в объекте
            obj[key] = value

            // Если найдена запятая, продолжаем парсинг
            if(json[index] == ","){
                index++;
            }

            //Если не запятая и } ошибка
            else if(json[index] !== "}"){
                throw Error(`Unexpected token: ${json[index], index}`);
            }
        }

        throw Error("Unterminated Object");
    }

    // Функция парсинга Array
    const arrParse = () =>{
        index++
        let arr = []

        while(index <= json.length - 1){
            //Возвращаем массив если найдена закрывающая скобка
            if(json[index] == "]"){
                index++
                return arr
            }

            //Парсим значение
            let value = valueParse();
            arr.push(value)

            // Если найдена запятая, продолжаем парсинг
            if(json[index] == "," || json[index] == " "){
                index++
            }
        }

        throw Error("Unterminated Array")
    }

    //Функция парсинга String
    const strParse = () =>{
        index++
        let result = ""

        while(index <= json.length - 1){
            // Если текущий символ это кавычки, значит строка закончилась
            if(json[index] == '"'){
                index++
                return result
            }

            result += json[index]
            index++
        }

        //В противном случае строка незакрыта
        throw Error("Unterminated string")
    }

    // Функция парсинга Number
    const numParse = () =>{
        let result = ""

        // Пока текущий символ является числом, увеличиваем index
        while(index <= json.length - 1 && (("0" <= json[index] && json[index] <= "9") || json[index] == "-" || json[index] == "." )){
            result += json[index]
            index++
        }

        //Приводим к числу
        result = Number(result)

        //Проверка корректности числа
        if(isNaN(result)){
            throw Error(`Invalid number: ${result}`)
        }

        return result;
    }

    const boolNullParse = () =>{
        let result = ""

        while(index <= json.length - 1){
            result += json[index]
            index++

            if(result == "true"){
                return true
            }
    
            if(result == "false"){
                return false
            }

            if(result == "null"){
                return false
            }
        }
        
        throw Error(`Invalid JSON`)
    }

    //Функция определения типа парсинга
    const valueParse = () =>{
        let char = json[index];

        //Парсинг объекта
        if(char === "{"){
            return objParse();
        }

        //Парсинг массива
        if(char === "["){
            return arrParse();
        }

        //Парсинг числа
        if(char === "-" || (char >= "0" && char <= "9")){
            return numParse();
        }

        //Парсинг строки
        if(char === '"'){
            return strParse();
        }

        if(char === "t" || char === "f" || char === "n"){
            return boolNullParse()
        }

        throw Error(`Unexpected token: ${char}`)
    }
    
    return valueParse()
}

let json = '{"name":"John","age":30,"isAdmin":false,"courses":["html","css","js"],"cars":[{"color":"Синяя","power":130},{"color":"Красный","power":110}],"wife":null}'
console.log(JSONparse(json));
