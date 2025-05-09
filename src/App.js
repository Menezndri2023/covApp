import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRide from './pages/CreateRide';
import SearchRide from './pages/SearchRide';
import MyReservations from './pages/MyReservations';
import Profil from './pages/Profil';
import ReservationPage from './pages/ReservationPage';
import styles from './styles/App.module.css';
import PrivateRoute from './pages/PrivateRoute';
import { useAuth } from './pages/AuthContext';
import RedirectIfAuthenticated from './pages/RedirectIfAuthenticated';

function App() {
  const { user, logout } = useAuth(); // 👈 accès au user et logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // 👈 retour à l'accueil
  };

  return (
    <>
      <div className={styles.navbar}>
        <Link to="/">Accueil</Link>
        <Link to="/create">Proposer</Link>
        <Link to="/search">Rechercher</Link>
        {user && <Link to="/reservations">Mes réservations</Link>}

        {user && <Link to="/profil">Profil</Link>}
        {!user && <Link to="/login">Connexion</Link>}
        {!user && <Link to="/register">Inscription</Link>}
        {user && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Déconnexion
          </button>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
        <Route
            path="/register"
            element={
              <RedirectIfAuthenticated>
                <Register />
              </RedirectIfAuthenticated>
            }
          />
        <Route path="/create" element={<CreateRide />} />
        <Route path="/search" element={<SearchRide />} />
        <Route
            path="/reservations"
            element={
              <PrivateRoute>
                <MyReservations />
              </PrivateRoute>
            }
          />
        <Route path="/profil" element={
          <PrivateRoute>
            <Profil />
          </PrivateRoute>
        } />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
    </>
  );
}

export default App;
