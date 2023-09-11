//Ссылка на деревья
const firstTree = document.getElementById("firstTree")
const secondTree = document.getElementById("secondTree")

//Фунция обхода
const traversingDOM = (e) =>{
    //Вывод элемента в консоль
    console.log(e)

    //Цикл для обхода потомков
    for(let i = 0; i < e.childNodes.length; i++){
        //Присваивание потомка переменной
        let child = e.childNodes[i]

        //Ставим условие, чтобы потомок был узлом, а не текстовым наполнением тега
        if(child.nodeName !== '#text'){
            //Запускаем функцию для потомка
            traversingDOM(child)
        }
    }
}

traversingDOM(secondTree)