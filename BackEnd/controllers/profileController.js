const { readJSON } = require('../utils/fileHelper');

exports.getProfile = (req, res) => {
  const users = readJSON('data/users.json');
  const user = users.find(u => u.id === req.user.id);

  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

  res.json({ name: user.name, email: user.email });
};
