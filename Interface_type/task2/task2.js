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
var AbstractDoubleSquare = /** @class */ (function () {
    function AbstractDoubleSquare() {
    }
    AbstractDoubleSquare.prototype.getArea = function () {
        if (this.area === 0) {
            this.area = this.calculateArea();
        }
        return this.calculateArea();
    };
    return AbstractDoubleSquare;
}());
var Square = /** @class */ (function () {
    function Square(side) {
        this.side = side;
    }
    Square.prototype.getSide = function () {
        return this.side;
    };
    return Square;
}());
var DoubleSquare = /** @class */ (function (_super) {
    __extends(DoubleSquare, _super);
    function DoubleSquare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DoubleSquare.prototype.buildDOubleSquare = function (square1, square2) {
        this.square1 = square1;
        this.square2 = square2;
        this.area = 0;
    };
    DoubleSquare.prototype.calculateArea = function () {
        var area1 = Math.pow(this.square1.getSide(), 2);
        var area2 = Math.pow(this.square2.getSide(), 2);
        return area1 + area2;
    };
    return DoubleSquare;
}(AbstractDoubleSquare));
var square1 = new Square(10);
var square2 = new Square(12);
var doubleSquare = new DoubleSquare();
doubleSquare.buildDOubleSquare(square1, square2);
console.log("\u041F\u043B\u043E\u0449\u0430\u0434\u044C doublesquare = ".concat(doubleSquare.getArea()));
