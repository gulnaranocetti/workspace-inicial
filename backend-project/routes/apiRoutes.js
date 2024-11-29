const express = require('express');
const path = require('path');
const fs = require('fs'); // Para leer archivos JSON
const router = express.Router();
const jwt = require ('jsonwebtoken');
const secret_key = 'estamosdespegadas';
const token_expiration= '60m';


router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin") {
        const token = jwt.sign({ username }, secret_key, {expiresIn : token_expiration});
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: "Usuario y/o contraseña incorrecto." });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; // Captura el token del header 'authorization'

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Verificar el token
    jwt.verify(token, secret_key, (err, user) => { // Cambié JWT_SECRET por secret_key
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        req.user = user; // Agrega la información del usuario a la solicitud
        next(); // Continua con la solicitud
    });
};



// Imprime la ruta absoluta de cat.json para depuración
console.log('Ruta absoluta de cat.json:', path.join(__dirname, '../data/cats/cat.json'));

// Ruta para categorías (cat.json)
router.get('/categories', authenticateToken, (req, res) => {
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
router.get('/cats-products/:fileName', authenticateToken, (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/cats-products', req.params.fileName);
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error al enviar el archivo específico de cats-products:', error);
        res.status(500).json({ error: 'Error al enviar el archivo específico de cats-products' });
    }
});

router.get('/products/:fileName', authenticateToken, (req, res) => {
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
router.get('/products-comments/:fileName', authenticateToken, (req, res) => {
    try {
        const fileName = req.params.fileName; // Captura el nombre del archivo de la URL
        const filePath = path.join(__dirname, '../data/products-comments', fileName); // Construye la ruta completa

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

// Ruta para información del carrito (cart.json en cart)
router.get('/cart-info', authenticateToken, (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../data/cart/buy.json')); // Enviar archivo JSON
    } catch (error) {
        console.error('Error al enviar el archivo del carrito:', error);
        res.status(500).json({ error: 'Error al enviar el archivo del carrito' });
    }
});

// Ruta para carritos de usuarios (user-cart.json en user-carts)
router.get('/user-cart', authenticateToken, (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../data/user-carts/25801.json')); // Enviar archivo JSON
    } catch (error) {
        console.error('Error al enviar el archivo del carrito del usuario:', error);
        res.status(500).json({ error: 'Error al enviar el archivo del carrito del usuario' });
    }
});

// Ruta para información de ventas (sell-info.json en sell)
router.get('/sell-info', authenticateToken, (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../data/sell/publish.json')); // Enviar archivo JSON
    } catch (error) {
        console.error('Error al enviar el archivo de ventas:', error);
        res.status(500).json({ error: 'Error al enviar el archivo de ventas' });
    }
});

module.exports = router;