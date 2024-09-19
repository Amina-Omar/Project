// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { body, validationResult } = require('express-validator');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'KIPONDA5273',
    database: 'e_chama'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// User Sign-Up Route
app.post('/api/signup', [
    body('firstname').notEmpty(),
    body('lastname').notEmpty(),
    body('username').notEmpty(),
    body('email').isEmail(),
    body('phone').notEmpty(),
    body('password').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, username, email, phone, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send('Error hashing password');

        // Insert new user into database
        const sql = 'INSERT INTO users (firstname, lastname, username, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [firstname, lastname, username, email, phone, hash], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('Email or username already exists');
                }
                return res.status(500).send('Database error');
            }
            res.status(201).send('User registered successfully');
        });
    });
});

// Admin Login Route
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM admins WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const admin = results[0];

        // Compare hashed passwords
        bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) return res.status(500).send('Error comparing password');
            if (!isMatch) {
                return res.status(401).send('Invalid username or password');
            }

            // Generate JWT token
            const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ message: 'Login successful', token });
        });
    });
});

// Fetch User Details Route
app.post('/api/user/update', (req, res) => {
    const { fullName, idNumber, location, userId } = req.body;
    const query = 'UPDATE users SET full_name = ?, id_number = ?, location = ? WHERE id = ?';

    db.query(query, [fullName, idNumber, location, userId], (err) => {
        if (err) return res.status(500).send('Server error');
        res.send('User details updated successfully');
    });
});

// Submit Loan Request Route
app.post('/api/loans/request', (req, res) => {
    const { loanFullName, loanIdNumber, loanLocation, loanAmount, repayPeriod } = req.body;
    const query = 'INSERT INTO loanrequest (full_name, id_number, location, amount, repay_period) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [loanFullName, loanIdNumber, loanLocation, loanAmount, repayPeriod], (err) => {
        if (err) return res.status(500).send('Server error');
        res.send('Loan request submitted successfully');
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Serve index.html on root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

