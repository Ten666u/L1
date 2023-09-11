const jsonToLinkedList = (json) => {
    //Парсим JSON
    let objArray = JSON.parse(json);

    //Проверка на корректность введенного JSON
    if (objArray.length == 0 || !Array.isArray(objArray)) return;

    //Начало списка с полем данных и ссылкой на следующий элемент
    const head = {
        value: objArray[0],
        next: null,
    };

    //Текущий узел
    let current = head;

    //Заполняем список, пока не дойдем до последнего объекта
    for (let i = 1; i <= objArray.length - 1; i++) {
        //Создаём новый узел
        let newNode = {
            value: objArray[i],
            next: null,
        };

        //Указываем ссылку на новый узел
        current.next = newNode;

        //Делаем текущим новый узел
        current = newNode;
    }

    //Для обхода списка возвращаем первый элемент
    return head;
};
