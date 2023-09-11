const isPalindrome = function (s) {
    //Приводим к меньшему регистру и убираем пробелы
    s = s.toLowerCase().replaceAll(" ", "");

    //Цикл for с указателями на противоположные концы слова
    for (let i = 0, j = s.length - 1; i <= j; i++, j--) {
        //Если символы не совпали, возвращаем False
        if (s[i] !== s[j]) {
            return false;
        }
    }

    return true;
};

//Решение в две строчки
const isPalindromius = function (s) {
    //Приводим к меньшему регистру и убираем пробелы
    s = s.toLowerCase().replaceAll(" ", "");

    //Сравниваем строку с перевернутой
    return s == s.split("").reverse().join("")
};

