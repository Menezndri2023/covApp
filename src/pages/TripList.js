import React from 'react';
import styles from '../styles/TripList.module.css';

const trips = [
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    from: 'Abidjan',
    to: 'Yamoussoukro',
    hour: '08:00',
    driver: 'Jean K.',
    rating: 4,
    car: 'Toyota Corolla',
    seats: 3,
    price: 3500
  },
  {
    id: 2,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    from: 'Bouaké',
    to: 'Abidjan',
    hour: '14:30',
    driver: 'Awa D.',
    rating: 5,
    car: 'Kia Rio',
    seats: 2,
    price: 4000
  },
  {
      id: 3,
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      from: 'abidjan',
      to: 'korhogo',
      hour: '10:30',
      driver: 'Angele D.',
      rating: 3,
      car: 'Toyota corolla',
      seats: 3,
      price: 6000
    },
    {
      id: 4,
      image: 'https://randomuser.me/api/portraits/men/30.jpg',
      from: 'yamoussoukro',
      to: 'korhogo',
      hour: '09:30',
      driver: 'Kone D.',
      rating: 4,
      car: 'rav4',
      seats: 3,
      price: 5000
    },
    {
      id: 5,
      image: 'https://randomuser.me/api/portraits/men/24.jpg',
      from: 'Toumodi',
      to: 'Abidjan',
      hour: '16:30',
      driver: 'Ahou D.',
      rating: 5,
      car: 'range rover',
      seats: 2,
      price: 7000
    },
];

const TripList = () => {
  return (
    <div className={styles.tripList}>
      <h2 className={styles.title}>Trajets Disponible</h2>
      {trips.map(trip => (
        <div key={trip.id} className={styles.tripCard}>
          <div className={styles.tripLeft}>
            <img src={trip.image} alt={trip.driver} className={styles.driverImage} />
            <div className={styles.tripDetails}>
              <div><strong>{trip.from} → {trip.to}</strong></div>
              <div className={styles.tripHour}>Départ : {trip.hour}</div>
              <div className={styles.tripMeta}>
                <span>Conducteur : {trip.driver}</span>

      <div className={styles.rating}>
      Note :
      {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < trip.rating ? styles.filledStar : styles.emptyStar}>
            ★
      </span>
      ))}
      </div>

                <span>Voiture : {trip.car}</span>
                <span>Places dispo : {trip.seats}</span>
              </div>
            </div>
          </div>
          <div className={styles.tripRight}>
            <div className={styles.tripPrice}>{trip.price} FCFA</div>
            <button className={styles.reserveBtn}>Réserver</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripList;
