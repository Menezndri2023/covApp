const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const User = require('../models/User');

router.get('/users', async (req, res) => {
      try {
        const users = await User.find().select('-password'); // Exclure les mots de passe
        res.status(200).json(users);
      } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        res.status(500).json({ message: 'Erreur serveur' });
      }
    });

router.post('/register', register);
router.post('/login', login);

module.exports = router;
