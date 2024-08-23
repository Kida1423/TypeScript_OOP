var Elevator = /** @class */ (function () {
    function Elevator(currentFloor) {
        this.capacity = 500;
        this.maxFloor = 18;
        this.minFloor = 1;
        this.currentFloor = currentFloor;
    }
    Elevator.prototype.move = function (toFloor, weight) {
        if (!this.isAllowableWeight(weight) || !this.isAllowableFloor(toFloor)) {
            console.log("Этаж не должен быть ниже 1 и выше 18 и вес не должен превышать 500 кг");
            return;
        }
        if (toFloor === this.currentFloor) {
            console.log("\u041B\u0438\u0444\u0442 \u0443\u0436\u0435 \u043D\u0430 \u044D\u0442\u0430\u0436\u0435 ".concat(toFloor));
            return;
        }
        if (toFloor < this.currentFloor) {
            for (var index = this.currentFloor; index >= toFloor; index--) {
                this.currentFloor = index;
                console.log("\u042D\u0442\u0430\u0436 ".concat(index));
                this.simulateStuck();
            }
        }
        else if (toFloor > this.currentFloor) {
            for (var index = this.currentFloor; index <= toFloor; index++) {
                this.currentFloor = index;
                console.log("\u042D\u0442\u0430\u0436 ".concat(index));
                this.simulateStuck();
            }
        }
        console.log("\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u044D\u0442\u0430\u0436: ".concat(this.currentFloor));
        setTimeout(function () {
            startElevator();
        }, 500);
    };
    Elevator.prototype.isAllowableWeight = function (weight) {
        return weight <= this.capacity;
    };
    Elevator.prototype.isAllowableFloor = function (floor) {
        return floor >= this.minFloor && floor <= this.maxFloor;
    };
    Elevator.prototype.simulateStuck = function () {
        if (Math.random() < 1 / 3) {
            console.log("\u041B\u0438\u0444\u0442 \u0437\u0430\u0441\u0442\u0440\u044F\u043B \u043D\u0430 \u044D\u0442\u0430\u0436\u0435 ".concat(this.currentFloor));
        }
    };
    return Elevator;
}());
function startElevator() {
    var elev = new Elevator(1);
    while (true) {
        var floorInput = prompt('Введите номер этажа (или "exit" для выхода): ');
        if (floorInput === null || floorInput.toLowerCase() === "exit") {
            console.log("Завершение работы.");
            break;
        }
        var weightInput = prompt('Введите вес (или "exit" для выхода): ');
        if (weightInput === null || weightInput.toLowerCase() === "exit") {
            console.log("Завершение работы.");
            break;
        }
        var floor = parseInt(floorInput, 10);
        var weight = parseInt(weightInput, 10);
        if (!isNaN(floor) && !isNaN(weight)) {
            elev.move(floor, weight);
        }
        else {
            console.log("Неверный ввод. Пожалуйста, введите числовые значения.");
        }
    }
}
startElevator();
