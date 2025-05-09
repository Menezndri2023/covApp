const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const SECRET = process.env.JWT_SECRET || 'your_secret_key';

// ✅ Fonction d'enregistrement avec MongoDB
exports.register = async (req, res) => {
      const { name, email, password } = req.body;
    
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
      }
    
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
    
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, SECRET, { expiresIn: '1h' });
    
        res.status(201).json({
          token,
          user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
      } catch (error) {
        console.error("Erreur lors de l'enregistrement :", error); // ✅ CORRIGÉ
        res.status(500).json({ message: "Erreur serveur lors de l'enregistrement" });
      }
    };
    

// ✅ Fonction de connexion avec MongoDB
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
  }
};
