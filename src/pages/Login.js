import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from '../styles/Login.module.css';
import Footer from './Footer';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/profil');
    } else {
      alert('Email ou mot de passe incorrect');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>Connexion</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className={styles.input} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" required className={styles.input} />
      <button type="submit" className={styles.button}>Se connecter</button>
      <Footer />
    </form>
  );
};

export default Login;