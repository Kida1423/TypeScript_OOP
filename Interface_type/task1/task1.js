var TV = /** @class */ (function () {
    function TV() {
    }
    TV.prototype.turnOn = function () {
        console.log("TV is turned on.");
    };
    TV.prototype.turnOff = function () {
        console.log("TV is turned off.");
    };
    TV.prototype.nextChannel = function () {
        console.log("Next channel");
    };
    TV.prototype.previousChannel = function () {
        console.log("Previous channel");
    };
    return TV;
}());
var Refrigerator = /** @class */ (function () {
    function Refrigerator() {
    }
    Refrigerator.prototype.turnOn = function () {
        console.log("Refrigerator is turned on.");
    };
    Refrigerator.prototype.turnOff = function () {
        console.log("Refrigerator is turned off.");
    };
    Refrigerator.prototype.defrost = function () {
        console.log("Refrigerator is defrosting.");
    };
    Refrigerator.prototype.openDoor = function () {
        console.log("Refrigerator door is open.");
    };
    Refrigerator.prototype.closeDoor = function () {
        console.log("Refrigerator door is closed.");
    };
    return Refrigerator;
}());
var Computer = /** @class */ (function () {
    function Computer() {
    }
    Computer.prototype.turnOn = function () {
        console.log("Computer is turned on.");
    };
    Computer.prototype.turnOff = function () {
        console.log("Computer is turned off.");
    };
    Computer.prototype.startGame = function () {
        console.log("Game is started.");
    };
    Computer.prototype.closeGame = function () {
        console.log("Game is closed.");
    };
    return Computer;
}());
var tv = new TV();
tv.turnOn();
tv.nextChannel();
tv.previousChannel();
tv.turnOff();
console.log('\n');
var comp = new Computer();
comp.turnOn();
comp.startGame();
comp.closeGame();
comp.turnOff();
console.log('\n');
var fridge = new Refrigerator();
fridge.turnOn();
fridge.openDoor();
fridge.defrost();
fridge.closeDoor();
fridge.turnOff();
