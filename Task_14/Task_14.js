const getImage = (URL) =>{

    //Возвращаем промис
    return new Promise((resolve, reject) => {
        //Создаем изображение
        let image = new Image()

        //Обработчик загрузки
        image.onload = () => {
            //Пример работы с добавлением в документ
            const imgElement = document.createElement("img");
            //Добавляем путь
            imgElement.src = URL
            //Добавляем элемент на страницу
            document.body.appendChild(imgElement)
            
            //Возвращаем информацию по картинке
            resolve({
                width: image.width,
                height: image.height,
                src: URL,
            });
        };

        //Если пришла ошибка
        image.onerror = (error) => {
            // Отклоняем промис с данными об ошибке
            reject(Error(error));
        };

        //Устанавливаем путь до изображения
        image.src = URL;
    })
}
const imageUrl = "https://wdorogu.ru/wp-content/uploads/2022/08/12775072.jpg"

getImage(imageUrl)
  .then((imageInfo) => {
    console.log(imageInfo)
  })
  .catch((error) => {
    console.error('Произошла ошибка:', error);
  });