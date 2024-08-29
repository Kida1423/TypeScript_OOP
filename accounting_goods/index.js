"use strict";
function simpleHash(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash.toString(16);
}
class Product {
    constructor(name, price) {
        this.honoraryCode = null;
        this.name = name;
        this.price = price;
        this.state = new InStockState(this);
    }
    raisePrice() {
        this.state.raisePrice();
    }
    setUp() {
        this.state.setUp();
    }
    setOff() {
        this.state.setOff();
    }
    giveToTheWinner() {
        this.state.giveToTheWinner();
    }
    generateHonoraryCode() {
        let generator;
        if (this.price >= 1000) {
            generator = new Generator(new GoldStrategy());
        }
        else if (this.price >= 500) {
            generator = new Generator(new SilverStrategy());
        }
        else {
            generator = new Generator(new BronzeStrategy());
        }
        this.honoraryCode = generator.generateHonoraryCode(this.name);
    }
}
class InStockState {
    constructor(product) {
        this.product = product;
    }
    raisePrice() {
        console.log("Ошибка: продукт еще не участвует в торгах");
    }
    setUp() {
        console.log(`Продукт ${this.product.name} выставлен на торги.`);
        this.product.state = new ForSaleState(this.product);
    }
    giveToTheWinner() {
        console.log("Ошибка: нельзя отдать продукт сразу со склада");
    }
    setOff() {
        console.log("Ошибка: нельзя снять с торгов продукт, который в них не участвует");
    }
}
class ForSaleState {
    constructor(product) {
        this.product = product;
    }
    raisePrice() {
        this.product.price += 100;
        console.log(`Цена продукта ${this.product.name} увеличена до ${this.product.price}`);
    }
    setUp() {
        console.log("Ошибка: продукт не может быть повторно выставлен на торги");
    }
    setOff() {
        console.log(`Продукт ${this.product.name} снят с торгов`);
        this.product.state = new InStockState(this.product);
    }
    giveToTheWinner() {
        if (this.product.price <= 0) {
            console.log("Ошибка: нельзя отдать продукт бесплатно");
        }
        else {
            console.log(`Продукт ${this.product.name} продан за ${this.product.price}`);
            this.product.generateHonoraryCode();
            this.product.state = new SoldState(this.product);
        }
    }
}
class SoldState {
    constructor(product) {
        this.product = product;
    }
    raisePrice() {
        console.log("Ошибка: продукт уже продан");
    }
    setUp() {
        console.log("Ошибка: продукт уже продан");
    }
    giveToTheWinner() {
        console.log("Ошибка: продукт уже продан");
    }
    setOff() {
        console.log("Ошибка: нельзя снять с торгов проданный продукт");
    }
}
class GoldStrategy {
    generate(productId) {
        return simpleHash("Gold-" + productId);
    }
}
class SilverStrategy {
    generate(productId) {
        return simpleHash("Silver-" + productId);
    }
}
class BronzeStrategy {
    generate(productId) {
        return simpleHash("Bronze-" + productId);
    }
}
class Generator {
    constructor(strategy) {
        this.strategy = strategy;
    }
    generateHonoraryCode(productId) {
        return this.strategy.generate(productId);
    }
}
const products = [
    new Product("Телевизор", 800),
    new Product("Компьютер", 1200),
    new Product("Смартфон", 400)
];
function displayProductList() {
    console.log("№    | Продукт");
    products.forEach((product, index) => {
        console.log(`${index + 1}    | ${product.name}`);
    });
}
function displayProductDetails(index) {
    const product = products[index];
    console.log(`\nПродукт: ${product.name}`);
    console.log(`Цена: ${product.price}`);
    if (product.honoraryCode) {
        console.log(`Почетный код: ${product.honoraryCode}`);
    }
    let continueActions = true;
    while (continueActions) {
        console.log("\nВыберите действие:");
        console.log("1 - Выставить на аукцион");
        console.log("2 - Поднять цену");
        console.log("3 - Выдать победителю");
        console.log("4 - Снять с торгов");
        console.log("0 - Завершить");
        const action = prompt("Введите номер действия: ");
        switch (action) {
            case "1":
                product.setUp();
                break;
            case "2":
                product.raisePrice();
                break;
            case "3":
                product.giveToTheWinner();
                break;
            case "4":
                product.setOff();
                break;
            case "0":
                continueActions = false;
                break;
            default:
                console.log("Неверный выбор");
                break;
        }
    }
}
displayProductList();
const productIndex = parseInt(prompt("Введите номер продукта: ") || "0", 10) - 1;
if (productIndex >= 0 && productIndex < products.length) {
    displayProductDetails(productIndex);
}
else {
    console.log("Неверный номер продукта");
}
