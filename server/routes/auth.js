const express = require('express');
const User = require('../models/User');
const Event = require('../models/Events');
const { createEvent, upload ,getAllEvents} = require('../controllers/eventController');
const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Email:', email, 'Password:', password);  // Log email and password

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user: { username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/upload', upload.single('image'), createEvent);

router.get('/events', getAllEvents);


module.exports = router;