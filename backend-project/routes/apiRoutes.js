const express = require('express');
const path = require('path');
const fs = require('fs'); // Para leer archivos JSON
const router = express.Router();

// Imprime la ruta absoluta de cat.json para depuración
console.log('Ruta absoluta de cat.json:', path.join(__dirname, '../data/cats/cat.json'));

// Ruta para categorías (cat.json)
router.get('/categories', (req, res) => {
    try {
        const categoriesPath = path.join(__dirname, '../data/cats/cat.json'); // Ruta absoluta a cat.json
        const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8')); // Leer y parsear JSON
        res.json(categories); // Enviar JSON como respuesta
    } catch (error) {
        console.error('Error al leer el archivo de categorías:', error);
        res.status(500).json({ error: 'Error al leer el archivo de categorías' });
    }
});

// Ruta para productos (products.json en cats-products)
router.get('/cats-products/:fileName', (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/cats-products', req.params.fileName);
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error al enviar el archivo específico de cats-products:', error);
        res.status(500).json({ error: 'Error al enviar el archivo específico de cats-products' });
    }
});

router.get('/products/:fileName', (req, res) => {
    try {
        const fileName = req.params.fileName; // Captura el nombre del archivo de la URL
        const filePath = path.join(__dirname, '../data/products', fileName); // Construye la ruta completa

        console.log('Ruta construida:', filePath); // Depuración: imprime la ruta construida

        if (fs.existsSync(filePath)) { // Verifica si el archivo existe
            res.sendFile(filePath); // Envía el archivo encontrado
        } else {
            res.status(404).json({ error: `Archivo ${fileName} no encontrado` }); // Error si no existe
        }
    } catch (error) {
        console.error('Error al enviar el archivo:', error);
        res.status(500).json({ error: 'Error al enviar el archivo' });
    }
});

// Ruta para comentarios de productos (comments.json en products-comments)
router.get('/products-comments', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../data/products-comments/comments.json')); // Enviar archivo JSON
    } catch (error) {
        console.error('Error al enviar el archivo de comentarios de productos:', error);
        res.status(500).json({ error: 'Error al enviar el archivo de comentarios de productos' });
    }
});

// Ruta para información del carrito (cart.json en cart)
router.get('/cart-info', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../data/cart/cart.json')); // Enviar archivo JSON
    } catch (error) {
        console.error('Error al enviar el archivo del carrito:', error);
        res.status(500).json({ error: 'Error al enviar el archivo del carrito' });
    }
});

// Ruta para carritos de usuarios (user-cart.json en user-carts)
router.get('/user-cart', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../data/user-carts/user-cart.json')); // Enviar archivo JSON
    } catch (error) {
        console.error('Error al enviar el archivo del carrito del usuario:', error);
        res.status(500).json({ error: 'Error al enviar el archivo del carrito del usuario' });
    }
});

// Ruta para información de ventas (sell-info.json en sell)
router.get('/sell-info', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../data/sell/sell-info.json')); // Enviar archivo JSON
    } catch (error) {
        console.error('Error al enviar el archivo de ventas:', error);
        res.status(500).json({ error: 'Error al enviar el archivo de ventas' });
    }
});

module.exports = router;