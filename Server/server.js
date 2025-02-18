const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/homepage.html'));
});


app.post('/register', (req, res) => {
    const formData = req.body;

    
    let existingData = [];
    if (fs.existsSync(path.join(__dirname, '../data.json'))) {
        const rawData = fs.readFileSync(path.join(__dirname, '../data.json'));
        existingData = JSON.parse(rawData);
    }

    
    const userExists = existingData.some(user => user.email === formData.email);
    if (userExists) {
        console.log(`Registration failed: Email ${formData.email} already exists.`);
        return res.send('Error: Email already registered. Try logging in.');
    }

    existingData.push(formData);

    
    fs.writeFileSync(path.join(__dirname, '../data.json'), JSON.stringify(existingData, null, 2));

    console.log('New User Registered:', formData);
    res.redirect('/');
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    
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


app.get('/welcome.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/welcome.html'));
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
