import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../styles//NavBar.module.css';

const Navbar = () => {
      const navigate = useNavigate();
      const user = localStorage.getItem('user');

      const handleLogout = () => {
      localStorage.removeItem('user');
      navigate('/login');
      };

      return (
      <nav className={styles.navbar}>
            <div className={styles.logo}>🚗 Covoiturage</div>
            <ul className={styles.navLinks}>
            <li><NavLink to="/">Accueil</NavLink></li>
            <li><NavLink to="/create">Proposer un trajet</NavLink></li>
            <li><NavLink to="/search">Rechercher</NavLink></li>
            {!user ? (
            <>
                  <li><NavLink to="/login">Connexion</NavLink></li>
                  <li><NavLink to="/register">Inscription</NavLink></li>
            </>
            ) : (
            <>
                  <li><NavLink to="/profile">Mon profil</NavLink></li>
                  <li><button onClick={handleLogout} className={styles.logoutBtn}>Déconnexion</button></li>
            </>
            )}
            </ul>
      </nav>
      );
};

export default Navbar;