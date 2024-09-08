// auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            // Assuming 'user' field indicates user type, change as per your model
            const dashboard = user.isAdmin ? 'admin_dashboard.html' : 'user_dashboard.html';
            res.json({ success: true, redirect: dashboard });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// User signup
router.post('/signup', async (req, res) => {
    const { username, password, isAdmin } = req.body;
    try {
        const newUser = new User({ username, password, isAdmin });
        await newUser.save();
        const dashboard = isAdmin ? 'admin_dashboard.html' : 'user_dashboard.html';
        res.json({ success: true, redirect: dashboard });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;

