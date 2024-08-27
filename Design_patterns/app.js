var _a, _b, _c, _d, _e;
var FeedStrategy = /** @class */ (function () {
    function FeedStrategy() {
    }
    FeedStrategy.prototype.applyBehavior = function (animal) {
        var age = animal.age;
        var step = this.getStep(age);
        animal.satiety += step;
        animal.mood += step;
        animal.health += step;
        if (Math.random() < 0.1) {
            animal.satiety -= step;
            animal.mood -= step * 2;
            animal.health -= step * 2;
            if (animal.health <= 0) {
                animal.die();
            }
        }
    };
    FeedStrategy.prototype.getStep = function (age) {
        if (age <= 5)
            return 10;
        if (age <= 10)
            return 5;
        return 2;
    };
    return FeedStrategy;
}());
var PlayStrategy = /** @class */ (function () {
    function PlayStrategy() {
    }
    PlayStrategy.prototype.applyBehavior = function (animal) {
        var age = animal.age;
        var decreaseStep = this.getDecreaseStep(age);
        var increaseStep = this.getIncreaseStep(age);
        animal.satiety -= decreaseStep;
        animal.mood += increaseStep;
        animal.health += increaseStep;
        if (Math.random() < 0.1) {
            animal.mood -= increaseStep * 2;
            animal.health -= increaseStep * 2;
            if (animal.health <= 0) {
                animal.die();
            }
        }
    };
    PlayStrategy.prototype.getDecreaseStep = function (age) {
        if (age <= 5)
            return 2;
        if (age <= 10)
            return 5;
        return 10;
    };
    PlayStrategy.prototype.getIncreaseStep = function (age) {
        if (age <= 5)
            return 10;
        if (age <= 10)
            return 5;
        return 2;
    };
    return PlayStrategy;
}());
var HealStrategy = /** @class */ (function () {
    function HealStrategy() {
    }
    HealStrategy.prototype.applyBehavior = function (animal) {
        var age = animal.age;
        var step = this.getStep(age);
        animal.mood += step;
        animal.health += step;
        if (animal.health <= 0) {
            animal.die();
        }
    };
    HealStrategy.prototype.getStep = function (age) {
        if (age <= 5)
            return 10;
        if (age <= 10)
            return 5;
        return 2;
    };
    return HealStrategy;
}());
var Animal = /** @class */ (function () {
    function Animal(name, age, strategy) {
        this.satiety = 0;
        this.mood = 0;
        this.health = 0;
        this.name = name;
        this.age = age;
        this.behaviorStrategy = strategy;
    }
    Animal.prototype.applyBehavior = function () {
        this.behaviorStrategy.applyBehavior(this);
        this.checkHealth();
    };
    Animal.prototype.checkHealth = function () {
        if (this.health <= 0) {
            this.die();
        }
    };
    Animal.prototype.die = function () {
        console.log("".concat(this.name, " has died."));
        var index = pets.indexOf(this);
        if (index > -1) {
            pets.splice(index, 1);
        }
        displayPets();
    };
    return Animal;
}());
var pets = [
    new Animal('Fluffy', 5, new FeedStrategy()),
    new Animal('Muli', 3, new FeedStrategy())
];
function displayPets() {
    var petList = document.getElementById('petList');
    petList.innerHTML = '';
    pets.forEach(function (pet, index) {
        petList.innerHTML += "<div>".concat(index + 1, ". ").concat(pet.name, ", Age: ").concat(pet.age, ", Satiety: ").concat(pet.satiety, ", Mood: ").concat(pet.mood, ", Health: ").concat(pet.health, "</div>");
    });
    var animalSelect = document.getElementById("animalSelect");
    animalSelect.innerHTML = '';
    pets.forEach(function (animal) {
        var option = document.createElement("option");
        option.value = animal.name;
        option.textContent = animal.name;
        animalSelect.appendChild(option);
    });
}
function addPet() {
    var petNameInput = document.getElementById('petName');
    var petAgeInput = document.getElementById('petAge');
    var petName = petNameInput.value.trim();
    var petAge = parseInt(petAgeInput.value, 10);
    if (petName === '' || petAge <= 0 || isNaN(petAge)) {
        alert("Please enter valid name and age.");
        return;
    }
    var defaultStrategy = new FeedStrategy();
    var newPet = new Animal(petName, petAge, defaultStrategy);
    pets.push(newPet);
    displayPets();
    petNameInput.value = '';
    petAgeInput.value = '';
    document.getElementById('addPetDialog').style.display = 'none';
}
(_a = document.getElementById('addPetBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    document.getElementById('addPetDialog').style.display = 'block';
});
(_b = document.getElementById('submitPetBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addPet);
(_c = document.getElementById('feedAnimalBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    var animalSelect = document.getElementById('animalSelect');
    var selectedAnimalName = animalSelect.value;
    var selectedAnimal = pets.filter(function (pet) { return pet.name === selectedAnimalName; })[0];
    if (selectedAnimal) {
        selectedAnimal.behaviorStrategy = new FeedStrategy();
        selectedAnimal.applyBehavior();
    }
    displayPets();
});
(_d = document.getElementById('playAnimalBtn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    var animalSelect = document.getElementById('animalSelect');
    var selectedAnimalName = animalSelect.value;
    var selectedAnimal = pets.filter(function (pet) { return pet.name === selectedAnimalName; })[0];
    if (selectedAnimal) {
        selectedAnimal.behaviorStrategy = new PlayStrategy();
        selectedAnimal.applyBehavior();
    }
    displayPets();
});
(_e = document.getElementById('healAnimalBtn')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
    var animalSelect = document.getElementById('animalSelect');
    var selectedAnimalName = animalSelect.value;
    var selectedAnimal = pets.filter(function (pet) { return pet.name === selectedAnimalName; })[0];
    if (selectedAnimal) {
        selectedAnimal.behaviorStrategy = new HealStrategy();
        selectedAnimal.applyBehavior();
    }
    displayPets();
});
displayPets();
