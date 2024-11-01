import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const ExploreEvents = () => {
    const [events, setEvents] = useState([]); 
    const [filteredEvents, setFilteredEvents] = useState([]); 
    const [city, setCity] = useState(''); 


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/events');
                setEvents(response.data);
                setFilteredEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);


        if (selectedCity === '') {
            setFilteredEvents(events); 
        } else {
            const filtered = events.filter(event => event.city.toLowerCase() === selectedCity.toLowerCase());
            setFilteredEvents(filtered);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="eventsList">
                <div className="eventsHeader">
                    <span className="material-symbols-outlined">
                        pin_drop
                    </span>
                    <span>Explore Events</span>
                </div>

                <div className="cityFilter">
                    <label htmlFor="city">Select a City:</label>
                    <select id="city" value={city} onChange={handleCityChange}>
                        <option value="">All Cities</option>
                        {[...new Set(events.map(event => event.city))].map((cityOption, index) => (
                            <option key={index} value={cityOption}>{cityOption}</option>
                        ))}
                    </select>
                </div>

                <div className="events">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div key={event._id} className="event">
                                {event.image && (
                                    <img
                                        src={`http://localhost:5000/uploads/${event.image.filename}`}
                                        alt={event.eventName}
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                )}
                                <div className="eventTitle">
                                    <span>{event.eventName} Event</span>
                                </div>
                                <div className="eventContent">
                                    {event.theme && <span><strong>Theme:</strong> {event.theme}</span>}
                                    {event.organizer && <span><strong>Organizer:</strong> {event.organizer}</span>}
                                    {event.guestName && <span><strong>Guest Name:</strong> {event.guestName}</span>}
                                    {event.datetime && <span><strong>Date and Time:</strong> {new Date(event.datetime).toLocaleString()}</span>}
                                    {event.duration && <span><strong>Duration:</strong> {event.duration}</span>}
                                    {event.venue && <span><strong>Venue:</strong> {event.venue}</span>}
                                    {event.city && <span><strong>City:</strong> {event.city}</span>}
                                    {event.seats !== undefined && <span><strong>Seats Available:</strong> {event.seats}</span>}
                                    {event.description && <span><strong>Description:</strong> {event.description}</span>}
                                    {event.eventType && <span><strong>Event Type:</strong> {event.eventType}</span>}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No events available for the selected city.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExploreEvents;
