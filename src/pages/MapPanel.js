import React from 'react';
import styles from '../styles/MapPanel.module.css';

const MapPanel = () => {
  return (
    <div className={styles.map}>
      <h3>Carte des trajets</h3>
      <div className={styles.mapPlaceholder}>[Carte interactive ici]</div>
    </div>
  );
};

export default MapPanel;