const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const app = express();
const PORT = 3000;

app.get('/api/users', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'users.json'); // Construye la ruta
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the file');
        }
        res.json(JSON.parse(data)); // Envía el contenido del archivo
    });
});

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api', apiRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
