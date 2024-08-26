interface ISwitchable {
    turnOn: () => void;
    turnOff: () => void;
}

interface IRefrigerator extends ISwitchable {
    defrost: () => void;
    openDoor: () => void;
    closeDoor: () => void;
}

interface IValue extends ISwitchable {
    nextChannel: () => void;
    previousChannel: () => void;
}

interface IOption extends ISwitchable {
    startGame: () => void;
    closeGame: () => void;
}

class TV implements IValue {
    turnOn() {
        console.log("TV is turned on.");
    }

    turnOff() {
        console.log("TV is turned off.");
    }

    nextChannel() {
        console.log("Next channel");
    }

    previousChannel() {
        console.log("Previous channel");
    }
}

class Refrigerator implements IRefrigerator {
    turnOn() {
        console.log("Refrigerator is turned on.");
    }

    turnOff() {
        console.log("Refrigerator is turned off.");
    }

    defrost() {
        console.log("Refrigerator is defrosting.");
    }

    openDoor() {
        console.log("Refrigerator door is open.");
    }

    closeDoor() {
        console.log("Refrigerator door is closed.");
    }
}

class Computer implements IOption {
    turnOn() {
        console.log("Computer is turned on.");
    }

    turnOff() {
        console.log("Computer is turned off.");
    }

    startGame() {
        console.log("Game is started.");
    }

    closeGame() {
        console.log("Game is closed.");
    }
}

let tv = new TV();
tv.turnOn();
tv.nextChannel();
tv.previousChannel();
tv.turnOff();
console.log('\n');

let comp = new Computer();
comp.turnOn();
comp.startGame();
comp.closeGame();
comp.turnOff();
console.log('\n');

let fridge = new Refrigerator();
fridge.turnOn();
fridge.openDoor();
fridge.defrost();
fridge.closeDoor();
fridge.turnOff();
