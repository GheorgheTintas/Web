const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    // Serve the index.html file
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    const sendSensorData = () => {
        const data = {
            timestamp: Date.now(),
            value: Math.random() * 100 // Simulate sensor data
        };
        ws.send(JSON.stringify(data));
    };

    const interval = setInterval(sendSensorData, 1000); // Send data every second

    ws.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server is listening on http://localhost:8080');
});
