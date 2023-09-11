//Клас родитель
class Shape {
    //Наследуемый метод рассчёта площади
    calcArea() {
        throw new Error("calcArea must be defined");
    }

    //Наследуемый метод рассчёта периметра
    calcPerimeter() {
        throw new Error("calcPerimeter must be defined");
    }
}

//Круг - класс потомок Shape
class Circle extends Shape {
    constructor(radius) {
        //Обращаемся к родителю
        super();

        //Присваиваем поле радиуса
        this.radius = radius;
    }

    //Переопределяем метод рассчёта площади
    calcArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }

    //Переопределяем метод рассчёта периметра
    calcPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

//Треугольник - класс потомок Shape
class Triangle extends Shape {
    constructor(side1, side2, side3) {
        //Обращаемся к родителю
        super();

        //Присваиваем стороны
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side2;
    }

    //Переопределяем метод рассчёта площади
    calcArea() {
        let p = this.calcPerimeter() / 2;

        return Math.sqrt(
            p * (p - this.side1) * (p - this.side2) * (p - this.side3)
        );
    }

    //Переопределяем метод рассчёта периметра
    calcPerimeter() {
        return this.side1 + this.side2 + this.side3;
    }
}

//Прямоугольник - класс потомок Shape
class Rectangle extends Shape {
    constructor(side1, side2) {
        //Обращаемся к родителю
        super();

        //Присваиваем стороны
        this.side1 = side1;
        this.side2 = side2;
    }

    //Переопределяем метод рассчёта площади
    calcArea() {
        return this.side1 * this.side2
    }

    //Переопределяем метод рассчёта периметра
    calcPerimeter() {
        return 2 * (this.side1 + this.side2)
    }
}

