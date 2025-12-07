const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ===== Database Pool (أفضل من connection عادي) =====
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',       // عدلها لو غيرتها في MAMP
    password: 'root',       // على MAMP في ويندوز غالباً فاضي
    database: 'bandrwood_db', // تأكد الاسم من phpMyAdmin
    port: 3306          // لو مغير البورت في MAMP عدله هنا
});

// اختبر الاتصال مرة وحدة عند بداية التشغيل
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err);
    } else {
        console.log('✅ Connected to MySQL database');
        connection.release();
    }
});

// ===== Routes =====

// Test route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Sign Up
app.post('/api/signup', (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const sql = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
    pool.query(sql, [fullname, email, password], (err, result) => {
        if (err) {
            console.error('Error in signup:', err);

            if (err.code === 'ER_DUP_ENTRY') {
                return res
                    .status(409)
                    .json({ success: false, message: 'Email already registered' });
            }

            return res
                .status(500)
                .json({ success: false, message: 'Server error: ' + err.code });
        }

        return res.json({ success: true, message: 'User created successfully' });
    });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing email or password' });
    }

    const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    pool.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error in login:', err);
            return res
                .status(500)
                .json({ success: false, message: 'Server error: ' + err.code });
        }

        if (results.length === 0) {
            return res
                .status(401)
                .json({ success: false, message: 'Email not found' });
        }

        const user = results[0];

        if (user.password !== password) {
            return res
                .status(401)
                .json({ success: false, message: 'Incorrect password' });
        }

        return res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email
            }
        });
    });
});

// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
