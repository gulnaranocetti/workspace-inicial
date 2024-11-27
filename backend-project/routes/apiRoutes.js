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
router.get('/cats-products', (req, res) => {
    try {
        const directoryPath = path.join(__dirname, '../data/cats-products'); // Ruta de la carpeta
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error al leer la carpeta cats-products:', err);
                res.status(500).json({ error: 'Error al leer la carpeta cats-products' });
                return;
            }

            // Envía la lista de archivos como respuesta
            res.json(files); // Devuelve un array con los nombres de los archivos en la carpeta
        });
    } catch (error) {
        console.error('Error al enviar la lista de archivos de cats-products:', error);
        res.status(500).json({ error: 'Error al enviar la lista de archivos de cats-products' });
    }
});

// Ruta para información de productos (product-info.json en products)
router.get('/product-info', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../data/products/product-info.json')); // Enviar archivo JSON
    } catch (error) {
        console.error('Error al enviar el archivo de información del producto:', error);
        res.status(500).json({ error: 'Error al enviar el archivo de información del producto' });
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