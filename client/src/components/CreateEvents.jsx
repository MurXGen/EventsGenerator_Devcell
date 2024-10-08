import React, { useState } from 'react';
import Navbar from './Navbar';
import Template1 from '../assets/template1.svg'
import Culturals from '../assets/cultu.jpeg'
import Sports from '../assets/sports.jpeg'
import Seminar from '../assets/seminar.jpeg'
import EditEvents from './templates/EditEvents'
import axios from 'axios';


const eventConfigs = {
    casual: {
        eventType: "Casual",
        inputs: [
            { label: "Event Name", type: "text", name: "eventName", placeholder: "Enter event name" },
            { label: "Theme", type: "text", name: "theme", placeholder: "Event Theme" },
            { label: "Date", type: "datetime-local", name: "datetime", placeholder: "Enter date" },
            { label: "Duration", type: "text", name: "duration", placeholder: "Duration (Ex. 2 Days or 2 Hours)" },
            { label: "Venue/Place", type: "text", name: "venue", placeholder: "Event place (Location in short)" },
            { label: "Event city", type: "text", name: "city", placeholder: "Event City (Ex. Mumbai)" },
            { label: "Seats ", type: "text", name: "seats", placeholder: "Event seats (Ex. Free or 12 Seats)" },
        ],
    },
    sports: {
        eventType: "Sports",
        inputs: [
            { label: "Event Name", type: "text", name: "eventName", placeholder: "Enter event name" },
            { label: "Organizer", type: "text", name: "organizer", placeholder: "Event Organizer" },
            { label: "Date", type: "datetime-local", name: "datetime", placeholder: "Enter date" },
            { label: "Duration", type: "text", name: "duration",  placeholder: "Duration (Ex. 2 Days or 2 Hours)"  },
            { label: "Place", type: "text", name: "place", placeholder: "Event place" },
            { label: "Event city", type: "text", name: "city", placeholder: "Event City" },
            { label: "Description ", type: "text", name: "description", placeholder: "Event Description" },
        ],
    },

    seminar: {
        eventType: "Seminar",
        inputs: [
            { label: "Event Name", type: "text", name: "eventName", placeholder: "Enter event name" },
            { label: "Guest Name", type: "text", name: "guestname", placeholder: "Guest Name" },
            { label: "Date", type: "datetime-local", name: "datetime", placeholder: "Enter date" },
            { label: "Duration", type: "text", name: "duration",  placeholder: "Duration (Ex. 2 Days or 2 Hours)" },
            { label: "Place", type: "text", name: "place", placeholder: "Event place" },
            { label: "Event city", type: "text", name: "city", placeholder: "Event City" },
            { label: "Description ", type: "text", name: "description", placeholder: "Event Description" },
        ],
    },
};

const CreateEvents = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleTemplateChange = (template) => {
        setSelectedTemplate(template);
    };

    return (
        <div className='templates'>
            <Navbar />
            <div className="templateBox">
                <div className="title">
                    <img src={Template1}/>
                    <span>Select Template</span>
                </div>
                <div className="eventTemplates">

                    <div className="eventTemplate">
                        <div className="img">
                            <img src={Culturals} alt="" />
                        </div>
                        <div className="content">
                            <div className="contentTitle">
                                <span>Casual</span>
                                <span>Event Template</span>
                            </div>
                            <div className="contentButton">
                                <button  onClick={() => handleTemplateChange('casual')}>Choose</button>
                            </div>
                        </div>
                    </div>

                    <div className="eventTemplate">
                        <div className="img">
                            <img src={Sports} alt="" />
                        </div>
                        <div className="content">
                            <div className="contentTitle">
                                <span>Sports</span>
                                <span>Event Template</span>
                            </div>
                            <div className="contentButton">
                                <button  onClick={() => handleTemplateChange('sports')}>Choose</button>
                            </div>
                        </div>
                    </div>

                    <div className="eventTemplate">
                        <div className="img">
                            <img src={Seminar} alt="" />
                        </div>
                        <div className="content">
                            <div className="contentTitle">
                                <span>Seminar</span>
                                <span>Event Template</span>
                            </div>
                            <div className="contentButton">
                                <button  onClick={() => handleTemplateChange('seminar')}>Choose</button>
                            </div>
                        </div>
                    </div>

                    
                </div>

                <div className="showTemplate">
                    {selectedTemplate && (
                        <EditEvents
                            eventType={eventConfigs[selectedTemplate].eventType}
                            inputs={eventConfigs[selectedTemplate].inputs}
                            
                        />
                    )}
                </div>
            </div>
        </div>

    );
};

export default CreateEvents;
