import React from 'react';
import styles from '../styles/TripList.module.css';

const TripCard = ({ trip, onReserve }) => {
  return (
    <div className={styles.tripCard}>
      <div className={styles.tripLeft}>
        <img
          src={trip.image || '/default-user.jpg'}
          alt={trip.driver}
          className={styles.driverImage}
        />
        <div className={styles.tripDetails}>
          <div className={styles.tripMeta}>
            <strong>{trip.departure}</strong> ➞ <strong>{trip.destination}</strong>
            {trip.isNew && <span className={styles.newBadge}>Nouveau</span>}
          </div>
          <div className={styles.tripMeta}>
            <span>Conducteur : {trip.driver}</span>
            <span className={styles.rating}>{trip.rating || 4.5} ★</span>
          </div>
          <div className={styles.tripHour}>Heure : {trip.hour || '08:00'}</div>
        </div>
      </div>
      <div className={styles.tripRight}>
        <span className={styles.tripPrice}>{trip.price} FCFA</span>
        <button className={styles.reserveBtn} onClick={() => onReserve(trip)}>
          Réserver
        </button>
      </div>
    </div>
  );
};

export default TripCard;
