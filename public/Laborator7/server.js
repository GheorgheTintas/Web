/*const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process'); // Modul pentru a deschide automat browserul
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const mongoUrl = 'mongodb+srv://GheorgheTintas:Tintasgheorghe18@cluster0.4culz4h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'Facultate'; // Numele bazei de date
const collectionName = 'Students'; // Numele colecției

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let studentsCollection; // Declarați variabila studentsCollection

// Conectați-vă la baza de date MongoDB
MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    studentsCollection = db.collection(collectionName); // Inițializați variabila studentsCollection aici

    // Route pentru afișarea tuturor studenților
    app.get('/students', (req, res) => {
        // Interogați colecția de studenți pentru a obține toți studenții
        studentsCollection.find().toArray((err, students) => {
            if (err) {
                console.error('Error fetching students from database:', err);
                res.status(500).send('Internal server error');
                return;
            }
            // Trimiteți datele studenților către clientul care a făcut cererea HTTP
            res.json(students);
        });
    });

    // Deschide automat browserul și accesează ruta /students când serverul este pornit
    const serverUrl = `http://localhost:${port}/students`;
    exec(`start ${serverUrl}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Could not open browser:', error);
            return;
        }
        console.log(`Server is running on http://localhost:${port}`);
        console.log(`Server is available at ${serverUrl}`);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

 */
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoUrl = 'mongodb+srv://GheorgheTintas:Tintasgheorghe18@cluster0.4culz4h.mongodb.net/';
const dbName = 'Facultate';
const collectionName = 'Students';

// Conectează-te la baza de date MongoDB
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
        console.error('Eroare la conectarea la MongoDB:', err);
        return;
    }
    console.log('Conectat la MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Ruta pentru a afișa toți studenții
    app.get('/students', (req, res) => {
        // Interoghează colecția de studenți pentru a obține toți studenții
        collection.find({}).toArray((err, students) => {
            if (err) {
                console.error('Eroare la interogarea bazei de date:', err);
                res.status(500).send('Eroare internă de server');
                return;
            }
            // Returnează datele studenților către clientul care a făcut cererea HTTP
            res.json(students);
        });
    });

    // Start server
    app.listen(port, () => {
        console.log(`Serverul ascultă la portul ${port}`);
    });
});

