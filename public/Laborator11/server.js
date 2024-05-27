const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { readFile } = require("fs");
const app = express();
app.use(express.json());
// Utilizatori
const users = [
    {
        id: 1,
        username: "utilizator1",
        password: "$2a$12$slfyj0pIWGRPUD7oo6gWz.3afmbdrAh1uehR1/b6a11CJSP9q.w4K", // 'parola1'
    },
    {
        id: 2,
        username: "utilizator2",
        password: "$2a$12$OdBrpOPrKBhNVBBL2FjdT.GPBpfQR9a8Zw8u27HeFGOZ08JHVhO7W", // 'parola2'
    },
];
// Endpoint pentru afisarea paginii principale
app.get("/", (req, res) => {
    readFile("./index.html", function (err, file) {
        if (err) {
            // write an error response or nothing here
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(file, "utf-8");
    });
});

// Cheia secretă pentru semnarea și verificarea tokenului JWT
const secretKey = "secret";
// Endpoint pentru autentificare
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Căutăm utilizatorul în baza de date
    const user = users.find((user) => user.username === username);

    // Verificăm parola utilizatorului
    // Se compară parola introdusă hash-uită cu cea din array
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Autentificare eșuată" });
    }
    // autentificare reusita
    // Generăm un token JWT
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
    res.json({ token });
});
// Endpoint pentru autentificare
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Căutăm utilizatorul în baza de date
    const user = users.find((user) => user.username === username);

    // Verificăm existența utilizatorului și corectitudinea parolei
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Autentificare eșuată" });
    }

    // Autentificare reușită, generăm tokenul JWT
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

    // Returnăm tokenul JWT către client
    res.json({ token });
});

// Middleware pentru verificarea tokenului JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

// Endpoint pentru resursa protejată
app.get("/resource", authenticateToken, (req, res) => {
    res.json({ message: "Resursa protejată este accesată cu succes" });
});

// Pornire server
const port = 3000;
app.listen(port, () => {
    console.log("Serverul rulează pe portul " + port);
});
