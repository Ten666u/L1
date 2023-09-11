const animeTarget = document.getElementById("animeTarget");
const animeContainer = document.getElementById("animeContainer");

//Функция анимации
//Timing указывает график времени, по которому протекает функция
//Draw сами изменения во время анимации
//Duration длительность анимации
const animate = ({ timing, draw, duration }) => {
    //Вычисление начала анимации
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
   
        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

        if (timeFraction > 1){
            //Запускаем обратную анимацию
            animateBack({
                duration: 5000,
                timing: bounceOut,
                draw: function(progress) {
                    //Детали анимации
                    animeTarget.style.bottom = (animeContainer.offsetHeight - 107) - (animeContainer.offsetHeight - 107) * progress + 'px';
                    animeContainer.style.transform = 'rotate('+ 360 * progress +'deg)';

                    animeTarget.style.width = 100 - (progress * 68)  + 'px'
                    animeTarget.style.height = 100 - (progress * 68) + 'px'
                    animeTarget.style.borderRadius = 100 - (progress * 68) + 'px'
                    animeTarget.style.left =  ((100 - animeTarget.offsetWidth)/2) + 'px'
                }
            })
        }
    });
};

//Обратная анимация
const animateBack = ({ timing, draw, duration }) => {
    //Вычисление начала анимации
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        
        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
};

//Функцию графика времени
function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return (
                -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) +
                Math.pow(b, 2)
            );
        }
    }
}

//Обратный график времени прыжка
function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
}

//Присваиваем обратный график
let bounceOut = makeEaseOut(bounce)

animeTarget.onclick = function (){
    animate({
        duration: 5000,
        timing: bounce,
        draw: function(progress) {
            animeTarget.style.bottom = progress * (animeContainer.offsetHeight - 107) + 'px';
            animeContainer.style.transform = 'rotate('+ 360 * progress +'deg)';

            animeTarget.style.width = (progress * 68) + 32 + 'px'
            animeTarget.style.height = (progress * 68) + 32 + 'px'
            animeTarget.style.borderRadius = (progress * 68) + 32 + 'px'
            animeTarget.style.left =  ((100 - animeTarget.offsetWidth)/2) + 'px'
        }
    })
}

