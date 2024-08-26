var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Figure = /** @class */ (function () {
    function Figure(name) {
        this.area = 0;
        this.name = name;
    }
    return Figure;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(radius) {
        var _this = _super.call(this, "Circle") || this;
        _this.radius = radius;
        _this.area = _this.calculateArea();
        return _this;
    }
    Circle.prototype.calculateArea = function () {
        return Math.PI * this.radius * this.radius;
    };
    return Circle;
}(Figure));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(base, height) {
        var _this = _super.call(this, 'Triangle') || this;
        _this.base = base;
        _this.height = height;
        _this.area = _this.calculateArea();
        return _this;
    }
    Triangle.prototype.calculateArea = function () {
        return 0.5 * this.base * this.height;
    };
    return Triangle;
}(Figure));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(w, h) {
        var _this = _super.call(this, "Rectangle") || this;
        _this.w = w;
        _this.h = h;
        _this.area = _this.calculateArea();
        return _this;
    }
    Rectangle.prototype.calculateArea = function () {
        return this.w * this.h;
    };
    return Rectangle;
}(Figure));
function printArea(figure) {
    figure.forEach(function (figure) {
        console.log("\u041F\u043B\u043E\u0449\u0430\u0434\u044C ".concat(figure.name, " \u0440\u0430\u0432\u043D\u0430 ").concat(figure.area));
    });
}
var figure = [
    new Circle(5),
    new Triangle(10, 8),
    new Rectangle(4, 7)
];
printArea(figure);
