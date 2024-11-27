const express = require('express');
const router = express.Router();
const path = require('path');


let categories = require ('./data/cats/cat.json')


// Ruta para obtener usuarios
router.get('/categories', (req, res) => {
    res.json(categories);
});

// Ruta para obtener productos
router.get('/cats-products', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/cats-products/'));
});

router.get('/product-info', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/products/'));
});

router.get('/products-comments', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/products-comments/'));
});

router.get('/cats-productos', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/cats-products'));
});

router.get('/cart-info', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/user-carts/'));
});

module.exports = router;
