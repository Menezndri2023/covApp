import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SearchRide.module.css'; // Pour wrapper général
import tripStyles from '../styles/TripList.module.css'; // Pour style des trajets
import Footer from './Footer';
import TripCard from './TripCard';

const SearchRide = () => {
  const navigate = useNavigate();
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

  const goToReservation = (trip) => {
    navigate('/reservation', { state: { trip } });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={tripStyles.title}>Rechercher un trajet</h2>
        <div className={styles.filters}>
          <input
            className={styles.input}
            name="departure"
            placeholder="Départ"
            onChange={handleChange}
          />
          <input
            className={styles.input}
            name="destination"
            placeholder="Destination"
            onChange={handleChange}
          />
          <button className={styles.button} onClick={handleSearch}>
            Rechercher
          </button>
        </div>

        <div className={tripStyles.tripList}>
          {results.length === 0 ? (
            <p>Aucun trajet trouvé.</p>
          ) : (
            results.map((trip, index) => (
                  <TripCard key={index} trip={trip} onReserve={goToReservation} />
                ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchRide;
