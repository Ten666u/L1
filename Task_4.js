export default function wordEnding(num, initialForm, pluralForm, genetiveForm) {
    //Находим две последние цифры и последнюю
    let lastTwo = Math.abs(num) % 100;
    let lastN = lastTwo % 10;

    //В промежутке [11; 19] для lastTwo и [5; 9] и lastH == 0 выводим множественную форму в родительном падеже
    if (
        (11 <= lastTwo && lastTwo <= 19) ||
        (5 <= lastN && lastN <= 9) ||
        lastN == 0
    )
        return num + " " + genetiveForm;

    //В промежутке lastN [2; 4] выводим множественную форму
    if (2 <= lastN && lastN <= 4) return num + " " + pluralForm;

    //Выводим начальную форму слова
    if (lastN == 1) return num + " " + initialForm;
}
