// Entregable N2 Luca Tierno

const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(nuevoObjeto) {
    let { title, description, price, img, code, stock } = nuevoObjeto;

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

    await this.guardarArchivo(this.products);
  }

  getProducts() {
    console.log(this.products);
  }

  async getProductsById(id) {

    try {
      const arrayProductos = await this.leerArchivo();
      const buscado = arrayProductos.find(item => item.id === id);

      if(!buscado) {
        console.log("Producto no encontrado");
      } else {
        console.log("Producto encontrado! ");
        return buscado
      }
    } catch (error) {
      console.log("Error al leer ese archivo", error)
    }
  }

  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer un archivo", error);
    }
  }

  async guardarArchivo(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }

  //Actualizamos algun producto:
  async updateProduct(id, productoActualizado) {
    try {
      const arrayProductos = await this.leerArchivo();
      const index = arrayProductos.findIndex(item => item.id === id);
      if(index !== -1) {
        arrayProductos.splice(index, 1, productoActualizado);
        await this.guardarArchivo(arrayProductos);
      } else {
        console.log("No se encontro el producto");
      }

    } catch (error) {
      console.log("Error al actualizar el producto ", error)
    }
  }

  async deleteProduct(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      const index = arrayProductos.findIndex(item => item.id === id);
      if(index !== -1) {
        arrayProductos.splice(index);
        await this.guardarArchivo(arrayProductos);
      } else {
        console.log("No se encontro el producto");
      }

    } catch (error) {
      console.log("Error al eliminar el producto ", error)
    }
  }
}

// Testing:

//Se creara una instancia de la clase "ProductManager"

const manager = new ProductManager("./productos.json");

//Se llamara "getProducts" recien creada la instancia, debe devolcer un arreglo vacio []

manager.getProducts();

//Se llamara al metodo "addProduct" con los campos:

//title: "Mancuernas"
//vdescription: "12 Kilos"
//price: 40500
//thumbnail: "Sin imagen"
//code: "abc123"
//vstock: 22

const mancuernas = {
  title: "Mancuerna",
  description: "12 Kilos",
  price: 40500,
  img: "Sin imagen",
  code: "abc123",
  stock: 22,
};

manager.addProduct(mancuernas);

//El objeto debe agregarse satisfactoriamente con un id generado automaticamente SIN REPETIRSE

const barras = {
  title: "Barra Olimpica",
  description: "20 Kilos",
  price: 50900,
  img: "Sin imagen",
  code: "abc124",
  stock: 10,
};

manager.addProduct(barras);

const bancos = {
  title: "banco plano",
  description: "Forrado en cuero",
  price: 20300,
  img: "Sin imagen",
  code: "abc124",
  stock: 5,
};

//Repetimos el codigo

manager.addProduct(bancos);

//Se llamara el metodo "getProducts" nuevamante, esta vez debe aparecer el producto recien agregado

manager.getProducts();

//Se llamara al metodo "getProductById" y se corroborara que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.

async function testeamosBusquedaPorId() {
  const buscado = await manager.getProductsById(2);
  console.log(buscado);
}

testeamosBusquedaPorId();

//Se llamara al metodo "updateProduct"

const sogas = {
  id: 1,
  title: "Soga elastica",
  description: "Soga elastica 5 metros",
  price: 2000,
  img: "Sin imagen",
  code: "abc123",
  stock: 21,
};

async function testeamosActualizar() {
  await manager.updateProduct(1, sogas);
}

testeamosActualizar();

//Eliminar producto "deleteProduct"

async function testeamosEliminar() {
  await manager.deleteProduct(2)
}

testeamosEliminar();