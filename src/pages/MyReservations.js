import React, { useEffect, useState } from 'react';
import styles from '../styles/MyReservations.module.css';

const MyReservations = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const [myReservations, setMyReservations] = useState([]);

      useEffect(() => {
      const all = JSON.parse(localStorage.getItem('reservations') || '[]');
      const mine = all.filter((r) => r.reservedBy === user?.email);
      setMyReservations(mine);
      }, [user]);

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
                        <p>Prix : {r.price} FCFA</p>
                        <p>Conducteur : {r.createdBy}</p>
                  </div>
                  ))
                  )}
            </div>
      );
};

export default MyReservations;