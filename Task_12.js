const book = {
    //Поля объекта
    _title: "Шантарам",
    _author: "Грегори Дэвид Робертс",
    _year: 2003,

    //Метод получения названия
    getTitle() {
        return this._title;
    },

    //Метод изменения названия
    setTitle(title) {
        this._title = title;
    },

    //Метод получения автора
    getAuthor() {
        return this._author;
    },

    //Метод изменения автора
    setAuthor(author) {
        this._author = author;
    },

    //Метод получения года
    getYear() {
        return this._year;
    },

    //Метод изменения года
    setYear(year) {
        this._year = year;
    },
};
