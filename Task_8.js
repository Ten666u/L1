const arr = [
    () => {return 1},
    () => {return 2},
    () => {return 3},
    () => {return 4},
    () => {return 5},
]

//Последовательный перебор функции с циклом
const makeCall = (arr) =>{
    let result = []

    //Возвращаем функцию
    return () =>{
        //Очистка массива
        if(result.length !== 0){
            result = []
        }

        //Цикл вызовов функций
        for(func of arr)
            result.push(func())

        return result
    }
}

//Более короткий вариант
const makeCall2 = (arr) =>{

    //Возвращаем функцию
    return () =>{

        //Возвращаем новый массив с результатами с помощью map
        return arr.map(func =>{
            return func()
        })
    }
}

