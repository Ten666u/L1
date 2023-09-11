const sortObj = (arr) => {
    //Вовзращаем результат sort
    return arr.sort((first, second) => {

        //Если одинаковый возраст возвращаем сравнение имен
        if (first.age == second.age)
            return first.name.localeCompare(second.name);

        //Иначе возвращаем сравнение возраста
        return first.age - second.age;
    });
};