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
var StoragePlace;
(function (StoragePlace) {
    StoragePlace["Icebox"] = "Icebox";
    StoragePlace["Showcase"] = "Showcase";
})(StoragePlace || (StoragePlace = {}));
var Product = /** @class */ (function () {
    function Product(delivareTime, storagePlace) {
        this.deliveryTimestamp = delivareTime;
        this.storagePlace = storagePlace;
    }
    Product.prototype.isFresh = function () {
        var currentDate = new Date();
        var elapsedDays = Math.floor((currentDate.getTime() - this.deliveryTimestamp.getTime()) / (1000 * 3600 * 24));
        var actualStorageLife = this.storageLifeDays;
        if (this.storagePlace === StoragePlace.Showcase) {
            if (this.name === "Milk")
                actualStorageLife /= 2;
            if (this.name === "Fish")
                actualStorageLife /= 6;
        }
        return elapsedDays <= actualStorageLife;
    };
    return Product;
}());
var Milk = /** @class */ (function (_super) {
    __extends(Milk, _super);
    function Milk() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Milk";
        _this.storageLifeDays = 60;
        return _this;
    }
    return Milk;
}(Product));
var Salt = /** @class */ (function (_super) {
    __extends(Salt, _super);
    function Salt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Salt";
        _this.storageLifeDays = Number.POSITIVE_INFINITY;
        return _this;
    }
    return Salt;
}(Product));
var Fish = /** @class */ (function (_super) {
    __extends(Fish, _super);
    function Fish() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Fish";
        _this.storageLifeDays = 20;
        return _this;
    }
    return Fish;
}(Product));
var Corn = /** @class */ (function (_super) {
    __extends(Corn, _super);
    function Corn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Corn";
        _this.storageLifeDays = 150;
        return _this;
    }
    return Corn;
}(Product));
var Stew = /** @class */ (function (_super) {
    __extends(Stew, _super);
    function Stew() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Stew";
        _this.storageLifeDays = 180;
        return _this;
    }
    return Stew;
}(Product));
var Store = /** @class */ (function () {
    function Store() {
        this.products = [];
        for (var i = 0; i < 20; i++) {
            var product = this.generateRandomProduct();
            this.products.push(product);
        }
    }
    Store.prototype.getRandomDeliveryTime = function () {
        var randomNumber = Math.floor(Math.random() * 200) + 1;
        return new Date(Date.now() - 86400000 * randomNumber);
    };
    Store.prototype.getRandomStoragePlace = function () {
        var places = [StoragePlace.Icebox, StoragePlace.Showcase];
        return places[Math.floor(Math.random() * places.length)];
    };
    Store.prototype.generateRandomProduct = function () {
        var deliveryTimestamp = this.getRandomDeliveryTime();
        var storagePlace = this.getRandomStoragePlace();
        var productClasses = [Milk, Salt, Fish, Corn, Stew];
        var ProductClass = productClasses[Math.floor(Math.random() * productClasses.length)];
        return new ProductClass(deliveryTimestamp, storagePlace);
    };
    Store.prototype.doInspection = function () {
        console.log("Инспекция продуктов в магазине:");
        console.table(this.products.map(function (product) { return ({
            Name: product.name,
            "Delivery Date": product.deliveryTimestamp.toDateString(),
            "Storage Place": product.storagePlace,
            "Fresh": product.isFresh() ? "Yes" : "No"
        }); }));
    };
    return Store;
}());
var store = new Store();
store.doInspection();
