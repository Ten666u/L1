let sizeContainer = document.getElementById("size");

const getMaxLocalStorageSize = () => {
    let testKey = "test";
    let testData = "";
    try {
        //Строка в 0.5Мб, символ UTF-16 хранит в себе 2 байта, поэтому 512
        let stringHalfMb = "a".repeat(512 * 512);

        // Заполняем данные до тех пор, пока не будет выброшено исключение
        while (true) {
            localStorage.setItem(testKey, testData);
            testData += stringHalfMb; // Увеличиваем объем данных

            //Записываем каждые 0.5Мб в LocalStorage значение занимаемого размера
            if (testData.length % (512 * 512) == 0) {
                localStorage.setItem(
                    "size",
                    testData.length / (512 * 1024) + "Мб"
                );
            }
        }
    } catch (e) {
        // Обработка исключения - вышли за пределы доступного пространства
        localStorage.removeItem("test"); // Удаляем тестовые данные
        return localStorage.getItem("size",); // Возвращаем максимальный размер данных
    }
};

// Edge 10Мб
// Chrome 10Мб
// Яндекс 10Мб
// Opera 10Мб
alert(getMaxLocalStorageSize())
