import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRide from './pages/CreateRide';
import SearchRide from './pages/SearchRide';
import MyReservations from './pages/MyReservations';
import Profil from './pages/Profil';
import styles from './styles/App.module.css';

function App() {
  return (
    <>
      <div className={styles.navbar}>
        <Link to="/">Accueil</Link>
        <Link to="/create">Proposer</Link>
        <Link to="/search">Rechercher</Link>
        <Link to="/reservations">Mes réservations</Link>
        <Link to="/profil">Profil</Link>
        <Link to="/login">Connexion</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateRide />} />
        <Route path="/search" element={<SearchRide />} />
        <Route path="/reservations" element={<MyReservations />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </>
  );
}

export default App;