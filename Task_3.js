const MathX = (function () {

    //Создаем локальные переменный массивов Ряда Фибоначчи и простых чисел
    const memoFib = [1, 1]; //Значение первые значения для работы алгоритма
    const memoSimple = [2]; //Значение для работы алгоритма

    return {

        //Функция для вычисления числа Фибоначчи
        fibN: (n) => {

            //Проверяем массив на наличие числа
            if (memoFib.length >= n) {
                return memoFib[n - 1];
            }

            //В противном случае заполняем массим числами до N
            else {

                //Запускаем функцию заполнения ряда до N
                for (let i = memoFib.length; i < n; i++) {
                    memoFib.push(memoFib.at(-1) + memoFib.at(-2));
                }

                return memoFib.at(-1);
            }
        },

        //Функция вычисления ряда Фибоначчи до N
        fibSeries: (n) => {

            //Дополняем если массив неполон
            if (memoFib.at(-1) < n) {

                //Дополняем массив пока последнее элемент ряда не будет >= N
                while (memoFib.at(-1) <= n) {
                    memoFib.push(memoFib.at(-1) + memoFib.at(-2));
                }
            }

            //Если последний член ряда равен n, выводим весь массив
            if (memoFib.at(-1) == n) {
                return memoFib;
            }

            //В противном случае выводим кусок до первого элемента ряда > N
            else {
                return memoFib.slice(0, memoFib
                    .findIndex((elem) => {
                        return elem > n;
                    })
                );
            }
        },

        //Функция для вычисление простого числа
        simpleN: (n) => {

            //Проверяем массив на наличие числа
            if(memoSimple.length >= n){
                return memoSimple[n-1]
            }

            else{
                //Пока длинна массива не будет больше N, заполняем массив
                while(memoSimple.length < n){

                    let newNumber = memoSimple.at(-1)
                    let newNumberFlag = false

                    //Пока флаг нового числа не будет поднят ищем простое число
                    while(!newNumberFlag){
                        newNumber++

                        //Если в массиве не встретилось числа, способного разделить без остатка, добавляем его в массив и поднимаем флаг
                        if(!memoSimple.find(elem => newNumber % elem == 0)){
                            memoSimple.push(newNumber)
                            newNumberFlag = true
                        }
                    }
                }
                return memoSimple.at(-1)
            }
        },

        //Функция для вычисление ряда до N
        simpleSeries: (n) =>{

            //Дополняем если массив неполон
            if(memoSimple.at(-1) < n){
                //Пока длинна массива не будет больше N, заполняем массив
                while(memoSimple.at(-1) < n){

                    let newNumber = memoSimple.at(-1)
                    let newNumberFlag = false

                    //Пока флаг нового числа не будет поднят, ищем простое число
                    while(!newNumberFlag){
                        newNumber++

                        //Если в массиве не встретилось числа, способного разделить без остатка, добавляем его в массив и поднимаем флаг
                        if(!memoSimple.find(elem => newNumber % elem == 0)){
                            memoSimple.push(newNumber)
                            newNumberFlag = true
                        }
                    }
                }
            }

            ///Если последний член ряда равен n, выводим весь массив
            if(memoSimple.at(-1) == n){
                return memoSimple
            }

            //В противном случае выводим кусок до первого элемента ряда > N
            else{
                return memoSimple.slice(0, memoSimple
                    .findIndex((elem) => {
                        return elem > n;
                    })
                );
            }
        }
    };
})();

