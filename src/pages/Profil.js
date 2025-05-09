import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Profil.module.css';
import Footer from './Footer';

const Profil = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    image: user?.image || 'https://via.placeholder.com/100',
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setEditMode(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Mon Profil</h2>
        {user ? (
          <div className={styles.profileCard}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={formData.image}
                alt="Avatar"
                className={styles.avatar}
              />
              {editMode && (
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              )}
            </div>
            {editMode ? (
              <>
                <p>
                  <strong>Nom :</strong>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </p>
                <p>
                  <strong>Email :</strong>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </p>
                <p>
                  <strong>Mot de passe :</strong>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </p>
                <div className={styles.actions}>
                  <button className={styles.editButton} onClick={handleSave}>
                    Enregistrer
                  </button>
                  <button
                    className={styles.logoutButton}
                    onClick={() => setEditMode(false)}
                  >
                    Annuler
                  </button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Nom :</strong> {user.name}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <div className={styles.actions}>
                  <button className={styles.editButton} onClick={() => setEditMode(true)}>
                    Modifier
                  </button>
                  <button className={styles.logoutButton} onClick={handleLogout}>
                    Se déconnecter
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className={styles.message}>Vous n'êtes pas connecté.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profil;
