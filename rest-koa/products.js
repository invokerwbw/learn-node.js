var id = 0;

function nextId() {
    id++;
    return 'p' + id;
}

function Product(name, manufacturer, price) {
    this.id = nextId();
    this.name = name;
    this.manufacturer = manufacturer;
    this.price = price;
}

var products = [
    new Product('iPhone 7', 'Apple', 6800),
    new Product('ThinkPad T440', 'Lenovo', 5999),
    new Product('LBP2900', 'Canon', 1099)
];

module.exports = {
    getProducts: () => {
        return products;
    },

    getProduct: (id) => {
        for (let product of products) {
            if (product.id === id) {
                return product;
            }
        }
        return null;
    },

    createProduct: (name, manufacturer, price) => {
        let product = new Product(name, manufacturer, price);
        products.push(product);
        return product;
    },

    deleteProduct: (id) => {
        let
            index = -1,
            i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            return products.splice(index, 1)[0];
        }
        return null;
    }
};