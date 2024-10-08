const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    image: {
        filename: { type: String },
        path: { type: String },
        contentType: { type: String },
        size: { type: Number }
    },
    eventName: { type: String, required: true },
    theme: { type: String },
    organizer: { type: String },
    guestName: { type: String },
    datetime: { type: Date },
    duration: { type: String },
    venue: { type: String },
    city: { type: String },
    seats: { type: Number },
    description: { type: String },
    eventType: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Events', eventSchema);
