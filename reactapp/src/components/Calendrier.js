import React, { useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function DemoApp() {
    const [events, setEvents] = useState([]);

    const chargerEvenements = () => {
        axios.get('/api/evenements').then(response => {
            setEvents(response.data);
        });
    };

    const ajouterEvenement = () => {
        const title = prompt("Nom de l'événement:");
        const date = prompt("Date de l'événement (YYYY-MM-DD):");
        axios.post('/api/evenements', { title, date }).then(response => {
            setEvents([...events, response.data]);
        });
    };

    const supprimerEvenement = (event) => {
        const confirmed = window.confirm(`Supprimer l'événement "${event.title}" ?`);
        if (confirmed) {
            axios.delete(`/api/evenements/${event.id}`).then(() => {
                const newEvents = events.filter(e => e.id !== event.id);
                setEvents(newEvents);
            });
        }
    };

    return (
        <div>
            <h1 className='MyCalendar' style={{ textAlign: "left" }}>Calendrier</h1>
            <button onClick={chargerEvenements}>Charger les événements</button>
            <button onClick={ajouterEvenement}>Ajouter un événement</button>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                eventClick={(info) => supprimerEvenement(info.event)}
            />
        </div>
    );
}

export default DemoApp;