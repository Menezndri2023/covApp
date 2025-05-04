import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import Footer from '../pages/Footer';
import FilterPanel from '../pages/FilterPanel';
import MapPanel from '../pages/MapPanel';
import TripList from '../pages/TripList';

const Home = () => {
      return (
            <div className={styles.container}>
            <header className={styles.hero}>
              <h1>Bienvenue sur Covoiturage+</h1>
              <p>Voyagez ensemble, économisez plus !</p>
              <div className={styles.actionButtons}>
                <Link to="/create" className={styles.cta}>Proposer un trajet</Link>
                <Link to="/search" className={styles.cta}>Rechercher un trajet</Link>
              </div>
            </header>

            <section className={styles.searchSection}>
            <div className={styles.searchGrid}>
            <FilterPanel />
            <MapPanel />
            </div>
            <TripList />
            </section>

            <section className={styles.features}>
              <div className={styles.feature}>
                <h3>Proposer un trajet</h3>
                <p>Vous avez une voiture ? Rentabilisez vos trajets en proposant du covoiturage.</p>
              </div>
              <div className={styles.feature}>
                <h3>Rechercher un trajet</h3>
                <p>Trouvez un conducteur qui va dans la même direction que vous, à petit prix.</p>
              </div>
              <div className={styles.feature}>
                <h3>Réserver en toute sécurité</h3>
                <p>Profitez d'une plateforme sécurisée pour vos réservations et vos trajets.</p>
              </div>
            </section>

            

            <Footer />
          </div>
      );
};

export default Home;
