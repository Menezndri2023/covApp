require('dotenv').config(); // 🔹 charge les variables du fichier .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth'); // 🔹 tes routes d'authentification

const app = express();

// 🔹 Configuration
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Routes
app.use('/api/auth', authRoutes);

// 🔹 Debug (facultatif - tu peux supprimer après test)
console.log("🔍 MONGO_URI =", MONGO_URI);

// 🔹 Connexion à MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connecté à MongoDB");
  app.listen(PORT, () => {
    console.log(`✅ Serveur backend démarré sur le port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Erreur de connexion à MongoDB :", err);
});
