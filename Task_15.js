//Первая асинхронная операция
const asyncOperation1 = () =>{
    return new Promise((resolve) =>{
        setTimeout(
            () =>
                resolve(
                    [1, 2, 3].map((elem) => {
                        return elem * elem;
                    })
                ),
            1000
        );
    });
};

//Вторая асинхронная операция
const asyncOperation2 = () =>{
    return new Promise((resolve) => {
        setTimeout(() => resolve(Math.floor(Math.random() * 100)), 1500);
    });
};

//Третья асинхронная операция
const asyncOperation3 = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([1, 3, 10].reduce((result, elem) => {return result+=elem}, 0)), 2000);
    });
};

 //Функция вызова асинхронных операций с использованием await
const asyncCall = async ()=>{
    let result1 = await asyncOperation1();
    console.log("Result1:", result1);

    let result2 = await asyncOperation2();
    console.log("Result2:", result2);

    let result3 = await asyncOperation3();
    console.log("Result3:", result3);

    // Возвращение результата
    return [result1, result2, result3];
}

// Использование асинхронной функции
asyncCall()
    .then((result) => {
        console.log("Результат операций:", result);
    })
