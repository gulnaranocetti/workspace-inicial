const express = require("express"); // Importa Express
const app = express(); // Instancia el servidor
const port = 3001; // Define el puerto

// Importa los archivos JSON desde la carpeta 'data'
const shopping = require("./data/cart/buy.json");
const CATEGORIES_URL = require("./data/cats/cat.json");
const PRODUCTS_URL = require("./data/cats-products/");
const CART_INFO_URL = require("/.data/user-carts/25801.json");
const PRODUCT_INFO_COMENTS = require("/.data/products-coments/");
const PRODUCTS_INFO_URL = require("/.data/products/");
const PUBLISH_PRODUCT_URL = require("/.data/sell/publish.json");

// Rutas para devolver los JSON
app.get("/shopping", (req, res) => {
  res.json(shopping); 
});

app.get("/CATEGORIES_URL", (req, res) => {
  res.json(CATEGORIES_URL); // O el archivo que corresponda
});

app.get("/PRODUCTS_URL", (req, res) => {
  res.json(PRODUCTS_URL); // O el archivo que corresponda
});

app.get("/CART_INFO_URL", (req, res) => {
  res.json(CART_INFO_URL); // O el archivo que corresponda
});

app.get("/PRODUCT_INFO_COMENTS", (req, res) => {
  res.json(PRODUCT_INFO_COMENTS); // O el archivo que corresponda
});

app.get("/PRODUCTS_INFO_URL", (req, res) => {
  res.json(PRODUCTS_INFO_URL); // O el archivo que corresponda
});


app.get("/PUBLISH_PRODUCT_URL", (req, res) => {
  res.json(PUBLISH_PRODUCT_URL); // O el archivo que corresponda
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
