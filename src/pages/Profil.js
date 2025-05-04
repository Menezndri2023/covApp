import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Profil.module.css';

const Profil = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h2>Mon Profil</h2>
      {user ? (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <button className={styles.button} onClick={handleLogout}>Se déconnecter</button>
        </>
      ) : (
        <p>Vous n'êtes pas connecté.</p>
      )}
    </div>
  );
};

export default Profil;