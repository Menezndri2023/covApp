import React, { useEffect, useState,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MyReservations.module.css';

const MyReservations = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [myReservations, setMyReservations] = useState([]);
  const navigate = useNavigate();

  const loadReservations = useCallback(() => {
      const all = JSON.parse(localStorage.getItem('reservations') || '[]');
      const mine = all.filter(r => r.reservedBy === user?.email);
      setMyReservations(mine);
    }, [user]);
  
    useEffect(() => {
      loadReservations();
    }, [loadReservations]);

  const handleDelete = (timestamp) => {
    const all = JSON.parse(localStorage.getItem('reservations') || '[]');
    const updated = all.filter(r => r.timestamp !== timestamp);
    localStorage.setItem('reservations', JSON.stringify(updated));
    loadReservations();
  };

  const handleEdit = (reservation) => {
    // Simule un "trip" à partir des données de réservation
    const simulatedTrip = {
      from: reservation.departure,
      to: reservation.destination,
      hour: reservation.date,
      price: reservation.price / reservation.seats,
      seats: reservation.seats,
      driver: reservation.createdBy,
      image: '', // ou une image par défaut
      rating: 5,
      car: 'Non spécifié',
      id: reservation.tripId
    };

    navigate('/reservations', {
      state: {
        trip: simulatedTrip,
        reservationData: reservation // on peut l'utiliser si besoin plus tard
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mes réservations</h2>
      {myReservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        myReservations.map((r, i) => (
          <div className={styles.rideCard} key={i}>
            <h4>{r.departure} ➞ {r.destination}</h4>
            <p>Date : {r.date}</p>
            <p>Nombre de places : {r.seats}</p>
            <p>Prix : {r.price} FCFA</p>
            <p>Conducteur : {r.createdBy}</p>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => handleEdit(r)}
                className={styles.editBtn}
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(r.timestamp)}
                className={styles.deleteBtn}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReservations;
