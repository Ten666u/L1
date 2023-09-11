//Количество вызовов
const count = 951

const сallWriteSize = () => {

    //Начальная строка и индекс вставки
    let stringDocumentWrite = "<script>document.write(document.write())</script>"
    let index = 0
    
    //Цикл вставки document.write
    for(let i= 0; i <= count; i++){
        //Индекс для вставки
        index = stringDocumentWrite.indexOf("document.write()") + 15
        
        //Последним вставляем строчку
        if(i == count){
            stringDocumentWrite = stringDocumentWrite.slice(0, index) + "document.write('WB')" + stringDocumentWrite.slice(index)
        }
        
        //Иначе добавляем в <скрипт> document.write() 
        else{
            stringDocumentWrite = stringDocumentWrite.slice(0, index) + "document.write()" + stringDocumentWrite.slice(index)
        }
        
    }

    //Возвращаем скрипт для вставки в документ
    return stringDocumentWrite
};

//Происходит переполнение стека,
//По всей видимости функция имеет достаточно большой размер, по сравнению с обычной рекурсией без атрибутов и методов
//Возможность увидеть ее изнутри нет, потому что document.write() является частью реализации браузера и в каждом браузере разная функция
//=> разный объем 
//Это доказывает разное количество возможных вызовов
//IE = 951 раз
//Chrome 1103 раза
//Opera 1104 раза
//Yandex 1064 раза
document.write(сallWriteSize())

