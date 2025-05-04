import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === form.email && u.password === form.password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Connexion</h2>
      <input className={styles.input} name="email" placeholder="Email" onChange={handleChange} />
      <input className={styles.input} name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />
      <button className={styles.button} onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default Login;
