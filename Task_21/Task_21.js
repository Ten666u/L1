const сallStackSize = () => {
    //Счетчик
    let count = 0;

    //Рекурсивная функция переполнения
    const callStackOverflow = () => {

        //Конструкция для выхода во время ошибки из рекурсии
        try {
            //Увеличиваем счетчик и вызываем функцию
            count++;
            callStackOverflow();
        } catch (error) {
            // Когда возникает ошибка переполнения стека, возвращаем счетчик
            return count;
        }
    };

    // Запускаем функцию переполнения
    callStackOverflow();

    // Возвращаем размер коллстека
    return count;
};

//IE 12555 вызовов функций
//Chrome 12554 вызовов функций
//Safari 7944 вызовов функций
const callStackSize = сallStackSize()
alert(`Размер коллстека: ${callStackSize} вызовов функций.`);
