import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CreateRide.module.css';

const CreateRide = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const navigate = useNavigate();

      const [ride, setRide] = useState({
      departure: '',
      destination: '',
      date: '',
      price: '',
      });

      const handleChange = (e) => {
      setRide({ ...ride, [e.target.name]: e.target.value });
      };

      const handleSubmit = () => {
            if (!user) return alert("Connectez-vous pour proposer un trajet.");
            const rides = JSON.parse(localStorage.getItem('rides') || '[]');
            rides.push({ ...ride, createdBy: user.email });
            localStorage.setItem('rides', JSON.stringify(rides));
            alert('Trajet créé avec succès.');
            navigate('/');
            };

      return (
            <div className={styles.container}>
            <h2 className={styles.title}>Proposer un trajet</h2>
            <input className={styles.input} name="departure" placeholder="Départ" onChange={handleChange} />
            <input className={styles.input} name="destination" placeholder="Destination" onChange={handleChange} />
            <input className={styles.input} name="date" type="date" onChange={handleChange} />
            <input className={styles.input} name="price" type="number" placeholder="Prix" onChange={handleChange} />
            <button className={styles.button} onClick={handleSubmit}>Publier</button>
          </div>
      );
};

export default CreateRide;
