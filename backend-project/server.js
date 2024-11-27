const express = require('express');
const apiRoutes = require('./routes/apiRoutes'); // Importa las rutas
const app = express();
const PORT = 3000;
const cors = require('cors');

// Habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api', apiRoutes); // Todas las rutas estarán bajo "/api"

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});