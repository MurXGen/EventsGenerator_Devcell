const Event = require('../models/Events');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } 
});


const createEvent = async (req, res) => {
    try {
       
        const { eventName, theme, organizer, guestName, datetime, duration, venue, city, seats, description, eventType } = req.body;

 
        const event = new Event({
            eventName,
            theme,
            organizer,
            guestName,
            datetime,
            duration,
            venue,
            city,
            seats,
            description,
            eventType,
            image: req.file ? {
                filename: req.file.filename,
                path: req.file.path,
                contentType: req.file.mimetype,
                size: req.file.size
            } : null
        });

  
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Please fill in required details', error });
    }
};
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find(); 
        res.status(200).json(events);  
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

module.exports = {
    createEvent,
    upload,
    getAllEvents
};
