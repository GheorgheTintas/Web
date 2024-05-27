const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Verificăm dacă este o cerere pentru o imagine și dacă există un parametru 'image' definit
    if (req.method === 'GET' && parsedUrl.pathname === '/getImage' && parsedUrl.query.image) {
        // Construim calea către directorul imaginilor și imaginea specificată
        const imageDir = path.join(__dirname, 'images');
        const imagePath = path.join(imageDir, parsedUrl.query.image);

        // Verificăm dacă calea către imagine există
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Image not found');
            } else {
                // Încărcăm imaginea și o returnăm ca răspuns
                fs.readFile(imagePath, (err, data) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal Server Error');
                    } else {
                        res.writeHead(200, {'Content-Type': 'image/png'});
                        res.end(data);
                    }
                });
            }
        });
    } else {
        // Servim pagina HTML
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
