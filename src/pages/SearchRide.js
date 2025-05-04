import React, { useState } from 'react';
import styles from '../styles/SearchRide.module.css';

const SearchRide = () => {
      const user = JSON.parse(localStorage.getItem('user'));
  const [filters, setFilters] = useState({ departure: '', destination: '' });
  const [results, setResults] = useState([]);

      const handleChange = (e) => {
      setFilters({ ...filters, [e.target.name]: e.target.value });
      };

      const handleSearch = () => {
      const rides = JSON.parse(localStorage.getItem('rides') || '[]');
      const filtered = rides.filter(
            (ride) =>
            ride.departure.toLowerCase().includes(filters.departure.toLowerCase()) &&
            ride.destination.toLowerCase().includes(filters.destination.toLowerCase())
      );
      setResults(filtered);
      };

      const handleReserve = (ride) => {
            if (!user) return alert("Vous devez être connecté pour réserver.");
            const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
            reservations.push({ ...ride, reservedBy: user.email });
            localStorage.setItem("reservations", JSON.stringify(reservations));
            alert("Réservation effectuée avec succès.");
      };

      return (
            <div className={styles.container}>
            <h2 className={styles.title}>Rechercher un trajet</h2>
            <input className={styles.input} name="departure" placeholder="Départ" onChange={handleChange} />
            <input className={styles.input} name="destination" placeholder="Destination" onChange={handleChange} />
            <button className={styles.button} onClick={handleSearch}>Rechercher</button>
      
            <div className={styles.results}>
                  {results.map((ride, index) => (
                  <div className={styles.rideCard} key={index}>
                        <h4>{ride.departure} ➞ {ride.destination}</h4>
                        <p>Date : {ride.date}</p>
                        <p>Prix : {ride.price} FCFA</p>
                        <p>Conducteur : {ride.createdBy}</p>
                        <button className={styles.button} onClick={() => handleReserve(ride)}>Réserver</button>
                  </div>
                  ))}
                  </div>
            </div>
      );
};

export default SearchRide;
