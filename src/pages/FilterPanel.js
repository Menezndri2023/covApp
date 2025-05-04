// src/pages/FilterPanel.js

import React, { useState } from 'react';
import styles from '../styles/FilterPanel.module.css';

const FilterPanel = () => {
  const [price, setPrice] = useState(50);
  const [rating, setRating] = useState(0);
  const [preferences, setPreferences] = useState({
    nonSmoker: false,
    largeLuggage: false,
    quietRide: false,
    petsAllowed: false
  });

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({ ...prev, [name]: checked }));
  };

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className={styles.filterPanel}>
      <h3>Filtres</h3>

      <div className={styles.priceRange}>
        <label>Fourchette de prix: {price} FCFA</label>
        <input 
          type="range" 
          min="100" 
          max="100000" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className={styles.rating}>
        <label>Note minimum du conducteur :</label>
        <div className={styles.ratingStars}>
          {[1,2,3,4,5].map(star => (
            <span
              key={star}
              className={star <= rating ? styles.filled : ''}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className={styles.preferences}>
        <label>
          <input 
            type="checkbox" 
            name="nonSmoker" 
            checked={preferences.nonSmoker}
            onChange={handlePreferenceChange}
          />
          Non-fumeur
        </label>
        <label>
          <input 
            type="checkbox" 
            name="largeLuggage" 
            checked={preferences.largeLuggage}
            onChange={handlePreferenceChange}
          />
          Bagages volumineux
        </label>
        <label>
          <input 
            type="checkbox" 
            name="quietRide" 
            checked={preferences.quietRide}
            onChange={handlePreferenceChange}
          />
          Trajet silencieux
        </label>
        <label>
          <input 
            type="checkbox" 
            name="petsAllowed" 
            checked={preferences.petsAllowed}
            onChange={handlePreferenceChange}
          />
          Animaux acceptés
        </label>
      </div>

      <button className={styles.searchBtn}>Rechercher</button>
    </div>
  );
};

export default FilterPanel;
