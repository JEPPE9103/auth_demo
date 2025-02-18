# Auth Demo 🚀

A simple user authentication system built with Node.js and Express. Users can register, log in, and log out with JSON-based storage.

## Features 🌟
- ✅ User registration with form validation
- ✅ Login with email & password
- ✅ Session handling (basic JSON storage)
- ✅ Express.js & Body-parser for backend
- ✅ HTML/CSS frontend

## Installation 🛠
1. **Clone the repository**  
   ```sh
   git clone https://github.com/JEPPE9103/auth_demo.git
   cd auth_demo
Install dependencies

sh
Kopiera
Redigera
npm install
Start the server

sh
Kopiera
Redigera
npm start
Open in your browser:

arduino
Kopiera
Redigera
http://localhost:3000
Folder Structure 📁
php
Kopiera
Redigera
auth_demo/
│── public/            # All frontend files
│   ├── homepage.html  # Login page
│   ├── register.html  # Registration page
│   ├── welcome.html   # Welcome page after login
│   ├── styles.css     # Styling
│── server/            # Backend code
│   ├── server.js      # Express server
│── .gitignore         # Ignore unnecessary files
│── package.json       # Project dependencies
│── README.md          # Documentation
How it Works ⚙️
Users register through register.html, and data is stored in data.json.
Users log in through homepage.html, and if credentials match, they are redirected to welcome.html.
Log out button sends users back to homepage.html.
Future Improvements 🚀
✅ Use a real database instead of JSON storage
✅ Implement password hashing for security
✅ Add authentication tokens (JWT)
License 📜
This project is open-source and available under the MIT License.
