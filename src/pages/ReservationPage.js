import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from '../styles/ReservationPage.module.css';
import Footer from './Footer';

const ReservationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const trip = state?.trip;

  const [seats, setSeats] = useState(1);
  const [contact, setContact] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!trip) return <div>Trajet introuvable.</div>;

  const handleConfirm = () => {
    if (!acceptedTerms) {
      alert("Veuillez accepter les conditions générales.");
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Utilisateur non connecté !");
      return;
    }

    const reservation = {
      departure: trip.from,
      destination: trip.to,
      date: trip.hour,
      price: trip.price * seats,
      seats: seats,
      reservedBy: user.email,
      createdBy: trip.driver,
      contact: contact,
      paymentMethod: paymentMethod,
      tripId: trip.id || null,
      timestamp: Date.now()
    };

    const existing = JSON.parse(localStorage.getItem('reservations') || '[]');
    existing.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(existing));

    alert("Réservation confirmée !");
    navigate('/mes-reservations');
  };

  const totalPrice = trip.price * seats;

  return (
    <>
      <div className={styles.pageContainer}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft /> Retour
        </button>

        <h1>Réservation de trajet</h1>

        <div className={styles.sectionCards}>
          <div className={styles.leftColumn}>
            <h2 className={styles.sectionTitle}>Détails du Trajet</h2>
            <div className={styles.tripSummary}>
              <div>
                <p><strong>De :</strong> {trip.from}</p>
                <p><strong>À :</strong> {trip.to}</p>
                <p><strong>Heure :</strong> {trip.hour}</p>
                <p><strong>Prix / place :</strong> {trip.price} FCFA</p>
              </div>
              <div className={styles.driverBlock}>
                <img src={trip.image} alt={trip.driver} className={styles.driverImage} />
                <p><strong>{trip.driver}</strong></p>
                <p>Note : {trip.rating} ★</p>
                <p>Véhicule : {trip.car}</p>
              </div>
            </div>

            <h3 className={styles.sectionTitle}>Réservation</h3>
            <div className={styles.sectionCard}>
              <label className={styles.label}>Nombre de places :</label>
              <input
                type="number"
                min="1"
                max={trip.seats}
                value={seats}
                onChange={e => setSeats(Number(e.target.value))}
                className={styles.input}
              />
              <p className={styles.totalPrice}>Total : <strong>{totalPrice} FCFA</strong></p>

              <label className={styles.label}>Nom complet</label>
              <input type="text" className={styles.input} value={contact.fullName} onChange={e => setContact({ ...contact, fullName: e.target.value })} />

              <label className={styles.label}>Téléphone</label>
              <input type="tel" className={styles.input} value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />

              <label className={styles.label}>Email</label>
              <input type="email" className={styles.input} value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />

              <label className={styles.label}>Message (optionnel)</label>
              <textarea className={styles.textarea} value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} />
            </div>
          </div>

          <div className={styles.rightColumn}>
            <h3 className={styles.sectionTitle}>Paiement</h3>
            <div className={styles.sectionCard}>
              <label className={styles.label}>Méthode de paiement :</label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className={styles.select}
              >
                <option value="card">Carte bancaire</option>
                <option value="paypal">PayPal</option>
                <option value="other">Autres</option>
              </select>

              <label className={styles.checkbox}>
                <input type="checkbox" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} />
                J'accepte les conditions générales
              </label>
            </div>

            <h3 className={styles.sectionTitle}>Récapitulatif</h3>
            <div className={styles.sectionCard}>
              <p><strong>Trajet :</strong> {trip.from} → {trip.to}</p>
              <p><strong>Nombre de places :</strong> {seats}</p>
              <p><strong>Total :</strong> {totalPrice} FCFA</p>
              <p><strong>Nom :</strong> {contact.fullName}</p>
              <p><strong>Téléphone :</strong> {contact.phone}</p>
              <p><strong>Email :</strong> {contact.email}</p>
            </div>

            <button
              onClick={handleConfirm}
              className={styles.confirmBtn}
            >
              Confirmer et payer
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservationPage;
