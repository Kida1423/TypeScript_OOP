enum StoragePlace{
    Icebox = "Icebox",
    Showcase = "Showcase"
}
abstract class Product {
    public deliveryTimestamp: Date;
    public storagePlace: StoragePlace;
    public abstract storageLifeDays: number;
    public abstract name: String;
    constructor(delivareTime: Date, storagePlace: StoragePlace){
        this.deliveryTimestamp = delivareTime;
        this.storagePlace = storagePlace;
    }

    public isFresh(): boolean {
        let currentDate = new Date();
        const elapsedDays = Math.floor((currentDate.getTime() - this.deliveryTimestamp.getTime()) / (1000 * 3600 * 24));
        let actualStorageLife = this.storageLifeDays;
        if(this.storagePlace === StoragePlace.Showcase)      {
            if (this.name === "Milk") actualStorageLife /= 2;
            if (this.name === "Fish") actualStorageLife /= 6;
        }  
        return elapsedDays <= actualStorageLife
    }
} 

class Milk extends Product {
    public name: string = "Milk";
    public storageLifeDays: number = 60;
}

class Salt extends Product {
    public name: string = "Salt";
    public storageLifeDays: number = Number.POSITIVE_INFINITY;
}

class Fish extends Product {
    public name: string = "Fish";
    public storageLifeDays: number = 20;
}

class Corn extends Product {
    public name: string = "Corn";
    public storageLifeDays: number = 150;
}

class Stew extends Product {
    public name: string = "Stew";
    public storageLifeDays: number = 180;
}

class Store{
    public products : Product[] = []
    constructor(){
        for(let i = 0; i < 20; i++){
            const product = this.generateRandomProduct();
            this.products.push(product);        }
    }
    public getRandomDeliveryTime(): Date{
        const randomNumber = Math.floor(Math.random() * 200) + 1;
        return new Date(Date.now() - 86400000 * randomNumber);
    }
    public getRandomStoragePlace(){
        const places = [StoragePlace.Icebox, StoragePlace.Showcase];
        return places[Math.floor(Math.random() * places.length)];
    }
    
    public generateRandomProduct(){
        const deliveryTimestamp = this.getRandomDeliveryTime();
        const storagePlace = this.getRandomStoragePlace();
        const productClasses = [Milk, Salt, Fish, Corn, Stew];
        const ProductClass = productClasses[Math.floor(Math.random() * productClasses.length)];
        return new ProductClass(deliveryTimestamp, storagePlace);
    }
    public doInspection(): void {
        console.log("Инспекция продуктов в магазине:");
        console.table(this.products.map(product => ({
            Name: product.name,
            "Delivery Date": product.deliveryTimestamp.toDateString(),
            "Storage Place": product.storagePlace,
            "Fresh": product.isFresh() ? "Yes" : "No"
        })));
    }
}
const store = new Store();
store.doInspection();