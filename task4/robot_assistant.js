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
var Tool = /** @class */ (function () {
    function Tool() {
        this.strength = 100;
    }
    Tool.prototype.action = function () {
        if (this.strength > 0) {
            this.strength -= 10;
            console.log("\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F. \u041F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C: ".concat(this.strength));
        }
        else {
            console.log("Инструмент сломан и не может быть использован.");
        }
    };
    Tool.prototype.isBroken = function () {
        return this.strength <= 0;
    };
    return Tool;
}());
var Saw = /** @class */ (function (_super) {
    __extends(Saw, _super);
    function Saw() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Saw.prototype.action = function () {
        if (!this.isBroken()) {
            _super.prototype.action.call(this);
            console.log("Пила: ZZZZZZZZZZ");
        }
    };
    return Saw;
}(Tool));
var Axe = /** @class */ (function (_super) {
    __extends(Axe, _super);
    function Axe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Axe.prototype.action = function () {
        if (!this.isBroken()) {
            _super.prototype.action.call(this);
            console.log("Топор: Чик-Чик");
        }
    };
    return Axe;
}(Tool));
var Drill = /** @class */ (function (_super) {
    __extends(Drill, _super);
    function Drill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Drill.prototype.action = function () {
        if (!this.isBroken()) {
            _super.prototype.action.call(this);
            console.log("Дрель: Вжжжжж");
        }
    };
    return Drill;
}(Tool));
var Hammer = /** @class */ (function (_super) {
    __extends(Hammer, _super);
    function Hammer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hammer.prototype.action = function () {
        if (!this.isBroken()) {
            _super.prototype.action.call(this);
            console.log("Молоток: Бах-Бах");
        }
    };
    return Hammer;
}(Tool));
var Screwdriver = /** @class */ (function (_super) {
    __extends(Screwdriver, _super);
    function Screwdriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Screwdriver.prototype.action = function () {
        if (!this.isBroken()) {
            _super.prototype.action.call(this);
            console.log("Шуруповёрт: Винт-Винт");
        }
    };
    return Screwdriver;
}(Tool));
var Robot = /** @class */ (function () {
    function Robot() {
        this.tool = null;
    }
    Robot.prototype.setupTool = function (tool) {
        this.tool = tool;
        console.log("Инструмент установлен на робота.");
    };
    Robot.prototype.drop_tool = function () {
        if (this.tool) {
            console.log("Инструмент снят с робота.");
            this.tool = null;
        }
        else {
            console.log("На роботе нет инструмента.");
        }
    };
    Robot.prototype.action = function () {
        if (!this.tool) {
            console.log("Робот не оснащен инструментом.");
        }
        else if (this.tool.isBroken()) {
            console.log("Инструмент сломан и не может быть использован.");
        }
        else {
            this.tool.action();
        }
    };
    return Robot;
}());
var robot = new Robot();
var saw = new Saw();
var hammer = new Hammer();
robot.setupTool(saw);
robot.action();
robot.action();
robot.drop_tool();
robot.setupTool(hammer);
robot.action();
robot.drop_tool();
robot.action();
