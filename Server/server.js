const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware för att tolka inkommande form-data
app.use(bodyParser.urlencoded({ extended: true }));

// 🔥 Uppdaterad path för att servera statiska filer från `public/`
app.use(express.static(path.join(__dirname, '../public')));

// Route för att ladda `homepage.html` som startsida
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

// Route för att hantera registrering
app.post('/register', (req, res) => {
    const formData = req.body;

    // Läs in befintlig data
    let existingData = [];
    if (fs.existsSync(path.join(__dirname, '../data.json'))) {
        const rawData = fs.readFileSync(path.join(__dirname, '../data.json'));
        existingData = JSON.parse(rawData);
    }

    // Kolla om e-post redan finns
    const userExists = existingData.some(user => user.email === formData.email);
    if (userExists) {
        console.log(`Registration failed: Email ${formData.email} already exists.`);
        return res.send('Error: Email already registered. Try logging in.');
    }

    // Lägg till ny användare
    existingData.push(formData);

    // Spara tillbaka till filen
    fs.writeFileSync(path.join(__dirname, '../data.json'), JSON.stringify(existingData, null, 2));

    console.log('New User Registered:', formData);
    res.redirect('/');
});

// Route för att hantera inloggning
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Läs in sparad data
    if (fs.existsSync(path.join(__dirname, '../data.json'))) {
        const rawData = fs.readFileSync(path.join(__dirname, '../data.json'));
        const users = JSON.parse(rawData);

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            console.log(`Login successful for ${email}`);
            return res.redirect('/welcome.html');
        }
    }

    console.log(`Login failed for ${email}`);
    res.send('Invalid email or password. Try again.');
});

// Route för att visa välkomstsidan efter lyckad inloggning
app.get('/welcome.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/welcome.html'));
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
