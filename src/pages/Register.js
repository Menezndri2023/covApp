import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from '../styles/Register.module.css';

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register({ email, password, name })) {
      navigate('/profil');
    } else {
      alert("L'utilisateur existe déjà");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>Inscription</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nom complet" required className={styles.input} />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className={styles.input} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" required className={styles.input} />
      <button type="submit" className={styles.button}>S'inscrire</button>
    </form>
  );
};

export default Register;