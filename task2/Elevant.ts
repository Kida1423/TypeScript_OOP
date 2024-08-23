class Elevator {
    private currentFloor: number;
    private readonly capacity: number = 500;
    private readonly maxFloor: number = 18;
    private readonly minFloor: number = 1;

    constructor(currentFloor: number) {
        this.currentFloor = currentFloor;
    }

    public move(toFloor: number, weight: number) {
        if (!this.isAllowableWeight(weight) || !this.isAllowableFloor(toFloor)) {
            console.log("Этаж не должен быть ниже 1 и выше 18 и вес не должен превышать 500 кг");
            return;
        }
        if (toFloor === this.currentFloor) {
            console.log(`Лифт уже на этаже ${toFloor}`);
            return;
        }
        if (toFloor < this.currentFloor) {
            for (let index = this.currentFloor; index >= toFloor; index--) {
                this.currentFloor = index;
                console.log(`Этаж ${index}`);
                this.simulateStuck();
            }
        } else if (toFloor > this.currentFloor) {
            for (let index = this.currentFloor; index <= toFloor; index++) {
                this.currentFloor = index;
                console.log(`Этаж ${index}`);
                this.simulateStuck();
            }
        }
        console.log(`Текущий этаж: ${this.currentFloor}`);
        setTimeout(() => {
            startElevator()
        }, 500);
    }

    public isAllowableWeight(weight: number) {
        return weight <= this.capacity;
    }

    public isAllowableFloor(floor: number) {
        return floor >= this.minFloor && floor <= this.maxFloor;
    }

    private simulateStuck() {
        if (Math.random() < 1 / 3) { 
            console.log(`Лифт застрял на этаже ${this.currentFloor}`);
        }
    }
}

const floorInput = prompt('Enter floor number: ');
const weightInput = prompt('Enter weight: ');

const floor = parseInt(floorInput || '0', 10);
const weight = parseInt(weightInput || '0', 10);

if (!isNaN(floor) && !isNaN(weight)) {
    let elev: Elevator = new Elevator(1);
    elev.move(floor, weight);
} else {
    console.log("Invalid input. Please enter numeric values.");
}

function startElevator(){
    let elev = new Elevator(1);
    while (true) {
        const floorInput = prompt('Введите номер этажа (или "exit" для выхода): ');
        if (floorInput === null || floorInput.toLowerCase() === "exit") {
            console.log("Завершение работы.");
            break;
        }

        const weightInput = prompt('Введите вес (или "exit" для выхода): ');
        if (weightInput === null || weightInput.toLowerCase() === "exit") {
            console.log("Завершение работы.");
            break;
        }

        const floor = parseInt(floorInput, 10);
        const weight = parseInt(weightInput, 10);

        if (!isNaN(floor) && !isNaN(weight)) {
            elev.move(floor, weight);
        } else {
            console.log("Неверный ввод. Пожалуйста, введите числовые значения.");
        }

    }
}

startElevator();
