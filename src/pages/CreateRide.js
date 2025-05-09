import React, { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaRoute, FaClock, FaCarSide, FaEuroSign, FaEye } from 'react-icons/fa';
import styles from '../styles/CreateRide.module.css';
import Footer from '../pages/Footer';
import axios from 'axios';

const CreateRide = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [ride, setRide] = useState({
    departure: '',
    destination: '',
    stops: [''],
    date: '',
    time: '',
    returnDate: '',
    returnTime: '',
    hasReturn: false,
    flexible: false,
    vehicleType: '',
    carModel: '',
    seats: 1,
    comfort: { ac: false, usb: false, comfySeats: false },
    carImage: null,
    price: '',
    preferences: {
      nonSmoking: false,
      animals: false,
      largeBaggage: false,
      quiet: false
    }
  });

  const [coordinates, setCoordinates] = useState([]);

  const geocodeAddress = async (address) => {
    const apiKey = '0723ef0874e343a6a666d005182a69c0'; // Remplace par ta propre clé API OpenCage
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const { results } = response.data;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry;
        return [lat, lng];
      }
    } catch (error) {
      console.error('Erreur lors du géocodage :', error);
    }
    return null;
  };

  const MapViewUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, 6); // Tu peux ajuster le zoom ici
      }
    }, [center,map]);
    return null;
  };

  useEffect(() => {
    console.log('Coords =', coordinates);
  }, [coordinates]);
  

  useEffect(() => {
    const fetchCoordinates = async () => {
      const addresses = [ride.departure, ...ride.stops, ride.destination]
      .filter(addr => addr && addr.length >= 3);
      if (addresses.length < 2) return;

      const coords = [];
      for (const addr of addresses) {
        const point = await geocodeAddress(addr);
        if (point) coords.push(point);
      }
      setCoordinates(coords);
    };

    fetchCoordinates();
  }, [ride.departure, ride.stops, ride.destination]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in ride.comfort) {
      setRide({ ...ride, comfort: { ...ride.comfort, [name]: checked } });
    } else if (name in ride.preferences) {
      setRide({ ...ride, preferences: { ...ride.preferences, [name]: checked } });
    } else {
      setRide({ ...ride, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleImageChange = (e) => {
    setRide({ ...ride, carImage: e.target.files[0] });
  };

  const handleStopChange = (index, value) => {
    const newStops = [...ride.stops];
    newStops[index] = value;
    setRide({ ...ride, stops: newStops });
  };

  const addStop = () => {
    setRide({ ...ride, stops: [...ride.stops, ''] });
  };

  const handleSubmit = () => {
    if (!user) return alert("Connectez-vous pour proposer un trajet.");
    const rides = JSON.parse(localStorage.getItem('rides') || '[]');
    rides.push({ ...ride, createdBy: user.email, status: 'published' });
    localStorage.setItem('rides', JSON.stringify(rides));
    alert('Trajet créé avec succès.');
    navigate('/');
  };

  const handleSaveDraft = () => {
    if (!user) return alert("Connectez-vous pour enregistrer un brouillon.");
    const drafts = JSON.parse(localStorage.getItem('draftRides') || '[]');
    drafts.push({ ...ride, createdBy: user.email });
    localStorage.setItem('draftRides', JSON.stringify(drafts));
    alert('Brouillon enregistré avec succès.');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerBlue}>
        <h1 className={styles.title}>Proposer un trajet</h1>
        <p className={styles.desc}>Partagez votre trajet, réduisez vos coûts et contribuez à une mobilité plus durable.</p>
      </div>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}><FaRoute /> Votre itinéraire</h2>
        <input className={styles.input} name="departure" placeholder="Ville ou adresse de départ" value={ride.departure} onChange={handleChange} />
        <input className={styles.input} name="destination" placeholder="Ville ou adresse d'arrivée" value={ride.destination} onChange={handleChange} />
        {ride.stops.map((stop, index) => (
          <input key={index} className={styles.input} placeholder={`Arrêt ${index + 1}`} value={stop} onChange={(e) => handleStopChange(index, e.target.value)} />
        ))}
        <button className={styles.addStopButton} onClick={addStop}>Ajouter un arrêt</button>

        <h3 className={styles.sectionTitle}><FaEye /> Aperçu du trajet</h3>

        {coordinates.length > 0 && (
        <div className={styles.mapWrapper}>
          <MapContainer
            center={coordinates[0]}
            zoom={6}
            className={styles.map}
          >
            <MapViewUpdater center={coordinates[0]} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {coordinates.map((pos, idx) => (
              <Marker key={idx} position={pos} />
            ))}
            {coordinates.length > 1 && (
              <Polyline positions={coordinates} pathOptions={{ color: 'blue', weight: 4 }} />
            )}
          </MapContainer>
        </div>
      )}


        <h2 className={styles.sectionTitle}><FaClock /> Horaires du trajet</h2>
        <label className={styles.label}>Date de départ :</label>
        <input className={styles.input} name="date" type="date" onChange={handleChange} />
        <label className={styles.label}>Heure de départ :</label>
        <input className={styles.input} name="time" type="time" onChange={handleChange} />

        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="hasReturn" checked={ride.hasReturn} onChange={handleChange} /> Proposer le trajet retour
        </label>
        {ride.hasReturn && (
          <>
            <label className={styles.label}>Date de retour :</label>
            <input className={styles.input} name="returnDate" type="date" onChange={handleChange} />
            <label className={styles.label}>Heure de retour :</label>
            <input className={styles.input} name="returnTime" type="time" onChange={handleChange} />
          </>
        )}
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="flexible" checked={ride.flexible} onChange={handleChange} /> Horaires flexibles (±30 min)
        </label>

        <h2 className={styles.sectionTitle}><FaCarSide /> Informations sur le véhicule</h2>
        <input className={styles.input} name="carModel" placeholder="Marque et modèle" onChange={handleChange} />
        <input className={styles.input} name="seats" type="number" placeholder="Nombre de places" onChange={handleChange} />

        <fieldset className={styles.fieldset}>
          <legend>Confort :</legend>
          <label className={styles.checkboxLabel}><input type="checkbox" name="ac" checked={ride.comfort.ac} onChange={handleChange} /> Climatisation</label>
          <label className={styles.checkboxLabel}><input type="checkbox" name="usb" checked={ride.comfort.usb} onChange={handleChange} /> Prises USB</label>
          <label className={styles.checkboxLabel}><input type="checkbox" name="comfySeats" checked={ride.comfort.comfySeats} onChange={handleChange} /> Sièges confortables</label>
        </fieldset>

        <label className={styles.label}>Photo du véhicule :</label>
        <input className={styles.fileInput} type="file" onChange={handleImageChange} accept="image/*" />

        <h2 className={styles.sectionTitle}><FaEuroSign /> Prix et préférences</h2>
        <label className={styles.label}>Prix par passager :</label>
        <input className={styles.input} name="price" type="number" placeholder="Prix par passager" onChange={handleChange} />

        <fieldset className={styles.fieldset}>
          <legend>Préférences pour le trajet :</legend>
          <label className={styles.checkboxLabel}><input type="checkbox" name="nonSmoking" checked={ride.preferences.nonSmoking} onChange={handleChange} /> Non-fumeur</label>
          <label className={styles.checkboxLabel}><input type="checkbox" name="animals" checked={ride.preferences.animals} onChange={handleChange} /> Animaux acceptés</label>
          <label className={styles.checkboxLabel}><input type="checkbox" name="largeBaggage" checked={ride.preferences.largeBaggage} onChange={handleChange} /> Bagages volumineux acceptés</label>
          <label className={styles.checkboxLabel}><input type="checkbox" name="quiet" checked={ride.preferences.quiet} onChange={handleChange} /> Trajet silencieux</label>
        </fieldset>

        <div className={styles.buttonGroup}>
          <button className={styles.secondaryButton} onClick={handleSaveDraft}>Enregistrer comme brouillon</button>
          <button className={styles.primaryButton} onClick={handleSubmit}>Publier</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateRide;