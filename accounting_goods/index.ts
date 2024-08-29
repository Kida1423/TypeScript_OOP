function simpleHash(input: string): string{
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash.toString(16);
}

class Product{
    name: string;
    price: number;
    state: ProductState;
    honoraryCode: string | null = null;

    constructor(name: string, price: number){
        this.name = name;
        this.price = price;
        this.state = new InStockState(this);
    }

    raisePrice(): void{
        this.state.raisePrice();
    }

    setUp(): void{
        this.state.setUp();
    }

    setOff(): void{
        this.state.setOff();
    }

    giveToTheWinner(): void{
        this.state.giveToTheWinner();
    }

    generateHonoraryCode(): void{
        let generator: Generator;

        if (this.price >= 1000){
            generator = new Generator(new GoldStrategy())
        } else if (this.price >= 500){
            generator = new Generator(new SilverStrategy())
        } else{
            generator = new Generator(new BronzeStrategy())
        }

        this.honoraryCode = generator.generateHonoraryCode(this.name)
    }
}

interface ProductState{
    raisePrice(): void;
    setUp(): void;
    setOff(): void;
    giveToTheWinner(): void;
}

class InStockState implements ProductState{
    private product: Product;

    constructor(product: Product){
        this.product = product;
    }

    raisePrice(): void{
        console.log("Ошибка: продукт еще не участвует в торгах")
    }

    setUp(): void{
        console.log(`Продукт ${this.product.name} выставлен на торги.`)
        this.product.state = new ForSaleState(this.product);
    }

    giveToTheWinner(): void{
        console.log("Ошибка: нельзя отдать продукт сразу со склада")
    }

    setOff(): void{
        console.log("Ошибка: нельзя снять с торгов продукт, который в них не участвует")
    }
}

class ForSaleState implements ProductState{
    private product: Product;

    constructor(product: Product){
        this.product = product;
    }

    raisePrice(): void{
        this.product.price += 100;
        console.log(`Цена продукта ${this.product.name} увеличена до ${this.product.price}`)
    }

    setUp(): void{
        console.log("Ошибка: продукт не может быть повторно выставлен на торги")
    }

    setOff(): void{
        console.log(`Продукт ${this.product.name} снят с торгов`)
        this.product.state = new InStockState(this.product)
    }

    giveToTheWinner(): void{
        if (this.product.price <= 0) {
            console.log("Ошибка: нельзя отдать продукт бесплатно")
        }else{
            console.log(`Продукт ${this.product.name} продан за ${this.product.price}`);
            this.product.generateHonoraryCode()
            this.product.state = new SoldState(this.product)
        }
    }
}

class SoldState implements ProductState{
    private product: Product;

    constructor(product: Product){
        this.product = product;
    }

    raisePrice(): void{
        console.log("Ошибка: продукт уже продан")
    }

    setUp(): void{
        console.log("Ошибка: продукт уже продан")
    }

    giveToTheWinner(): void{
        console.log("Ошибка: продукт уже продан")
    }

    setOff(): void{
        console.log("Ошибка: нельзя снять с торгов проданный продукт")
    }
}

interface HonoraryCodeStrategy{
    generate(productId: string): string;
}

class GoldStrategy implements HonoraryCodeStrategy{
    generate(productId: string): string{
        return simpleHash("Gold-" + productId)
    }
}

class SilverStrategy implements HonoraryCodeStrategy{
    generate(productId: string): string{
        return simpleHash("Silver-" + productId)
    }
}

class BronzeStrategy implements HonoraryCodeStrategy{
    generate(productId: string): string{
        return simpleHash("Bronze-" + productId)
    }
}

class Generator {
    private strategy: HonoraryCodeStrategy;

    constructor(strategy: HonoraryCodeStrategy){
        this.strategy = strategy;
    }

    public generateHonoraryCode(productId: string): string{
        return this.strategy.generate(productId)
    }
}

const products: Product[] = [
    new Product("Телевизор", 800),
    new Product("Компьютер", 1200),
    new Product("Смартфон", 400)
];

function displayProductList(): void{
    console.log("№    | Продукт");
    products.forEach((product, index) => {
        console.log(`${index + 1}    | ${product.name}`)
    });
}

function displayProductDetails(index: number): void{
    const product = products[index]
    console.log(`\nПродукт: ${product.name}`)
    console.log(`Цена: ${product.price}`)
    if (product.honoraryCode) {
        console.log(`Почетный код: ${product.honoraryCode}`)
    }
    let continueActions = true

    while (continueActions) {
        console.log("\nВыберите действие:")
        console.log("1 - Выставить на аукцион")
        console.log("2 - Поднять цену")
        console.log("3 - Выдать победителю")
        console.log("4 - Снять с торгов")
        console.log("0 - Завершить")

        const action = prompt("Введите номер действия: ")
        switch(action) {
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
} else {
    console.log("Неверный номер продукта")
}
