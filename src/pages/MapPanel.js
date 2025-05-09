import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../styles/MapPanel.module.css';

const MapPanel = () => {
  return (
    <div className={styles.map}>
      <h3>Carte des trajets</h3>
      <MapContainer center={[5.3489, -4.0039]} zoom={6} style={{ height: '400px', width: '100%' }} className='mapPlaceholder'>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

export default MapPanel;
