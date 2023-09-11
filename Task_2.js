const strangeNumber = (n) =>{
    //Сумма делителей
    let sum = 0

    //Цикл разбора делителеей, выход из цикла происходит на крайнем делителе
    for(let i = 1; i <= Math.floor(n / 2); i++){

        //Проверка на остаток
        if(n % i == 0){
            sum += i
        }
    }
    //Проверка на странное число
    return sum == n
}

//Решение с рекурсией
const strangeNum = (number, divisor = 1, sum = 0) =>{
    
    //Если делитель превысил наибольшее значение, возвращаем проверку на странное число
    if(divisor > number / 2){
        return sum == number
    }

    //Проверка переменной на делитель
    if(number % divisor == 0){
        //Новый вызов с прибавленным делителем
        return strangeNum(number, divisor + 1, sum + divisor)
    }
    
    //Вызов со следующим возможным делителем
    return strangeNum(number, divisor + 1, sum)
}