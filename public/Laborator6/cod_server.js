const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

app.listen(3023, () => {
    console.log('start');
})

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');

app.get('/', (req, res) => {
    //daca avem sesiune inca activa
    //redirectionam utlizatorul spre pagina principala
    if ((req.session.eAutentificat != undefined) && (req.session.eAutentificat == true)) {
        res.redirect('/home');
    }
    else {
        res.sendFile(__dirname + "/views/pagina_login.html");
    }
})

//schema = formatul pe care il are un document
//document = inregistrare in baza de date
const schema = new mongoose.Schema({
    userName: { type: String, required: true },
    parola: { type: String, required: true }
});
//pe baza schemei se obtine un model
//schema defineste formatul
//modelul este o clasa javascript
//care pune la dispozitie metode pentru alterarea colectiei
const User = mongoose.model('User', schema);

app.post('/', async (req, res) => {
    const userNameIntrodus = req.body.userName;
    const userGasit = await User.findOne({ userName: userNameIntrodus });
    if (!userGasit) {
        console.log("user negasit");
        res.redirect('/');
    }
    else if (await bcrypt.compare(req.body.parola, userGasit.parola)) {
        console.log("user autentif");
        //se initiaza o sesiune
        req.session.nrAccesari = 0;
        req.session.userAutentificat = req.body.userName;
        req.session.eAutentificat = true;
        //si este redirectionat spre pagina principala
        res.redirect('/home');
    }
    else {
        console.log("parola gresita");
        res.redirect('/');
    }
})

app.post('/inregistrare', async (req, res) => {
    try {
        //extragem datele introduse in formular
        const { userName, parola } = req.body;
        //obtinem hash-ul parolei
        const hashParola = await bcrypt.hash(parola, 10);
        //creem un document nou in db
        User.create({ userName: userName, parola: hashParola });
        //redirectionare spre pagina de login
        res.redirect('/');
    } catch (error) {
        //daca intampinam eroare ramanem in aceeasi pagina
        console.error(error);
        res.redirect('/inregistrare');
    }
});

app.get('/inregistrare', (req, res) => {
    res.sendFile(__dirname + "/views/pagina_inregistrare.html");
})

//pagina home prezinta numele contului
//si nr de accesari in sesiunea curenta
app.get('/home', (req, res) => {
    const nrAccesari = ++req.session.nrAccesari;
    const text = req.session.userAutentificat;
    const urlGravatar = getGravatarUrl(req.session.userAutentificat);
    res.render(__dirname + '/views/home.ejs', { text, nrAccesari, urlGravatar });
})

//sesiunea poate fi terminata
//pt a ne loga cu alt cont
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

function getGravatarUrl(email) {
    const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
}