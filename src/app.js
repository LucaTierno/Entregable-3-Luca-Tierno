const ProductManager = require("./product-manager.js");
const express = require("express");
const PUERTO = 8080;

const manager = new ProductManager("./productos.json");

const app = express();

app.get("/products", async (req, res) => {
  try {
    const arrayProductos = await manager.leerArchivo();
    let limit = parseInt(req.query.limit);
    if (limit) {
      const arrayConLimite = arrayProductos.slice(0, limit);
      return res.send(arrayConLimite);
    } else {
      return res.send(arrayProductos);
    }
  } catch (error) {
    console.log(error);
    return res.send("Error al procesar la solicitud");
  }
});

app.get("/products/:id", async(req, res) => {
  try {
    let pid = parseInt(req.params.pid);
    const buscado = await manager.getProductsById(pid)
    if(buscado) {
      return res.send(buscado)
    } else {
      return res.send("ID de producto incorrecto.")
    }
  
  } catch (error) {
    console.log(error)
    res.send("Error")
  }
})

app.listen(PUERTO, () => {
  console.log("Escuchando en el puerto 8080");
});
