const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectarea la baza de date MongoDB
mongoose.connect('mongodb+srv://GheorgheTintas:Tintasgheorghe18@cluster0.4culz4h.mongodb.net/students?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Definirea schemei pentru documentele din colecția 'students'
const studentSchema = new mongoose.Schema({
    Nume: String,
    Prenume: String,
    Email: String,
    Telefon: String,
    Proiecte: String
});

// Crearea modelului Student folosind schema definită
const Student = mongoose.model('Student', studentSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servirea paginii HTML pentru afișarea și adăugarea de studenți
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta pentru salvarea datelor unui nou student
app.post('/students', async (req, res) => {
    const { Nume, Prenume, Email, Telefon, Proiecte } = req.body;
    const student = new Student({ Nume, Prenume, Email, Telefon, Proiecte });
    try {
        await student.save();
        res.status(201).send('Student saved');
    } catch (err) {
        res.status(400).send(err);
    }
});

// Ruta pentru afișarea tuturor studenților
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
