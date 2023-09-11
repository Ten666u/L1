//Последовательный перебор по индексу
const callFunc = async (arr) => {
    //Перебираем массив по индексу
    for (let index in arr) {
        await arr[index]();
        console.log(Number(index) + 1);
    }
};

//Вызов с помощью forEach
const callFunc2 = async (arr) => {
    arr.forEach(async (func, index) => {
        //После выполнения функции выводим порядковый номер
        await func().then(console.log(index + 1));
    });
};

//С помощью рекурсии
const callFunc3 = async (arr) => {
    const callRec = async (index) => {
        //Условие c замыканием
        if (index == arr.length) {
            return;
        }

        //Дожидаемся выполнения, выводим порядковый номер
        await arr[index]();
        console.log(index + 1);

        //Вызываем для следующей функции
        return callRec(index + 1);
    };

    return callRec(0);
};
