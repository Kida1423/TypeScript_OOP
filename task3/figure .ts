abstract class Figure {
        public area: number = 0
        public name: string;

        constructor(name: string){
            this.name = name
        }

    public abstract calculateArea(): number;
}
class Circle extends Figure {
    private radius: number;
    constructor(radius: number){
        super("Circle")
        this.radius = radius
        this.area = this.calculateArea()
    }

    public calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Triangle extends Figure {
    private base: number;
    private height: number;
    constructor(base: number, height: number){
        super('Triangle')
        this.base = base 
        this.height = height
        this.area = this.calculateArea()
    }

    public calculateArea(): number {
        return 0.5 * this.base * this.height;
    }
}

class Rectangle extends Figure {
    private w: number;
    private h: number;
    constructor(w: number, h: number){
        super("Rectangle")
        this.w = w
        this.h = h
        this.area = this.calculateArea()
    }

    public calculateArea(): number {
        return this.w * this.h;
    }
}

function printArea(figure: Figure[]){
    figure.forEach(figure => {
        console.log(`Площадь ${figure.name} равна ${figure.area}`);
    });
}

const figure: Figure[] = [
    new Circle(5),
    new Triangle(10, 8),
    new Rectangle(4, 7)
] 

printArea(figure);



















