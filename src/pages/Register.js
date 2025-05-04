import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u) => u.email === form.email)) {
      alert('Cet utilisateur existe déjà.');
    } else {
      users.push(form);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Inscription réussie.');
      navigate('/login');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Inscription</h2>
      <input className={styles.input} name="email" placeholder="Email" onChange={handleChange} />
      <input className={styles.input} name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />
      <button className={styles.button} onClick={handleRegister}>S'inscrire</button>
    </div>
  );
};

export default Register;