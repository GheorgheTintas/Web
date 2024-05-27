const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pentru a servi fișiere statice din directorul public
app.use(express.static('public'));

// Ruta pentru pagina principală
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Serverul rulează la adresa http://localhost:${PORT}`);
});
