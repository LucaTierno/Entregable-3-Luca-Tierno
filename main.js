// Entregable N1 Luca Tierno

class ProductManager {
  static ultId = 0;

  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, img, code, stock) {
    if (!title || !description || !price || !img || !code || !stock) {
      console.log(
        "Todos los campos son obligatorios. Por favor ingresar todos."
      );
      return;
    }

    if (this.products.some((item) => item.code === code)) {
      console.log("Código en uso");
      return;
    }

    const newProduct = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock,
    };

    this.products.push(newProduct);
  }

  getProducts() {
    console.log(this.products);
  }

  getProductsById(id) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      console.log("Ups! Producto no encontrado.");
    } else {
      console.log("Producto encontrado! ", product);
    }
    return product;
  }
}

// Testing:

//1)

const manager = new ProductManager();

//2)

manager.getProducts();

//3)

manager.addProduct(
  "Mochila",
  "Mochila de carga roja",
  1000,
  "Sin imagen",
  "abc123",
  25
);

manager.addProduct(
  "Cartuchera",
  "Cartuchera de guerra verde",
  700,
  "Sin imagen",
  "abc124",
  25
);

manager.addProduct(
  "Libro",
  "Libro de Historia Antigua-Grecia",
  3000,
  "Sin imagen",
  "abc125",
  25
);

manager.getProducts();

//4) Probando duplicacion de id y campos obligatorios

manager.addProduct(
  "Mochila",
  "Mochila de carga roja",
  1000,
  "Sin imagen",
  "abc123",
  25
);

manager.addProduct(
  "Producto Prueba",
  "Este es un producto de prueba",
  1000,
  "Sin imagen"
);

//5)

manager.getProducts();

//6)

manager.addProduct(
  "Mochila",
  "Mochila de carga roja",
  1000,
  "Sin imagen",
  "abc123",
  25
);

//7)

//Producto encontrado
manager.getProductsById(2);
//Producto NO encontrado
manager.getProductsById(40);