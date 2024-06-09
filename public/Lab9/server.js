const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5023; // Portul va fi 5523 conform specificațiilor
const mongoURI = 'mongodb://192.168.37.37:27017/PW_lab_activities'; // URI-ul pentru MongoDB

// Conectarea la baza de date MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectat la MongoDB'))
  .catch(err => console.error('Eroare la conectarea la MongoDB:', err));

// Definirea schemei activităților
const activitySchema = new mongoose.Schema({
  user: Number,
  week: Number,
  activities: [String]
});

// Modelul pentru activități
const Activity = mongoose.model('Activity', activitySchema);

// Middleware pentru a permite analizarea corpului cererii JSON
app.use(express.json());

// Endpoint pentru afișarea endpoint-urilor implementate
app.get('/', (req, res) => {
  res.send(`
    <h1>Endpoint-uri implementate:</h1>
    <ul>
      <li><a href="/api/items">/api/items</a> - lista laboratoare</li>
      <li>/api/items/{week} - activități pentru săptămâna {week}</li>
    </ul>
  `);
});

// Endpoint pentru lista laboratoarelor
app.get('/api/items', async (req, res) => {
  try {
    // Simulăm lista laboratoarelor
    const labs = Array.from({ length: 13 }, (_, i) => `/api/items/${i + 1}`);
    res.json({ labs });
  } catch (err) {
    res.status(500).json({ error: 'Eroare internă a serverului' });
  }
});

// Endpoint pentru activitățile unei săptămâni
app.get('/api/items/:week', async (req, res) => {
  const week = req.params.week;
  try {
    // Găsim activitățile pentru săptămâna specificată
    const activities = await Activity.find({ week });
    res.json({ activities });
  } catch (err) {
    res.status(500).json({ error: 'Eroare internă a serverului' });
  }
});

// Endpoint pentru înregistrarea unei activități
app.post('/api/items/:week', async (req, res) => {
  const { user, activities } = req.body;
  const week = req.params.week;
  try {
    // Creăm o nouă activitate și o salvăm în baza de date
    const newActivity = new Activity({ user, week, activities });
    await newActivity.save();
    res.status(201).json({ message: 'Activitate adăugată cu succes' });
  } catch (err) {
    res.status(500).json({ error: 'Eroare internă a serverului' });
  }
});

// Pornirea serverului
app.listen(port, () => {
  console.log(`Serverul REST rulează la adresa http://192.168.37.37:${port}`);
});
