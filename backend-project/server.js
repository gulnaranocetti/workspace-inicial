const express = require("express"); // Importa Express
const app = express(); // Instancia el servidor
const port = 3000; // Define el puerto

// Importa los archivos JSON desde la carpeta 'data'
const shopping = require("./data/cart/buy.json");
const CATEGORIES_URL = require("./data/cats/cat.json");
const PRODUCTS_URL = require("./data/cats-products/");
const CART_INFO_URL = require(".data/user-carts/25801.json");
const PRODUCT_INFO_COMENTS = require(".data/products-coments/");
const PRODUCTS_INFO_URL = require(".data/products/");
const PUBLISH_PRODUCT_URL = require(".data/sell/publish.json");

// Rutas para devolver los JSON
app.get("/file1", (req, res) => {
  res.json(file1);
});

app.get("/file2", (req, res) => {
  res.json(file2);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
