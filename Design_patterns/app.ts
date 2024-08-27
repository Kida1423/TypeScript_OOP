interface BehaviorStrategy {
    applyBehavior(animal: Animal): void;
}

class FeedStrategy implements BehaviorStrategy {
    applyBehavior(animal: Animal): void {
        const { age } = animal;
        const step = this.getStep(age);
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
    }

    private getStep(age: number): number {
        if (age <= 5) return 10;
        if (age <= 10) return 5;
        return 2;
    }
}

class PlayStrategy implements BehaviorStrategy {
    applyBehavior(animal: Animal): void {
        const { age } = animal;
        const decreaseStep = this.getDecreaseStep(age);
        const increaseStep = this.getIncreaseStep(age);

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
    }

    private getDecreaseStep(age: number): number {
        if (age <= 5) return 2;
        if (age <= 10) return 5;
        return 10;
    }

    private getIncreaseStep(age: number): number {
        if (age <= 5) return 10;
        if (age <= 10) return 5;
        return 2;
    }
}

class HealStrategy implements BehaviorStrategy {
    applyBehavior(animal: Animal): void {
        const { age } = animal;
        const step = this.getStep(age);

        animal.mood += step;
        animal.health += step;
        if (animal.health <= 0) {
            animal.die();
        }
    }

    private getStep(age: number): number {
        if (age <= 5) return 10;
        if (age <= 10) return 5;
        return 2;
    }
}

class Animal {
    name: string;
    age: number;
    satiety: number = 0;
    mood: number = 0;
    health: number = 0;
    behaviorStrategy: BehaviorStrategy;

    constructor(name: string, age: number, strategy: BehaviorStrategy) {
        this.name = name;
        this.age = age;
        this.behaviorStrategy = strategy;
    }

    applyBehavior(): void {
        this.behaviorStrategy.applyBehavior(this);
        this.checkHealth();
    }
    private checkHealth(): void {
        if (this.health <= 0) {
            this.die();
        }
    }

    die(): void {
        console.log(`${this.name} has died.`);
        const index = pets.indexOf(this);
        if (index > -1) {
            pets.splice(index, 1);
        }
        displayPets();
    }
}

const pets: Animal[] = [
    new Animal('Fluffy', 5, new FeedStrategy()),
    new Animal('Muli', 3, new FeedStrategy())
];

function displayPets(): void {
    const petList = document.getElementById('petList') as HTMLElement;
    petList.innerHTML = '';

    pets.forEach((pet, index) => {
        petList.innerHTML += `<div>${index + 1}. ${pet.name}, Age: ${pet.age}, Satiety: ${pet.satiety}, Mood: ${pet.mood}, Health: ${pet.health}</div>`;
    })

    const animalSelect = document.getElementById("animalSelect") as HTMLSelectElement;
    animalSelect.innerHTML = '';

    pets.forEach(animal => {
        const option = document.createElement("option");
        option.value = animal.name;
        option.textContent = animal.name;
        animalSelect.appendChild(option);
    });
}

function addPet(): void {
    const petNameInput = document.getElementById('petName') as HTMLInputElement;
    const petAgeInput = document.getElementById('petAge') as HTMLInputElement;
    const petName: string = petNameInput.value.trim();
    const petAge: number = parseInt(petAgeInput.value, 10);

    if (petName === '' || petAge <= 0 || isNaN(petAge)) {
        alert("Please enter valid name and age.");
        return;
    }
    
    const defaultStrategy = new FeedStrategy();
    const newPet = new Animal(petName, petAge, defaultStrategy);
    pets.push(newPet);
    displayPets();

    petNameInput.value = '';
    petAgeInput.value = '';
    (document.getElementById('addPetDialog') as HTMLElement).style.display = 'none';
}

document.getElementById('addPetBtn')?.addEventListener('click', () => {
    (document.getElementById('addPetDialog') as HTMLElement).style.display = 'block';
});

document.getElementById('submitPetBtn')?.addEventListener('click', addPet);

document.getElementById('feedAnimalBtn')?.addEventListener('click', () => {
    const animalSelect = document.getElementById('animalSelect') as HTMLSelectElement;
    const selectedAnimalName = animalSelect.value;
    const selectedAnimal = pets.filter(pet => pet.name === selectedAnimalName)[0];
    if (selectedAnimal) {
        selectedAnimal.behaviorStrategy = new FeedStrategy();
        selectedAnimal.applyBehavior();
    }
    displayPets();
});

document.getElementById('playAnimalBtn')?.addEventListener('click', () => {
    const animalSelect = document.getElementById('animalSelect') as HTMLSelectElement;
    const selectedAnimalName = animalSelect.value;
    const selectedAnimal = pets.filter(pet => pet.name === selectedAnimalName)[0];
    if (selectedAnimal) {
        selectedAnimal.behaviorStrategy = new PlayStrategy();
        selectedAnimal.applyBehavior();
    }
    displayPets();
});

document.getElementById('healAnimalBtn')?.addEventListener('click', () => {
    const animalSelect = document.getElementById('animalSelect') as HTMLSelectElement;
    const selectedAnimalName = animalSelect.value;
    const selectedAnimal = pets.filter(pet => pet.name === selectedAnimalName)[0];
    if (selectedAnimal) {
        selectedAnimal.behaviorStrategy = new HealStrategy();
        selectedAnimal.applyBehavior();
    }
    displayPets();
});

displayPets();
